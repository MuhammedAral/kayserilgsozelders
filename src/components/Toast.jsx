import { useEffect } from 'react';

/**
 * Native alert() yerine kullanılan, sitenin tasarım diline uyan bildirim.
 * Kapsayıcı her zaman DOM'da durur; böylece aria-live bildirimi
 * ekran okuyucular tarafından güvenilir şekilde duyurulur.
 */
const Toast = ({ message, onDismiss, duration = 4000 }) => {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  return (
    <div className={`toast ${message ? 'toast-visible' : ''}`} role="status" aria-live="polite">
      {message && (
        <>
          <span className="toast-icon" aria-hidden="true">
            ⏳
          </span>
          <span className="toast-text">{message}</span>
          <button type="button" className="toast-close" onClick={onDismiss} aria-label="Bildirimi kapat">
            ×
          </button>
        </>
      )}
    </div>
  );
};

export default Toast;
