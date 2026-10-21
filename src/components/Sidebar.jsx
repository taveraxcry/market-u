import { GraduationCap, LogOut, PenLine, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Avatar from './Avatar.jsx';
import Logo from './Logo.jsx';
import { NAV_ITEMS } from './navigation.js';

export default function Sidebar() {
  const { user, view, setView, sidebarOpen, setSidebarOpen, setCreateType, conversations, saved, logout } = useApp();
  const { t, tx } = useI18n();
  const unread = conversations.filter((c) => c.unread).length;
  const counters = { messages: unread, saved: saved.size };

  return (
    <>
      <div className={`sidebar-scrim ${sidebarOpen ? 'is-visible' : ''}`} onClick={() => setSidebarOpen(false)} />
      <aside className={`sidebar ${sidebarOpen ? 'is-open' : ''}`} aria-label={t('nav.sideMenu')}>
        <div className="sidebar__mobile-head">
          <Logo size={34} />
          <button className="icon-btn" onClick={() => setSidebarOpen(false)} aria-label={t('nav.closeMenu')}>
            <X size={22} />
          </button>
        </div>

        <button className="sidebar__profile" onClick={() => setView('mine')}>
          <Avatar person={user} size={44} ring />
          <span>
            <strong>{user.name}</strong>
            <small>
              {tx(user.program)} · {user.university.includes('Manizales') ? 'UAM' : user.university}
            </small>
          </span>
        </button>

        <nav className="sidebar__nav">
          {NAV_ITEMS.map(({ view: v, labelKey, icon: Icon }) => (
            <button
              key={v}
              className={`side-link ${view === v ? 'side-link--active' : ''}`}
              onClick={() => setView(v)}
              aria-current={view === v ? 'page' : undefined}
            >
              <span className="side-link__icon"><Icon size={20} /></span>
              <span className="side-link__label">{t(labelKey)}</span>
              {counters[v] > 0 && <span className="side-link__count">{counters[v]}</span>}
            </button>
          ))}
        </nav>

        <button
          className="btn btn--primary btn--block btn--lg sidebar__create"
          onClick={() => {
            setSidebarOpen(false);
            setCreateType('general');
          }}
        >
          <PenLine size={18} /> {t('nav.createPost')}
        </button>

        <div className="info-card">
          <span className="info-card__icon"><GraduationCap size={20} /></span>
          <div>
            <strong>{t('sidebar.pilotTitle')}</strong>
            <p>{t('sidebar.pilotText')}</p>
          </div>
        </div>

        <button className="side-link sidebar__logout" onClick={logout}>
          <span className="side-link__icon"><LogOut size={20} /></span>
          <span className="side-link__label">{t('nav.logout')}</span>
        </button>

        <p className="sidebar__foot">{t('sidebar.foot')}</p>
      </aside>
    </>
  );
}
