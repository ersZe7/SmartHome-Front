import { createRouter, createWebHistory } from "vue-router"
import DashboardView from "@/views/DashboardView.vue"
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"
import SuspiciousView from "@/views/SuspiciousView.vue"
import SettingsView from "@/views/SettingsView.vue"
import HomeView from "@/views/HomeView.vue"


const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView

    },
    {
        path: '/',
        redirect: '/login'
    },

    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },

    {
        path: '/register',
        name: 'Register',
        component: RegisterView
    },

    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardView,
        meta: { requiresAuth: true}
    },
    {
        path: '/suspicious',
        name: 'Suspicious',
        component: SuspiciousView
    },
    {
        path: '/settings',
        name: 'Settings',
        component: SettingsView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if(to.meta.requiresAuth && !token) {
        next('/login')
    } else {
        next()
    }
})

export default router