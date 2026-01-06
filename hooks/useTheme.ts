import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

/**
 * Custom hook for managing theme state with localStorage persistence.
 * Defaults to light mode if no saved preference exists.
 */
export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme');
            if (saved === 'dark' || saved === 'light') return saved;
        }
        return 'light';
    });

    // Sync theme with DOM and localStorage
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    return { theme, setTheme, toggleTheme };
};

export default useTheme;
