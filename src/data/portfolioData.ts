import type { ProjectItem, SkillCategory } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Andrew Garfield',
  role: 'Full Stack & 3D Creative Developer',
  tagline: 'Crafting immersive digital experiences, high-performance web applications, and interactive 3D spaces.',
  bio: 'Halo! Saya adalah Andrew Garfield, seorang software engineer dan creative web developer yang antusias membangun aplikasi web modern, visual 3D interaktif berbasis WebGL/Three.js, serta arsitektur backend yang tangguh. Terbiasa memadukan estetika desain tingkat tinggi dengan performa kode yang optimal.',
  location: 'Los Angeles, CA, USA',
  email: 'andrew.garfield.dev@gmail.com',
  github: 'https://github.com/andrewgarfield',
  linkedin: 'https://linkedin.com/in/andrewgarfield',
  status: 'Open for Freelance & Full-time Opportunities',
  experienceYears: '4+ Years Coding & Crafting',
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'retro-3d-portfolio',
    title: '3D Interactive Retro Room Portfolio',
    tagline: 'Interactive 3D Workstation inspired by retro computing',
    description: 'Portofolio interaktif 3D yang menampilkan ruang kerja retro dengan komputer tabung CRT fungsional. Dilengkapi virtual OS, draggable windows, synthesizer Web Audio, dan pergerakan kamera sinematik.',
    category: '3D / WebGL',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    tags: ['React Three Fiber', 'Three.js', 'TypeScript', 'WebGL', 'Vite'],
    liveUrl: '#',
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    id: 'ai-knowledge-hub',
    title: 'NexusAI - Multi-Agent Knowledge Engine',
    tagline: 'Next-gen enterprise search & RAG assistant',
    description: 'Platform AI analitik dokumen berbasis semantic vector search dan LLM reasoning. Mampu memproses ribuan dokumen teknis secara real-time dengan akurasi sitasi tinggi.',
    category: 'AI / Tools',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tags: ['Next.js', 'Python', 'FastAPI', 'Pinecone', 'LangChain'],
    liveUrl: '#',
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    id: 'umk-marketplace',
    title: 'KaryaLokal - Digital Marketplace UMK',
    tagline: 'E-commerce platform memberdayakan produk lokal',
    description: 'Sistem marketplace modern untuk produk kreatif UMKM lokal dengan payment gateway terintegrasi, kalkulasi ongkos kirim real-time, dan analitik penjualan interaktif.',
    category: 'Fullstack',
    image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80',
    tags: ['React', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'Midtrans'],
    liveUrl: '#',
    githubUrl: 'https://github.com',
    featured: true
  },
  {
    id: 'fintech-crypto-dashboard',
    title: 'VoltPulse - Real-time Trading Terminal',
    tagline: 'High-frequency telemetry & asset tracking',
    description: 'Dashboard finansial dengan grafik candlestick interaktif, orderbook streaming sub-second via WebSocket, serta sistem alert prediktif.',
    category: 'Fullstack',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=800&q=80',
    tags: ['Vue 3', 'TypeScript', 'Chart.js', 'Golang', 'WebSockets'],
    liveUrl: '#',
    githubUrl: 'https://github.com'
  },
  {
    id: 'mobile-health-tracker',
    title: 'VitalSync - Mobile Habit & Health App',
    tagline: 'Cross-platform wellness tracker with gamification',
    description: 'Aplikasi mobile untuk pelacakan nutrisi, target hidrasi, dan rutinitas olahraga dengan sync cloud otomatis dan widget kustom.',
    category: 'Mobile',
    image: 'https://images.unsplash.com/photo-1510519138197-06b8628cbf4f?auto=format&fit=crop&w=800&q=80',
    tags: ['React Native', 'Expo', 'Supabase', 'Tailwind'],
    liveUrl: '#',
    githubUrl: 'https://github.com'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Frontend & 3D Experience',
    icon: 'Monitor',
    skills: [
      { name: 'React / Next.js', level: 95, experience: '3+ tahun' },
      { name: 'TypeScript / JavaScript', level: 92, experience: '3+ tahun' },
      { name: 'Three.js / React Three Fiber', level: 85, experience: '2 tahun' },
      { name: 'HTML5 Canvas & Shaders (GLSL)', level: 75, experience: '1.5 tahun' },
      { name: 'Tailwind CSS & Modern CSS', level: 95, experience: '3+ tahun' },
    ]
  },
  {
    category: 'Backend & Systems',
    icon: 'Server',
    skills: [
      { name: 'Node.js / Express / NestJS', level: 90, experience: '3 tahun' },
      { name: 'Python / FastAPI', level: 85, experience: '2 tahun' },
      { name: 'PostgreSQL / MySQL', level: 88, experience: '3 tahun' },
      { name: 'Redis Cache & Message Queue', level: 80, experience: '2 tahun' },
      { name: 'REST & GraphQL APIs', level: 92, experience: '3 tahun' },
    ]
  },
  {
    category: 'Creative, DevOps & Tools',
    icon: 'Cpu',
    skills: [
      { name: 'Blender 3D (Modeling & Baking)', level: 78, experience: '2 tahun' },
      { name: 'Git / GitHub CI/CD', level: 94, experience: '3+ tahun' },
      { name: 'Docker Containerization', level: 84, experience: '2 tahun' },
      { name: 'Linux Terminal & Shell Scripting', level: 88, experience: '3 tahun' },
      { name: 'Figma UI/UX Prototyping', level: 86, experience: '2.5 tahun' },
    ]
  }
];
