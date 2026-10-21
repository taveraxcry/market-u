import { useMemo, useState } from 'react';
import { PackageSearch, Plus, Search, Store } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { PRODUCT_CATEGORIES } from '../data/sampleData.js';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { matchesQuery } from '../utils/format.js';
import EmptyState from '../components/EmptyState.jsx';
import FilterChips from '../components/FilterChips.jsx';
import PageHeader from '../components/PageHeader.jsx';
import ProductCard from '../components/ProductCard.jsx';

const SORT_KEYS = { recent: 'market.sortRecent', priceAsc: 'market.sortPriceAsc', priceDesc: 'market.sortPriceDesc', name: 'market.sortName' };

export default function MarketplacePage() {
  const { products, setCreateType } = useApp();
  const { t, tx, tc, lang } = useI18n();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);
  const [sort, setSort] = useState('recent');

  const list = useMemo(() => {
    const sorters = {
      recent: (a, b) => b.createdAt - a.createdAt,
      priceAsc: (a, b) => a.price - b.price,
      priceDesc: (a, b) => b.price - a.price,
      name: (a, b) => tx(a.title).localeCompare(tx(b.title), lang),
    };
    return products
      .filter((p) => !category || p.category === category)
      .filter((p) => matchesQuery(query, p.title, p.description, p.category, tc(p.category)))
      .sort(sorters[sort]);
  }, [products, category, query, sort, tx, tc, lang]);

  const reset = () => {
    setQuery('');
    setCategory(null);
  };

  return (
    <div className="page">
      <PageHeader
        icon={Store}
        title={t('market.title')}
        subtitle={t('market.subtitle')}
        action={
          <button className="btn btn--primary" onClick={() => setCreateType('producto')}>
            <Plus size={18} /> {t('market.sell')}
          </button>
        }
      >
        <div className="toolbar">
          <label className="toolbar__search">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">{t('market.searchLabel')}</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('market.searchPh')} />
          </label>
          <label className="toolbar__sort">
            <span>{t('market.sortBy')}</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(SORT_KEYS).map(([key, labelKey]) => (
                <option key={key} value={key}>{t(labelKey)}</option>
              ))}
            </select>
          </label>
        </div>
        <FilterChips options={PRODUCT_CATEGORIES} value={category} onChange={setCategory} allLabel={t('common.allF')} />
      </PageHeader>

      <p className="results-count">
        {t(list.length === 1 ? 'market.countOne' : 'market.countMany', { n: list.length })}
        {category ? t('market.inCat', { cat: tc(category) }) : ''}
      </p>

      {list.length ? (
        <div className="grid grid--products">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <EmptyState
          icon={PackageSearch}
          title={t('market.emptyTitle')}
          text={t('market.emptyText')}
          action={<button className="btn btn--soft" onClick={reset}>{t('market.clear')}</button>}
        />
      )}
    </div>
  );
}
