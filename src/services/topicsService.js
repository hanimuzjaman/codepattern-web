import { httpClient } from './httpClient'

let topicsListCache = null
const topicDetailCache = new Map()

export const topicsService = {
  async fetchTopics({ useCache = true } = {}) {
    if (useCache && topicsListCache) {
      return topicsListCache
    }

    const response = await httpClient.get('/topics')
    topicsListCache = response.data

    return response.data
  },

  async fetchTopicBySlug(slug, { useCache = true } = {}) {
    if (useCache && topicDetailCache.has(slug)) {
      return topicDetailCache.get(slug)
    }

    const response = await httpClient.get(`/topics/${slug}`)
    topicDetailCache.set(slug, response.data)
    return response.data
  },

  async searchTopics(query) {
    const response = await httpClient.get('/topics/search', {
      params: { q: query },
    })
    return response.data
  },

  clearCache() {
    topicsListCache = null
    topicDetailCache.clear()
  },
}
