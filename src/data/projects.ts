import type { Project } from '../types'

/**
 * Add `github` / `live` to any project and the link buttons appear automatically
 * in the project analysis.
 */
export const projects: Project[] = [
  {
    id: 'aeon-railguard',
    name: 'Aeon RailGuard',
    aliases: ['aeon', 'railguard', 'rail guard', 'railway', 'rail'],
    kind: 'Smart railway safety system',
    tagline: 'Applied AI · YOLOv8 · Go',
    summary:
      'Aeon RailGuard watches railway crossings in real time with an object-detection model, then sends automatic alerts when something illegal or dangerous shows up.',
    role: 'AI & Backend Developer',
    period: '2025',
    categories: ['ai', 'backend'],
    purpose:
      'Illegal crossings are hard to watch around the clock, and hazards often get noticed too late.',
    solution:
      'A low-latency object-detection engine that monitors crossings in real time, plus a backend that pushes notifications and triggers automated emergency responses.',
    architecture: [
      'Camera feed',
      'YOLOv8 + OpenCV detection',
      'Go (Fiber) API',
      'WebSocket events',
      'Dashboard & alerts',
    ],
    backend: [
      'Go/Fiber API with role-based access control',
      'Real-time notifications over WebSocket',
      'Automated emergency-response triggers',
    ],
    stack: ['Python', 'YOLOv8', 'OpenCV', 'Go', 'Fiber', 'WebSocket'],
    highlights: [
      'Real-time detection of illegal crossings',
      'Detection engine and backend wired up end to end',
    ],
  },
  {
    id: 'madpro',
    name: 'Madpro',
    aliases: ['madpro'],
    kind: 'Madiun B2B project dashboard',
    tagline: 'Backend API · Hono · TypeScript',
    summary:
      "Madpro is a B2B project dashboard API for Telkom's Madiun team. Employees can pull project data themselves instead of pinging data owners, and everything stays in sync with Google Spreadsheets.",
    role: 'Backend Developer',
    period: 'Jan – Feb 2026',
    categories: ['backend'],
    purpose:
      'Telkom employees had to ask data owners for B2B project info — lots of repeat requests, slow answers.',
    solution:
      'A REST API so employees can access B2B project data on their own, with two-way Google Spreadsheet sync and role-based access control. Shipped to production independently.',
    architecture: ['Client apps', 'Hono.js REST API', 'Prisma ORM', 'Supabase (PostgreSQL)', 'Google Sheets sync'],
    backend: [
      'REST API for B2B project data',
      'Two-way sync with Google Spreadsheets',
      'Role-based access control',
      'Shipped to production without handoff',
    ],
    database: 'PostgreSQL on Supabase, via Prisma ORM.',
    stack: ['Hono.js', 'TypeScript', 'Prisma', 'Supabase'],
    highlights: [
      'No more depending on data owners just to look up a project',
      'Shipped to production without a handoff',
    ],
  },
  {
    id: 'intrack',
    name: 'InTrack',
    aliases: ['intrack', 'in track', 'indibiz order', 'order tracking'],
    kind: 'Indibiz order tracking system',
    tagline: 'Backend API · Hono · TypeScript',
    summary:
      'InTrack is a backend for tracking Indibiz orders in real time, so sales can follow up faster and report more accurately.',
    role: 'Backend Developer',
    period: 'Oct – Nov 2025',
    categories: ['backend'],
    purpose: 'Sales needed faster follow-ups and cleaner project reporting on Indibiz orders.',
    solution: 'A backend API for real-time order tracking that keeps order status current for follow-up and reporting.',
    architecture: ['Sales clients', 'Hono.js API', 'Prisma ORM', 'Supabase (PostgreSQL)'],
    backend: ['REST API for order tracking', 'Order status kept current for sales follow-up and reporting'],
    database: 'PostgreSQL on Supabase, via Prisma ORM.',
    stack: ['Hono.js', 'TypeScript', 'Prisma', 'Supabase'],
    highlights: ['Real-time order status', 'Faster follow-ups', 'Cleaner project reporting'],
  },
  {
    id: 'telegram-bots',
    name: 'Indibiz Telegram Bots',
    aliases: ['telegram', 'bot', 'bots', 'telegraf'],
    kind: 'Customer info & input automation',
    tagline: 'Automation · Hono · Telegraf',
    summary:
      'Two Telegram bots on top of a Hono.js service. They answer customer questions and collect data automatically — without exposing internal systems.',
    role: 'Backend Developer',
    period: 'Sep – Nov 2025',
    categories: ['backend'],
    purpose: 'Customer questions and data collection still needed manual work and access to internal systems.',
    solution:
      'Two Telegram bots wired to a Hono.js backend that automate customer inquiries and make data collection simpler.',
    architecture: ['Telegram users', 'Telegraf bots', 'Hono.js backend'],
    backend: ['Hono.js service behind both bots', 'Inquiry automation', 'Customer data intake'],
    stack: ['Hono.js', 'TypeScript', 'Telegraf'],
    highlights: ['Automated customer inquiries', 'Simpler data collection', 'No internal system access for customers'],
  },
  {
    id: 'sibi',
    name: 'SIBI Sign Language Recognition',
    aliases: ['sibi', 'sign language'],
    kind: 'LKS East Java 2025 · Artificial Intelligence',
    tagline: 'Applied AI · Data prep · Python',
    summary:
      "SIBI Sign Language Recognition was Aby's project at the East Java provincial LKS AI competition. He handled the data side — EDA and preprocessing — so the team's model had solid training data. The team finished 7th.",
    role: 'Data Analyst (EDA & preprocessing)',
    period: 'Apr 2025',
    categories: ['ai'],
    purpose: 'A recognition model is only as good as its training data, and the raw dataset needed work.',
    solution:
      'Exploratory data analysis and preprocessing to clean up the dataset and get reliable training data ready for the team.',
    architecture: ['Raw dataset', 'Exploratory analysis', 'Preprocessing', 'Training-ready data', "Team's model"],
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    highlights: ['Better dataset quality through EDA', 'Reliable training data for the team', '7th place at the East Java provincial round'],
  },
  {
    id: 'odoo-pesantren',
    name: 'Odoo Pesantren',
    aliases: ['odoo pesantren', 'pesantren', 'odoo', 'erp'],
    kind: 'Custom ERP dashboard',
    tagline: 'ERP · Odoo · Python',
    summary:
      'Odoo Pesantren is a set of custom ERP dashboards that pull finance, student affairs, and attendance into one place — plus improvements to existing Odoo modules.',
    role: 'Odoo Developer',
    period: 'Sep 2024 – Jan 2025',
    categories: ['erp', 'backend'],
    purpose: 'Finance, student affairs, and attendance lived in separate modules.',
    solution:
      'Interactive ERP dashboards that bring those three areas together, plus enhancements to modules that already existed.',
    architecture: ['Odoo modules', 'Python models', 'XML views', 'JS dashboards', 'PostgreSQL'],
    backend: ['Custom Odoo modules and models', 'Enhancements to existing modules'],
    database: 'PostgreSQL (Odoo).',
    stack: ['Python', 'JavaScript', 'XML', 'CSS', 'PostgreSQL'],
    highlights: ['One dashboard for finance, student affairs, and attendance', 'Existing modules extended step by step'],
  },
]
