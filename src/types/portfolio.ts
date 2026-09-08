export type AppId = 
  | 'about' 
  | 'projects' 
  | 'skills' 
  | 'contact' 
  | 'terminal' 
  | 'music' 
  | 'settings' 
  | 'guide';

export type CameraViewMode = 'room' | 'screen';

export interface WindowState {
  id: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Fullstack' | '3D / WebGL' | 'Mobile' | 'AI / Tools';
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: { name: string; level: number; experience: string }[];
}

export type OSTheme = 'classic' | 'cyberpunk' | 'amber' | 'vaporwave';
