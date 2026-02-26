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

const expandedRow = ref(null)

function toggleRow(id) {
  expandedRow.value = expandedRow.value === id ? null : id
}

onMounted(() => {
  store.fetchPackets()
})

function applyFilters() {
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
  router.push('/')
}
</script>

<template>
  <div class="dashboard">
    <header class="header">
      <h1>SentinelIoT</h1>
      <div class="header-right">
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link to="/settings" class="nav-link">Settings</router-link>
        <button @click="handleLogout" class="logout-btn">Sign Out</button>
      </div>
    </header>

    <main class="content">
      <h2 class="page-title">Suspicious Packets</h2>

      <div class="filters">
        <input v-model="filters.src_ip" placeholder="Filter by IP" />
        <input v-model="filters.src_mac" placeholder="Filter by MAC" />
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
            <template v-for="packet in store.packets" :key="packet.id">
              <tr @click="toggleRow(packet.id)" class="main-row">
                <td>{{ packet.src_ip }}</td>
                <td class="mac">{{ packet.src_mac }}</td>
                <td class="mac">{{ packet.dst_mac }}</td>
                <td>{{ (packet.probability * 100).toFixed(1) }}%</td>
                <td>
                  <span :class="['badge', packet.label.toLowerCase()]">
                    {{ packet.label }}
                  </span>
                </td>
                <td @click.stop>
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

              <tr v-if="expandedRow === packet.id" class="expanded-row">
                <td colspan="6">
                  <div class="details-grid">
                    <div class="detail-item">
                      <span class="detail-label">ACK Flag</span>
                      <span class="detail-value">{{ packet.ack_flag_number }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">PSH Flag</span>
                      <span class="detail-value">{{ packet.psh_flag_number }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Rate</span>
                      <span class="detail-value">{{ packet.rate }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Header Length</span>
                      <span class="detail-value">{{ packet.header_length }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">TTL</span>
                      <span class="detail-value">{{ packet.time_to_live }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Variance</span>
                      <span class="detail-value">{{ packet.variance }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Max</span>
                      <span class="detail-value">{{ packet.max }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Min</span>
                      <span class="detail-value">{{ packet.min }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Std</span>
                      <span class="detail-value">{{ packet.std }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Tot Sum</span>
                      <span class="detail-value">{{ packet.tot_sum }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">HTTPS</span>
                      <span class="detail-value">{{ packet.https ? 'Yes' : 'No' }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">DNS</span>
                      <span class="detail-value">{{ packet.dns ? 'Yes' : 'No' }}</span>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
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
  background: #fbfbfd;
  color: #1d1d1f;
  font-family: -apple-system, 'SF Pro Display', 'Inter', sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 70px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

h1 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #1d1d1f;
  letter-spacing: -0.5px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: #1d1d1f;
  text-decoration: none;
  font-size: 1rem;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.nav-link:hover {
  opacity: 1;
}

.logout-btn {
  padding: 0.4rem 1rem;
  border-radius: 980px;
  border: 1px solid #d2d2d7;
  background: #1d1d1f;
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  font-family: inherit;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #3d3d3f;
}

.content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: #1d1d1f;
  margin-bottom: 1.5rem;
}

.filters {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.filters input,
.filters select {
  padding: 0.6rem 1rem;
  border-radius: 10px;
  border: 1px solid #d2d2d7;
  background: #f5f5f7;
  color: #1d1d1f;
  font-size: 0.875rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.filters input:focus,
.filters select:focus {
  outline: none;
  border-color: #0071e3;
  background: white;
}

.filter-btn {
  padding: 0.6rem 1.25rem;
  border-radius: 980px;
  border: none;
  background: #1d1d1f;
  color: white;
  font-weight: 500;
  font-size: 0.875rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
}

.filter-btn:hover {
  background: #3d3d3f;
}

.reset-btn {
  padding: 0.6rem 1.25rem;
  border-radius: 980px;
  border: 1px solid #d2d2d7;
  background: white;
  color: #1d1d1f;
  font-size: 0.875rem;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
}

.reset-btn:hover {
  background: #f5f5f7;
}

.table-container {
  background: white;
  border-radius: 18px;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
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

.main-row {
  cursor: pointer;
}

.main-row:hover td {
  background: #f5f5f7;
}

.expanded-row td {
  background: #f9f9fb;
  padding: 1.5rem;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.7rem;
  color: #6e6e73;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.detail-value {
  font-size: 0.875rem;
  color: #1d1d1f;
  font-weight: 500;
}

.mac {
  font-family: 'SF Mono', 'Courier New', monospace;
  font-size: 0.8rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 980px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge.pending {
  background: #e8f0fe;
  color: #1a56db;
}

.badge.benign {
  background: #d1fae5;
  color: #065f46;
}

.badge.attack {
  background: #fee2e2;
  color: #991b1b;
}

.label-select {
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #d2d2d7;
  background: #f5f5f7;
  color: #1d1d1f;
  font-size: 0.875rem;
  font-family: inherit;
  cursor: pointer;
}

.loading {
  text-align: center;
  color: #6e6e73;
  margin-top: 4rem;
  font-size: 1rem;
}

.empty {
  text-align: center;
  color: #6e6e73;
  padding: 2rem;
}
</style>