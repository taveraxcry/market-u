import { useRef, useState } from 'react';
import { ChevronDown, GraduationCap, LogOut, PanelLeftClose, PanelLeftOpen, PenLine, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Avatar from './Avatar.jsx';
import Logo from './Logo.jsx';
import PhotoCreditsButton from './PhotoCredits.jsx';
import { NAV_SECTIONS } from './navigation.js';

export default function Sidebar() {
  const {
    user, view, setView, sidebarOpen, setSidebarOpen, sidebarCollapsed, toggleSidebar, setCreateType, conversations,
    saved, logout,
  } = useApp();
  const { t, tx } = useI18n();
  const [openSections, setOpenSections] = useState({ explore: true, mine: true });
  const unread = conversations.filter((c) => c.unread).length;
  const counters = { messages: unread, saved: saved.size };
  // On phones the menu is a drawer and is never shown as an icon rail.
  const collapsed = sidebarCollapsed && !sidebarOpen;

  // Swipe the drawer to the left to close it (phones).
  const swipe = useRef(null);
  const asideRef = useRef(null);
  const onTouchStart = (e) => {
    if (!sidebarOpen) return;
    swipe.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, dx: 0, horizontal: null };
  };
  const onTouchMove = (e) => {
    const s = swipe.current;
    if (!s) return;
    const dx = e.touches[0].clientX - s.x;
    const dy = e.touches[0].clientY - s.y;
    if (s.horizontal === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) s.horizontal = Math.abs(dx) > Math.abs(dy);
    if (!s.horizontal) return;
    s.dx = Math.min(0, dx);
    asideRef.current.style.transition = 'none';
    asideRef.current.style.transform = `translateX(${s.dx}px)`;
  };
  const onTouchEnd = () => {
    const s = swipe.current;
    swipe.current = null;
    if (!s?.horizontal) return;
    asideRef.current.style.transition = '';
    asideRef.current.style.transform = '';
    if (s.dx < -70) setSidebarOpen(false);
  };

  const toggleSection = (id) => setOpenSections((s) => ({ ...s, [id]: !s[id] }));

  return (
    <>
      <div className={`sidebar-scrim ${sidebarOpen ? 'is-visible' : ''}`} onClick={() => setSidebarOpen(false)} />
      <aside
        ref={asideRef}
        className={`sidebar ${sidebarOpen ? 'is-open' : ''} ${collapsed ? 'is-collapsed' : ''}`}
        aria-label={t('nav.sideMenu')}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="sidebar__mobile-head">
          <Logo size={34} />
          <button className="icon-btn" onClick={() => setSidebarOpen(false)} aria-label={t('nav.closeMenu')}>
            <X size={22} />
          </button>
        </div>

        <div className="sidebar__top">
          <button className="sidebar__profile" onClick={() => setView('mine')} title={collapsed ? user.name : undefined}>
            <Avatar person={user} size={collapsed ? 40 : 44} ring />
            <span className="sidebar__profile-text">
              <strong>{user.name}</strong>
              <small>
                {tx(user.program)} · {user.university.includes('Manizales') ? 'UAM' : user.university}
              </small>
            </span>
          </button>
          <button
            className="sidebar__collapse"
            onClick={toggleSidebar}
            aria-label={collapsed ? t('nav.expand') : t('nav.collapse')}
            title={collapsed ? t('nav.expand') : t('nav.collapse')}
            aria-expanded={!collapsed}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        <nav className="sidebar__nav">
          {NAV_SECTIONS.map((section) => {
            const open = collapsed || openSections[section.id];
            return (
              <div key={section.id} className={`nav-section ${open ? 'is-open' : ''}`}>
                <button
                  className="nav-section__head"
                  onClick={() => toggleSection(section.id)}
                  aria-expanded={open}
                  aria-controls={`nav-${section.id}`}
                  tabIndex={collapsed ? -1 : 0}
                >
                  <span>{t(section.labelKey)}</span>
                  <ChevronDown size={16} className="nav-section__chev" />
                </button>
                <div className="nav-section__body" id={`nav-${section.id}`}>
                  <div className="nav-section__inner">
                    {section.items.map(({ view: v, labelKey, icon: Icon }) => (
                      <button
                        key={v}
                        className={`side-link ${view === v ? 'side-link--active' : ''}`}
                        onClick={() => setView(v)}
                        aria-current={view === v ? 'page' : undefined}
                        title={collapsed ? t(labelKey) : undefined}
                        tabIndex={open ? 0 : -1}
                      >
                        <span className="side-link__icon">
                          <Icon size={19} />
                          {collapsed && counters[v] > 0 && <span className="side-link__dot" />}
                        </span>
                        <span className="side-link__label">{t(labelKey)}</span>
                        {counters[v] > 0 && <span className="side-link__count">{counters[v]}</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <button
          className="btn btn--primary btn--block btn--lg sidebar__create"
          onClick={() => {
            setSidebarOpen(false);
            setCreateType('general');
          }}
          title={collapsed ? t('nav.createPost') : undefined}
        >
          <PenLine size={18} /> <span className="sidebar__create-label">{t('nav.createPost')}</span>
        </button>

        <div className="info-card">
          <span className="info-card__icon"><GraduationCap size={20} /></span>
          <div>
            <strong>{t('sidebar.pilotTitle')}</strong>
            <p>{t('sidebar.pilotText')}</p>
          </div>
        </div>

        <button className="side-link sidebar__logout" onClick={logout} title={collapsed ? t('nav.logout') : undefined}>
          <span className="side-link__icon"><LogOut size={19} /></span>
          <span className="side-link__label">{t('nav.logout')}</span>
        </button>

        <p className="sidebar__foot">{t('sidebar.foot')}</p>
        <PhotoCreditsButton className="sidebar__credits" />
      </aside>
    </>
  );
}
