import React, { useEffect, useRef } from 'react';

interface BackgroundGridProps {
  theme: 'light' | 'dark';
}

// The worker's code as a string. This avoids needing a separate file and build step.
// All heavy calculations are performed here, off the main thread.
const workerScript = `
  let config = {
    width: 0,
    height: 0,
    spacing: 30,
    scrollY: 0,
  };
  let mouse = { x: -1000, y: -1000 };
  let paused = false;

  const calculateDots = () => {
    const { width, height, spacing, scrollY } = config;
    if (width === 0 || height === 0) return [];

    const cols = Math.ceil(width / spacing);
    // Add extra rows for parallax buffer to avoid popping
    const rows = Math.ceil(height / spacing) + 2; 
    const totalHeight = rows * spacing;
    
    const calculatedDots = [];
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = i * spacing;
        
        // Parallax Calculation:
        const parallaxOffset = -(scrollY * 0.2);
        const initialY = j * spacing;
        
        // Calculate wrapped Y position for infinite scrolling effect
        let y = (initialY + parallaxOffset) % totalHeight;
        if (y < 0) y += totalHeight;
        
        // Only include dots that are within or near the viewport
        if (y < -spacing || y > height + spacing) continue;

        // Calculate distance from mouse
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 250;
        
        // Base radius
        let radius = 1.5; 
        
        // Animate radius if dot is close to the mouse
        if (distance < maxDistance) {
          const scale = 1 + Math.pow((maxDistance - distance) / maxDistance, 2) * 4;
          radius = 1.5 * scale;
        }
        
        calculatedDots.push({ x, y, radius });
      }
    }
    return calculatedDots;
  };

  // The main loop running inside the worker
  const loop = () => {
    if (!paused) {
      const dots = calculateDots();
      // Send the calculated data back to the main thread
      self.postMessage(dots);
    }
    // Schedule the next run
    requestAnimationFrame(loop);
  };

  // Listen for messages from the main thread
  self.onmessage = (e) => {
    const { type, data } = e.data;
    switch(type) {
      case 'init':
        config.width = data.width;
        config.height = data.height;
        loop(); // Start the calculation loop
        break;
      case 'resize':
        config.width = data.width;
        config.height = data.height;
        break;
      case 'mousemove':
        mouse.x = data.x;
        mouse.y = data.y;
        break;
      case 'scroll':
        config.scrollY = data.scrollY;
        break;
      case 'visibilitychange':
        paused = data.paused;
        break;
    }
  };
`;


const BackgroundGrid: React.FC<BackgroundGridProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Store latest dots from worker to be used by the main thread's animation frame loop
  const dotsRef = useRef<Array<{ x: number; y: number; radius: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create worker from a Blob URL. This is a modern way to create workers
    // without needing a separate file, making the component self-contained.
    const blob = new Blob([workerScript], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    // Function to set up canvas dimensions and scaling for high-DPI displays
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      return { width, height };
    };

    const { width, height } = setupCanvas();

    // Send initial configuration to the worker to kick things off.
    worker.postMessage({
      type: 'init',
      data: { width, height }
    });

    // Listen for calculated dot arrays from the worker.
    // Store the latest data in a ref to avoid re-rendering the component.
    worker.onmessage = (e: MessageEvent<Array<{ x: number; y: number; radius: number }>>) => {
      dotsRef.current = e.data;
    };

    // Main thread animation loop. Its ONLY job is to draw, making it very fast.
    let animationFrameId: number;
    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
      
      const dots = dotsRef.current;
      for (const dot of dots) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw(); // Start the drawing loop on the main thread.

    // Event listeners that just pass data to the worker. These are very lightweight.
    const handleResize = () => {
      const { width, height } = setupCanvas();
      worker.postMessage({ type: 'resize', data: { width, height } });
    };

    const handleMouseMove = (e: MouseEvent) => {
      worker.postMessage({ type: 'mousemove', data: { x: e.clientX, y: e.clientY } });
    };

    const handleScroll = () => {
      worker.postMessage({ type: 'scroll', data: { scrollY: window.scrollY } });
    };

    const handleVisibilityChange = () => {
      const isPaused = document.visibilityState === 'hidden';
      worker.postMessage({ type: 'visibilitychange', data: { paused: isPaused } });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Send initial scroll position
    handleScroll();

    // Cleanup function: essential for preventing memory leaks.
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      worker.terminate(); // Terminate the worker to free up resources.
      URL.revokeObjectURL(blob.type); // Clean up the Blob URL.
    };
  }, [theme]); // The main thread's drawing loop will re-evaluate the theme color on re-render.

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-30 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
};

export default React.memo(BackgroundGrid);