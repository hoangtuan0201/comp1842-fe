<template>
  <div class="surface-card p-4 shadow-2 border-round" style="max-width: 500px; margin: 0 auto;">
    <div class="flex justify-content-center mb-4">
        <h1 class="text-3xl font-medium text-900 m-0">New Word</h1>
    </div>
    <WordForm @createOrUpdate="createOrUpdate" />
  </div>
</template>

<script setup>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

const router = useRouter();
const toast = useToast();

const createOrUpdate = async (word) => {
    const res = await api.createWord(word);
    toast.add({ severity: 'success', summary: 'Success', detail: 'Word created successfully', life: 3000 });
    router.push(`/words/${res._id}`);
};
</script>

<style scoped>
</style>
