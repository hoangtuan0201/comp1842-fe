<template>
  <div style="text-align: center; margin-bottom: 1rem;">
    <h1>Sorry, This Page doesn't exist!</h1>
    <Button label="Back To Home" @click="goHome" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Button from 'primevue/button';

const router = useRouter();

const goHome = () => {
    router.push('/words');
};
</script>