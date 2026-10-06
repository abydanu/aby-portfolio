import type { CSSProperties } from 'react'

interface Props {
  size?: number
  state?: 'idle' | 'thinking'
  className?: string
}

export function Presence({ size = 24, state = 'idle', className = '' }: Props) {
  return (
    <span
      aria-hidden
      className={`presence ${className}`}
      data-state={state}
      style={{ '--s': `${size}px` } as CSSProperties}
    >
      <i className="presence-ring" />
      <i className="presence-ring r2" />
      <i className="presence-orbit" />
      <i className="presence-core" />
    </span>
  )
}
