<template>
  <div class="surface-card p-4 shadow-2 border-round" style="max-width: 500px; margin: 0 auto;">
    <div class="flex justify-content-center mb-4">
      <h1 class="text-3xl font-medium text-900 m-0">Show Word</h1>
    </div>
    
    <div class="flex flex-column gap-4">

      <!-- 🇩🇪 GERMAN -->
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon mr-1">
            <img src="@/assets/flags/germany.png" width="20" />
        </span>
        <span>German</span>
        <InputText readonly :value="word.german" placeholder="German" class="w-full" />
      </div>

      <!-- 🇬🇧 ENGLISH -->
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon mr-1">
            <img src="@/assets/flags/england.png" width="20" />
        </span>
        <span>English</span>
        <InputText readonly :value="word.english" placeholder="English" class="w-full" />
      </div>

      <Button
        label="Edit word"
        icon="pi pi-pencil"
        class="w-full"
        @click="router.push(`/words/${route.params.id}/edit`)"
      />
    </div>
  </div>
</template>

  
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { api } from '@/helpers/helpers.js';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

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
</script>
  
<style scoped>
</style>
