import { useEffect, useRef, useState } from 'react';

/** Small popover anchored to a trigger. Closes on outside click and Escape. */
export default function Dropdown({ trigger, children, align = 'right', className = '', onOpen }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const toggle = () => {
    setOpen((o) => {
      if (!o) onOpen?.();
      return !o;
    });
  };

  return (
    <div className={`dropdown ${className}`} ref={ref}>
      {trigger({ open, toggle })}
      {open && (
        <div className={`dropdown__panel dropdown__panel--${align}`} role="menu">
          {children({ close: () => setOpen(false) })}
        </div>
      )}
    </div>
  );
}
