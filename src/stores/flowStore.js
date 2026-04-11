import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getNetworkDevices, getResults } from '../api/flows.js'

export const useFlowStore = defineStore('flow', () => {
  const devices = ref([])
  const summary = ref(null)
  const sources = ref({})
  const loading = ref(false)
  const error = ref(null)

  async function fetchResults() {
    loading.value = true
    error.value = null

    try {
      const devicesRes = await getNetworkDevices()
      devices.value = devicesRes.data
    } catch (e) {
      console.error('Failed to load devices', e)
    }

    try {
      const flowsRes = await getResults()
      summary.value = flowsRes.data.summary
      sources.value = flowsRes.data.sources
    } catch (e) {
      // нет результатов ML — это нормально
      console.log('No ML results yet')
    } finally {
      loading.value = false
    }
  }

  return { devices, summary, sources, loading, error, fetchResults }
})