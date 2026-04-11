<script setup>
defineProps({
  devices: {
    type: Array,
    default: () => []
  }
})
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
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="device in devices" :key="device.mac">
          <td>{{ device.mac }}</td>
          <td>{{ device.ip }}</td>
          <td><span class="badge normal">Online</span></td>
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

tr:last-child td {
  border-bottom: none;
}

tr:hover td {
  background: #f5f5f7;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge.normal {
  background: #dcfce7;
  color: #16a34a;
}

.empty {
  text-align: center;
  color: #6e6e73;
  padding: 2rem;
  font-size: 0.9rem;
}
</style>