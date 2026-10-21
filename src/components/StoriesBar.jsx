import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Avatar from './Avatar.jsx';

/** Horizontal row of story circles, like the top of Instagram. */
export default function StoriesBar() {
  const { user, storyOrder, isGroupSeen, openStories, getPerson, setCreateStoryOpen } = useApp();
  const { t } = useI18n();
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const own = storyOrder.find((g) => g.personId === 'me');
  const others = storyOrder.filter((g) => g.personId !== 'me');

  const updateEdges = () => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 20, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 20 });
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener('resize', updateEdges);
    return () => window.removeEventListener('resize', updateEdges);
  }, [storyOrder.length]);

  const scroll = (dir) => trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });

  return (
    <section className="stories card" aria-label={t('stories.aria')}>
      {!edges.start && (
        <button className="stories__arrow stories__arrow--left" onClick={() => scroll(-1)} aria-label={t('stories.scrollLeft')}>
          <ChevronLeft size={18} />
        </button>
      )}
      <div className="stories__track" ref={trackRef} onScroll={updateEdges}>
        <div className="story-tile story-tile--own">
          <button
            type="button"
            className={`story-ring ${own ? (isGroupSeen(own) ? 'is-seen' : '') : 'is-empty'}`}
            onClick={() => (own ? openStories('me') : setCreateStoryOpen(true))}
            aria-label={own ? t('stories.yours') : t('stories.add')}
          >
            <Avatar person={user} size={62} />
          </button>
          <button type="button" className="story-tile__add" onClick={() => setCreateStoryOpen(true)} aria-label={t('stories.add')}>
            <Plus size={14} strokeWidth={3} />
          </button>
          <span className="story-tile__name">{t('stories.yours')}</span>
        </div>

        {others.map((group, index) => {
          const person = getPerson(group.personId);
          const seen = isGroupSeen(group);
          return (
            <div key={group.personId} className="story-tile" style={{ '--i': index }}>
              <button
                type="button"
                className={`story-ring ${seen ? 'is-seen' : ''}`}
                onClick={() => openStories(group.personId)}
                aria-label={t('stories.viewerLabel', { name: person.name })}
              >
                <Avatar person={person} size={62} />
              </button>
              <span className="story-tile__name">{person.name.split(' ')[0]}</span>
            </div>
          );
        })}
      </div>
      {!edges.end && (
        <button className="stories__arrow stories__arrow--right" onClick={() => scroll(1)} aria-label={t('stories.scrollRight')}>
          <ChevronRight size={18} />
        </button>
      )}
    </section>
  );
}
