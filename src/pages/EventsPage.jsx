import { useMemo, useState } from 'react';
import { BadgeCheck, CalendarDays, CalendarX, Clock, Info, MapPin, Plus, Search, Star } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { EVENT_CATEGORIES, EVENT_INSTITUTIONS, INSTITUTIONS } from '../data/sampleData.js';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { eventStatus, matchesQuery } from '../utils/format.js';
import EmptyState from '../components/EmptyState.jsx';
import EventCard, { EventStatusPill } from '../components/EventCard.jsx';
import FilterChips from '../components/FilterChips.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { PhotoCredit } from '../components/PhotoCredits.jsx';
import SmartImage from '../components/SmartImage.jsx';

function FeaturedEvent({ event }) {
  const { setDetail, interested, toggleInterest } = useApp();
  const { t, tx, eventRange, formatTime } = useI18n();
  const isInterested = interested.has(event.id);
  const name = tx(event.name);
  const inst = INSTITUTIONS[event.institution];
  return (
    <section className="featured-event">
      <SmartImage src={event.image} alt={name} category={event.category} className="featured-event__img" />
      <div className="featured-event__shade" />
      <PhotoCredit src={event.image} className="photo-credit--corner" />
      <div className="featured-event__content">
        <div className="detail__tags">
          <span className="pill pill--glass">{t('events.featured')}</span>
          {inst && <span className="pill pill--amber">{inst.name}</span>}
          <EventStatusPill event={event} />
        </div>
        <h2>{name}</h2>
        <p>{tx(event.description)}</p>
        <ul>
          <li>
            <Clock size={16} /> {eventRange(event.date, event.endDate)}
            {event.time ? ` · ${formatTime(event.time)}` : ''}
          </li>
          <li><MapPin size={16} /> {tx(event.location)}</li>
          <li><Star size={16} /> {t('events.interestedShort', { n: event.interested })}</li>
        </ul>
        <div className="featured-event__actions">
          <button className={`btn ${isInterested ? 'btn--success' : 'btn--coral'}`} onClick={() => toggleInterest(event.id)} aria-pressed={isInterested}>
            <Star size={18} fill={isInterested ? 'currentColor' : 'none'} /> {isInterested ? t('common.isInterested') : t('common.interested')}
          </button>
          <button className="btn btn--glass" onClick={() => setDetail({ kind: 'event', id: event.id })}>{t('common.viewEvent')}</button>
          {event.source && (
            <a className="btn btn--glass" href={event.source.url} target="_blank" rel="noreferrer">
              <BadgeCheck size={16} /> {t('events.viewSource')}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default function EventsPage() {
  const { events, setCreateType } = useApp();
  const { t, tx, tc } = useI18n();
  const [tab, setTab] = useState('upcoming');
  const [institution, setInstitution] = useState(null);
  const [category, setCategory] = useState(null);
  const [query, setQuery] = useState('');

  const counts = useMemo(() => {
    const past = events.filter((e) => eventStatus(e) === 'past').length;
    return { past, upcoming: events.length - past };
  }, [events]);

  const list = useMemo(
    () =>
      events
        .filter((e) => (tab === 'past' ? eventStatus(e) === 'past' : eventStatus(e) !== 'past'))
        .filter((e) => !institution || e.institution === institution)
        .filter((e) => !category || e.category === category)
        .filter((e) => matchesQuery(query, e.name, e.description, e.location, e.category, tc(e.category), INSTITUTIONS[e.institution]?.name))
        .sort((a, z) => (tab === 'past' ? z.date.localeCompare(a.date) : a.date.localeCompare(z.date))),
    [events, tab, institution, category, query, tc]
  );

  const featured = tab === 'upcoming' && !institution && !category && !query
    ? events.find((e) => e.featured && eventStatus(e) !== 'past')
    : null;
  const grid = featured ? list.filter((e) => e.id !== featured.id) : list;

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
          <div className="segmented segmented--lg" role="tablist">
            {['upcoming', 'past'].map((id) => (
              <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? 'is-active' : ''} onClick={() => setTab(id)}>
                {t(id === 'past' ? 'events.pastTab' : 'events.upcomingTab')} <span className="segmented__count">{counts[id]}</span>
              </button>
            ))}
          </div>
          <label className="toolbar__search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">{t('events.searchLabel')}</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('events.searchPh')} />
          </label>
        </div>
        <div className="chips" role="toolbar" aria-label={t('events.institutionAria')}>
          {[null, ...EVENT_INSTITUTIONS].map((id) => {
            const inst = INSTITUTIONS[id];
            const active = institution === id;
            return (
              <button
                key={id || 'all'}
                type="button"
                className={`chip chip--inst ${active ? 'chip--active' : ''}`}
                aria-pressed={active}
                onClick={() => setInstitution(id)}
                style={inst ? { '--inst': inst.color } : undefined}
              >
                {inst && <i className="chip__dot" />}
                {inst ? tx(inst.short) : t('events.allInstitutions')}
              </button>
            );
          })}
        </div>
        <FilterChips options={EVENT_CATEGORIES} value={category} onChange={setCategory} />
      </PageHeader>

      <div className="notice notice--amber notice--page">
        <Info size={18} />
        <p>{t('events.realNotice')}</p>
      </div>

      {featured && <FeaturedEvent event={featured} />}

      <p className="results-count">{t(grid.length === 1 ? 'events.countOne' : 'events.countMany', { n: grid.length })}</p>

      {grid.length ? (
        <div className="grid grid--events" key={tab}>
          {grid.map((e) => <EventCard key={e.id} event={e} />)}
        </div>
      ) : (
        <EmptyState
          icon={CalendarX}
          title={t(tab === 'past' ? 'events.emptyPastTitle' : 'events.emptyUpcomingTitle')}
          text={t('events.emptyText')}
          action={
            <button className="btn btn--soft" onClick={() => { setCategory(null); setQuery(''); setInstitution(null); }}>
              {t('events.seeAll')}
            </button>
          }
        />
      )}
    </div>
  );
}
