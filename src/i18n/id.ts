import type { Locale } from './types'

const filterLabels = {
  all: 'project',
  backend: 'project backend',
  ai: 'project AI / ML',
  erp: 'project ERP',
} as const

export const id: Locale = {
  ui: {
    landing: {
      hi: 'Halo, aku',
      role: 'AI & Backend Engineer',
      tagline: 'Membangun backend yang scalable dan terus belajar tentang AI/ML.',
    },
    topbar: {
      thinking: 'lagi mikir',
      online: 'online',
      new: 'Baru',
      newSession: 'Mulai baru',
    },
    input: {
      placeholder: 'Tanya apa aja soal Aby…',
      placeholderFollowUp: 'Mau bahas yang lain…',
      askLabel: 'Tanya soal Aby',
      sendLabel: 'Kirim',
    },
    keyboard: {
      send: '↵ kirim',
      newline: '⇧ ↵ baris baru',
      focus: '/ fokus',
    },
    thinking: {
      steps: ['Baca dulu pertanyaannya', 'Cari info yang relevan', 'Susun jawabannya'],
      ariaLabel: 'Lagi mikir…',
    },
    responseCard: {
      copied: 'Copied',
      copy: 'Copy',
      email: 'Email',
    },
    message: {
      retrieved: 'dari',
      followUp: 'Lanjut ke yang lain?',
    },
  },
  sources: {
    profile: 'profil',
    focus: 'fokus',
    stack: 'stack',
    'ai / ml': 'ai / ml',
    experience: 'pengalaman',
    education: 'pendidikan',
    achievements: 'prestasi',
    contact: 'kontak',
    'about this site': 'situs ini',
    greeting: 'halo',
    nothing: 'hmm',
  },
  projects: {
    'aeon-railguard': {
      kind: 'Sistem deteksi keamanan perlintasan kereta',
      tagline: 'Computer Vision · YOLOv8 · Go',
      summary:
        'Aeon RailGuard memantau area perlintasan secara real-time dengan object detection, lalu mengirim notifikasi saat sistem menemukan kondisi yang berisiko.',
      role: 'AI & Backend Developer',
      purpose: 'Perlintasan ilegal nggak bisa dipantau terus secara manual, jadi kondisi berbahaya bisa saja terlambat diketahui.',
      solution:
        'Object detection dipakai untuk memantau perlintasan secara real-time, lalu backend menangani notifikasi dan respons otomatis.',
      architecture: [
        'Camera feed',
        'YOLOv8 + OpenCV detection',
        'Go (Fiber) API',
        'WebSocket events',
        'Dashboard & alerts',
      ],
      backend: [
        'API Go/Fiber dengan role-based access control',
        'Notifikasi real-time lewat WebSocket',
        'Trigger respons darurat otomatis',
      ],
      highlights: [
        'Deteksi kondisi berisiko secara real-time',
        'Detection engine terhubung langsung ke backend',
      ],
    },
    madpro: {
      kind: 'Dashboard project B2B Madiun',
      tagline: 'Backend API · Hono · TypeScript',
      summary:
        'MadPro adalah API dashboard untuk project B2B tim Telkom Madiun. Tim bisa melihat data project tanpa harus selalu minta ke data owner, dengan sinkronisasi dua arah ke Google Spreadsheet.',
      role: 'Backend Developer',
      purpose:
        'Sebelumnya, informasi project B2B masih harus diminta ke data owner. Kalau request-nya sering, prosesnya jadi cukup lama.',
      solution:
        'Dibuat REST API supaya tim bisa mengakses data project sendiri, dilengkapi sinkronisasi dua arah dengan Google Spreadsheet dan role-based access control. API-nya juga sudah digunakan di production.',
      architecture: ['Client apps', 'Hono.js REST API', 'Prisma ORM', 'Supabase (PostgreSQL)', 'Google Sheets sync'],
      backend: [
        'REST API buat data project B2B',
        'Sync dua arah dengan Google Spreadsheet',
        'Role-based access control',
        'Deploy ke production sendiri',
      ],
      database: 'PostgreSQL di Supabase, lewat Prisma ORM.',
      highlights: [
        'Tim bisa cek project tanpa harus menunggu data owner',
        'Bisa langsung digunakan tanpa proses handoff yang panjang',
      ],
    },
    intrack: {
      kind: 'Sistem tracking order Indibiz',
      tagline: 'Backend API · Hono · TypeScript',
      summary:
        'InTrack adalah backend untuk memantau order Indibiz secara real-time, supaya tim sales bisa follow-up lebih cepat dan laporan tetap sinkron dengan status order.',
      role: 'Backend Developer',
      purpose: 'Tim sales membutuhkan status order yang jelas supaya follow-up dan reporting bisa dilakukan dengan lebih cepat.',
      solution: 'Backend API untuk tracking order secara real-time, sehingga status order selalu tersedia untuk follow-up dan reporting.',
      architecture: ['Sales clients', 'Hono.js API', 'Prisma ORM', 'Supabase (PostgreSQL)'],
      backend: ['REST API buat order tracking', 'Status order selalu up to date buat follow-up & reporting'],
      database: 'PostgreSQL di Supabase, lewat Prisma ORM.',
      highlights: ['Status order selalu ter-update', 'Follow-up lebih cepat', 'Reporting jadi lebih akurat'],
    },
    'telegram-bots': {
      kind: 'Otomasi informasi & input customer',
      tagline: 'Automation · Hono · Telegraf',
      summary:
        'Dua bot Telegram yang berjalan di atas service Hono.js. Keduanya membantu menjawab pertanyaan dan mengumpulkan data customer tanpa perlu memberi akses langsung ke sistem internal.',
      role: 'Backend Developer',
      purpose: 'Pertanyaan customer dan pengumpulan data masih banyak dilakukan secara manual, sementara akses ke sistem internal juga perlu dibatasi.',
      solution:
        'Dibuat dua bot Telegram yang terhubung ke backend Hono.js untuk menangani inquiry dan mengumpulkan data customer secara otomatis.',
      architecture: ['Telegram users', 'Telegraf bots', 'Hono.js backend'],
      backend: ['Service Hono.js buat kedua bot', 'Otomasi inquiry customer', 'Intake data customer'],
      highlights: [
        'Inquiry customer bisa ditangani otomatis',
        'Data customer lebih mudah dikumpulkan',
        'Customer nggak perlu mengakses sistem internal',
      ],
    },
    sibi: {
      kind: 'LKS Jawa Timur 2025 · Artificial Intelligence',
      tagline: 'Data Analysis · Preprocessing · Python',
      summary:
        'SIBI Sign Language Recognition adalah project yang dikerjakan Aby untuk LKS AI tingkat Provinsi Jawa Timur. Fokusnya ada di EDA dan preprocessing untuk menyiapkan dataset yang lebih siap dipakai tim. Tim akhirnya meraih peringkat 7.',
      role: 'Data Analyst (EDA & preprocessing)',
      purpose: 'Hasil model sangat bergantung pada kualitas data, sementara dataset awal masih perlu dibersihkan dan dianalisis.',
      solution:
        'Melakukan EDA dan preprocessing untuk memahami dataset, membersihkannya, dan menyiapkan data yang lebih siap digunakan tim.',
      architecture: ['Raw dataset', 'EDA', 'Preprocessing', 'Training-ready data', "Team's model"],
      highlights: [
        'Dataset lebih siap setelah proses EDA',
        'Training data siap digunakan tim',
        'Peringkat 7 LKS AI Jawa Timur',
      ],
    },
    'odoo-pesantren': {
      kind: 'Custom ERP dashboard',
      tagline: 'ERP · Odoo · Python',
      summary:
        'Odoo Pesantren adalah custom ERP dashboard yang menggabungkan informasi keuangan, kemahasiswaan, dan absensi dalam satu tempat, sekaligus menyesuaikan modul Odoo yang sudah ada.',
      role: 'Odoo Developer',
      purpose: 'Informasi keuangan, kemahasiswaan, dan absensi sebelumnya tersebar di beberapa modul.',
      solution:
        'Membuat dashboard ERP yang menggabungkan ketiga area tersebut, sekaligus mengembangkan modul yang sudah tersedia.',
      architecture: ['Odoo modules', 'Python models', 'XML views', 'JS dashboards', 'PostgreSQL'],
      backend: ['Custom Odoo modules & models', 'Enhancement modul existing'],
      database: 'PostgreSQL (Odoo).',
      highlights: [
        'Keuangan, kemahasiswaan, dan absensi dalam satu dashboard',
        'Modul yang sudah ada dikembangkan sesuai kebutuhan',
      ],
    },
  },
  suggestedPrompts: [
    'Aby itu siapa?',
    'Lihat project-nya',
    'Biasanya Aby ngerjain apa?',
    'Sejauh apa pengalaman AI-nya?',
    'Pakai tech stack apa?',
    'Gimana cara kontak Aby?',
  ],
  responses: {
    about:
      'Aby Danu adalah mahasiswa Sistem Informasi dan developer yang fokus di backend. Belakangan ini dia juga banyak eksplor AI/ML. Beberapa API yang dibuatnya sudah dipakai langsung oleh tim di production.',
    focus:
      'Fokus utama Aby ada di backend. Ia banyak mengerjakan REST API, database, access control, dan service real-time, sambil terus belajar AI/ML lewat analisis data dan computer vision.',
    stack:
      'Ini beberapa teknologi yang biasa dipakai Aby, dikelompokkan berdasarkan areanya. Backend masih menjadi area utamanya, sementara AI/ML sedang terus diperdalam lewat berbagai project.',
    ai: 'Pengalaman Aby di ML banyak datang dari analisis data, preprocessing, feature selection, dan project yang benar-benar dibuat. Ia meraih juara 1 tingkat Kabupaten/Kota dan peringkat 7 LKS AI Jawa Timur, serta mengembangkan Aeon RailGuard dengan YOLOv8 dan backend Go. AI/ML masih terus dipelajari dan belum menjadi spesialisasi utamanya.',
    experience:
      'Aby mulai punya pengalaman di industri sejak 2024, terutama di backend dan ERP. Ia juga sempat berbagi ilmu lewat kegiatan mengajar programming.',
    education:
      'Sekarang Aby kuliah S1 Sistem Informasi di Universitas Negeri Surabaya. Sebelumnya ia belajar Rekayasa Perangkat Lunak di SMKN 1 Mejayan.',
    achievements: 'Aby pernah meraih prestasi di kompetisi AI dan memiliki sertifikasi BNSP Junior Programmer.',
    contact:
      'Aby terbuka untuk ber kolaborasi, terutama di bidang backend dan AI. Untuk menghubungi, email adalah cara yang paling mudah.',
    self: 'Aku adalah asisten kecil di portfolio Aby. Nggak ada LLM di belakangku—aku cuma mencocokkan pertanyaanmu dengan data yang tersedia tentang Aby. Kalau ada infonya, aku jawab. Kalau nggak ada, aku bilang terus terang.',
    greeting: 'Halo! Mau tahu soal project, pengalaman, tech stack, atau cara menghubungi Aby? Tanya aja.',
    thanks: 'Sama-sama! Mau lihat yang lain?',
    fallback:
      'Hmm, aku belum punya info soal itu. Aku fokusnya di project, pengalaman, dan background Aby. Kamu bisa coba tanya soal:',
  },
  followUps: {
    about: [
      { label: 'Kuliah di mana?', prompt: 'Di mana Aby kuliah?' },
      { label: 'Pengalaman kerja', prompt: 'Tampilkan pengalaman Aby' },
      { label: 'Prestasi', prompt: 'Apa prestasi Aby?' },
      { label: 'Fokusnya apa sekarang?', prompt: 'Apa fokus Aby saat ini?' },
    ],
    focus: [
      { label: 'Project backend', prompt: 'Lihat project backend Aby' },
      { label: 'Project AI', prompt: 'Lihat project AI Aby' },
      { label: 'Tech stack-nya?', prompt: 'Pakai tech stack apa?' },
    ],
    stack: [
      { label: 'Project backend', prompt: 'Lihat project backend Aby' },
      { label: 'Pengalaman AI', prompt: 'Sejauh apa pengalaman AI-nya?' },
      { label: 'Pengalaman kerja', prompt: 'Tampilkan pengalaman Aby' },
    ],
    ai: [
      { label: 'Ceritain Aeon RailGuard', prompt: 'Ceritain soal Aeon RailGuard' },
      { label: 'Project backend', prompt: 'Lihat project backend Aby' },
      { label: 'Prestasi', prompt: 'Apa prestasi Aby?' },
    ],
    experience: [
      { label: 'Lihat project', prompt: 'Lihat project-nya' },
      { label: 'Pendidikan', prompt: 'Di mana Aby kuliah?' },
      { label: 'Prestasi', prompt: 'Apa prestasi Aby?' },
    ],
    education: [
      { label: 'Pengalaman kerja', prompt: 'Tampilkan pengalaman Aby' },
      { label: 'Prestasi', prompt: 'Apa prestasi Aby?' },
      { label: 'Fokus sekarang', prompt: 'Apa fokus Aby saat ini?' },
    ],
    achievements: [
      { label: 'Pengalaman AI', prompt: 'Sejauh apa pengalaman AI-nya?' },
      { label: 'Lihat project', prompt: 'Lihat project-nya' },
      { label: 'Pengalaman kerja', prompt: 'Tampilkan pengalaman Aby' },
    ],
    contact: [
      { label: 'Lihat project', prompt: 'Lihat project-nya' },
      { label: 'Aby itu siapa?', prompt: 'Aby itu siapa?' },
    ],
    self: [
      { label: 'Aby itu siapa?', prompt: 'Aby itu siapa?' },
      { label: 'Lihat project', prompt: 'Lihat project-nya' },
    ],
    greeting: [
      { label: 'Aby itu siapa?', prompt: 'Aby itu siapa?' },
      { label: 'Lihat project', prompt: 'Lihat project-nya' },
      { label: 'Kontak', prompt: 'Gimana cara kontak Aby?' },
    ],
    fallback: [
      { label: 'Lihat project', prompt: 'Lihat project-nya' },
      { label: 'Aby itu siapa?', prompt: 'Aby itu siapa?' },
      { label: 'Tech stack', prompt: 'Pakai tech stack apa?' },
      { label: 'Kontak', prompt: 'Gimana cara kontak Aby?' },
    ],
  },
  blocks: {
    profile: 'Profil',
    currentInterests: 'Yang lagi dipelajari',
    technologies: 'Tech stack',
    experience: 'Pengalaman',
    education: 'Pendidikan',
    achievements: 'Prestasi',
    competitions: 'Kompetisi',
    appliedWork: 'Project',
    getInTouch: 'Kontak',
    mlApproach: 'Cara Aby mengerjakan ML',
    projectAnalysis: 'Detail project',
    purpose: 'Masalah yang ingin diselesaikan',
    whatHeBuilt: 'Yang dibuat',
    architecture: 'Architecture',
    backendResponsibilities: 'Bagian backend',
    database: 'Database',
    keyPoints: 'Yang menarik',
    links: 'Link',
    sourceCode: 'Source code',
    liveDemo: 'Live demo',
    filterLabels,
    retrieved: (count, filter) => `${count} ${filterLabels[filter]}`,
  },
  profile: {
    role: 'AI & Backend Engineer',
    tagline: 'Membangun backend yang scalable dan terus belajar tentang AI/ML.',
    focus: 'Backend · AI/ML',
    status: 'Terbuka untuk ber kolaborasi',
    education: 'Sistem Informasi · UNESA',
    interests: [
      'Backend architecture',
      'AI',
      'Machine learning',
      'Computer vision',
      'Data processing',
      'Developer tools',
    ],
    labels: {
      name: 'Nama',
      role: 'Role',
      focus: 'Fokus',
      education: 'Pendidikan',
      location: 'Lokasi',
      status: 'Status',
    },
  },
  experience: {
    ofcas: {
      title: 'Programming Instructor',
      subtitle: 'OFCAS IT Community',
      detail: 'Mendampingi siswa belajar programming.',
    },
    telkom: {
      title: 'Full Stack Developer',
      subtitle: 'Telkom Indonesia · Witel Madiun',
      detail: 'Mengerjakan fitur backend untuk mendukung workflow tim sales.',
    },
    ubd: {
      title: 'Odoo Developer',
      subtitle: 'PT. Universal Big Data',
      detail: 'Membuat custom ERP dashboard dan mengembangkan modul yang sudah ada.',
    },
  },
  education: {
    unesa: {
      title: 'S1 Sistem Informasi',
      subtitle: 'Universitas Negeri Surabaya',
      detail: 'Masih kuliah, sambil fokus mendalami backend dan AI/ML.',
    },
    smk: {
      title: 'Rekayasa Perangkat Lunak',
      subtitle: 'SMKN 1 Mejayan',
      detail: 'Di sinilah Aby mulai serius belajar dan membangun software.',
    },
  },
  achievements: {
    'lks-regional': {
      title: 'LKS Artificial Intelligence · Regional',
      context: 'Lomba LKS tingkat Kabupaten/Kota Madiun.',
    },
    'lks-jatim': {
      title: 'LKS Artificial Intelligence · Jawa Timur',
      context: 'Lomba tingkat Provinsi Jawa Timur, Fokus data analysis dan preprocessing untuk SIBI sign language recognition.',
    },
    bnsp: {
      title: 'BNSP Junior Programmer',
      context: 'Sertifikasi kompetensi profesi nasional.',
    },
  },
  stackGroups: {
    languages: 'Languages',
    backend: 'Backend',
    database: 'Database',
    ai: 'AI / ML',
    frontend: 'Frontend',
    tooling: 'Tooling',
  },
  pipeline: {
    data: { label: 'Data', description: 'Pahami dulu isi dan kondisi dataset.' },
    exploration: { label: 'Exploration', description: 'Cari pola, imbalance, dan noise di data.' },
    preprocessing: { label: 'Preprocessing', description: 'Bersihkan dan siapkan data untuk training.' },
    features: { label: 'Feature selection', description: 'Pilih fitur yang paling relevan.' },
    model: { label: 'Model', description: 'Bekerja bersama tim untuk model recognition dan detection.' },
    inference: { label: 'Inference', description: 'Menjalankan hasil detection secara real-time lewat backend Go.' },
  },
  projectsIntro: (filter, n) => {
    const count = `${n} project`
    switch (filter) {
      case 'backend':
        return `Ini ${count} project di sisi backend. Beberapa di antaranya sudah berjalan di production dan dipakai langsung oleh tim.`
      case 'ai':
        return `Ini ${count} project di AI/ML. Peran Aby cukup beragam, mulai dari data preparation dan detection sampai bagian backend.`
      case 'erp':
        return `Ini ${count} project yang berkaitan dengan ERP.`
      default:
        return `Ini ${count} project dari portfolio Aby—mulai dari backend yang sudah dipakai di production sampai beberapa project AI.`
    }
  },
  prompts: {
    tellMeAbout: (name) => `Ceritain tentang ${name}`,
    showAllProjects: 'Lihat semua project Aby',
    techStack: 'Pakai tech stack apa?',
    showBackendProjects: 'Lihat project backend Aby',
    showAiProjects: 'Lihat project AI Aby',
    tellMeAboutSkills: 'Pakai tech stack apa?',
  },
}
