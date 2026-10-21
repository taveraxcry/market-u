import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Pause, Play, Send, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { STORY_BACKGROUNDS } from '../data/sampleData.js';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Avatar from './Avatar.jsx';
import { haptic } from '../utils/format.js';
import { REF_LABELS } from './postTypes.js';

const DURATION = 5000; // ms per story
const HOLD_DELAY = 180; // ms before a press counts as "hold to pause"
const SWIPE_CLOSE = 110; // px down to close (phones)
const SWIPE_SIDE = 60; // px sideways to jump to the next/previous person

export default function StoryViewer() {
  const { storyViewer } = useApp();
  if (!storyViewer) return null;
  // Remount on every open so it starts fresh.
  return <Viewer key={storyViewer.openId} queue={storyViewer.queue} start={storyViewer.start} />;
}

function firstUnseen(group, seen) {
  const idx = group.items.findIndex((it) => !seen.has(it.id));
  return idx === -1 ? 0 : idx;
}

function Viewer({ queue, start }) {
  const {
    stories, getPerson, closeStories, markStorySeen, seenStories, likedStories, toggleStoryLike, replyToStory, setDetail,
    findItem,
  } = useApp();
  const { t, tx, timeAgo } = useI18n();

  const groups = queue.map((pid) => stories.find((s) => s.personId === pid)).filter(Boolean);
  const [g, setG] = useState(start);
  const [i, setI] = useState(() => (groups[start] ? firstUnseen(groups[start], seenStories) : 0));
  const [cycle, setCycle] = useState(0); // restarts the progress animation
  const [dir, setDir] = useState('in');
  const [held, setHeld] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [typing, setTyping] = useState(false);
  const [loadedId, setLoadedId] = useState(null);
  const [failedIds, setFailedIds] = useState(() => new Set());
  const [reply, setReply] = useState('');
  const [likeBurst, setLikeBurst] = useState(0);
  const [dragY, setDragY] = useState(0);
  const holdTimer = useRef(null);
  const pressStart = useRef(null);
  const stageRef = useRef(null);

  const group = groups[g];
  const item = group?.items[i];
  const person = group ? getPerson(group.personId) : null;
  const loaded = !item?.image || loadedId === item.id;
  const paused = held || userPaused || typing || !loaded;

  // ----- navigation -----
  const next = useCallback(() => {
    if (!group) return;
    if (i < group.items.length - 1) {
      setI(i + 1);
    } else if (g < groups.length - 1) {
      setDir('next');
      setG(g + 1);
      setI(firstUnseen(groups[g + 1], seenStories));
    } else {
      closeStories();
      return;
    }
    setCycle((c) => c + 1);
  }, [group, groups, g, i, seenStories, closeStories]);

  const prev = useCallback(() => {
    if (i > 0) {
      setI(i - 1);
    } else if (g > 0) {
      setDir('prev');
      setG(g - 1);
      setI(0);
    }
    setCycle((c) => c + 1);
  }, [g, i]);

  // Jump straight to another person's stories (horizontal swipe).
  const goGroup = useCallback(
    (delta) => {
      const target = g + delta;
      if (target < 0) {
        setI(0);
      } else if (target >= groups.length) {
        closeStories();
        return;
      } else {
        setDir(delta > 0 ? 'next' : 'prev');
        setG(target);
        setI(delta > 0 ? firstUnseen(groups[target], seenStories) : 0);
      }
      setCycle((c) => c + 1);
    },
    [g, groups, seenStories, closeStories]
  );

  // ----- side effects -----
  useEffect(() => {
    if (!item) return;
    markStorySeen(item.id);
    setReply('');
  }, [item?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Preload the next image so transitions feel instant.
  useEffect(() => {
    const upcoming = group?.items[i + 1] || groups[g + 1]?.items[0];
    if (upcoming?.image) {
      const im = new Image();
      im.src = upcoming.image;
    }
  }, [g, i]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    stageRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeStories();
      if (typing) return;
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === ' ') {
        e.preventDefault();
        setUserPaused((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, typing, closeStories]);

  if (!group || !item) return null;

  // ----- tap, hold and swipe on the story -----
  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    pressStart.current = { x: e.clientX, y: e.clientY, moved: false };
    holdTimer.current = setTimeout(() => setHeld(true), HOLD_DELAY);
  };
  const onPointerMove = (e) => {
    const p = pressStart.current;
    if (!p) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    if (!p.moved && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
      p.moved = true;
      clearTimeout(holdTimer.current);
      setHeld(true); // pause while dragging
    }
    if (p.moved && dy > 0 && Math.abs(dy) > Math.abs(dx)) setDragY(dy);
  };
  const onPointerUp = (e) => {
    clearTimeout(holdTimer.current);
    const p = pressStart.current;
    pressStart.current = null;
    const wasHeld = held;
    setHeld(false);
    setDragY(0);
    if (!p) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    if (p.moved) {
      if (dy > SWIPE_CLOSE && Math.abs(dy) > Math.abs(dx)) closeStories();
      else if (Math.abs(dx) > SWIPE_SIDE && Math.abs(dx) > Math.abs(dy)) goGroup(dx < 0 ? 1 : -1);
      return;
    }
    if (wasHeld) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (p.x - rect.left < rect.width * 0.3) prev();
    else next();
  };
  const onPointerCancel = () => {
    clearTimeout(holdTimer.current);
    pressStart.current = null;
    setHeld(false);
    setDragY(0);
  };

  const bg = STORY_BACKGROUNDS[item.bg] || STORY_BACKGROUNDS.sunset;
  const showImage = item.image && !failedIds.has(item.id);
  const isOwn = group.personId === 'me';
  const liked = likedStories.has(item.id);
  const refItem = item.ref ? findItem(item.ref.kind, item.ref.id) : null;

  const like = () => {
    if (!liked) {
      setLikeBurst((n) => n + 1);
      haptic();
    }
    toggleStoryLike(item.id);
  };

  const sendReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    replyToStory(group.personId, reply.trim());
    setReply('');
    e.currentTarget.querySelector('input')?.blur();
  };

  const openRef = () => {
    closeStories();
    setDetail({ kind: item.ref.kind, id: item.ref.id });
  };

  const stop = (e) => e.stopPropagation();

  return (
    <div
      className="story-viewer"
      style={dragY ? { backgroundColor: `rgba(11, 10, 14, ${Math.max(0.2, 1 - dragY / 500)})` } : undefined}
      role="dialog" aria-modal="true" aria-label={t('stories.viewerLabel', { name: person.name })}>
      <div
        className="story-viewer__backdrop"
        style={showImage ? { backgroundImage: `url("${item.image}")` } : { background: bg.css }}
        aria-hidden="true"
      />
      <button className="story-viewer__close" onClick={closeStories} aria-label={t('stories.close')}>
        <X size={26} />
      </button>

      <button className="story-viewer__nav story-viewer__nav--prev" onClick={prev} disabled={g === 0 && i === 0} aria-label={t('stories.prev')}>
        <ChevronLeft size={22} />
      </button>

      <div
        className={`story-stage story-stage--${dir} ${dragY ? 'is-dragging' : ''}`}
        key={group.personId}
        ref={stageRef}
        tabIndex={-1}
        style={dragY ? { transform: `translateY(${dragY}px) scale(${Math.max(0.85, 1 - dragY / 1500)})` } : undefined}
      >
        {/* progress */}
        <div className="story-progress">
          {group.items.map((it, idx) => (
            <span key={it.id} className="story-progress__bar">
              <span
                key={idx === i ? `${it.id}-${cycle}` : it.id}
                className={`story-progress__fill ${idx < i ? 'is-done' : idx === i ? 'is-active' : ''}`}
                style={idx === i ? { animationDuration: `${DURATION}ms`, animationPlayState: paused ? 'paused' : 'running' } : undefined}
                onAnimationEnd={idx === i ? next : undefined}
              />
            </span>
          ))}
        </div>

        {/* header */}
        <header className="story-head" onPointerDown={stop} onPointerUp={stop}>
          <Avatar person={person} size={36} />
          <div className="story-head__text">
            <strong>{isOwn ? t('stories.yours') : person.name}</strong>
            <small>{timeAgo(item.createdAt)}</small>
          </div>
          <button className="story-head__btn" onClick={() => setUserPaused((p) => !p)} aria-label={userPaused ? t('stories.play') : t('stories.pause')}>
            {userPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
          </button>
        </header>

        {/* media (tap zones) */}
        <div
          className={`story-media ${held ? 'is-held' : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onContextMenu={(e) => e.preventDefault()}
        >
          {showImage ? (
            <img
              key={item.id}
              src={item.image}
              alt=""
              className="story-media__img"
              draggable="false"
              onLoad={() => setLoadedId(item.id)}
              onError={() => {
                setLoadedId(item.id);
                setFailedIds((f) => new Set(f).add(item.id));
              }}
            />
          ) : (
            <div key={item.id} className={`story-media__solid ${bg.ink ? 'is-ink' : ''}`} style={{ background: bg.css }}>
              <p>{tx(item.text)}</p>
            </div>
          )}
          {showImage && item.text && (
            <p key={`${item.id}-caption`} className="story-caption">{tx(item.text)}</p>
          )}
          {likeBurst > 0 && <Heart key={likeBurst} className="story-like-burst" size={96} fill="currentColor" />}
        </div>

        {refItem && (
          <button className="story-sticker" onClick={openRef} onPointerDown={stop} onPointerUp={stop}>
            <span>{tx(refItem.title || refItem.name)}</span>
            <strong>{t(REF_LABELS[item.ref.kind])} →</strong>
          </button>
        )}

        {/* footer */}
        {!isOwn ? (
          <form className="story-foot" onSubmit={sendReply} onPointerDown={stop} onPointerUp={stop}>
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onFocus={() => setTyping(true)}
              onBlur={() => setTyping(false)}
              placeholder={t('stories.replyTo', { name: person.name.split(' ')[0] })}
              aria-label={t('stories.replyTo', { name: person.name })}
            />
            <button type="button" className={`story-foot__btn ${liked ? 'is-liked' : ''}`} onClick={like} aria-pressed={liked} aria-label={t('stories.like')}>
              <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
            </button>
            <button type="submit" className="story-foot__btn" disabled={!reply.trim()} aria-label={t('stories.send')}>
              <Send size={22} />
            </button>
          </form>
        ) : (
          <p className="story-foot story-foot--hint">{t('stories.hint')}</p>
        )}
      </div>

      <button className="story-viewer__nav story-viewer__nav--next" onClick={next} aria-label={t('stories.next')}>
        <ChevronRight size={22} />
      </button>
    </div>
  );
}
