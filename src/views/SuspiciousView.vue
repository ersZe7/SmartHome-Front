<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSuspiciousStore } from '../stores/suspiciousStore.js'
import { useAuthStore } from '../stores/authStore.js'

const router = useRouter()
const store = useSuspiciousStore()
const authStore = useAuthStore()

const filters = ref({
  src_ip: '',
  src_mac: '',
  label: ''
})

onMounted(() => {
  store.fetchPackets()
})

function applyFilters() {
  // Убираем пустые фильтры перед отправкой
  const activeFilters = Object.fromEntries(
    Object.entries(filters.value).filter(([_, v]) => v !== '')
  )
  store.fetchPackets(activeFilters)
}

function resetFilters() {
  filters.value = { src_ip: '', src_mac: '', label: '' }
  store.fetchPackets()
}

async function handleLabelChange(packetId, newLabel) {
  await store.updateLabel(packetId, newLabel)
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>



<template>
  <div class="dashboard">
    <header class="header">
      <h1>SmartHome</h1>
      <div class="header-right">
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/settings" class="nav-link">Settings</router-link>
        <button @click="handleLogout" class="logout-btn">Logout</button>
      </div>
    </header>

    <main class="content">
      <h2 class="page-title">Suspicious packages</h2>

      
      <div class="filters">
        <input v-model="filters.src_ip" placeholder="Фильтр по IP" />
        <input v-model="filters.src_mac" placeholder="Фильтр по MAC" />
        <select v-model="filters.label">
          <option value="">All tags</option>
          <option value="PENDING">PENDING</option>
          <option value="BENIGN">BENIGN</option>
          <option value="ATTACK">ATTACK</option>
        </select>
        <button @click="applyFilters" class="filter-btn">Search</button>
        <button @click="resetFilters" class="reset-btn">Reset</button>
      </div>

      <div v-if="store.loading" class="loading">Loading...</div>

      <div v-else class="table-container">
        <table>
          <thead>
            <tr>
              <th>Source IP</th>
              <th>Source MAC</th>
              <th>Destination MAC</th>
              <th>Probability</th>
              <th>Label</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="packet in store.packets" :key="packet.id">
              <td>{{ packet.src_ip }}</td>
              <td>{{ packet.src_mac }}</td>
              <td>{{ packet.dst_mac }}</td>
              <td>{{ (packet.probability * 100).toFixed(1) }}%</td>
              <td>
                <span :class="['badge', packet.label.toLowerCase()]">
                  {{ packet.label }}
                </span>
              </td>
              <td>
                <select
                  :value="packet.label"
                  @change="handleLabelChange(packet.id, $event.target.value)"
                  class="label-select"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="BENIGN">BENIGN</option>
                  <option value="ATTACK">ATTACK</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <p v-if="store.packets.length === 0" class="empty">
          Packages not found
        </p>
      </div>
    </main>
  </div>
</template>


<style scoped>
.dashboard {
  min-height: 100vh;
  background: #0f172a;
  color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #1e293b;
  border-bottom: 1px solid #334155;
}

h1 {
  color: #38bdf8;
  font-size: 1.5rem;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.875rem;
}

.nav-link:hover {
  color: white;
}

.logout-btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #334155;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  font-size: 0.875rem;
}

.logout-btn:hover {
  background: #334155;
  color: white;
}

.content {
  padding: 2rem;
}

.page-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: white;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filters input,
.filters select {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #1e293b;
  color: white;
  font-size: 0.875rem;
}

.filter-btn {
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  border: none;
  background: #38bdf8;
  color: #0f172a;
  font-weight: bold;
  cursor: pointer;
}

.reset-btn {
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  border: 1px solid #334155;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
}

.table-container {
  background: #1e293b;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #334155;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  color: #94a3b8;
  font-size: 0.875rem;
  padding: 0.75rem;
  border-bottom: 1px solid #334155;
}

td {
  padding: 0.75rem;
  color: white;
  border-bottom: 1px solid #334155;
}

tr:last-child td {
  border-bottom: none;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge.pending {
  background: #1e3a5f;
  color: #60a5fa;
}

.badge.benign {
  background: #166534;
  color: #86efac;
}

.badge.attack {
  background: #7f1d1d;
  color: #f87171;
}

.label-select {
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #0f172a;
  color: white;
  font-size: 0.875rem;
  cursor: pointer;
}

.loading {
  text-align: center;
  color: #94a3b8;
  margin-top: 4rem;
  font-size: 1.25rem;
}

.empty {
  text-align: center;
  color: #94a3b8;
  padding: 2rem;
}
</style>