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
      [/\b(kamu|anda) (siapa|apa)\b/, 7],
      [/\b(bagaimana|gimana) (kamu|ini|sistem ini) (bekerja|kerja|dibuat)\b/, 7],
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
      [/\b(ceritakan|ceritain|jelaskan) (soal |tentang )?(aby|dia|dirinya)\b/, 6],
      [/\b(tentang|soal|profil|biodata) (aby|dia|dirinya)\b/, 5],
      [/\bsiapa (aby|dia|dirinya)\b/, 6],
      [/\b(aby|dia|dirinya) (itu )?siapa\b/, 6],
    ],
  ],
  [
    'focus',
    [
      [/\bwhat (does|do) (he|aby) (do|build|make|work on|specialize|specialise)\b/, 6],
      [/\b(specialize|specialise|specialization|speciality|specialty)\b/, 5],
      [/\b(focus|focused|focusing|currently|right now|interests?|passionate)\b/, 3],
      [/\b(apa (yang )?(dia|aby) (kerjakan|ngerjain|kerjain|lakukan|buat|fokus|spesialis))\b/, 6],
      [/\b(aby|dia) (biasanya )?(ngerjain|kerjain|kerjakan)\b/, 6],
      [/\b(fokus|minat|keahlian utama|spesialisasi)\b/, 4],
    ],
  ],
  [
    'projects',
    [
      [/\bprojects?\b/, 5],
      [/\bproject\w*\b/, 5],
      [/\bshow me (his |aby )?work\b/, 4],
      [/\b(portfolio|case stud(y|ies)|demos?|apps?|systems?)\b/, 2],
      [/\b(built|shipped|made|created|developed)\b/, 2],
      [/\b(backend|back end|apis?|rest)\b/, 2],
      [/\b(proyek\w*|portofolio|karya|hasil kerja)\b/, 5],
      [/\b(tampilkan|lihat|tunjukkan) (project\w*|proyek|karya|portofolio|pekerjaan)\b/, 6],
    ],
  ],
  [
    'ai',
    [
      [/\b(ai|ml)\b/, 4],
      [/\bmachine learning\b/, 5],
      [/\bartificial intelligence\b/, 5],
      [/\b(computer vision|deep learning|neural|yolo|data science|models?)\b/, 3],
      [/\b(pengalaman ai|kecerdasan buatan|pembelajaran mesin)\b/, 5],
      [/\bai[- ]?nya\b/, 4],
    ],
  ],
  [
    'stack',
    [
      [/\b(skills?|skillset|stack|technolog\w+|tech|tools?|toolchain|languages?|frameworks?|libraries|capabilit\w+)\b/, 5],
      [/\bwhat (does|do) (he|aby) (use|know)\b/, 6],
      [/\b(use|uses|using|know|knows|familiar)\b/, 1],
      [/\b(keahlian|kemampuan|teknologi|tech stack|stack teknologi|stack[- ]?nya)\b/, 5],
      [/\b(teknologi apa (yang )?(dia|aby) (gunakan|pakai|kuasai))\b/, 6],
    ],
  ],
  [
    'experience',
    [
      [/\bexperience\b/, 3],
      [/\b(career|employment|jobs?|work history|worked|intern|internship|interned|roles?|resume|cv|telkom|employer|companies|company|professional)\b/, 4],
      [/\bwork(ed|ing)? (at|for|with)\b/, 3],
      [/\btimeline\b/, 3],
      [/\b(pengalaman(?! ai)|pekerjaan|karir|riwayat kerja|magang|profesional)\b/, 5],
      [/\b(tampilkan|lihat) (pengalaman|pekerjaan)\b/, 6],
    ],
  ],
  [
    'education',
    [
      [/\b(education|educat\w+|study|studied|studying|university|college|degree|school|unesa|major|student|graduate|graduated|smk)\b/, 5],
      [/\b(pendidikan|kuliah|studi|universitas|sekolah|jurusan|mahasiswa|lulus)\b/, 5],
      [/\b(di mana (aby|dia) (kuliah|belajar|sekolah))\b/, 6],
    ],
  ],
  [
    'achievements',
    [
      [
        /\b(achievements?|achieved|accomplish\w*|awards?|competitions?|certifications?|certified|certificate|won|win|winner|rank(ed|ing)?|prize|lks|bnsp|placed|medal)\b/,
        5,
      ],
      [/\b(prestasi|pencapaian|penghargaan|kompetisi|sertifikasi|juara|peringkat)\b/, 5],
    ],
  ],
  [
    'contact',
    [
      [
        /\b(contact|email|e mail|mail|hire|hiring|reach|linkedin|github|socials?|get in touch|available|availability|collaborat\w+|freelance|connect|talk to|message him|phone|whatsapp)\b/,
        5,
      ],
      [/\b(kontak|hubungi|email|emailnya|rekrut|kerjasama|kolaborasi|whatsapp|telepon|sosial media)\b/, 5],
      [/\b(bagaimana|gimana) (cara )?(hubungi|menghubungi|kontak)\b/, 6],
      [/\bkontak (aby|dia)\b/, 6],
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

  if (words <= 5 && /\b(thanks|thank you|thx|terima kasih|makasih)\b/.test(q)) return { name: 'thanks' }
  if (
    words <= 4 &&
    /^(hi|hello|hey|hola|halo|hai|yo|sup|selamat (pagi|siang|sore|malam)|good (morning|afternoon|evening))\b/.test(q)
  ) {
    return { name: 'greeting' }
  }

  // A named project always wins unless the visitor is clearly asking for the list.
  const projectId = findProject(q)
  if (projectId && !/\b(all|every|list|semua|daftar)\b.*\b(projects|proyek)\b/.test(q)) {
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
