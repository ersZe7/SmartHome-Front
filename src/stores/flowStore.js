import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getResults } from '../api/flows.js'

export const useFlowStore = defineStore('flow', () => {
  const summary = ref(null)
  const sources = ref({})
  const loading = ref(false)
  const error = ref(null)

  async function fetchResults() {
    loading.value = true
    error.value = null

    try {
      const response = await getResults()
      summary.value = response.data.summary
      sources.value = response.data.sources
    } catch (e) {
      error.value = 'Failed to load data'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  return { summary, sources, loading, error, fetchResults }
})