
import React from 'react';
import { Home, User, Briefcase, Phone, Search } from 'lucide-react';
import { NavSection } from '../types';

interface MobileNavBarProps {
  activeSection: NavSection;
  scrollToSection: (id: NavSection) => void;
  openCommandPalette: () => void;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ activeSection, scrollToSection, openCommandPalette }) => {
  // Split items to Left and Right to allow Center CMD button
  const leftItems = [
    { id: NavSection.HERO, icon: <Home size={18} />, label: 'Home' },
    { id: NavSection.ABOUT, icon: <User size={18} />, label: 'About' },
  ];

  const rightItems = [
    { id: NavSection.PROJECTS, icon: <Briefcase size={18} />, label: 'Work' },
    { id: NavSection.CONTACT, icon: <Phone size={18} />, label: 'Contact' },
  ];

  const renderNavItem = (item: { id: NavSection; icon: React.ReactNode; label: string }) => {
    const isActive = activeSection === item.id;
    return (
      <button
        key={item.id}
        onClick={() => scrollToSection(item.id)}
        className={`
          flex flex-col items-center justify-center gap-0.5 p-1 transition-all duration-200 min-w-[54px] relative
          ${isActive 
            ? 'text-black dark:text-white font-bold' 
            : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
          }
        `}
      >
        <div className={`
          transition-all duration-200 flex items-center justify-center
          ${isActive ? 'bg-neo-yellow border-2 border-black dark:border-neo-dark-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#FFFFFF] p-1 rounded-sm -translate-y-0.5' : 'p-1'}
        `}>
          {item.icon}
        </div>
        <span className={`text-[9px] font-black uppercase tracking-tighter ${isActive ? 'opacity-100' : 'opacity-80'}`}>
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[49] pointer-events-none">
      {/* Dock Container */}
      <div className="bg-white dark:bg-neo-dark-bg border-t-4 border-black dark:border-neo-dark-border pb-[env(safe-area-inset-bottom,4px)] pointer-events-auto shadow-neo-lg dark:shadow-neo-lg-dark">
        <div className="flex justify-center items-end px-4 py-0.5 relative max-w-sm mx-auto gap-2">
          
          {/* Left Items */}
          <div className="flex justify-center gap-1 flex-1">
            {leftItems.map(renderNavItem)}
          </div>

          {/* Center CMD Button - Elevated & Highlighted */}
          <div className="relative -top-5 px-1 z-50">
             <button
              onClick={openCommandPalette}
              className="
                group
                flex flex-col items-center justify-center
                w-14 h-14 rounded-full
                bg-neo-pink text-black
                border-4 border-black dark:border-neo-dark-border
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#FFFFFF]
                hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_#FFFFFF]
                hover:-translate-y-1.5 active:translate-y-0 active:shadow-none
                transition-all duration-200
              "
              aria-label="Open Command Palette"
            >
              <Search size={24} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Right Items */}
          <div className="flex justify-center gap-1 flex-1">
            {rightItems.map(renderNavItem)}
          </div>

        </div>
      </div>
    </div>
  );
};

export default React.memo(MobileNavBar);
