import { createRouter, createWebHistory } from "vue-router"
import DashboardView from "@/views/DashboardView.vue"
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"
import SuspiciousView from "@/views/SuspiciousView.vue"
import HomeView from "@/views/HomeView.vue"
import ForgotPassword from "@/views/ForgotPassword.vue"

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
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
        meta: { requiresAuth: true }
    },
    {
        path: '/suspicious',
        name: 'Suspicious',
        component: SuspiciousView,
        meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import('../views/ProfileView.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('../views/ForgotPassword.vue')
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        component: () => import('../views/ResetPassword.vue')
    },
    {
        path: '/help',
        name: "Help",
        component: () => import('../views/HelpView.vue'),
    },
    {
        path: '/tips',
        name: 'Tips',
        component: () => import('../views/TipsView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')

    if (to.meta.requiresAuth && !token) {
        next('/login')
        return
    }

    if (to.meta.requiresAdmin) {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        if (user.role !== 'ADMIN') {
            next('/dashboard')
            return
        }
    }

    next()
})

export default router