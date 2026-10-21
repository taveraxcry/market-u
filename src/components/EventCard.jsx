import { Bookmark, Clock, MapPin, Star, Users } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import SmartImage from './SmartImage.jsx';

export default function EventCard({ event, featured = false }) {
  const { getPerson, interested, toggleInterest, setDetail, isSaved, toggleSave } = useApp();
  const { t, tx, tc, eventDate, eventDateParts, formatTime } = useI18n();
  const organizer = getPerson(event.organizerId);
  const isInterested = interested.has(event.id);
  const saved = isSaved('event', event.id);
  const { day, month } = eventDateParts(event.date);
  const name = tx(event.name);
  const open = () => setDetail({ kind: 'event', id: event.id });

  return (
    <article className={`card event-card ${featured ? 'event-card--featured' : ''}`}>
      <div className="event-card__media">
        <button className="item-card__media-btn" onClick={open} aria-label={t('common.view', { name })}>
          <SmartImage src={event.image} alt={name} category={event.category} className="event-card__img" />
        </button>
        <span className="event-card__date" aria-hidden="true">
          <strong>{day}</strong>
          <small>{month}</small>
        </span>
        {event.demo && <span className="demo-tag">{t('common.demoEvent')}</span>}
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
        <p className="item-card__eyebrow item-card__eyebrow--coral">{tc(event.category)}</p>
        <h3 className="event-card__title">{name}</h3>
        <ul className="event-card__facts">
          <li><Clock size={15} /> <span>{eventDate(event.date)}{event.time ? ` · ${formatTime(event.time)}` : ''}</span></li>
          <li><MapPin size={15} /> <span>{tx(event.location)}</span></li>
          <li><Users size={15} /> <span>{t('events.organizer', { name: organizer.id === 'me' ? t('common.you') : organizer.name })}</span></li>
        </ul>
        <p className="item-card__desc">{tx(event.description)}</p>
        <p className="event-card__count"><Star size={14} fill="currentColor" /> {t('events.interestedPeople', { n: event.interested })}</p>
      </div>
      <div className="item-card__actions">
        <button className="btn btn--soft btn--sm" onClick={open}>{t('common.viewEvent')}</button>
        <button
          className={`btn btn--sm ${isInterested ? 'btn--success' : 'btn--coral'}`}
          onClick={() => toggleInterest(event.id)}
          aria-pressed={isInterested}
        >
          <Star size={16} fill={isInterested ? 'currentColor' : 'none'} /> {isInterested ? t('common.isInterested') : t('common.interested')}
        </button>
      </div>
    </article>
  );
}
