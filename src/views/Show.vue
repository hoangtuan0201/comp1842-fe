<template>
    <div class="card" style="max-width: 500px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 1rem;">
        <h1>Show Word</h1>
    </div>
        
        <div class="flex flex-column gap-4">          

            <div class="p-inputgroup">
                <span class="p-inputgroup-addon"><i class="germany flag"></i> </span>
                <InputText readonly :value="word.german" placeholder="German" />
            </div>

            <div class="p-inputgroup">
                <span class="p-inputgroup-addon"><i class="united kingdom flag"></i> </span>
                <InputText readonly :value="word.english" placeholder="English" />
            </div>

            <Button label="Edit word" icon="pi pi-pencil" @click="router.push(`/words/${route.params.id}/edit`)" />
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
.flex {
    display: flex;
}
.flex-column {
    flex-direction: column;
}
.justify-content-center {
    justify-content: center;
}
.gap-4 {
    gap: 1.5rem;
}
.mb-4 {
    margin-bottom: 1.5rem;
}
</style>
