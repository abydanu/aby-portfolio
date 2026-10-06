import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

export interface AIInputHandle {
  focus: () => void
}

interface Props {
  onSubmit: (text: string) => void
  placeholder: string
  size: 'hero' | 'dock'
  busy: boolean
}

export const AIInput = forwardRef<AIInputHandle, Props>(function AIInput({ onSubmit, placeholder, size, busy }, ref) {
  const { locale } = useLanguage()
  const [value, setValue] = useState('')
  const area = useRef<HTMLTextAreaElement>(null)
  useImperativeHandle(ref, () => ({ focus: () => area.current?.focus() }))

  // Auto-grow up to ~6 lines.
  useLayoutEffect(() => {
    const el = area.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [value, size])

  const submit = () => {
    if (!value.trim() || busy) return
    onSubmit(value)
    setValue('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      submit()
    }
  }

  const hero = size === 'hero'

  return (
    <div className="prompt-shell" data-busy={busy}>
      <div className={`flex items-end gap-3 ${hero ? 'px-5 py-4 md:px-6 md:py-5' : 'px-4 py-3'}`}>
        <textarea
          ref={area}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder={placeholder}
          aria-label={locale.ui.input.askLabel}
          enterKeyHint="send"
          autoComplete="off"
          spellCheck={false}
          maxLength={280}
          className={`min-w-0 flex-1 resize-none bg-transparent leading-snug tracking-tight text-fg caret-accent outline-none placeholder:text-dim ${
            hero ? 'min-h-13 text-lg md:text-xl' : 'min-h-7 text-base'
          }`}
        />
        <button
          onClick={submit}
          disabled={!value.trim() || busy}
          aria-label={locale.ui.input.sendLabel}
          className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-ink transition-all duration-300 enabled:hover:scale-105 disabled:bg-raised disabled:text-dim"
        >
          <ArrowUp size={17} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  )
})
