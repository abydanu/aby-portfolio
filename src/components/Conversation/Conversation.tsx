import { useCallback, useEffect, useRef } from 'react'
import { AIMessage } from '../AIMessage/AIMessage'
import { ThinkingIndicator } from './ThinkingIndicator'
import { MORPH_NAME, vtName } from '../../utils/viewTransition'
import type { Message, Phase, PromptHandler } from '../../types'

interface Props {
  messages: Message[]
  phase: Phase
  morphId: string | null
  onPrompt: PromptHandler
  onSettle: (id: string) => void
}

export function Conversation({ messages, phase, morphId, onPrompt, onSettle }: Props) {
  const lastUser = useRef<HTMLParagraphElement>(null)
  const stick = useRef(true)

  // Follow new content only while the visitor is already near the bottom.
  useEffect(() => {
    const onScroll = () => {
      const gap = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)
      stick.current = gap < 220
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Short answers follow the bottom. Long ones stay anchored at the visitor's own prompt,
  // so the start of the answer is never scrolled out of view.
  const scrollEnd = useCallback((force = false) => {
    if (!force && !stick.current) return
    const endY = document.documentElement.scrollHeight - window.innerHeight
    const anchor = lastUser.current
    const topY = anchor ? anchor.getBoundingClientRect().top + window.scrollY - 88 : endY
    window.scrollTo({ top: Math.max(0, Math.min(endY, topY)), behavior: 'smooth' })
  }, [])

  const last = messages[messages.length - 1]
  useEffect(() => {
    if (last?.role === 'user') {
      stick.current = true
      scrollEnd(true)
    }
  }, [last?.id, last?.role, scrollEnd])

  const busy = phase === 'thinking'
  const lastUserId = [...messages].reverse().find((m) => m.role === 'user')?.id

  return (
    <div className="mx-auto w-full max-w-176 flex-1 px-5 pb-6 pt-24 md:pt-28">
      <div className="space-y-12">
        {messages.map((m) =>
          m.role === 'user' ? (
            <div key={m.id} className="animate-rise">
              <p
                ref={m.id === lastUserId ? lastUser : undefined}
                style={vtName(m.id === morphId ? MORPH_NAME : undefined)}
                className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-line-strong bg-raised px-4 py-2.5 text-[14px] leading-snug text-fg"
              >
                <span className="font-mono text-accent" aria-hidden>
                  ›
                </span>
                <span className="min-w-0 wrap-wrap-break-words">{m.text}</span>
              </p>
            </div>
          ) : (
            <AIMessage
              key={m.id}
              response={m.response}
              settled={m.settled}
              busy={busy}
              onSettle={() => onSettle(m.id)}
              onProgress={scrollEnd}
              onPrompt={onPrompt}
            />
          ),
        )}
        {phase === 'thinking' && <ThinkingIndicator />}
      </div>
    </div>
  )
}
