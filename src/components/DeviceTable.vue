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
        <h2>Устройства в сети</h2>
        <table>
            <thead>
                <tr>
                    <th>MAC Address</th>
                    <th>Flows</th>
                    <th>Thread Probability</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="device in devices" :key="device.src_mac">
                    <td>{{ device.src_mac }}</td>
                    <td>{{ device.flow_count }}</td>
                    <td>{{ (device.max_probability * 100).toFixed(1) }}%</td>
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
    background: #1e293b;
    border-radius: 12px;
    padding: 1.5rem;
    border: 1px solid #334155
}

h2{
    color: white;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th{
    text-align: left;
    color: #94a3b8;
    font-size: 0.875rem;
    padding: 0.75rem;
    border-bottom: 1px solid #334155;
}

tr:last-child td {
    border-bottom: none;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.badge.normal {
  background: #166534;
  color: #86efac;
}

.badge.suspicious {
  background: #78350f;
  color: #fbbf24;
}

.badge.anomaly {
  background: #7f1d1d;
  color: #f87171;
}

</style>