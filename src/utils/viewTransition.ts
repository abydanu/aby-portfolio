import type { CSSProperties } from 'react'
import { flushSync } from 'react-dom'

type VT = { finished: Promise<void> }
type DocWithVT = Document & { startViewTransition?: (cb: () => void) => VT }

export const MORPH_NAME = 'user-prompt'

export const vtName = (name?: string): CSSProperties | undefined =>
  name ? ({ viewTransitionName: name } as unknown as CSSProperties) : undefined

/**
 * Runs a state update inside a View Transition when the browser supports it.
 * If `from` is given (a clicked suggestion), it is tagged so the browser morphs
 * it into the element that carries the same name after the update.
 */
export function transition(update: () => void, opts?: { from?: HTMLElement | null; onDone?: () => void }) {
  const doc = document as DocWithVT
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!doc.startViewTransition || reduce) {
    update()
    opts?.onDone?.()
    return
  }
  const from = opts?.from ?? null
  from?.style.setProperty('view-transition-name', MORPH_NAME)
  const vt = doc.startViewTransition(() => {
    from?.style.removeProperty('view-transition-name')
    flushSync(update)
  })
  vt.finished.finally(() => opts?.onDone?.())
}
