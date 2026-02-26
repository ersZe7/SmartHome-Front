<script setup>
defineProps({
  devices: {
    type: Array,
    required: true
  }
})

function statusLabel(status) {
  const labels = {
    normal: 'Normal',
    suspicious: 'Suspicious',
    anomaly: 'Anomaly'
  }
  return labels[status] || status
}
</script>



<template>
  <div class="table-container">
    <div class="table-header">
      <h2>Devices in Network</h2>
      <span class="device-count">{{ devices.length }} devices</span>
    </div>
    <table>
      <thead>
        <tr>
          <th>MAC Address</th>
          <th>Flows</th>
          <th>Threat Probability</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in devices" :key="device.src_mac">
          <td class="mac">{{ device.src_mac }}</td>
          <td>{{ device.flow_count }}</td>
          <td>
            <div class="probability">
              <div class="probability-bar">
                <div
                  class="probability-fill"
                  :style="{ width: (device.max_probability * 100) + '%' }"
                  :class="device.status"
                ></div>
              </div>
              <span>{{ (device.max_probability * 100).toFixed(1) }}%</span>
            </div>
          </td>
          <td>
            <span :class="['badge', device.status]">
              {{ statusLabel(device.status) }}
            </span>
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
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
  font-family: -apple-system, 'SF Pro Display', 'Inter', sans-serif;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

h2 {
  color: #1d1d1f;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.device-count {
  font-size: 0.8rem;
  color: #6e6e73;
  background: #f5f5f7;
  padding: 0.25rem 0.75rem;
  border-radius: 980px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  color: #6e6e73;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f5f5f7;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  padding: 0.85rem 1rem;
  color: #1d1d1f;
  font-size: 0.875rem;
  border-bottom: 1px solid #f5f5f7;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover td {
  background: #fbfbfd;
}

.mac {
  font-family: 'SF Mono', 'Courier New', monospace;
  font-size: 0.9rem;
  color: #3d3d3f;
}

.probability {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.probability-bar {
  width: 80px;
  height: 4px;
  background: #f5f5f7;
  border-radius: 999px;
  overflow: hidden;
}

.probability-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s;
}

.probability-fill.normal { background: #34c759; }
.probability-fill.suspicious { background: #ff9500; }
.probability-fill.anomaly { background: #ff3b30; }

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 980px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge.normal {
  background: #d1fae5;
  color: #065f46;
}

.badge.suspicious {
  background: #fff3cd;
  color: #92400e;
}

.badge.anomaly {
  background: #fee2e2;
  color: #991b1b;
}
</style>