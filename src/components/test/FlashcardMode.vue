<template>
  <div class="flex flex-column align-items-center">
    <div class="text-center mb-3">
      <h2 class="text-xl font-medium text-900">Flashcards</h2>
      <p class="text-600">{{ currentIndex + 1 }} / {{ total }}</p>
    </div>

    <!-- Flashcard Container -->
    <div class="flashcard-container mb-4" @click="flipCard">
      <div class="flashcard" :class="{ flipped: isFlipped }">
        <!-- Front: German or English -->
        <div class="front surface-card shadow-2 border-round p-4 flex align-items-center justify-content-center">
          <div class="text-center">
            <span class="block text-4xl font-bold text-900 mb-2">{{ currentWord?.german }}</span>
            <span class="text-sm text-500">(Tap to reveal)</span>
          </div>
        </div>
        <!-- Back: Vietnamese + Meaning -->
        <div class="back surface-card shadow-2 border-round p-4 flex align-items-center justify-content-center">
          <div class="text-center">
            <div class="mb-3">
              <span class="block text-xs text-500 uppercase font-bold">English</span>
              <span class="text-2xl font-medium text-900">{{ currentWord?.english }}</span>
            </div>
            <div>
              <span class="block text-xs text-500 uppercase font-bold">Vietnamese</span>
              <span class="text-2xl font-medium text-primary">{{ currentWord?.vietnamese }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div class="flex gap-3 w-full" style="max-width: 400px">
      <Button 
        label="I Don't Know" 
        severity="danger" 
        icon="pi pi-times" 
        class="flex-1" 
        @click="nextCard(false)" 
        :disabled="!isFlipped"
      />
      <Button 
        label="I Know" 
        severity="success" 
        icon="pi pi-check" 
        class="flex-1" 
        @click="nextCard(true)" 
        :disabled="!isFlipped"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted } from 'vue';
import Button from 'primevue/button';

const props = defineProps({
  words: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['complete']);

const shuffledWords = ref([]);
const currentIndex = ref(0);
const isFlipped = ref(false);
const knownCount = ref(0);
const unknownCount = ref(0);

onMounted(() => {
  // Shuffle words on mount
  shuffledWords.value = [...props.words].sort(() => Math.random() - 0.5);
});

const currentWord = computed(() => shuffledWords.value[currentIndex.value]);
const total = computed(() => shuffledWords.value.length);

const flipCard = () => {
  isFlipped.value = !isFlipped.value;
};

const nextCard = (known) => {
  if (known) knownCount.value++;
  else unknownCount.value++;

  isFlipped.value = false;

  setTimeout(() => {
    if (currentIndex.value < total.value - 1) {
      currentIndex.value++;
    } else {
      // Finish
      emit('complete', {
        total: total.value,
        correct: knownCount.value,
        incorrect: unknownCount.value,
        mode: 'Flashcards'
      });
    }
  }, 300); // Small delay for flip animation reset
};
</script>

<style scoped>
.flashcard-container {
  width: 100%;
  max-width: 400px;
  height: 250px;
  perspective: 1000px;
  cursor: pointer;
}

.flashcard {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flashcard.flipped {
  transform: rotateY(180deg);
}

.front, .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
}

.back {
  transform: rotateY(180deg);
}
</style>