import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCE_LOGS } from '../data/portfolioData';
import { ScrollScrubText } from './ScrollScrubText';

export const TimelineSection: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto border-t border-neutral-800/80 font-mono">
      {/* Header with Scroll Scrubbing */}
      <div className="mb-14">
        <div className="text-xs text-emerald-400 font-medium mb-2">
          <ScrollScrubText
            text="03 / MILESTONES & JOURNEY"
            offset={['start 95%', 'start 65%']}
          />
        </div>
        <h2 className="text-3xl sm:text-5xl font-normal text-white tracking-wider font-terminal">
          <ScrollScrubText
            text="Freelance Contracts & Indie Shipping"
            offset={['start 90%', 'start 50%']}
          />
        </h2>
      </div>

      {/* Timeline Items */}
      <div className="relative border-l border-neutral-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-12">
        {EXPERIENCE_LOGS.map((log, idx) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="relative group"
          >
            {/* Small Neutral Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#090a0c] border border-neutral-600 group-hover:border-emerald-500 flex items-center justify-center transition-colors">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 group-hover:bg-emerald-400 transition-colors" />
            </div>

            {/* Experience Card / Content */}
            <div className="space-y-3">
              {/* Timestamp & Company */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-100 group-hover:text-white transition-colors">
                    {log.role}
                  </h3>
                  <div className="text-neutral-400 font-medium">
                    {log.company}
                  </div>
                </div>
                <div className="text-neutral-500 text-xs">
                  {log.timestamp}
                </div>
              </div>

              {/* Accomplishments */}
              <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-3xl">
                {log.description.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2">
                    <span className="text-neutral-600 font-bold">&ndash;</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {log.technologies.map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] rounded bg-neutral-900 text-neutral-400 border border-neutral-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
