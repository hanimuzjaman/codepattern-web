import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TopicHeader } from '../components/topics/TopicHeader'
import { ContentSection } from '../components/topics/ContentSection'
import { ErrorState } from '../components/topics/ErrorState'
import { TopicsListSkeleton } from '../components/topics/TopicsListSkeleton'
import { topicsService } from '../services/topicsService'
import { getUserFacingError } from '../utils/errorMessage'

function extractSection(content, title) {
  const marker = `${title}\n`
  const start = content.indexOf(marker)
  if (start === -1) {
    return ''
  }

  const nextHeadings = [
    '\nWhy This Topic Matters\n',
    '\nPattern Recognition Guide\n',
    '\nBrute Force vs Optimal Thinking\n',
    '\nComplexity Notes\n',
    '\nExamples\n',
    '\nCommon Mistakes\n',
    '\nStarter Templates\n',
  ]

  let end = content.length
  for (const heading of nextHeadings) {
    const idx = content.indexOf(heading, start + marker.length)
    if (idx !== -1 && idx < end) {
      end = idx
    }
  }

  return content.slice(start + marker.length, end).trim()
}

export function TopicDetailPage() {
  const { slug } = useParams()
  const [topic, setTopic] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const loadTopic = useCallback(async (useCache = true) => {
    if (!slug) {
      setErrorMessage('Topic slug is missing.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      const data = await topicsService.fetchTopicBySlug(slug, { useCache })
      setTopic(data)
    } catch (error) {
      setErrorMessage(getUserFacingError(error, 'Unable to load this topic right now.'))
    } finally {
      setIsLoading(false)
    }
  }, [slug])

  useEffect(() => {
    loadTopic(true)
  }, [loadTopic])

  const sections = useMemo(() => {
    if (!topic?.fullContent) {
      return null
    }

    return {
      overview: extractSection(topic.fullContent, 'Overview'),
      why: extractSection(topic.fullContent, 'Why This Topic Matters'),
      patterns: extractSection(topic.fullContent, 'Pattern Recognition Guide'),
      bruteVsOptimal: extractSection(topic.fullContent, 'Brute Force vs Optimal Thinking'),
      complexity: extractSection(topic.fullContent, 'Complexity Notes'),
      examples: extractSection(topic.fullContent, 'Examples'),
      mistakes: extractSection(topic.fullContent, 'Common Mistakes'),
      templates: extractSection(topic.fullContent, 'Starter Templates'),
    }
  }, [topic])

  if (isLoading) {
    return <TopicsListSkeleton />
  }

  if (errorMessage) {
    return (
      <ErrorState
        title="Unable to open topic"
        message={errorMessage}
        onRetry={() => loadTopic(false)}
      />
    )
  }

  if (!topic || !sections) {
    return <ErrorState title="Topic unavailable" message="No content available for this topic." />
  }

  return (
    <div className="space-y-4">
      <TopicHeader topic={topic} />

      <ContentSection title="Overview">{sections.overview}</ContentSection>
      <ContentSection title="Why This Topic Matters">{sections.why}</ContentSection>
      <ContentSection title="Pattern Recognition Guide">{sections.patterns}</ContentSection>
      <ContentSection title="Brute Force vs Optimal Thinking">{sections.bruteVsOptimal}</ContentSection>
      <ContentSection title="Complexity Notes">{sections.complexity}</ContentSection>
      <ContentSection title="Examples">{sections.examples}</ContentSection>
      <ContentSection title="Common Mistakes">{sections.mistakes}</ContentSection>
      <ContentSection title="Starter Templates">{sections.templates}</ContentSection>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-600">Ready to apply this knowledge in real coding questions?</p>
        <button
          type="button"
          disabled
          className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          Practice This Topic (Phase 4)
        </button>
        <Link to="/topics" className="ml-3 text-sm font-medium text-cyan-700 hover:text-cyan-600">
          Back to topics
        </Link>
      </div>
    </div>
  )
}
