import { profile } from '../../data/profile'
import { useLanguage } from '../../hooks/useLanguage'
import { Presence } from '../Presence/Presence'

export function Landing() {
  const { locale } = useLanguage()
  const { landing: t } = locale.ui
  const lp = locale.profile

  return (
    <section className="mx-auto w-full max-w-176 px-5 text-center">
      <div className="animate-rise">
        <Presence size={46} className="mx-auto mb-9" />
      </div>
      <h1
        className="animate-rise font-display text-[3.6rem] leading-[0.94] tracking-[-0.02em] sm:text-7xl md:text-[5.75rem]"
        style={{ animationDelay: '80ms' }}
      >
        <span className="block text-fg/55 sm:inline">{t.hi}</span>{' '}
        <em className="whitespace-nowrap italic">{profile.name}.</em>
      </h1>
      <p
        className="animate-rise mt-7 font-mono text-[11px] uppercase tracking-[0.24em] text-accent md:text-xs"
        style={{ animationDelay: '160ms' }}
      >
        {lp.role}
      </p>
      <p
        className="animate-rise mx-auto mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg"
        style={{ animationDelay: '220ms' }}
      >
        {lp.tagline}
      </p>
    </section>
  )
}
