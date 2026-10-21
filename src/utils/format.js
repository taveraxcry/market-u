const copFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

/** Formats a number as Colombian pesos, e.g. $ 1.250.000 */
export function formatCOP(value) {
  if (value === null || value === undefined || value === '') return '';
  return copFormatter.format(Number(value));
}

/** Lowercase, accent-insensitive text for searching. Bilingual values search both languages. */
export function normalize(text = '') {
  const value = text && typeof text === 'object' ? Object.values(text).join(' ') : String(text ?? '');
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

export function matchesQuery(query, ...fields) {
  const q = normalize(query.trim());
  if (!q) return true;
  return fields.some((field) => normalize(field).includes(q));
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export function uid(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

/** Short vibration on phones that support it (Android). Silently ignored elsewhere. */
export function haptic(ms = 10) {
  try {
    navigator.vibrate?.(ms);
  } catch {
    /* not supported */
  }
}

/** Today's date as YYYY-MM-DD in the device's time zone. */
export function todayISO(now = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}`;
}

/** 'past' | 'today' | 'live' (multi-day, in progress) | 'upcoming' */
export function eventStatus(event, today = todayISO()) {
  const end = event.endDate || event.date;
  if (end < today) return 'past';
  if (event.date <= today) return event.endDate && event.endDate !== event.date ? 'live' : 'today';
  return 'upcoming';
}

export const isPast = (event) => eventStatus(event) === 'past';
