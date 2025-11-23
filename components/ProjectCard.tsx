import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import Tooltip from './Tooltip';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  // Swapped indices to ensure ID 3 (YouTube) maps to Pink when using (id-1) % length
  // ID 1 (FPL) -> Index 0 -> Yellow
  // ID 2 (Urban) -> Index 1 -> Orange
  // ID 3 (YouTube) -> Index 2 -> Pink
  // ID 4 (Anom) -> Index 3 -> Blue
  const shadowColors = [
    '#FFDE59', // Yellow
    '#FF914D', // Orange
    '#FF66C4', // Pink
    '#5CE1E6', // Blue
    '#7ED957', // Green
    '#8C52FF'  // Purple
  ];
  
  // Use project.id instead of index to ensure stable colors when filtering
  const colorIndex = (project.id - 1) % shadowColors.length;
  const shadowColor = shadowColors[colorIndex];
  
  const marqueeTags = [...project.tags, ...project.tags, ...project.tags, ...project.tags];

  const getWatermarkText = (category: string) => {
    const mapping: { [key: string]: string } = {
      'Data Science': 'DATA SCI',
      'Web Dev': 'WEB DEV',
      'AI/ML': 'AI/ML',
      'Frontend': 'FRONTEND',
      'Backend': 'BACKEND',
      'Fullstack': 'FULLSTACK',
      'Mobile': 'MOBILE',
    };
    return mapping[category] || category.toUpperCase();
  };

  const watermarkText = getWatermarkText(project.category);

  return (
    <div 
      className="group relative h-full bg-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-dark-border p-6 md:p-8 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_var(--shadow-col)] will-change-transform transform-gpu"
      style={{ '--shadow-col': shadowColor } as React.CSSProperties}
    >
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <span className="font-sans font-black text-7xl sm:text-8xl md:text-9xl text-black/[.04] dark:text-neo-dark-border/[.04] whitespace-nowrap select-none -rotate-12 transform-gpu">
          {watermarkText}
        </span>
      </div>
      
      {/* Pattern Background */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0"
      />

      {/* Header: Index & Category */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <span className="font-mono text-sm font-bold text-gray-500 dark:text-neo-dark-text-muted uppercase tracking-widest">
          {String(index + 1).padStart(2, '0')} // {project.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-3xl md:text-4xl font-black uppercase leading-[0.9] mb-4 text-black dark:text-neo-dark-text group-hover:text-[var(--shadow-col)] transition-colors duration-300 relative z-10 break-words">
        {project.title}
      </h3>

      {/* Description */}
      <p className="font-mono text-sm text-gray-700 dark:text-neo-dark-text-muted mb-6 leading-relaxed relative z-10 flex-grow">
        {project.description}
      </p>

      {/* Tags (Animated Marquee) */}
      <div className="mb-8 relative z-10 w-full overflow-hidden">
        <div className="flex w-max transform-gpu">
           {/* First Strip */}
           <div className="flex shrink-0 animate-marquee gap-2 pr-2 group-hover:[animation-play-state:paused] will-change-transform">
             {marqueeTags.map((tag, i) => (
               <span key={`t1-${i}`} className="border-2 border-black dark:border-neo-dark-border px-2 py-1 text-[10px] md:text-xs font-bold uppercase bg-transparent text-black dark:text-neo-dark-text hover:bg-neo-yellow hover:text-black transition-colors cursor-default whitespace-nowrap">
                   {tag}
               </span>
             ))}
           </div>
           {/* Duplicate Strip for seamless loop */}
           <div className="flex shrink-0 animate-marquee gap-2 pr-2 group-hover:[animation-play-state:paused] will-change-transform" aria-hidden="true">
             {marqueeTags.map((tag, i) => (
               <span key={`t2-${i}`} className="border-2 border-black dark:border-neo-dark-border px-2 py-1 text-[10px] md:text-xs font-bold uppercase bg-transparent text-black dark:text-neo-dark-text hover:bg-neo-yellow hover:text-black transition-colors cursor-default whitespace-nowrap">
                   {tag}
               </span>
             ))}
           </div>
        </div>
      </div>

      {/* Footer Buttons Side-by-Side */}
      <div className="mt-auto grid grid-cols-2 gap-3 relative z-10">
        {/* Live Demo Button */}
        <Tooltip text="Open Live Demo" className="w-full">
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border-4 border-black dark:border-neo-dark-border py-3 px-2 font-black uppercase text-xs md:text-sm bg-white dark:bg-neo-dark-bg text-black dark:text-neo-dark-text hover:bg-neo-green hover:text-black transition-colors group/btn w-full"
          >
            <span>Live Demo</span>
            <ExternalLink size={16} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        </Tooltip>

        {/* Source Code Button */}
        {project.github ? (
           <Tooltip text="View Source Code" className="w-full">
             <a 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border-4 border-black dark:border-neo-dark-border py-3 px-2 font-black uppercase text-xs md:text-sm bg-white dark:bg-neo-dark-bg text-black dark:text-neo-dark-text hover:bg-neo-blue hover:text-black transition-colors group/btn2 w-full"
            >
              <span>Source</span>
              <Github size={16} className="group-hover/btn2:-translate-y-0.5 group-hover/btn2:translate-x-0.5 transition-transform" />
            </a>
           </Tooltip>
        ) : (
          <div className="flex items-center justify-center border-4 border-gray-300 dark:border-gray-700 text-gray-400 py-3 px-2 font-black uppercase text-xs md:text-sm cursor-not-allowed w-full">
            <span>Private</span>
          </div>
        )}
      </div>

    </div>
  );
};

export default React.memo(ProjectCard);