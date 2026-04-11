<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'
import { updateTelegramId, getTelegramId, getOrangePiId, updateOrangePiId } from '../api/users.js'

const router = useRouter()
const authStore = useAuthStore()

const activeTab = ref('profile')

const telegramId = ref('')
const telegramError = ref('')
const telegramSuccess = ref('')
const telegramLoading = ref(false)

const orangePiId = ref('')
const orangePiError = ref('')
const orangePiSuccess = ref('')
const orangePiLoading = ref(false)

async function handleSaveTelegram() {
  telegramError.value = ''
  telegramSuccess.value = ''
  if (!telegramId.value.trim()) {
    telegramError.value = 'Please enter your Telegram ID'
    return
  }
  telegramLoading.value = true
  try {
    await updateTelegramId(telegramId.value.trim())
    telegramSuccess.value = 'Telegram ID saved successfully!'
  } catch (e) {
    telegramError.value = e.response?.data?.detail || 'Error saving Telegram ID'
  } finally {
    telegramLoading.value = false
  }
}

async function handleSaveOrangePi() {
  orangePiError.value = ''
  orangePiSuccess.value = ''
  if (!orangePiId.value.trim()) {
    orangePiError.value = 'Please enter your Orange Pi ID'
    return
  }
  orangePiLoading.value = true
  try {
    await updateOrangePiId(orangePiId.value.trim())
    orangePiSuccess.value = 'Orange Pi ID saved successfully!'
  } catch (e) {
    orangePiError.value = e.response?.data?.detail || 'Error saving Orange Pi ID'
  } finally {
    orangePiLoading.value = false
  }
}

onMounted(async () => {
  try {
    const res = await getTelegramId()
    telegramId.value = res.data.telegram_user_id || ''
  } catch (e) {
    console.error('Failed to load Telegram ID')
  }
  try {
    const res = await getOrangePiId()
    orangePiId.value = res.data.orange_pi_id || ''
  } catch (e) {
    console.error('Failed to load Orange Pi ID')
  }
})

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="page">
    <header class="header">
      <h1>SentinelIoT</h1>
      <div class="header-right">
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link v-if="authStore.isAdmin" to="/suspicious" class="nav-link">Suspicious</router-link>
        <button @click="handleLogout" class="logout-btn">Sign Out</button>
      </div>
    </header>

    <div class="layout">
      <aside class="sidebar">
        <div class="sidebar-title">Account</div>
        <nav class="sidebar-nav">
          <button :class="['sidebar-item', activeTab === 'profile' ? 'active' : '']" @click="activeTab = 'profile'">Profile Info</button>
          <button :class="['sidebar-item', activeTab === 'telegram' ? 'active' : '']" @click="activeTab = 'telegram'">Telegram</button>
          <button :class="['sidebar-item', activeTab === 'orangepi' ? 'active' : '']" @click="activeTab = 'orangepi'">🍊 Orange Pi</button>
        </nav>
      </aside>

      <main class="content">


        <div v-if="activeTab === 'profile'" class="tab-content">
          <h2>Profile Info</h2>
          <p class="subtitle">Your account information</p>
          <div class="info-card">
            <div class="info-row">
              <span class="info-label">Role</span>
              <span class="info-value">{{ authStore.user?.role || 'USER' }}</span>
            </div>
          </div>
        </div>


        <div v-if="activeTab === 'telegram'" class="tab-content">
          <h2>Telegram Notifications</h2>
          <p class="subtitle">Connect Telegram to receive anomaly alerts powered by Gemini AI</p>
          <div class="card">
            <div class="form">
              <input v-model="telegramId" type="text" placeholder="Your Telegram ID (e.g. 123456789)" />
              <p v-if="telegramId" class="current-id">Current ID: <strong>{{ telegramId }}</strong></p>
              <p v-if="telegramError" class="error">{{ telegramError }}</p>
              <p v-if="telegramSuccess" class="success">{{ telegramSuccess }}</p>
              <button @click="handleSaveTelegram" :disabled="telegramLoading">
                {{ telegramLoading ? 'Saving...' : 'Save' }}
              </button>
            </div>
            <div class="hint">
              <p>How to get your Telegram ID:</p>
              <ol>
                <li>Open Telegram and find <a href="https://t.me/userinfobot" target="_blank">@userinfobot</a></li>
                <li>Send any message to it</li>
                <li>It will reply with your ID</li>
              </ol>
            </div>
          </div>
        </div>


        <div v-if="activeTab === 'orangepi'" class="tab-content">
          <h2>Orange Pi</h2>
          <p class="subtitle">Connect your Orange Pi device to monitor your network</p>
          <div class="card">
            <div class="form">
              <input v-model="orangePiId" type="text" placeholder="Orange Pi ID (e.g. orange-pi-home-1)" />
              <p v-if="orangePiId" class="current-id">Current ID: <strong>{{ orangePiId }}</strong></p>
              <p v-if="orangePiError" class="error">{{ orangePiError }}</p>
              <p v-if="orangePiSuccess" class="success">{{ orangePiSuccess }}</p>
              <button @click="handleSaveOrangePi" :disabled="orangePiLoading">
                {{ orangePiLoading ? 'Saving...' : 'Save' }}
              </button>
            </div>
            <div class="hint">
              <p>Your Orange Pi will use this ID to send network data to SentinelIoT.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #fbfbfd;
  font-family: -apple-system, 'SF Pro Display', 'Inter', sans-serif;
  color: #1d1d1f;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 70px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

h1 { 
  font-size: 1.3rem;
  font-weight: 600;
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
  font-size: 0.95rem;
  opacity: 0.7;
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
}

.layout { 
  display: flex;
  max-width: 900px;
  margin: 2rem auto;
  gap: 2rem;
  padding: 0 2rem;
}

.sidebar {
  width: 200px;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6e6e73;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
  padding-left: 0.75rem;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: #1d1d1f;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s;
}

.sidebar-item:hover {
  background: #f5f5f7;
}

.sidebar-item.active {
  background: #e8e8ed;
  font-weight: 500;
}

.content {
  flex: 1;
}

.tab-content h2 {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: #6e6e73;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.info-card {
  background: white;
  border-radius: 18px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 2px 20px rgba(0,0,0,0.04);
  overflow: hidden;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label { 
  color: #6e6e73;
  font-size: 0.9rem;
}

.info-value { 
  font-weight: 500;
  font-size: 0.9rem;
}

.card { 
  background: white;
  border-radius: 18px;
  padding: 1.5rem;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 2px 20px rgba(0,0,0,0.04);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

input { 
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border: 1px solid #d2d2d7;
  background: #f5f5f7;
  color: #1d1d1f;
  font-size: 0.95rem;
  font-family: inherit;
}

input:focus {
  outline: none;
  border-color: #0071e3;
  background: white;
}

button {
  padding: 0.85rem;
  border-radius: 980px;
  border: none;
  background: #1d1d1f;
  color: white;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error {
  color: #ff3b30;
  margin: 0;
  font-size: 0.875rem;
}

.success {
  color: #34c759;
  margin: 0;
  font-size: 0.875rem;
}

.current-id {
  color: #6e6e73;
  font-size: 0.875rem;
  margin: 0;
}

.hint { 
  border-top: 1px solid rgba(0,0,0,0.06);
  padding-top: 1.5rem;
}

.hint p {
  color: #6e6e73;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.hint ol {
  color: #6e6e73;
  font-size: 0.875rem;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
</style>