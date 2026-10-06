import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { getLocale, readStoredLanguage, storeLanguage, type Language, type Locale } from '../i18n'

interface LanguageContextValue {
  language: Language
  locale: Locale
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage)

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
    storeLanguage(next)
  }, [])

  const value = useMemo(
    () => ({ language, locale: getLocale(language), setLanguage }),
    [language, setLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
