<template>
  <div class="surface-card p-4 shadow-2 border-round" style="max-width: 800px; margin: 0 auto;">
    <div class="flex justify-content-center mb-4">
      <h1 class="text-3xl font-medium text-900 m-0">Vocab Test</h1>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-column align-items-center justify-content-center p-5">
      <ProgressSpinner />
      <p class="text-600 mt-3">Loading words...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center p-5">
      <Message severity="error" :closable="false">{{ error }}</Message>
      <Button label="Retry" icon="pi pi-refresh" class="mt-3" @click="fetchWords" />
    </div>

    <!-- Main Content -->
    <div v-else>
      
      <!-- Mode Selection (Only show if test hasn't started and no results) -->
      <div v-if="!activeMode && !testResults" class="flex flex-column gap-4">
        <div v-if="words.length < 4" class="text-center">
           <Message severity="warn" :closable="false">
             You need at least 4 words to start a test. Please add more words.
           </Message>
        </div>

        <div v-else class="grid">
          <div class="col-12 md:col-4">
            <div 
              class="surface-card p-4 shadow-1 border-round cursor-pointer hover:shadow-4 transition-duration-200 text-center h-full border-1 surface-border"
              @click="startTest('flashcard')"
            >
              <i class="pi pi-clone text-4xl text-primary mb-3"></i>
              <h3 class="text-xl font-medium mb-2">Flashcards</h3>
              <p class="text-600 text-sm">Flip cards to test your memory. Self-assess your knowledge.</p>
            </div>
          </div>
          
          <div class="col-12 md:col-4">
            <div 
              class="surface-card p-4 shadow-1 border-round cursor-pointer hover:shadow-4 transition-duration-200 text-center h-full border-1 surface-border"
              @click="startTest('quiz')"
            >
              <i class="pi pi-list text-4xl text-orange-500 mb-3"></i>
              <h3 class="text-xl font-medium mb-2">Multiple Choice</h3>
              <p class="text-600 text-sm">Select the correct answer from 4 options.</p>
            </div>
          </div>

          <div class="col-12 md:col-4">
            <div 
              class="surface-card p-4 shadow-1 border-round cursor-pointer hover:shadow-4 transition-duration-200 text-center h-full border-1 surface-border"
              @click="startTest('typing')"
            >
              <i class="pi pi-question-circle text-4xl text-green-500 mb-3"></i>
              <h3 class="text-xl font-medium mb-2">Typing Test</h3>
              <p class="text-600 text-sm">Type the exact translation. Strict spelling check.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Test Component -->
      <div v-if="activeMode">
        <div class="mb-4">
          <Button label="Quit Test" icon="pi pi-arrow-left" text @click="resetTest" />
        </div>
        
        <FlashcardMode v-if="activeMode === 'flashcard'" :words="testWords" @complete="onTestComplete" />
        <QuizMode v-if="activeMode === 'quiz'" :words="testWords" @complete="onTestComplete" />
        <TypingMode v-if="activeMode === 'typing'" :words="testWords" @complete="onTestComplete" />
      </div>

      <!-- Results Dashboard -->
      <div v-if="testResults">
        <TestResult :results="testResults" @retry="resetTest" />
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../helpers/helpers';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import Button from 'primevue/button';

// Import Test Components
import FlashcardMode from '../components/test/FlashcardMode.vue';
import QuizMode from '../components/test/QuizMode.vue';
import TypingMode from '../components/test/TypingMode.vue';
import TestResult from '../components/test/TestResult.vue';

const words = ref([]);
const testWords = ref([]);
const loading = ref(true);
const error = ref(null);

const activeMode = ref(null); // 'flashcard', 'quiz', 'typing', or null
const testResults = ref(null); // Object or null

const fetchWords = async () => {
  loading.value = true;
  error.value = null;
  try {
    words.value = await api.getWords();
  } catch (e) {
    console.error(e);
    error.value = 'Failed to load words. Please try again.';
  } finally {
    loading.value = false;
  }
};

const startTest = (mode) => {
  // Randomly select up to 10 words from the user's words
  const shuffled = [...words.value];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  testWords.value = shuffled.slice(0, 10);

  activeMode.value = mode;
  testResults.value = null;
};

const onTestComplete = (results) => {
  activeMode.value = null;
  testResults.value = results;
};

const resetTest = () => {
  activeMode.value = null;
  testResults.value = null;
};

onMounted(() => {
  fetchWords();
});
</script>

<style scoped>
.hover\:shadow-4:hover {
  box-shadow: 0 4px 10px rgba(0,0,0,0.15) !important;
  transform: translateY(-2px);
}
</style>