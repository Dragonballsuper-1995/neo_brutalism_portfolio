
import React from 'react';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import NeoButton from './NeoButton';

export type ButtonStatus = 'idle' | 'loading' | 'success' | 'error';

interface StatefulButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  status: ButtonStatus;
  children: React.ReactNode;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'black';
}

const StatefulButton: React.FC<StatefulButtonProps> = ({
  status,
  children,
  loadingText = "Processing...",
  successText = "Success!",
  errorText = "Error!",
  className = "",
  variant = "primary",
  ...props
}) => {
  
  const getStatusStyles = () => {
    switch (status) {
      case 'loading':
        return 'cursor-wait opacity-80';
      case 'success':
        return '!bg-neo-green !text-black !border-black hover:!bg-neo-green hover:!shadow-neo';
      case 'error':
        return '!bg-neo-pink !text-black !border-black hover:!bg-neo-pink hover:!shadow-neo';
      default:
        return '';
    }
  };

  const content = {
    idle: children,
    loading: (
      <>
        <Loader2 className="animate-spin" size={20} />
        {loadingText}
      </>
    ),
    success: (
      <>
        <Check size={20} strokeWidth={3} />
        {successText}
      </>
    ),
    error: (
      <>
        <AlertCircle size={20} strokeWidth={3} />
        {errorText}
      </>
    )
  };

  return (
    <NeoButton
      variant={variant}
      className={`transition-all duration-200 min-w-[140px] ${getStatusStyles()} ${className}`}
      disabled={status === 'loading' || status === 'success'}
      {...props}
    >
      <span className="flex items-center justify-center gap-2 animate-[fadeIn_0.2s_ease-out]">
        {content[status]}
      </span>
    </NeoButton>
  );
};

export default React.memo(StatefulButton);
