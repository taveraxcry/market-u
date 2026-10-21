import { useState } from 'react';
import { Newspaper } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Composer from '../components/Composer.jsx';
import EmptyState from '../components/EmptyState.jsx';
import PostCard from '../components/PostCard.jsx';
import RightRail from '../components/RightRail.jsx';
import SmartImage from '../components/SmartImage.jsx';
import { POST_TYPES } from '../components/postTypes.js';

const FEED_FILTERS = [
  { id: null, labelKey: 'home.fAll' },
  { id: 'producto', labelKey: 'home.fProducts' },
  { id: 'servicio', labelKey: 'home.fServices' },
  { id: 'emprendimiento', labelKey: 'home.fBusinesses' },
  { id: 'evento', labelKey: 'home.fEvents' },
  { id: 'general', labelKey: 'home.fCommunity' },
];

function Highlights() {
  const { events, services, products, setDetail, user } = useApp();
  const { t, tx } = useI18n();
  const items = [
    { key: 'e1', kind: 'event', item: events.find((e) => e.id === 'e1') || events[0], labelKey: 'home.hlEvent' },
    { key: 's8', kind: 'service', item: services.find((s) => s.id === 's8') || services[0], labelKey: 'home.hlBusiness' },
    { key: 'p1', kind: 'product', item: products.find((p) => p.id === 'p1') || products[0], labelKey: 'home.hlProduct' },
    { key: 'e2', kind: 'event', item: events.find((e) => e.id === 'e2') || events[1], labelKey: 'home.hlFair' },
  ].filter((h) => h.item);

  return (
    <section className="highlights" aria-label={t('home.highlightsAria')}>
      <div className="highlight highlight--welcome">
        <span className="highlight__wave" aria-hidden="true">👋</span>
        <strong>{t('home.hello', { name: user.name.split(' ')[0] })}</strong>
        <small>{t('home.helloSub')}</small>
      </div>
      {items.map(({ key, kind, item, labelKey }) => (
        <button key={key} className="highlight" onClick={() => setDetail({ kind, id: item.id })}>
          <SmartImage src={item.image} alt="" category={item.category} className="highlight__img" />
          <span className="highlight__shade" />
          <span className="highlight__label">{t(labelKey)}</span>
          <strong className="highlight__title">{tx(item.title || item.name).split(' — ')[0]}</strong>
        </button>
      ))}
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
        <Highlights />
        <Composer />
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
        {visible.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {visible.length === 0 && <EmptyState icon={Newspaper} title={t('home.emptyTitle')} text={t('home.emptyText')} />}
        {visible.length > 0 && <p className="feed__end">{t('home.end')}</p>}
      </div>
      <RightRail />
    </div>
  );
}
