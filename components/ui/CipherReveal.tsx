
import React, { useState, useEffect, useRef } from 'react';

interface CipherRevealProps {
  texts: string[];
  className?: string;
  wait?: number;
}

export const CipherReveal: React.FC<CipherRevealProps> = ({
  texts,
  className = "",
  wait = 2000
}) => {
  const [displayText, setDisplayText] = useState(texts[0]);
  const [resolvedCount, setResolvedCount] = useState(texts[0].length);
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // IntersectionObserver to pause animation when not visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Skip animation if not visible in viewport
    if (!isVisible) return;

    let frameId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    // Expanded char set for a richer visual texture
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-=[]{}|;:,.<>?";
    const currentText = texts[index];
    const nextIndex = (index + 1) % texts.length;
    const nextText = texts[nextIndex];

    timeoutId = setTimeout(() => {
      const startTime = Date.now();
      const duration = 1000; // Duration of the scramble effect

      const animate = () => {
        const now = Date.now();
        const progress = (now - startTime) / duration;

        if (progress >= 1) {
          setDisplayText(nextText);
          setResolvedCount(nextText.length);
          setIndex(nextIndex);
          return;
        }

        // Cubic easing out for smoother motion
        const ease = 1 - Math.pow(1 - progress, 3);

        // Smoothly interpolate the length of the string
        const currentLength = Math.round(
          currentText.length + (nextText.length - currentText.length) * ease
        );

        // Only start resolving characters after 20% of the animation has passed
        const resolveProgress = Math.max(0, (progress - 0.2) / 0.8);
        const resolveCount = Math.floor(resolveProgress * nextText.length);

        setResolvedCount(resolveCount);

        const scrambled = Array.from({ length: currentLength }).map((_, i) => {
          // If we are within the resolved part of the new text, show it
          if (i < resolveCount && i < nextText.length) {
            return nextText[i];
          }
          // Otherwise show a random character
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');

        setDisplayText(scrambled);
        frameId = requestAnimationFrame(animate);
      };

      frameId = requestAnimationFrame(animate);

    }, wait);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(frameId);
    };
  }, [index, texts, wait, isVisible]);

  return (
    <span ref={containerRef} className={className}>
      {displayText.split('').map((char, i) => (
        <span
          key={i}
          className={i >= resolvedCount ? "text-[#ff66c4]" : ""}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
