<template>
  <div class="flex flex-column gap-4" style="max-width: 500px; margin: 0 auto;">
    <div class="text-center">
      <h2 class="text-xl font-medium text-900">Typing Test</h2>
      <p class="text-600">{{ currentIndex + 1 }} / {{ total }}</p>
    </div>

    <form @submit.prevent="onSubmit" class="flex flex-column gap-3">
      <!-- German (Given) -->
      <div class="p-inputgroup">
          <span class="p-inputgroup-addon"><img src="@/assets/flags/germany.png" width="20" /></span>
          <InputText readonly :value="currentWord?.german" class="w-full surface-ground" />
      </div>

      <!-- English Input -->
      <div class="p-inputgroup">
          <span class="p-inputgroup-addon"><img src="@/assets/flags/england.png" width="20" /></span>
          <InputText 
            placeholder="Enter English translation..." 
            v-model="englishInput" 
            :disabled="answered" 
            autocomplete="off" 
            class="w-full"
            :class="{
              'p-invalid': answered && !isEnglishCorrect,
              'p-valid': answered && isEnglishCorrect
            }"
          />
      </div>
      <small v-if="answered && !isEnglishCorrect" class="p-error">Correct: {{ currentWord?.english }}</small>

      <!-- Vietnamese Input -->
      <div class="p-inputgroup">
          <span class="p-inputgroup-addon"><img src="@/assets/flags/vietnam.png" width="20" /></span>
          <InputText 
            placeholder="Enter Vietnamese translation..." 
            v-model="vietnameseInput" 
            :disabled="answered" 
            autocomplete="off" 
            class="w-full" 
            :class="{
              'p-invalid': answered && !isVietnameseCorrect,
              'p-valid': answered && isVietnameseCorrect
            }"
          />
      </div>
      <small v-if="answered && !isVietnameseCorrect" class="p-error">Correct: {{ currentWord?.vietnamese }}</small>

      <Button 
        v-if="!answered" 
        type="submit" 
        label="Check" 
        icon="pi pi-check" 
        class="w-full" 
      />
      <Button 
        v-else 
        type="button" 
        label="Next" 
        icon="pi pi-arrow-right" 
        class="w-full p-button-info" 
        @click="nextWord" 
      />
    </form>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
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
const englishInput = ref('');
const vietnameseInput = ref('');
const answered = ref(false);
const isEnglishCorrect = ref(false);
const isVietnameseCorrect = ref(false);
const correctCount = ref(0);
const wrongCount = ref(0);

const currentWord = computed(() => shuffledWords.value[currentIndex.value]);
const total = computed(() => shuffledWords.value.length);

onMounted(() => {
  shuffledWords.value = [...props.words].sort(() => Math.random() - 0.5);
});

const onSubmit = () => {
  if (!currentWord.value) return;

  const eng = englishInput.value.trim().toLowerCase();
  const viet = vietnameseInput.value.trim().toLowerCase();
  const correctEng = currentWord.value.english.toLowerCase();
  const correctViet = (currentWord.value.vietnamese || '').trim().toLowerCase();

  isEnglishCorrect.value = eng === correctEng;
  isVietnameseCorrect.value = viet === correctViet;
  
  answered.value = true;

  if (isEnglishCorrect.value && isVietnameseCorrect.value) {
    correctCount.value++;
  } else {
    wrongCount.value++;
  }
};

const nextWord = () => {
  englishInput.value = '';
  vietnameseInput.value = '';
  answered.value = false;

  if (currentIndex.value < total.value - 1) {
    currentIndex.value++;
  } else {
    emit('complete', {
      total: total.value,
      correct: correctCount.value,
      incorrect: wrongCount.value,
      mode: 'Typing Test'
    });
  }
};
</script>

<style scoped>
.p-valid {
  border-color: var(--green-500) !important;
}
</style>