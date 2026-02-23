<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { register } from '@/api/auth';

const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

async function handleRegister() {
    error.value = ''
    success.value = ''

    if(password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match'
        return
    }

    loading.value = true

    try {
        await register(email.value, password.value) 
        success.value = 'Account created!'
        setTimeout(() => {
            router.push('/login')
        }, 1500)
    } catch(e) {
        error.value = e.response?.data?.detail || 'Registration error'
    } finally {
        loading.value = false
    }
}

</script>


<template>
    <div class="login-container">
        <div class="login-box">
            <h1>SmartHome</h1>
            <p>Create an account</p>
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

                <input
                v-model="confirmPassword"
                type="password"
                placeholder="Confirm password"
                />

                <p v-if="error" class="error">{{ error }}</p>
                <p v-if="success" class="success">{{ success }}</p>

                <button @click="handleRegister" :disabled="loading">
                    {{ loading ? 'Registration...' : 'Sign Up'}}
                </button>

                <p class="link">
                    Already have an account?
                    <span @click="router.push('/login')">Sign In</span>
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
}

.login-box {
    padding: 2rem;
    border-radius: 12px;
    width: 100%;
    min-width: 400px;
    text-align: center;
    color: white;
}

h1{
    font-size: 2rem;
    color: #38bdf8;
    margin-bottom: 0.5rem;
}

p{
    color: #94a3b8;
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


.error{
    color: red;
    margin: 0;
}

.success {
    color: #86efac;
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

.link span:hover {
  text-decoration: underline;
}

</style>