import { useCallback, useEffect, useState } from 'react'
import { topicsService } from '../services/topicsService'
import { getUserFacingError } from '../utils/errorMessage'
import { TopicCard } from '../components/topics/TopicCard'
import { TopicsListSkeleton } from '../components/topics/TopicsListSkeleton'
import { ErrorState } from '../components/topics/ErrorState'
import { EmptyState } from '../components/topics/EmptyState'

export function TopicsPage() {
  const [topics, setTopics] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const loadTopics = useCallback(async (useCache = true) => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const data = await topicsService.fetchTopics({ useCache })
      setTopics(data)
    } catch (error) {
      setErrorMessage(getUserFacingError(error, 'Unable to load topics right now.'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTopics(true)
  }, [loadTopics])

  return (
    <section>
      <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">Learning Path</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">DSA Topics</h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          Build a strong foundation topic by topic before jumping into problem sets.
        </p>
      </header>

      {isLoading ? <TopicsListSkeleton /> : null}

      {!isLoading && errorMessage ? (
        <ErrorState
          title="Failed to load topics"
          message={errorMessage}
          onRetry={() => loadTopics(false)}
        />
      ) : null}

      {!isLoading && !errorMessage && topics.length === 0 ? (
        <EmptyState
          message="No active topics are available yet. Please check back shortly."
        />
      ) : null}

      {!isLoading && !errorMessage && topics.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      ) : null}
    </section>
  )
}
