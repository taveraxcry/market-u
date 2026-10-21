import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import { TOP_TABS } from './navigation.js';

export default function MobileNav() {
  const { view, setView, setCreateType } = useApp();
  const { t } = useI18n();
  const tabs = [...TOP_TABS.slice(0, 2), { create: true }, ...TOP_TABS.slice(2)];

  return (
    <nav className="mobile-nav" aria-label={t('nav.bottomNav')}>
      {tabs.map((tab) => {
        if (tab.create) {
          return (
            <button key="create" className="mobile-nav__create" onClick={() => setCreateType('general')} aria-label={t('nav.createPost')}>
              <Plus size={24} />
            </button>
          );
        }
        const Icon = tab.icon;
        const active = view === tab.view || tab.also?.includes(view);
        return (
          <button
            key={tab.view}
            className={`mobile-nav__item ${active ? 'is-active' : ''}`}
            onClick={() => setView(tab.view)}
            aria-current={active ? 'page' : undefined}
          >
            <Icon size={22} />
            <span>{t(tab.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
}
