import { useState, type ReactNode } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import type { Block, PromptHandler } from '../../types'
import { ProjectDetail } from '../ProjectDetail/ProjectDetail'
import { Presence } from '../Presence/Presence'

interface Props {
  block: Block
  onPrompt: PromptHandler
  busy: boolean
}

const pad = (n: number) => String(n).padStart(2, '0')
const stagger = (i: number, step = 70) => ({ animationDelay: `${i * step}ms` })

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section>
      <p className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
        <span className="h-px w-5 bg-line-strong" />
        {label}
      </p>
      {children}
    </section>
  )
}

function CopyEmail({ email }: { email: string }) {
  const { locale } = useLanguage()
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }
  return (
    <button
      onClick={copy}
      className="flex shrink-0 items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors hover:border-accent/60 hover:text-fg"
    >
      {copied ? <Check size={11} className="text-accent" /> : <Copy size={11} />}
      {copied ? locale.ui.responseCard.copied : locale.ui.responseCard.copy}
    </button>
  )
}

export function ResponseCard({ block, onPrompt, busy }: Props) {
  const { locale } = useLanguage()

  switch (block.type) {
    case 'project':
      return <ProjectDetail project={block.project} />

    case 'projects':
      return (
        <Frame label={block.label}>
          <ul className="divide-y divide-line border-y border-line">
            {block.items.map((p, i) => (
              <li key={p.id} className="animate-rise" style={stagger(i, 90)}>
                <button
                  disabled={busy}
                  onClick={(e) =>
                    onPrompt(locale.prompts.tellMeAbout(p.name), e.currentTarget.querySelector<HTMLElement>('[data-morph]'))
                  }
                  className="group grid w-full grid-cols-[2rem_1fr_auto] items-center gap-3 py-4 text-left disabled:opacity-50 md:py-5"
                >
                  <span className="font-mono text-[11px] text-dim">{pad(i + 1)}</span>
                  <span className="min-w-0">
                    <span data-morph className="inline-block text-lg font-medium tracking-tight transition-colors group-hover:text-accent md:text-xl">
                      {p.name}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">{p.tagline}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-dim opacity-70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100 md:opacity-0"
                  />
                </button>
              </li>
            ))}
          </ul>
        </Frame>
      )

    case 'facts':
      return (
        <Frame label={block.label}>
          <dl className="divide-y divide-line border-y border-line">
            {block.rows.map((r, i) => (
              <div
                key={r.key}
                className="animate-rise grid grid-cols-[6.5rem_1fr] gap-4 py-3 sm:grid-cols-[8rem_1fr]"
                style={stagger(i, 80)}
              >
                <dt className="pt-0.5 font-mono text-[11px] uppercase tracking-wider text-dim">{r.key}</dt>
                <dd className="text-[15px] text-fg/90">{r.value}</dd>
              </div>
            ))}
          </dl>
        </Frame>
      )

    case 'chips':
      return (
        <Frame label={block.label}>
          <ul className="flex flex-wrap gap-2">
            {block.items.map((c, i) => (
              <li
                key={c}
                className="animate-rise rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-fg/85"
                style={stagger(i, 60)}
              >
                {c}
              </li>
            ))}
          </ul>
        </Frame>
      )

    case 'stack':
      return (
        <Frame label={block.label}>
          <dl className="space-y-6">
            {block.groups.map((g, gi) => (
              <div key={g.id} className="animate-rise" style={stagger(gi, 110)}>
                <dt className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{g.label}</dt>
                <dd className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-lg leading-relaxed tracking-tight text-fg/90 md:text-xl">
                  {g.items.map((item, i) => (
                    <span key={item} className="inline-flex items-baseline gap-x-2 whitespace-nowrap">
                      {i > 0 && <span className="text-dim">·</span>}
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Frame>
      )

    case 'timeline':
      return (
        <Frame label={block.label}>
          <ol className="relative ml-1">
            <span aria-hidden className="draw-y absolute bottom-2 left-1.25 top-2 w-px bg-line-strong" />
            {block.items.map((t, i) => (
              <li key={t.id} className="animate-rise relative pb-8 pl-8 last:pb-0" style={stagger(i, 160)}>
                <span className="absolute left-0 top-1.75 h-2.75 w-2.75 rounded-full border border-accent bg-ink" />
                <p className="font-mono text-[11px] uppercase tracking-wider text-dim">{t.period}</p>
                <p className="mt-1 text-lg font-medium tracking-tight">{t.title}</p>
                {t.subtitle && <p className="text-sm text-muted">{t.subtitle}</p>}
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-fg/80">{t.detail}</p>
              </li>
            ))}
          </ol>
        </Frame>
      )

    case 'achievements':
      return (
        <Frame label={block.label}>
          <ul className="divide-y divide-line border-y border-line">
            {block.items.map((a, i) => (
              <li
                key={a.id}
                className="animate-rise grid grid-cols-[6rem_1fr] items-baseline gap-4 py-5 md:grid-cols-[8rem_1fr]"
                style={stagger(i, 120)}
              >
                <span className="font-display text-4xl leading-none tracking-tight text-accent md:text-5xl">{a.result}</span>
                <span>
                  <span className="block text-base font-medium tracking-tight">{a.title}</span>
                  <span className="mt-1 block text-sm text-muted">{a.context}</span>
                  <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-wider text-dim">{a.date}</span>
                </span>
              </li>
            ))}
          </ul>
        </Frame>
      )

    case 'pipeline':
      return (
        <Frame label={block.label}>
          <ol className="relative ml-1 border-l border-line-strong">
            <span aria-hidden className="rail-pulse" />
            {block.stages.map((s, i) => (
              <li key={s.id} className="animate-rise relative py-3 pl-7" style={stagger(i, 130)}>
                <span className="absolute -left-1 top-4.75 h-1.75 w-1.75 rounded-full bg-ink ring-1 ring-line-strong" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg">
                    <span className="mr-3 text-dim">{pad(i + 1)}</span>
                    {s.label}
                  </p>
                  <p className="font-mono text-[10.5px] text-dim">{s.tools.join(' · ')}</p>
                </div>
                <p className="mt-1 text-sm text-muted">{s.description}</p>
              </li>
            ))}
          </ol>
        </Frame>
      )

    case 'contact':
      return (
        <Frame label={block.label}>
          <p className="animate-rise mb-5 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
            <Presence size={12} /> {block.status}
          </p>
          <ul className="divide-y divide-line border-y border-line">
            <li className="animate-rise flex items-center justify-between gap-4 py-4" style={stagger(1, 100)}>
              <a href={`mailto:${block.email}`} className="group flex min-w-0 items-center gap-4">
                <Mail size={16} className="shrink-0 text-dim transition-colors group-hover:text-accent" />
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-dim">{locale.ui.responseCard.email}</span>
                  <span className="block truncate text-base tracking-tight transition-colors group-hover:text-accent md:text-lg">
                    {block.email}
                  </span>
                </span>
              </a>
              <CopyEmail email={block.email} />
            </li>
            {block.links.map((l, i) => (
              <li key={l.id} className="animate-rise" style={stagger(i + 2, 100)}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="min-w-0 pl-8">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-dim">{l.label}</span>
                    <span className="block truncate text-base tracking-tight transition-colors group-hover:text-accent md:text-lg">
                      {l.handle}
                    </span>
                  </span>
                  <ArrowUpRight size={16} className="shrink-0 text-dim transition-colors group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Frame>
      )
  }
}
