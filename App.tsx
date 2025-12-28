
import React, { useState, useEffect, useCallback } from 'react';
import { Send } from 'lucide-react';

import CustomCursor from './components/CustomCursor';
import BackgroundGrid from './components/BackgroundGrid';
import ChatAssistant from './components/ChatAssistant';
import ScrollToTopButton from './components/ScrollToTopButton';
import LoadingScreen from './components/LoadingScreen';
import ContactForm from './components/ContactForm';
import ToastNotification from './components/ToastNotification';
import CommandPalette from './components/CommandPalette';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectCaseStudy from './components/ProjectCaseStudy';
import MobileNavBar from './components/MobileNavBar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './components/ui/Sheet';

import { PERSONAL_INFO } from './constants';
import { NavSection, Project } from './types';

// Global scroll reveal hook
const useGlobalScrollReveal = (isLoaded: boolean) => {
  useEffect(() => {
    if (isLoaded) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      const timeoutId = setTimeout(() => {
        // Exclude project cards, as they have their own observer
        document.querySelectorAll('.reveal-on-scroll:not(section#projects .reveal-on-scroll)').forEach((el) => observer.observe(el));
      }, 100);

      return () => {
        observer.disconnect();
        clearTimeout(timeoutId);
      };
    }
  }, [isLoaded]);
};


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaderMounted, setIsLoaderMounted] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCmdPaletteOpen, setIsCmdPaletteOpen] = useState(false);
  
  // Sheet state for Project Case Study
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Theme State with Persistence (Updated: Defaulting to Light Mode)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    // Hard default to light mode
    return 'light';
  });

  const [activeSection, setActiveSection] = useState<NavSection>(NavSection.HERO);
  const [toast, setToast] = useState({ message: '', visible: false, type: 'success' as 'success' | 'error' });

  // Force scroll to top on page load/refresh - override browser's scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    // Reduced timeout to match the faster 700ms animation in LoadingScreen
    setTimeout(() => {
      setIsLoaderMounted(false);
    }, 850);
  }, []);

  // Preload images optimized: Defer to idle time to prioritize FCP
  useEffect(() => {
    const preloadImages = () => {
      const imageUrls = [
        '/logo-light.svg',
        '/logo-dark.svg',
        '/profile-pic-4.webp'
      ];
      imageUrls.forEach(url => { (new Image()).src = url; });
    };

    // Use requestIdleCallback if available, otherwise fallback to timeout
    if ('requestIdleCallback' in window) {
       (window as any).requestIdleCallback(preloadImages);
    } else {
       setTimeout(preloadImages, 2000);
    }
  }, []);

  useGlobalScrollReveal(!isLoading);

  // Active Section Spy
  useEffect(() => {
    let ticking = false;
    const sections = Object.values(NavSection);

    const updateActiveSection = () => {
       const scrollY = window.scrollY;
       const viewportHeight = window.innerHeight;
       const triggerPoint = scrollY + (viewportHeight * 0.35);
       
       const docHeight = document.documentElement.scrollHeight;
       // If near bottom of page, always show CONTACT
       if (scrollY + viewportHeight >= docHeight - 100) {
         setActiveSection(NavSection.CONTACT);
         return;
       }
       
       // Check if we're past the contact section start - if so, stay on CONTACT
       const contactEl = document.getElementById(NavSection.CONTACT);
       if (contactEl && triggerPoint >= contactEl.offsetTop) {
         setActiveSection(NavSection.CONTACT);
         return;
       }

       let active = NavSection.HERO;

       for (const sectionId of sections) {
         const el = document.getElementById(sectionId);
         if (el) {
           const top = el.offsetTop;
           const height = el.offsetHeight;
           
           if (triggerPoint >= top && triggerPoint < top + height) {
             active = sectionId as NavSection;
             break;
           }
         }
       }
       
       setActiveSection(active);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateActiveSection();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Theme Toggle Logic & Persistence
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const scrollToSection = useCallback((id: NavSection) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, visible: true, type });
  }, []);

  const handleCloseToast = useCallback(() => {
    setToast(prev => ({ ...prev, visible: false }));
  }, []);

  const copyToClipboard = useCallback((text: string, type: string) => {
    navigator.clipboard.writeText(text);
    showToast(
      type.includes('email')
        ? "Email ID Copied!"
        : "Phone Copied!",
      'success'
    );
  }, [showToast]);

  const handleFormSuccess = useCallback(() => {
    setIsContactOpen(false);
  }, []);

  const handleFormError = useCallback((errorMessage: string) => {
    showToast(errorMessage, 'error');
  }, [showToast]);

  // Handle opening project details
  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  // Body scroll lock for modal and loader
  useEffect(() => {
    const shouldLock = isChatOpen || isLoaderMounted || isCmdPaletteOpen;
    // Sheets handle their own scroll locking, so we check for others here
    if (shouldLock) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Reset scroll to top when loading screen is mounted
      if (isLoaderMounted) {
        window.scrollTo(0, 0);
      }
    } else if (!isContactOpen && !selectedProject) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    
    return () => {
       // Cleanup logic handled mostly by components
    };
  }, [isChatOpen, isLoaderMounted, isCmdPaletteOpen, isContactOpen, selectedProject]);

  return (
    <>
      {isLoaderMounted && <LoadingScreen onComplete={handleLoadingComplete} name={PERSONAL_INFO.name} />}

      {/* Backdrop for Chat Modal */}
      {isChatOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setIsChatOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Faster transition for main content to ensure it's ready behind the loader */}
      <main className={`min-h-svh flex flex-col font-sans bg-neo-white dark:bg-neo-dark-bg text-neo-black dark:text-neo-dark-text relative transition-opacity duration-100 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <CustomCursor highContrast={isChatOpen && theme === 'light'} />
        <BackgroundGrid theme={theme} />

        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          openCommandPalette={() => setIsCmdPaletteOpen(true)}
        />

        <Hero scrollToSection={scrollToSection} />
        <About />
        <Skills />
        
        {/* Pass click handler and theme to ProjectsSection */}
        <ProjectsSection onProjectClick={handleProjectClick} theme={theme} />
        
        <ContactSection
          setIsContactOpen={setIsContactOpen}
          copyToClipboard={copyToClipboard}
        />
        
        {/* Spacer for mobile navbar - only before footer */}
        <div className="pb-20 md:pb-0" />
        
        <Footer scrollToSection={scrollToSection} />

        {/* Contact Sheet */}
        <Sheet open={isContactOpen} onOpenChange={setIsContactOpen}>
          <SheetContent className="w-full sm:max-w-xl p-0 border-l-4 border-black dark:border-neo-dark-border">
            <SheetHeader className="p-4 border-b-4 border-black dark:border-neo-dark-border bg-neo-yellow text-black">
              <SheetTitle className="flex items-center gap-2">
                <Send size={20} /> New Message
              </SheetTitle>
            </SheetHeader>
            <div className="p-6 md:p-8 h-full overflow-y-auto pb-20">
              <ContactForm
                onSuccess={handleFormSuccess}
                onError={handleFormError}
              />
            </div>
          </SheetContent>
        </Sheet>

        {/* Project Case Study Sheet (Feature #5 Implementation) */}
        <Sheet open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <SheetContent className="w-full sm:max-w-3xl p-0 border-l-4 border-black dark:border-neo-dark-border">
             {selectedProject && <ProjectCaseStudy project={selectedProject} />}
          </SheetContent>
        </Sheet>

        <CommandPalette 
          theme={theme}
          toggleTheme={toggleTheme}
          scrollToSection={scrollToSection}
          setIsContactOpen={setIsContactOpen}
          setIsChatOpen={setIsChatOpen}
          isOpen={isCmdPaletteOpen}
          setIsOpen={setIsCmdPaletteOpen}
        />

        <ScrollToTopButton />
        <ChatAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
        
        {/* New Mobile Bottom Navigation */}
        <MobileNavBar 
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          openCommandPalette={() => setIsCmdPaletteOpen(true)}
        />
        
        <ToastNotification
          message={toast.message}
          isVisible={toast.visible}
          onClose={handleCloseToast}
          type={toast.type}
        />
      </main>
    </>
  );
};

export default App;
