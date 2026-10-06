import { RotateCcw } from 'lucide-react'
import { Presence } from '../Presence/Presence'
import { vtName } from '../../utils/viewTransition'

interface Props {
  started: boolean
  thinking: boolean
  onReset: () => void
}

export function TopBar({ started, thinking, onReset }: Props) {
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
          aria-label="Start a new session"
          className="font-mono text-[13px] font-medium tracking-[0.14em] disabled:cursor-default"
        >
          ABY<span className="text-accent">.</span>DANU
        </button>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            <Presence size={12} state={thinking ? 'thinking' : 'idle'} />
            {thinking ? 'thinking' : 'online'}
          </span>
          {started && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent/60 hover:text-fg"
            >
              <RotateCcw size={11} /> New
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
