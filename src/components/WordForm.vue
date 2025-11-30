<template>
  <form @submit.prevent="onSubmit" class="flex flex-column gap-4" style="max-width: 400px; margin: 0 auto;">
    <Message v-if="errorsPresent" severity="error" :closable="false">Please fill out both fields!</Message>

    <div class="flex flex-column gap-2">
        <label for="german" class="font-bold">German</label>
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="germany flag"></i>
            </span>
            <InputText id="german" v-model="localWord.german" placeholder="Enter German word..." />
        </div>
    </div>

    <div class="flex flex-column gap-2">
        <label for="english" class="font-bold">English</label>
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="united kingdom flag"></i>
            </span>
            <InputText id="english" v-model="localWord.english" placeholder="Enter English word..." />
        </div>
    </div>

    <Button type="submit" label="Submit" icon="pi pi-check" />
  </form>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Message from 'primevue/message';

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
  } else {
    errorsPresent.value = false;
    emit('createOrUpdate', localWord.value);
  }
};
</script>

<style scoped>
.flex {
    display: flex;
}
.flex-column {
    flex-direction: column;
}
.gap-2 {
    gap: 0.5rem;
}
.gap-4 {
    gap: 1.5rem;
}
.font-bold {
    font-weight: bold;
}
</style>
