<template>
  <div class="login-container">
    <div class="login-box">
      <div class="back-link" @click="router.push('/')">← Back to Home</div>
      <h1>SentinelIoT</h1>

      <div v-if="step === 1">
        <p>Create account</p>
        <div class="form">
          <input v-model="email" type="email" placeholder="Email" />
          <p v-if="error" class="error">{{ error }}</p>
          <button @click="handleSendCode" :disabled="loading">
            {{ loading ? 'Sending...' : 'Send Code' }}
          </button>
          <p class="link">
            Already have an account?
            <span @click="router.push('/login')">Sign In</span>
          </p>
        </div>
      </div>

      <div v-if="step === 2">
        <p>Enter the code sent to {{ email }}</p>
        <div class="form">
          <input v-model="code" type="text" placeholder="Verification Code" />
          <input v-model="password" type="password" placeholder="Password" />
          <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
          <p v-if="error" class="error">{{ error }}</p>
          <p v-if="success" class="success">{{ success }}</p>
          <button @click="handleRegister" :disabled="loading">
            {{ loading ? 'Creating...' : 'Sign Up' }}
          </button>
          <p class="link">
            <span @click="step = 1">← Back</span>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sendCode, register } from '../api/auth.js'

const router = useRouter()

const step = ref(1)
const email = ref('')
const code = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

async function handleSendCode() {
  error.value = ''
  if (!email.value.trim()) {
    error.value = 'Please enter your email'
    return
  }
  loading.value = true
  try {
    await sendCode(email.value)
    step.value = 2
  } catch (e) {
    error.value = e.response?.data?.detail || 'Error sending code'
  } finally {
    loading.value = false
  }
}

async function handleRegister() {
  error.value = ''
  success.value = ''

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  loading.value = true
  try {
    await register(email.value, code.value, password.value)
    success.value = 'Account created! Redirecting...'
    setTimeout(() => router.push('/login'), 1500)
  } catch (e) {
    error.value = e.response?.data?.detail || 'Registration error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fbfbfd;
  font-family: -apple-system, 'SF Pro Display', 'Inter', sans-serif;
}

.login-box {
  background: white;
  padding: 3rem 2.5rem;
  border-radius: 18px;
  width: 100%;
  max-width: 600px;
  text-align: center;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.08);
}

h1 {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
}

p {
  color: #6e6e73;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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
  margin-top: 0.5rem;
  font-family: inherit;
  transition: background 0.2s;
}

button:hover { background: #3d3d3f; }
button:disabled { opacity: 0.5; cursor: not-allowed; }

.error { color: #ff3b30; margin: 0; font-size: 0.875rem; }
.success { color: #34c759; margin: 0; font-size: 0.875rem; }

.link {
  margin: 0;
  font-size: 0.875rem;
  color: #6e6e73;
}

.link span {
  color: #0071e3;
  cursor: pointer;
  font-weight: 500;
}

.link span:hover {
text-decoration: underline;
}


.back-link {
  color: #6e6e73;
  font-size: 0.875rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  text-align: left;
}

.back-link:hover {
  color: #1d1d1f;
}
</style>