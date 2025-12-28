
import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'accent' | 'destructive';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center border-2 px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 uppercase tracking-wide font-mono";
  
  const variants = {
    default: "border-black bg-black text-white hover:bg-gray-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-200",
    secondary: "border-transparent bg-neo-yellow text-black hover:bg-neo-yellow/80 border-black",
    outline: "text-black dark:text-neo-dark-text border-black dark:border-neo-dark-border hover:bg-neo-yellow dark:hover:bg-neo-purple hover:text-black dark:hover:text-white",
    accent: "border-black bg-neo-blue text-black hover:bg-neo-blue/80",
    destructive: "border-black bg-neo-pink text-black hover:bg-neo-pink/80",
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Badge;
