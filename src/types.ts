export interface Project {
  id: string;
  title: string;
  codename: string;
  category: 'Web Dev' | 'Game Dev' | 'Full-Stack' | 'WebGL / 3D' | 'Systems';
  binaryTag: string; // e.g., "01001110 01010110"
  hexTag: string;
  description: string;
  architecture: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'ONLINE' | 'ACTIVE' | 'DEPLOYED' | 'MAINTAINED';
}

export interface GeminiAboutData {
  summary: string;
  freelanceValue: Array<{ title: string; description: string }>;
  webPhilosophy: string;
  gamePhilosophy: string;
  services: Array<{ name: string; scope: string; deliverable: string }>;
  currentStatus: string;
  source?: string;
}

export interface SkillCategory {
  category: string;
  binaryOpcode: string;
  items: {
    name: string;
    level: number; // 0 - 100
    binary: string;
    description: string;
    badge: string;
  }[];
}

export interface ExperienceLog {
  id: string;
  timestamp: string;
  gitCommit: string;
  binaryHash: string;
  role: string;
  company: string;
  status: string;
  description: string[];
  technologies: string[];
}

export interface TerminalCommand {
  command: string;
  description: string;
}

export interface TerminalHistoryItem {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  text: string;
  binaryEcho?: string;
}
