import React from 'react';

interface TextRevealProps {
  text: string;
  mode?: 'char' | 'word';
  className?: string;
  delay?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({ text, mode = 'word', className = '', delay = 0 }) => {
  if (!text) return null;

  // Split text based on mode
  const items = mode === 'char' ? text.split('') : text.split(' ');

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {items.map((item, index) => (
        <span 
          key={index} 
          className="inline-block opacity-0 animate-[slideIn_0.5s_ease-out_forwards]"
          style={{ 
            animationDelay: `${delay + (index * (mode === 'char' ? 0.05 : 0.1))}s`,
            marginRight: mode === 'word' ? '0.25em' : '0',
            whiteSpace: 'pre'
          }}
        >
          {item}
        </span>
      ))}
    </span>
  );
};

export default React.memo(TextReveal);
