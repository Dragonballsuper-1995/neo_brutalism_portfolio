
import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
  name: string;
}

const loadingTexts = [
    'INITIALIZING ASSETS...',
    'CONNECTING TO GRID...',
    'CALIBRATING PIXELS...',
    'LOADING CREATIVITY MODULES...',
    'DECOMPRESSING IDEAS...',
    'RENDERING NEO-BRUTALIST VIBES...',
    'AWAKENING AI ASSISTANT...',
];

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, name }) => {
    const [progress, setProgress] = useState(0);
    const [isCompleting, setIsCompleting] = useState(false);
    const [isContentHidden, setIsContentHidden] = useState(false);
    const [statusText, setStatusText] = useState(loadingTexts[0]);

    // A single, optimized effect to handle all loading screen animations
    useEffect(() => {
        // --- Status Text Cycling ---
        const textInterval = setInterval(() => {
            setStatusText(currentText => {
                const currentIndex = loadingTexts.indexOf(currentText);
                const nextIndex = (currentIndex + 1) % loadingTexts.length;
                return loadingTexts[nextIndex];
            });
        }, 400);

        // --- Progress Bar Animation using requestAnimationFrame for smoothness ---
        let startTime: number | null = null;
        let animationFrameId: number;
        // Faster initial load (1.5s instead of 2.0s)
        const duration = 1500; 

        const animateProgress = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsedTime = timestamp - startTime;
            const progressValue = Math.min(100, Math.floor((elapsedTime / duration) * 100));
            
            setProgress(progressValue);

            if (elapsedTime < duration) {
                animationFrameId = requestAnimationFrame(animateProgress);
            } else {
                // Animation finished
                setProgress(100);
                clearInterval(textInterval); // Stop cycling text
                setStatusText('READY.');
                
                // 1. Tell App to render content underneath (opacity 0 -> 1)
                onComplete();

                // 2. Trigger fade out AND curtain lift almost simultaneously
                // Small buffer (150ms) ensures the underlying app has painted
                setTimeout(() => {
                    setIsContentHidden(true); // Fade out text
                    setIsCompleting(true);    // Lift curtain
                }, 150);
            }
        };

        animationFrameId = requestAnimationFrame(animateProgress);

        // Cleanup function to clear timers if the component unmounts
        return () => {
            cancelAnimationFrame(animationFrameId);
            clearInterval(textInterval);
        };
    }, [onComplete]);


    return (
        <div 
            className={`
                fixed inset-0 z-[1000] bg-neo-black flex flex-col justify-between p-4 sm:p-8 font-sans
                transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] will-change-transform
                w-screen h-screen max-w-full max-h-full overflow-hidden
                ${isCompleting ? '-translate-y-full' : 'translate-y-0'}
            `}
        >
            {/* Content Container - Fades out AS the slide moves up */}
            <div className={`
                flex flex-col justify-between h-full w-full text-white
                transition-opacity duration-300 ease-out
                ${isContentHidden ? 'opacity-0' : 'opacity-100'}
            `}>
                {/* Top Label */}
                <div className="text-sm sm:text-xl font-bold tracking-tighter">
                    SYSTEM BOOT // V.2.0
                </div>
                
                {/* Center Progress Display */}
                <div className="flex flex-col items-center w-full">
                    {/* Percentage Text */}
                    <div className="text-[clamp(3.25rem,15vw,9rem)] font-black leading-none">
                        {progress}%
                    </div>
                    
                    {/* Progress Bar Container */}
                    <div className="w-full max-w-md h-4 bg-gray-900 mt-4 sm:mt-8 border-4 border-white">
                        {/* Actual Filling Bar */}
                        <div 
                            className="h-full bg-white transition-all duration-75 ease-linear" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
                
                {/* Bottom Status */}
                <div className="flex justify-between text-[10px] sm:text-sm font-mono w-full uppercase pb-[env(safe-area-inset-bottom,0px)]">
                    <span role="status" aria-live="polite">{statusText}</span>
                    <span>© {new Date().getFullYear()} {name}</span>
                </div>
            </div>
        </div>
    );
};

export default React.memo(LoadingScreen);
