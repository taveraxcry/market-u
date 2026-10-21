import { BadgeCheck, Bookmark, Clock, MapPin, Star, Users } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { INSTITUTIONS } from '../data/sampleData.js';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { eventStatus } from '../utils/format.js';
import SmartImage from './SmartImage.jsx';

/** Pill with the event's state: Hoy / En curso / Finalizado / Fechas por confirmar. */
export function EventStatusPill({ event, className = '' }) {
  const { t } = useI18n();
  const status = eventStatus(event);
  if (status === 'past') return <span className={`status-pill status-pill--past ${className}`}>{t('events.statusPast')}</span>;
  if (status === 'today') return <span className={`status-pill status-pill--live ${className}`}><i /> {t('events.statusToday')}</span>;
  if (status === 'live') return <span className={`status-pill status-pill--live ${className}`}><i /> {t('events.statusLive')}</span>;
  if (event.tentative) return <span className={`status-pill status-pill--tbc ${className}`}>{t('events.statusTentative')}</span>;
  return null;
}

export function InstitutionTag({ event }) {
  const { t, tx } = useI18n();
  const inst = INSTITUTIONS[event.institution];
  if (event.demo) return <span className="inst-tag inst-tag--demo">{t('events.studentEvent')}</span>;
  if (!inst) return null;
  return (
    <span className="inst-tag" style={{ '--inst': inst.color }}>
      <i /> {tx(inst.short)}
    </span>
  );
}

export default function EventCard({ event, featured = false }) {
  const { getPerson, interested, toggleInterest, setDetail, isSaved, toggleSave } = useApp();
  const { t, tx, tc, eventRange, eventDateParts, formatTime } = useI18n();
  const organizer = getPerson(event.organizerId);
  const isInterested = interested.has(event.id);
  const saved = isSaved('event', event.id);
  const past = eventStatus(event) === 'past';
  const { day, month } = eventDateParts(event.date);
  const name = tx(event.name);
  const open = () => setDetail({ kind: 'event', id: event.id });

  return (
    <article className={`card event-card ${featured ? 'event-card--featured' : ''} ${past ? 'is-past' : ''}`}>
      <div className="event-card__media">
        <button className="item-card__media-btn" onClick={open} aria-label={t('common.view', { name })}>
          <SmartImage src={event.image} alt={name} category={event.category} className="event-card__img" />
        </button>
        <span className="event-card__date" aria-hidden="true">
          <strong>{day}</strong>
          <small>{month}</small>
        </span>
        <InstitutionTag event={event} />
        <button
          className={`save-btn ${saved ? 'save-btn--active' : ''}`}
          onClick={() => toggleSave('event', event.id)}
          aria-pressed={saved}
          aria-label={saved ? t('common.removeSaved') : t('events.saveEvent')}
        >
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="event-card__body">
        <div className="event-card__top">
          <p className="item-card__eyebrow item-card__eyebrow--coral">{tc(event.category)}</p>
          <EventStatusPill event={event} />
        </div>
        <h3 className="event-card__title">
          <button type="button" className="item-card__title-btn" onClick={open}>{name}</button>
        </h3>
        <ul className="event-card__facts">
          <li>
            <Clock size={15} />
            <span>{eventRange(event.date, event.endDate)}{event.time ? ` · ${formatTime(event.time)}` : ''}</span>
          </li>
          <li><MapPin size={15} /> <span>{tx(event.location)}</span></li>
          <li><Users size={15} /> <span>{t('events.organizer', { name: organizer.id === 'me' ? t('common.you') : organizer.name })}</span></li>
        </ul>
        <p className="item-card__desc">{tx(event.description)}</p>
        <div className="event-card__meta">
          <p className="event-card__count">
            <Star size={14} fill="currentColor" />
            {past ? t('events.interestedPast', { n: event.interested }) : t('events.interestedPeople', { n: event.interested })}
          </p>
          {event.source && (
            <a className="source-link" href={event.source.url} target="_blank" rel="noreferrer">
              <BadgeCheck size={13} /> {t('events.source', { label: event.source.label })}
            </a>
          )}
        </div>
      </div>
      <div className="item-card__actions">
        {past ? (
          <button className="btn btn--soft btn--sm" onClick={open}>{t('events.viewRecap')}</button>
        ) : (
          <>
            <button className="btn btn--soft btn--sm item-card__view" onClick={open}>{t('common.viewEvent')}</button>
            <button
              className={`btn btn--sm ${isInterested ? 'btn--success' : 'btn--coral'}`}
              onClick={() => toggleInterest(event.id)}
              aria-pressed={isInterested}
            >
              <Star size={16} fill={isInterested ? 'currentColor' : 'none'} /> {isInterested ? t('common.isInterested') : t('common.interested')}
            </button>
          </>
        )}
      </div>
    </article>
  );
}
