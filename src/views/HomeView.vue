<script setup>
</script>


<template>
  <div class="home">

    <nav class="navbar">
      <div class="nav-logo">SentinelIoT</div>
      <div class="nav-links">
        <a href="#features">Features</a>
        <router-link to="/help" class="nav-signin">Help</router-link>
        <router-link to="/login" class="nav-signin">Sign In</router-link>
        <router-link to="/register" class="nav-btn">Get Started</router-link>
      </div>
    </nav>


    <section class="hero">
      <div class="hero-content">
        <h1>Smart Home Security.<br/>Reimagined.</h1>
        <p>Monitor your IoT devices in real time. Detect threats automatically with ML. Get instant alerts via Telegram.</p>
        <div class="hero-buttons">
          <router-link to="/register" class="btn-primary">Get Started</router-link>
          <router-link to="/login" class="btn-secondary">Sign In →</router-link>
        </div>
      </div>
    </section>

<section class="features" id="features">
  <h2>Everything you need to stay secure.</h2>
  <div class="features-grid">
    <div class="feature-card">
      <div class="feature-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
      <h3>Real-time Monitoring</h3>
      <p>See all devices connected to your network and track their activity in real time.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
        </svg>
      </div>
      <h3>ML Detection</h3>
      <p>Our machine learning model automatically detects suspicious behavior from IoT devices.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      </div>
      <h3>Instant Alerts</h3>
      <p>Get notified immediately via Telegram when an anomaly is detected in your network.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </div>
      <h3>AI Explanations</h3>
      <p>Gemini AI provides clear explanations of detected threats in plain language.</p>
    </div>
  </div>
</section>


    <section class="cta">
      <h2>Your network. Under control.</h2>
      <p>Real-time threat detection for every device in your home.</p>
      <router-link to="/register" class="btn-primary">Get Started for Free</router-link>
    </section>


    <footer class="footer">
      <p>© 2026 SentinelIoT. All rights reserved.</p>
    </footer>
  </div>
</template>



<style scoped>
* {
  box-sizing: border-box;
}

.home {
  font-family: -apple-system, 'SF Pro Display', 'Inter', sans-serif;
  background: #ffffff;
  color: #1d1d1f;
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 80px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(20px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(0,0,0,0.08);
}

.nav-logo {
  font-size: 1.6rem;
  font-weight: 600;
  color: #1d1d1f;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #1d1d1f;
  font-size: 1rem;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.nav-links a:hover {
  opacity: 1;
}

.nav-signin {
  font-size: 0.8rem;
}

.nav-btn {
  background: #1d1d1f !important;
  color: white !important;
  padding: 0.4rem 1rem;
  border-radius: 950px;
  font-size: 0.9rem !important;
  opacity: 1 !important;
  transition: background 0.2s !important;
}

.nav-btn:hover {
  background: #3d3d3f !important;
}


.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, #fbfbfd 0%, #ffffff 100%);
}

.hero-content {
  max-width: 700px;
}

.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(180deg, #bae6fd 0%, #e0f2fe 40%, #ffffff 100%);
}

.hero h1 {
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -2px;
  line-height: 1.1;
  color: #1d1d1f;
  margin-bottom: 1.5rem;
}

.hero p {
  font-size: 1.25rem;
  color: #6e6e73;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  font-weight: 400;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
}

.btn-primary {
  background: #1d1d1f;
  color: white;
  padding: 0.85rem 2rem;
  border-radius: 980px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #3d3d3f;
}

.btn-secondary {
  color: #0071e3;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: opacity 0.2s;
}

.btn-secondary:hover {
  opacity: 0.7;
}


.features {
  padding: 6rem 2rem;
  background: #f5f5f7;
  text-align: center;
}

.features h2 {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -1px;
  color: #1d1d1f;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  border-radius: 18px;
  padding: 2rem 1.5rem;
  text-align: left;
}

.feature-icon {
  width: 44px;
  height: 44px;
  background: #f5f5f7;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #1d1d1f;
}

.feature-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1d1d1f;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.9rem;
  color: #6e6e73;
  line-height: 1.6;
}


.cta {
  padding: 6rem 2rem;
  text-align: center;
  background: white;
}

.cta h2 {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -1px;
  color: #1d1d1f;
  margin-bottom: 1rem;
}

.cta p {
  font-size: 1.1rem;
  color: #6e6e73;
  margin-bottom: 2rem;
}


.footer {
  padding: 2rem;
  text-align: center;
  border-top: 1px solid rgba(0,0,0,0.08);
  background: #f5f5f7;
}

.footer p {
  font-size: 0.8rem;
  color: #6e6e73;
}
</style>