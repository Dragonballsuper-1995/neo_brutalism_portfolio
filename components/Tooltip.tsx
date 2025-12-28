import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'top', className = '', disabled = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 1. Positioning Classes (Outer Div)
  // These handle strict placement relative to the parent.
  // We use -translate-x/y-1/2 to center the tooltip geometrically.
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-3';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-3';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-3';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-3';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-3';
    }
  };

  // 2. Animation Classes (Inner Div)
  // These handle the slide-in and fade-in effects.
  const getAnimationClasses = () => {
    const baseVisible = isHovered && !disabled;
    switch (position) {
      case 'top':
        return baseVisible ? 'translate-y-0' : 'translate-y-2';
      case 'bottom':
        return baseVisible ? 'translate-y-0' : '-translate-y-2';
      case 'left':
        return baseVisible ? 'translate-x-0' : 'translate-x-2';
      case 'right':
        return baseVisible ? 'translate-x-0' : '-translate-x-2';
      default:
        return baseVisible ? 'translate-y-0' : 'translate-y-2';
    }
  };

  const showTooltip = isHovered && !disabled;

  return (
    <div 
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {/* OUTER POSITIONER: Handles strictly layout/positioning */}
      <div 
        role="tooltip"
        className={`absolute ${getPositionClasses()} z-[100] pointer-events-none flex flex-col items-center justify-center`}
      >
        {/* INNER ANIMATOR: Handles opacity and slide transitions */}
        <div 
          className={`
            ${getAnimationClasses()}
            bg-neo-black text-neo-white dark:bg-neo-dark-border dark:text-neo-dark-bg
            px-3 py-1.5 font-mono font-bold text-xs uppercase tracking-wider
            border-2 border-black dark:border-neo-dark-border
            whitespace-nowrap shadow-neo-sm dark:shadow-neo-sm-dark
            transition-all duration-200 ease-out
            ${showTooltip ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Tooltip);