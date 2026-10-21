import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useI18n } from '../i18n/LanguageContext.jsx';

const CLOSE_DISTANCE = 110; // px dragged down to close the sheet on phones

export default function Modal({ open, onClose, title, children, size = 'md', footer, className = '' }) {
  const { t } = useI18n();
  const panelRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const drag = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    const onKey = (e) => {
      if (e.key === 'Escape') closeRef.current();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => panelRef.current?.focus({ preventScroll: true }), 30);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus?.({ preventScroll: true });
    };
  }, [open]);

  // ----- drag the sheet down to close (phones) -----
  const isSheet = () => window.matchMedia('(max-width: 640px)').matches;

  const onDragStart = (e) => {
    if (!isSheet() || e.target.closest('button')) return;
    drag.current = { startY: e.clientY, dy: 0 };
    e.currentTarget.setPointerCapture?.(e.pointerId);
    panelRef.current.style.transition = 'none';
  };
  const onDragMove = (e) => {
    if (!drag.current) return;
    const dy = Math.max(0, e.clientY - drag.current.startY);
    drag.current.dy = dy;
    panelRef.current.style.transform = `translateY(${dy}px)`;
  };
  const onDragEnd = () => {
    if (!drag.current) return;
    const { dy } = drag.current;
    drag.current = null;
    const panel = panelRef.current;
    panel.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)';
    if (dy > CLOSE_DISTANCE) {
      panel.style.transform = 'translateY(100%)';
      setTimeout(() => closeRef.current(), 200);
    } else {
      panel.style.transform = '';
    }
  };
  const dragProps = {
    onPointerDown: onDragStart,
    onPointerMove: onDragMove,
    onPointerUp: onDragEnd,
    onPointerCancel: onDragEnd,
  };

  if (!open) return null;

  // Rendered at the end of <body> so no parent (sticky sidebar, rail…) can sit on top of it.
  return createPortal(
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className={`modal modal--${size} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="modal__grab" {...dragProps} aria-hidden="true">
          <span />
        </div>
        {title && (
          <header className="modal__header" {...dragProps}>
            <h2>{title}</h2>
          </header>
        )}
        <button className="modal__close icon-btn" onClick={onClose} aria-label={t('common.close')}>
          <X size={20} />
        </button>
        <div className="modal__body">{children}</div>
        {footer && <footer className="modal__footer">{footer}</footer>}
      </div>
    </div>,
    document.body
  );
}
