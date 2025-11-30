<template>
  <div class="card">
    <div style="text-align: center; margin-bottom: 1rem;">
      <h1>Words</h1>
    </div>
    
    <DataTable 
      :value="words" 
      tableStyle="max-width: 50rem; margin: 0 auto;" 
      stripedRows 
      showGridlines
    >
      <Column field="english" header="English" sortable></Column>
      <Column field="german" header="German"></Column>
      <Column field="vietnamese" header="Vietnamese"></Column>
      <Column header="Actions" :exportable="false">
        <template #body="slotProps">
          <div class="flex gap-2">
            <Button icon="pi pi-eye" text rounded severity="info" 
                    aria-label="Show" 
                    @click="router.push(`/words/${slotProps.data._id}`)" />
            <Button icon="pi pi-pencil" text rounded severity="success" 
                    aria-label="Edit" 
                    @click="router.push(`/words/${slotProps.data._id}/edit`)" />
            <Button icon="pi pi-trash" text rounded severity="danger" 
                    aria-label="Delete" 
                    @click="onDelete(slotProps.data._id)" />
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
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

const words = ref([]);
const router = useRouter();
const toast = useToast();

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
</script>

<style scoped>
.flex {
    display: flex;
}
.gap-2 {
    gap: 0.5rem;
}
.mb-4 {
    margin-bottom: 1.5rem;
}

</style>
