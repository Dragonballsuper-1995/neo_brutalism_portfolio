
import React, { useState, useRef, useEffect, createContext, useContext } from 'react';

interface HoverCardContextType {
  open: boolean;
  openDelay: number;
  closeDelay: number;
  onOpen: () => void;
  onClose: () => void;
}

const HoverCardContext = createContext<HoverCardContextType | undefined>(undefined);

interface HoverCardProps {
  children: React.ReactNode;
  openDelay?: number;
  closeDelay?: number;
  className?: string;
}

export const HoverCard: React.FC<HoverCardProps> = ({ 
  children, 
  openDelay = 200, 
  closeDelay = 300,
  className = "relative inline-block"
}) => {
  const [open, setOpen] = useState(false);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const onOpen = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    openTimerRef.current = window.setTimeout(() => setOpen(true), openDelay);
  };

  const onClose = () => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => setOpen(false), closeDelay);
  };

  useEffect(() => {
    return () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <HoverCardContext.Provider value={{ open, openDelay, closeDelay, onOpen, onClose }}>
      <div 
        className={className}
        onMouseEnter={onOpen} 
        onMouseLeave={onClose}
        onFocus={onOpen}
        onBlur={onClose}
      >
        {children}
      </div>
    </HoverCardContext.Provider>
  );
};

export const HoverCardTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`cursor-pointer ${className}`}>
      {children}
    </div>
  );
};

export const HoverCardContent: React.FC<{ children: React.ReactNode; className?: string; sideOffset?: number }> = ({ 
  children, 
  className = '',
  sideOffset = 8
}) => {
  const context = useContext(HoverCardContext);
  if (!context) throw new Error("HoverCardContent must be used within HoverCard");

  if (!context.open) return null;

  return (
    <div 
      className={`
        absolute left-1/2 -translate-x-1/2 z-50 w-64
        animate-[scaleIn_0.2s_ease-out] origin-top
        pt-2
        ${className}
      `}
      style={{ top: `calc(100% + ${sideOffset}px)` }}
    >
        {/* Triangle Arrow */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-[6px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-black dark:border-b-neo-dark-border z-20"></div>

        {/* Card Body */}
        <div className="bg-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-dark-border p-4 shadow-neo-lg dark:shadow-neo-lg-dark relative z-10">
            {children}
        </div>
    </div>
  );
};
