import { useState } from 'react';
import { ArrowUpRight, Heart, MessageCircle, Send, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { formatCOP } from '../utils/format.js';
import Avatar from './Avatar.jsx';
import SmartImage from './SmartImage.jsx';
import StoryAvatar from './StoryAvatar.jsx';
import { POST_TYPES, REF_LABELS } from './postTypes.js';

const MAX_CHARS = 200;

function RefPreview({ refInfo }) {
  const { findItem, setDetail } = useApp();
  const { t, tx, tc, eventDate } = useI18n();
  const item = findItem(refInfo.kind, refInfo.id);
  if (!item) return null;
  const subtitle =
    refInfo.kind === 'product'
      ? formatCOP(item.price)
      : refInfo.kind === 'event'
        ? `${eventDate(item.date)} · ${tx(item.location)}`
        : tx(item.priceLabel);
  return (
    <button className="ref-preview" onClick={() => setDetail({ kind: refInfo.kind, id: refInfo.id })}>
      <span className="ref-preview__text">
        <small>{tc(item.category)}</small>
        <strong>{tx(item.title || item.name)}</strong>
        <span>{subtitle}</span>
      </span>
      <span className="ref-preview__cta">
        {t(REF_LABELS[refInfo.kind])} <ArrowUpRight size={16} />
      </span>
    </button>
  );
}

export default function PostCard({ post }) {
  const { getPerson, liked, toggleLike, addComment, sharePost, user } = useApp();
  const { t, tx, timeAgo } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [draft, setDraft] = useState('');
  const [burst, setBurst] = useState(0);

  const author = getPerson(post.authorId);
  const type = POST_TYPES[post.type] || POST_TYPES.general;
  const TypeIcon = type.icon;
  const isLiked = liked.has(post.id);
  const fullText = tx(post.text);
  const isLong = fullText.length > MAX_CHARS;
  const text = isLong && !expanded ? `${fullText.slice(0, MAX_CHARS).trimEnd()}…` : fullText;

  const like = () => {
    if (!isLiked) setBurst((n) => n + 1);
    toggleLike(post.id);
  };

  // Double-click the photo to like, like on Instagram.
  const doubleLike = () => {
    setBurst((n) => n + 1);
    if (!isLiked) toggleLike(post.id);
  };

  const submitComment = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    addComment(post.id, draft.trim());
    setDraft('');
  };

  return (
    <article className="card post">
      <header className="post__head">
        <StoryAvatar personId={post.authorId} person={author} size={46} />
        <div className="post__meta">
          <strong>{author.name}</strong>
          <span>
            {author.program && <>{tx(author.program)} · </>}
            {timeAgo(post.createdAt)}
          </span>
        </div>
        <span className={`type-badge type-badge--${type.tone}`}>
          <TypeIcon size={14} /> {t(type.labelKey)}
        </span>
      </header>

      <p className="post__text">
        {text}{' '}
        {isLong && (
          <button className="link-btn" onClick={() => setExpanded((v) => !v)}>
            {expanded ? t('post.seeLess') : t('post.seeMore')}
          </button>
        )}
      </p>

      {post.image && (
        <div className="post__media" onDoubleClick={doubleLike} title={t('post.doubleTap')}>
          <SmartImage src={post.image} alt={t('post.imageAlt', { name: author.name })} category={post.type} className="post__img" />
          {burst > 0 && <Heart key={burst} className="post__burst" size={110} fill="currentColor" aria-hidden="true" />}
        </div>
      )}

      {post.ref && <RefPreview refInfo={post.ref} />}

      <div className="post__actions">
        <button className={`action ${isLiked ? 'action--liked' : ''}`} onClick={like} aria-pressed={isLiked} aria-label={t('post.like')}>
          <Heart key={isLiked ? 'on' : 'off'} size={21} fill={isLiked ? 'currentColor' : 'none'} />
          <span>{post.likes}</span>
        </button>
        <button className="action" onClick={() => setShowComments((v) => !v)} aria-expanded={showComments} aria-label={t('post.comment')}>
          <MessageCircle size={21} />
          <span>{post.comments.length}</span>
        </button>
        <button className="action" onClick={() => sharePost(post.id)} aria-label={t('post.share')}>
          <Share2 size={20} />
          <span>{post.shares}</span>
        </button>
        <span className="post__likes-label">{t('post.likesCount', { n: post.likes })}</span>
      </div>

      {showComments && (
        <div className="comments">
          {post.comments.map((c) => {
            const person = getPerson(c.authorId);
            return (
              <div key={c.id} className="comment">
                <Avatar person={person} size={32} />
                <div>
                  <div className="comment__bubble">
                    <strong>{person.name}</strong>
                    <p>{tx(c.text)}</p>
                  </div>
                  <small>{timeAgo(c.createdAt)}</small>
                </div>
              </div>
            );
          })}
          <form className="comment-form" onSubmit={submitComment}>
            <Avatar person={user} size={32} />
            <label className="sr-only" htmlFor={`comment-${post.id}`}>{t('post.commentLabel')}</label>
            <input id={`comment-${post.id}`} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={t('post.commentPh')} />
            <button type="submit" className="icon-btn icon-btn--accent" disabled={!draft.trim()} aria-label={t('post.sendComment')}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
