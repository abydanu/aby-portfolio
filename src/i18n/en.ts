import { projects } from '../data/projects'
import { pickProjectFields } from './projectFields'
import type { Locale } from './types'

const filterLabels = {
  all: 'projects',
  backend: 'backend projects',
  ai: 'AI / ML projects',
  erp: 'ERP projects',
} as const

export const en: Locale = {
  ui: {
    landing: {
      hi: "Hi, I'm",
      role: 'AI & Backend Engineer',
      tagline: 'I build backend systems, build AI apps, and keep learning',
    },
    topbar: {
      thinking: 'thinking',
      online: 'online',
      new: 'New',
      newSession: 'Start over',
    },
    input: {
      placeholder: 'Ask me anything about Aby…',
      placeholderFollowUp: 'Ask a follow-up…',
      askLabel: 'Ask something about Aby',
      sendLabel: 'Send',
    },
    keyboard: {
      send: '↵ send',
      newline: '⇧ ↵ new line',
      focus: '/ focus',
    },
    thinking: {
      steps: ['Reading your question', 'Pulling the right info', 'Putting a reply together'],
      ariaLabel: 'Thinking…',
    },
    responseCard: {
      copied: 'Copied',
      copy: 'Copy',
      email: 'Email',
    },
    message: {
      retrieved: 'from',
      followUp: 'Want to dig deeper?',
    },
  },
  sources: {
    profile: 'profile',
    focus: 'focus',
    stack: 'stack',
    'ai / ml': 'ai / ml',
    experience: 'experience',
    education: 'education',
    achievements: 'achievements',
    contact: 'contact',
    'about this site': 'this site',
    greeting: 'hello',
    nothing: 'hmm',
  },
  projects: Object.fromEntries(projects.map((p) => [p.id, pickProjectFields(p)])),
  suggestedPrompts: [
    'Who is Aby?',
    'Show me his projects',
    'What does he work on?',
    'Tell me about his AI experience',
    "What's his tech stack?",
    'How can I contact him?',
  ],
  responses: {
    about:
      "Aby Danu is an Information Systems student and developer based in Surabaya. He mostly builds backend systems, and he's been diving deeper into AI and machine learning. He's already shipped production APIs for real teams.",
    focus:
      "Aby mainly works on backend systems and he's currently exploring AI/ML. Day to day that's REST APIs, databases, access control, and real-time services — plus some data work and computer-vision projects.",
    stack:
      "Here's what Aby usually works with. Backend is his strongest area. The AI/ML tools are newer, but he's actively building with them.",
    ai: "Aby has been learning ML through data analysis, preprocessing, feature selection, and hands-on projects. He placed 1st regionally and 7th at the East Java provincial LKS AI competition, and he built Aeon RailGuard — a YOLOv8 detection system with a real-time Go backend. It's something he's growing into, not claiming as a specialty yet.",
    experience:
      "Aby has been working in industry since 2024, mostly on backend and ERP systems. He also teaches programming on the side.",
    education:
      "Aby is studying Information Systems at Universitas Negeri Surabaya. Before that he did software engineering at SMKN 1 Mejayan.",
    achievements:
      "Aby has placed in AI competitions and holds a Junior Programmer certification.",
    contact:
      "Aby is open to opportunities — especially backend and AI work. Email is the fastest way to reach him.",
    self: "I'm a small assistant inside Aby's portfolio. No LLM behind me yet — I just match your question to structured data about his work and answer from that. Accurate where I can be, honest when I can't.",
    greeting: "Hey. Ask me about Aby's projects, background, stack, or how to reach him.",
    thanks: 'Anytime. Want to check something else?',
    fallback:
      "Not sure about that one. I only know Aby's work and background. Here are a few things I can help with.",
  },
  followUps: {
    about: [
      { label: 'Where did he study?', prompt: 'Where did Aby study?' },
      { label: 'Work experience', prompt: "Show me Aby's experience" },
      { label: 'Achievements', prompt: 'What has Aby achieved?' },
      { label: 'What is he focused on?', prompt: 'What is Aby focused on right now?' },
    ],
    focus: [
      { label: 'Backend projects', prompt: "Show me Aby's backend projects" },
      { label: 'AI projects', prompt: "Show me Aby's AI projects" },
      { label: "What's his stack?", prompt: "What's his tech stack?" },
    ],
    stack: [
      { label: 'Backend projects', prompt: "Show me Aby's backend projects" },
      { label: 'AI experience', prompt: 'Tell me about his AI experience' },
      { label: 'Work experience', prompt: "Show me Aby's experience" },
    ],
    ai: [
      { label: 'Tell me about Aeon RailGuard', prompt: 'Tell me more about Aeon RailGuard' },
      { label: 'Backend projects', prompt: "Show me Aby's backend projects" },
      { label: 'Achievements', prompt: 'What has Aby achieved?' },
    ],
    experience: [
      { label: 'Show projects', prompt: "Show me Aby's projects" },
      { label: 'Education', prompt: 'Where did Aby study?' },
      { label: 'Achievements', prompt: 'What has Aby achieved?' },
    ],
    education: [
      { label: 'Work experience', prompt: "Show me Aby's experience" },
      { label: 'Achievements', prompt: 'What has Aby achieved?' },
      { label: 'Current focus', prompt: 'What is Aby focused on right now?' },
    ],
    achievements: [
      { label: 'AI experience', prompt: 'Tell me about his AI experience' },
      { label: 'Show projects', prompt: "Show me Aby's projects" },
      { label: 'Work experience', prompt: "Show me Aby's experience" },
    ],
    contact: [
      { label: 'Show projects', prompt: "Show me Aby's projects" },
      { label: 'Who is Aby?', prompt: 'Who is Aby?' },
    ],
    self: [
      { label: 'Who is Aby?', prompt: 'Who is Aby?' },
      { label: 'Show projects', prompt: "Show me Aby's projects" },
    ],
    greeting: [
      { label: 'Who is Aby?', prompt: 'Who is Aby?' },
      { label: 'Show projects', prompt: "Show me Aby's projects" },
      { label: 'Contact', prompt: 'How can I contact him?' },
    ],
    fallback: [
      { label: 'Show projects', prompt: "Show me Aby's projects" },
      { label: 'Who is Aby?', prompt: 'Who is Aby?' },
      { label: 'Tech stack', prompt: "What's his tech stack?" },
      { label: 'Contact', prompt: 'How can I contact him?' },
    ],
  },
  blocks: {
    profile: 'Profile',
    currentInterests: 'Into right now',
    technologies: 'Tech stack',
    experience: 'Experience',
    education: 'Education',
    achievements: 'Achievements',
    competitions: 'Competitions',
    appliedWork: 'Projects',
    getInTouch: 'Get in touch',
    mlApproach: 'How he approaches an ML problem',
    projectAnalysis: 'Project detail',
    purpose: 'The problem',
    whatHeBuilt: 'What he built',
    architecture: 'Architecture',
    backendResponsibilities: 'Backend work',
    database: 'Database',
    keyPoints: 'Highlights',
    links: 'Links',
    sourceCode: 'Source',
    liveDemo: 'Live demo',
    filterLabels,
    retrieved: (count, filter) => `${count} ${filterLabels[filter]}`,
  },
  profile: {
    role: 'AI & Backend Engineer',
    tagline: 'I build backend systems, build AI apps, and keep learning.',
    focus: 'Backend · AI/ML',
    status: 'Open to opportunities',
    education: 'Information Systems · UNESA',
    interests: [
      'Backend architecture',
      'AI',
      'Machine learning',
      'Computer vision',
      'Data processing',
      'Developer tools',
    ],
    labels: {
      name: 'Name',
      role: 'Role',
      focus: 'Focus',
      education: 'Education',
      location: 'Location',
      status: 'Status',
    },
  },
  experience: {
    ofcas: {
      title: 'Programming Instructor',
      subtitle: 'OFCAS IT Community',
      detail: 'Helps students learn to code.',
    },
    telkom: {
      title: 'Full Stack Developer',
      subtitle: 'Telkom Indonesia · Witel Madiun',
      detail: 'Built backend features for sales workflows.',
    },
    ubd: {
      title: 'Odoo Developer',
      subtitle: 'PT. Universal Big Data',
      detail: 'Built custom ERP dashboards and extended existing modules.',
    },
  },
  education: {
    unesa: {
      title: 'B.Sc. Information Systems',
      subtitle: 'Universitas Negeri Surabaya',
      detail: 'Currently studying — mostly backend and AI/ML.',
    },
    smk: {
      title: 'Software Engineering',
      subtitle: 'SMKN 1 Mejayan',
      detail: 'Where he started building software.',
    },
  },
  achievements: {
    'lks-regional': {
      title: 'LKS Artificial Intelligence · Regional',
      context: 'Regional round of the national vocational skills competition.',
    },
    'lks-jatim': {
      title: 'LKS Artificial Intelligence · East Java',
      context: 'Provincial round. Did data analysis and preprocessing for SIBI sign language recognition.',
    },
    bnsp: {
      title: 'BNSP Junior Programmer',
      context: 'National professional competency certification.',
    },
  },
  stackGroups: {
    languages: 'Languages',
    backend: 'Backend',
    database: 'Database',
    ai: 'AI / ML',
    frontend: 'Frontend',
    tooling: 'Tooling',
  },
  pipeline: {
    data: { label: 'Data', description: 'Get familiar with the raw dataset.' },
    exploration: { label: 'Exploration', description: 'Spot gaps, imbalance, and noise.' },
    preprocessing: { label: 'Preprocessing', description: 'Clean it up into training-ready input.' },
    features: { label: 'Feature selection', description: 'Keep the signals that actually matter.' },
    model: { label: 'Model', description: 'Work with the team on recognition and detection models.' },
    inference: { label: 'Inference', description: 'Serve detections in real time through a Go backend.' },
  },
  projectsIntro: (filter, n) => {
    const count = `${n} ${n === 1 ? 'project' : 'projects'}`
    switch (filter) {
      case 'backend':
        return `Here are ${count} on the backend side. The first few are production systems built for real teams.`
      case 'ai':
        return `Here are ${count} in AI/ML. Aby's role shifts across them — from data prep to detection to the backend around it.`
      case 'erp':
        return `Here ${n === 1 ? 'is' : 'are'} ${count} from his ERP work.`
      default:
        return `Here are ${count} from Aby's portfolio — production backends for real teams, plus some applied AI work.`
    }
  },
  prompts: {
    tellMeAbout: (name) => `Tell me more about ${name}`,
    showAllProjects: "Show me all of Aby's projects",
    techStack: "What's his tech stack?",
    showBackendProjects: "Show me Aby's backend projects",
    showAiProjects: "Show me Aby's AI projects",
    tellMeAboutSkills: "What's his tech stack?",
  },
}
