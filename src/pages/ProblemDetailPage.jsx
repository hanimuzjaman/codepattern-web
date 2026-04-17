import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DifficultyBadge } from '../components/problems/DifficultyBadge'
import { ProblemsErrorState } from '../components/problems/ProblemsErrorState'
import { ProblemsListSkeleton } from '../components/problems/ProblemsListSkeleton'
import { problemsService } from '../services/problemsService'
import { getUserFacingError } from '../utils/errorMessage'

function normalizeExamples(examples) {
  if (Array.isArray(examples)) {
    return examples
  }
  return []
}

function normalizeStarterCode(starterCode) {
  if (starterCode && typeof starterCode === 'object') {
    return starterCode
  }
  return {}
}

export function ProblemDetailPage() {
  const { slug } = useParams()
  const [problem, setProblem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const loadProblem = useCallback(async ({ useCache = true } = {}) => {
    if (!slug) {
      setErrorMessage('Problem slug is missing.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const data = await problemsService.fetchProblemBySlug(slug, { useCache })
      setProblem(data)
    } catch (error) {
      setErrorMessage(getUserFacingError(error, 'Unable to load this problem right now.'))
    } finally {
      setIsLoading(false)
    }
  }, [slug])

  useEffect(() => {
    loadProblem({ useCache: true })
  }, [loadProblem])

  if (isLoading) {
    return <ProblemsListSkeleton />
  }

  if (errorMessage) {
    return (
      <ProblemsErrorState
        message={errorMessage}
        onRetry={() => loadProblem({ useCache: false })}
      />
    )
  }

  if (!problem) {
    return <ProblemsErrorState message="Problem data is unavailable." onRetry={() => loadProblem({ useCache: false })} />
  }

  const examples = normalizeExamples(problem.examples)
  const starterCode = normalizeStarterCode(problem.starterCode)

  return (
    <section className="space-y-4">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-3xl font-bold text-slate-900">{problem.title}</h2>
          <DifficultyBadge difficulty={problem.difficulty} />
          <span className="rounded-md bg-cyan-100 px-2 py-1 text-xs font-semibold text-cyan-800">
            {problem.topic?.name}
          </span>
        </div>

        <p className="mt-3 text-slate-600">{problem.shortDescription}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {problem.tags?.map((tag) => (
            <span key={tag.slug} className="rounded border border-slate-300 bg-slate-50 px-2 py-1 text-xs text-slate-700">
              {tag.name}
            </span>
          ))}
        </div>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Problem Statement</h3>
        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">{problem.description}</p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Constraints</h3>
        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">{problem.constraintsText}</p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Examples</h3>
        <div className="mt-3 space-y-3">
          {examples.length === 0 ? <p className="text-sm text-slate-600">No examples available.</p> : null}
          {examples.map((item, index) => (
            <article key={index} className="rounded border border-slate-200 bg-slate-50 p-3 text-sm">
              <p><strong>Input:</strong> {item.input}</p>
              <p className="mt-1"><strong>Output:</strong> {item.output}</p>
              {item.explanation ? <p className="mt-1 text-slate-600">{item.explanation}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Starter Code</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {Object.entries(starterCode).map(([language, snippet]) => (
            <article key={language} className="rounded border border-slate-200 bg-slate-50 p-3">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{language}</h4>
              <pre className="overflow-auto whitespace-pre-wrap text-xs text-slate-700">{String(snippet)}</pre>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/problems" className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Back to Problems
          </Link>
          {problem.topic?.slug ? (
            <Link to={`/topics/${problem.topic.slug}`} className="rounded-md border border-cyan-300 px-3 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-50">
              Related Topic
            </Link>
          ) : null}
          <Link
            to={`/problems/${problem.slug}/solve`}
            className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Solve Now
          </Link>
        </div>
      </section>
    </section>
  )
}
