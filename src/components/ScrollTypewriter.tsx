import React, { useState, useEffect, useRef } from 'react';

interface ScrollTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  cursor?: boolean;
  trigger?: boolean; // manual override trigger
}

export const ScrollTypewriter: React.FC<ScrollTypewriterProps> = ({
  text,
  speed = 35,
  delay = 0,
  className = '',
  as: Component = 'span',
  cursor = true,
  trigger,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // If external trigger is provided and false, don't start
    if (trigger === false) return;

    // Use IntersectionObserver to start typing when scrolled into view
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted, trigger]);

  useEffect(() => {
    if (!hasStarted) return;

    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    timeoutId = setTimeout(() => {
      setIsTyping(true);
      let index = 0;

      intervalId = setInterval(() => {
        index++;
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
          setIsComplete(true);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [hasStarted, text, speed, delay]);

  return (
    <Component
      ref={containerRef as any}
      className={`inline-block ${className}`}
    >
      <span>{displayedText}</span>
      {cursor && (!isComplete || isTyping) && hasStarted && (
        <span className="inline-block w-1.5 h-[1.1em] bg-emerald-400 ml-1 translate-y-0.5 animate-cursor-blink" />
      )}
      {!hasStarted && (
        // Invisible placeholder to prevent layout shift before typing starts
        <span className="opacity-0 select-none pointer-events-none">{text}</span>
      )}
    </Component>
  );
};
