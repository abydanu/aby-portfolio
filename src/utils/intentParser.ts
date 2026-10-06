import { projects } from '../data/projects'
import type { Category, Intent, IntentName } from '../types'

export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/'s\b/g, '')
    .replace(/[^a-z0-9+#.\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

type Rule = [RegExp, number]
type Scored = Exclude<IntentName, 'project' | 'projects' | 'greeting' | 'thanks' | 'fallback'> | 'projects'

/** Each rule is a regex over the normalized text plus a weight. Highest total wins. */
const RULES: [Scored, Rule[]][] = [
  [
    'self',
    [
      [/\b(who|what) are you\b/, 7],
      [/\bare you (an? )?(ai|bot|real|human|chatgpt|llm|gpt)\b/, 7],
      [/\bhow (do|does) (you|this|it) work\b/, 7],
      [/\bhow (was|is) (this|it) (built|made)\b/, 7],
      [/\bwho am i talking to\b/, 7],
      [/\b(chatgpt|gpt|openai|llm)\b/, 3],
    ],
  ],
  [
    'about',
    [
      [/\bwho (is|s) (aby|he|this)\b/, 6],
      [/\btell me about (him|aby)\b/, 2],
      [/\babout (aby|him|himself)\b/, 3],
      [/\b(introduce|intro|bio|profile|background|overview)\b/, 3],
      [/\bwho\b/, 1],
    ],
  ],
  [
    'focus',
    [
      [/\bwhat (does|do) (he|aby) (do|build|make|work on|specialize|specialise)\b/, 6],
      [/\b(specialize|specialise|specialization|speciality|specialty)\b/, 5],
      [/\b(focus|focused|focusing|currently|right now|interests?|passionate)\b/, 3],
    ],
  ],
  [
    'projects',
    [
      [/\bprojects?\b/, 5],
      [/\bshow me (his |aby )?work\b/, 4],
      [/\b(portfolio|case stud(y|ies)|demos?|apps?|systems?)\b/, 2],
      [/\b(built|shipped|made|created|developed)\b/, 2],
      [/\b(backend|back end|apis?|rest)\b/, 2],
    ],
  ],
  [
    'ai',
    [
      [/\b(ai|ml)\b/, 4],
      [/\bmachine learning\b/, 5],
      [/\bartificial intelligence\b/, 5],
      [/\b(computer vision|deep learning|neural|yolo|data science|models?)\b/, 3],
    ],
  ],
  [
    'stack',
    [
      [/\b(skills?|skillset|stack|technolog\w+|tech|tools?|toolchain|languages?|frameworks?|libraries|capabilit\w+)\b/, 5],
      [/\bwhat (does|do) (he|aby) (use|know)\b/, 6],
      [/\b(use|uses|using|know|knows|familiar)\b/, 1],
    ],
  ],
  [
    'experience',
    [
      [/\bexperience\b/, 3],
      [/\b(career|employment|jobs?|work history|worked|intern|internship|interned|roles?|resume|cv|telkom|employer|companies|company|professional)\b/, 4],
      [/\bwork(ed|ing)? (at|for|with)\b/, 3],
      [/\btimeline\b/, 3],
    ],
  ],
  [
    'education',
    [[/\b(education|educat\w+|study|studied|studying|university|college|degree|school|unesa|major|student|graduate|graduated|smk)\b/, 5]],
  ],
  [
    'achievements',
    [
      [
        /\b(achievements?|achieved|accomplish\w*|awards?|competitions?|certifications?|certified|certificate|won|win|winner|rank(ed|ing)?|prize|lks|bnsp|placed|medal)\b/,
        5,
      ],
    ],
  ],
  [
    'contact',
    [
      [
        /\b(contact|email|e mail|mail|hire|hiring|reach|linkedin|github|socials?|get in touch|available|availability|collaborat\w+|freelance|connect|talk to|message him|phone|whatsapp)\b/,
        5,
      ],
    ],
  ],
]

function projectFilter(q: string): 'all' | Category {
  const erp = /\b(erp|odoo)\b/.test(q)
  const backend = /\b(backend|back end|apis?|server|rest)\b/.test(q)
  const ai = /\b(ai|ml|machine learning|computer vision|data|vision)\b/.test(q)
  if (erp) return 'erp'
  if (backend && ai) return 'all'
  if (backend) return 'backend'
  if (ai) return 'ai'
  return 'all'
}

function findProject(q: string): string | null {
  const padded = ` ${q} `
  let best: { id: string; len: number } | null = null
  for (const p of projects) {
    for (const alias of p.aliases) {
      if (padded.includes(` ${alias} `) && (!best || alias.length > best.len)) {
        best = { id: p.id, len: alias.length }
      }
    }
  }
  return best?.id ?? null
}

export function parseIntent(input: string): Intent {
  const q = normalize(input)
  if (!q) return { name: 'fallback' }
  const words = q.split(' ').length

  if (words <= 5 && /\b(thanks|thank you|thx|terima kasih)\b/.test(q)) return { name: 'thanks' }
  if (words <= 4 && /^(hi|hello|hey|hola|halo|yo|sup|good (morning|afternoon|evening))\b/.test(q)) {
    return { name: 'greeting' }
  }

  // A named project always wins unless the visitor is clearly asking for the list.
  const projectId = findProject(q)
  if (projectId && !/\b(all|every|list)\b.*\bprojects\b/.test(q)) {
    return { name: 'project', projectId }
  }

  let best: Scored | null = null
  let bestScore = 0
  for (const [name, rules] of RULES) {
    let score = 0
    for (const [re, weight] of rules) if (re.test(q)) score += weight
    if (score > bestScore) {
      bestScore = score
      best = name
    }
  }

  if (!best || bestScore < 2) return { name: 'fallback' }
  if (best === 'projects') return { name: 'projects', filter: projectFilter(q) }
  return { name: best }
}
