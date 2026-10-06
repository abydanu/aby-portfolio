# Aby Danu — AI-native portfolio

The portfolio *is* the conversation. Nothing is shown until it is asked for.

    npm install
    npm run dev      # http://localhost:5173
    npm run build

## How it works

    prompt → parseIntent → generateResponse → AIResponse { text, blocks, followUps } → UI

| Layer | Where |
| --- | --- |
| Portfolio data | `src/data/*` (edit content here) |
| Conversation copy + follow-ups | `src/data/responses.ts` |
| Intent detection | `src/utils/intentParser.ts` |
| Response generation | `src/utils/responseGenerator.ts` |
| Engine interface | `src/services/assistant.ts` |
| Conversation state | `src/hooks/useAIConversation.ts` |
| UI | `src/components/*` |

Every entry point (typing, suggestion chips, project rows, follow-ups) sends a prompt string through the
same path, so clicking a button is identical to typing it.

## Swapping in a real LLM

Implement `AssistantEngine` (`src/services/assistant.ts`) so `respond(prompt, history)` returns an
`AIResponse`, then pass it to `useAIConversation(engine)` in `App.tsx`. The UI renders the structured
`blocks`, so have the model return that JSON shape (or map its output to it). Nothing else changes.

## Adding things

- **Project links:** add `github` / `live` to a project in `src/data/projects.ts`; buttons appear automatically.
- **New project:** add an entry (with `aliases`); it is picked up by lists, filters and "Tell me more about …".
- **Shareable sessions:** the URL hash (`#s=…`) stores the prompts, so a conversation can be replayed from a link.
