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
        </div>

        <div class="card">
            <span class="card-label">Devices</span>
            <span class="card-value">{{ summary.total_sources }}</span>
        </div>

        <div class="card anomaly">
            <span class="card-label">Anomalies</span>
            <span class="card-value">{{ summary.anomalous_sources }}</span>
        </div>
    </div>
</template>


<style scoped>
.summary-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
}

.card {
    background: #1e293b;
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid #334155;
}

.card-label {
    color: #94a3b8;
    font-size: 0.875rem;
}

.card-value {
    color: white;
    font-size: 2rem;
    font-weight: bold;
}

.card.anomaly {
    border-color: #f87171;
}

.card.anomaly .card-value{
    color: #f87171
}

.card.suspicious {
    color: #fbbf24
}
</style>