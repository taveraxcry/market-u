import { useRef, useState } from 'react';
import { Bell, Bookmark, ChevronDown, FileText, LogOut, Menu, MessageCircle, Plus, Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Avatar from './Avatar.jsx';
import Dropdown from './Dropdown.jsx';
import LanguageToggle from './LanguageToggle.jsx';
import Logo from './Logo.jsx';

export default function Topbar() {
  const {
    user, view, setView, searchQuery, setSearchQuery, setSidebarOpen, notifications, markNotificationsRead,
    conversations, openConversation, getPerson, logout, setCreateType,
  } = useApp();
  const { t, tx, timeAgo } = useI18n();
  const [searchOpen, setSearchOpen] = useState(false); // phones: search expands over the bar
  const searchRef = useRef(null);

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => searchRef.current?.focus(), 30);
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const unreadMessages = conversations.filter((c) => c.unread).length;

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() && view !== 'search') setView('search');
  };

  const clearSearch = () => {
    setSearchQuery('');
    setView('home');
  };

  return (
    <header className={`topbar ${searchOpen ? 'is-searching' : ''}`}>
      <div className="topbar__left">
        <button className="icon-btn topbar__menu" onClick={() => setSidebarOpen(true)} aria-label={t('nav.openMenu')}>
          <Menu size={22} />
        </button>
        <button className="topbar__brand" onClick={() => setView('home')} aria-label={t('topbar.goHome')}>
          <Logo size={36} />
        </button>
      </div>

      <div className="topbar__center">
        <form
          className="search"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) setView('search');
          }}
        >
          <Search size={18} className="search__icon" aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={onSearchChange}
            placeholder={t('topbar.searchPh')}
            ref={searchRef}
            aria-label={t('topbar.searchLabel')}
          />
          {searchQuery && (
            <button type="button" className="search__clear" onClick={clearSearch} aria-label={t('topbar.clearSearch')}>
              <X size={16} />
            </button>
          )}
        </form>
        <button type="button" className="icon-btn topbar__search-close" onClick={() => setSearchOpen(false)} aria-label={t('common.close')}>
          <X size={20} />
        </button>
      </div>

      <div className="topbar__right">
        <button type="button" className="round-btn topbar__search-btn" onClick={openSearch} aria-label={t('topbar.searchLabel')}>
          <Search size={19} />
        </button>
        <LanguageToggle />

        <button className="btn btn--primary btn--sm topbar__create" onClick={() => setCreateType('general')}>
          <Plus size={18} /> <span>{t('topbar.publish')}</span>
        </button>

        <Dropdown
          className="topbar__msgs"
          trigger={({ toggle, open }) => (
            <button className={`round-btn ${open ? 'is-open' : ''}`} onClick={toggle} aria-label={t('nav.messages')} aria-expanded={open}>
              <MessageCircle size={20} />
              {unreadMessages > 0 && <span className="badge">{unreadMessages}</span>}
            </button>
          )}
        >
          {({ close }) => (
            <div className="menu-list">
              <div className="menu-list__head">
                <h3>{t('nav.messages')}</h3>
                <span className="pill pill--soft">{t('topbar.simulated')}</span>
              </div>
              {conversations.length === 0 && <p className="menu-list__empty">{t('topbar.noConversations')}</p>}
              {conversations.slice(0, 5).map((c) => {
                const person = getPerson(c.personId);
                const last = c.messages[c.messages.length - 1];
                return (
                  <button
                    key={c.id}
                    className={`menu-item ${c.unread ? 'is-unread' : ''}`}
                    onClick={() => {
                      openConversation(c.id);
                      close();
                    }}
                  >
                    <Avatar person={person} size={44} />
                    <span className="menu-item__text">
                      <strong>{person.name}</strong>
                      <small>{last ? tx(last.text) : t('topbar.about', { topic: tx(c.topic) })}</small>
                    </span>
                    {c.unread && <span className="dot" />}
                  </button>
                );
              })}
              <button
                className="menu-list__footer"
                onClick={() => {
                  setView('messages');
                  close();
                }}
              >
                {t('topbar.seeAllMessages')}
              </button>
            </div>
          )}
        </Dropdown>

        <Dropdown
          trigger={({ toggle, open }) => (
            <button
              className={`round-btn ${open ? 'is-open' : ''}`}
              onClick={toggle}
              aria-label={t('topbar.notificationsAria', { n: unreadNotifications })}
              aria-expanded={open}
            >
              <Bell size={20} />
              {unreadNotifications > 0 && <span className="badge">{unreadNotifications}</span>}
            </button>
          )}
        >
          {() => (
            <div className="menu-list">
              <div className="menu-list__head">
                <h3>{t('topbar.notifications')}</h3>
                {unreadNotifications > 0 && (
                  <button className="link-btn" onClick={markNotificationsRead}>
                    {t('topbar.markRead')}
                  </button>
                )}
              </div>
              {notifications.map((n) => {
                const person = getPerson(n.personId);
                return (
                  <div key={n.id} className={`menu-item menu-item--static ${!n.read ? 'is-unread' : ''}`}>
                    <Avatar person={person} size={44} />
                    <span className="menu-item__text">
                      <span>
                        <strong>{person.name}</strong> {tx(n.text)}
                      </span>
                      <small className={!n.read ? 'text-blue' : ''}>{timeAgo(n.createdAt)}</small>
                    </span>
                    {!n.read && <span className="dot" />}
                  </div>
                );
              })}
            </div>
          )}
        </Dropdown>

        <Dropdown
          trigger={({ toggle, open }) => (
            <button className="profile-btn" onClick={toggle} aria-label={t('topbar.userMenu')} aria-expanded={open}>
              <Avatar person={user} size={38} />
              <ChevronDown size={16} className="profile-btn__chev" />
            </button>
          )}
        >
          {({ close }) => (
            <div className="menu-list menu-list--profile">
              <div className="profile-card">
                <Avatar person={user} size={52} />
                <div>
                  <strong>{user.name}</strong>
                  <small>{user.email}</small>
                  <small>{user.university}</small>
                </div>
              </div>
              <button className="menu-item" onClick={() => { setView('mine'); close(); }}>
                <span className="menu-item__icon"><FileText size={18} /></span>
                <span className="menu-item__text"><strong>{t('nav.mine')}</strong></span>
              </button>
              <button className="menu-item" onClick={() => { setView('saved'); close(); }}>
                <span className="menu-item__icon"><Bookmark size={18} /></span>
                <span className="menu-item__text"><strong>{t('nav.saved')}</strong></span>
              </button>
              <button className="menu-item menu-item--danger" onClick={() => { close(); logout(); }}>
                <span className="menu-item__icon"><LogOut size={18} /></span>
                <span className="menu-item__text"><strong>{t('nav.logout')}</strong></span>
              </button>
            </div>
          )}
        </Dropdown>
      </div>
    </header>
  );
}
