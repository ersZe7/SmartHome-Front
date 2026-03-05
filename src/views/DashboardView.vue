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
  router.push('/')
}
</script>


<template>
  <div class="dashboard">
    <header class="header">
      <h1>SentinelIoT</h1>
      <div class="header-right">
        <router-link 
        v-if="authStore.isAdmin" 
        to="/suspicious" 
        class="nav-link"
        >Suspicious</router-link>
        <router-link to="/profile" class="nav-link">Profile</router-link>
        <button @click="handleLogout" class="logout-btn">Sign Out</button>
      </div>
    </header>

    <main class="content">
      <div v-if="flowStore.loading" class="loading">
        Loading...
      </div>

      <template v-else>
        <SummaryCards v-if="flowStore.summary" :summary="flowStore.summary" />
        <DeviceTable :devices="Object.values(flowStore.sources)" />
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
  background: #f5f5f7;
}

.content {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.loading {
  text-align: center;
  color: #6e6e73;
  margin-top: 4rem;
  font-size: 1rem;
}

</style>