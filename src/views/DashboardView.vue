<template>
  <div class="dashboard">
    <header class="header">
      <h1>SmartHome</h1>
      <button @click="handleLogout" class="logout-btn">Выйти</button>
    </header>

    <main class="content">
      <div v-if="flowStore.loading" class="loading">
        Загрузка данных...
      </div>

      <template v-else>
        <SummaryCards v-if="flowStore.summary" :summary="flowStore.summary" />
        <DeviceTable :devices="Object.values(flowStore.sources)" />
      </template>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFlowStore } from '../stores/flowStore.js'
import { useAuthStore } from '../stores/authStore.js'
import SummaryCards from '../components/SummaryCards.vue'
import DeviceTable from '../components/DeviceTable.vue'

const router = useRouter()
const flowStore = useFlowStore()
const authStore = useAuthStore()

//сразу получаем данные
onMounted(() => {
  flowStore.fetchResults()
})

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

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

.loading {
  text-align: center;
  color: #94a3b8;
  margin-top: 4rem;
  font-size: 1.25rem;
}
</style>