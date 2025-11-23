import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import Section from './Section';
import NeoButton from './NeoButton';
import TextReveal from './TextReveal';
import { NavSection } from '../types';
import { PERSONAL_INFO } from '../constants';

interface HeroProps {
  scrollToSection: (id: NavSection) => void;
}

const name = PERSONAL_INFO.name;
const lastSpaceIndex = name.lastIndexOf(' ');
const nameLine1 = name.substring(0, lastSpaceIndex);
const nameLine2 = name.substring(lastSpaceIndex + 1);

const PHRASES = [
  "AI DEVELOPER", "ML ENGINEER", "CS ENGINEER", "TECH ENTHUSIAST",
  "NLP EXPERT", "PYTHON WIZARD", "TECHNOLOGY NERD"
];

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  const displayTextRef = useRef<HTMLSpanElement>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    let curPhraseIndex = 0;
    let curCharIndex = 0;
    let isDeleting = false;
    let lastUpdateTime = 0;
    let delayTime = 500; // Initial delay

    const type = (currentTime: number) => {
      if (!lastUpdateTime) lastUpdateTime = currentTime;
      const deltaTime = currentTime - lastUpdateTime;

      if (deltaTime > delayTime) {
        lastUpdateTime = currentTime;
        const currentPhrase = PHRASES[curPhraseIndex];

        if (isDeleting) {
          delayTime = 50; // Deleting speed
          if (curCharIndex > 0) {
            curCharIndex--;
          } else {
            isDeleting = false;
            let nextIndex = Math.floor(Math.random() * PHRASES.length);
            while (nextIndex === curPhraseIndex && PHRASES.length > 1) {
              nextIndex = Math.floor(Math.random() * PHRASES.length);
            }
            curPhraseIndex = nextIndex;
            delayTime = 500; // Pause before typing new phrase
          }
        } else {
          delayTime = 100; // Typing speed
          if (curCharIndex < currentPhrase.length) {
            curCharIndex++;
          } else {
            isDeleting = true;
            delayTime = 2000; // Pause after typing
          }
        }
        
        if (displayTextRef.current) {
          displayTextRef.current.textContent = currentPhrase.substring(0, curCharIndex);
        }
      }
      animFrameId.current = requestAnimationFrame(type);
    };

    animFrameId.current = requestAnimationFrame(type);
    
    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <Section
      id={NavSection.HERO}
      className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 pt-20">
        <div className="relative mb-2">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter text-neo-black dark:text-neo-dark-text mb-2 drop-shadow-[4px_4px_0px_rgba(126,217,87,1)] dark:drop-shadow-[4px_4px_0px_rgba(140,82,255,1)]">
            <span className="block"><TextReveal text={nameLine1} mode="char" /></span>
            <span className="block"><TextReveal text={nameLine2} mode="char" delay={nameLine1.length * 0.05} /></span>
          </h1>
        </div>
        <div className="reveal-on-scroll delay-200 relative mb-10">
          <div className="inline-block relative">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-mono uppercase bg-black text-white dark:bg-neo-dark-border dark:text-neo-dark-bg px-6 py-2 border-4 border-black dark:border-neo-dark-border transform -rotate-1 shadow-neo dark:shadow-neo-dark min-h-[3.5rem] md:min-h-[4.5rem] flex items-center justify-center">
              <span ref={displayTextRef}></span>
              <span className="animate-pulse text-neo-green ml-1">_</span>
            </h2>
          </div>
        </div>
        <div className="reveal-on-scroll delay-300 text-lg md:text-xl font-mono bg-white dark:bg-neo-dark-surface dark:text-neo-dark-text border-2 border-black dark:border-neo-dark-border p-6 inline-block shadow-neo dark:shadow-neo-dark max-w-3xl mx-auto leading-relaxed hover:shadow-neo-lg dark:hover:shadow-neo-lg-dark transition-all duration-300 hover:-translate-y-1">
          <TextReveal text={PERSONAL_INFO.tagline} mode="word" />
        </div>
        <div className="reveal-on-scroll delay-300 flex flex-col md:flex-row gap-6 justify-center mt-12">
          <NeoButton onClick={() => scrollToSection(NavSection.PROJECTS)} className="text-xl py-4 px-10">
            View My Work
          </NeoButton>
          <NeoButton variant="outline" onClick={() => scrollToSection(NavSection.CONTACT)} className="text-xl py-4 px-10">
            Let's Talk
          </NeoButton>
        </div>
      </div>
      <button
        aria-label="Scroll to about section"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer dark:text-neo-dark-text" onClick={() => scrollToSection(NavSection.ABOUT)}
      >
        <ArrowDown size={48} strokeWidth={3} />
      </button>
    </Section>
  );
};

export default React.memo(Hero);