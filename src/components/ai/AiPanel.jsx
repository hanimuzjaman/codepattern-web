import { useEffect, useMemo, useState } from 'react'
import { aiMentorService } from '../../services/aiMentorService'
import { getUserFacingError } from '../../utils/errorMessage'
import { ActionButtons } from './ActionButtons'
import { AiErrorState } from './AiErrorState'
import { AiLoadingState } from './AiLoadingState'
import { AiResponseCard } from './AiResponseCard'
import { PromptInput } from './PromptInput'

function requestFromAction(action, context, prompt) {
  switch (action) {
    case 'hint':
      return {
        method: aiMentorService.getHint,
        payload: {
          problemSlug: context.problemSlug,
          language: context.language,
          currentCode: context.currentCode,
          userQuestion: prompt,
        },
      }
    case 'explain':
      return {
        method: aiMentorService.explain,
        payload: {
          problemSlug: context.problemSlug,
          question: prompt,
        },
      }
    case 'analyze':
      return {
        method: aiMentorService.analyze,
        payload: {
          sourceCode: context.currentCode,
          language: context.language,
          problemSlug: context.problemSlug,
        },
      }
    case 'mistakes':
      return {
        method: aiMentorService.getMistakes,
        payload: {
          problemSlug: context.problemSlug,
        },
      }
    case 'review':
      return {
        method: aiMentorService.review,
        payload: {
          sourceCode: context.currentCode,
          language: context.language,
          problemSlug: context.problemSlug,
          focusArea: prompt,
        },
      }
    default:
      return null
  }
}

function placeholderForAction(action) {
  if (action === 'hint') {
    return 'Ask for a nudge, not a full solution. Example: Where should I start?'
  }
  if (action === 'explain') {
    return 'Example: Explain the optimal approach and intuition.'
  }
  if (action === 'review') {
    return 'Optional focus. Example: Review readability and edge cases.'
  }
  return 'Optional context to improve the response.'
}

export function AiPanel({ problemSlug, language, currentCode }) {
  const storageKey = useMemo(() => `ai-mentor:${problemSlug}`, [problemSlug])
  const [selectedAction, setSelectedAction] = useState('hint')
  const [prompt, setPrompt] = useState('')
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [lastRequest, setLastRequest] = useState(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(storageKey)
      if (!raw) {
        setHistory([])
        return
      }
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        setHistory(parsed)
      }
    } catch {
      setHistory([])
    }
  }, [storageKey])

  useEffect(() => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(history))
    } catch {
      // Best-effort persistence.
    }
  }, [history, storageKey])

  const context = {
    problemSlug,
    language,
    currentCode,
  }

  const submitAction = async (action) => {
    if (isLoading) {
      return
    }

    setErrorMessage('')
    setIsLoading(true)

    const request = requestFromAction(action, context, prompt)
    setLastRequest({ action, promptSnapshot: prompt })

    if (!request) {
      setIsLoading(false)
      return
    }

    try {
      const response = await request.method(request.payload)
      setHistory((current) => [
        {
          action,
          content: response.content,
          provider: response.provider,
          fallbackUsed: Boolean(response.fallbackUsed),
          generatedAt: response.generatedAt,
        },
        ...current,
      ])
    } catch (error) {
      setErrorMessage(getUserFacingError(error, 'AI mentor is currently unavailable. Please try again.'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = async () => {
    if (!lastRequest) {
      return
    }
    setPrompt(lastRequest.promptSnapshot || '')
    await submitAction(lastRequest.action)
  }

  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">AI Mentor</p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900">Guidance without spoilers</h3>
      </header>

      <ActionButtons selectedAction={selectedAction} onActionChange={setSelectedAction} disabled={isLoading} />

      <PromptInput
        value={prompt}
        onChange={setPrompt}
        disabled={isLoading}
        placeholder={placeholderForAction(selectedAction)}
      />

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => submitAction(selectedAction)}
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Working...' : 'Ask AI Mentor'}
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => setPrompt('')}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Clear
        </button>
      </div>

      {isLoading ? <AiLoadingState /> : null}
      {errorMessage ? <AiErrorState message={errorMessage} onRetry={handleRetry} canRetry={Boolean(lastRequest)} /> : null}

      <div className="space-y-2">
        {!history.length ? (
          <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-slate-600">
            Ask for a hint, explanation, complexity analysis, common mistakes, or a code review.
          </p>
        ) : null}

        {history.map((item, index) => (
          <AiResponseCard key={`${item.action}-${item.generatedAt}-${index}`} item={item} />
        ))}
      </div>
    </section>
  )
}
