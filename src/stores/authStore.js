import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import { login as loginApi } from '../api/auth.js'

function parseJwt(token) {
    try {
        const base64 = token.split('.')[1]
        return JSON.parse(atob(base64))
    } catch {
        return {}
    }
}

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || null)
    const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))

    const isAuthenticated = computed(() => !!token.value)
    const isAdmin = computed(() => user.value?.role === 'ADMIN')

    async function login(email, password) {
        const response = await loginApi(email, password)
        console.log('response:', response.data)

        token.value = response.data.access_token
        localStorage.setItem('token', token.value)


        const payload = parseJwt(token.value)
        console.log('payload:', payload)  

        user.value = payload
        localStorage.setItem('user', JSON.stringify(payload))
    }

    function logout() {
        token.value = null
        user.value = {}
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
    

    return { token, user, isAuthenticated, isAdmin, login, logout }
})