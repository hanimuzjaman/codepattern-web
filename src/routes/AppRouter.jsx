import { Navigate, Route, Routes } from 'react-router-dom'
import { PublicLayout } from '../layouts/PublicLayout'
import { AppLayout } from '../layouts/AppLayout'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { DashboardPage } from '../pages/DashboardPage'
import { ProfilePage } from '../pages/ProfilePage'
import { TopicsPage } from '../pages/TopicsPage'
import { TopicDetailPage } from '../pages/TopicDetailPage'
import { ProblemsPage } from '../pages/ProblemsPage'
import { ProblemDetailPage } from '../pages/ProblemDetailPage'
import { SolvePage } from '../pages/SolvePage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicOnlyRoute } from './PublicOnlyRoute'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route element={<PublicOnlyRoute />}>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/topics" element={<TopicsPage />} />
          <Route path="/topics/:slug" element={<TopicDetailPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/problems/:slug" element={<ProblemDetailPage />} />
          <Route path="/problems/:slug/solve" element={<SolvePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
