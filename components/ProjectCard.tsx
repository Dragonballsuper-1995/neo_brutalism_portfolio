
import React, { useState } from 'react';
import { Github, ExternalLink, ArrowRight, BookOpen } from 'lucide-react';
import { Project } from '../types';
import Tooltip from './Tooltip';
import CanvasRevealEffect from './ui/CanvasRevealEffect';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  theme: 'light' | 'dark';
}

// Helper to convert hex to rgb array
const hexToRgb = (hex: string): number[] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] 
    : [0, 0, 0];
}

// NEON colors for Dark Mode (High brightness to pop on Black)
const DARK_COLORS_HEX = [
  '#FFDE59', // Neon Yellow
  '#FF914D', // Neon Orange
  '#FF66C4', // Neon Pink
  '#5CE1E6', // Neon Blue
  '#7ED957', // Neon Green
  '#8C52FF'  // Neon Purple
];

// SATURATED colors for Light Mode (Darker shades to pop on White)
const LIGHT_COLORS_HEX = [
  '#D9B918', // Darker Yellow
  '#D96D18', // Darker Orange
  '#D91888', // Darker Pink
  '#0099CC', // Darker Blue
  '#4AAD18', // Darker Green
  '#5D18D9'  // Darker Purple
];

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDark = theme === 'dark';
  
  const colorIndex = (project.id - 1) % DARK_COLORS_HEX.length;
  
  // Select color based on theme
  const activeColorHex = isDark ? DARK_COLORS_HEX[colorIndex] : LIGHT_COLORS_HEX[colorIndex];
  // const shadowColorHex = DARK_COLORS_HEX[colorIndex]; // Keep shadow neon for the border effect (unused variable removed)
  const rgbColor = hexToRgb(activeColorHex);
  
  const marqueeTags = [...project.tags, ...project.tags, ...project.tags, ...project.tags];

  const getWatermarkText = (category: string) => {
    const mapping: { [key: string]: string } = {
      'Data Science': 'DATA',
      'Web Dev': 'WEB',
      'AI/ML': 'AI',
      'Frontend': 'UI',
      'Backend': 'API',
      'Fullstack': 'FULL',
      'Mobile': 'APP',
    };
    return mapping[category] || category.toUpperCase();
  };

  const watermarkText = getWatermarkText(project.category);

  return (
    <button 
      onClick={() => onClick(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full text-left group relative h-full flex flex-col overflow-hidden border-4 border-black dark:border-neo-dark-border bg-white dark:bg-neo-dark-surface shadow-neo dark:shadow-neo-dark hover:shadow-neo-lg dark:hover:shadow-neo-lg-dark hover:-translate-y-2 transition-all duration-300"
      aria-label={`View details for ${project.title}`}
    >
      {/* Decorative Top Bar */}
      <div 
        className="h-2 w-full border-b-4 border-black dark:border-neo-dark-border"
        style={{ backgroundColor: activeColorHex }}
      />

      {/* Main Content Container */}
      <div className="relative flex-1 flex flex-col p-8 z-10">
         {/* Background Watermark */}
         <div 
           className="absolute -right-4 top-10 text-9xl font-black opacity-5 pointer-events-none select-none z-0 rotate-12 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-110"
           style={{ color: activeColorHex }}
         >
           {watermarkText}
         </div>

         {/* Header */}
         <div className="relative z-10 mb-6">
            <div className="flex justify-between items-start gap-4">
              <h3 className="text-2xl md:text-3xl font-black uppercase leading-tight group-hover:text-neo-purple dark:group-hover:text-neo-yellow transition-colors">
                {project.title}
              </h3>
              <div 
                className="p-2 border-2 border-black dark:border-neo-dark-border bg-white dark:bg-black transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#fff]"
              >
                <BookOpen size={20} />
              </div>
            </div>
         </div>

         {/* Description */}
         <p className="relative z-10 font-mono text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-8 line-clamp-3">
           {project.description}
         </p>

         {/* Links & Action */}
         <div className="relative z-10 mt-auto flex items-center justify-between border-t-2 border-black/10 dark:border-white/10 pt-6">
            <div className="flex gap-3">
              {project.github && (
                <div 
                  onClick={(e) => { e.stopPropagation(); window.open(project.github, '_blank'); }}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-sm transition-colors cursor-pointer"
                >
                  <Tooltip text="View Code">
                     <Github size={20} />
                  </Tooltip>
                </div>
              )}
              <div 
                onClick={(e) => { e.stopPropagation(); window.open(project.link, '_blank'); }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-sm transition-colors cursor-pointer"
              >
                 <Tooltip text="Live Demo">
                    <ExternalLink size={20} />
                 </Tooltip>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider group-hover:underline decoration-2 underline-offset-4 decoration-neo-pink">
               Read Case Study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
         </div>
      </div>

      {/* Marquee Tags Footer */}
      <div 
         className="relative z-10 border-t-4 border-black dark:border-neo-dark-border py-3 overflow-hidden"
         style={{ backgroundColor: activeColorHex }}
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {marqueeTags.map((tag, i) => (
             <span key={i} className="mx-4 font-black text-xs uppercase text-black tracking-widest flex items-center gap-2">
               {tag} <span className="w-1 h-1 bg-black rounded-full"></span>
             </span>
          ))}
        </div>
      </div>

      {/* Hover Reveal Effect (Canvas) - Optimization: Only animate when hovered */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-multiply dark:mix-blend-screen">
          <CanvasRevealEffect 
             animationSpeed={4} 
             containerClassName="bg-transparent"
             colors={[rgbColor]}
             opacities={[0.1, 0.1, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.8, 1]}
             dotSize={2}
             enabled={isHovered}
          />
      </div>
    </button>
  );
};

export default React.memo(ProjectCard);
