import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Github, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { ScrollScrubText } from './ScrollScrubText';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ['All', 'Web Dev', 'Game Dev', 'WebGL / 3D', 'Full-Stack'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto border-t border-neutral-800/80 font-mono">
      {/* Header & Filter with Scroll Scrubbing */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
        <div>
          <div className="text-xs text-emerald-400 font-medium mb-2">
            <ScrollScrubText
              text="02 / SELECTED WORK"
              offset={['start 95%', 'start 65%']}
            />
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-wider font-terminal">
            <ScrollScrubText
              text="Web Applications & Indie Games"
              offset={['start 90%', 'start 50%']}
            />
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs transition-colors ${
                selectedCategory === cat
                  ? 'bg-neutral-100 text-neutral-900 font-medium'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with Scroll Scrubbing on Titles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, idx) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: (idx % 2) * 0.1 }}
            className="p-6 rounded-lg border border-neutral-800/80 bg-neutral-900/30 hover:border-neutral-700 hover:bg-neutral-900/50 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                <span className="text-emerald-400 text-[11px] font-medium uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="text-neutral-500 text-[11px]">
                  {project.status}
                </span>
              </div>

              {/* Title with Scroll Scrubbing */}
              <h3 className="text-xl font-bold text-neutral-100 mb-2 group-hover:text-white transition-colors">
                <ScrollScrubText
                  text={project.title}
                  offset={['start 95%', 'start 70%']}
                  cursor={false}
                />
              </h3>

              {/* Description */}
              <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-2 mb-5 p-2.5 rounded bg-neutral-950/60 border border-neutral-800/60 text-xs">
                {project.metrics.slice(0, 2).map(m => (
                  <div key={m.label} className="truncate">
                    <div className="text-[10px] text-neutral-500 uppercase">{m.label}</div>
                    <div className="font-semibold text-neutral-200 text-xs mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.techStack.map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] rounded bg-neutral-800/60 text-neutral-300 border border-neutral-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs">
              <button
                onClick={() => setActiveProject(project)}
                className="text-neutral-300 hover:text-white font-medium flex items-center gap-1.5 transition-colors"
              >
                <span>View Architecture</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
              </button>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors p-1"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Project Architecture Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
