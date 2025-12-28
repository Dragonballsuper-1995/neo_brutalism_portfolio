
import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import Tooltip from './Tooltip';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const progressRectRef = useRef<SVGRectElement>(null);

  // Square Progress Configuration
  const size = 60; 
  const strokeWidth = 4;
  const rectSize = size - strokeWidth;
  const perimeter = rectSize * 4;

  useEffect(() => {
    let ticking = false;

    const updateUI = () => {
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // Show button after scrolling down 100px
      setIsVisible(scrollTop > 100);
      
      // Reset isScrolling when we reach the top
      if (scrollTop <= 10) {
        setIsScrolling(false);
      }

      // Calculate progress and update DOM directly
      const totalScroll = docHeight - winHeight;
      if (totalScroll > 0 && progressRectRef.current) {
        const currentProgress = Math.min(1, Math.max(0, scrollTop / totalScroll));
        const strokeDashoffset = perimeter - (currentProgress * perimeter);
        progressRectRef.current.style.strokeDashoffset = `${strokeDashoffset}`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateUI);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [perimeter]);

  const scrollToTop = () => {
    setIsScrolling(true); // Hide tooltip immediately
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className={`
        fixed right-6 bottom-[164px] md:right-8 md:bottom-32 z-40 transition-all duration-500 ease-out will-change-[transform,opacity] no-print
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}
      `}
    >
      <Tooltip text="Scroll to Top" position="left" className="transition-transform duration-300 hover:-translate-y-2" disabled={isScrolling}>
        <button
          onClick={scrollToTop}
          onMouseLeave={() => setIsScrolling(false)}
          className="
            group relative flex items-center justify-center 
            w-[60px] h-[60px] 
            bg-neo-yellow dark:bg-neo-purple 
            shadow-neo-lg dark:shadow-neo-lg-dark 
            hover:shadow-neo-xl dark:hover:shadow-neo-xl 
            transition-all duration-300
          "
          aria-label="Scroll to top"
        >
          {/* SVG Progress Border */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${size} ${size}`}
          >
            <rect 
              x={strokeWidth/2} 
              y={strokeWidth/2} 
              width={rectSize} 
              height={rectSize} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth={strokeWidth}
              className="text-black dark:text-white" 
            />
            <rect 
              ref={progressRectRef}
              x={strokeWidth/2} 
              y={strokeWidth/2} 
              width={rectSize} 
              height={rectSize} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth={strokeWidth}
              strokeDasharray={perimeter}
              style={{ strokeDashoffset: perimeter }}
              className="text-neo-pink transition-[stroke-dashoffset] duration-100"
            />
          </svg>

          <ArrowUp size={28} strokeWidth={3} className="text-black dark:text-white relative z-10 group-hover:scale-110 transition-transform" />
        </button>
      </Tooltip>
    </div>
  );
};

export default React.memo(ScrollToTopButton);
