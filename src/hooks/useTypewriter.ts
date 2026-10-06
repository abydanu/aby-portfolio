import { useEffect, useMemo, useState } from 'react'

/** Streams text one word per tick: reads like token streaming, and stays fast. */
export function useTypewriter(text: string, active: boolean, speed = 22) {
  const words = useMemo(() => text.split(' '), [text])
  const [n, setN] = useState(active ? 0 : words.length)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!active || reduce) {
      setN(words.length)
      return
    }
    setN(0)
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setN(i)
      if (i >= words.length) window.clearInterval(id)
    }, speed)
    return () => window.clearInterval(id)
  }, [active, words, speed])

  return { shown: words.slice(0, n).join(' '), done: n >= words.length }
}
