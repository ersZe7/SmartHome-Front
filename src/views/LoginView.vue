<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
    error.value = ''
    loading.value = true
    console.log('handleLogin called', email.value, password.value) 

    try {
        await authStore.login(email.value, password.value)
        router.push('/dashboard')
    } catch(e) {
        error.value = "Invalid Email or password"
    } finally {
        loading.value = false
    }
}

</script>


<template>
    <div class="login-container">
        <div class="login-box">
            <h1>SentinelIoT</h1>
            <p>Monitoring of Smart Homes</p>

            <div class="form">
                <input
                v-model="email"
                type="email"
                placeholder="Email"
                />

                <input
                v-model="password"
                type="password"
                placeholder="Password"
                />

                <p v-if="error" class="error">{{ error }}</p>

                <button @click="handleLogin" :disabled="loading">
                    {{ loading ? 'Signing in...' : 'Sign In' }}
                </button>
                
                <p class="link">
                    <span @click="router.push('/forgot-password')">Forgot password?</span>
                </p>

                <p class="link">
                    Don't have an account?
                    <span @click="router.push('/register')">Sign Up</span>
                </p>
            </div>
        </div>
    </div>
    </template>


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
</style>