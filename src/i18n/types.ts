import type { Category, FollowUp } from '../types'
import type { ProjectFields } from './projectFields'

export type Language = 'en' | 'id'

export interface Locale {
  ui: {
    landing: { hi: string; role: string; tagline: string }
    topbar: { thinking: string; online: string; new: string; newSession: string }
    input: { placeholder: string; placeholderFollowUp: string; askLabel: string; sendLabel: string }
    keyboard: { send: string; newline: string; focus: string }
    thinking: { steps: string[]; ariaLabel: string }
    responseCard: { copied: string; copy: string; email: string }
    message: { retrieved: string; followUp: string }
  }
  sources: Record<string, string>
  projects: Record<string, ProjectFields>
  suggestedPrompts: string[]
  responses: {
    about: string
    focus: string
    stack: string
    ai: string
    experience: string
    education: string
    achievements: string
    contact: string
    self: string
    greeting: string
    thanks: string
    fallback: string
  }
  followUps: Record<string, FollowUp[]>
  blocks: {
    profile: string
    currentInterests: string
    technologies: string
    experience: string
    education: string
    achievements: string
    competitions: string
    appliedWork: string
    getInTouch: string
    mlApproach: string
    projectAnalysis: string
    purpose: string
    whatHeBuilt: string
    architecture: string
    backendResponsibilities: string
    database: string
    keyPoints: string
    links: string
    sourceCode: string
    liveDemo: string
    filterLabels: Record<'all' | Category, string>
    retrieved: (count: number, filter: 'all' | Category) => string
  }
  profile: {
    role: string
    tagline: string
    focus: string
    status: string
    education: string
    interests: string[]
    labels: {
      name: string
      role: string
      focus: string
      education: string
      location: string
      status: string
    }
  }
  experience: Record<string, { title: string; subtitle?: string; detail: string }>
  education: Record<string, { title: string; subtitle?: string; detail: string }>
  achievements: Record<string, { title: string; context: string }>
  stackGroups: Record<string, string>
  pipeline: Record<string, { label: string; description: string }>
  projectsIntro: (filter: 'all' | Category, count: number) => string
  prompts: {
    tellMeAbout: (name: string) => string
    showAllProjects: string
    techStack: string
    showBackendProjects: string
    showAiProjects: string
    tellMeAboutSkills: string
  }
}
