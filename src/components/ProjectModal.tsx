import React from 'react';
import { X, ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      id="project-inspect-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#0c0d10] border border-neutral-800 rounded-lg p-6 sm:p-8 font-mono text-neutral-300 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-800 pb-4 mb-6">
          <div>
            <div className="text-xs text-emerald-400 font-medium uppercase mb-1">
              {project.category} // {project.status}
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
          <p>{project.description}</p>
        </div>

        {/* Architecture Spec */}
        <div className="p-3.5 rounded bg-neutral-950 border border-neutral-800/80 mb-6 space-y-1.5">
          <div className="text-xs font-semibold text-neutral-200">
            Pipeline Architecture:
          </div>
          <div className="text-xs text-neutral-400 font-mono overflow-x-auto whitespace-pre-wrap">
            {project.architecture}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-neutral-200 uppercase mb-3">
            Performance Metrics
          </div>
          <div className="grid grid-cols-3 gap-3">
            {project.metrics.map(m => (
              <div
                key={m.label}
                className="p-3 bg-neutral-900/60 border border-neutral-800/80 rounded"
              >
                <div className="text-sm sm:text-base font-bold text-neutral-100">{m.value}</div>
                <div className="text-[10px] text-neutral-500 uppercase mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-6 space-y-2">
          <div className="text-xs font-semibold text-neutral-200 uppercase mb-2">
            Key Implementations
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-400">
            {project.features.map((f, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">&ndash;</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-neutral-200 uppercase mb-2">
            Technologies
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map(t => (
              <span
                key={t}
                className="px-2 py-0.5 text-xs rounded bg-neutral-800 text-neutral-300 border border-neutral-700/60"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-200 hover:text-white rounded flex items-center gap-2 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-neutral-100 hover:bg-white text-neutral-900 font-medium rounded flex items-center gap-1.5 transition-colors"
              >
                <span>Live View</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
