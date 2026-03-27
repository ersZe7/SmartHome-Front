<script setup>

import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/api/axios';

const router = useRouter()

const email = ref('')
const error = ref('')
const loading = ref(false)
const sent = ref(false)


async function handleRequest() {
    error.value = ''
    if (!email.value.trim()) {
        error.value = 'Please enter your email'
        return
    }
    loading.value = true
    try {
        await api.post('/auth/request-password-reset', {email: email.value})
        sent.value = true
    } catch (e) {
        error.value = e.response?.data?.detail || 'Error sending reset link'
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="login-container">
        <div class="login-box">
            <h1>SentinelIoT</h1>

            <div v-if="!sent">
                <p>Enter your email to reset password</p>
                <div class="form">
                    <input v-model="email" type="model" placeholder="Email" />
                    <p v-if="error" class="error">{{ error }}</p>
                    <button @click="handleRequest" disabled="loading">
                        {{ loading ? 'Sending...' : 'Send Reset Link'}}
                    </button>
                    
                    <p class="link">
                        <span @click="router.push('/login')">← Back to Sign In</span>
                    </p>
                </div>
            </div>

            <div v-else>
                <p>Check your Email for a reset link</p>
                <p class="link">
                    <span @click="router.push('/login')">← Back to Sign In</span>
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
    font-weight: 500; }
</style>