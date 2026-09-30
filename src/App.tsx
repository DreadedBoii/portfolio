/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppleScrollHero } from './components/AppleScrollHero';
import { Navbar } from './components/Navbar';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TimelineSection } from './components/TimelineSection';
import { TerminalSection } from './components/TerminalSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#090a0c] text-neutral-200 font-mono selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Floating Header (gracefully fades in on scroll) */}
      <Navbar />

      {/* Apple-style Scroll Scrub Hero */}
      <AppleScrollHero />

      {/* Main Narrative & Portfolio Sections with Scroll-Driven Letter Typing */}
      <main className="relative z-20 bg-[#090a0c]">
        <AboutSection />
        <ProjectsSection />
        <TimelineSection />
        <TerminalSection />
      </main>

      {/* Clean Minimal Footer */}
      <Footer />
    </div>
  );
}
