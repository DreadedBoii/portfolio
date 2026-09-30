import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, RefreshCw, Gamepad2, Globe, Cpu, CheckCircle2, Terminal, Code2 } from 'lucide-react';
import { SKILL_CATEGORIES, PORTFOLIO_INFO } from '../data/portfolioData';
import { GeminiAboutData } from '../types';
import { ScrollScrubText } from './ScrollScrubText';

export const AboutSection: React.FC = () => {
  const [activeSkillTab, setActiveSkillTab] = useState(0);
  const [activeViewMode, setActiveViewMode] = useState<'gemini' | 'principles' | 'services'>('gemini');

  // Gemini About Data State
  const [geminiData, setGeminiData] = useState<GeminiAboutData | null>(null);
  const [isLoadingGemini, setIsLoadingGemini] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('SYNCHRONIZED');

  const fetchGeminiAbout = async () => {
    setIsLoadingGemini(true);
    try {
      const res = await fetch('/api/gemini/about');
      if (res.ok) {
        const data = await res.json();
        setGeminiData(data);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (err) {
      console.error('Failed to load Gemini about dossier:', err);
    } finally {
      setIsLoadingGemini(false);
    }
  };

  useEffect(() => {
    fetchGeminiAbout();
  }, []);

  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto border-t border-neutral-800/80 font-mono">
      {/* Section Header with Scroll Scrubbing */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
        <div>
          <div className="text-xs text-emerald-400 font-medium mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <ScrollScrubText
              text="01 / ABOUT & FREELANCE DOSSIER"
              offset={['start 95%', 'start 65%']}
            />
          </div>
          <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-wider font-terminal">
            <ScrollScrubText
              text="Web Engineering & Game Making"
              offset={['start 90%', 'start 50%']}
            />
          </h2>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setActiveViewMode('gemini')}
            className={`px-3 py-1.5 rounded text-xs transition-colors flex items-center gap-1.5 ${
              activeViewMode === 'gemini'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Gemini Live Dossier</span>
          </button>
          <button
            onClick={() => setActiveViewMode('services')}
            className={`px-3 py-1.5 rounded text-xs transition-colors flex items-center gap-1.5 ${
              activeViewMode === 'services'
                ? 'bg-neutral-100 text-neutral-900 font-medium'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Freelance Services</span>
          </button>
          <button
            onClick={() => setActiveViewMode('principles')}
            className={`px-3 py-1.5 rounded text-xs transition-colors flex items-center gap-1.5 ${
              activeViewMode === 'principles'
                ? 'bg-neutral-100 text-neutral-900 font-medium'
                : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Philosophy & Tech</span>
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* VIEW 1: GEMINI LIVE DOSSIER (FEED DATA FROM GEMINI)               */}
      {/* ----------------------------------------------------------------- */}
      {activeViewMode === 'gemini' && (
        <div className="space-y-8">
          {/* Cyber Terminal Frame for Gemini Output */}
          <div className="p-6 sm:p-8 rounded-lg border border-emerald-500/30 bg-neutral-950/90 relative backdrop-blur-md shadow-2xl">
            {/* Top Bar of Gemini Terminal */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-neutral-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-emerald-400 font-bold uppercase tracking-wider font-tech">
                  GEMINI 3.8 FLASH // PROFILE FEED
                </span>
                <span className="text-neutral-500 text-[11px] hidden sm:inline">
                  [{geminiData?.source || 'uplink_active'}]
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-neutral-500">
                  LAST SYNC: {lastUpdated}
                </span>
                <button
                  onClick={fetchGeminiAbout}
                  disabled={isLoadingGemini}
                  className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-850 border border-neutral-700/80 text-neutral-300 hover:text-white transition-all flex items-center gap-1.5 disabled:opacity-50"
                  title="Query Gemini for fresh profile evaluation"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoadingGemini ? 'animate-spin text-emerald-400' : ''}`} />
                  <span>{isLoadingGemini ? 'Synthesizing...' : 'Refresh Feed'}</span>
                </button>
              </div>
            </div>

            {/* AI Summary Statement */}
            <div className="space-y-4">
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-tech">
                // ARCHIT SHARMA EXECUTIVE OVERVIEW
              </div>
              <p className="text-base sm:text-lg text-neutral-100 font-tech leading-relaxed border-l-2 border-emerald-400/80 pl-4 py-1">
                {geminiData?.summary || PORTFOLIO_INFO.bio}
              </p>
            </div>

            {/* Dual Craft Pillars: Web Dev vs Game Making */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
              {/* Pillar 1: Web Dev */}
              <div className="p-4 rounded border border-neutral-850 bg-neutral-900/40 space-y-2">
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold font-tech">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>MODERN WEB DEVELOPMENT</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                  {geminiData?.webPhilosophy ||
                    "Building fast, tactile web applications using React, Next.js, and TypeScript. Interfaces engineered with 60fps animations, real-time WebSockets, and sub-100ms response times."}
                </p>
              </div>

              {/* Pillar 2: Game Making */}
              <div className="p-4 rounded border border-neutral-850 bg-neutral-900/40 space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold font-tech">
                  <Gamepad2 className="w-4 h-4 text-amber-400" />
                  <span>INDIE GAME MAKING & SHADERS</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                  {geminiData?.gamePhilosophy ||
                    "Crafting 2D/3D games in Godot, Unity, and in-browser WebGL. Focused on juicy player controls, frame-perfect game loops, custom GLSL shaders, and procedural world synthesis."}
                </p>
              </div>
            </div>

            {/* Freelance Value Propositions */}
            {geminiData?.freelanceValue && (
              <div className="pt-8 border-t border-neutral-900 mt-8 space-y-3">
                <div className="text-xs uppercase tracking-widest text-neutral-400 font-tech">
                  // CLIENT VALUE PROPOSITIONS (POWERED BY GEMINI)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {geminiData.freelanceValue.map((val, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded bg-neutral-900/60 border border-neutral-800 space-y-1.5"
                    >
                      <div className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{val.title}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed font-mono">
                        {val.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status Footer */}
            <div className="pt-6 mt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-tech gap-2">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Code2 className="w-3.5 h-3.5" />
                <span>{geminiData?.currentStatus || PORTFOLIO_INFO.status}</span>
              </span>
              <span>DIRECT INQUIRIES: mr.archit13@gmail.com</span>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* VIEW 2: FREELANCE SERVICES & COMMISSION PACKAGES                  */}
      {/* ----------------------------------------------------------------- */}
      {activeViewMode === 'services' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(geminiData?.services || [
              {
                name: "Full-Stack Web Applications",
                scope: "Next.js, React, Node.js, TypeScript, PostgreSQL, WebSockets",
                deliverable: "Responsive production-grade web app with auth, database, responsive UI, and deployment.",
              },
              {
                name: "Playable WebGL & Browser Games",
                scope: "Three.js, WebGL, custom GLSL shaders, Cannon-es physics, WebAudio",
                deliverable: "Instant zero-install browser games, marketing gamification, or interactive 3D demos.",
              },
              {
                name: "Indie Game Development (Godot / Unity)",
                scope: "Godot Engine (C# / GDScript), Unity, state machines, particle FX",
                deliverable: "Playable vertical slice or complete indie game published to itch.io or Steam.",
              },
              {
                name: "Rapid MVP & Interactive Prototyping",
                scope: "Fast 1-2 week concept validation, interactive canvases, pitch decks",
                deliverable: "Functional working prototype with clean codebase ready for investors or playtesters.",
              },
            ]).map((serv, idx) => (
              <motion.div
                key={serv.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-5 rounded-lg border border-neutral-800 bg-neutral-950/70 hover:border-emerald-500/40 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-neutral-100 font-tech">{serv.name}</h3>
                  <span className="text-[10px] text-emerald-400 font-mono uppercase bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                    Freelance Tier
                  </span>
                </div>
                <div className="text-xs text-neutral-400 font-mono">
                  <span className="text-neutral-500">Tech Focus: </span>
                  <span>{serv.scope}</span>
                </div>
                <div className="pt-2 border-t border-neutral-900 text-xs text-neutral-300 font-tech flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">&gt;</span>
                  <span>{serv.deliverable}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 rounded border border-neutral-800 bg-neutral-900/30 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
            <span className="text-neutral-400">
              Have a custom web project, browser game, or indie prototype in mind?
            </span>
            <a
              href="mailto:mr.archit13@gmail.com"
              className="px-4 py-2 rounded bg-emerald-500 text-neutral-950 font-bold hover:bg-emerald-400 transition-colors shrink-0"
            >
              Discuss Project Scope &rarr;
            </a>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* VIEW 3: PHILOSOPHY & TECHNICAL SKILL MATRIX                       */}
      {/* ----------------------------------------------------------------- */}
      {activeViewMode === 'principles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Principles */}
          <div className="lg:col-span-5 space-y-6 text-sm text-neutral-400 leading-relaxed font-mono">
            <p>
              I bridge two disciplines that often remain siloed: <span className="text-neutral-100 font-medium">modern web architecture</span> and <span className="text-neutral-100 font-medium">game design tactile feedback</span>.
            </p>
            <p>
              Whether engineering a high-concurrency SaaS dashboard or an indie game in Godot, I design for mechanical responsiveness: zero layout thrashing, 60fps framerates, instant user feedback, and clean maintainable code.
            </p>

            <div className="pt-4 border-t border-neutral-800/80 space-y-3 text-xs">
              <div className="text-neutral-300 font-semibold uppercase tracking-wider text-[11px] font-tech">
                Core Development Tenets:
              </div>
              <div className="space-y-2">
                <div className="p-3 rounded bg-neutral-900/40 border border-neutral-800/60">
                  <span className="text-neutral-200 font-medium">Tactile Game Feel: </span>
                  <span>Every button, canvas interaction, and game mechanic has weight, snap, and satisfying juice.</span>
                </div>
                <div className="p-3 rounded bg-neutral-900/40 border border-neutral-800/60">
                  <span className="text-neutral-200 font-medium">Native Web Standards: </span>
                  <span>WebGL, WebAudio, Canvas 2D, and WebSockets—creating rich experiences without heavy downloads.</span>
                </div>
                <div className="p-3 rounded bg-neutral-900/40 border border-neutral-800/60">
                  <span className="text-neutral-200 font-medium">Freelance Velocity: </span>
                  <span>Ship clean, battle-tested code quickly without over-engineering or unnecessary bloat.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Skill Matrix */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-neutral-800/80 pb-3">
              {SKILL_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.category}
                  onClick={() => setActiveSkillTab(idx)}
                  className={`text-xs px-3 py-1.5 rounded transition-colors ${
                    activeSkillTab === idx
                      ? 'bg-neutral-800 text-white font-medium'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {cat.category.toLowerCase()}
                </button>
              ))}
            </div>

            {/* Active Category Skills */}
            <div className="space-y-4 pt-1">
              {SKILL_CATEGORIES[activeSkillTab].items.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className="p-4 rounded border border-neutral-800/80 bg-neutral-900/30 hover:border-neutral-700/80 transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-200">{skill.name}</span>
                    <span className="text-neutral-500 text-[11px] font-tech">{skill.badge}</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
