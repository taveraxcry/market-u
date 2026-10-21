import { useState } from 'react';
import { CalendarDays, Newspaper } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Composer from '../components/Composer.jsx';
import EmptyState from '../components/EmptyState.jsx';
import PostCard from '../components/PostCard.jsx';
import RightRail from '../components/RightRail.jsx';
import SmartImage from '../components/SmartImage.jsx';
import StoriesBar from '../components/StoriesBar.jsx';
import { POST_TYPES } from '../components/postTypes.js';

const FEED_FILTERS = [
  { id: null, labelKey: 'home.fAll' },
  { id: 'producto', labelKey: 'home.fProducts' },
  { id: 'servicio', labelKey: 'home.fServices' },
  { id: 'emprendimiento', labelKey: 'home.fBusinesses' },
  { id: 'evento', labelKey: 'home.fEvents' },
  { id: 'general', labelKey: 'home.fCommunity' },
];

/** Horizontal "upcoming events" strip. Shown when the right column doesn't fit (tablets and phones). */
function EventsStrip() {
  const { events, setDetail, setView } = useApp();
  const { t, tx, tc, eventDateParts } = useI18n();
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 6);
  return (
    <section className="events-strip" aria-label={t('rail.upcoming')}>
      <header className="events-strip__head">
        <h2><CalendarDays size={18} /> {t('rail.upcoming')}</h2>
        <button className="link-btn" onClick={() => setView('events')}>{t('rail.seeAll')}</button>
      </header>
      <div className="events-strip__track">
        {upcoming.map((e) => {
          const { day, month } = eventDateParts(e.date);
          return (
            <button key={e.id} className="events-strip__card" onClick={() => setDetail({ kind: 'event', id: e.id })}>
              <SmartImage src={e.image} alt="" category={e.category} className="events-strip__img" />
              <span className="events-strip__shade" />
              <span className="events-strip__date"><strong>{day}</strong><small>{month}</small></span>
              <span className="events-strip__text">
                <small>{tc(e.category)}</small>
                <strong>{tx(e.name)}</strong>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default function HomePage() {
  const { posts } = useApp();
  const { t } = useI18n();
  const [filter, setFilter] = useState(null);
  const visible = filter ? posts.filter((p) => p.type === filter) : posts;

  return (
    <div className="home">
      <div className="feed">
        <StoriesBar />
        <Composer />
        <EventsStrip />
        <div className="feed__filters" role="toolbar" aria-label={t('home.filterAria')}>
          {FEED_FILTERS.map((f) => {
            const Icon = f.id ? POST_TYPES[f.id].icon : null;
            return (
              <button
                key={f.labelKey}
                className={`chip ${filter === f.id ? 'chip--active' : ''}`}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {Icon && <Icon size={15} />} {t(f.labelKey)}
              </button>
            );
          })}
        </div>
        <div className="feed__list stagger" key={filter || 'all'}>
          {visible.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        {visible.length === 0 && <EmptyState icon={Newspaper} title={t('home.emptyTitle')} text={t('home.emptyText')} />}
        {visible.length > 0 && <p className="feed__end">{t('home.end')}</p>}
      </div>
      <RightRail />
    </div>
  );
}
