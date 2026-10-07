import type { Achievement, TimelineItem } from '../types'

export const experience: TimelineItem[] = [
  {
    id: 'telkom',
    period: 'Sep 2025 – Feb 2026',
    title: 'Full Stack Developer',
    subtitle: 'Telkom Indonesia · Witel Madiun',
    detail: 'Built backend features for sales workflows.',
  },
  {
    id: 'ofcas',
    period: '2025',
    title: 'Programming Instructor',
    subtitle: 'OFCAS IT Community',
    detail: 'Mentors students in programming.',
  },
  {
    id: 'ubd',
    period: 'Sep – Dec 2024',
    title: 'Odoo Developer',
    subtitle: 'PT. Universal Big Data',
    detail: 'Built custom ERP dashboards and extended existing modules.',
  },
]

export const education: TimelineItem[] = [
  {
    id: 'unesa',
    period: 'From 2026',
    title: 'Information Systems',
    subtitle: 'Universitas Negeri Surabaya',
    detail: 'Currently studying, with a focus on backend systems and AI/ML.',
  },
  {
    id: 'smk',
    period: 'From 2023 - 2026',
    title: 'Software Engineering',
    subtitle: 'SMKN 1 Mejayan',
    detail: 'Vocational track where he started building software.',
  },
]

export const achievements: Achievement[] = [
  {
    id: 'lks-regional',
    result: '1st',
    title: 'LKS Artificial Intelligence · Regional',
    context: 'Regional round of the national vocational skills competition.',
    date: 'Feb 2025',
  },
  {
    id: 'lks-jatim',
    result: '7th',
    title: 'LKS Artificial Intelligence · East Java',
    context: 'Provincial round. Worked on data analysis and preprocessing for SIBI sign language recognition.',
    date: 'Apr 2025',
  },
  {
    id: 'bnsp',
    result: 'Certified',
    title: 'BNSP Junior Programmer',
    context: 'National professional competency certification.',
    date: '2026',
  },
  {
    id: 'ambiss',
    result: 'Finalist',
    title: 'Businnes Model Canvas Competition · Teman Ambiss',
    context: 'National business model competition focused on developing and presenting a business idea.',
    date: 'Dec 2025',
  },
]
