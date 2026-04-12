<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFlowStore } from '../stores/flowStore.js'
import { useAuthStore } from '../stores/authStore.js'
import DeviceTable from '../components/DeviceTable.vue'
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { getTrafficTimeseries } from '../api/stats.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const router = useRouter()
const flowStore = useFlowStore()
const authStore = useAuthStore()

const groupBy = ref('day')
const chartData = ref(null)
const chartLoading = ref(false)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'top' },
    title: { display: false }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(0,0,0,0.04)' },
      ticks: { color: '#6e6e73' }
    },
    x: {
      grid: { display: false },
      ticks: { color: '#6e6e73' }
    }
  }
}

async function fetchChart() {
  chartLoading.value = true
  try {
    const res = await getTrafficTimeseries(groupBy.value)
    const data = res.data

    const labels = data.map(p => {
      const d = new Date(p.bucket_start)
      if (groupBy.value === 'hour') return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      if (groupBy.value === 'day') return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
      return d.toLocaleDateString([], { month: 'short', day: 'numeric' })
    })

    chartData.value = {
      labels,
      datasets: [
        {
          label: 'Total Flows',
          data: data.map(p => p.total_flows),
          borderColor: '#0071e3',
          backgroundColor: 'rgba(0, 113, 227, 0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 3
        },
        {
          label: 'Anomalous',
          data: data.map(p => p.anomalous_sources),
          borderColor: '#ff3b30',
          backgroundColor: 'rgba(255, 59, 48, 0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 3
        },
        {
          label: 'Suspicious',
          data: data.map(p => p.suspicious_sources),
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.08)',
          fill: true,
          tension: 0.4,
          pointRadius: 3
        }
      ]
    }
  } catch (e) {
    console.error('Failed to load chart data', e)
  } finally {
    chartLoading.value = false
  }
}

onMounted(() => {
  flowStore.fetchResults()
  fetchChart()
})
</script>

<template>
  <div class="dashboard">
    <header class="header">
      <h1>SentinelIoT</h1>
      <div class="header-right">
        <router-link v-if="authStore.isAdmin" to="/suspicious" class="nav-link">Suspicious</router-link>
        <router-link to="/tips" class="nav-link">Tips</router-link>
        <router-link to="/profile" class="nav-link">Profile</router-link>
        <button @click="handleLogout" class="logout-btn">Sign Out</button>
      </div>
    </header>

    <main class="content">
      <div v-if="flowStore.loading" class="loading">Loading...</div>

      <template v-else>
        <div class="chart-card">
          <div class="chart-header">
            <h2>Traffic Overview</h2>
            <div class="chart-tabs">
              <button :class="['tab', groupBy === 'hour' ? 'active' : '']" @click="groupBy = 'hour'; fetchChart()">Hour</button>
              <button :class="['tab', groupBy === 'day' ? 'active' : '']" @click="groupBy = 'day'; fetchChart()">Day</button>
              <button :class="['tab', groupBy === 'week' ? 'active' : '']" @click="groupBy = 'week'; fetchChart()">Week</button>
            </div>
          </div>
          <div class="chart-body">
            <div v-if="chartLoading" class="chart-loading">Loading chart...</div>
            <div v-else-if="!chartData || chartData.labels.length === 0" class="chart-empty">No data yet</div>
            <Line v-else :data="chartData" :options="chartOptions" />
          </div>
        </div>

        <DeviceTable :devices="flowStore.devices" :sources="flowStore.sources" />
      </template>
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

.nav-link:hover { opacity: 1; }

.logout-btn {
  padding: 0.4rem 1rem;
  border-radius: 980px;
  border: 1px solid #d2d2d7;
  background: #1d1d1f;
  color: white;
  cursor: pointer;
  font-size: 0.8rem;
  font-family: inherit;
}

.logout-btn:hover { background: #3d3d3f; }

.content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.loading {
  text-align: center;
  color: #6e6e73;
  margin-top: 4rem;
  font-size: 1rem;
}

.chart-card {
  background: white;
  border-radius: 18px;
  padding: 1.5rem;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 2px 20px rgba(0,0,0,0.04);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.chart-header h2 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1d1d1f;
}

.chart-tabs {
  display: flex;
  gap: 0.25rem;
  background: #f5f5f7;
  padding: 0.25rem;
  border-radius: 8px;
}

.tab {
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  border: none;
  background: transparent;
  color: #6e6e73;
  font-size: 0.8rem;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}

.tab.active {
  background: white;
  color: #1d1d1f;
  font-weight: 500;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.chart-body {
  height: 280px;
}

.chart-loading, .chart-empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6e6e73;
  font-size: 0.9rem;
}
</style>