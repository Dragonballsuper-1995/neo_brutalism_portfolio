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
        const duration = 2000; // Increased to 2 seconds for better visibility

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
                setStatusText('BOOT SEQUENCE COMPLETE.');
                setTimeout(() => {
                    setIsCompleting(true);
                    onComplete();
                }, 200); 
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
                fixed inset-0 z-[1000] bg-neo-black text-white flex flex-col justify-between p-8 font-sans
                transition-transform duration-500 ease-in-out
                ${isCompleting ? '-translate-y-full' : 'translate-y-0'}
            `}
        >
            {/* Top Label */}
            <div className="text-xl font-bold tracking-tighter">
                SYSTEM BOOT // V.2.0
            </div>
            
            {/* Center Progress Display */}
            <div className="flex flex-col items-center w-full">
                {/* Percentage Text */}
                <div className="text-[15vw] font-black leading-none">
                    {progress}%
                </div>
                
                {/* Progress Bar Container */}
                <div className="w-full max-w-md h-4 bg-gray-900 mt-8 border-4 border-white">
                    {/* Actual Filling Bar - Removed transition to fix sync issue with JS animation */}
                    <div 
                        className="h-full bg-white" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
            
            {/* Bottom Status */}
            <div className="flex justify-between text-sm font-mono w-full uppercase">
                <span role="status" aria-live="polite">{statusText}</span>
                <span>© {new Date().getFullYear()} {name}</span>
            </div>
        </div>
    );
};

export default React.memo(LoadingScreen);