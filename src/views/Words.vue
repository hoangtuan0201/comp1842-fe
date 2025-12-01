<template>
  <div class="surface-card p-4 shadow-2 border-round">
    <div class="flex justify-content-between align-items-center mb-4">
        <h1 class="text-3xl font-medium text-900 m-0">Words</h1>
        <IconField iconPosition="left">
            <InputIcon class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
        </IconField>
    </div>
    
    <DataTable 
      :value="words" 
      stripedRows 
      showGridlines 
      sortMode="single"
      paginator 
      :rows="10" 
      :rowsPerPageOptions="[5, 10, 20, 50]"
      v-model:filters="filters"
      :globalFilterFields="['english', 'german', 'vietnamese']"
    >
      <Column field="english" header="English" class="sm:table-cell" sortable>
         <template #body="slotProps">
             <div class="flex align-items-center gap-2">
                 <span>{{ slotProps.data.english }}</span>
                 <i class="pi pi-volume-up cursor-pointer text-primary" @click="speak(slotProps.data.english, 'en-US')" title="Listen (EN)"></i>
             </div>
         </template>
      </Column>
      <Column field="german" header="German" sortable class="sm:table-cell">
         <template #body="slotProps">
             <div class="flex align-items-center gap-2">
                 <span>{{ slotProps.data.german }}</span>
                 <i class="pi pi-volume-up cursor-pointer text-primary" @click="speak(slotProps.data.german, 'de-DE')" title="Listen (DE)"></i>
             </div>
         </template>
      </Column>
      <Column field="vietnamese" header="Vietnamese" sortable class="sm:table-cell">
         <template #body="slotProps">
             <div class="flex align-items-center gap-2">
                 <span>{{ slotProps.data.vietnamese }}</span>
                 <i class="pi pi-volume-up cursor-pointer text-primary" @click="speak(slotProps.data.vietnamese, 'vi-VN')" title="Listen (VN)"></i>
             </div>
         </template>
      </Column>
      <Column header="Actions" :exportable="false" style="width: 8rem">
        <template #body="slotProps">
            <div class="flex gap-1">
                <Button icon="pi pi-eye" text rounded severity="info" aria-label="Show" @click="router.push(`/words/${slotProps.data._id}`)" />
                <Button icon="pi pi-pencil" text rounded severity="success" aria-label="Edit" @click="router.push(`/words/${slotProps.data._id}/edit`)" />
                <Button icon="pi pi-trash" text rounded severity="danger" aria-label="Delete" @click="onDelete(slotProps.data._id)" />
            </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { api } from '@/helpers/helpers.js';
import { speakVietnamese } from '@/helpers/tts.js';
import { FilterMatchMode } from '@primevue/core/api';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

const words = ref([]);
const router = useRouter();
const toast = useToast();

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const loadWords = async () => {
    try {
        words.value = await api.getWords();
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Could not load words', life: 3000 });
    }
};

onMounted(loadWords);

const onDelete = async (id) => {
    if (confirm('Are you sure you want to delete this word?')) {
        try {
            await api.deleteWord(id);
            toast.add({ severity: 'success', summary: 'Success', detail: 'Word deleted successfully', life: 3000 });
            await loadWords();
        } catch (e) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Could not delete word', life: 3000 });
        }
    }
};

const speak = async (text, lang) => {
    if (lang === 'vi-VN') {
        try {
            await speakVietnamese(text);
        } catch (e) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Could not play Vietnamese audio', life: 3000 });
        }
        return;
    }

    if (!window.speechSynthesis) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'Text-to-speech not supported', life: 3000 });
        return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
};
</script>

<style scoped>
</style>
