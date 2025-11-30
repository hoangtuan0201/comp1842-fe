<template>
  <div class="card">
    <div style="text-align: center; margin-bottom: 1rem;">
      <h1>New Word</h1>
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
    try {
        await api.createWord(word);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Word created successfully', life: 3000 });
        // router.push(/words/${res._id}`);
        router.push('/words'); 
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Could not create word', life: 3000 });
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
