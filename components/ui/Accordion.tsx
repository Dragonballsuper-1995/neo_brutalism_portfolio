
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen, onClick, className = '' }) => {
  return (
    <div className={`border-4 border-black dark:border-neo-dark-border mb-4 bg-white dark:bg-neo-dark-surface shadow-neo dark:shadow-neo-dark transition-all ${className}`}>
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 font-black uppercase text-lg md:text-xl text-left bg-neo-white dark:bg-neo-dark-surface hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
      >
        <span>{title}</span>
        <div className={`border-2 border-black dark:border-neo-dark-border p-1 transition-transform duration-300 ${isOpen ? 'bg-neo-pink rotate-180' : 'bg-neo-yellow'}`}>
          {isOpen ? <Minus size={20} className="text-black" /> : <Plus size={20} className="text-black" />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 border-t-4 border-black dark:border-neo-dark-border' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-6 font-mono text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed bg-white dark:bg-neo-dark-surface">
          {children}
        </div>
      </div>
    </div>
  );
};

export const Accordion: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`w-full ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen: openIndex === index,
            onClick: () => setOpenIndex(openIndex === index ? null : index),
          });
        }
        return child;
      })}
    </div>
  );
};
