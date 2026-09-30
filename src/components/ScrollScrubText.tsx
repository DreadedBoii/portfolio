import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'motion/react';

interface ScrollScrubTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  cursor?: boolean;
  cursorColor?: string;
  // Offset where typing begins and ends relative to viewport
  // e.g. ["start 85%", "start 40%"] means starts when top is at 85% of screen, finishes when top is at 40%
  offset?: [any, any];
  preserveHeight?: boolean;
}

export const ScrollScrubText: React.FC<ScrollScrubTextProps> = ({
  text,
  as: Component = 'span',
  className = '',
  cursor = true,
  cursorColor = 'bg-emerald-400',
  offset = ['start 90%', 'start 40%'],
  preserveHeight = true,
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef as any,
    offset: offset as any,
  });

  // Map 0 -> 1 progress to 0 -> text.length characters
  const charCount = useTransform(scrollYProgress, [0, 1], [0, text.length]);

  useMotionValueEvent(charCount, 'change', latest => {
    const rounded = Math.min(text.length, Math.max(0, Math.round(latest)));
    setVisibleCount(rounded);
  });

  // Calculate initial state on mount in case user loads page scrolled down
  useEffect(() => {
    const updateInitial = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Approximate position between 90% and 40%
      const start = vh * 0.9;
      const end = vh * 0.4;
      if (rect.top <= end) {
        setVisibleCount(text.length);
      } else if (rect.top >= start) {
        setVisibleCount(0);
      } else {
        const p = (start - rect.top) / (start - end);
        setVisibleCount(Math.min(text.length, Math.max(0, Math.round(p * text.length))));
      }
    };
    updateInitial();
    window.addEventListener('resize', updateInitial);
    return () => window.removeEventListener('resize', updateInitial);
  }, [text]);

  const displayedText = text.slice(0, visibleCount);
  const isTypingActive = visibleCount > 0 && visibleCount < text.length;

  return (
    <Component
      ref={containerRef as any}
      className={`relative inline-block ${className}`}
    >
      {preserveHeight && (
        // Invisible layout placeholder so layout never shifts or jumps as text types in/out
        <span className="invisible select-none pointer-events-none" aria-hidden="true">
          {text}
        </span>
      )}
      <span className={preserveHeight ? 'absolute inset-0' : ''}>
        <span>{displayedText}</span>
        {cursor && (
          <span
            className={`inline-block w-1.5 h-[1.1em] ${cursorColor} ml-0.5 translate-y-0.5 ${
              isTypingActive ? 'opacity-100' : 'animate-cursor-blink'
            } ${visibleCount === 0 ? 'hidden' : ''}`}
          />
        )}
      </span>
    </Component>
  );
};
