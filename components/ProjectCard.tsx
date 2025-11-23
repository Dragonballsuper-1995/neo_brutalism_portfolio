import React, { useState, useEffect, useMemo } from 'react';
import Section from './Section';
import ProjectCard from './ProjectCard';
import ProjectSkeleton from './ProjectSkeleton';
import { NavSection, Project } from '../types';
import { PROJECTS } from '../constants';

// This hook is needed here now because it depends on the filter changing
const useProjectScrollReveal = (dependency: any) => {
  useEffect(() => {
    // Reset visibility for re-animation on filter change
    document.querySelectorAll('.reveal-on-scroll.is-visible').forEach(el => {
      // We only want to reset project cards
      if (el.closest(`#${NavSection.PROJECTS}`)) {
        el.classList.remove('is-visible');
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const timeoutId = setTimeout(() => {
      document.querySelectorAll(`#${NavSection.PROJECTS} .reveal-on-scroll`).forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [dependency]);
};


const ProjectsSection: React.FC = () => {
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [loadedProjects, setLoadedProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadedProjects(PROJECTS);
      setIsLoadingProjects(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const categories = useMemo(() => ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))], []);

  const filteredProjects = useMemo(() => loadedProjects.filter(project =>
    activeCategory === 'All' || project.category === activeCategory
  ), [loadedProjects, activeCategory]);

  useProjectScrollReveal(isLoadingProjects || activeCategory);

  return (
    <Section id={NavSection.PROJECTS}>
      <div className="flex flex-col items-center mb-8 reveal-on-scroll">
        <h2 className="text-5xl md:text-6xl font-black uppercase mb-4 text-center dark:text-neo-dark-text">
          Featured <span className="text-neo-purple">Works</span>
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-12 reveal-on-scroll px-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              px-6 py-2 font-mono font-bold border-2 border-black dark:border-neo-dark-border transition-all text-sm md:text-base uppercase tracking-wider
              ${activeCategory === category
                ? 'bg-neo-black text-white dark:bg-neo-dark-border dark:text-neo-dark-bg shadow-[2px_2px_0px_0px_rgba(126,217,87,1)] translate-x-[2px] translate-y-[2px]'
                : 'bg-white dark:bg-neo-dark-surface text-black dark:text-neo-dark-text shadow-neo dark:shadow-neo-dark hover:-translate-y-1 hover:bg-neo-green dark:hover:bg-neo-purple hover:text-black hover:shadow-neo-lg dark:hover:shadow-neo-lg-dark'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[600px] content-start">
        {isLoadingProjects ? (
          Array.from({ length: 4 }).map((_, index) => (
            <ProjectSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          filteredProjects.map((project, index) => (
            <div key={project.id} className="h-full">
              <div className="reveal-on-scroll h-full" style={{ transitionDelay: `${index * 150}ms` }}>
                <ProjectCard project={project} index={index} />
              </div>
            </div>
          ))
        )}
        {!isLoadingProjects && filteredProjects.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-20 border-4 border-black dark:border-neo-dark-border bg-white dark:bg-neo-dark-surface shadow-neo dark:shadow-neo-dark reveal-on-scroll">
            <p className="font-mono text-xl mb-2">No projects found in this category.</p>
            <button
              onClick={() => setActiveCategory('All')}
              className="text-neo-purple underline font-bold hover:text-neo-pink"
            >
              View all projects
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

export default React.memo(ProjectsSection);