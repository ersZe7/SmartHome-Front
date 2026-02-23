<template>
  <div class="dashboard">
    <header class="header">
      <h1>SmartHome</h1>
      <div class="header-right">
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <button @click="handleLogout" class="logout-btn">Logout</button>
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
            <li>Open Telegram and find <strong>@userinfobot</strong></li>
            <li>Send any message to it</li>
            <li>It will reply with your ID</li>
          </ol>
        </div>
      </div>
    </main>
  </div>
</template>

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
  max-width: 600px;
}

.page-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.settings-box {
  background: #1e293b;
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid #334155;
}

h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: white;
}

.description {
  color: #94a3b8;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

input {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #334155;
  background: #0f172a;
  color: white;
  font-size: 1rem;
}

button {
  padding: 0.75rem;
  border-radius: 8px;
  border: none;
  background: #38bdf8;
  color: #0f172a;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: #f87171;
  margin: 0;
}

.success {
  color: #86efac;
  margin: 0;
}

.hint {
  border-top: 1px solid #334155;
  padding-top: 1.5rem;
}

.hint p {
  color: #94a3b8;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.hint ol {
  color: #94a3b8;
  font-size: 0.875rem;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.hint strong {
  color: #38bdf8;
}
</style>