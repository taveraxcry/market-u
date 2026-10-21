import { useState } from 'react';
import { Search, SearchX } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { matchesQuery } from '../utils/format.js';
import EmptyState from '../components/EmptyState.jsx';
import EventCard from '../components/EventCard.jsx';
import PostCard from '../components/PostCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ServiceCard from '../components/ServiceCard.jsx';

export default function SearchPage() {
  const { searchQuery, posts, products, services, events, getPerson, setView } = useApp();
  const { t, tc } = useI18n();
  const [tab, setTab] = useState('all');
  const q = searchQuery.trim();

  const results = {
    products: products.filter((p) => matchesQuery(q, p.title, p.description, p.category, tc(p.category))),
    services: services.filter((s) => matchesQuery(q, s.name, s.description, s.category, tc(s.category), getPerson(s.providerId).name)),
    events: events.filter((e) => matchesQuery(q, e.name, e.description, e.category, tc(e.category), e.location)),
    posts: posts.filter((p) => matchesQuery(q, p.text, getPerson(p.authorId).name)),
  };
  const total = Object.values(results).reduce((sum, r) => sum + r.length, 0);
  const tabs = [
    { id: 'all', count: total },
    { id: 'products', count: results.products.length },
    { id: 'services', count: results.services.length },
    { id: 'events', count: results.events.length },
    { id: 'posts', count: results.posts.length },
  ];
  const show = (id) => (tab === 'all' || tab === id) && results[id].length > 0;
  const limit = (list) => (tab === 'all' ? list.slice(0, 6) : list);

  return (
    <div className="page">
      <header className="search-head">
        <span className="page-header__icon"><Search size={24} /></span>
        <div>
          <h1>{t('search.title', { q })}</h1>
          <p>{t(total === 1 ? 'search.countOne' : 'search.countMany', { n: total })}</p>
        </div>
      </header>

      <div className="tabs-line tabs-line--card" role="tablist">
        {tabs.map((tb) => (
          <button key={tb.id} role="tab" aria-selected={tab === tb.id} className={tab === tb.id ? 'is-active' : ''} onClick={() => setTab(tb.id)}>
            {t(`search.${tb.id}`)} <span className="tabs-line__count">{tb.count}</span>
          </button>
        ))}
      </div>

      {total === 0 && (
        <EmptyState
          icon={SearchX}
          title={t('search.emptyTitle')}
          text={t('search.emptyText')}
          action={<button className="btn btn--soft" onClick={() => setView('home')}>{t('search.back')}</button>}
        />
      )}

      {show('products') && (
        <section className="saved-section">
          <h2>{t('search.sProducts')} <span>{results.products.length}</span></h2>
          <div className="grid grid--products">{limit(results.products).map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
      {show('services') && (
        <section className="saved-section">
          <h2>{t('search.sServices')} <span>{results.services.length}</span></h2>
          <div className="grid grid--services">{limit(results.services).map((s) => <ServiceCard key={s.id} service={s} />)}</div>
        </section>
      )}
      {show('events') && (
        <section className="saved-section">
          <h2>{t('search.sEvents')} <span>{results.events.length}</span></h2>
          <div className="grid grid--events">{limit(results.events).map((e) => <EventCard key={e.id} event={e} />)}</div>
        </section>
      )}
      {show('posts') && (
        <section className="saved-section">
          <h2>{t('search.sPosts')} <span>{results.posts.length}</span></h2>
          <div className="feed feed--narrow">{limit(results.posts).map((p) => <PostCard key={p.id} post={p} />)}</div>
        </section>
      )}
      {tab === 'all' && total > 0 && Object.values(results).some((r) => r.length > 6) && (
        <p className="results-count">{t('search.moreHint')}</p>
      )}
    </div>
  );
}
