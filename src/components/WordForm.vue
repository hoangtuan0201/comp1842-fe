<template>
  <form @submit.prevent="onSubmit" class="flex flex-column gap-4" style="max-width: 400px; margin: 0 auto;">

    <div class="flex flex-column gap-2">
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon mr-1">
                <img src="@/assets/flags/germany.png" width="20" />
            </span>
            <span>German</span>
            <InputText id="german" v-model="localWord.german" placeholder="Enter German word..." class="w-full" />
        </div>
    </div>

    <div class="flex flex-column gap-2">
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon mr-1">
                <img src="@/assets/flags/england.png" width="20" />
            </span>
            <span>English</span>
            <InputText id="english" v-model="localWord.english" placeholder="Enter English word..." class="w-full" />
        </div>
    </div>

    <div class="flex flex-column gap-2">
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon mr-1">
                <img src="@/assets/flags/vietnam.png" width="20" />
            </span>
            <span>Vietnamese</span>
            <InputText id="vietnamese" v-model="localWord.vietnamese" placeholder="Enter Vietnamese word..." class="w-full" />
        </div>
    </div>

    <Button type="submit" label="Submit" icon="pi pi-check" class="w-full" />
  </form>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const props = defineProps({
  word: {
    type: Object,
    required: false,
    default: () => ({ english: '', german: '' })
  }
});

const emit = defineEmits(['createOrUpdate']);

const localWord = ref(props.word ? { ...props.word } : { english: '', german: '' });
const errorsPresent = ref(false);

watch(() => props.word, (newVal) => {
  localWord.value = newVal ? { ...newVal } : { english: '', german: '' };
});

const onSubmit = () => {
  if (localWord.value.english === '' || localWord.value.german === '') {
    errorsPresent.value = true;
    toast.add({ severity: 'error', summary: 'Error', detail: 'Please fill out both fields!', life: 3000 });
  } else {
    errorsPresent.value = false;
    emit('createOrUpdate', localWord.value);
  }
};
</script>

<style scoped>
</style>
