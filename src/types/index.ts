export type Category = 'backend' | 'ai' | 'erp'

export interface Project {
  id: string
  name: string
  aliases: string[]
  kind: string
  tagline: string
  summary: string
  role: string
  period: string
  categories: Category[]
  purpose: string
  solution: string
  architecture: string[]
  backend?: string[]
  database?: string
  stack: string[]
  highlights: string[]
  github?: string
  live?: string
}

export interface StackGroup {
  id: string
  label: string
  items: string[]
}

export interface TimelineItem {
  id: string
  period: string
  title: string
  subtitle?: string
  detail: string
}

export interface Achievement {
  id: string
  result: string
  title: string
  context: string
  date: string
}

export interface PipelineStage {
  id: string
  label: string
  description: string
  tools: string[]
}

export interface ContactLink {
  id: string
  label: string
  handle: string
  href: string
}

/**
 * A response is plain structured data. The UI renders blocks, so a real LLM
 * (or any backend) only has to return this same shape.
 */
export type Block =
  | { type: 'facts'; label: string; rows: { key: string; value: string }[] }
  | { type: 'chips'; label: string; items: string[] }
  | { type: 'projects'; label: string; items: Project[] }
  | { type: 'project'; project: Project }
  | { type: 'stack'; label: string; groups: StackGroup[] }
  | { type: 'timeline'; label: string; items: TimelineItem[] }
  | { type: 'achievements'; label: string; items: Achievement[] }
  | { type: 'pipeline'; label: string; stages: PipelineStage[] }
  | { type: 'contact'; label: string; status: string; email: string; links: ContactLink[] }

export interface FollowUp {
  label: string
  prompt: string
}

export type IntentName =
  | 'about'
  | 'focus'
  | 'projects'
  | 'project'
  | 'stack'
  | 'ai'
  | 'experience'
  | 'education'
  | 'achievements'
  | 'contact'
  | 'self'
  | 'greeting'
  | 'thanks'
  | 'fallback'

export type Intent =
  | { name: 'projects'; filter: 'all' | Category }
  | { name: 'project'; projectId: string }
  | { name: Exclude<IntentName, 'projects' | 'project'> }

export interface AIResponse {
  intent: IntentName
  source: string
  text: string
  blocks: Block[]
  followUps: FollowUp[]
}

export type Message =
  | { id: string; role: 'user'; text: string }
  | { id: string; role: 'ai'; response: AIResponse; settled: boolean }

export type Phase = 'idle' | 'thinking' | 'responding'

export type PromptHandler = (prompt: string, from?: HTMLElement | null) => void
