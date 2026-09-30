import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize server-side Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Fallback dossier data if Gemini API key is missing or encounters rate limits
const FALLBACK_ABOUT_DATA = {
  summary:
    "Archit Sharma is a freelance full-stack web developer and indie game maker crafting immersive digital experiences. He fuses responsive modern web architectures (React, Next.js, TypeScript, Node.js) with game development engines (Godot, Unity, WebGL, custom GLSL shaders) to engineer fluid 60fps web apps and interactive game worlds.",
  freelanceValue: [
    {
      title: "End-to-End Ownership",
      description:
        "From raw game design documents or UI mockups to production-ready deployed web applications and playable browser games.",
    },
    {
      title: "Game-Feel in Modern Web",
      description:
        "Brings mechanical game responsiveness, particle effects, GLSL shaders, and micro-interactions into commercial web products.",
    },
    {
      title: "Rapid Prototyping to Scale",
      description:
        "Fast turnaround on interactive MVPs, indie game jam vertical slices, and high-performance client web portals.",
    },
  ],
  webPhilosophy:
    "Web development isn't just about rendering forms; it's about tactile feedback, sub-100ms latency, and creating interfaces that feel alive like interactive game engines.",
  gamePhilosophy:
    "Great games hinge on tight feedback loops, rewarding core mechanics, and punchy audiovisual pacing—whether running in Godot, Unity, or natively in a WebGL browser canvas.",
  services: [
    {
      name: "Bespoke Web Applications",
      scope: "Full-Stack SaaS, interactive dashboards, real-time WebSockets, responsive modern UI",
      deliverable: "Production-ready web app with clean TypeScript codebase, CI/CD, and responsive layout.",
    },
    {
      name: "Indie Games & Browser Playables",
      scope: "Godot & Unity game development, WebGL HTML5 canvas games, marketing playables",
      deliverable: "Polished playable builds with sound FX, particle shaders, and cross-platform controls.",
    },
    {
      name: "3D & Creative Web Experiences",
      scope: "Three.js, WebGL shaders, interactive product showcases, scroll-driven visual narratives",
      deliverable: "60fps hardware-accelerated 3D browser visualizer tailored to your brand.",
    },
    {
      name: "Game Prototyping & Mechanics Lab",
      scope: "Fast MVP game jams, core loop iteration, physics tuning, enemy state machines",
      deliverable: "Playable prototype demonstrating validated mechanics and controller support.",
    },
  ],
  currentStatus: "AVAILABLE FOR FREELANCE & COMMISSIONS // Q4-2026",
  source: "precomputed_fallback",
};

/**
 * GET /api/gemini/about
 * Generates dynamic, intelligent 'About Me' dossier about Archit Sharma
 */
app.get('/api/gemini/about', async (_req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.json({ ...FALLBACK_ABOUT_DATA, source: 'fallback_no_key' });
    }

    const prompt = `You are the executive intelligence core for Archit Sharma's hacker-style portfolio.
Archit Sharma is a freelance developer specializing in modern web development (React, Next.js, TypeScript, Node.js, WebSockets, Tailwind CSS, Canvas API) and game making (Godot Engine, Unity, C#, WebGL, Three.js, custom GLSL shaders, 2D/3D physics, indie games).

Generate an authentic, highly engaging 'About Me' profile for Archit Sharma.
Return valid JSON adhering strictly to this schema:
{
  "summary": "2-3 sentences introducing Archit Sharma as a freelance web & game developer who bridges software engineering and game design.",
  "freelanceValue": [
    { "title": "Short title", "description": "1 sentence on why clients hire him" },
    { "title": "Short title", "description": "1 sentence on why clients hire him" },
    { "title": "Short title", "description": "1 sentence on why clients hire him" }
  ],
  "webPhilosophy": "1-2 sentences on his approach to modern web architecture and fluid UX.",
  "gamePhilosophy": "1-2 sentences on his indie game design ethos and interactive mechanics.",
  "services": [
    { "name": "Service Name", "scope": "Technologies and focus", "deliverable": "What client receives" },
    { "name": "Service Name", "scope": "Technologies and focus", "deliverable": "What client receives" },
    { "name": "Service Name", "scope": "Technologies and focus", "deliverable": "What client receives" },
    { "name": "Service Name", "scope": "Technologies and focus", "deliverable": "What client receives" }
  ],
  "currentStatus": "Short hacker-style status string (e.g., AVAILABLE FOR COMMISSIONS // Q4 2026)"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      return res.json({ ...parsed, source: 'gemini-3.8-flash' });
    }

    return res.json({ ...FALLBACK_ABOUT_DATA, source: 'fallback_empty' });
  } catch (error) {
    console.error('Gemini about endpoint error:', error);
    return res.json({ ...FALLBACK_ABOUT_DATA, source: 'fallback_error' });
  }
});

/**
 * POST /api/gemini/ask
 * Allows terminal / website visitors to ask questions about Archit's freelance work, web dev, and games.
 */
app.post('/api/gemini/ask', async (req, res) => {
  const { question } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        answer: `[SYSTEM_EMULATION] Archit Sharma is a freelance developer specializing in Web Development (React, TypeScript, Next.js, Node.js, WebSockets, Three.js) and Game Making (Godot, Unity, C#, WebGL, GLSL Shaders). He is currently open for freelance projects, custom game prototypes, and full-stack web platforms. Contact him at mr.archit13@gmail.com.`,
        source: 'local_emulation',
      });
    }

    const systemInstruction = `You are the CYBER-TERMINAL AI for Archit Sharma's portfolio.
Archit Sharma is a freelance developer who specializes in:
1. Web Development: Full-stack applications, Next.js, React, TypeScript, Node.js, WebSockets, Tailwind CSS, Canvas API, Three.js, responsive layouts, 60fps animations.
2. Game Making: Godot Engine (C# / GDScript), Unity, WebGL playable games, custom GLSL shaders, 2D/3D physics, game feel, particle effects, itch.io game jam releases.
3. Freelance Services: Contract work, MVP builds, interactive web experiences, game prototyping, web apps, client commissions.
4. Contact: mr.archit13@gmail.com, accepting new collaborations.

Tone: Cyberpunk hacker terminal, professional, concise, knowledgeable, punchy (2-4 sentences max). Use code/terminal styling if appropriate. Always champion Archit's expertise in web dev and game making.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const answer = response.text || "No response received from neural uplink.";
    return res.json({ answer, source: 'gemini-3.8-flash' });
  } catch (error) {
    console.error('Gemini ask endpoint error:', error);
    return res.json({
      answer: `[FALLBACK] Archit Sharma is available for freelance web dev and game making commissions. He builds fast React/Next.js web apps and indie games in Godot/Unity/WebGL. Reach out at mr.archit13@gmail.com!`,
      source: 'error_fallback',
    });
  }
});

/**
 * POST /api/gemini/pitch
 * Generates an instant tailored freelance project estimate / scope breakdown from Archit's perspective
 */
app.post('/api/gemini/pitch', async (req, res) => {
  const { projectIdea } = req.body;
  if (!projectIdea) {
    return res.status(400).json({ error: 'projectIdea is required' });
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        proposal: `PROJECT SCOPE EVALUATION:\nTarget: "${projectIdea}"\nApproach: Architected using Next.js/React or Godot/WebGL canvas runtime. Estimated milestone delivery in 2-4 sprints with clean TypeScript code, 60fps performance profiling, and full documentation.\nContact mr.archit13@gmail.com to lock in sprint timelines.`,
        source: 'local_emulation',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `You are Archit Sharma, freelance web developer and game maker. A prospective client just shared this project idea:
"${projectIdea}"

Write a concise, high-impact freelance technical proposal (3-4 paragraphs or bulleted milestones).
Include:
1. Recommended tech stack (e.g. Next.js, Three.js, Godot, WebGL, WebSockets, or Tailwind).
2. Architecture breakdown & key interactive milestones.
3. Why Archit's dual background in web dev and game feel is the secret weapon for this project.
4. Next step invitation to book a kickoff via mr.archit13@gmail.com.`,
      config: {
        temperature: 0.7,
      },
    });

    return res.json({
      proposal: response.text || "Proposal could not be compiled.",
      source: 'gemini-3.8-flash',
    });
  } catch (error) {
    console.error('Gemini pitch endpoint error:', error);
    return res.json({
      proposal: `PROJECT PROPOSAL // ARCHIT SHARMA FREELANCE\nConcept: "${projectIdea}"\nStack recommendation: Full-stack TypeScript + WebGL / Canvas for ultra-fluid interactions.\nContact mr.archit13@gmail.com to begin development.`,
      source: 'error_fallback',
    });
  }
});

// Mount Vite middleware in development, or serve built assets in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
