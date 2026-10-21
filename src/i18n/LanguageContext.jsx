import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CATEGORY_EN, CONDITION_LABELS, CONTACT_LABELS, STRINGS } from './strings.js';

const LanguageContext = createContext(null);
const LANG_KEY = 'marketu:lang';
const LOCALES = { es: 'es-CO', en: 'en-US' };

function readLang() {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    return saved === 'en' ? 'en' : 'es';
  } catch {
    return 'es';
  }
}

function lookup(lang, key) {
  return key.split('.').reduce((node, part) => (node ? node[part] : undefined), STRINGS[lang]);
}

function interpolate(text, vars) {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (_, name) => (vars[name] ?? `{${name}}`));
}

/** Translate a key for a given language (falls back to Spanish, then to the key). */
export function translate(lang, key, vars) {
  const value = lookup(lang, key) ?? lookup('es', key);
  if (typeof value !== 'string') {
    console.warn(`[i18n] missing key: ${key}`);
    return key;
  }
  return interpolate(value, vars);
}

/** Pick the right language from a bilingual value ({ es, en }) or return plain strings as-is. */
export function pick(lang, value) {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value[lang] ?? value.es ?? '';
  return value ?? '';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo(() => {
    const locale = LOCALES[lang];
    const t = (key, vars) => translate(lang, key, vars);
    const tx = (v) => pick(lang, v);
    // Builds a bilingual value, used for text the app generates automatically.
    const tAll = (key, vars) => ({ es: translate('es', key, vars), en: translate('en', key, vars) });
    const tc = (category) => (lang === 'en' ? CATEGORY_EN[category] || category : category);
    const tCondition = (key) => CONDITION_LABELS[lang][key] || key;
    const tContact = (key) => CONTACT_LABELS[lang][key] || key;

    const timeAgo = (timestamp) => {
      const minutes = Math.floor(Math.max(0, Date.now() - timestamp) / 60000);
      if (minutes < 1) return t('time.now');
      if (minutes < 60) return t('time.min', { n: minutes });
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return t('time.hours', { n: hours });
      const days = Math.floor(hours / 24);
      if (days === 1) return t('time.yesterday');
      if (days < 7) return t('time.days', { n: days });
      return new Date(timestamp).toLocaleDateString(locale, { day: 'numeric', month: 'short' });
    };

    const eventDate = (iso) => {
      if (!iso) return t('time.tbd');
      const date = new Date(`${iso}T12:00:00`);
      if (Number.isNaN(date.getTime())) return iso;
      return date.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' });
    };

    // "11–13 de noviembre" / "November 11–13"; adds the year when it isn't the current one.
    const eventRange = (start, end) => {
      if (!start) return t('time.tbd');
      const a = new Date(`${start}T12:00:00`);
      if (!end || end === start) return eventDate(start);
      const z = new Date(`${end}T12:00:00`);
      const year = z.getFullYear() !== new Date().getFullYear() ? ` ${lang === 'es' ? 'de ' : ''}${z.getFullYear()}` : '';
      const month = (d) => d.toLocaleDateString(locale, { month: 'long' });
      if (a.getMonth() === z.getMonth()) {
        return lang === 'es'
          ? `${a.getDate()}–${z.getDate()} de ${month(z)}${year}`
          : `${month(z)} ${a.getDate()}–${z.getDate()}${year ? `,${year}` : ''}`;
      }
      return lang === 'es'
        ? `${a.getDate()} de ${month(a)} – ${z.getDate()} de ${month(z)}${year}`
        : `${month(a)} ${a.getDate()} – ${month(z)} ${z.getDate()}${year ? `,${year}` : ''}`;
    };

    const eventDateParts = (iso) => {
      const date = new Date(`${iso}T12:00:00`);
      if (Number.isNaN(date.getTime())) return { day: '--', month: '---' };
      return { day: date.getDate(), month: date.toLocaleDateString(locale, { month: 'short' }).replace('.', '') };
    };

    // "14:00" -> "2:00 p. m." / "2:00 PM"
    const formatTime = (hhmm) => {
      const match = /^(\d{1,2}):(\d{2})$/.exec(hhmm || '');
      if (!match) return hhmm || '';
      const h = Number(match[1]);
      const h12 = h % 12 || 12;
      const suffix = lang === 'es' ? (h < 12 ? 'a. m.' : 'p. m.') : h < 12 ? 'AM' : 'PM';
      return `${h12}:${match[2]} ${suffix}`;
    };

    return { lang, setLang, t, tx, tAll, tc, tCondition, tContact, timeAgo, eventDate, eventRange, eventDateParts, formatTime };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used inside LanguageProvider');
  return ctx;
}
