import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FilterBar } from '../components/problems/FilterBar'
import { ProblemCard } from '../components/problems/ProblemCard'
import { ProblemsEmptyState } from '../components/problems/ProblemsEmptyState'
import { ProblemsErrorState } from '../components/problems/ProblemsErrorState'
import { ProblemsListSkeleton } from '../components/problems/ProblemsListSkeleton'
import { ProblemsPagination } from '../components/problems/ProblemsPagination'
import { SearchInput } from '../components/problems/SearchInput'
import { problemsService } from '../services/problemsService'
import { topicsService } from '../services/topicsService'
import { getUserFacingError } from '../utils/errorMessage'

const DEFAULT_PAGE_SIZE = 12

function readFilters(searchParams) {
  return {
    page: Number(searchParams.get('page') || 0),
    size: Number(searchParams.get('size') || DEFAULT_PAGE_SIZE),
    topic: searchParams.get('topic') || '',
    difficulty: searchParams.get('difficulty') || '',
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'displayOrder,asc',
  }
}

export function ProblemsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [topics, setTopics] = useState([])
  const [problemsPage, setProblemsPage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchInput, setSearchInput] = useState(readFilters(searchParams).search)

  const filters = useMemo(() => readFilters(searchParams), [searchParams])

  const updateFilters = useCallback((next) => {
    const merged = {
      ...filters,
      ...next,
    }

    const params = new URLSearchParams()
    params.set('page', String(Math.max(0, merged.page)))
    params.set('size', String(merged.size || DEFAULT_PAGE_SIZE))

    if (merged.topic) params.set('topic', merged.topic)
    if (merged.difficulty) params.set('difficulty', merged.difficulty)
    if (merged.search) params.set('search', merged.search)
    if (merged.sort && merged.sort !== 'displayOrder,asc') params.set('sort', merged.sort)

    setSearchParams(params, { replace: true })
  }, [filters, setSearchParams])

  const loadProblems = useCallback(async ({ useCache = true } = {}) => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const [topicsResult, problemsResult] = await Promise.all([
        topicsService.fetchTopics({ useCache }),
        problemsService.fetchProblems(filters, { useCache }),
      ])

      setTopics(topicsResult)
      setProblemsPage(problemsResult)
    } catch (error) {
      setErrorMessage(getUserFacingError(error, 'Unable to load problems right now.'))
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  useEffect(() => {
    loadProblems({ useCache: true })
  }, [loadProblems])

  useEffect(() => {
    const handle = setTimeout(() => {
      if (searchInput !== filters.search) {
        updateFilters({ search: searchInput.trim(), page: 0 })
      }
    }, 350)

    return () => clearTimeout(handle)
  }, [searchInput, filters.search, updateFilters])

  return (
    <section className="space-y-4">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">Practice Workspace</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">DSA Problems</h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          Browse interview-style problems by topic and difficulty, then open a detailed statement before solving.
        </p>
        <div className="mt-4">
          <SearchInput value={searchInput} onChange={setSearchInput} />
        </div>
      </header>

      <FilterBar
        topic={filters.topic}
        difficulty={filters.difficulty}
        topics={topics}
        onTopicChange={(topic) => updateFilters({ topic, page: 0 })}
        onDifficultyChange={(difficulty) => updateFilters({ difficulty, page: 0 })}
        onReset={() => {
          setSearchInput('')
          updateFilters({
            page: 0,
            size: DEFAULT_PAGE_SIZE,
            topic: '',
            difficulty: '',
            search: '',
            sort: 'displayOrder,asc',
          })
        }}
      />

      {isLoading ? <ProblemsListSkeleton /> : null}

      {!isLoading && errorMessage ? (
        <ProblemsErrorState
          message={errorMessage}
          onRetry={() => loadProblems({ useCache: false })}
        />
      ) : null}

      {!isLoading && !errorMessage && problemsPage?.items?.length === 0 ? (
        <ProblemsEmptyState message="Try changing filters or search terms to find matching problems." />
      ) : null}

      {!isLoading && !errorMessage && problemsPage?.items?.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problemsPage.items.map((problem) => (
              <ProblemCard key={problem.slug} problem={problem} />
            ))}
          </div>

          <ProblemsPagination
            page={problemsPage.page}
            totalPages={problemsPage.totalPages}
            onPageChange={(page) => updateFilters({ page })}
          />
        </>
      ) : null}
    </section>
  )
}
