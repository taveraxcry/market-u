import { useState } from 'react';
import { CATEGORY_TINTS, iconFor } from './categoryIcons.js';

/** Image with a branded fallback when the URL is missing or fails to load. */
export default function SmartImage({ src, alt, category, className = '', label }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || failed) {
    const Icon = iconFor(category);
    const [from, to] = CATEGORY_TINTS[category] || ['#D98F00', '#EF5D3A'];
    return (
      <div
        className={`smart-img smart-img--fallback ${className}`}
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
        role="img"
        aria-label={alt}
      >
        <Icon size={40} strokeWidth={1.6} />
        {label && <span>{label}</span>}
      </div>
    );
  }

  return (
    <div className={`smart-img ${loaded ? 'is-loaded' : ''} ${className}`}>
      <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} onLoad={() => setLoaded(true)} />
    </div>
  );
}
