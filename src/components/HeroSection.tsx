import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { ScrollTypewriter } from './ScrollTypewriter';

interface HeroSectionProps {
  isActive?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isActive = true }) => {
  return (
    <section id="hero" className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      {/* Availability Status Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 mb-8"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <ScrollTypewriter
          text="Available for technical advisory & systems architecture"
          speed={25}
          delay={200}
          cursor={false}
        />
      </motion.div>

      {/* Main Headline with Interactive Scroll Typing */}
      <div className="space-y-4 max-w-3xl mb-8">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-mono min-h-[1.2em]">
          <ScrollTypewriter
            text="Alex Chen"
            speed={60}
            delay={300}
            className="text-white"
          />
        </h1>
        <div className="text-xl sm:text-2xl text-neutral-300 font-mono font-medium min-h-[1.4em]">
          <ScrollTypewriter
            text="Systems Architect & Low-Level Software Engineer"
            speed={30}
            delay={900}
            className="text-neutral-300"
          />
        </div>
      </div>

      {/* Bio / Value Proposition */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-base sm:text-lg text-neutral-400 font-mono leading-relaxed max-w-2xl mb-8"
      >
        Specializing in high-concurrency distributed brokers, zero-knowledge cryptographic protocols, and near-native WebAssembly pipelines. I build durable software with mechanical empathy for hardware, CPU caches, and network boundaries.
      </motion.p>

      {/* Core Focus Tags */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-wrap gap-2 mb-10 text-xs font-mono text-neutral-400"
      >
        {['Rust & C++', 'Distributed Consensus', 'Zero-Knowledge & WebCrypto', 'Linux Kernel & eBPF', 'WebAssembly & WebGPU'].map((tag, idx) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.7 + idx * 0.08 }}
            className="px-2.5 py-1 rounded bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 hover:text-neutral-200 transition-colors"
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex flex-wrap items-center gap-4 text-xs font-mono"
      >
        <a
          href="#projects"
          className="px-5 py-2.5 rounded bg-neutral-100 hover:bg-white text-neutral-900 font-medium transition-all flex items-center gap-2 hover:scale-[1.02]"
        >
          <span>View selected work</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </a>
        <a
          href="#contact"
          className="px-5 py-2.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-all flex items-center gap-2"
        >
          <span>Contact</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
        </a>
        <span className="text-neutral-500 text-xs pl-2">
          San Francisco, CA
        </span>
      </motion.div>

      {/* Minimal Key Stats Row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-16 pt-8 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono"
      >
        <div>
          <div className="text-neutral-500 mb-1">focus</div>
          <div className="text-neutral-200 font-medium text-sm">Low-latency Systems</div>
        </div>
        <div>
          <div className="text-neutral-500 mb-1">peak throughput</div>
          <div className="text-neutral-200 font-medium text-sm">1.2M msg/s (Nexus)</div>
        </div>
        <div>
          <div className="text-neutral-500 mb-1">p99 latency</div>
          <div className="text-neutral-200 font-medium text-sm">48 microseconds</div>
        </div>
        <div>
          <div className="text-neutral-500 mb-1">experience</div>
          <div className="text-neutral-200 font-medium text-sm">10+ Years Production</div>
        </div>
      </motion.div>
    </section>
  );
};
