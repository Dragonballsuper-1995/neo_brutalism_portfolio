export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string;
  github?: string;
  image: string;
  category: 'Frontend' | 'Backend' | 'Fullstack' | 'Mobile' | 'AI/ML' | 'Data Science' | 'Web Dev';
}

export interface Skill {
  name: string;
  icon: string; // We'll use lucide icon names or just text for simplicity in this raw theme
  level: number; // 1-100
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
  sources?: { title: string; uri: string }[];
}

export enum NavSection {
  HERO = 'hero',
  ABOUT = 'about',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  CONTACT = 'contact'
}