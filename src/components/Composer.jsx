import { useState } from 'react';
import { Briefcase, CalendarDays, ImagePlus, Lightbulb, Send, Tag } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Avatar from './Avatar.jsx';

const QUICK = [
  { type: 'producto', labelKey: 'composer.product', icon: Tag, tone: 'blue' },
  { type: 'servicio', labelKey: 'composer.service', icon: Briefcase, tone: 'violet' },
  { type: 'evento', labelKey: 'composer.event', icon: CalendarDays, tone: 'coral' },
  { type: 'emprendimiento', labelKey: 'composer.business', icon: Lightbulb, tone: 'amber' },
];

export default function Composer() {
  const { user, createPublication, setCreateType, notify } = useApp();
  const { t } = useI18n();
  const [text, setText] = useState('');

  const publish = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      notify(t('composer.emptyError'), 'error');
      return;
    }
    createPublication('general', { text: text.trim() });
    setText('');
  };

  return (
    <form className="card composer" onSubmit={publish}>
      <div className="composer__top">
        <Avatar person={user} size={44} />
        <label className="sr-only" htmlFor="composer-input">{t('composer.label')}</label>
        <textarea
          id="composer-input"
          rows={text ? 3 : 1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t('composer.placeholder')}
        />
      </div>
      <div className="composer__bottom">
        <div className="composer__options">
          <button type="button" className="composer__opt composer__opt--green" onClick={() => setCreateType('general')}>
            <ImagePlus size={18} /> <span>{t('composer.photo')}</span>
          </button>
          {QUICK.map(({ type, labelKey, icon: Icon, tone }) => (
            <button key={type} type="button" className={`composer__opt composer__opt--${tone}`} onClick={() => setCreateType(type)}>
              <Icon size={18} /> <span>{t(labelKey)}</span>
            </button>
          ))}
        </div>
        <button type="submit" className="btn btn--primary btn--sm" disabled={!text.trim()}>
          <Send size={16} /> {t('common.publish')}
        </button>
      </div>
    </form>
  );
}
