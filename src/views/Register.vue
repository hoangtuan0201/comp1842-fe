<template>
  <div class="flex align-items-center justify-content-center min-h-screen surface-ground relative p-4">
    
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-5 border-1 surface-border" style="max-width: 450px;">
      <div class="flex justify-content-end">
        <Button 
            :icon="isDarkMode ? 'pi pi-moon' : 'pi pi-sun'" 
            rounded 
            text 
            severity="secondary"
            @click="toggleTheme" 
            aria-label="Toggle Theme"
        />
      </div>
      <div class="text-center mb-5">
        <h1 class="text-900 text-3xl font-medium mb-3">Create Account</h1>
        <p class="text-600 font-medium m-0">Sign up to get started</p>
      </div>

      <form @submit.prevent="onRegister">
        <div class="flex flex-column gap-3">
          <div class="mb-3">
             <label for="email" class="block text-900 font-medium mb-2">Email address</label>
             <InputText id="email" v-model="email" class="w-full" placeholder="Enter your email" />
          </div>

          <div class="mb-3">
            <label for="password" class="block text-900 font-medium mb-2">Password</label>
            <Password id="password" v-model="password" :feedback="false" toggleMask class="w-full" inputClass="w-full" placeholder="Enter your password" />
          </div>
          
          <div class="mb-3">
            <label for="confirmPassword" class="block text-900 font-medium mb-2">Confirm Password</label>
            <Password id="confirmPassword" v-model="confirmPassword" :feedback="false" toggleMask class="w-full" inputClass="w-full" placeholder="Confirm your password" />
          </div>

          <Button type="submit" label="Sign up" class="w-full mt-3" :loading="loading" />
        </div>
      </form>

      <div class="text-center mt-4">
        <span class="text-600 font-medium">Already have an account? </span>
        <router-link to="/login" class="font-bold text-primary no-underline cursor-pointer">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { registerWithEmail } from '@/helpers/firebase';

const router = useRouter();
const toast = useToast();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const isDarkMode = ref(false);

function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
    const element = document.querySelector('html');
    if (isDarkMode.value) {
        element.classList.add('app-dark');
    } else {
        element.classList.remove('app-dark');
    }
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
}

onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        isDarkMode.value = true;
        document.querySelector('html').classList.add('app-dark');
    }
});

const onRegister = async () => {
  if (!email.value || !password.value) {
      toast.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill in all fields', life: 3000 });
      return;
  }
  if (password.value !== confirmPassword.value) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Passwords do not match', life: 3000 });
      return;
  }

  loading.value = true;
  try {
    await registerWithEmail(email.value, password.value);
    toast.add({ severity: 'success', summary: 'Success', detail: 'Account created successfully', life: 3000 });
    router.push('/words');
  } catch (err) {
    console.error(err);
    toast.add({ severity: 'error', summary: 'Error', detail: err.message, life: 3000 });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>

:deep(.p-password .p-icon) {
    cursor: pointer;
}
</style>
