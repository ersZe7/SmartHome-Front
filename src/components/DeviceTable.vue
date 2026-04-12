<script setup>
const props = defineProps({
  devices: {
    type: Array,
    default: () => []
  },
  sources: {
    type: Object,
    default: () => ({})
  }
})

function getMlData(mac) {
  if (!props.sources) return null
  return Object.values(props.sources).find(s => 
    s.src_mac?.toLowerCase() === mac?.toLowerCase()
  ) || null
}

function getProbColor(prob) {
  if (prob >= 0.7) return '#ef4444'
  if (prob >= 0.4) return '#f59e0b'
  return '#22c55e'
}
</script>


<template>
  <div class="table-container">
    <h2>Devices in Network <span class="count">{{ devices.length }} devices</span></h2>

    <div v-if="devices.length === 0" class="empty">
      No devices online
    </div>

    <table v-else>
      <thead>
        <tr>
          <th>MAC Address</th>
          <th>IP Address</th>
          <th>Flows</th>
          <th>Threat Probability</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in devices" :key="device.mac">
          <td>{{ device.mac }}</td>
          <td>{{ device.ip }}</td>
          <td>{{ getMlData(device.mac)?.flow_count ?? '—' }}</td>
          <td>
            <div v-if="getMlData(device.mac)" class="prob-bar">
              <div class="prob-fill" :style="{ width: (getMlData(device.mac).max_probability * 100) + '%', background: getProbColor(getMlData(device.mac).max_probability) }"></div>
              <span class="prob-text">{{ (getMlData(device.mac).max_probability * 100).toFixed(1) }}%</span>
            </div>
            <span v-else>—</span>
          </td>
          <td>
            <span v-if="getMlData(device.mac)" :class="['badge', getMlData(device.mac).status]">
              {{ getMlData(device.mac).status }}
            </span>
            <span v-else class="badge normal">Online</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>
.table-container {
  background: white;
  border-radius: 18px;
  padding: 1.5rem;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 2px 20px rgba(0,0,0,0.04);
}

h2 {
  color: #1d1d1f;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.count {
  font-size: 0.8rem;
  color: #6e6e73;
  font-weight: 400;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  color: #6e6e73;
  font-size: 0.8rem;
  padding: 0.75rem;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  font-weight: 500;
}

td {
  padding: 0.75rem;
  color: #1d1d1f;
  border-bottom: 1px solid rgba(0,0,0,0.04);
  font-size: 0.9rem;
}

tr:last-child td { border-bottom: none; }
tr:hover td { background: #f5f5f7; }

.prob-bar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.prob-fill {
  height: 6px;
  border-radius: 999px;
  width: 80px;
  background: #22c55e;
  transition: width 0.3s;
}

.prob-text {
  font-size: 0.8rem;
  color: #6e6e73;
  min-width: 40px;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.badge.normal { background: #dcfce7; color: #16a34a; }
.badge.suspicious { background: #fef9c3; color: #ca8a04; }
.badge.anomaly { background: #fee2e2; color: #dc2626; }

.empty {
  text-align: center;
  color: #6e6e73;
  padding: 2rem;
  font-size: 0.9rem;
}
</style>