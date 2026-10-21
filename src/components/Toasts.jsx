import { CircleAlert, CircleCheck, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { useI18n } from '../i18n/LanguageContext.jsx';

const ICONS = { success: CircleCheck, info: Info, error: CircleAlert };

export default function Toasts() {
  const { toasts, dismissToast } = useApp();
  const { t } = useI18n();
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.tone] || Info;
        return (
          <div key={toast.id} className={`toast toast--${toast.tone}`}>
            <Icon size={20} />
            <span>{toast.message}</span>
            <button className="toast__close" onClick={() => dismissToast(toast.id)} aria-label={t('common.dismissToast')}>
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
