<template>
  <div class="surface-card p-4 shadow-2 border-round" style="max-width: 500px; margin: 0 auto;">
    <div class="flex justify-content-center mb-4">
        <h1 class="text-3xl font-medium text-900 m-0">Edit Word</h1>
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
</style>
