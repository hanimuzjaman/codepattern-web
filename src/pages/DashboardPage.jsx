import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ActivityList } from '../components/dashboard/ActivityList'
import { ChartCard } from '../components/dashboard/ChartCard'
import { DashboardSkeleton } from '../components/dashboard/DashboardSkeleton'
import { EmptyDashboardState } from '../components/dashboard/EmptyDashboardState'
import { ProgressBar } from '../components/dashboard/ProgressBar'
import { RecommendationCard } from '../components/dashboard/RecommendationCard'
import { StatCard } from '../components/dashboard/StatCard'
import { useAuth } from '../hooks/useAuth'
import { dashboardService } from '../services/dashboardService'
import { getUserFacingError } from '../utils/errorMessage'

export function DashboardPage() {
  const { user } = useAuth()

  const [summary, setSummary] = useState(null)
  const [topicProgress, setTopicProgress] = useState([])
  const [activityPage, setActivityPage] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const loadDashboard = useCallback(async () => {
    setLoading(true)
    setErrorMessage('')

    const [summaryResult, topicsResult, activityResult, statsResult] = await Promise.allSettled([
      dashboardService.fetchDashboardSummary(),
      dashboardService.fetchTopicProgress(),
      dashboardService.fetchRecentActivity({ page: 0, size: 10 }),
      dashboardService.fetchProgressStats(),
    ])

    const failures = [summaryResult, topicsResult, activityResult, statsResult].filter(
      (result) => result.status === 'rejected',
    )

    if (summaryResult.status === 'fulfilled') {
      setSummary(summaryResult.value)
    }
    if (topicsResult.status === 'fulfilled') {
      setTopicProgress(topicsResult.value)
    }
    if (activityResult.status === 'fulfilled') {
      setActivityPage(activityResult.value)
    }
    if (statsResult.status === 'fulfilled') {
      setStats(statsResult.value)
    }

    if (failures.length === 4) {
      const firstError = failures[0]?.reason
      setErrorMessage(getUserFacingError(firstError, 'Unable to load dashboard right now.'))
    } else if (failures.length > 0) {
      setErrorMessage('Some dashboard panels could not be loaded. Showing available insights.')
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  const isEmptyDashboard = useMemo(() => {
    if (!summary) {
      return false
    }
    return summary.totalAttempts === 0 && summary.solvedCount === 0
  }, [summary])

  const continueProblemSlug = activityPage?.items?.[0]?.problemSlug

  if (loading) {
    return <DashboardSkeleton />
  }

  if (errorMessage && !summary && !topicProgress.length && !activityPage?.items?.length) {
    return (
      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-900">
        <h2 className="text-xl font-semibold">Dashboard unavailable</h2>
        <p className="mt-2 text-sm">{errorMessage}</p>
        <button
          type="button"
          onClick={loadDashboard}
          className="mt-4 rounded-lg bg-rose-700 px-4 py-2 text-white hover:bg-rose-600"
        >
          Retry
        </button>
      </section>
    )
  }

  if (isEmptyDashboard) {
    return (
      <section className="space-y-4">
        <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">Progress Intelligence</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Welcome, {user?.name || 'Learner'}</h2>
          <p className="mt-2 text-slate-600">Your dashboard is prepared. Solve your first problem to unlock performance insights.</p>
        </header>
        <EmptyDashboardState />
      </section>
    )
  }

  return (
    <section className="space-y-5">
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">Progress Intelligence</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Welcome back, {user?.name || 'Learner'}</h2>
        <p className="mt-2 max-w-3xl text-slate-600">
          Track consistency, identify weak topics, and follow clear next actions toward interview readiness.
        </p>
        {errorMessage ? <p className="mt-3 text-sm text-amber-700">{errorMessage}</p> : null}
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Solved" value={summary?.solvedCount ?? 0} hint="Unique accepted problems" accent="emerald" />
        <StatCard label="Accuracy" value={`${summary?.accuracy ?? 0}%`} hint="Accepted / total submissions" accent="cyan" />
        <StatCard label="Current Streak" value={summary?.streak ?? 0} hint="Consecutive active days" accent="amber" />
        <StatCard label="Readiness Score" value={summary?.readinessScore ?? 0} hint="Composite interview readiness" accent="slate" />
      </div>

      <RecommendationCard recommendation={summary?.recommendation} />

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <ChartCard title="Submission Trend" points={stats?.submissionsTimeline || []} />

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-slate-900">Topic Progress</h3>
          <p className="mt-1 text-sm text-slate-500">Focus weakest topics to increase coverage and readiness.</p>
          <div className="mt-4 space-y-3">
            {topicProgress.slice(0, 6).map((topic) => (
              <ProgressBar
                key={topic.topicSlug}
                value={topic.completionPercentage}
                label={topic.topicName}
                subtitle={`${topic.solvedCount}/${topic.totalProblems} solved • ${topic.mastery}`}
              />
            ))}
            {!topicProgress.length ? <p className="text-sm text-slate-500">Topic progress will appear after submissions.</p> : null}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-slate-900">Recent Activity</h3>
          <p className="text-xs text-slate-500">Latest attempts and outcomes</p>
        </div>
        <div className="mt-4">
          <ActivityList items={activityPage?.items || []} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold text-slate-900">Quick Actions</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/topics" className="rounded-lg border border-slate-300 px-4 py-2 text-slate-900 hover:bg-slate-50">
            Go to Topics
          </Link>
          <Link to="/problems" className="rounded-lg border border-slate-300 px-4 py-2 text-slate-900 hover:bg-slate-50">
            Practice Problems
          </Link>
          {continueProblemSlug ? (
            <Link to={`/problems/${continueProblemSlug}/solve`} className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">
              Continue Last Problem
            </Link>
          ) : null}
        </div>
      </section>
    </section>
  )
}
