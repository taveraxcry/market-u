import { Info, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Avatar from '../components/Avatar.jsx';
import EmptyState from '../components/EmptyState.jsx';
import PageHeader from '../components/PageHeader.jsx';

export default function MessagesPage() {
  const { conversations, getPerson, openConversation, setView } = useApp();
  const { t, tx, timeAgo } = useI18n();

  return (
    <div className="page page--narrow">
      <PageHeader icon={MessageCircle} title={t('messages.title')} subtitle={t('messages.subtitle')} />
      <div className="notice notice--info notice--page">
        <Info size={18} />
        <p>{t('messages.notice')}</p>
      </div>
      {conversations.length === 0 ? (
        <EmptyState
          icon={MessageCircle}
          title={t('messages.emptyTitle')}
          text={t('messages.emptyText')}
          action={<button className="btn btn--primary" onClick={() => setView('marketplace')}>{t('messages.goMarket')}</button>}
        />
      ) : (
        <div className="card conv-list">
          {conversations.map((c) => {
            const person = getPerson(c.personId);
            const last = c.messages[c.messages.length - 1];
            return (
              <button key={c.id} className={`conv ${c.unread ? 'is-unread' : ''}`} onClick={() => openConversation(c.id)}>
                <Avatar person={person} size={52} />
                <span className="conv__text">
                  <strong>{person.name}</strong>
                  <small className="conv__topic">{t('topbar.about', { topic: tx(c.topic) })}</small>
                  <span>{last ? `${last.from === 'me' ? t('messages.youPrefix') : ''}${tx(last.text)}` : t('messages.noMessages')}</span>
                </span>
                <span className="conv__time">{last ? timeAgo(last.at) : ''}</span>
                {c.unread && <span className="dot" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
