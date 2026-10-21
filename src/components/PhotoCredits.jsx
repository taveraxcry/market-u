import { useState } from 'react';
import { Camera, ExternalLink } from 'lucide-react';
import { PHOTOS, creditFor } from '../data/photos.js';
import { useI18n } from '../i18n/LanguageContext.jsx';
import Modal from './Modal.jsx';

/** Small credit line for a Wikimedia Commons photo (nothing for other images). */
export function PhotoCredit({ src, className = '' }) {
  const { t } = useI18n();
  const c = creditFor(src);
  if (!c) return null;
  return (
    <a className={`photo-credit ${className}`} href={c.page} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
      <Camera size={11} /> {t('credits.photoBy', { author: c.author, license: c.license })}
    </a>
  );
}

/** "Créditos de fotos" link that opens the full list of photo authors and licenses. */
export default function PhotoCreditsButton({ className = '' }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={`link-btn credits-link ${className}`} onClick={() => setOpen(true)}>
        <Camera size={13} /> {t('credits.link')}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title={t('credits.title')} size="md">
        <p className="credits__intro">{t('credits.intro')}</p>
        <ul className="credits__list">
          {Object.values(PHOTOS).map((p) => (
            <li key={p.page}>
              <img src={p.url} alt="" loading="lazy" />
              <div>
                <strong>{p.place}</strong>
                <span>{p.author} · {p.license}</span>
                <a href={p.page} target="_blank" rel="noreferrer">
                  {t('credits.viewOriginal')} <ExternalLink size={12} />
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );
}
