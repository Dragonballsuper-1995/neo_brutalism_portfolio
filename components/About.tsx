import React from 'react';
import { Zap, Terminal, MapPin, GraduationCap, Gamepad2, Coffee, Film } from 'lucide-react';
import Section from './Section';
import { NavSection } from '../types';

const About: React.FC = () => (
  <Section id={NavSection.ABOUT} className="border-b-4 border-black dark:border-neo-dark-border">
    <div className="flex flex-col items-center mb-16 reveal-on-scroll">
      <div className="bg-neo-black text-white px-4 py-1 font-mono text-sm font-bold mb-4 uppercase tracking-widest transform -rotate-2">
        File: profile_data.txt
      </div>
      <h2 className="text-5xl md:text-7xl font-black uppercase text-center leading-[0.9]">
        The <span className="text-neo-pink underline decoration-wavy decoration-4">Man</span><br />
        Behind The <span className="bg-neo-green text-black px-2">Code</span>
      </h2>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
      <div className="lg:col-span-5 flex flex-col gap-6 reveal-on-scroll">
        <div className="relative group">
          <div className="absolute inset-0 bg-neo-purple translate-x-4 translate-y-4 border-4 border-black transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
          <div className="relative border-4 border-black bg-white p-2 z-10">
            <div className="aspect-[4/5] overflow-hidden border-2 border-black relative">
              <img
                src="./Assets/profile-pic-4.webp"
                alt="Sujal Chhajed"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                loading="lazy"
                decoding="async"
                width="800"
                height="1000"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/80 p-2 backdrop-blur-sm transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-mono text-xs text-center"> &gt; SYSTEM.ROOT.USER </p>
              </div>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 bg-neo-yellow border-4 border-black p-4 rounded-full shadow-neo animate-[spin_10s_linear_infinite] z-20 hidden md:block">
            <Zap size={32} className="text-black" />
          </div>
        </div>
      </div>
      <div className="lg:col-span-7 flex flex-col gap-8 reveal-on-scroll delay-200">
        <div className="bg-white dark:bg-neo-dark-surface p-8 border-l-8 border-neo-purple shadow-sm border-y-4 border-r-4 border-black dark:border-neo-dark-border">
          <h3 className="font-black text-3xl uppercase mb-6">
            Code, Caffeine & <span className="text-neo-purple">Chaos</span>.
          </h3>
          <div className="prose dark:prose-invert font-mono text-lg leading-relaxed opacity-90">
            <p className="mb-4">
              I’m <span className="font-bold bg-neo-yellow text-black px-1">Sujal Sanjay Chhajed</span>, a Computer Science student who treats code like a competitive sport. Whether it's training ML models or debugging a full-stack app, I bring that same intensity as the final lap of an F1 race.
            </p>
            <p>
              I don't just build software; I craft digital experiences. My philosophy? <span className="italic font-bold">"Tech Nerd with a Human Touch."</span> I believe the best code doesn't just work—it resonates.
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-neo-dark-surface p-8 border-4 border-black dark:border-neo-dark-border shadow-neo dark:shadow-neo-dark">
          <h3 className="font-black text-xl uppercase mb-6 border-b-4 border-black dark:border-neo-dark-border pb-3 flex items-center gap-3">
            <Terminal size={24} className="text-neo-yellow fill-black" /> SPECS
          </h3>
          <ul className="space-y-4 font-mono font-bold text-sm md:text-base">
            <li className="flex items-center justify-between group cursor-default">
              <span className="text-gray-500 group-hover:text-black dark:group-hover:text-neo-dark-text transition-colors">Location</span>
              <span className="flex items-center gap-2 bg-neo-blue/20 px-3 py-1 rounded border-2 border-transparent group-hover:border-neo-blue transition-all">
                <MapPin size={16} /> Chennai, IN
              </span>
            </li>
            <li className="flex items-center justify-between group cursor-default">
              <span className="text-gray-500 group-hover:text-black dark:group-hover:text-neo-dark-text transition-colors">Education</span>
              <span className="flex items-center gap-2 bg-neo-orange/20 px-3 py-1 rounded border-2 border-transparent group-hover:border-neo-orange transition-all">
                <GraduationCap size={16} /> B.Tech CSE (VIT)
              </span>
            </li>
            <li className="flex items-center justify-between group cursor-default">
              <span className="text-gray-500 group-hover:text-black dark:group-hover:text-neo-dark-text transition-colors">Status</span>
              <span className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded border-2 border-transparent group-hover:border-green-500 transition-all">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" /> Online
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="reveal-on-scroll delay-300">
      <div className="flex items-center gap-4 mb-8">
        <h3 className="font-black text-xl uppercase bg-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-dark-border px-4 py-2 inline-flex items-center gap-2 shadow-neo-sm">
          <Gamepad2 size={24} /> Character Traits
        </h3>
        <div className="h-1 flex-grow bg-black dark:bg-white/20"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#E10600] text-black dark:text-neo-dark-text p-6 border-4 border-black dark:border-neo-dark-border shadow-neo hover:-translate-y-2 hover:shadow-neo-lg transition-all group h-full flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity select-none pointer-events-none transform -rotate-12">
            <span className="text-5xl font-black whitespace-nowrap">BOX BOX</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 relative z-10">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
            <path d="M4 9h16" />
            <path d="M8 15V3" />
            <path d="M12 15V3" />
            <path d="M16 15V3" />
          </svg>
          <div className="relative z-10">
            <p className="font-black uppercase text-xl tracking-tighter">F1 Fanatic</p>
            <p className="text-xs font-mono opacity-90 mt-1 text-white">Forza Ferrari!!</p>
          </div>
        </div>
        <div className="bg-neo-orange text-black p-6 border-4 border-black dark:border-neo-dark-border shadow-neo hover:-translate-y-2 hover:shadow-neo-lg transition-all group h-full flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity select-none pointer-events-none transform -rotate-12">
            <div className="text-8xl font-black">悟空</div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-4 relative z-10">
            <circle cx="12" cy="12" r="10" />
            <path d="m12 8 1.5 3h3l-2.5 2 1 3-3-2-3 2 1-3-2.5-2h3z" fill="currentColor" />
          </svg>
          <div className="relative z-10">
            <p className="font-black uppercase text-xl tracking-tighter">Anime</p>
            <p className="text-xs font-mono opacity-80 mt-1 font-bold">Dragon Ball Super</p>
          </div>
        </div>
        <div className="bg-neo-yellow text-black p-6 border-4 border-black dark:border-neo-dark-border shadow-neo hover:-translate-y-2 hover:shadow-neo-lg transition-all group h-full flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity select-none pointer-events-none transform -rotate-12">
            <span className="text-7xl font-black">TASTY</span>
          </div>
          <Coffee className="mb-4 text-black relative z-10" size={32} />
          <div className="relative z-10">
            <p className="font-black uppercase text-xl tracking-tighter">Foodie</p>
            <p className="text-xs font-mono opacity-80 mt-1 font-bold">Street to Gourmet</p>
          </div>
        </div>
        <div className="bg-neo-blue text-black p-6 border-4 border-black dark:border-neo-dark-border shadow-neo hover:-translate-y-2 hover:shadow-neo-lg transition-all group h-full flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity select-none pointer-events-none transform -rotate-12">
            <span className="text-6xl font-black">ACTION</span>
          </div>
          <Film className="mb-4 text-black relative z-10" size={32} />
          <div className="relative z-10">
            <p className="font-black uppercase text-xl tracking-tighter">Cinema</p>
            <p className="text-xs font-mono opacity-80 mt-1 font-bold">Story Seeker</p>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

export default React.memo(About);