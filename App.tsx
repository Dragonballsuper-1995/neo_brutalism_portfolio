import React, { useState, useEffect, useCallback } from 'react';
import { X, Send } from 'lucide-react';

import CustomCursor from './components/CustomCursor';
import BackgroundGrid from './components/BackgroundGrid';
import ChatAssistant from './components/ChatAssistant';
import ScrollToTopButton from './components/ScrollToTopButton';
import LoadingScreen from './components/LoadingScreen';
import ContactForm from './components/ContactForm';
import ToastNotification from './components/ToastNotification';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import { PERSONAL_INFO, PROJECTS } from './constants';
import { NavSection } from './types';

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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeSection, setActiveSection] = useState<NavSection>(NavSection.HERO);
  const [toast, setToast] = useState({ message: '', visible: false, type: 'success' as 'success' | 'error' });

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setTimeout(() => {
      setIsLoaderMounted(false);
    }, 500);
  }, []);

  // Preload images optimized: Defer to idle time to prioritize FCP
  useEffect(() => {
    const preloadImages = () => {
      const imageUrls = [
        'logo-light.svg',
        'logo-dark.svg',
        ...PROJECTS.map(p => p.image)
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
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id as NavSection);
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    Object.values(NavSection).forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  // Theme Toggle Logic
  useEffect(() => {
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

  // Body scroll lock for modal and loader
  useEffect(() => {
    const shouldLock = isContactOpen || isChatOpen || isLoaderMounted;
    document.body.style.overflow = shouldLock ? 'hidden' : '';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isContactOpen) setIsContactOpen(false);
      }
    };
    
    if (isContactOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isContactOpen, isChatOpen, isLoaderMounted]);

  return (
    <>
      {isLoaderMounted && <LoadingScreen onComplete={handleLoadingComplete} name={PERSONAL_INFO.name} />}

      {/* Backdrop for modals */}
      {isChatOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setIsChatOpen(false)}
          aria-hidden="true"
        />
      )}

      <main className={`min-h-screen flex flex-col font-sans bg-neo-white dark:bg-neo-dark-bg text-neo-black dark:text-neo-dark-text relative transition-opacity duration-500 bg-gradient-blobs ${!isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <CustomCursor />
        <BackgroundGrid theme={theme} />

        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />

        <Hero scrollToSection={scrollToSection} />
        <About />
        <Skills />
        <ProjectsSection />
        <ContactSection
          setIsContactOpen={setIsContactOpen}
          copyToClipboard={copyToClipboard}
        />
        <Footer scrollToSection={scrollToSection} />

        {isContactOpen && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
              onClick={() => setIsContactOpen(false)}
            ></div>

            <div className="relative w-full max-w-2xl bg-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-dark-border shadow-neo-xl dark:shadow-neo-lg-dark animate-[scaleIn_0.2s_ease-out] flex flex-col max-h-[90vh]">
              <div className="flex justify-between items-center p-4 border-b-4 border-black dark:border-neo-dark-border bg-neo-yellow text-black flex-shrink-0">
                <h2 className="font-black text-xl uppercase tracking-wider flex items-center gap-2">
                  <Send size={20} /> New Message
                </h2>
                <button
                  onClick={() => setIsContactOpen(false)}
                  className="p-1 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-transparent"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 md:p-8 overflow-y-auto">
                <ContactForm
                  onSuccess={handleFormSuccess}
                  onError={handleFormError}
                />
              </div>
            </div>

            <style>{`
              @keyframes scaleIn {
                0% { opacity: 0; transform: scale(0.95); }
                100% { opacity: 1; transform: scale(1); }
              }
            `}</style>
          </div>
        )}

        <ScrollToTopButton />
        <ChatAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
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
