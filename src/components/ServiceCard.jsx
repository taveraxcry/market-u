import { Bookmark, Lightbulb, MessageCircle, Star } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Avatar from './Avatar.jsx';
import SmartImage from './SmartImage.jsx';
import { iconFor } from './categoryIcons.js';

export default function ServiceCard({ service }) {
  const { getPerson, isSaved, toggleSave, setDetail, openContact } = useApp();
  const { t, tx, tc } = useI18n();
  const provider = getPerson(service.providerId);
  const saved = isSaved('service', service.id);
  const Icon = iconFor(service.category);
  const name = tx(service.name);
  const open = () => setDetail({ kind: 'service', id: service.id });
  const isBusiness = service.kind === 'emprendimiento';

  return (
    <article className="card item-card service-card">
      <div className="item-card__media item-card__media--short">
        <button className="item-card__media-btn" onClick={open} aria-label={t('common.view', { name })}>
          <SmartImage src={service.image} alt={name} category={service.category} className="item-card__img" />
        </button>
        <span className={`kind-tag ${isBusiness ? 'kind-tag--business' : ''}`}>
          {isBusiness ? <Lightbulb size={13} /> : <Icon size={13} />} {isBusiness ? t('services.business') : t('services.service')}
        </span>
        <button
          className={`save-btn ${saved ? 'save-btn--active' : ''}`}
          onClick={() => toggleSave('service', service.id)}
          aria-pressed={saved}
          aria-label={saved ? t('common.removeSaved') : t('services.saveService')}
        >
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <span className="service-card__icon"><Icon size={20} /></span>
      </div>
      <div className="item-card__body">
        <p className="item-card__eyebrow">{tc(service.category)}</p>
        <h3 className="item-card__title">{name}</h3>
        <p className="item-card__desc">{tx(service.description)}</p>
        <div className="service-card__provider">
          <Avatar person={provider} size={28} />
          <span>{provider.id === 'me' ? t('common.you') : provider.name}</span>
          {service.rating && (
            <span className="rating"><Star size={13} fill="currentColor" /> {service.rating.toFixed(1)}</span>
          )}
        </div>
        <p className="service-card__price">{tx(service.priceLabel)}</p>
      </div>
      <div className="item-card__actions">
        <button className="btn btn--soft btn--sm" onClick={open}>{t('common.viewService')}</button>
        <button className="btn btn--primary btn--sm" onClick={() => openContact('service', service.id)}>
          <MessageCircle size={16} /> {t('common.contact')}
        </button>
      </div>
    </article>
  );
}
