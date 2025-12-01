<template>
  <div class="flex flex-column align-items-center justify-content-center text-center p-4">
    <h2 class="text-4xl font-bold mb-2" :class="messageColor">{{ message }}</h2>
    <p class="text-600 text-xl mb-4">You scored {{ scorePercentage }}%</p>

    <div class="surface-card shadow-2 border-round p-4 w-full flex flex-column align-items-center" style="max-width: 400px">
      <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full flex justify-content-center" style="max-width: 300px" />
      
      <div class="flex justify-content-between w-full mt-4 px-4">
        <div class="text-center">
          <span class="block text-2xl font-bold text-green-500">{{ results.correct }}</span>
          <span class="text-sm text-500">Correct</span>
        </div>
        <div class="text-center">
          <span class="block text-2xl font-bold text-red-500">{{ results.incorrect }}</span>
          <span class="text-sm text-500">Incorrect</span>
        </div>
        <div class="text-center">
          <span class="block text-2xl font-bold text-900">{{ results.total }}</span>
          <span class="text-sm text-500">Total</span>
        </div>
      </div>
    </div>

    <Button label="Try Again" icon="pi pi-refresh" class="mt-5 p-button-lg" @click="$emit('retry')" />
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue';
import Chart from 'primevue/chart';
import Button from 'primevue/button';

const props = defineProps({
  results: {
    type: Object,
    required: true
  }
});

defineEmits(['retry']);

const scorePercentage = computed(() => {
  if (props.results.total === 0) return 0;
  return Math.round((props.results.correct / props.results.total) * 100);
});

const message = computed(() => {
  const score = scorePercentage.value;
  if (score >= 80) return 'Excellent!';
  if (score >= 60) return 'Good job!';
  if (score >= 40) return 'Keep practicing!';
  return 'Try again!';
});

const messageColor = computed(() => {
  const score = scorePercentage.value;
  if (score >= 60) return 'text-green-500';
  if (score >= 40) return 'text-orange-500';
  return 'text-red-500';
});

const chartData = computed(() => {
  return {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [props.results.correct, props.results.incorrect],
        backgroundColor: ['#22C55E', '#EF4444'],
        hoverBackgroundColor: ['#16A34A', '#DC2626']
      }
    ]
  };
});

const chartOptions = {
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
};
</script>