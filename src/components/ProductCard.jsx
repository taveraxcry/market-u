import { Bookmark, MapPin, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { formatCOP } from '../utils/format.js';
import SmartImage from './SmartImage.jsx';

export default function ProductCard({ product }) {
  const { getPerson, isSaved, toggleSave, setDetail, openContact } = useApp();
  const { t, tx, tc, tCondition } = useI18n();
  const seller = getPerson(product.sellerId);
  const saved = isSaved('product', product.id);
  const title = tx(product.title);
  const open = () => setDetail({ kind: 'product', id: product.id });

  return (
    <article className="card item-card">
      <div className="item-card__media">
        <button className="item-card__media-btn" onClick={open} aria-label={t('common.view', { name: title })}>
          <SmartImage src={product.image} alt={title} category={product.category} className="item-card__img" />
        </button>
        <button
          className={`save-btn ${saved ? 'save-btn--active' : ''}`}
          onClick={() => toggleSave('product', product.id)}
          aria-pressed={saved}
          aria-label={saved ? t('common.removeSaved') : t('market.saveProduct')}
        >
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
        </button>
        {product.condition && <span className="item-card__condition">{tCondition(product.condition)}</span>}
      </div>
      <div className="item-card__body">
        <p className="item-card__price">{formatCOP(product.price)}</p>
        <h3 className="item-card__title">{title}</h3>
        <p className="item-card__meta">
          <span className="pill pill--soft">{tc(product.category)}</span>
        </p>
        <p className="item-card__seller">
          <MapPin size={14} /> {seller.id === 'me' ? t('common.you') : seller.name} · {tx(product.location)}
        </p>
      </div>
      <div className="item-card__actions">
        <button className="btn btn--soft btn--sm" onClick={open}>{t('common.viewProduct')}</button>
        <button className="btn btn--primary btn--sm" onClick={() => openContact('product', product.id)}>
          <MessageCircle size={16} /> {t('common.contactSeller')}
        </button>
      </div>
    </article>
  );
}
