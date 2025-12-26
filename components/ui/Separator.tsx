
import React from 'react';

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const Separator: React.FC<SeparatorProps> = ({ 
  orientation = 'horizontal', 
  className = '', 
  ...props 
}) => {
  return (
    <div
      className={`
        shrink-0 bg-black dark:bg-neo-dark-border
        ${orientation === 'horizontal' ? 'h-[2px] w-full' : 'h-full w-[2px]'}
        ${className}
      `}
      {...props}
    />
  );
};

export default Separator;
