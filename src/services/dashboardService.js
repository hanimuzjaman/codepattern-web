import { httpClient } from './httpClient'

export const dashboardService = {
  async fetchDashboardSummary() {
    const response = await httpClient.get('/dashboard/summary')
    return response.data
  },

  async fetchTopicProgress() {
    const response = await httpClient.get('/progress/topics')
    return response.data
  },

  async fetchRecentActivity({ page = 0, size = 10 } = {}) {
    const response = await httpClient.get('/progress/activity', {
      params: { page, size },
    })
    return response.data
  },

  async fetchProgressStats() {
    const response = await httpClient.get('/progress/stats')
    return response.data
  },
}
