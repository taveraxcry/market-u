import { ArrowRight, CalendarDays, Info, Lightbulb, Star, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Avatar from './Avatar.jsx';
import SmartImage from './SmartImage.jsx';

export default function RightRail() {
  const { events, services, products, setView, setDetail, getPerson, interested } = useApp();
  const { t, tx, tc, eventDateParts } = useI18n();
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
  const businesses = services.filter((s) => s.kind === 'emprendimiento').slice(0, 3);

  return (
    <aside className="rail" aria-label={t('rail.aria')}>
      <section className="card rail__card">
        <header className="rail__head">
          <h2><CalendarDays size={18} /> {t('rail.upcoming')}</h2>
          <button className="link-btn" onClick={() => setView('events')}>{t('rail.seeAll')}</button>
        </header>
        <ul className="rail__list">
          {upcoming.map((e) => {
            const { day, month } = eventDateParts(e.date);
            return (
              <li key={e.id}>
                <button className="rail-event" onClick={() => setDetail({ kind: 'event', id: e.id })}>
                  <span className="rail-event__date"><strong>{day}</strong><small>{month}</small></span>
                  <span className="rail-event__text">
                    <strong>{tx(e.name)}</strong>
                    <small>
                      {interested.has(e.id) && <Star size={12} fill="currentColor" className="text-coral" />}{' '}
                      {t('rail.interested', { n: e.interested, cat: tc(e.category) })}
                    </small>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="rail__note">{t('rail.demoNote')}</p>
      </section>

      <section className="card rail__card">
        <header className="rail__head">
          <h2><Lightbulb size={18} /> {t('rail.businesses')}</h2>
          <button className="link-btn" onClick={() => setView('businesses')}>{t('rail.explore')}</button>
        </header>
        <ul className="rail__list">
          {businesses.map((biz) => (
            <li key={biz.id}>
              <button className="rail-biz" onClick={() => setDetail({ kind: 'service', id: biz.id })}>
                <SmartImage src={biz.image} alt="" category={biz.category} className="rail-biz__img" />
                <span className="rail-biz__text">
                  <strong>{tx(biz.name).split(' — ')[0]}</strong>
                  <small>{getPerson(biz.providerId).name} · {tc(biz.category)}</small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="card rail__card rail__stats">
        <h2><TrendingUp size={18} /> {t('rail.community')}</h2>
        <div className="stats-grid">
          <div><strong>{products.length}</strong><small>{t('rail.products')}</small></div>
          <div><strong>{services.length}</strong><small>{t('rail.services')}</small></div>
          <div><strong>{events.length}</strong><small>{t('rail.events')}</small></div>
        </div>
        <button className="btn btn--soft btn--block btn--sm" onClick={() => setView('marketplace')}>
          {t('rail.goMarket')} <ArrowRight size={16} />
        </button>
      </section>

      <section className="rail__people">
        <h2>{t('rail.activeNow')}</h2>
        {['valentina', 'santiago', 'mariana', 'julian'].map((id) => {
          const p = getPerson(id);
          return (
            <div key={id} className="rail-person">
              <span className="rail-person__avatar"><Avatar person={p} size={34} /><span className="online" /></span>
              <span>{p.name}</span>
            </div>
          );
        })}
      </section>

      <p className="rail__legal">
        <Info size={13} /> {t('rail.legal')}
      </p>
    </aside>
  );
}
