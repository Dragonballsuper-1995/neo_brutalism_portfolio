
import React, { useEffect, useState, useRef } from "react";

interface DecryptedTextProps {
  text: string;
  className?: string;
  characters?: string;
  speed?: number;
  useOriginalCharsOnly?: boolean;
}

const DEFAULT_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=";

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  className = "",
  characters = DEFAULT_CHARS,
  speed = 15,
  useOriginalCharsOnly = false,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isScrambling) {
          setIsInView(true);
        } else if (!entry.isIntersecting) {
          // Reset when element leaves view so it can animate again
          setIsInView(false);
          setDisplayText(text);
          setIsScrambling(false);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [text, isScrambling]);

  useEffect(() => {
    if (isInView && !isScrambling) {
      scramble();
    }
  }, [isInView]);

  const scramble = () => {
    setIsScrambling(true);
    const length = text.length;
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "; // Preserve spaces

            // Determine if this character should be revealed
            // We reveal from left to right gradually based on total progress
            
            // Simple logic: reveal one character every 3 ticks
            const progress = Math.floor(iteration / 3); 
            
            if (index < progress) {
              return text[index];
            }

            // Return random character
            if (useOriginalCharsOnly) {
                const randomOriginalIndex = Math.floor(Math.random() * text.length);
                return text[randomOriginalIndex];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("");
      });

      if (iteration >= length * 3) { // 3 ticks per character to settle
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
      
      iteration++;
    }, speed);
  };

  return (
    <span
      ref={containerRef}
      className={`inline-block ${/\bwhitespace-\S+\b/.test(className) ? '' : 'whitespace-pre-wrap'} ${className}`}
    >
      {displayText}
    </span>
  );
};
