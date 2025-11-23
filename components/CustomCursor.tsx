import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      const { clientX, clientY } = e;
      
      // Inner cursor moves instantly (Positioning only)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
      
      // Outer follower moves with a slight delay/smoothing via CSS transition
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.matches('a, button, input, textarea, [role="button"], select') ||
        target.closest('a, button, input, textarea, [role="button"], select');
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    
    // Hide cursor when leaving window
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Don't render on server or touch devices
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Inner Crosshair Cursor */}
      <div 
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[10000] pointer-events-none mix-blend-difference"
      >
        {/* Visual Crosshair Element */}
        <div className={`
          w-6 h-6 -ml-3 -mt-3 relative
          transition-all duration-300 ease-out
          ${!isVisible ? 'opacity-0' : 'opacity-100'}
          ${isHovering ? 'scale-150 rotate-90' : 'scale-100'}
          ${isClicked ? 'scale-75' : ''}
        `}>
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white -translate-y-1/2" />
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white -translate-y-1/2 rotate-90" />
        </div>
      </div>
      
      {/* Outer Ring Follower */}
      <div 
        ref={followerRef}
        aria-hidden="true"
        className={`
          fixed top-0 left-0 z-[9999] pointer-events-none
          border-2 border-white
          mix-blend-difference
          rounded-full
          flex items-center justify-center
          transition-all duration-150 ease-out
          -ml-6 -mt-6
          ${!isVisible ? 'opacity-0' : 'opacity-100'}
          ${isHovering ? 'w-16 h-16 bg-white/10 -ml-8 -mt-8' : 'w-12 h-12'}
          ${isClicked ? 'scale-75' : 'scale-100'}
        `}
      />
    </>
  );
};

export default React.memo(CustomCursor);