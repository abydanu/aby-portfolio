import { useCallback, useEffect, useRef, useState } from 'react'
import { AIInput, type AIInputHandle } from './components/AIInput/AIInput'
import { Conversation } from './components/Conversation/Conversation'
import { Landing } from './components/Landing/Landing'
import { PromptSuggestion } from './components/PromptSuggestion/PromptSuggestion'
import { TopBar } from './components/TopBar/TopBar'
import { suggestedPrompts } from './data/responses'
import { useAIConversation } from './hooks/useAIConversation'
import type { PromptHandler } from './types'
import { transition, vtName } from './utils/viewTransition'

export default function App() {
  const convo = useAIConversation()
  const input = useRef<AIInputHandle>(null)
  const [morphId, setMorphId] = useState<string | null>(null)

  const started = convo.messages.length > 0
  const thinking = convo.phase === 'thinking'

  const send: PromptHandler = useCallback(
    (prompt, from) => {
      transition(
        () => {
          const id = convo.ask(prompt)
          if (id && from) setMorphId(id)
        },
        { from, onDone: () => setMorphId(null) },
      )
    },
    [convo],
  )

  const reset = useCallback(() => transition(() => convo.reset()), [convo])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null
      const typing = el && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT')
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        input.current?.focus()
      } else if (e.key === '/' && !typing) {
        e.preventDefault()
        input.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <div className="ambient" aria-hidden />
      <TopBar started={started} thinking={thinking} onReset={reset} />

      <div className={`flex min-h-dvh flex-col ${started ? '' : 'justify-center'}`}>
        {started ? (
          <Conversation
            messages={convo.messages}
            phase={convo.phase}
            morphId={morphId}
            onPrompt={send}
            onSettle={convo.settle}
          />
        ) : (
          <Landing />
        )}

        <div
          style={vtName('dock')}
          className={`z-30 w-full ${
            started
              ? 'sticky bottom-0 bg-linear-to-t from-ink from-60% to-transparent pb-[max(1rem,env(safe-area-inset-bottom))] pt-8'
              : 'pb-16 pt-10 md:pb-8'
          }`}
        >
          <div className="mx-auto w-full max-w-176 px-5">
            <AIInput
              ref={input}
              size={started ? 'dock' : 'hero'}
              placeholder={started ? 'Ask a follow-up…' : 'Ask me anything about Aby…'}
              busy={thinking}
              onSubmit={(text) => send(text, null)}
            />

            {!started && (
              <>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {suggestedPrompts.map((p, i) => (
                    <PromptSuggestion key={p} label={p} onPrompt={send} delay={300 + i * 60} />
                  ))}
                </div>
                <p className="mt-6 hidden justify-center gap-5 font-mono text-[10px] uppercase tracking-[0.16em] text-dim md:flex">
                  <span>↵ send</span>
                  <span>⇧ ↵ new line</span>
                  <span>/ focus</span>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
