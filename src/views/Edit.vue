<template>
  <div class="card">
    <div style="text-align: center; margin-bottom: 1rem;">
      <h1>Edit Word</h1>
    </div>
    <WordForm @createOrUpdate="createOrUpdate" :word="word" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import WordForm from '@/components/WordForm.vue';
import { api } from '@/helpers/helpers.js';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const word = ref({});

onMounted(async () => {
    try {
        word.value = await api.getWord(route.params.id);
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Could not load word', life: 3000 });
    }
});

const createOrUpdate = async (updatedWord) => {
    try {
        await api.updateWord(updatedWord);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Word updated successfully', life: 3000 });
        router.push(`/words/${updatedWord._id}`);
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Could not update word', life: 3000 });
    }
};
</script>

<style scoped>
.flex {
    display: flex;
}
.justify-content-center {
    justify-content: center;
}
.mb-4 {
    margin-bottom: 1.5rem;
}
</style>
