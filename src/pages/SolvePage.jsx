import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProblemPanel } from '../components/solve/ProblemPanel'
import { EditorPanel } from '../components/solve/EditorPanel'
import { SolveLoadingState } from '../components/solve/SolveLoadingState'
import { SolveErrorState } from '../components/solve/SolveErrorState'
import { AiPanel } from '../components/ai/AiPanel'
import { problemsService } from '../services/problemsService'
import { solveService } from '../services/solveService'
import { getUserFacingError } from '../utils/errorMessage'
import { buildStarterCodeMap, DEFAULT_TEMPLATES, SOLVE_LANGUAGE_OPTIONS } from '../utils/solveLanguages'

const DEFAULT_LANGUAGE = 'JAVA'
const DEFAULT_THEME = 'vs'

function getWorkspaceStorageKey(slug) {
  return `solve-workspace:${slug}`
}

function readStoredWorkspace(slug) {
  try {
    const raw = sessionStorage.getItem(getWorkspaceStorageKey(slug))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function persistWorkspace(slug, workspace) {
  try {
    sessionStorage.setItem(getWorkspaceStorageKey(slug), JSON.stringify(workspace))
  } catch {
    // Session storage is best-effort.
  }
}

export function SolvePage() {
  const { slug } = useParams()
  const [problem, setProblem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE)
  const [sourceByLanguage, setSourceByLanguage] = useState({})
  const [customInput, setCustomInput] = useState('')
  const [theme, setTheme] = useState(() => localStorage.getItem('solve-theme') || DEFAULT_THEME)
  const [runResult, setRunResult] = useState(null)
  const [submitResult, setSubmitResult] = useState(null)
  const [saveResult, setSaveResult] = useState(null)
  const [activeTab, setActiveTab] = useState('output')
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const loadedDraftLanguagesRef = useRef(new Set())

  const starterCodeMap = useMemo(() => buildStarterCodeMap(problem), [problem])

  useEffect(() => {
    localStorage.setItem('solve-theme', theme)
  }, [theme])

  const hydrateWorkspace = useCallback((nextProblem, storedWorkspace) => {
    const nextSourceMap = {
      ...buildStarterCodeMap(nextProblem),
      ...(storedWorkspace?.sourceByLanguage || {}),
    }

    if (storedWorkspace?.sourceByLanguage) {
      loadedDraftLanguagesRef.current = new Set(Object.keys(storedWorkspace.sourceByLanguage))
    } else {
      loadedDraftLanguagesRef.current = new Set()
    }

    setProblem(nextProblem)
    setSourceByLanguage(nextSourceMap)
    setSelectedLanguage(storedWorkspace?.selectedLanguage || DEFAULT_LANGUAGE)
    setCustomInput(storedWorkspace?.customInput || '')
    setTheme(storedWorkspace?.theme || DEFAULT_THEME)
    setRunResult(null)
    setSubmitResult(null)
    setSaveResult(null)
    setActiveTab('output')
  }, [])

  const loadWorkspace = useCallback(async ({ useCache = true } = {}) => {
    if (!slug) {
      setErrorMessage('Problem slug is missing.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const nextProblem = await problemsService.fetchProblemBySlug(slug, { useCache })
      const storedWorkspace = readStoredWorkspace(slug)
      hydrateWorkspace(nextProblem, storedWorkspace)
    } catch (error) {
      setErrorMessage(getUserFacingError(error, 'Unable to load the solve workspace right now.'))
    } finally {
      setIsLoading(false)
    }
  }, [hydrateWorkspace, slug])

  useEffect(() => {
    loadWorkspace({ useCache: true })
  }, [loadWorkspace])

  useEffect(() => {
    if (!slug) {
      return
    }

    persistWorkspace(slug, {
      selectedLanguage,
      sourceByLanguage,
      customInput,
      theme,
    })
  }, [customInput, selectedLanguage, slug, sourceByLanguage, theme])

  useEffect(() => {
    if (!slug || !problem) {
      return
    }

    if (loadedDraftLanguagesRef.current.has(selectedLanguage)) {
      return
    }

    const loadDraft = async () => {
      try {
        const draft = await solveService.loadDraft(slug, selectedLanguage)
        if (draft?.sourceCode) {
          setSourceByLanguage((current) => ({
            ...current,
            [selectedLanguage]: draft.sourceCode,
          }))
        }
      } catch (error) {
        if (error.status !== 404) {
          setErrorMessage(getUserFacingError(error, 'Unable to load a saved draft for this language.'))
        }
      } finally {
        loadedDraftLanguagesRef.current.add(selectedLanguage)
      }
    }

    loadDraft()
  }, [problem, selectedLanguage, slug])

  const currentSource = sourceByLanguage[selectedLanguage] ?? starterCodeMap[selectedLanguage] ?? DEFAULT_TEMPLATES[selectedLanguage]

  const updateSource = useCallback((nextSource) => {
    setSourceByLanguage((current) => ({
      ...current,
      [selectedLanguage]: nextSource,
    }))
  }, [selectedLanguage])

  const handleRun = useCallback(async () => {
    if (!problem) {
      return
    }

    setIsRunning(true)
    setErrorMessage('')

    try {
      const response = await solveService.runCode({
        problemSlug: problem.slug,
        language: selectedLanguage,
        sourceCode: currentSource,
        customInput,
      })

      setRunResult(response)
      setActiveTab('output')
    } catch (error) {
      setRunResult(null)
      setErrorMessage(getUserFacingError(error, 'Run failed. Please check the code and try again.'))
    } finally {
      setIsRunning(false)
    }
  }, [currentSource, customInput, problem, selectedLanguage])

  const handleSubmit = useCallback(async () => {
    if (!problem) {
      return
    }

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const response = await solveService.submitCode({
        problemSlug: problem.slug,
        language: selectedLanguage,
        sourceCode: currentSource,
      })

      setSubmitResult(response)
      setActiveTab('tests')
    } catch (error) {
      setSubmitResult(null)
      setErrorMessage(getUserFacingError(error, 'Submission failed. Please try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }, [currentSource, problem, selectedLanguage])

  const handleSave = useCallback(async () => {
    if (!problem) {
      return
    }

    setIsSaving(true)
    setErrorMessage('')

    try {
      const response = await solveService.saveDraft({
        problemSlug: problem.slug,
        language: selectedLanguage,
        sourceCode: currentSource,
      })

      setSaveResult(response)
      setActiveTab('saved')
      loadedDraftLanguagesRef.current.add(selectedLanguage)
    } catch (error) {
      setErrorMessage(getUserFacingError(error, 'Draft save failed. Please try again.'))
    } finally {
      setIsSaving(false)
    }
  }, [currentSource, problem, selectedLanguage])

  if (isLoading) {
    return <SolveLoadingState />
  }

  if (errorMessage && !problem) {
    return <SolveErrorState message={errorMessage} onRetry={() => loadWorkspace({ useCache: false })} problemSlug={slug} />
  }

  if (!problem) {
    return <SolveErrorState message="Problem data is unavailable." onRetry={() => loadWorkspace({ useCache: false })} problemSlug={slug} />
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[1.05fr_1fr]">
      <ProblemPanel problem={problem} />

      <div className="space-y-4">
        {errorMessage ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
            {errorMessage}
          </div>
        ) : null}

        <EditorPanel
          language={selectedLanguage}
          languageOptions={SOLVE_LANGUAGE_OPTIONS}
          sourceCode={currentSource}
          onSourceCodeChange={updateSource}
          onLanguageChange={setSelectedLanguage}
          theme={theme}
          onThemeChange={setTheme}
          customInput={customInput}
          onCustomInputChange={setCustomInput}
          onRun={handleRun}
          onSubmit={handleSubmit}
          onSave={handleSave}
          isRunning={isRunning}
          isSubmitting={isSubmitting}
          isSaving={isSaving}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          runResult={runResult}
          submitResult={submitResult}
          saveResult={saveResult}
        />

        <AiPanel
          problemSlug={problem.slug}
          language={selectedLanguage}
          currentCode={currentSource}
        />
      </div>
    </div>
  )
}