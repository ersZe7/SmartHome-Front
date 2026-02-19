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
      summary.value = {
        total_flows: 143,
        total_sources: 5,
        anomalous_sources: 1,
        suspicious_sources: 2
      }
      sources.value = {
        'AA:BB:CC:11:22:33': {
          src_mac: 'AA:BB:CC:11:22:33',
          flow_count: 45,
          max_probability: 0.91,
          alert_flows: 3,
          status: 'anomaly'
        },
        'AA:BB:CC:44:55:66': {
          src_mac: 'AA:BB:CC:44:55:66',
          flow_count: 30,
          max_probability: 0.55,
          alert_flows: 0,
          status: 'suspicious'
        },
        'AA:BB:CC:77:88:99': {
          src_mac: 'AA:BB:CC:77:88:99',
          flow_count: 68,
          max_probability: 0.12,
          alert_flows: 0,
          status: 'normal'
        }
      }
    } finally {
      loading.value = false
    }
  }

  return { summary, sources, loading, error, fetchResults }
})