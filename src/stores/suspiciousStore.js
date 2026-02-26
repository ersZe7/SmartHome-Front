import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSuspiciousPackets, updatePacketLabel as updateLabelApi } from '../api/suspicious.js'

export const useSuspiciousStore = defineStore('suspicious', () => {
  const packets = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchPackets(filters = {}) {
    loading.value = true
    error.value = null

    try {
      const response = await getSuspiciousPackets(filters)
      packets.value = response.data
    } catch (e) {
      error.value = 'Failed to load data'
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  async function updateLabel(packetId, label) {
    try {
      await updateLabelApi(packetId, label)
      const packet = packets.value.find(p => p.id === packetId)
      if (packet) packet.label = label
    } catch (e) {
      console.error('Error updating label', e)
    }
  }

  return { packets, loading, error, fetchPackets, updateLabel }
})