import { useMemo, useState } from 'react';
import { CalendarDays, CalendarX, Clock, Info, MapPin, Plus, Search, Star } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { EVENT_CATEGORIES } from '../data/sampleData.js';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { matchesQuery } from '../utils/format.js';
import EmptyState from '../components/EmptyState.jsx';
import EventCard from '../components/EventCard.jsx';
import FilterChips from '../components/FilterChips.jsx';
import PageHeader from '../components/PageHeader.jsx';
import SmartImage from '../components/SmartImage.jsx';

function FeaturedEvent({ event }) {
  const { setDetail, interested, toggleInterest } = useApp();
  const { t, tx, eventDate, formatTime } = useI18n();
  const isInterested = interested.has(event.id);
  const name = tx(event.name);
  return (
    <section className="featured-event">
      <SmartImage src={event.image} alt={name} category={event.category} className="featured-event__img" />
      <div className="featured-event__shade" />
      <div className="featured-event__content">
        <div className="detail__tags">
          <span className="pill pill--glass">{t('events.featured')}</span>
          <span className="pill pill--amber">{t('common.demoEvent')}</span>
        </div>
        <h2>{name}</h2>
        <p>{tx(event.description)}</p>
        <ul>
          <li><Clock size={16} /> {eventDate(event.date)} · {formatTime(event.time)} {t('events.illustrative')}</li>
          <li><MapPin size={16} /> {tx(event.location)}</li>
          <li><Star size={16} /> {t('events.interestedShort', { n: event.interested })}</li>
        </ul>
        <div className="featured-event__actions">
          <button className={`btn ${isInterested ? 'btn--success' : 'btn--coral'}`} onClick={() => toggleInterest(event.id)} aria-pressed={isInterested}>
            <Star size={18} fill={isInterested ? 'currentColor' : 'none'} /> {isInterested ? t('common.isInterested') : t('common.interested')}
          </button>
          <button className="btn btn--glass" onClick={() => setDetail({ kind: 'event', id: event.id })}>{t('common.viewEvent')}</button>
        </div>
      </div>
    </section>
  );
}

export default function EventsPage() {
  const { events, setCreateType } = useApp();
  const { t, tc } = useI18n();
  const [category, setCategory] = useState(null);
  const [query, setQuery] = useState('');
  const featured = events.find((e) => e.featured);

  const list = useMemo(
    () =>
      [...events]
        .filter((e) => !category || e.category === category)
        .filter((e) => matchesQuery(query, e.name, e.description, e.location, e.category, tc(e.category)))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [events, category, query, tc]
  );

  return (
    <div className="page">
      <PageHeader
        icon={CalendarDays}
        tone="coral"
        title={t('events.title')}
        subtitle={t('events.subtitle')}
        action={
          <button className="btn btn--primary" onClick={() => setCreateType('evento')}>
            <Plus size={18} /> {t('events.publish')}
          </button>
        }
      >
        <div className="toolbar">
          <label className="toolbar__search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">{t('events.searchLabel')}</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('events.searchPh')} />
          </label>
        </div>
        <FilterChips options={EVENT_CATEGORIES} value={category} onChange={setCategory} />
      </PageHeader>

      <div className="notice notice--amber notice--page">
        <Info size={18} />
        <p>{t('events.notice')}</p>
      </div>

      {featured && !category && !query && <FeaturedEvent event={featured} />}

      <p className="results-count">{t(list.length === 1 ? 'events.countOne' : 'events.countMany', { n: list.length })}</p>

      {list.length ? (
        <div className="grid grid--events">
          {list.map((e) => <EventCard key={e.id} event={e} />)}
        </div>
      ) : (
        <EmptyState
          icon={CalendarX}
          title={t('events.emptyTitle')}
          text={t('events.emptyText')}
          action={<button className="btn btn--soft" onClick={() => { setCategory(null); setQuery(''); }}>{t('events.seeAll')}</button>}
        />
      )}
    </div>
  );
}
