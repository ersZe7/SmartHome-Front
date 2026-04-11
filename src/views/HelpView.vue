<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const openFaq = ref(null)

function toggleFaq(index) {
  openFaq.value = openFaq.value === index ? null : index
}

const faqs = [
  {
    question: 'What is SentinelIoT?',
    answer: 'SentinelIoT is a smart home network security platform that monitors your IoT devices in real time, detects anomalies using machine learning, and sends instant alerts via Telegram.'
  },
  {
    question: 'How does anomaly detection work?',
    answer: 'Our ML model analyzes network traffic from your devices and calculates a threat probability for each flow. If the probability exceeds a threshold, the device is marked as Suspicious or Anomaly.'
  },
  {
    question: 'What is Orange Pi ID?',
    answer: 'Orange Pi is a small computer connected to your home network. It collects data about connected devices and sends it to SentinelIoT. You need to set your Orange Pi ID in Profile → Orange Pi so the system knows which devices belong to you.'
  },
  {
    question: 'How do I get Telegram notifications?',
    answer: 'Go to Profile → Telegram, find @userinfobot in Telegram, send it any message to get your ID, and paste it in the field. After that you will receive instant alerts when anomalies are detected.'
  },
  {
    question: 'What do PENDING, BENIGN and ATTACK mean?',
    answer: 'These are labels for suspicious packets. PENDING means the packet has not been reviewed yet. BENIGN means it was checked and is safe. ATTACK means it was confirmed as a real threat.'
  },
  {
    question: 'Why are there no devices on my Dashboard?',
    answer: 'Devices appear only when your Orange Pi sends data to the system. Make sure your Orange Pi ID is set in Profile → Orange Pi and your Orange Pi device is running.'
  },
  {
    question: 'Who can see the Suspicious Packets page?',
    answer: 'Only administrators can access the Suspicious Packets page. Regular users can only see their Dashboard and Profile.'
  }
]
</script>

<template>
  <div class="page">
    <header class="header">
      <button class="back-btn" @click="router.go(-1)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Back
      </button>
      <span class="header-logo">SentinelIoT</span>
    </header>

    <main class="content">
      <h2 class="page-title">Help Center</h2>
      <p class="page-subtitle">Learn how to use SentinelIoT and get answers to common questions.</p>

      <section class="section">
        <h3>Getting Started</h3>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <div class="step-title">Create an account</div>
              <div class="step-desc">Register with your email. You will receive a verification code to confirm your address.</div>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <div class="step-title">Set up your Orange Pi</div>
              <div class="step-desc">Go to Profile → Orange Pi and enter your Orange Pi device ID. This connects your home network to SentinelIoT.</div>
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <div class="step-title">Connect Telegram</div>
              <div class="step-desc">Go to Profile → Telegram and add your Telegram ID to receive instant security alerts powered by Gemini AI.</div>
            </div>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <div class="step-title">Monitor your network</div>
              <div class="step-desc">Open Dashboard to see all devices connected to your network and their security status in real time.</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h3>Understanding the Dashboard</h3>
        <div class="cards-grid">
          <div class="info-card">
            <div class="info-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
            </div>
            <div class="info-title">Devices Table</div>
            <div class="info-desc">Shows all devices currently connected to your network with their IP and MAC addresses.</div>
          </div>
          <div class="info-card green">
            <div class="info-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div class="info-title">Normal</div>
            <div class="info-desc">Device traffic looks normal. No suspicious activity detected.</div>
          </div>
          <div class="info-card yellow">
            <div class="info-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div class="info-title">Suspicious</div>
            <div class="info-desc">Device shows unusual behavior. Monitor it closely.</div>
          </div>
          <div class="info-card red">
            <div class="info-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div class="info-title">Anomaly</div>
            <div class="info-desc">High probability of attack detected. Immediate attention required.</div>
          </div>
        </div>
      </section>

      <section class="section">
        <h3>Frequently Asked Questions</h3>
        <div class="faq-list">
          <div v-for="(faq, index) in faqs" :key="index" class="faq-item">
            <button class="faq-question" @click="toggleFaq(index)">
              <span>{{ faq.question }}</span>
              <svg v-if="openFaq !== index" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </button>
            <div v-if="openFaq === index" class="faq-answer">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </section>

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

.header-logo { font-size: 1.3rem; font-weight: 600; letter-spacing: -0.5px; }

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  border-radius: 980px;
  border: 1px solid #d2d2d7;
  background: transparent;
  color: #1d1d1f;
  cursor: pointer;
  font-size: 0.85rem;
  font-family: inherit;
}

.back-btn:hover { background: #f5f5f7; }

.home-link {
  color: #1d1d1f;
  text-decoration: none;
  font-size: 0.95rem;
  opacity: 0.7;
}

.home-link:hover { opacity: 1; }

.content {
  max-width: 800px;
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
  margin-bottom: 3rem;
}

.section { margin-bottom: 3rem; }
.section h3 { font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem; color: #1d1d1f; }

.steps { display: flex; flex-direction: column; gap: 1rem; }

.step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: white;
  border-radius: 14px;
  padding: 1.25rem;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #1d1d1f;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 600;
  flex-shrink: 0;
}

.step-title { font-weight: 600; margin-bottom: 0.25rem; font-size: 0.95rem; }
.step-desc { color: #6e6e73; font-size: 0.875rem; line-height: 1.5; }

.cards-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }

.info-card {
  background: white;
  border-radius: 14px;
  padding: 1.25rem;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
}

.info-card.green .info-icon { color: #16a34a; }
.info-card.yellow .info-icon { color: #ca8a04; }
.info-card.red .info-icon { color: #dc2626; }

.info-icon {
  margin-bottom: 0.75rem;
  color: #1d1d1f;
}

.info-title { font-weight: 600; margin-bottom: 0.25rem; font-size: 0.95rem; }
.info-desc { color: #6e6e73; font-size: 0.875rem; line-height: 1.5; }

.faq-list { display: flex; flex-direction: column; gap: 0.5rem; }

.faq-item {
  background: white;
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.06);
  overflow: hidden;
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  color: #1d1d1f;
  font-family: inherit;
  text-align: left;
  gap: 1rem;
}

.faq-question:hover { background: #f5f5f7; }

.faq-answer {
  padding: 1rem 1.25rem;
  color: #6e6e73;
  font-size: 0.875rem;
  line-height: 1.6;
  border-top: 1px solid rgba(0,0,0,0.06);
}
</style>