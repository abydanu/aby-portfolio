import type { StackGroup } from '../types'

export const stackGroups: StackGroup[] = [
  { id: 'languages', label: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Go', 'PHP'] },
  { id: 'backend', label: 'Backend', items: ['Node.js', 'Hono', 'Express', 'Fiber', 'Laravel', 'Odoo', 'REST', 'WebSocket'] },
  { id: 'database', label: 'Database', items: ['PostgreSQL', 'MySQL', 'SQLite', 'Prisma', 'Supabase'] },
  { id: 'ai', label: 'AI / ML', items: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'OpenCV', 'YOLOv8'] },
  { id: 'frontend', label: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'] },
  { id: 'tooling', label: 'Tooling', items: ['Docker', 'Linux', 'Git', 'Trello'] },
]
