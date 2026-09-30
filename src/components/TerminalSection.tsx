import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Copy, Check, Terminal as TerminalIcon, Send, Sparkles, Loader2 } from 'lucide-react';
import { PORTFOLIO_INFO, TERMINAL_COMMANDS, PROJECTS } from '../data/portfolioData';
import { ScrollScrubText } from './ScrollScrubText';

export const TerminalSection: React.FC = () => {
  const [copiedPgp, setCopiedPgp] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'terminal'>('terminal');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Terminal State
  const [commandInput, setCommandInput] = useState('');
  const [isQueryingGemini, setIsQueryingGemini] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<Array<{ type: 'in' | 'out' | 'ai'; text: string }>>([
    { type: 'out', text: 'ARCHIT SHARMA // FREELANCE WEB & GAME DEV TERMINAL' },
    { type: 'ai', text: '⚡ Gemini 3.8 Flash Neural Uplink Connected. Type "help" or ask anything: "gemini tell me about your games"' }
  ]);

  const handleCopyPgp = () => {
    navigator.clipboard.writeText(PORTFOLIO_INFO.pgpKey);
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitted(true);
  };

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = commandInput.trim();
    if (!rawCmd) return;

    const lowerCmd = rawCmd.toLowerCase();
    const currentInput = rawCmd;
    setCommandInput('');

    // Echo input command
    const updatedLogs = [...terminalLogs, { type: 'in' as const, text: `$ ${currentInput}` }];
    setTerminalLogs(updatedLogs);

    // 1. Handle Gemini queries: "gemini <question>" or "ask <question>"
    if (lowerCmd.startsWith('gemini ') || lowerCmd.startsWith('ask ')) {
      const question = rawCmd.replace(/^(gemini|ask)\s+/i, '').trim();
      if (!question) {
        setTerminalLogs(prev => [
          ...prev,
          { type: 'out', text: 'Usage: gemini <your question here> (e.g., "gemini what game engines do you use?")' }
        ]);
        return;
      }

      setIsQueryingGemini(true);
      setTerminalLogs(prev => [
        ...prev,
        { type: 'out', text: `[QUERYING GEMINI 3.8 FLASH] "${question}"...` }
      ]);

      try {
        const res = await fetch('/api/gemini/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question })
        });
        const data = await res.json();
        setTerminalLogs(prev => [
          ...prev,
          { type: 'ai', text: `🤖 GEMINI RESPONSE:\n${data.answer || data.error || 'No response returned.'}` }
        ]);
      } catch (err) {
        setTerminalLogs(prev => [
          ...prev,
          { type: 'out', text: `[ERROR] Failed to communicate with Gemini uplink: ${(err as Error).message}` }
        ]);
      } finally {
        setIsQueryingGemini(false);
      }
      return;
    }

    // 2. Handle Project Pitch request: "pitch <idea>"
    if (lowerCmd.startsWith('pitch ')) {
      const projectIdea = rawCmd.replace(/^pitch\s+/i, '').trim();
      if (!projectIdea) {
        setTerminalLogs(prev => [
          ...prev,
          { type: 'out', text: 'Usage: pitch <your project concept> (e.g., "pitch a 3D browser multiplayer card game")' }
        ]);
        return;
      }

      setIsQueryingGemini(true);
      setTerminalLogs(prev => [
        ...prev,
        { type: 'out', text: `[COMPILING FREELANCE PROPOSAL VIA GEMINI] Concept: "${projectIdea}"...` }
      ]);

      try {
        const res = await fetch('/api/gemini/pitch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectIdea, projectType: 'freelance' })
        });
        const data = await res.json();
        setTerminalLogs(prev => [
          ...prev,
          { type: 'ai', text: `📋 TAILORED FREELANCE BLUEPRINT:\n${data.proposal || 'Proposal could not be rendered.'}` }
        ]);
      } catch (err) {
        setTerminalLogs(prev => [
          ...prev,
          { type: 'out', text: `[ERROR] Pitch generation failed: ${(err as Error).message}` }
        ]);
      } finally {
        setIsQueryingGemini(false);
      }
      return;
    }

    // 3. Built-in Terminal Commands
    if (lowerCmd === 'help') {
      const text = TERMINAL_COMMANDS.map(c => `  ${c.command.padEnd(16, ' ')} : ${c.description}`).join('\n');
      setTerminalLogs(prev => [...prev, { type: 'out', text }]);
    } else if (lowerCmd === 'bio') {
      const text = `${PORTFOLIO_INFO.callsign} // ${PORTFOLIO_INFO.role}\n\n${PORTFOLIO_INFO.bio}\n\nCraft: Web Development (React/Next.js/TypeScript) & Game Making (Godot/Unity/WebGL)\nEmail: mr.archit13@gmail.com\nStatus: ${PORTFOLIO_INFO.status}`;
      setTerminalLogs(prev => [...prev, { type: 'out', text }]);
    } else if (lowerCmd === 'projects') {
      const list = PROJECTS.map(p => `  • ${p.title} [${p.category}] - ${p.description.slice(0, 80)}...`).join('\n');
      setTerminalLogs(prev => [...prev, { type: 'out', text: `ACTIVE WEB & GAME BUILDS:\n${list}` }]);
    } else if (lowerCmd === 'games') {
      const text = `INDIE GAME DEVELOPMENT & PLAYABLES:
  1. CyberDrift WebGL     : 3D browser synthwave arcade racer (Three.js, GLSL shaders, Cannon physics)
  2. ChronoRealm          : Top-down retro action-RPG in Godot 4.x with C# & BSP procedural dungeons
  3. PixelForge 2D Engine : Custom WebGL 2D engine with AABB physics and chiptune sound synthesis
  4. VoxelVerse 3D        : Voxel exploration sandbox with Web Workers greedy mesher & multiplayer
  
  Game Tech Stack: Godot Engine, Unity, WebGL, Three.js, C#, GLSL Shaders, Aseprite, FMOD.`;
      setTerminalLogs(prev => [...prev, { type: 'out', text }]);
    } else if (lowerCmd === 'services' || lowerCmd === 'freelance') {
      const text = `FREELANCE COMMISSIONS & SERVICES:
  • Full-Stack Web Development : React, Next.js, Node.js, WebSockets, high-performance dashboards
  • WebGL & 3D Web Experiences: Three.js interactive product visualizers, shader art, 60fps canvas
  • Indie Game Development    : Godot & Unity prototypes, core loop design, full itch.io releases
  • Rapid MVP Prototyping     : 1-2 week concept validation sprints for startups & studios
  
  Rates & Availability: Open for select contract & freelance projects. Reach out: mr.archit13@gmail.com`;
      setTerminalLogs(prev => [...prev, { type: 'out', text }]);
    } else if (lowerCmd === 'skills') {
      const text = `TECHNICAL CAPABILITIES:
  • Web Dev: React, Next.js, TypeScript, Node.js, Tailwind CSS, WebSockets, PostgreSQL, Redis
  • Game Dev: Godot (C#/GDScript), Unity, WebGL, GLSL Shaders, 2D/3D Physics, Level Design
  • Graphics & Sound: Three.js, Canvas API, WebAudio API, Aseprite, Blender, FMOD Studio`;
      setTerminalLogs(prev => [...prev, { type: 'out', text }]);
    } else if (lowerCmd === 'contact') {
      const text = `DIRECT CHANNELS:
  Email    : mr.archit13@gmail.com
  Location : Global Remote [UTC-8 to UTC+5:30]
  GitHub   : https://github.com
  itch.io  : https://itch.io
  PGP Key  : ${PORTFOLIO_INFO.pgpKey}`;
      setTerminalLogs(prev => [...prev, { type: 'out', text }]);
    } else if (lowerCmd === 'clear') {
      setTerminalLogs([
        { type: 'out', text: 'ARCHIT SHARMA // SHELL RESET' },
        { type: 'ai', text: 'Ask Gemini anything: "gemini describe your web dev experience"' }
      ]);
    } else {
      setTerminalLogs(prev => [
        ...prev,
        { type: 'out', text: `Command not recognized: "${rawCmd}". Type "help" or ask Gemini: "gemini <question>".` }
      ]);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto border-t border-neutral-800/80 font-mono">
      {/* Header with Scroll Scrubbing */}
      <div className="mb-14">
        <div className="text-xs text-emerald-400 font-medium mb-2">
          <ScrollScrubText
            text="04 / CONTACT & TERMINAL INTERACTION"
            offset={['start 95%', 'start 65%']}
          />
        </div>
        <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-wider font-terminal">
          <ScrollScrubText
            text="Hire Archit & Query Gemini"
            offset={['start 90%', 'start 50%']}
          />
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Coordinates */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 space-y-6 text-xs text-neutral-400"
        >
          <p className="text-sm leading-relaxed text-neutral-300 font-tech">
            Currently accepting freelance commissions, contract roles, and collaborative game builds. Whether you need a responsive Next.js web application, a playable WebGL marketing game, or an indie prototype in Godot/Unity, let's build something unforgettable.
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <div className="text-neutral-500 uppercase text-[10px] mb-1 font-tech">Direct Contact Email</div>
              <a
                href="mailto:mr.archit13@gmail.com"
                className="text-neutral-200 hover:text-white text-sm font-medium flex items-center gap-1.5 transition-colors font-mono"
              >
                <span>mr.archit13@gmail.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
              </a>
            </div>

            <div>
              <div className="text-neutral-500 uppercase text-[10px] mb-1 font-tech">Working Model & Availability</div>
              <div className="text-neutral-300 font-tech">Global Remote // Contract &amp; Sprint Commissions</div>
            </div>

            <div>
              <div className="text-neutral-500 uppercase text-[10px] mb-1 font-tech">PGP Public Key</div>
              <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 break-all select-all font-mono">
                {PORTFOLIO_INFO.pgpKey}
              </div>
              <button
                onClick={handleCopyPgp}
                className="mt-1.5 text-neutral-400 hover:text-white flex items-center gap-1.5 text-[11px] transition-colors"
              >
                {copiedPgp ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPgp ? 'Copied to clipboard' : 'Copy public key'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive Box (Terminal CLI & Direct Message) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-7 rounded-lg border border-neutral-800 bg-neutral-900/40 p-6 space-y-5"
        >
          {/* Toggle */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-1.5 transition-colors ${
                  activeTab === 'terminal' ? 'text-emerald-400 font-bold' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>Interactive CLI &amp; Gemini</span>
              </button>
              <span className="text-neutral-700">|</span>
              <button
                onClick={() => setActiveTab('form')}
                className={`transition-colors ${
                  activeTab === 'form' ? 'text-white font-medium' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Quick Inquiry Form
              </button>
            </div>
            <span className="text-[11px] text-emerald-400/80 hidden sm:inline font-tech">
              Gemini 3.8 Flash Online
            </span>
          </div>

          {activeTab === 'form' ? (
            submitted ? (
              <div className="py-12 text-center space-y-2 text-xs">
                <div className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <Check className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-neutral-200">Inquiry Dispatched</h4>
                <p className="text-neutral-400 max-w-sm mx-auto">
                  Thank you for reaching out. Archit will review your project details and get back to <span className="text-neutral-200">{email}</span> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="mt-4 text-xs text-neutral-400 hover:text-white underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-neutral-400 mb-1 font-tech">Your Name / Studio</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Alex (Indie Studio Lead)"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-neutral-200 focus:outline-none focus:border-neutral-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-tech">Your Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="alex@studio.com"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-neutral-200 focus:outline-none focus:border-neutral-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-tech">Project Scope &amp; Target</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Describe your web application, browser game, Godot prototype, or timeline..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-neutral-200 focus:outline-none focus:border-neutral-600 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold transition-all flex items-center justify-center gap-2"
                >
                  <span>Dispatch Project Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )
          ) : (
            /* Interactive CLI Console with Gemini Neural Hook */
            <div className="space-y-3">
              <div className="bg-neutral-950 rounded p-3.5 h-64 overflow-y-auto font-mono text-xs space-y-2.5 text-neutral-300 border border-neutral-850">
                {terminalLogs.map((log, i) => (
                  <div
                    key={i}
                    className={
                      log.type === 'in'
                        ? 'text-emerald-400 font-semibold'
                        : log.type === 'ai'
                        ? 'text-emerald-300 bg-emerald-950/30 p-2 rounded border border-emerald-900/50 whitespace-pre-wrap font-mono'
                        : 'text-neutral-400 whitespace-pre-wrap'
                    }
                  >
                    {log.text}
                  </div>
                ))}
                {isQueryingGemini && (
                  <div className="flex items-center gap-2 text-emerald-400 text-xs py-1">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Neural Uplink: Gemini 3.8 Flash is generating response...</span>
                  </div>
                )}
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="flex flex-wrap gap-1.5 text-[11px] text-neutral-400 font-tech">
                <span className="text-neutral-500">Quick prompts:</span>
                <button
                  type="button"
                  onClick={() => setCommandInput('gemini what game engines does Archit use?')}
                  className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800"
                >
                  gemini game engines?
                </button>
                <button
                  type="button"
                  onClick={() => setCommandInput('gemini why hire Archit for web dev?')}
                  className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800"
                >
                  gemini web dev?
                </button>
                <button
                  type="button"
                  onClick={() => setCommandInput('services')}
                  className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800"
                >
                  services
                </button>
                <button
                  type="button"
                  onClick={() => setCommandInput('pitch a 3D browser card game')}
                  className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800"
                >
                  pitch &lt;idea&gt;
                </button>
              </div>

              {/* Terminal Input Line */}
              <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 text-xs pt-1">
                <span className="text-emerald-500 font-bold">$</span>
                <input
                  type="text"
                  value={commandInput}
                  disabled={isQueryingGemini}
                  onChange={e => setCommandInput(e.target.value)}
                  placeholder='Try "gemini <question>", "pitch <idea>", "services", "games", "help"...'
                  className="w-full bg-transparent text-neutral-100 focus:outline-none placeholder-neutral-600 font-mono disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isQueryingGemini || !commandInput.trim()}
                  className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs transition-colors disabled:opacity-40"
                >
                  Run
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
