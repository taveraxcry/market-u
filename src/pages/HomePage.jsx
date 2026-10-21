import { useState } from 'react';
import { Newspaper } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Composer from '../components/Composer.jsx';
import EmptyState from '../components/EmptyState.jsx';
import PostCard from '../components/PostCard.jsx';
import RightRail from '../components/RightRail.jsx';
import StoriesBar from '../components/StoriesBar.jsx';
import { POST_TYPES } from '../components/postTypes.js';

const FEED_FILTERS = [
  { id: null, labelKey: 'home.fAll' },
  { id: 'producto', labelKey: 'home.fProducts' },
  { id: 'servicio', labelKey: 'home.fServices' },
  { id: 'emprendimiento', labelKey: 'home.fBusinesses' },
  { id: 'evento', labelKey: 'home.fEvents' },
  { id: 'general', labelKey: 'home.fCommunity' },
];

export default function HomePage() {
  const { posts } = useApp();
  const { t } = useI18n();
  const [filter, setFilter] = useState(null);
  const visible = filter ? posts.filter((p) => p.type === filter) : posts;

  return (
    <div className="home">
      <div className="feed">
        <StoriesBar />
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
        <div className="feed__list stagger" key={filter || 'all'}>
          {visible.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        {visible.length === 0 && <EmptyState icon={Newspaper} title={t('home.emptyTitle')} text={t('home.emptyText')} />}
        {visible.length > 0 && <p className="feed__end">{t('home.end')}</p>}
      </div>
      <RightRail />
    </div>
  );
}
