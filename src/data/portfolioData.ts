import { Project, SkillCategory, ExperienceLog, TerminalCommand } from '../types';

export const PORTFOLIO_INFO = {
  codename: "INDIE_FORGE_V4",
  callsign: "ARCHIT_SHARMA",
  role: "FREELANCE DEVELOPER // WEB DEV & GAME MAKING",
  subRole: "CREATIVE FULL-STACK WEB // GODOT & UNITY // THREE.JS & GLSL SHADERS",
  status: "AVAILABLE FOR FREELANCE COMMISSIONS & CONTRACTS",
  location: "GLOBAL REMOTE [UTC-8 to UTC+5:30]",
  securityClearance: "LEVEL_4 // CREATIVE_OPERATOR",
  pgpKey: "4A9F 82B1 C04D 9EE7 1F3A 5560 9021 BBA8 4F2D 0101",
  stats: {
    framerate: "60 FPS TARGET",
    stack: "React, Next.js, Godot, WebGL",
    experience: "5+ Years Indie & Client",
    turnaround: "Rapid MVPs & Polish",
    satisfaction: "100% Shipped Quality"
  },
  bio: "Freelance full-stack developer and passionate indie game maker. I build reactive, high-performance web applications and captivating 2D/3D games. Fusing modern web technologies (React, Next.js, TypeScript, Node.js) with game development engines (Godot, Unity, WebGL, custom GLSL shaders), I help clients and indie studios turn ambitious interactive concepts into polished digital reality.",
  socials: [
    { name: "GITHUB", url: "https://github.com", binary: "01000111 01001000" },
    { name: "ITCH_IO", url: "https://itch.io", binary: "01001001 01010100" },
    { name: "LINKEDIN", url: "https://linkedin.com", binary: "01001100 01001001" },
    { name: "EMAIL_COMMS", url: "mailto:mr.archit13@gmail.com", binary: "01001101 01000001" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "cyber-drift",
    title: "CyberDrift WebGL",
    codename: "PROJECT_CYBERDRIFT",
    category: "WebGL / 3D",
    binaryTag: "01000011 01000100",
    hexTag: "0x4344",
    description: "Fast-paced synthwave arcade racing game running natively in the browser with custom GLSL neon shaders, procedural track curves, and responsive drift mechanics.",
    architecture: "Three.js Scene Graph -> GLSL Post-Processing Pipeline -> Cannon-es Physics -> WebAudio Procedural Synth",
    metrics: [
      { label: "Framerate", value: "60 FPS Solid" },
      { label: "Rendering", value: "WebGL 2.0" },
      { label: "Asset Size", value: "< 14MB Total" }
    ],
    techStack: ["Three.js", "WebGL", "GLSL Shaders", "TypeScript", "Cannon-es", "WebAudio API"],
    features: [
      "Custom retro CRT curvature, bloom, and chromatic aberration GLSL shaders",
      "Procedural Catmull-Rom spline raceway generation with dynamic neon embankments",
      "Arcade drift physics engine with calculated slip angles and particle sparks",
      "Instant zero-install browser playability across mobile and desktop viewports"
    ],
    liveUrl: "https://itch.io",
    githubUrl: "https://github.com",
    status: "ONLINE"
  },
  {
    id: "hyper-canvas",
    title: "HyperCanvas Studio",
    codename: "PROJECT_HYPERCANVAS",
    category: "Web Dev",
    binaryTag: "01001000 01000011",
    hexTag: "0x4843",
    description: "Real-time collaborative game sprite and level design canvas built for indie game teams. Features sub-15ms WebSocket delta sync, infinite panning, and direct Godot/Unity export.",
    architecture: "React UI Shell -> HTML5 Canvas 2D Engine -> WebSocket Delta Broker -> Node.js Multi-room Gateway",
    metrics: [
      { label: "Sync Latency", value: "< 15ms" },
      { label: "Canvas View", value: "Infinite Pan/Zoom" },
      { label: "Collab Limit", value: "64 Users/Room" }
    ],
    techStack: ["React", "TypeScript", "HTML5 Canvas", "Node.js", "WebSockets", "Tailwind CSS"],
    features: [
      "Pixel-art and vector dual drawing tools with layered alpha blending",
      "Real-time peer cursors, live chat, and multi-user synchronized undo/redo",
      "Direct export pipelines for Godot tilemaps, Unity sprite sheets, and JSON schemas",
      "Offline-first IndexedDB local cache with automatic conflict-free delta sync"
    ],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    status: "ACTIVE"
  },
  {
    id: "chrono-realm",
    title: "ChronoRealm (Godot RPG)",
    codename: "PROJECT_CHRONOREALM",
    category: "Game Dev",
    binaryTag: "01000011 01010010",
    hexTag: "0x4352",
    description: "Top-down retro action-RPG crafted in Godot Engine with C#. Features hierarchical state-machine combat, procedural dungeon room graph synthesis, and dynamic pixel lighting.",
    architecture: "Godot 4.x Engine -> C# Core Logic -> Hierarchical State Machine (HSM) -> Procedural BSP Dungeon Synthesizer",
    metrics: [
      { label: "Playtime", value: "4+ Hours Demo" },
      { label: "Platform", value: "PC / Steam / Web" },
      { label: "Physics Tick", value: "60 FPS Fixed" }
    ],
    techStack: ["Godot Engine", "C#", "GDScript", "Aseprite", "GLSL 2D", "FMOD Studio"],
    features: [
      "Tight parry-and-dash combat system with frame-perfect input buffering",
      "Binary space partitioning (BSP) dungeon generator with organic room layout",
      "Dynamic 2D normal-mapped pixel lighting and custom ambient dust particle systems",
      "Modular boss AI state machines with adaptive multi-phase attack patterns"
    ],
    liveUrl: "https://itch.io",
    githubUrl: "https://github.com",
    status: "DEPLOYED"
  },
  {
    id: "nexus-deck",
    title: "NexusDeck Client Platform",
    codename: "PROJECT_NEXUSDECK",
    category: "Full-Stack",
    binaryTag: "01001110 01000100",
    hexTag: "0x4E44",
    description: "Commissioned freelance enterprise web dashboard for live telemetry and data streaming. Features micro-frontends, server-sent events, and interactive SVG charts.",
    architecture: "Next.js 15 App Router -> Server-Sent Events (SSE) -> Redis Pub/Sub -> Tailwind CSS & Framer Motion",
    metrics: [
      { label: "Dashboard p95", value: "< 85ms" },
      { label: "Client Rating", value: "5.0 / 5.0" },
      { label: "Lighthouse", value: "99 / 100" }
    ],
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    features: [
      "Streaming server components for instant time-to-first-byte under heavy traffic",
      "Custom interactive sparkline graphs and analytics feeds rendered with pure SVG math",
      "Granular role-based authentication and client workspace permissions",
      "Dark terminal-inspired UI with fluid animations and responsive mobile adaptivity"
    ],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    status: "ONLINE"
  },
  {
    id: "pixel-forge",
    title: "PixelForge 2D Web Engine",
    codename: "PROJECT_PIXELFORGE",
    category: "Game Dev",
    binaryTag: "01010000 01000110",
    hexTag: "0x5046",
    description: "Lightweight modular 2D browser game engine written from scratch in TypeScript. Features custom AABB collision spatial partitioning, sprite batching, and virtual gamepad.",
    architecture: "WebGL Batch Renderer -> Quadtree Spatial Partitioning -> Entity Component System (ECS) -> Input Manager",
    metrics: [
      { label: "Sprites at 60fps", value: "10,000+ Units" },
      { label: "Engine Size", value: "< 42KB Gzip" },
      { label: "Memory Overhead", value: "< 16MB" }
    ],
    techStack: ["TypeScript", "WebGL", "ECS Pattern", "WebAudio API", "Vite"],
    features: [
      "Hardware-accelerated sprite quad batching minimizing draw calls to 1-2 per frame",
      "Spatial quadtree hashing for instant O(log N) bounding-box collision detection",
      "Touch screen virtual analog joystick and gamepad controller API compatibility",
      "Integrated 8-bit sound generator with custom square and noise oscillators"
    ],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    status: "ACTIVE"
  },
  {
    id: "voxel-verse",
    title: "VoxelVerse 3D Explorer",
    codename: "PROJECT_VOXELVERSE",
    category: "WebGL / 3D",
    binaryTag: "01010110 01010110",
    hexTag: "0x5656",
    description: "Browser-based voxel sandbox game featuring procedural 3D simplex noise terrain, Web Workers chunk meshing, and multiplayer peer synchronization.",
    architecture: "Three.js -> Web Workers Greedy Mesher -> Simplex Noise Generator -> WebSocket Multiplayer Room",
    metrics: [
      { label: "View Distance", value: "16 Chunks" },
      { label: "Meshing Time", value: "< 4ms / chunk" },
      { label: "Platform", value: "100% Browser" }
    ],
    techStack: ["Three.js", "TypeScript", "Web Workers", "WebSockets", "GLSL Shaders"],
    features: [
      "Greedy meshing algorithm reducing terrain polygon count by up to 85%",
      "Multi-threaded voxel generation offloaded to background Web Workers",
      "Atmospheric day/night cycle with dynamic sun azimuth and volumetric fog shader",
      "Real-time block placement, mining, and multiplayer position broadcast"
    ],
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
    status: "ONLINE"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "GAME MAKING & ENGINES",
    binaryOpcode: "01000111 01000001",
    items: [
      { name: "Godot Engine (C# / GDScript)", level: 94, binary: "01000111 01101111 01100100 01101111", badge: "Primary Engine", description: "2D & 3D game architecture, custom nodes, animation trees, physics tuning, and desktop/web exports" },
      { name: "Unity & C#", level: 90, binary: "01010101 01101110 01101001 01110100", badge: "3D & Systems", description: "Component-based architecture, physics, NavMesh AI, UI Toolkit, particle systems, and shader graphs" },
      { name: "WebGL & Three.js", level: 95, binary: "01010111 01100111 01101100", badge: "Browser 3D", description: "Interactive 3D browser games, camera controls, post-processing pipelines, model optimization" },
      { name: "GLSL Shaders & VFX", level: 88, binary: "01010011 01101000 01100001 01100100", badge: "Visual FX", description: "Custom vertex & fragment shaders, CRT retro filters, water distortion, bloom, lighting calculation" }
    ]
  },
  {
    category: "FULL-STACK WEB DEV",
    binaryOpcode: "01010111 01000101",
    items: [
      { name: "React & Next.js", level: 96, binary: "01010010 01100101 01100001 01111001", badge: "Modern Web", description: "Server components, reactive state machines, micro-interactions, dynamic routing, and fast load times" },
      { name: "TypeScript", level: 97, binary: "01010100 01111001 01110000 01100101", badge: "Strict Type", description: "Robust type architectures, custom generics, schema validations, and clean modular codebases" },
      { name: "Node.js & Express", level: 92, binary: "01001110 01101111 01100100 01100101", badge: "Backend API", description: "REST & GraphQL APIs, game server backends, auth pipelines, real-time message routers" },
      { name: "Tailwind CSS & Motion", level: 95, binary: "01010100 01110111 01000011 01110011", badge: "60fps Polish", description: "Cyberpunk and terminal aesthetics, physics-based springs, responsive layouts, sleek design systems" }
    ]
  },
  {
    category: "INTERACTIVE & CREATIVE TECH",
    binaryOpcode: "01001001 01001110",
    items: [
      { name: "HTML5 Canvas & Pixi.js", level: 93, binary: "01000011 01100001 01101110 01110110", badge: "2D Graphics", description: "Custom sprite renderers, interactive telemetry charts, particle emitters, retro game loops" },
      { name: "Real-Time WebSockets", level: 92, binary: "01010111 01010011 01101111 01100011", badge: "Multiplayer", description: "Binary WebSocket transport, low-latency room syncing, delta compression, multiplayer lobbies" },
      { name: "Game Audio (WebAudio / FMOD)", level: 86, binary: "01000001 01110101 01100100 01101001", badge: "Sound FX", description: "Spatial audio positioning, chiptune synthesis, dynamic music stems, sound effect integration" },
      { name: "Aseprite & Pixel Art", level: 85, binary: "01010000 01101001 01111000 01100101", badge: "Art & Sprites", description: "Character animation cycles, isometric tiles, texture atlas packing, retro UI assets" }
    ]
  },
  {
    category: "FREELANCE WORKFLOW & PRODUCTION",
    binaryOpcode: "01010000 01010010",
    items: [
      { name: "Rapid MVP Prototyping", level: 96, binary: "01010000 01110010 01101111 01110100", badge: "Fast Turnaround", description: "Turning vague concepts into validated interactive playable slices and web prototypes within days" },
      { name: "Client Scoping & Transparency", level: 94, binary: "01000011 01101100 01101001 01100101", badge: "Communication", description: "Clear milestone roadmaps, async video updates, transparent scope management, and accurate estimates" },
      { name: "Cross-Platform Deployment", level: 91, binary: "01000100 01100101 01110000 01101100", badge: "CI/CD & Cloud", description: "Vercel, Docker, GitHub Actions, itch.io Butler, Steamworks build automation pipelines" },
      { name: "Performance Profiling", level: 93, binary: "01010000 01100101 01110010 01100110", badge: "Optimization", description: "Chrome DevTools profiling, draw call reduction, garbage collection pause mitigation, 60fps locking" }
    ]
  }
];

export const EXPERIENCE_LOGS: ExperienceLog[] = [
  {
    id: "log-01",
    timestamp: "2023 - PRESENT",
    gitCommit: "commit 9b4e72a [HEAD -> freelance]",
    binaryHash: "01000110 01010010 01000101 01000101",
    role: "Freelance Web & Game Developer",
    company: "Independent Studio & Client Commissions",
    status: "ACTIVE_FREELANCER",
    description: [
      "Engineered commissioned full-stack web applications and interactive 3D browser games for global startups and indie studios.",
      "Delivered custom Godot and WebGL prototypes, reducing client concept-validation time from months to single 2-week sprints.",
      "Achieved 100% 5-star client ratings across web platform builds, custom interactive dashboards, and playable browser marketing games."
    ],
    technologies: ["React", "Next.js", "TypeScript", "Godot Engine", "Three.js", "WebGL", "Tailwind CSS"]
  },
  {
    id: "log-02",
    timestamp: "2021 - 2023",
    gitCommit: "commit d2a819c [v3.1.0-release]",
    binaryHash: "01010011 01010100 01010101 01000100",
    role: "Senior Creative Web & Interactive Developer",
    company: "PixelCraft Interactive",
    status: "SUCCESS_EXIT",
    description: [
      "Architected high-throughput web experiences and interactive canvas visualizations serving over 2M monthly visitors.",
      "Created reusable WebGL particle and shader components that boosted user engagement and session duration by 44%.",
      "Collaborated closely with designers and product leads to ship 14 bespoke client web applications on schedule and budget."
    ],
    technologies: ["TypeScript", "React", "HTML5 Canvas", "Three.js", "Node.js", "WebSockets"]
  },
  {
    id: "log-03",
    timestamp: "2019 - 2021",
    gitCommit: "commit f4190c1 [v1.0.0-jam]",
    binaryHash: "01001001 01001110 01000100 01001001",
    role: "Indie Game Creator & Game Jam Lead",
    company: "Solo & Collaborative Game Jams",
    status: "SHIPPED_TITLES",
    description: [
      "Developed and published 8+ playable indie games on itch.io and web portals, garnering top 5% placement in Global Game Jam.",
      "Pioneered procedural generation algorithms and custom 2D shader lighting in Godot and Unity under tight 48-hour constraints.",
      "Cultivated deep mechanical empathy for player game feel, responsive controls, frame rates, and game loop architecture."
    ],
    technologies: ["Godot Engine", "Unity", "C#", "GDScript", "Aseprite", "GLSL Shaders"]
  }
];

export const TERMINAL_COMMANDS: TerminalCommand[] = [
  { command: "help", description: "Lists all available commands in this terminal" },
  { command: "bio", description: "Dumps Archit's freelance developer bio & profile" },
  { command: "gemini <question>", description: "Asks Gemini AI about Archit's web dev, game making, or freelance availability" },
  { command: "pitch <idea>", description: "Asks Gemini to generate a freelance technical proposal for your project idea" },
  { command: "services", description: "Displays freelance web dev & game making service packages" },
  { command: "skills", description: "Lists game engines, web stack, and creative tech capabilities" },
  { command: "projects", description: "Prints index of active web apps & playable games" },
  { command: "games", description: "Dumps game development projects, engines, and mechanics" },
  { command: "freelance", description: "Displays freelance availability, working hours, and sprint structure" },
  { command: "contact", description: "Displays direct email and communication channels" },
  { command: "clear", description: "Flushes the terminal screen buffer" }
];
