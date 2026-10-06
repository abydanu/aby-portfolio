import { en } from './en'
import { id } from './id'
import type { Language, Locale } from './types'

export type { Language, Locale } from './types'

const locales: Record<Language, Locale> = { en, id }

export function getLocale(language: Language): Locale {
  return locales[language]
}

export const STORAGE_KEY = 'language'

export function readStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'id') return stored
  } catch {
    /* ignore */
  }
  return 'en'
}

export function storeLanguage(language: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, language)
  } catch {
    /* ignore */
  }
}
