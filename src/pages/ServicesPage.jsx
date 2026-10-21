import { useMemo, useState } from 'react';
import { Briefcase, Lightbulb, Plus, Rocket, Search, SearchX } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { SERVICE_CATEGORIES } from '../data/sampleData.js';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { matchesQuery } from '../utils/format.js';
import EmptyState from '../components/EmptyState.jsx';
import FilterChips from '../components/FilterChips.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ServiceCard from '../components/ServiceCard.jsx';

const KINDS = [
  { id: null, labelKey: 'services.kAll' },
  { id: 'servicio', labelKey: 'services.kServices' },
  { id: 'emprendimiento', labelKey: 'services.kBusinesses' },
];

export default function ServicesPage({ initialKind = null }) {
  const { services, setCreateType } = useApp();
  const { t, tc } = useI18n();
  const [kind, setKind] = useState(initialKind);
  const [category, setCategory] = useState(null);
  const [query, setQuery] = useState('');

  const list = useMemo(
    () =>
      services
        .filter((s) => !kind || s.kind === kind)
        .filter((s) => !category || s.category === category)
        .filter((s) => matchesQuery(query, s.name, s.description, s.category, tc(s.category))),
    [services, kind, category, query, tc]
  );

  return (
    <div className="page">
      <PageHeader
        icon={Briefcase}
        tone="violet"
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        action={
          <div className="page-header__actions">
            <button className="btn btn--soft" onClick={() => setCreateType('emprendimiento')}>
              <Lightbulb size={18} /> {t('services.publishBusiness')}
            </button>
            <button className="btn btn--primary" onClick={() => setCreateType('servicio')}>
              <Plus size={18} /> {t('services.offerService')}
            </button>
          </div>
        }
      >
        <div className="toolbar">
          <div className="segmented segmented--lg" role="tablist" aria-label={t('services.kindAria')}>
            {KINDS.map((k) => (
              <button key={k.labelKey} role="tab" aria-selected={kind === k.id} className={kind === k.id ? 'is-active' : ''} onClick={() => setKind(k.id)}>
                {t(k.labelKey)}
              </button>
            ))}
          </div>
          <label className="toolbar__search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">{t('services.searchLabel')}</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('services.searchPh')} />
          </label>
        </div>
        <FilterChips options={SERVICE_CATEGORIES} value={category} onChange={setCategory} allLabel={t('common.allF')} />
      </PageHeader>

      <div className="promo-banner">
        <span className="promo-banner__icon"><Rocket size={22} /></span>
        <div>
          <strong>{t('services.promoTitle')}</strong>
          <p>{t('services.promoText')}</p>
        </div>
      </div>

      <p className="results-count">{t('services.results', { n: list.length })}</p>

      {list.length ? (
        <div className="grid grid--services">
          {list.map((s) => <ServiceCard key={s.id} service={s} />)}
        </div>
      ) : (
        <EmptyState
          icon={SearchX}
          title={t('services.emptyTitle')}
          text={t('services.emptyText')}
          action={
            <button className="btn btn--soft" onClick={() => { setQuery(''); setCategory(null); setKind(null); }}>
              {t('services.seeAll')}
            </button>
          }
        />
      )}
    </div>
  );
}
