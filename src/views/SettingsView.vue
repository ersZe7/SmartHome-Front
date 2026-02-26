<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'
import { updateTelegramId } from '../api/users.js'

const router = useRouter()
const authStore = useAuthStore()

const telegramId = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

async function handleSave() {
  error.value = ''
  success.value = ''

  if (!telegramId.value.trim()) {
    error.value = 'Please enter your Telegram ID'
    return
  }

  loading.value = true

  try {
    await updateTelegramId(telegramId.value.trim())
    success.value = 'Telegram ID saved successfully!'
  } catch (e) {
    error.value = e.response?.data?.detail || 'Error saving Telegram ID'
  } finally {
    loading.value = false
  }
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
        <button @click="handleLogout" class="logout-btn">Sign Out</button>
      </div>
    </header>

    <main class="content">
      <h2 class="page-title">Settings</h2>

      <div class="settings-box">
        <h3>Telegram Notifications</h3>
        <p class="description">
          Connect your Telegram to receive alerts when anomalies are detected in your network.
        </p>

        <div class="form">
          <input
            v-model="telegramId"
            type="text"
            placeholder="Your Telegram ID (e.g. 123456789)"
          />

          <p v-if="error" class="error">{{ error }}</p>
          <p v-if="success" class="success">{{ success }}</p>

          <button @click="handleSave" :disabled="loading">
            {{ loading ? 'Saving...' : 'Save' }}
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
  max-width: 600px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: #1d1d1f;
  margin-bottom: 1.5rem;
}

.settings-box {
  background: white;
  border-radius: 18px;
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
}

h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1d1d1f;
}

.description {
  color: #6e6e73;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
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
  transition: border-color 0.2s;
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
  transition: background 0.2s;
}

button:hover {
  background: #3d3d3f;
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

.hint {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
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

.hint strong {
  color: #0071e3;
}

.hint a {
  color: #0071e3;
  text-decoration: none;
}

.hint a:hover {
  text-decoration: underline;
}
</style>