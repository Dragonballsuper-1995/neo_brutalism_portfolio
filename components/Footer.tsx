
import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { NavSection } from '../types';
import { PERSONAL_INFO, SOCIALS } from '../constants';

interface FooterProps {
  scrollToSection: (id: NavSection) => void;
}

const getSocialHoverClass = (platform: string) => {
  switch(platform.toLowerCase()) {
    case 'github': return 'hover:text-[#f0f6fc]';
    case 'linkedin': return 'hover:text-[#0077b5]';
    case 'instagram': return 'hover:text-[#E4405F]';
    case 'twitter': return 'hover:text-[#1DA1F2]';
    default: return 'hover:text-neo-green';
  }
};

const Footer: React.FC<FooterProps> = ({ scrollToSection }) => (
  <footer className="bg-neo-dark-bg text-neo-dark-text border-t-4 border-neo-dark-border relative overflow-hidden">
    <div className="bg-neo-yellow text-black border-b-4 border-black py-2 overflow-hidden flex relative z-10">
      <div className="animate-marquee whitespace-nowrap font-black text-lg md:text-xl uppercase tracking-wider shrink-0 min-w-full">
        &nbsp;• AVAILABLE FOR WORK • LET'S BUILD SOMETHING AWESOME • OPEN TO COLLABORATION • FRONTEND MAGIC • AI INTEGRATION • AVAILABLE FOR WORK • LET'S BUILD SOMETHING AWESOME • OPEN TO COLLABORATION
      </div>
      <div className="animate-marquee whitespace-nowrap font-black text-lg md:text-xl uppercase tracking-wider shrink-0 min-w-full" aria-hidden="true">
        &nbsp;• AVAILABLE FOR WORK • LET'S BUILD SOMETHING AWESOME • OPEN TO COLLABORATION • FRONTEND MAGIC • AI INTEGRATION • AVAILABLE FOR WORK • LET'S BUILD SOMETHING AWESOME • OPEN TO COLLABORATION
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
      <div className="md:col-span-6 space-y-4">
        <button onClick={() => scrollToSection(NavSection.HERO)} className="group block text-left">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-1">
            SUJAL<span className="text-transparent stroke-text group-hover:text-neo-pink transition-colors">.DEV</span>
          </h2>
        </button>
        <p className="font-mono text-neo-dark-text-muted text-sm max-w-sm leading-relaxed">
          Crafting digital experiences with code, creativity, and a touch of chaos.
        </p>
        <div className="pt-2">
          <a href={PERSONAL_INFO.resumeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-black font-mono text-sm uppercase bg-white text-black px-4 py-2 border-2 border-black hover:bg-neo-pink hover:text-black transition-all shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
            Download Resume <ExternalLink size={14} />
          </a>
        </div>
      </div>
      <div className="md:col-span-3 flex flex-col">
        <h3 className="font-black text-neo-green uppercase text-lg mb-4 tracking-wide">Sitemap</h3>
        <ul className="space-y-2 font-mono text-sm mb-6">
          {Object.values(NavSection).map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section)}
                className="hover:text-neo-pink hover:translate-x-1 transition-transform uppercase text-neo-dark-text-muted hover:text-neo-dark-text"
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-3">
        <h3 className="font-black text-neo-blue uppercase text-lg mb-4 tracking-wide">Socials</h3>
        <ul className="space-y-2 font-mono text-sm">
          {SOCIALS.map(social => (
            <li key={social.platform}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:translate-x-1 transition-transform uppercase flex items-center gap-2 text-neo-dark-text-muted ${getSocialHoverClass(social.platform)}`}
              >
                {social.platform} <ArrowRight size={12} className="-rotate-45" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="border-t border-neo-dark-surface bg-neo-dark-bg py-4 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex justify-center items-center font-mono text-xs text-neo-dark-text-muted">
        <p>© {new Date().getFullYear()} Sujal Sanjay Chhajed. All rights reserved.</p>
      </div>
    </div>
    <style>{`
      .stroke-text {
        -webkit-text-stroke: 1px #FAFAFA;
      }
    `}</style>
  </footer>
);

export default React.memo(Footer);
