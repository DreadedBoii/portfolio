import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-800/80 py-10 px-6 max-w-5xl mx-auto font-mono text-xs text-neutral-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Identity & Copyright */}
        <div className="flex items-center gap-3">
          <span className="text-neutral-400 font-medium">Archit Sharma</span>
          <span>&copy; {new Date().getFullYear()}</span>
          <span>&middot;</span>
          <span>Freelance Web &amp; Game Developer</span>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-300 transition-colors flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>github</span>
          </a>
          <a
            href="https://itch.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-300 transition-colors flex items-center gap-1"
          >
            <span>itch.io</span>
          </a>
          <a
            href="mailto:mr.archit13@gmail.com"
            className="hover:text-neutral-300 transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>email</span>
          </a>
          <button
            onClick={scrollToTop}
            className="hover:text-neutral-300 transition-colors flex items-center gap-1 pl-2 border-l border-neutral-800"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
