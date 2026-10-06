import type { ReactNode } from 'react'
import { ArrowUpRight, Github } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import type { Project } from '../../types'

function Section({ label, i, children }: { label: string; i: number; children: ReactNode }) {
  return (
    <div className="animate-rise" style={{ animationDelay: `${180 + i * 150}ms` }}>
      <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{label}</p>
      {children}
    </div>
  )
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-y-2">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center">
          <span className="rounded-md border border-line-strong bg-surface px-2.5 py-1.5 font-mono text-[11.5px] text-fg/90">
            {s}
          </span>
          {i < steps.length - 1 && (
            <span className="relative mx-1.5 h-px w-5 overflow-hidden bg-line-strong" aria-hidden>
              <span className="absolute inset-0 animate-sweep bg-accent" style={{ animationDelay: `${i * 380}ms` }} />
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}

const linkCls =
  'inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-fg transition-colors hover:border-accent hover:text-accent'

export function ProjectDetail({ project: p }: { project: Project }) {
  const { locale } = useLanguage()
  const b = locale.blocks
  let i = 0

  return (
    <article className="border-l border-accent/50 pl-5 md:pl-7">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">{b.projectAnalysis}</p>
      <h3 className="mt-3 font-display text-[2.6rem] leading-none tracking-tight md:text-6xl">{p.name}</h3>
      <p className="mt-3 text-sm text-muted">
        {p.kind} <span className="text-dim">·</span> {p.role} <span className="text-dim">·</span> {p.period}
      </p>

      <div className="mt-8 space-y-8">
        <Section label={b.purpose} i={i++}>
          <p className="text-[15px] leading-relaxed text-fg/90">{p.purpose}</p>
        </Section>

        <Section label={b.whatHeBuilt} i={i++}>
          <p className="text-[15px] leading-relaxed text-fg/90">{p.solution}</p>
        </Section>

        <Section label={b.architecture} i={i++}>
          <Flow steps={p.architecture} />
        </Section>

        {p.backend && (
          <Section label={b.backendResponsibilities} i={i++}>
            <ul className="space-y-2 text-[15px] text-fg/90">
              {p.backend.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2.75 h-px w-3 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {p.database && (
          <Section label={b.database} i={i++}>
            <p className="text-[15px] text-fg/90">{p.database}</p>
          </Section>
        )}

        <Section label={b.technologies} i={i++}>
          <div className="flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="rounded-md border border-line-strong px-2.5 py-1 font-mono text-[11.5px] text-muted">
                {s}
              </span>
            ))}
          </div>
        </Section>

        <Section label={b.keyPoints} i={i++}>
          <ul className="space-y-2 text-[15px] text-muted">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-2.75 h-px w-3 shrink-0 bg-line-strong" />
                {h}
              </li>
            ))}
          </ul>
        </Section>

        {(p.github || p.live) && (
          <Section label={b.links} i={i++}>
            <div className="flex flex-wrap gap-2">
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  <Github size={13} /> {b.sourceCode}
                </a>
              )}
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  {b.liveDemo} <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </Section>
        )}
      </div>
    </article>
  )
}
