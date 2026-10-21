import { Bookmark } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import EmptyState from '../components/EmptyState.jsx';
import EventCard from '../components/EventCard.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ServiceCard from '../components/ServiceCard.jsx';

export default function SavedPage() {
  const { products, services, events, isSaved, setView } = useApp();
  const { t } = useI18n();
  const savedProducts = products.filter((p) => isSaved('product', p.id));
  const savedServices = services.filter((s) => isSaved('service', s.id));
  const savedEvents = events.filter((e) => isSaved('event', e.id));
  const total = savedProducts.length + savedServices.length + savedEvents.length;

  return (
    <div className="page">
      <PageHeader icon={Bookmark} title={t('saved.title')} subtitle={t('saved.subtitle')} />

      {total === 0 && (
        <EmptyState
          icon={Bookmark}
          title={t('saved.emptyTitle')}
          text={t('saved.emptyText')}
          action={<button className="btn btn--primary" onClick={() => setView('marketplace')}>{t('saved.explore')}</button>}
        />
      )}

      {savedProducts.length > 0 && (
        <section className="saved-section">
          <h2>{t('saved.products')} <span>{savedProducts.length}</span></h2>
          <div className="grid grid--products">{savedProducts.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
      {savedServices.length > 0 && (
        <section className="saved-section">
          <h2>{t('saved.services')} <span>{savedServices.length}</span></h2>
          <div className="grid grid--services">{savedServices.map((s) => <ServiceCard key={s.id} service={s} />)}</div>
        </section>
      )}
      {savedEvents.length > 0 && (
        <section className="saved-section">
          <h2>{t('saved.events')} <span>{savedEvents.length}</span></h2>
          <div className="grid grid--events">{savedEvents.map((e) => <EventCard key={e.id} event={e} />)}</div>
        </section>
      )}
    </div>
  );
}
