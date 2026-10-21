import { useState } from 'react';
import { FilePlus2, GraduationCap, Mail, PenLine } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Avatar from '../components/Avatar.jsx';
import EmptyState from '../components/EmptyState.jsx';
import EventCard from '../components/EventCard.jsx';
import PostCard from '../components/PostCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ServiceCard from '../components/ServiceCard.jsx';

const CREATE_FOR_TAB = { posts: 'general', products: 'producto', services: 'servicio', events: 'evento' };

export default function MyPostsPage() {
  const { user, posts, products, services, events, setCreateType, saved } = useApp();
  const { t, tx } = useI18n();
  const [tab, setTab] = useState('posts');

  const mine = {
    posts: posts.filter((p) => p.authorId === 'me'),
    products: products.filter((p) => p.sellerId === 'me'),
    services: services.filter((s) => s.providerId === 'me'),
    events: events.filter((e) => e.organizerId === 'me'),
  };
  const tabs = ['posts', 'products', 'services', 'events'];
  const current = mine[tab];

  return (
    <div className="page">
      <section className="card profile-hero">
        <div className="profile-hero__cover" aria-hidden="true" />
        <div className="profile-hero__body">
          <Avatar person={user} size={112} ring />
          <div className="profile-hero__info">
            <h1>{user.name}</h1>
            <p><GraduationCap size={16} /> {tx(user.program)} · {user.university}</p>
            <p><Mail size={16} /> {user.email}</p>
          </div>
          <button className="btn btn--primary" onClick={() => setCreateType('general')}>
            <PenLine size={18} /> {t('nav.createPost')}
          </button>
        </div>
        <div className="profile-hero__stats">
          <div><strong>{mine.posts.length}</strong><small>{t('mine.statPosts')}</small></div>
          <div><strong>{mine.products.length}</strong><small>{t('mine.statProducts')}</small></div>
          <div><strong>{mine.services.length}</strong><small>{t('mine.statServices')}</small></div>
          <div><strong>{saved.size}</strong><small>{t('mine.statSaved')}</small></div>
        </div>
        <div className="tabs-line" role="tablist">
          {tabs.map((id) => (
            <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? 'is-active' : ''} onClick={() => setTab(id)}>
              {t(`mine.${id}`)} <span className="tabs-line__count">{mine[id].length}</span>
            </button>
          ))}
        </div>
      </section>

      {current.length === 0 ? (
        <EmptyState
          icon={FilePlus2}
          title={t('mine.emptyTitle')}
          text={t('mine.emptyText')}
          action={
            <button className="btn btn--primary" onClick={() => setCreateType(CREATE_FOR_TAB[tab])}>
              {t('mine.first')}
            </button>
          }
        />
      ) : tab === 'posts' ? (
        <div className="feed feed--narrow">{current.map((p) => <PostCard key={p.id} post={p} />)}</div>
      ) : (
        <div className={`grid ${tab === 'products' ? 'grid--products' : tab === 'events' ? 'grid--events' : 'grid--services'}`}>
          {tab === 'products' && current.map((p) => <ProductCard key={p.id} product={p} />)}
          {tab === 'services' && current.map((s) => <ServiceCard key={s.id} service={s} />)}
          {tab === 'events' && current.map((e) => <EventCard key={e.id} event={e} />)}
        </div>
      )}
    </div>
  );
}
