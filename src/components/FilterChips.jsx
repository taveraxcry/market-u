import { useI18n } from '../i18n/LanguageContext.jsx';
import { iconFor } from './categoryIcons.js';

/** Category chips. `options` are internal category ids; labels are translated. */
export default function FilterChips({ options, value, onChange, allLabel, withIcons = true }) {
  const { t, tc } = useI18n();
  const all = [null, ...options];
  return (
    <div className="chips" role="toolbar" aria-label={t('common.filterByCategory')}>
      {all.map((opt) => {
        const active = opt === value || (!opt && !value);
        const Icon = withIcons && opt ? iconFor(opt) : null;
        return (
          <button
            key={opt || 'all'}
            type="button"
            className={`chip ${active ? 'chip--active' : ''}`}
            aria-pressed={active}
            onClick={() => onChange(opt)}
          >
            {Icon && <Icon size={15} />}
            {opt ? tc(opt) : allLabel || t('common.all')}
          </button>
        );
      })}
    </div>
  );
}
