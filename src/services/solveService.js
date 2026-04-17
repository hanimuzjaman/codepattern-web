import { httpClient } from './httpClient'

export const solveService = {
  async runCode(payload) {
    const response = await httpClient.post('/submissions/run', payload)
    return response.data
  },

  async submitCode(payload) {
    const response = await httpClient.post('/submissions/submit', payload)
    return response.data
  },

  async saveDraft(payload) {
    const response = await httpClient.post('/codes/save', payload)
    return response.data
  },

  async loadDraft(problemSlug, language) {
    const response = await httpClient.get(`/codes/${problemSlug}`, {
      params: { language },
    })

    return response.data
  },
}