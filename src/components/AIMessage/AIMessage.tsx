import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'
import { useTypewriter } from '../../hooks/useTypewriter'
import type { AIResponse, PromptHandler } from '../../types'
import { Presence } from '../Presence/Presence'
import { PromptSuggestion } from '../PromptSuggestion/PromptSuggestion'
import { ResponseCard } from '../ResponseCard/ResponseCard'

interface Props {
  response: AIResponse
  settled: boolean
  busy: boolean
  onSettle: () => void
  onProgress: () => void
  onPrompt: PromptHandler
}

/**
 * Reveals a response in stages: text streams in, then each block expands in turn,
 * then follow-up prompts appear. Settling (or a new prompt) shows everything at once.
 */
export function AIMessage({ response, settled, busy, onSettle, onProgress, onPrompt }: Props) {
  const { locale } = useLanguage()
  const live = !settled
  const { shown, done } = useTypewriter(response.text, live)
  const total = response.blocks.length
  const [count, setCount] = useState(0)

  const blocksShown = live ? count : total
  const allShown = !live || (done && count >= total)

  useEffect(() => {
    if (!live || !done || count >= total) return
    const id = window.setTimeout(() => setCount((c) => c + 1), count === 0 ? 160 : 420)
    return () => window.clearTimeout(id)
  }, [live, done, count, total])

  useEffect(() => {
    if (!live || !done || count < total) return
    const id = window.setTimeout(onSettle, 500)
    return () => window.clearTimeout(id)
  }, [live, done, count, total, onSettle])

  // Tell the parent when layout grew so it can keep the newest content in view.
  const progress = useRef(onProgress)
  progress.current = onProgress
  useEffect(() => {
    progress.current()
  }, [blocksShown, allShown])

  return (
    <div className="grid grid-cols-[1.5rem_1fr] gap-x-4 md:gap-x-5">
      <div className="pt-2.5">
        <Presence size={22} />
      </div>

      <div className="min-w-0">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
          {locale.ui.message.retrieved} · {response.source}
        </p>

        <p className="text-[1.2rem] font-light leading-[1.4] tracking-[-0.012em] text-fg md:text-[1.55rem]">
          {shown}
          {live && !done && <span className="ml-1 inline-block h-[0.95em] w-0.5 translate-y-[0.12em] bg-accent animate-blink" />}
        </p>

        {blocksShown > 0 && (
          <div className="mt-9 space-y-10">
            {response.blocks.slice(0, blocksShown).map((b, i) => (
              <div key={`${b.type}-${i}`} className="animate-rise">
                <ResponseCard block={b} onPrompt={onPrompt} busy={busy} />
              </div>
            ))}
          </div>
        )}

        {allShown && response.followUps.length > 0 && (
          <div className="mt-10">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{locale.ui.message.followUp}</p>
            <div className="flex flex-wrap gap-2">
              {response.followUps.map((f, i) => (
                <PromptSuggestion
                  key={f.prompt}
                  label={f.label}
                  prompt={f.prompt}
                  onPrompt={onPrompt}
                  disabled={busy}
                  delay={i * 70}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
