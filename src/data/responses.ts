import type { FollowUp } from '../types'

/** All conversational copy lives here, separate from the logic that picks it. */

export const suggestedPrompts: string[] = [
  'Tell me about Aby',
  'Show me his projects',
  'What does he do?',
  'What is his AI experience?',
  'Show me his tech stack',
  'How can I contact him?',
]

export const copy = {
  about:
    'Aby Danu is an Information Systems student and software developer focused on backend engineering, and increasingly on AI and machine learning. He is based in Surabaya, Indonesia, and has shipped production APIs for real teams.',
  focus:
    'Aby primarily works with backend systems and is currently expanding into AI/ML. Day to day that means REST APIs, databases, access control and real-time services, alongside data analysis and applied computer-vision projects.',
  stack:
    "Here is what Aby works with, grouped by area. Backend is where he is most experienced. The AI/ML tooling is newer and growing.",
  ai: 'Aby is exploring machine learning through data analysis, preprocessing, feature selection, and applied projects. He placed 1st at the regional and 7th at the East Java provincial LKS AI competitions, and built Aeon RailGuard, a YOLOv8 detection system with a real-time Go backend. It is an area he is actively building toward, not yet a specialty.',
  experience:
    'Aby has worked in industry since 2024, mostly on backend and ERP systems, and teaches programming on the side.',
  education:
    'Aby is studying Information Systems at Universitas Negeri Surabaya, after a software engineering vocational track at SMKN 1 Mejayan.',
  achievements:
    'Aby has placed in AI competitions and holds a Junior Programmer certification.',
  contact:
    'Aby is open to opportunities, backend and AI work especially. Email is the quickest way to reach him.',
  self: "I'm a small assistant that lives inside Aby's portfolio. There is no language model behind me yet. I match what you ask against structured data about his work and answer from that, so I stay accurate about what I know and tell you when I don't.",
  greeting: "Hello. Ask me about Aby's projects, background, stack, or how to reach him.",
  thanks: 'Anytime. Want to look at something else?',
  fallback:
    "I don't have an answer for that. I only know about Aby's work and background. Here are some things I can help with.",
}

export const followUps: Record<string, FollowUp[]> = {
  about: [
    { label: 'Education', prompt: 'Where did Aby study?' },
    { label: 'Experience', prompt: "Show me Aby's experience" },
    { label: 'Achievements', prompt: 'What has Aby achieved?' },
    { label: 'Current focus', prompt: 'What is Aby focused on right now?' },
  ],
  focus: [
    { label: 'Show backend projects', prompt: "Show me Aby's backend projects" },
    { label: 'Show AI projects', prompt: "Show me Aby's AI projects" },
    { label: 'Tell me about his skills', prompt: 'What technologies does Aby use?' },
  ],
  stack: [
    { label: 'Show backend projects', prompt: "Show me Aby's backend projects" },
    { label: 'What is his AI experience?', prompt: 'What is his AI experience?' },
    { label: 'Experience', prompt: "Show me Aby's experience" },
  ],
  ai: [
    { label: 'Tell me about Aeon RailGuard', prompt: 'Tell me more about Aeon RailGuard' },
    { label: 'Show backend projects', prompt: "Show me Aby's backend projects" },
    { label: 'Achievements', prompt: 'What has Aby achieved?' },
  ],
  experience: [
    { label: 'Show projects', prompt: "Show me Aby's projects" },
    { label: 'Education', prompt: 'Where did Aby study?' },
    { label: 'Achievements', prompt: 'What has Aby achieved?' },
  ],
  education: [
    { label: 'Experience', prompt: "Show me Aby's experience" },
    { label: 'Achievements', prompt: 'What has Aby achieved?' },
    { label: 'Current focus', prompt: 'What is Aby focused on right now?' },
  ],
  achievements: [
    { label: 'What is his AI experience?', prompt: 'What is his AI experience?' },
    { label: 'Show projects', prompt: "Show me Aby's projects" },
    { label: 'Experience', prompt: "Show me Aby's experience" },
  ],
  contact: [
    { label: 'Show projects', prompt: "Show me Aby's projects" },
    { label: 'Tell me about Aby', prompt: 'Tell me about Aby' },
  ],
  self: [
    { label: 'Tell me about Aby', prompt: 'Tell me about Aby' },
    { label: 'Show projects', prompt: "Show me Aby's projects" },
  ],
  greeting: [
    { label: 'Tell me about Aby', prompt: 'Tell me about Aby' },
    { label: 'Show projects', prompt: "Show me Aby's projects" },
    { label: 'Contact', prompt: 'How can I contact him?' },
  ],
  fallback: [
    { label: 'Show projects', prompt: "Show me Aby's projects" },
    { label: 'Tell me about Aby', prompt: 'Tell me about Aby' },
    { label: 'Tech stack', prompt: 'What technologies does Aby use?' },
    { label: 'Contact', prompt: 'How can I contact him?' },
  ],
}
