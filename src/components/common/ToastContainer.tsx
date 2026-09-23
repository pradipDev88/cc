import React from 'react';
import { useToastStore } from '../../store/useToastStore';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import './ToastContainer.scss';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-viewport" aria-live="polite">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="toast-icon success" size={20} />,
          error: <AlertCircle className="toast-icon error" size={20} />,
          warning: <AlertTriangle className="toast-icon warning" size={20} />,
          info: <Info className="toast-icon info" size={20} />
        };

        return (
          <div key={toast.id} className={`toast-card toast-${toast.type}`}>
            <div className="toast-icon-wrap">{icons[toast.type]}</div>
            <div className="toast-content">
              <h4 className="toast-title">{toast.title}</h4>
              {toast.description && <p className="toast-desc">{toast.description}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="toast-close"
              aria-label="Dismiss toast"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
