<template>
  <div class="flex flex-column align-items-center" style="max-width: 500px; margin: 0 auto;">
    <div class="text-center mb-4">
      <h2 class="text-xl font-medium text-900">Multiple Choice</h2>
      <p class="text-600">{{ currentIndex + 1 }} / {{ total }}</p>
      <div class="mt-2">
        <span class="text-green-500 font-bold mr-3">Correct: {{ correctCount }}</span>
        <span class="text-red-500 font-bold">Wrong: {{ wrongCount }}</span>
      </div>
    </div>

    <div class="surface-card p-4 shadow-2 border-round w-full mb-4">
      <p class="text-lg text-center mb-4">
        What is the English meaning of: <br/>
        <strong class="text-2xl text-primary">{{ currentWord?.german }}</strong>?
      </p>

      <div class="grid">
        <div v-for="(option, index) in options" :key="index" class="col-6">
          <Button 
            :label="option.english" 
            class="w-full p-button-outlined" 
            :class="{
              'p-button-success': answered && option.english === currentWord.english,
              'p-button-danger': answered && selectedOption === option && option.english !== currentWord.english
            }"
            :disabled="answered"
            @click="selectOption(option)"
          />
        </div>
      </div>
    </div>

    <Button 
      v-if="answered" 
      label="Next Question" 
      icon="pi pi-arrow-right" 
      iconPos="right" 
      @click="nextQuestion" 
    />
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted, watch } from 'vue';
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
const options = ref([]);
const answered = ref(false);
const selectedOption = ref(null);
const correctCount = ref(0);
const wrongCount = ref(0);

const currentWord = computed(() => shuffledWords.value[currentIndex.value]);
const total = computed(() => shuffledWords.value.length);

const generateOptions = () => {
  if (!currentWord.value) return;

  // Get 3 random distractors
  const distractors = props.words
    .filter(w => w._id !== currentWord.value._id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
  
  // Combine with correct answer and shuffle
  options.value = [...distractors, currentWord.value].sort(() => Math.random() - 0.5);
};

const selectOption = (option) => {
  answered.value = true;
  selectedOption.value = option;

  if (option.english === currentWord.value.english) {
    correctCount.value++;
  } else {
    wrongCount.value++;
  }
};

const nextQuestion = () => {
  answered.value = false;
  selectedOption.value = null;

  if (currentIndex.value < total.value - 1) {
    currentIndex.value++;
    generateOptions();
  } else {
    emit('complete', {
      total: total.value,
      correct: correctCount.value,
      incorrect: wrongCount.value,
      mode: 'Multiple Choice'
    });
  }
};

onMounted(() => {
  if (props.words.length > 0) {
    shuffledWords.value = [...props.words].sort(() => Math.random() - 0.5);
    generateOptions();
  }
});

watch(() => props.words, (newVal) => {
  if (newVal.length > 0 && shuffledWords.value.length === 0) {
    shuffledWords.value = [...newVal].sort(() => Math.random() - 0.5);
    generateOptions();
  }
});
</script>