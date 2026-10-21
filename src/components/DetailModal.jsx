import { BadgeCheck, Bookmark, Clock, ExternalLink, Info, MapPin, MessageCircle, ShieldCheck, Sparkles, Star, Tag, Users } from 'lucide-react';
import { INSTITUTIONS } from '../data/sampleData.js';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { eventStatus, formatCOP } from '../utils/format.js';
import { EventStatusPill } from './EventCard.jsx';
import { PhotoCredit } from './PhotoCredits.jsx';
import Avatar from './Avatar.jsx';
import Modal from './Modal.jsx';
import SmartImage from './SmartImage.jsx';

function PersonRow({ person, role }) {
  const { t, tx } = useI18n();
  return (
    <div className="person-row">
      <Avatar person={person} size={48} />
      <div>
        <small>{role}</small>
        <strong>{person.id === 'me' ? `${person.name} ${t('common.youSuffix')}` : person.name}</strong>
        <span>{tx(person.program)}</span>
      </div>
    </div>
  );
}

export default function DetailModal() {
  const { detail, setDetail, findItem, getPerson, openContact, isSaved, toggleSave, interested, toggleInterest } = useApp();
  const { t, tx, tc, tCondition, tContact, timeAgo, eventRange, formatTime } = useI18n();
  const item = detail ? findItem(detail.kind, detail.id) : null;
  const close = () => setDetail(null);
  if (!detail || !item) return null;

  const { kind } = detail;
  const saved = isSaved(kind, item.id);
  const contact = () => {
    close();
    openContact(kind, item.id);
  };

  const saveButton = (
    <button className={`btn btn--soft ${saved ? 'is-active' : ''}`} onClick={() => toggleSave(kind, item.id)} aria-pressed={saved}>
      <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} /> {saved ? t('common.saved') : t('common.save')}
    </button>
  );

  let body;
  if (kind === 'product') {
    const title = tx(item.title);
    body = (
      <div className="detail">
        <div className="detail__img-wrap">
          <SmartImage src={item.image} alt={title} category={item.category} className="detail__img" />
          <PhotoCredit src={item.image} className="photo-credit--corner" />
        </div>
        <div className="detail__info">
          <span className="pill pill--soft"><Tag size={13} /> {tc(item.category)}</span>
          <h2 className="detail__title">{title}</h2>
          <p className="detail__price">{formatCOP(item.price)}</p>
          <ul className="detail__facts">
            {item.condition && <li><strong>{t('detail.condition')}</strong> {tCondition(item.condition)}</li>}
            <li><MapPin size={15} /> {tx(item.location)}</li>
            <li><Clock size={15} /> {t('detail.posted', { time: timeAgo(item.createdAt).toLowerCase() })}</li>
          </ul>
          <h3>{t('detail.description')}</h3>
          <p className="detail__desc">{tx(item.description)}</p>
          <PersonRow person={getPerson(item.sellerId)} role={t('detail.seller')} />
          <div className="notice notice--info">
            <ShieldCheck size={18} />
            <p>{t('detail.noPayments')}</p>
          </div>
          <div className="detail__actions">
            <button className="btn btn--primary" onClick={contact}><MessageCircle size={18} /> {t('common.contactSeller')}</button>
            {saveButton}
          </div>
        </div>
      </div>
    );
  } else if (kind === 'service') {
    const name = tx(item.name);
    const isBusiness = item.kind === 'emprendimiento';
    body = (
      <div className="detail">
        <div className="detail__img-wrap">
          <SmartImage src={item.image} alt={name} category={item.category} className="detail__img" />
          <PhotoCredit src={item.image} className="photo-credit--corner" />
        </div>
        <div className="detail__info">
          <span className="pill pill--soft">
            {isBusiness ? t('services.business') : t('services.service')} · {tc(item.category)}
          </span>
          <h2 className="detail__title">{name}</h2>
          <p className="detail__price detail__price--sm">{tx(item.priceLabel)}</p>
          {item.rating && (
            <p className="rating rating--lg">
              <Star size={16} fill="currentColor" /> {item.rating.toFixed(1)} <span className="muted">· {t('detail.sampleRating')}</span>
            </p>
          )}
          <h3>{t('detail.description')}</h3>
          <p className="detail__desc">{tx(item.description)}</p>
          <ul className="detail__facts">
            <li><MessageCircle size={15} /> {t('detail.contactVia', { c: tContact(item.contact) })}</li>
          </ul>
          <PersonRow person={getPerson(item.providerId)} role={isBusiness ? t('detail.founder') : t('detail.provider')} />
          <div className="detail__actions">
            <button className="btn btn--primary" onClick={contact}><MessageCircle size={18} /> {t('common.contact')}</button>
            {saveButton}
          </div>
        </div>
      </div>
    );
  } else {
    const isInterested = interested.has(item.id);
    const name = tx(item.name);
    const past = eventStatus(item) === 'past';
    const organizer = getPerson(item.organizerId);
    const inst = INSTITUTIONS[item.institution];
    body = (
      <div className="detail detail--event">
        <div className="detail__banner-wrap">
          <SmartImage src={item.image} alt={name} category={item.category} className={`detail__banner ${past ? 'is-past' : ''}`} />
          <PhotoCredit src={item.image} className="photo-credit--corner" />
        </div>
        <div className="detail__info">
          <div className="detail__tags">
            <span className="pill pill--coral">{tc(item.category)}</span>
            {item.demo ? (
              <span className="pill pill--amber">{t('events.studentEvent')}</span>
            ) : (
              inst && <span className="pill pill--soft">{inst.name}</span>
            )}
            <EventStatusPill event={item} />
          </div>
          <h2 className="detail__title">{name}</h2>
          <ul className="detail__facts detail__facts--grid">
            <li>
              <Clock size={16} />
              <span><strong>{eventRange(item.date, item.endDate)}</strong>{item.time && ` · ${formatTime(item.time)}`}</span>
            </li>
            <li><MapPin size={16} /> <span>{tx(item.location)}</span></li>
            <li>
              <Users size={16} />
              <span>{past ? t('events.interestedPast', { n: item.interested }) : t('events.interestedPeople', { n: item.interested })}</span>
            </li>
          </ul>
          <h3>{t('detail.aboutEvent')}</h3>
          <p className="detail__desc">{tx(item.description)}</p>
          {item.recap && past && (
            <div className="recap">
              <h3><Sparkles size={16} /> {t('detail.recap')}</h3>
              <p>{tx(item.recap)}</p>
            </div>
          )}
          <PersonRow person={organizer} role={t('detail.organizer')} />
          {item.source ? (
            <div className="notice notice--info">
              <BadgeCheck size={18} />
              <p>
                {t('detail.sourceNote', { label: item.source.label })}
                {item.tentative && <> {t('detail.tentativeNote')}</>}
              </p>
            </div>
          ) : (
            <div className="notice notice--amber">
              <Info size={18} />
              <p>{t('detail.illustrative')}</p>
            </div>
          )}
          <div className="detail__actions">
            {!past && (
              <button className={`btn ${isInterested ? 'btn--success' : 'btn--coral'}`} onClick={() => toggleInterest(item.id)} aria-pressed={isInterested}>
                <Star size={18} fill={isInterested ? 'currentColor' : 'none'} /> {isInterested ? t('common.isInterested') : t('common.interested')}
              </button>
            )}
            {item.source && (
              <a className="btn btn--soft" href={item.source.url} target="_blank" rel="noreferrer">
                <ExternalLink size={17} /> {t('events.viewSource')}
              </a>
            )}
            {!organizer.institution && item.organizerId !== 'me' && (
              <button className="btn btn--soft" onClick={contact}><MessageCircle size={18} /> {t('detail.askOrganizer')}</button>
            )}
            {saveButton}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal open onClose={close} size={kind === 'event' ? 'lg' : 'xl'} className="modal--detail">
      {body}
    </Modal>
  );
}
