import type { PromptHandler } from '../../types'

interface Props {
  label: string
  prompt?: string
  onPrompt: PromptHandler
  disabled?: boolean
  delay?: number
}

/** Clicking one behaves exactly like typing its prompt and pressing Enter. */
export function PromptSuggestion({ label, prompt, onPrompt, disabled, delay = 0 }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={(e) => onPrompt(prompt ?? label, e.currentTarget)}
      style={{ animationDelay: `${delay}ms` }}
      className="animate-rise rounded-full border border-line-strong bg-surface/70 px-4 py-2.5 text-left text-[13.5px] leading-none text-muted transition-colors duration-200 hover:border-accent/60 hover:text-fg disabled:opacity-40 disabled:hover:border-line-strong disabled:hover:text-muted"
    >
      {label}
    </button>
  )
}
