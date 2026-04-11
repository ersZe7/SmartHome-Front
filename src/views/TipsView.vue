<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore.js'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/')
}

const tips = [
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    title: 'Change Default Passwords',
    desc: 'Always change the default username and password on every IoT device. Default credentials are publicly known and easy to exploit.',
    level: 'critical'
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/></svg>`,
    title: 'Create a Separate IoT Network',
    desc: 'Set up a guest or separate Wi-Fi network just for your IoT devices. This way, if a device is compromised, attackers cannot reach your main devices.',
    level: 'high'
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
    title: 'Keep Firmware Updated',
    desc: 'Regularly update the firmware of all your smart devices. Updates often contain critical security patches that fix known vulnerabilities.',
    level: 'high'
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 10h10M7 14h10"/></svg>`,
    title: 'Use WPA3 Encryption',
    desc: 'Make sure your Wi-Fi router uses WPA3 or at least WPA2 encryption. Never use WEP — it is outdated and easily cracked.',
    level: 'high'
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`,
    title: 'Disable Unused Features',
    desc: 'Turn off features you do not use — remote access, UPnP, Telnet. Every open service is a potential entry point for attackers.',
    level: 'medium'
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
    title: 'Monitor Your Network Regularly',
    desc: 'Check your Dashboard regularly for unfamiliar devices or suspicious activity. Early detection prevents serious damage.',
    level: 'medium'
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
    title: 'Enable Telegram Alerts',
    desc: 'Connect your Telegram in Profile settings to get instant notifications when SentinelIoT detects an anomaly in your network.',
    level: 'medium'
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    title: 'Avoid Public Wi-Fi for Smart Home Apps',
    desc: 'Do not manage your smart home devices over public Wi-Fi. Use a VPN if you need remote access from outside your home.',
    level: 'medium'
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>`,
    title: 'Unplug Devices You Don\'t Use',
    desc: 'If a device is not in use, unplug it. A device that is off cannot be hacked.',
    level: 'low'
  },
  {
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
    title: 'Keep an Inventory of Your Devices',
    desc: 'Know exactly which devices are connected to your network. If you see an unknown device on the Dashboard, investigate immediately.',
    level: 'low'
  }
]

const levelLabels = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low'
}
</script>

<template>
  <div class="page">
    <header class="header">
      <h1>SentinelIoT</h1>
      <div class="header-right">
        <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
        <router-link v-if="authStore.isAdmin" to="/suspicious" class="nav-link">Suspicious</router-link>
        <router-link to="/profile" class="nav-link">Profile</router-link>
        <button @click="handleLogout" class="logout-btn">Sign Out</button>
      </div>
    </header>

    <main class="content">
      <h2 class="page-title">Security Tips</h2>
      <p class="page-subtitle">Follow these best practices to keep your smart home safe from threats.</p>

      <div class="tips-grid">
        <div v-for="tip in tips" :key="tip.title" class="tip-card">
          <div class="tip-header">
            <div class="tip-icon" v-html="tip.icon"></div>
            <span :class="['tip-level', tip.level]">{{ levelLabels[tip.level] }}</span>
          </div>
          <div class="tip-title">{{ tip.title }}</div>
          <div class="tip-desc">{{ tip.desc }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: #fbfbfd;
  font-family: -apple-system, 'SF Pro Display', 'Inter', sans-serif;
  color: #1d1d1f;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 70px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

h1 { font-size: 1.3rem; font-weight: 600; letter-spacing: -0.5px; }
.header-right { display: flex; align-items: center; gap: 1.5rem; }
.nav-link { color: #1d1d1f; text-decoration: none; font-size: 0.95rem; opacity: 0.7; transition: opacity 0.2s; }
.nav-link:hover { opacity: 1; }
.logout-btn { padding: 0.4rem 1rem; border-radius: 980px; border: 1px solid #d2d2d7; background: #1d1d1f; color: white; cursor: pointer; font-size: 0.8rem; font-family: inherit; }

.content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: #6e6e73;
  font-size: 1rem;
  margin-bottom: 2.5rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.tip-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
}

.tip-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.tip-icon { font-size: 1.5rem; }

.tip-level {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
}

.tip-level.critical { background: #fee2e2; color: #dc2626; }
.tip-level.high { background: #fef9c3; color: #ca8a04; }
.tip-level.medium { background: #dbeafe; color: #2563eb; }
.tip-level.low { background: #dcfce7; color: #16a34a; }

.tip-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  color: #1d1d1f;
}

.tip-desc {
  color: #6e6e73;
  font-size: 0.875rem;
  line-height: 1.6;
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

.tip-icon {
  color: #1d1d1f;
  display: flex;
  align-items: center;
}
</style>