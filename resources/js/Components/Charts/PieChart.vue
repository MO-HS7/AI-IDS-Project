<template>
  <div class="chart-container">
    <canvas ref="chartRef" :id="chartId"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  chartId: {
    type: String,
    default: () => `pie-chart-${Math.random().toString(36).substr(2, 9)}`
  }
})

const chartRef = ref(null)
let chartInstance = null

const createChart = () => {
  if (!chartRef.value || !props.data.length) return

  const ctx = chartRef.value.getContext('2d')
  
  if (chartInstance) {
    chartInstance.destroy()
  }

  const colors = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6',
    '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f59e0b'
  ]

  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: props.data.map(item => item.name),
      datasets: [{
        data: props.data.map(item => item.value),
        backgroundColor: colors.slice(0, props.data.length),
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: !!props.title,
          text: props.title,
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            bottom: 20
          }
        },
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0)
              const percentage = ((context.raw / total) * 100).toFixed(1)
              return `${context.label}: ${context.raw} (${percentage}%)`
            }
          }
        }
      }
    }
  })
}

onMounted(() => {
  createChart()
})

watch(() => props.data, () => {
  createChart()
}, { deep: true })

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}
</style>
