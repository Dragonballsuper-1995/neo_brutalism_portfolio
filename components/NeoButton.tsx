
import React from 'react';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'black';
  className?: string;
}

const NeoButton: React.FC<NeoButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const getBaseStyles = () => {
    switch(variant) {
      case 'primary': return 'bg-neo-yellow hover:bg-neo-green text-black'; 
      case 'secondary': return 'bg-neo-orange hover:bg-neo-yellow text-black';
      case 'accent': return 'bg-neo-blue text-black hover:bg-neo-purple hover:text-white'; // Changed hover
      case 'black': return 'bg-black text-white hover:bg-gray-900 dark:bg-neo-dark-border dark:text-neo-dark-bg dark:hover:bg-gray-200';
      case 'outline': return 'bg-white hover:bg-neo-pink text-black dark:bg-transparent dark:text-neo-dark-text dark:hover:bg-neo-pink dark:hover:text-black'; 
      default: return 'bg-neo-yellow text-black';
    }
  };

  return (
    <button
      className={`
        ${getBaseStyles()}
        font-mono font-bold border-4 border-black dark:border-neo-dark-border
        shadow-neo hover:shadow-neo-lg dark:shadow-neo-dark dark:hover:shadow-neo-lg-dark
        hover:-translate-y-1
        active:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:scale-[0.98]
        transition-all duration-200 px-8 py-3 uppercase tracking-wider
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default React.memo(NeoButton);
