import { useEffect, useRef, useState } from 'react';
import { Info, Send } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Avatar from './Avatar.jsx';
import Modal from './Modal.jsx';

export default function ChatModal() {
  const { chatId, setChatId, conversations, getPerson, sendMessage, user } = useApp();
  const { t, tx } = useI18n();
  const [draft, setDraft] = useState('');
  const listRef = useRef(null);
  const conv = conversations.find((c) => c.id === chatId);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [conv?.messages.length]);

  useEffect(() => setDraft(''), [chatId]);

  if (!conv) return null;
  const person = getPerson(conv.personId);
  const topic = tx(conv.topic);
  const last = conv.messages[conv.messages.length - 1];
  const waiting = last?.from === 'me';
  const suggestions = [t('chat.s1'), t('chat.s2'), t('chat.s3')];

  const send = (text) => {
    const value = text.trim();
    if (!value) return;
    sendMessage(conv.id, value);
    setDraft('');
  };

  return (
    <Modal open onClose={() => setChatId(null)} size="sm" className="modal--chat">
      <div className="chat">
        <header className="chat__head">
          <Avatar person={person} size={44} />
          <div>
            <strong>{person.name}</strong>
            <small>{t('topbar.about', { topic })}</small>
          </div>
        </header>
        <div className="chat__notice">
          <Info size={14} /> {t('chat.notice')}
        </div>
        <div className="chat__list" ref={listRef}>
          {conv.messages.length === 0 && (
            <div className="chat__empty">
              <Avatar person={person} size={64} />
              <strong>{person.name}</strong>
              <small>{tx(person.program)}</small>
              <p>{t('chat.start', { topic })}</p>
            </div>
          )}
          {conv.messages.map((m, i) => (
            <div key={i} className={`bubble-row ${m.from === 'me' ? 'bubble-row--me' : ''}`}>
              {m.from !== 'me' && <Avatar person={person} size={28} />}
              <div className={`bubble ${m.from === 'me' ? 'bubble--me' : ''}`}>
                {tx(m.text)}
                {m.simulated && <span className="bubble__tag">{t('chat.simulated')}</span>}
              </div>
            </div>
          ))}
          {waiting && (
            <div className="bubble-row">
              <Avatar person={person} size={28} />
              <div className="bubble bubble--typing" aria-label={t('chat.typing', { name: person.name })}>
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>
        {conv.messages.length === 0 && (
          <div className="chat__suggestions">
            {suggestions.map((s) => (
              <button key={s} className="chip" onClick={() => send(s)}>{s}</button>
            ))}
          </div>
        )}
        <form
          className="chat__form"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <Avatar person={user} size={32} />
          <label htmlFor="chat-input" className="sr-only">{t('chat.inputLabel')}</label>
          <input id="chat-input" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={t('chat.inputPh')} autoComplete="off" />
          <button type="submit" className="icon-btn icon-btn--blue" disabled={!draft.trim()} aria-label={t('chat.send')}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </Modal>
  );
}
