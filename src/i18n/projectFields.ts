import type { Project } from '../types'

export type ProjectFields = Pick<
  Project,
  'kind' | 'tagline' | 'summary' | 'role' | 'purpose' | 'solution' | 'architecture' | 'backend' | 'database' | 'highlights'
>

export function pickProjectFields(project: Project): ProjectFields {
  return {
    kind: project.kind,
    tagline: project.tagline,
    summary: project.summary,
    role: project.role,
    purpose: project.purpose,
    solution: project.solution,
    architecture: project.architecture,
    backend: project.backend,
    database: project.database,
    highlights: project.highlights,
  }
}

export function localizeProject(project: Project, fields?: ProjectFields): Project {
  if (!fields) return project
  return { ...project, ...fields }
}
