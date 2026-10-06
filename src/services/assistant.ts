import { getLocale, type Locale } from '../i18n'
import type { AIResponse, Message } from '../types'
import { parseIntent } from '../utils/intentParser'
import { generateResponse } from '../utils/responseGenerator'

/**
 * The only seam between the UI and "the brain".
 *
 * To use a real LLM later, implement `respond` so it returns an `AIResponse`
 * (text + structured blocks + follow-ups) and pass it to `useAIConversation`.
 * Nothing in the UI needs to change.
 */
export interface AssistantEngine {
  respond(prompt: string, history: Message[]): Promise<AIResponse>
  /** Optional synchronous path, used to restore a session from the URL hash. */
  respondSync?(prompt: string): AIResponse
}

export function makeLocalEngine(getLocale: () => Locale): AssistantEngine {
  const respondSync = (prompt: string): AIResponse => generateResponse(parseIntent(prompt), getLocale())

  return {
    respondSync,
    respond: async (prompt) => respondSync(prompt),
  }
}

/** Default engine using English. Prefer `makeLocalEngine` with `useLanguage` in the app. */
export const localEngine = makeLocalEngine(() => getLocale('en'))
