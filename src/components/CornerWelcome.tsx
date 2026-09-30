import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface CornerWelcomeProps {
  onScrolled: () => void;
  isCompleted: boolean;
}

export const CornerWelcome: React.FC<CornerWelcomeProps> = ({ onScrolled, isCompleted }) => {
  const fullText = 'welcome.';
  const [displayText, setDisplayText] = useState('');
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTypingDone(true);
        // Do NOT automatically exit. Stay quiet until the user actually scrolls!
      }
    }, 110);

    return () => clearInterval(interval);
  }, []);

  // Listen for user scroll or interaction to enter interactive scroll mode
  useEffect(() => {
    if (isCompleted) return;

    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      // Any downward or upward scroll intent
      if (Math.abs(e.deltaY) > 4 || Math.abs(e.deltaX) > 4) {
        onScrolled();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      if (Math.abs(touchStartY - currentY) > 8) {
        onScrolled();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', 'Space', 'Enter'].includes(e.code)) {
        onScrolled();
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 5) {
        onScrolled();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isCompleted, onScrolled]);

  return (
    <AnimatePresence>
      {!isCompleted && (
        <motion.div
          key="corner-welcome-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#090a0c] flex flex-col justify-between p-6 sm:p-10 font-mono select-none"
          onClick={onScrolled}
        >
          {/* Top-Left Corner: Minimal typing */}
          <div className="flex items-center text-sm sm:text-base text-neutral-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2.5" />
            <span className="tracking-tight">{displayText}</span>
            <span className="w-1.5 h-3.5 bg-neutral-400 inline-block ml-0.5 animate-cursor-blink" />
          </div>

          {/* Bottom Prompt: Appears once typing finishes, waiting specifically for scroll */}
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <div className="text-[11px] text-neutral-600 hidden sm:block">
              alex.chen / systems
            </div>

            {typingDone && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 text-neutral-400 text-xs cursor-pointer hover:text-neutral-200 transition-colors"
              >
                <span>scroll to explore</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
