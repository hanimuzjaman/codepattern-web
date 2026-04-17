import { httpClient } from './httpClient'

const listCache = new Map()
const detailCache = new Map()

function buildListCacheKey(params) {
  const normalized = {
    page: params.page ?? 0,
    size: params.size ?? 12,
    topic: params.topic || '',
    difficulty: params.difficulty || '',
    search: params.search || '',
    sort: params.sort || 'displayOrder,asc',
  }

  return JSON.stringify(normalized)
}

export const problemsService = {
  async fetchProblems(params = {}, { useCache = true } = {}) {
    const key = buildListCacheKey(params)

    if (useCache && listCache.has(key)) {
      return listCache.get(key)
    }

    const response = await httpClient.get('/problems', {
      params: {
        page: params.page ?? 0,
        size: params.size ?? 12,
        topic: params.topic || undefined,
        difficulty: params.difficulty || undefined,
        search: params.search || undefined,
        sort: params.sort || 'displayOrder,asc',
      },
    })

    listCache.set(key, response.data)
    return response.data
  },

  async fetchProblemBySlug(slug, { useCache = true } = {}) {
    const normalizedSlug = String(slug || '').trim().toLowerCase()

    if (useCache && detailCache.has(normalizedSlug)) {
      return detailCache.get(normalizedSlug)
    }

    const response = await httpClient.get(`/problems/${normalizedSlug}`)
    detailCache.set(normalizedSlug, response.data)

    return response.data
  },

  clearCache() {
    listCache.clear()
    detailCache.clear()
  },
}
