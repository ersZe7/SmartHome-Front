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
            <h1>SmartHome</h1>
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
                {{ loading ? 'Вход...' : 'Войти' }}
                </button>

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
    background: #0f172a
}

.login-box {
    background: #1e293b;
    padding: 2rem;
    border-radius: 12px;
    width: 100%;
    max-width: 700px;
    text-align: center;
    color: white
}

h1{
    font-size: 2rem;
    color: #38bdf8;
    margin-bottom: 0.5rem;
}

p{
    color:#94a3b8;
    margin-bottom: 2rem;
}


.form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

input {
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid #334155;
    background: #0f172a;
    color: white;
    font-size:  1rem;
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

.link {
  margin: 0;
  font-size: 0.875rem;
}

.link span {
  color: #38bdf8;
  cursor: pointer;
}
</style>