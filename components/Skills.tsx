import React from 'react';
import { NavSection } from '../types';
import { SKILLS } from '../constants';

const Skills: React.FC = () => (
  <div id={NavSection.SKILLS} className="py-24 overflow-hidden relative border-b-4 border-black dark:border-neo-dark-border">
    <div className="flex flex-col items-center mb-12 reveal-on-scroll">
      <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 text-center flex flex-wrap justify-center gap-4 items-center transform hover:scale-105 transition-transform">
        <span className="text-black dark:text-neo-dark-text">MY</span>
        <span className="bg-neo-yellow text-black px-6 py-1 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_#FAFAFA] transform -skew-x-6">ARSENAL</span>
      </h2>
    </div>
    <div className="flex flex-col gap-8">
      <div className="flex overflow-hidden group reveal-on-scroll delay-100" style={{ willChange: 'transform' }}>
        <div className="flex shrink-0 animate-marquee gap-6 pr-6 group-hover:[animation-play-state:paused]">
          {[...SKILLS, ...SKILLS].map((skill, idx) => (
            <div key={`r1-${idx}`} className="bg-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-dark-border p-4 shadow-neo dark:shadow-neo-dark min-w-[200px] text-center flex items-center justify-center hover:-translate-y-2 transition-transform duration-300">
              <span className="text-xl md:text-2xl font-black uppercase text-black dark:text-neo-dark-text">{skill.name}</span>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee gap-6 pr-6 group-hover:[animation-play-state:paused]" aria-hidden="true">
          {[...SKILLS, ...SKILLS].map((skill, idx) => (
            <div key={`r1-dup-${idx}`} className="bg-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-dark-border p-4 shadow-neo dark:shadow-neo-dark min-w-[200px] text-center flex items-center justify-center hover:-translate-y-2 transition-transform duration-300">
              <span className="text-xl md:text-2xl font-black uppercase text-black dark:text-neo-dark-text">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex overflow-hidden group reveal-on-scroll delay-200" style={{ willChange: 'transform' }}>
        <div className="flex shrink-0 animate-marquee-reverse gap-6 pr-6 group-hover:[animation-play-state:paused]">
          {[...SKILLS, ...SKILLS].reverse().map((skill, idx) => (
            <div key={`r2-${idx}`} className="bg-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-dark-border p-4 shadow-neo dark:shadow-neo-dark min-w-[200px] text-center flex items-center justify-center hover:-translate-y-2 transition-transform duration-300">
              <span className="text-xl md:text-2xl font-black uppercase text-black dark:text-neo-dark-text">{skill.name}</span>
            </div>
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee-reverse gap-6 pr-6 group-hover:[animation-play-state:paused]" aria-hidden="true">
          {[...SKILLS, ...SKILLS].reverse().map((skill, idx) => (
            <div key={`r2-dup-${idx}`} className="bg-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-dark-border p-4 shadow-neo dark:shadow-neo-dark min-w-[200px] text-center flex items-center justify-center hover:-translate-y-2 transition-transform duration-300">
              <span className="text-xl md:text-2xl font-black uppercase text-black dark:text-neo-dark-text">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default React.memo(Skills);