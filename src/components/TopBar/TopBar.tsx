import { RotateCcw } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import type { Language } from '../../i18n'
import { vtName } from '../../utils/viewTransition'
import { Presence } from '../Presence/Presence'

interface Props {
  started: boolean
  thinking: boolean
  onReset: () => void
}

function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const options: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'id', label: 'ID' },
  ]

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex rounded-full border border-line-strong p-0.5 font-mono text-[10px] uppercase tracking-[0.14em]"
    >
      {options.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            language === code ? 'bg-accent/15 text-accent' : 'text-muted hover:text-fg'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export function TopBar({ started, thinking, onReset }: Props) {
  const { locale } = useLanguage()
  const { topbar: t } = locale.ui

  return (
    <header
      style={vtName('topbar')}
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        started ? 'bg-ink/75 backdrop-blur-md' : ''
      }`}
    >
      <div className="mx-auto flex h-14 max-w-208 items-center justify-between px-5 md:h-16">
        <button
          onClick={onReset}
          disabled={!started}
          aria-label={t.newSession}
          className="font-mono text-[13px] font-medium tracking-[0.14em] disabled:cursor-default"
        >
          ABY<span className="text-accent">.</span>DANU
        </button>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted sm:flex">
            <Presence size={12} state={thinking ? 'thinking' : 'idle'} />
            {thinking ? t.thinking : t.online}
          </span>
          {started && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent/60 hover:text-fg"
            >
              <RotateCcw size={11} /> {t.new}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
