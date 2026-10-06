import { pipeline } from '../data/ai'
import { achievements, education, experience } from '../data/experience'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { stackGroups } from '../data/skills'
import type { Locale } from '../i18n'
import { localizeProject } from '../i18n/projectFields'
import type { AIResponse, Block, Category, FollowUp, Intent, Project, TimelineItem } from '../types'

function sourceLabel(locale: Locale, key: string): string {
  return locale.sources[key] ?? key
}

function localizeProjects(list: Project[], locale: Locale): Project[] {
  return list.map((p) => localizeProject(p, locale.projects[p.id]))
}

function selectProjects(filter: 'all' | Category): Project[] {
  if (filter === 'all') return projects
  return projects
    .filter((p) => p.categories.includes(filter))
    .sort((a, b) => Number(b.categories[0] === filter) - Number(a.categories[0] === filter))
}

function localizeTimeline(items: TimelineItem[], map: Locale['experience'] | Locale['education']): TimelineItem[] {
  return items.map((item) => {
    const localized = map[item.id]
    return localized ? { ...item, ...localized } : item
  })
}

function projectFollowUps(p: Project, locale: Locale): FollowUp[] {
  const related = projects.find((o) => o.id !== p.id && o.categories[0] === p.categories[0])
  const out: FollowUp[] = []
  if (related) {
    out.push({ label: locale.prompts.tellMeAbout(related.name), prompt: locale.prompts.tellMeAbout(related.name) })
  }
  out.push({ label: locale.blocks.filterLabels.all, prompt: locale.prompts.showAllProjects })
  out.push({ label: locale.blocks.technologies, prompt: locale.prompts.techStack })
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

export function generateResponse(intent: Intent, locale: Locale): AIResponse {
  const { responses: copy, followUps, blocks, profile: lp } = locale

  switch (intent.name) {
    case 'about':
      return make('about', sourceLabel(locale, 'profile'), copy.about, [
        {
          type: 'facts',
          label: blocks.profile,
          rows: [
            { key: lp.labels.name, value: profile.fullName },
            { key: lp.labels.role, value: lp.role },
            { key: lp.labels.focus, value: lp.focus },
            { key: lp.labels.education, value: lp.education },
            { key: lp.labels.location, value: profile.location },
            { key: lp.labels.status, value: lp.status },
          ],
        },
      ], followUps.about)

    case 'focus':
      return make('focus', sourceLabel(locale, 'focus'), copy.focus, [
        { type: 'chips', label: blocks.currentInterests, items: lp.interests },
      ], followUps.focus)

    case 'projects': {
      const list = localizeProjects(selectProjects(intent.filter), locale)
      return make(
        'projects',
        blocks.filterLabels[intent.filter],
        locale.projectsIntro(intent.filter, list.length),
        [{ type: 'projects', label: blocks.retrieved(list.length, intent.filter), items: list }],
        intent.filter === 'all'
          ? followUps.focus
          : [
              intent.filter === 'ai'
                ? { label: locale.prompts.showBackendProjects, prompt: locale.prompts.showBackendProjects }
                : { label: locale.prompts.showAiProjects, prompt: locale.prompts.showAiProjects },
              { label: locale.prompts.tellMeAbout(list[0].name), prompt: locale.prompts.tellMeAbout(list[0].name) },
              { label: locale.prompts.tellMeAboutSkills, prompt: locale.prompts.tellMeAboutSkills },
            ],
      )
    }

    case 'project': {
      const base = projects.find((x) => x.id === intent.projectId) ?? projects[0]
      const p = localizeProject(base, locale.projects[base.id])
      return make('project', p.name, p.summary, [{ type: 'project', project: p }], projectFollowUps(base, locale))
    }

    case 'stack':
      return make('stack', sourceLabel(locale, 'stack'), copy.stack, [
        {
          type: 'stack',
          label: blocks.technologies,
          groups: stackGroups.map((g) => ({ ...g, label: locale.stackGroups[g.id] ?? g.label })),
        },
      ], followUps.stack)

    case 'ai': {
      const aiProjects = localizeProjects(selectProjects('ai'), locale)
      return make('ai', sourceLabel(locale, 'ai / ml'), copy.ai, [
        {
          type: 'pipeline',
          label: blocks.mlApproach,
          stages: pipeline.map((s) => ({
            ...s,
            label: locale.pipeline[s.id]?.label ?? s.label,
            description: locale.pipeline[s.id]?.description ?? s.description,
          })),
        },
        {
          type: 'achievements',
          label: blocks.competitions,
          items: achievements
            .filter((a) => a.id.startsWith('lks'))
            .map((a) => ({ ...a, ...locale.achievements[a.id] })),
        },
        { type: 'projects', label: blocks.appliedWork, items: aiProjects },
      ], followUps.ai)
    }

    case 'experience':
      return make('experience', sourceLabel(locale, 'experience'), copy.experience, [
        { type: 'timeline', label: blocks.experience, items: localizeTimeline(experience, locale.experience) },
      ], followUps.experience)

    case 'education':
      return make('education', sourceLabel(locale, 'education'), copy.education, [
        { type: 'timeline', label: blocks.education, items: localizeTimeline(education, locale.education) },
      ], followUps.education)

    case 'achievements':
      return make('achievements', sourceLabel(locale, 'achievements'), copy.achievements, [
        {
          type: 'achievements',
          label: blocks.achievements,
          items: achievements.map((a) => ({ ...a, ...locale.achievements[a.id] })),
        },
      ], followUps.achievements)

    case 'contact':
      return make('contact', sourceLabel(locale, 'contact'), copy.contact, [
        {
          type: 'contact',
          label: blocks.getInTouch,
          status: lp.status,
          email: profile.email,
          links: [
            { id: 'github', label: 'GitHub', handle: profile.githubHandle, href: profile.github },
            { id: 'linkedin', label: 'LinkedIn', handle: profile.linkedinHandle, href: profile.linkedin },
          ],
        },
      ], followUps.contact)

    case 'self':
      return make('self', sourceLabel(locale, 'about this site'), copy.self, [], followUps.self)
    case 'greeting':
      return make('greeting', sourceLabel(locale, 'greeting'), copy.greeting, [], followUps.greeting)
    case 'thanks':
      return make('thanks', sourceLabel(locale, 'greeting'), copy.thanks, [], followUps.greeting)
    default:
      return make('fallback', sourceLabel(locale, 'nothing'), copy.fallback, [], followUps.fallback)
  }
}
