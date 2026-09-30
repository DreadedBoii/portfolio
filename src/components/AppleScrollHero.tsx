import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'motion/react';
import { ArrowDown, Terminal, ShieldAlert, CheckCircle2, Lock } from 'lucide-react';

interface AppleScrollHeroProps {
  onProgressChange?: (progress: number) => void;
}

export const AppleScrollHero: React.FC<AppleScrollHeroProps> = ({ onProgressChange }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Responsive screen detection for ASCII adaptation
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ----------------------------------------------------
  // ON-LOAD BOOT TYPING & INTERFACE CONSTRUCTION
  // All elements type in and assemble in front of user
  // ----------------------------------------------------
  const [welcomeText, setWelcomeText] = useState('');
  const [welcomeDone, setWelcomeDone] = useState(false);
  const [statusPillText, setStatusPillText] = useState('');
  const [tagText, setTagText] = useState('');
  const [headlineText, setHeadlineText] = useState('');
  const [descText, setDescText] = useState('');
  const [promptText, setPromptText] = useState('');
  const [bottomLeftText, setBottomLeftText] = useState('');
  const [bottomRightText, setBottomRightText] = useState('');

  useEffect(() => {
    const fullWelcome = 'Welcome user, scroll to initialize';
    const fullStatus = 'SYSTEM LOCKED // STANDBY';
    const fullTag = 'SECURITY ENCLAVE // LEVEL 4 GATEWAY';
    const fullHeadline = 'SYSTEM LOCKED';
    const fullDesc =
      'Unauthorized access logged. Scroll mouse wheel or swipe to execute intrusion protocol.';
    const fullPrompt = '$ ./breach_gateway.sh --autorun --force';
    const fullBottomLeft = 'ENGINE: INTRUSION_DAEMON_V2.4';
    const fullBottomRight = 'READY: SCROLL DOWN TO HACK';

    let welcomeIdx = 0;
    let statusIdx = 0;
    let tagIdx = 0;
    let headIdx = 0;
    let descIdx = 0;
    let promptIdx = 0;
    let blIdx = 0;
    let brIdx = 0;

    const timer = setInterval(() => {
      // 1. Welcome text (in pure white)
      if (welcomeIdx <= fullWelcome.length) {
        setWelcomeText(fullWelcome.slice(0, welcomeIdx));
        welcomeIdx++;
      } else {
        setWelcomeDone(true);
      }

      // 2. Status Pill (top right)
      if (statusIdx <= fullStatus.length) {
        setStatusPillText(fullStatus.slice(0, statusIdx));
        statusIdx++;
      }

      // 3. Center tag
      if (tagIdx <= fullTag.length) {
        setTagText(fullTag.slice(0, tagIdx));
        tagIdx++;
      }

      // 4. Headline
      if (headIdx <= fullHeadline.length) {
        setHeadlineText(fullHeadline.slice(0, headIdx));
        headIdx++;
      }

      // 5. Desc (starts shortly after)
      if (welcomeIdx > 8 && descIdx <= fullDesc.length) {
        setDescText(fullDesc.slice(0, descIdx));
        descIdx += 2;
      }

      // 6. Prompt
      if (headIdx > 5 && promptIdx <= fullPrompt.length) {
        setPromptText(fullPrompt.slice(0, promptIdx));
        promptIdx++;
      }

      // 7. Bottom labels
      if (blIdx <= fullBottomLeft.length) {
        setBottomLeftText(fullBottomLeft.slice(0, blIdx));
        blIdx++;
      }
      if (brIdx <= fullBottomRight.length) {
        setBottomRightText(fullBottomRight.slice(0, brIdx));
        brIdx++;
      }

      if (
        welcomeIdx > fullWelcome.length &&
        descIdx > fullDesc.length &&
        promptIdx > fullPrompt.length
      ) {
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, []);

  // Sticky Scroll Scrubbing Hook across container height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track scroll state
  const [scrollProgress, setScrollProgress] = useState(0);

  // ----------------------------------------------------
  // HACKER INTRO TEXT & ASCII ART DEFINITIONS (RESPONSIVE)
  // ----------------------------------------------------

  // Desktop ASCII Hacking Windows (Wide dual-panel)
  const desktopHackingLogs = useMemo(
    () => [
      '┌──[ INTRUSION PROTOCOL: PROBE_DAEMON.SH ]─────────────────────────────┐',
      '│ > TARGET: 0x7FFF_MAIN_FRAME [PORT 443 / DAEMON LISTENER]             │',
      '│ > INITIATING TCP SYN-ACK SPOOFING & PACKET INJECTION...             │',
      '│ > BYPASSING ASLR (ADDRESS SPACE LAYOUT RANDOMIZATION)... [OK]        │',
      '│ > CORRUPTING STACK CANARY [0xDEADC0DE] -> ROP CHAIN DEPLOYED         │',
      '└──────────────────────────────────────────────────────────────────────┘',
      '',
      '┌──[ SECURITY BYPASS ]──────────────┐  ┌──[ CIPHER BREAKER ]───────────┐',
      '│ [!] KERNEL SE-LINUX: PERMISSIVE   │  │ [*] ALGO: CHACHA20-POLY1305   │',
      '│ [!] STACK SMASHING DETECT: DEAD   │  │ [*] NONCE SEARCH: EXHAUSTIVE  │',
      '│ [!] PRIVILEGE ESCALATION: LEVEL 0 │  │ [*] SECRET KEY: MATCHED       │',
      '└───────────────────────────────────┘  └───────────────────────────────┘',
      '',
      '┌──[ PAYLOAD DEPLOYMENT: ROOT SHELL INJECTION ]────────────────────────┐',
      '│ [+] OVERWRITING SYSTEM ENTROPY POOL... 100%                          │',
      '│ [+] ELEVATING CURRENT SESSION UID: 1000 -> UID: 0 (ROOT/WHEEL)       │',
      '│ [+] FIREWALL RULES DESTROYED // ACCESS GATES COMPROMISED             │',
      '└──────────────────────────────────────────────────────────────────────┘',
    ],
    []
  );

  // Mobile ASCII Hacking Windows (Narrow cyberdeck box formatted for <640px)
  const mobileHackingLogs = useMemo(
    () => [
      '┌──[ EXPLOIT: PROBE.SH ]───────────┐',
      '│ > TARGET: 0x7FFF_GATEWAY:443     │',
      '│ > TCP SYN-ACK SPOOF: INJECTED    │',
      '│ > ASLR BYPASS: [CONFIRMED]       │',
      '│ > STACK CANARY [0xDEAD]: BYPASS  │',
      '│ > ROP CHAIN DEPLOYED (UID: 0)    │',
      '├──[ CIPHER BREAKER ]──────────────┤',
      '│ [*] ALGO: CHACHA20-POLY1305      │',
      '│ [*] NONCE SEARCH: EXHAUSTED      │',
      '│ [*] SECRET KEY: VERIFIED         │',
      '├──[ ROOT PRIVILEGE ELEVATION ]────┤',
      '│ [+] ENTROPY POOL OVERWRITTEN     │',
      '│ [+] FIREWALL GATES: CRIPPLED     │',
      '│ [+] ROOT SHELL GRANTED           │',
      '└──[ SYSTEM COMPROMISED ]──────────┘',
    ],
    []
  );

  const desktopHackingString = useMemo(() => desktopHackingLogs.join('\n'), [desktopHackingLogs]);
  const mobileHackingString = useMemo(() => mobileHackingLogs.join('\n'), [mobileHackingLogs]);

  // Responsive ASCII for "ACCESS GRANTED"
  // Desktop: Big 106-col single line banner
  const desktopAccessGrantedAscii = useMemo(
    () =>
      [
        ' █████   ██████  ██████ ███████ ███████     ██████  ██████   █████  ███    ██ ████████ ███████ ██████  ',
        '██   ██ ██      ██      ██      ██         ██       ██   ██ ██   ██ ████   ██    ██    ██      ██   ██ ',
        '███████ ██      ██      █████   ███████    ██   ███ ██████  ███████ ██ ██  ██    ██    █████   ██   ██ ',
        '██   ██ ██      ██      ██           ██    ██    ██ ██   ██ ██   ██ ██  ██ ██    ██    ██      ██   ██ ',
        '██   ██  ██████  ██████ ███████ ███████     ██████  ██   ██ ██   ██ ██   ████    ██    ███████ ██████  ',
      ].join('\n'),
    []
  );

  // Mobile: Stacked 2-block responsive banner (fits on any phone without clipping)
  const mobileAccessGrantedAscii = useMemo(
    () =>
      [
        ' █████   ██████  ██████ ███████ ███████',
        '██   ██ ██      ██      ██      ██     ',
        '███████ ██      ██      █████   ███████',
        '██   ██ ██      ██      ██           ██',
        '██   ██  ██████  ██████ ███████ ███████',
        '              [ ACCESS ]               ',
        ' ██████  ██████   █████  ███    ██ ████████ ███████ ██████ ',
        '██       ██   ██ ██   ██ ████   ██    ██    ██      ██   ██',
        '██   ███ ██████  ███████ ██ ██  ██    ██    █████   ██   ██',
        '██    ██ ██   ██ ██   ██ ██  ██ ██    ██    ██      ██   ██',
        ' ██████  ██   ██ ██   ██ ██   ████    ██    ███████ ██████ ',
        '              [ GRANTED ]              ',
      ].join('\n'),
    []
  );

  const activeHackingString = isMobile ? mobileHackingString : desktopHackingString;
  const activeAccessGrantedAscii = isMobile
    ? mobileAccessGrantedAscii
    : desktopAccessGrantedAscii;

  // Actual Portfolio Content Strings
  const titleText = 'Archit Sharma';
  const roleText = 'Freelance Dev // Web Development & Game Making';
  const manifestoText =
    'Crafting fluid, high-performance web applications and captivating indie games. Fusing modern full-stack web architectures with Godot, Unity, WebGL, and custom GLSL shaders to turn bold ideas into responsive, 60fps playable reality.';

  // ----------------------------------------------------
  // SCROLL PROGRESS TRANSFORMS
  // Phase 1: Hacking ASCII Windows (0.03 -> 0.38)
  // Phase 2: "ACCESS GRANTED" ASCII (0.40 -> 0.62)
  // Phase 3: Actual Portfolio Intro (0.65 -> 1.00)
  // ----------------------------------------------------

  // 1. Hacking ASCII letters count
  const hackingCountTransform = useTransform(
    scrollYProgress,
    [0.03, 0.36],
    [0, activeHackingString.length]
  );

  // 2. Access Granted ASCII letters count
  const accessGrantedCountTransform = useTransform(
    scrollYProgress,
    [0.4, 0.58],
    [0, activeAccessGrantedAscii.length]
  );

  // 3. Portfolio Title: 0.65 -> 0.77
  const titleCountTransform = useTransform(
    scrollYProgress,
    [0.65, 0.77],
    [0, titleText.length]
  );

  // 4. Portfolio Role: 0.78 -> 0.87
  const roleCountTransform = useTransform(
    scrollYProgress,
    [0.78, 0.87],
    [0, roleText.length]
  );

  // 5. Portfolio Manifesto: 0.88 -> 0.98
  const manifestoCountTransform = useTransform(
    scrollYProgress,
    [0.88, 0.98],
    [0, manifestoText.length]
  );

  const [hackingCharCount, setHackingCharCount] = useState(0);
  const [accessGrantedCharCount, setAccessGrantedCharCount] = useState(0);
  const [titleCount, setTitleCount] = useState(0);
  const [roleCount, setRoleCount] = useState(0);
  const [manifestoCount, setManifestoCount] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    setScrollProgress(latest);
    if (onProgressChange) onProgressChange(latest);
  });

  useMotionValueEvent(hackingCountTransform, 'change', latest => {
    setHackingCharCount(
      Math.min(activeHackingString.length, Math.max(0, Math.round(latest)))
    );
  });

  useMotionValueEvent(accessGrantedCountTransform, 'change', latest => {
    setAccessGrantedCharCount(
      Math.min(activeAccessGrantedAscii.length, Math.max(0, Math.round(latest)))
    );
  });

  useMotionValueEvent(titleCountTransform, 'change', latest => {
    setTitleCount(Math.min(titleText.length, Math.max(0, Math.round(latest))));
  });

  useMotionValueEvent(roleCountTransform, 'change', latest => {
    setRoleCount(Math.min(roleText.length, Math.max(0, Math.round(latest))));
  });

  useMotionValueEvent(manifestoCountTransform, 'change', latest => {
    setManifestoCount(Math.min(manifestoText.length, Math.max(0, Math.round(latest))));
  });

  // Displayed strings
  const displayedHacking = activeHackingString.slice(0, hackingCharCount);
  const displayedAccessGranted = activeAccessGrantedAscii.slice(
    0,
    accessGrantedCharCount
  );
  const displayedTitle = titleText.slice(0, titleCount);
  const displayedRole = roleText.slice(0, roleCount);
  const displayedManifesto = manifestoText.slice(0, manifestoCount);

  // Phase visibility determinations
  const isStarted = scrollProgress > 0.02;
  const isHackingPhase = scrollProgress >= 0.02 && scrollProgress < 0.39;
  const isAccessGrantedPhase = scrollProgress >= 0.39 && scrollProgress < 0.65;
  const isPortfolioPhase = scrollProgress >= 0.65;

  // Compute hacking percentage for the retro status monitor
  const hackPct = Math.min(
    100,
    Math.max(0, Math.round(((scrollProgress - 0.03) / 0.33) * 100))
  );

  return (
    <div ref={containerRef} className="relative h-[440vh]">
      {/* Sticky Screen Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between p-4 sm:p-8 lg:p-12 overflow-hidden bg-[#090a0c] font-mono select-none">
        {/* Top Status Bar: Self-constructing boot animation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="z-20 pb-3 relative"
        >
          <div className="flex items-center justify-between">
            {/* Top-Left: "Welcome user, scroll to initialize" IN PURE WHITE */}
            <div className="flex items-center gap-2.5 text-xs sm:text-sm">
              <span
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  isPortfolioPhase
                    ? 'bg-emerald-400'
                    : isAccessGrantedPhase
                    ? 'bg-emerald-500 animate-pulse'
                    : isHackingPhase
                    ? 'bg-amber-400 animate-ping'
                    : 'bg-white animate-pulse'
                }`}
              />
              <span className="tracking-tight font-medium text-white font-tech">
                {welcomeText}
              </span>
              {!welcomeDone && (
                <span className="w-1.5 h-3.5 bg-white inline-block ml-0.5 animate-cursor-blink" />
              )}
              {welcomeDone && (
                <span className="text-[11px] text-neutral-500 ml-2 hidden sm:inline">
                  [{Math.round(scrollProgress * 100)}% SCRUB]
                </span>
              )}
            </div>

            {/* Phase Pill in Top Right: Types out on load */}
            <div className="text-[11px] font-mono px-3 py-1 rounded border border-neutral-850 bg-neutral-950/80 hidden sm:flex items-center gap-2">
              {isPortfolioPhase ? (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>ROOT_SESSION // ARCHIT SHARMA</span>
                </span>
              ) : isAccessGrantedPhase ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1.5 animate-pulse">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>AUTH_STATUS: 0x00 GRANTED</span>
                </span>
              ) : isHackingPhase ? (
                <span className="text-amber-400 flex items-center gap-1.5 animate-pulse">
                  <ShieldAlert className="w-3 h-3" />
                  <span>INTRUSION_ACTIVE ({hackPct}%)</span>
                </span>
              ) : (
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-neutral-500" />
                  <span>{statusPillText || 'SYSTEM LOCKED'}</span>
                  {statusPillText.length < 23 && (
                    <span className="w-1 h-3 bg-neutral-500 inline-block animate-cursor-blink" />
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Animated glowing border divider drawing across */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="h-px bg-gradient-to-r from-neutral-800 via-neutral-700 to-neutral-900 mt-3 origin-left"
          />
        </motion.div>

        {/* Center Main Stage Area */}
        <div className="max-w-4xl mx-auto w-full my-auto py-4 relative min-h-[440px] flex items-center justify-center">
          {/* ---------------------------------------------------- */}
          {/* ZERO SCROLL: INITIAL IDLE SCREEN WITH TYPED BOOT     */}
          {/* ---------------------------------------------------- */}
          {!isStarted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="text-center space-y-6 py-8 w-full max-w-2xl px-4"
            >
              {/* Terminal Frame Box that draws in */}
              <div className="border border-neutral-800 bg-neutral-950/70 p-6 sm:p-10 rounded-lg relative backdrop-blur-sm shadow-2xl">
                {/* Corner bracket decorations */}
                <span className="absolute -top-1 -left-1 text-emerald-500 text-xs font-mono select-none">
                  ┌
                </span>
                <span className="absolute -top-1 -right-1 text-emerald-500 text-xs font-mono select-none">
                  ┐
                </span>
                <span className="absolute -bottom-1 -left-1 text-emerald-500 text-xs font-mono select-none">
                  └
                </span>
                <span className="absolute -bottom-1 -right-1 text-emerald-500 text-xs font-mono select-none">
                  ┘
                </span>

                {/* Typed Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-900/90 border border-neutral-800 text-[11px] text-emerald-400 font-tech mb-4">
                  <Terminal className="w-3 h-3" />
                  <span>{tagText}</span>
                  {tagText.length < 35 && (
                    <span className="w-1.5 h-3 bg-emerald-400 inline-block animate-cursor-blink" />
                  )}
                </div>

                {/* Typed Headline in VT323 terminal font */}
                <div className="text-4xl sm:text-6xl md:text-7xl font-terminal text-neutral-100 tracking-wider min-h-[1.1em] flex items-center justify-center">
                  <span>{headlineText}</span>
                  {headlineText.length < 13 && (
                    <span className="w-2.5 sm:w-3.5 h-[0.9em] bg-neutral-200 inline-block ml-1 animate-cursor-blink" />
                  )}
                </div>

                {/* Typed Description */}
                <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto pt-3 font-tech min-h-[3em]">
                  <span>{descText}</span>
                  {descText.length > 0 && descText.length < 87 && (
                    <span className="w-1.5 h-3 bg-neutral-400 inline-block ml-0.5 animate-cursor-blink" />
                  )}
                </p>

                {/* Simulated CLI Prompt */}
                <div className="mt-5 pt-4 border-t border-neutral-900 flex items-center justify-center gap-2 text-xs text-neutral-500 font-mono">
                  <span className="text-emerald-500 font-semibold">&gt;</span>
                  <span className="text-neutral-300">{promptText}</span>
                  {promptText.length < 38 && (
                    <span className="w-1.5 h-3.5 bg-emerald-400 inline-block animate-cursor-blink" />
                  )}
                </div>
              </div>

              {/* Scroll Trigger Pill */}
              <div className="flex flex-col items-center gap-2 text-xs text-white/90">
                <ArrowDown className="w-4 h-4 animate-bounce text-emerald-400" />
                <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-tech">
                  scroll down to hack
                </span>
              </div>
            </motion.div>
          )}

          {/* ---------------------------------------------------- */}
          {/* PHASE 1: HACKING INTO SYSTEM (ADAPTIVE ASCII PANELS) */}
          {/* ---------------------------------------------------- */}
          {isHackingPhase && (
            <div className="w-full space-y-4 px-2 sm:px-0">
              <div className="flex items-center justify-between text-xs text-amber-400 pb-1 border-b border-amber-900/40">
                <span className="flex items-center gap-2 font-semibold">
                  <Terminal className="w-3.5 h-3.5 animate-spin" />
                  <span>
                    {isMobile
                      ? 'EXPLOIT RUNNING...'
                      : 'EXECUTING SYSTEM EXPLOIT & MEMORY INJECTION...'}
                  </span>
                </span>
                <span className="font-mono">{hackPct}% COMPLETE</span>
              </div>

              {/* The ASCII Windows terminal block - automatically sized */}
              <div className="bg-neutral-950/90 border border-amber-500/30 rounded p-3 sm:p-5 shadow-2xl shadow-amber-950/20 overflow-x-auto">
                <pre className="text-[clamp(9px,2vw,13px)] font-mono text-amber-300 leading-relaxed whitespace-pre font-tech select-all">
                  {displayedHacking}
                  {hackingCharCount < activeHackingString.length && (
                    <span className="inline-block w-2 h-3.5 bg-amber-400 ml-0.5 translate-y-0.5 animate-cursor-blink" />
                  )}
                </pre>
              </div>

              <div className="text-[11px] text-neutral-500 flex items-center justify-between font-tech">
                <span>[SCRUB DOWN TO ADVANCE MEMORY OVERFLOW]</span>
                <span className="text-neutral-400">ROP_CHAIN: 0x7FFE9900</span>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* PHASE 2: ASCII "ACCESS GRANTED" IN GREEN FONT        */}
          {/* ---------------------------------------------------- */}
          {isAccessGrantedPhase && (
            <div className="w-full text-center space-y-5 py-4 px-2 sm:px-0">
              {/* Green Terminal Frame */}
              <div className="p-4 sm:p-8 rounded-lg border-2 border-emerald-500/70 bg-neutral-950/95 shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden">
                {/* Scanline overlay effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(16,185,129,0.03)_50%,transparent_50%)] bg-[length:100%_4px]" />

                <div className="text-xs sm:text-sm text-emerald-400 font-bold uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>ROOT PRIVILEGES ESTABLISHED // 0x00</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>

                {/* The Responsive Green ASCII ACCESS GRANTED Art */}
                <div className="overflow-x-auto py-2 flex justify-center">
                  <pre className="text-[clamp(8px,1.6vw,14px)] leading-tight font-terminal text-emerald-400 font-bold whitespace-pre drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
                    {displayedAccessGranted}
                    {accessGrantedCharCount < activeAccessGrantedAscii.length && (
                      <span className="inline-block w-2 sm:w-3 h-4 bg-emerald-400 ml-1 translate-y-0.5 animate-cursor-blink" />
                    )}
                  </pre>
                </div>

                {/* Subtitle announcement */}
                <div className="pt-4 border-t border-emerald-900/60 mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-emerald-300 font-tech">
                  <div>
                    <span>WELCOME OPERATOR: </span>
                    <span className="font-bold text-white underline">
                      ARCHIT SHARMA
                    </span>
                  </div>
                  <div className="text-emerald-400/80 animate-pulse">
                    CONTINUE SCROLLING TO UNLOCK FREELANCE WEB &amp; GAME DEV DOSSIER &darr;
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------- */}
          {/* PHASE 3: ACTUAL PORTFOLIO HERO INTRO (ARCHIT SHARMA) */}
          {/* ---------------------------------------------------- */}
          {isPortfolioPhase && (
            <div className="w-full space-y-6 px-2 sm:px-0">
              {/* Small Authorization Badge */}
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="uppercase tracking-widest text-[11px]">
                  TERMINAL MAIN // ROOT AUTHORIZED
                </span>
              </div>

              {/* 1. Name Headline: Archit Sharma in big terminal style */}
              <div className="min-h-[1.2em]">
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-normal tracking-wider text-white font-terminal flex items-center">
                  <span>{displayedTitle}</span>
                  {titleCount > 0 && titleCount < titleText.length && (
                    <span className="inline-block w-3 sm:w-4 h-[0.9em] bg-emerald-400 ml-2 translate-y-1 animate-cursor-blink" />
                  )}
                </h1>
              </div>

              {/* 2. Subtitle / Role */}
              <div className="min-h-[1.5em]">
                <p className="text-lg sm:text-2xl md:text-3xl text-neutral-300 font-mono font-medium flex items-center font-tech">
                  <span>{displayedRole}</span>
                  {roleCount > 0 && roleCount < roleText.length && (
                    <span className="inline-block w-1.5 sm:w-2 h-[1em] bg-emerald-400 ml-1 translate-y-0.5 animate-cursor-blink" />
                  )}
                </p>
              </div>

              {/* 3. Manifesto Bio */}
              <div className="min-h-[4.5em] max-w-2xl pt-2">
                <p className="text-xs sm:text-base md:text-lg text-neutral-400 font-mono leading-relaxed font-tech">
                  <span>{displayedManifesto}</span>
                  {manifestoCount > 0 && manifestoCount < manifestoText.length && (
                    <span className="inline-block w-1.5 h-[1.1em] bg-emerald-400 ml-0.5 translate-y-0.5 animate-cursor-blink" />
                  )}
                </p>
              </div>

              {/* 4. Tags & Metrics (Revealed when portfolio scrub completes) */}
              <div
                style={{
                  opacity: Math.min(1, Math.max(0, (scrollProgress - 0.9) / 0.08)),
                  transform: `translateY(${Math.max(
                    0,
                    (1 - (scrollProgress - 0.9) / 0.08) * 15
                  )}px)`,
                }}
                className="pt-6 space-y-6 transition-all duration-300"
              >
                {/* Core Skill Chips */}
                <div className="flex flex-wrap gap-2 text-xs font-mono text-neutral-400">
                  <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                    React &amp; Next.js
                  </span>
                  <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                    Godot &amp; Unity (C#)
                  </span>
                  <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                    Three.js &amp; WebGL
                  </span>
                  <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                    GLSL Shaders &amp; VFX
                  </span>
                  <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                    TypeScript &amp; Node.js
                  </span>
                  <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                    Game Mechanics &amp; Physics
                  </span>
                </div>

                {/* Minimal Key Stats Row */}
                <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-tech">
                  <div>
                    <div className="text-neutral-500 mb-0.5">primary craft</div>
                    <div className="text-neutral-200 font-medium">
                      Web &amp; Game Dev
                    </div>
                  </div>
                  <div>
                    <div className="text-neutral-500 mb-0.5">framerate target</div>
                    <div className="text-neutral-200 font-medium">60 FPS Stable</div>
                  </div>
                  <div>
                    <div className="text-neutral-500 mb-0.5">sprint turnaround</div>
                    <div className="text-neutral-200 font-medium">
                      Rapid MVPs
                    </div>
                  </div>
                  <div>
                    <div className="text-neutral-500 mb-0.5">availability</div>
                    <div className="text-emerald-400 font-medium">Open for Hire</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Bar: Self-constructing boot animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="pt-4 relative z-20"
        >
          {/* Animated divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="h-px bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 mb-3 origin-right"
          />

          <div className="flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-3">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-tech">
                {isPortfolioPhase
                  ? 'Portfolio Sequence'
                  : isAccessGrantedPhase
                  ? 'Authorization Stream'
                  : bottomLeftText || 'Intrusion Engine'}
              </span>
              <div className="w-20 sm:w-36 h-1 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-75 ${
                    isPortfolioPhase
                      ? 'bg-emerald-400'
                      : isAccessGrantedPhase
                      ? 'bg-emerald-500'
                      : 'bg-amber-400'
                  }`}
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 font-tech">
              {scrollProgress < 0.95 ? (
                <div className="flex items-center gap-1.5 text-neutral-400">
                  <span className="hidden sm:inline">
                    {isPortfolioPhase
                      ? 'scroll down to complete bio'
                      : isAccessGrantedPhase
                      ? 'scroll to enter portfolio'
                      : bottomRightText || 'scroll to hack'}
                  </span>
                  <ArrowDown className="w-3.5 h-3.5 animate-bounce text-emerald-400" />
                </div>
              ) : (
                <a
                  href="#about"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
                >
                  <span>explore architecture &amp; projects</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};


