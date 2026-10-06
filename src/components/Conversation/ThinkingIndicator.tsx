import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import { Presence } from '../Presence/Presence'

export function ThinkingIndicator() {
  const { locale } = useLanguage()
  const steps = locale.ui.thinking.steps
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 300)
    return () => window.clearInterval(id)
  }, [steps.length])

  return (
    <div
      className="animate-rise grid grid-cols-[1.5rem_1fr] gap-x-4 md:gap-x-5"
      role="status"
      aria-label={locale.ui.thinking.ariaLabel}
    >
      <div className="pt-0.5">
        <Presence size={22} state="thinking" />
      </div>
      <div>
        <p key={step} className="shimmer animate-rise font-mono text-[11px] uppercase tracking-[0.2em]">
          {steps[step]}…
        </p>
        <ul className="mt-2 space-y-1">
          {steps.slice(0, step).map((s) => (
            <li key={s} className="animate-rise flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
              <Check size={10} className="text-accent" /> {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
