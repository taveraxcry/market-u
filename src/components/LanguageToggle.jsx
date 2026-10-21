import { Languages } from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext.jsx';

const OPTIONS = [
  { id: 'es', label: 'ES', name: 'Español' },
  { id: 'en', label: 'EN', name: 'English' },
];

/** ES / EN switch shown at the top of every screen. */
export default function LanguageToggle({ dark = false }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div className={`lang-toggle ${dark ? 'lang-toggle--dark' : ''}`} role="group" aria-label={t('common.language')}>
      <Languages size={16} aria-hidden="true" className="lang-toggle__icon" />
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          type="button"
          className={lang === o.id ? 'is-active' : ''}
          aria-pressed={lang === o.id}
          title={o.name}
          onClick={() => setLang(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
