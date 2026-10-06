import { pipeline } from '../data/ai'
import { achievements, education, experience } from '../data/experience'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { copy, followUps } from '../data/responses'
import { stackGroups } from '../data/skills'
import type { AIResponse, Block, Category, FollowUp, Intent, Project } from '../types'

const filterLabel: Record<'all' | Category, string> = {
  all: 'projects',
  backend: 'backend projects',
  ai: 'AI / ML projects',
  erp: 'ERP projects',
}

function selectProjects(filter: 'all' | Category): Project[] {
  if (filter === 'all') return projects
  // Projects where the category is primary come first.
  return projects
    .filter((p) => p.categories.includes(filter))
    .sort((a, b) => Number(b.categories[0] === filter) - Number(a.categories[0] === filter))
}

function projectsIntro(filter: 'all' | Category, n: number): string {
  const count = `${n} ${n === 1 ? 'project' : 'projects'}`
  switch (filter) {
    case 'backend':
      return `I found ${count} relevant to backend engineering. The first three are production systems built for real teams.`
    case 'ai':
      return `I found ${count} in AI and machine learning. Aby's role differs across them, from data preparation to detection and the backend around it.`
    case 'erp':
      return `I found ${count} in ERP work.`
    default:
      return `I found ${count} in Aby's portfolio: production backends for real teams, plus applied AI work.`
  }
}

function projectFollowUps(p: Project): FollowUp[] {
  const related = projects.find((o) => o.id !== p.id && o.categories[0] === p.categories[0])
  const out: FollowUp[] = []
  if (related) out.push({ label: `Tell me about ${related.name}`, prompt: `Tell me more about ${related.name}` })
  out.push({ label: 'Show all projects', prompt: "Show me all of Aby's projects" })
  out.push({ label: 'Tech stack', prompt: 'What technologies does Aby use?' })
  return out
}

function make(
  intent: AIResponse['intent'],
  source: string,
  text: string,
  blocks: Block[],
  follow: FollowUp[],
): AIResponse {
  return { intent, source, text, blocks, followUps: follow }
}

export function generateResponse(intent: Intent): AIResponse {
  switch (intent.name) {
    case 'about':
      return make('about', 'profile', copy.about, [
        {
          type: 'facts',
          label: 'Profile',
          rows: [
            { key: 'Name', value: profile.fullName },
            { key: 'Role', value: profile.role },
            { key: 'Focus', value: profile.focus },
            { key: 'Education', value: 'Information Systems · UNESA' },
            { key: 'Location', value: profile.location },
            { key: 'Status', value: profile.status },
          ],
        },
      ], followUps.about)

    case 'focus':
      return make('focus', 'focus', copy.focus, [
        { type: 'chips', label: 'Current interests', items: profile.interests },
      ], followUps.focus)

    case 'projects': {
      const list = selectProjects(intent.filter)
      return make('projects', filterLabel[intent.filter], projectsIntro(intent.filter, list.length), [
        { type: 'projects', label: `${list.length} ${filterLabel[intent.filter]} retrieved`, items: list },
      ], intent.filter === 'all'
        ? followUps.focus
        : [
            intent.filter === 'ai'
              ? { label: 'Show backend projects', prompt: "Show me Aby's backend projects" }
              : { label: 'Show AI projects', prompt: "Show me Aby's AI projects" },
            { label: `Tell me about ${list[0].name}`, prompt: `Tell me more about ${list[0].name}` },
            { label: 'Tell me about his skills', prompt: 'What technologies does Aby use?' },
          ])
    }

    case 'project': {
      const p = projects.find((x) => x.id === intent.projectId) ?? projects[0]
      return make('project', p.name, p.summary, [{ type: 'project', project: p }], projectFollowUps(p))
    }

    case 'stack':
      return make('stack', 'stack', copy.stack, [
        { type: 'stack', label: 'Technologies', groups: stackGroups },
      ], followUps.stack)

    case 'ai': {
      const aiProjects = selectProjects('ai')
      return make('ai', 'ai / ml', copy.ai, [
        { type: 'pipeline', label: 'How he approaches an ML problem', stages: pipeline },
        { type: 'achievements', label: 'Competitions', items: achievements.filter((a) => a.id.startsWith('lks')) },
        { type: 'projects', label: 'Applied work', items: aiProjects },
      ], followUps.ai)
    }

    case 'experience':
      return make('experience', 'experience', copy.experience, [
        { type: 'timeline', label: 'Experience', items: experience },
      ], followUps.experience)

    case 'education':
      return make('education', 'education', copy.education, [
        { type: 'timeline', label: 'Education', items: education },
      ], followUps.education)

    case 'achievements':
      return make('achievements', 'achievements', copy.achievements, [
        { type: 'achievements', label: 'Achievements', items: achievements },
      ], followUps.achievements)

    case 'contact':
      return make('contact', 'contact', copy.contact, [
        {
          type: 'contact',
          label: 'Get in touch',
          status: profile.status,
          email: profile.email,
          links: [
            { id: 'github', label: 'GitHub', handle: profile.githubHandle, href: profile.github },
            { id: 'linkedin', label: 'LinkedIn', handle: profile.linkedinHandle, href: profile.linkedin },
          ],
        },
      ], followUps.contact)

    case 'self':
      return make('self', 'about this site', copy.self, [], followUps.self)
    case 'greeting':
      return make('greeting', 'greeting', copy.greeting, [], followUps.greeting)
    case 'thanks':
      return make('thanks', 'greeting', copy.thanks, [], followUps.greeting)
    default:
      return make('fallback', 'nothing', copy.fallback, [], followUps.fallback)
  }
}
