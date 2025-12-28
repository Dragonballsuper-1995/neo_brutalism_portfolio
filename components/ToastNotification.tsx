import React, { useEffect } from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface ToastNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'error';
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message, isVisible, onClose, type = 'success' }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-dismiss after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const config = {
    success: {
      bgColor: 'bg-neo-green',
      icon: <CheckCircle size={24} />,
    },
    error: {
      bgColor: 'bg-neo-pink',
      icon: <AlertTriangle size={24} />,
    }
  };

  const { bgColor, icon } = config[type];

  return (
    <div
      className={`
        fixed bottom-8 left-1/2 -translate-x-1/2 z-[3005]
        transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}
      `}
      role="alert"
      aria-live="assertive"
    >
      <div className={`flex items-center gap-4 ${bgColor} text-black font-mono font-bold uppercase tracking-wider p-4 border-4 border-black shadow-neo-lg`}>
        {icon}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default React.memo(ToastNotification);