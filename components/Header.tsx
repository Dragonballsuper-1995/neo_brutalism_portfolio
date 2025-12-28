
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Search, FileText, Calendar } from 'lucide-react';
import { NavSection } from '../types';
import { PERSONAL_INFO } from '../constants';
import { HoverCard, HoverCardTrigger, HoverCardContent } from './ui/HoverCard';
import Badge from './ui/Badge';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeSection: NavSection;
  scrollToSection: (id: NavSection) => void;
  openCommandPalette: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, activeSection, scrollToSection, openCommandPalette }) => {
  const [shortcutText, setShortcutText] = useState('CTRL+K');

  // Detect Mac to show Command symbol
  useEffect(() => {
    if (typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform)) {
      setShortcutText('⌘K');
    }
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-white/90 dark:bg-neo-dark-bg/90 backdrop-blur-md border-b-4 border-black dark:border-neo-dark-border px-3 md:px-6 lg:px-8 py-3 shadow-neo-sm dark:shadow-neo-sm-dark transition-all duration-300 h-20">
      <nav className="w-full flex justify-between items-center h-full">
        <button
          aria-label="Scroll to top of the page"
          className="text-2xl font-black uppercase tracking-tighter cursor-pointer flex items-center gap-4 group h-full"
          onClick={() => scrollToSection(NavSection.HERO)}
        >
          <img
            src={theme === 'light' ? '/logo-light.svg' : '/logo-dark.svg'}
            alt="Sujal Chhajed Logo"
            className="w-14 h-14 md:w-16 md:h-16 group-hover:scale-110 transition-transform flex-shrink-0"
            width="64"
            height="64"
          />
          <div className="flex items-center h-full">
            <span className="text-black dark:text-neo-dark-text group-hover:text-neo-purple transition-colors leading-none">SUJAL</span>
            <span className="text-neo-pink group-hover:text-black dark:group-hover:text-neo-dark-text transition-colors leading-none ml-1">.DEV</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 lg:gap-8 items-center">
          {Object.values(NavSection).map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`
                uppercase font-black tracking-tight transition-colors
                text-lg lg:text-2xl
                ${activeSection === section ? 'text-neo-pink' : 'text-black dark:text-neo-dark-text hover:text-neo-pink dark:hover:text-neo-pink'}
              `}
            >
              {section}
            </button>
          ))}
          
          <HoverCard openDelay={100} closeDelay={200}>
            <HoverCardTrigger>
              <a
                href={PERSONAL_INFO.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black dark:bg-neo-dark-border text-white dark:text-neo-dark-bg px-4 lg:px-6 py-2 font-bold border-2 border-black hover:bg-neo-yellow hover:text-black hover:border-black dark:hover:border-neo-dark-border transition-all hover:shadow-neo-sm dark:hover:shadow-neo-sm-dark block font-mono text-xs lg:text-sm"
              >
                RESUME
              </a>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex flex-col gap-3 font-mono">
                <div className="flex items-center gap-3 border-b-2 border-dashed border-gray-300 dark:border-zinc-700 pb-2">
                  <div className="bg-neo-blue p-2 border-2 border-black">
                    <FileText size={20} className="text-black" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm uppercase text-black dark:text-white leading-none">Sujal_Resume.pdf</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-bold">1.2 MB • PDF</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 font-bold leading-tight">
                  Comprehensive overview of my skills, experience, and academic background.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold">
                  <Calendar size={12} />
                  <span>Updated: Feb 2025</span>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="text-[10px] bg-transparent">ATS Friendly</Badge>
                    <Badge variant="outline" className="text-[10px] bg-transparent">One Page</Badge>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Command Palette Button - Desktop Only */}
          <button 
            onClick={openCommandPalette}
            className="hidden lg:flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 border-2 border-black dark:border-neo-dark-border px-3 py-2 font-mono text-xs font-bold hover:bg-neo-yellow dark:hover:bg-neo-purple transition-colors shadow-neo-sm dark:shadow-neo-sm-dark active:translate-y-1 active:shadow-none text-black dark:text-white"
            aria-label="Open Command Palette"
          >
            <Search size={14} />
            <span>{shortcutText}</span>
          </button>
          <button 
            onClick={openCommandPalette}
            className="flex lg:hidden items-center justify-center bg-gray-100 dark:bg-zinc-800 border-2 border-black dark:border-neo-dark-border p-2 font-mono hover:bg-neo-yellow dark:hover:bg-neo-purple transition-colors shadow-neo-sm dark:shadow-neo-sm-dark active:translate-y-1 active:shadow-none text-black dark:text-white"
            aria-label="Open Command Palette"
          >
            <Search size={14} />
          </button>

          <button
            onClick={toggleTheme}
            aria-label={`Activate ${theme === 'light' ? 'dark' : 'light'} theme`}
            className="p-2 border-2 border-black dark:border-neo-dark-border hover:bg-neo-yellow dark:hover:bg-neo-purple transition-colors hover:shadow-neo-sm dark:hover:shadow-neo-sm-dark active:translate-y-1 dark:text-neo-dark-text"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Mobile Actions - Simplified since Navigation is now at bottom */}
        <div className="flex gap-2 items-center md:hidden">
           {/* Resume Link Mini */}
           <a
                href={PERSONAL_INFO.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black dark:bg-neo-dark-border text-white dark:text-neo-dark-bg px-3 py-1 font-bold border-2 border-black font-mono text-xs"
              >
                RESUME
            </a>

          <button
            onClick={toggleTheme}
            aria-label={`Activate ${theme === 'light' ? 'dark' : 'light'} theme`}
            className="p-1.5 border-2 border-black dark:border-neo-dark-border hover:bg-neo-yellow dark:hover:bg-neo-purple transition-colors active:translate-y-1 dark:text-neo-dark-text bg-white dark:bg-neo-dark-surface"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Header);
