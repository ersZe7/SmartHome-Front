import { defineStore } from "pinia";
import { ref, computed } from 'vue'

import { login as loginApi } from '../api/auth.js'

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || null)

    const isAuthenticated = computed(() => !!token.value)

    async function login(email, password) {
        const response = await loginApi(email, password)
        token.value = response.data.access_token
        localStorage.setItem('token', token.value)
    }

    function logout() {
        token.value = null
        localStorage.removeItem('token')
    }

    return { token, isAuthenticated, login, logout }

})


