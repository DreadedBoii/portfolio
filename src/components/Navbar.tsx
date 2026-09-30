import React, { useState, useEffect } from 'react';
import { Menu, X, Github, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_INFO } from '../data/portfolioData';

interface NavbarProps {
  onReplayWelcome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayWelcome }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Navbar gracefully fades in as the user scrolls past the hacking intro into the portfolio
      const threshold = window.innerHeight * 2.8;
      if (window.scrollY > threshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'about', href: '#about' },
    { label: 'projects', href: '#projects' },
    { label: 'experience', href: '#experience' },
    { label: 'contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 bg-[#090a0c]/85 backdrop-blur-md border-b border-neutral-800/60 transition-all duration-500 ${
        scrolled
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between font-mono">
        {/* Brand */}
        <a
          href="#"
          onClick={e => {
            if (onReplayWelcome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              onReplayWelcome();
            }
          }}
          title="Back to start"
          className="flex items-center gap-2 text-sm font-medium tracking-tight text-neutral-100 hover:text-white transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="font-semibold">{PORTFOLIO_INFO.callsign.toLowerCase().replace('_', '.')}</span>
          <span className="text-neutral-500 text-xs hidden sm:inline">/ web &amp; games</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-neutral-400 hover:text-neutral-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* External Actions */}
        <div className="hidden md:flex items-center gap-4 text-xs">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-100 transition-colors p-1.5"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="px-3 py-1.5 rounded bg-neutral-900 border border-neutral-700/80 text-neutral-200 hover:bg-neutral-800 hover:text-white hover:border-neutral-600 transition-all flex items-center gap-1"
          >
            <span>get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded text-neutral-400 hover:text-white hover:bg-neutral-800/60 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800/80 bg-[#090a0c] px-6 py-4 space-y-3 font-mono text-sm">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-neutral-400 hover:text-white py-1.5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              <span>github</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-emerald-400 hover:text-emerald-300"
            >
              archit.sharma@matrix.network
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
