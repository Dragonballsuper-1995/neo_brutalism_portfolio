import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { NavSection } from '../types';
import { PERSONAL_INFO } from '../constants';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activeSection: NavSection;
  scrollToSection: (id: NavSection) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, activeSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollAndCloseMenu = (id: NavSection) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-white/90 dark:bg-neo-dark-bg/90 backdrop-blur-md border-b-4 border-black dark:border-neo-dark-border px-4 py-3 shadow-neo-sm dark:shadow-neo-sm-dark transition-all duration-300">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <button
          aria-label="Scroll to top of the page"
          className="text-2xl font-black uppercase tracking-tighter cursor-pointer flex items-center gap-3 group"
          onClick={() => scrollToSection(NavSection.HERO)}
        >
          <img
            src={theme === 'light' ? 'logo-light.svg' : 'logo-dark.svg'}
            alt="Sujal Chhajed Logo"
            className="w-16 h-16 group-hover:scale-110 transition-transform flex-shrink-0"
            width="64"
            height="64"
          />
          <div className="leading-none">
            <span className="text-black dark:text-neo-dark-text group-hover:text-neo-purple transition-colors">SUJAL</span>
            <span className="text-neo-pink group-hover:text-black dark:group-hover:text-neo-dark-text transition-colors">.DEV</span>
          </div>
        </button>

        <div className="hidden md:flex gap-6 items-center font-bold font-mono text-sm">
          {Object.values(NavSection).map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`
                uppercase transition-colors relative group
                ${activeSection === section ? 'text-neo-pink' : 'hover:text-neo-pink dark:text-neo-dark-text'}
              `}
            >
              {section}
              <span className={`
                absolute -bottom-1 left-0 h-1 bg-neo-green transition-all border border-black dark:border-neo-dark-border
                ${activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'}
              `}></span>
            </button>
          ))}
          <a
            href={PERSONAL_INFO.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black dark:bg-neo-dark-border text-white dark:text-neo-dark-bg px-6 py-2 font-bold border-2 border-transparent hover:bg-neo-yellow hover:text-black hover:border-black dark:hover:border-neo-dark-border transition-all hover:shadow-neo-sm dark:hover:shadow-neo-sm-dark"
          >
            RESUME
          </a>

          <button
            onClick={toggleTheme}
            aria-label={`Activate ${theme === 'light' ? 'dark' : 'light'} theme`}
            className="p-2 border-2 border-black dark:border-neo-dark-border hover:bg-neo-yellow dark:hover:bg-neo-purple transition-colors hover:shadow-neo-sm dark:hover:shadow-neo-sm-dark active:translate-y-1"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        <div className="flex gap-4 items-center md:hidden">
          <button
            onClick={toggleTheme}
            aria-label={`Activate ${theme === 'light' ? 'dark' : 'light'} theme`}
            className="p-2 border-2 border-black dark:border-neo-dark-border hover:bg-neo-yellow dark:hover:bg-neo-purple transition-colors active:translate-y-1"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button
            className="border-2 border-black dark:border-neo-dark-border p-2 hover:bg-neo-yellow active:translate-y-1 transition-all dark:text-neo-dark-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-neo-dark-surface border-b-4 border-black dark:border-neo-dark-border p-6 flex flex-col gap-6 shadow-neo-lg dark:shadow-neo-lg-dark animate-[slideDown_0.3s_ease-out]">
          {Object.values(NavSection).map((section) => (
            <button
              key={section}
              onClick={() => handleScrollAndCloseMenu(section)}
              className={`
                text-left uppercase font-black text-3xl transition-colors
                ${activeSection === section ? 'text-neo-pink' : 'dark:text-neo-dark-text hover:text-neo-pink'}
              `}
            >
              {section}
            </button>
          ))}
          <a
            href={PERSONAL_INFO.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neo-green text-black text-center py-4 font-black border-2 border-black dark:border-neo-dark-border shadow-neo dark:shadow-neo-dark uppercase text-xl"
          >
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
};

export default React.memo(Header);