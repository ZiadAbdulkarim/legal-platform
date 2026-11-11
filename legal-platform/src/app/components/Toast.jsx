import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  if (!message) return null;

  return (
    <div className={`judicial-toast judicial-toast--${type}`} role="alert">
      <div className="judicial-toast__icon">
        {type === 'success' ? <CheckCircle2 size={18} /> : <Info size={18} />}
      </div>
      <div className="judicial-toast__message">{message}</div>
    </div>
  );
}

