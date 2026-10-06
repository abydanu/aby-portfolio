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
      'Aeon RailGuard is a smart railway safety system. It watches crossings in real time with an object-detection model and notifies people automatically when something illegal or dangerous happens.',
    role: 'AI & Backend Developer',
    period: '2025',
    categories: ['ai', 'backend'],
    purpose:
      'Illegal railway crossings are hard to monitor continuously, and hazards are often noticed too late.',
    solution:
      'A low-latency object-detection engine that monitors crossings in real time, paired with a backend that pushes notifications and triggers automated emergency responses.',
    architecture: [
      'Camera feed',
      'YOLOv8 + OpenCV detection',
      'Go (Fiber) API',
      'WebSocket events',
      'Dashboard & alerts',
    ],
    backend: [
      'Scalable Go/Fiber API with role-based access control',
      'Real-time notifications over WebSocket',
      'Automated emergency-response triggers',
    ],
    stack: ['Python', 'YOLOv8', 'OpenCV', 'Go', 'Fiber', 'WebSocket'],
    highlights: [
      'Real-time detection of illegal crossings',
      'Detection engine and backend integrated end to end',
    ],
  },
  {
    id: 'madpro',
    name: 'Madpro',
    aliases: ['madpro'],
    kind: 'Madiun B2B project dashboard',
    tagline: 'Backend API · Hono · TypeScript',
    summary:
      "Madpro is a B2B project dashboard API for Telkom's Madiun team. It lets employees get project data themselves instead of asking data owners, and keeps everything in sync with Google Spreadsheets.",
    role: 'Backend Developer',
    period: 'Jan – Feb 2026',
    categories: ['backend'],
    purpose:
      'Telkom employees depended on data owners for B2B project information, which meant repetitive requests and slow answers.',
    solution:
      'A RESTful API that gives employees independent access to B2B project data, with two-way Google Spreadsheet sync and role-based access control. Deployed to production independently.',
    architecture: ['Client apps', 'Hono.js REST API', 'Prisma ORM', 'Supabase (PostgreSQL)', 'Google Sheets sync'],
    backend: [
      'REST API for B2B project data',
      'Bidirectional synchronization with Google Spreadsheets',
      'Role-based access control',
      'Independent production deployment',
    ],
    database: 'PostgreSQL on Supabase, accessed through Prisma ORM.',
    stack: ['Hono.js', 'TypeScript', 'Prisma', 'Supabase'],
    highlights: [
      'Removed the dependency on data owners for project lookups',
      'Shipped to production without handoff',
    ],
  },
  {
    id: 'intrack',
    name: 'InTrack',
    aliases: ['intrack', 'in track', 'indibiz order', 'order tracking'],
    kind: 'Indibiz order tracking system',
    tagline: 'Backend API · Hono · TypeScript',
    summary:
      'InTrack is a backend for tracking Indibiz orders in real time, so sales teams can follow up faster and report on projects more accurately.',
    role: 'Backend Developer',
    period: 'Oct – Nov 2025',
    categories: ['backend'],
    purpose: 'Sales teams needed faster follow-ups and more accurate project reporting on Indibiz orders.',
    solution: 'A backend API for real-time order tracking that keeps order status current for follow-up and reporting.',
    architecture: ['Sales clients', 'Hono.js API', 'Prisma ORM', 'Supabase (PostgreSQL)'],
    backend: ['REST API for order tracking', 'Order status kept current for sales follow-up and reporting'],
    database: 'PostgreSQL on Supabase, accessed through Prisma ORM.',
    stack: ['Hono.js', 'TypeScript', 'Prisma', 'Supabase'],
    highlights: ['Real-time order status', 'Faster follow-ups', 'More accurate project reporting'],
  },
  {
    id: 'telegram-bots',
    name: 'Indibiz Telegram Bots',
    aliases: ['telegram', 'bot', 'bots', 'telegraf'],
    kind: 'Customer info & input automation',
    tagline: 'Automation · Hono · Telegraf',
    summary:
      'Two Telegram bots backed by a Hono.js service. They answer customer inquiries and collect customer data automatically, without exposing internal systems.',
    role: 'Backend Developer',
    period: 'Sep – Nov 2025',
    categories: ['backend'],
    purpose: 'Customer inquiries and data collection required manual work and access to internal systems.',
    solution:
      'Two Telegram bots integrated with a Hono.js backend that automate customer inquiries and simplify data collection.',
    architecture: ['Telegram users', 'Telegraf bots', 'Hono.js backend'],
    backend: ['Hono.js service behind both bots', 'Inquiry automation', 'Customer data intake'],
    stack: ['Hono.js', 'TypeScript', 'Telegraf'],
    highlights: ['Automated customer inquiries', 'Simpler data collection', 'No internal system access needed by customers'],
  },
  {
    id: 'sibi',
    name: 'SIBI Sign Language Recognition',
    aliases: ['sibi', 'sign language'],
    kind: 'LKS East Java 2025 · Artificial Intelligence',
    tagline: 'Applied AI · Data preparation · Python',
    summary:
      "SIBI Sign Language Recognition was Aby's entry in the East Java provincial LKS AI competition. His part was the data side: exploratory analysis and preprocessing so the team's model trained on reliable data. The team finished 7th.",
    role: 'Data Analyst (EDA & preprocessing)',
    period: 'Apr 2025',
    categories: ['ai'],
    purpose: 'A recognition model is only as good as its training data, and the raw dataset needed work.',
    solution:
      'Exploratory data analysis and preprocessing to improve dataset quality and prepare reliable training data for the team.',
    architecture: ['Raw dataset', 'Exploratory analysis', 'Preprocessing', 'Training-ready data', "Team's model"],
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    highlights: ['Improved dataset quality through EDA', 'Prepared reliable training data', '7th place at the East Java provincial round'],
  },
  {
    id: 'odoo-pesantren',
    name: 'Odoo Pesantren',
    aliases: ['odoo pesantren', 'pesantren', 'odoo', 'erp'],
    kind: 'Custom ERP dashboard',
    tagline: 'ERP · Odoo · Python',
    summary:
      'Odoo Pesantren is a set of custom ERP dashboards that bring finance, student affairs and attendance information into one place, plus improvements to existing Odoo modules.',
    role: 'Odoo Developer',
    period: 'Sep 2024 – Jan 2025',
    categories: ['erp', 'backend'],
    purpose: 'Finance, student affairs, and attendance information lived in separate modules.',
    solution:
      'Interactive ERP dashboards that centralize information across the three areas, plus enhancements to existing modules.',
    architecture: ['Odoo modules', 'Python models', 'XML views', 'JS dashboards', 'PostgreSQL'],
    backend: ['Custom Odoo modules and models', 'Enhancements to existing modules'],
    database: 'PostgreSQL (Odoo).',
    stack: ['Python', 'JavaScript', 'XML', 'CSS', 'PostgreSQL'],
    highlights: ['One dashboard across finance, student affairs and attendance', 'Extended existing modules iteratively'],
  },
]
