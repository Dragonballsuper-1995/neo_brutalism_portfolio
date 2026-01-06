import React from 'react';
import { CheckCircle } from 'lucide-react';

interface SuccessAnimationProps {
    name: string;
}

// Neo-Brutalist color palette for confetti
const CONFETTI_COLORS = ['#FFDE59', '#FF914D', '#7ED957', '#5CE1E6', '#FF66C4', '#8C52FF'];

/**
 * Celebratory animation shown after successful form submission.
 * Includes CSS-based confetti effect (fall animation defined in index.css).
 */
const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ name }) => (
    <div className="flex flex-col items-center justify-center h-full py-10 relative overflow-hidden">
        {/* Confetti (fall animation in index.css) */}

        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {Array.from({ length: 50 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute top-0 w-3 h-3 rounded-sm"
                    style={{
                        left: `${Math.random() * 100}%`,
                        backgroundColor: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
                        animation: `fall ${Math.random() * 2 + 2}s linear forwards`,
                        animationDelay: `${Math.random() * 0.5}s`,
                    }}
                />
            ))}
        </div>

        <div className="bg-neo-green p-6 rounded-full border-4 border-black mb-6 animate-[bounce_0.5s_infinite_alternate]">
            <CheckCircle size={64} className="text-black" />
        </div>

        <h3 className="text-3xl md:text-4xl font-black uppercase text-center mb-2 animate-[slideIn_0.3s_ease-out]">
            Message Transmitted
        </h3>

        <p className="font-mono text-center text-gray-600 dark:text-neo-dark-text-muted">
            Thank you, {name}.<br />I'll get back to you shortly.
        </p>
    </div>
);

export default React.memo(SuccessAnimation);
