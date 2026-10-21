import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext.jsx';

export default function Modal({ open, onClose, title, children, size = 'md', footer, className = '' }) {
  const { t } = useI18n();
  const panelRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    const onKey = (e) => {
      if (e.key === 'Escape') closeRef.current();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => panelRef.current?.focus(), 30);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className={`modal modal--${size} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        ref={panelRef}
        tabIndex={-1}
      >
        {title && (
          <header className="modal__header">
            <h2>{title}</h2>
          </header>
        )}
        <button className="modal__close icon-btn" onClick={onClose} aria-label={t('common.close')}>
          <X size={20} />
        </button>
        <div className="modal__body">{children}</div>
        {footer && <footer className="modal__footer">{footer}</footer>}
      </div>
    </div>
  );
}
