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
      // Мок данные 
      packets.value = [
        {
          id: 1,
          user_id: 1,
          src_ip: '192.168.1.105',
          src_mac: 'AA:BB:CC:11:22:33',
          dst_mac: 'FF:EE:DD:CC:BB:AA',
          probability: 0.91,
          label: 'PENDING',
          rate: 1500,
          time_to_live: 64,
          ack_flag_number: 0.8,
          psh_flag_number: 0.3,
          https: 0,
          header_length: 40,
          variance: 120,
          max: 1500,
          tot_sum: 45000,
          std: 10,
          min: 40,
          dns: 0
        },
        {
          id: 2,
          user_id: 1,
          src_ip: '192.168.1.110',
          src_mac: 'AA:BB:CC:44:55:66',
          dst_mac: 'FF:EE:DD:CC:BB:AA',
          probability: 0.55,
          label: 'BENIGN',
          rate: 800,
          time_to_live: 128,
          ack_flag_number: 0.5,
          psh_flag_number: 0.1,
          https: 1,
          header_length: 20,
          variance: 50,
          max: 800,
          tot_sum: 24000,
          std: 5,
          min: 20,
          dns: 1
        }
      ]
    } finally {
      loading.value = false
    }
  }

  async function updateLabel(packetId, label) {
    try {
      await updateLabelApi(packetId, label)
      // Обновляем локально без перезагрузки
      const packet = packets.value.find(p => p.id === packetId)
      if (packet) packet.label = label
    } catch (e) {
      console.error('Ошибка обновления метки', e)
    }
  }

  return { packets, loading, error, fetchPackets, updateLabel }
})