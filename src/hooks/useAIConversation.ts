import { useCallback, useEffect, useRef, useState } from 'react'
import { localEngine, type AssistantEngine } from '../services/assistant'
import type { Message, Phase } from '../types'

const THINK_MS = 900
const MAX_LEN = 280
const MAX_RESTORE = 12

let seq = 0
const uid = () => `m${Date.now().toString(36)}${seq++}`
const sleep = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms))

const settleAll = (list: Message[]): Message[] =>
  list.map((m) => (m.role === 'ai' && !m.settled ? { ...m, settled: true } : m))

/** The URL hash stores the prompts of the session, so a conversation can be shared and replayed. */
function readHash(): string[] {
  try {
    const m = window.location.hash.match(/^#s=(.*)$/)
    if (!m) return []
    return m[1].split('~').map(decodeURIComponent).filter(Boolean).slice(0, MAX_RESTORE)
  } catch {
    return []
  }
}

function writeHash(prompts: string[]) {
  try {
    const hash = prompts.length ? `#s=${prompts.map(encodeURIComponent).join('~')}` : ''
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${hash}`)
  } catch {
    /* ignore */
  }
}

function restore(engine: AssistantEngine): Message[] {
  if (!engine.respondSync) return []
  return readHash().flatMap<Message>((text) => [
    { id: uid(), role: 'user', text },
    { id: uid(), role: 'ai', response: engine.respondSync!(text), settled: true },
  ])
}

export function useAIConversation(engine: AssistantEngine = localEngine) {
  const [messages, setMessages] = useState<Message[]>(() => restore(engine))
  const [phase, setPhase] = useState<Phase>('idle')
  const run = useRef(0)
  const messagesRef = useRef(messages)
  messagesRef.current = messages

  useEffect(() => {
    writeHash(messages.filter((m) => m.role === 'user').map((m) => m.text))
  }, [messages])

  /** Returns the id of the new user message, or null if the prompt was ignored. */
  const ask = useCallback(
    (prompt: string): string | null => {
      const text = prompt.trim().slice(0, MAX_LEN)
      if (!text || phase === 'thinking') return null

      const id = uid()
      const myRun = ++run.current
      setMessages((m) => [...settleAll(m), { id, role: 'user', text }])
      setPhase('thinking')

      Promise.all([engine.respond(text, messagesRef.current), sleep(THINK_MS)])
        .then(([response]) => response)
        .catch(() => engine.respondSync?.('') ?? null)
        .then((response) => {
          if (myRun !== run.current || !response) return
          setMessages((m) => [...m, { id: uid(), role: 'ai', response, settled: false }])
          setPhase('responding')
        })

      return id
    },
    [engine, phase],
  )

  const settle = useCallback((id: string) => {
    setMessages((m) => m.map((x) => (x.id === id && x.role === 'ai' ? { ...x, settled: true } : x)))
    setPhase((p) => (p === 'responding' ? 'idle' : p))
  }, [])

  const reset = useCallback(() => {
    run.current++
    setMessages([])
    setPhase('idle')
  }, [])

  return { messages, phase, ask, settle, reset }
}
