<script setup>
defineProps({
  summary: {
    type: Object,
    required: true
  }
})
</script>


<template>
  <div class="summary-grid">
    <div class="card">
      <span class="card-label">Total Flows</span>
      <span class="card-value">{{ summary.total_flows }}</span>
      <span class="card-sub">Network packets analyzed</span>
    </div>

    <div class="card">
      <span class="card-label">Devices</span>
      <span class="card-value">{{ summary.total_sources }}</span>
      <span class="card-sub">Connected to network</span>
    </div>

    <div class="card anomaly">
      <span class="card-label">Anomalies</span>
      <span class="card-value">{{ summary.anomalous_sources }}</span>
      <span class="card-sub">Require attention</span>
    </div>

    <div class="card suspicious">
      <span class="card-label">Suspicious</span>
      <span class="card-value">{{ summary.suspicious_sources }}</span>
      <span class="card-sub">Under monitoring</span>
    </div>
  </div>
</template>



<style scoped>
.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;
  font-family: -apple-system, 'SF Pro Display', 'Inter', sans-serif;
}

.card {
  background: white;
  border-radius: 14px;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
}

.card-label {
  color: #6e6e73;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-value {
  color: #1d1d1f;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -1px;
  line-height: 1;
  margin: 0.2rem 0;
}

.card-sub {
  color: #6e6e73;
  font-size: 0.7rem;
}

.card.anomaly {
  border-left: 3px solid #ff3b30;
}

.card.anomaly .card-value {
  color: #ff3b30;
}

.card.suspicious {
  border-left: 3px solid #ff9500;
}

.card.suspicious .card-value {
  color: #ff9500;
}
</style>