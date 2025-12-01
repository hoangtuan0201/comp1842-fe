<template>
  <div class="flex align-items-center justify-content-center min-h-screen surface-ground relative p-4">
    
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-5 border-1 surface-border" style="max-width: 550px;">
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
        <h1 class="text-900 text-3xl font-medium mb-3">Sign in</h1>
        <p class="text-600 font-medium m-0">Login to your account</p>
      </div>

      <form @submit.prevent="onEmailLogin">
        <div class="flex flex-column gap-3">
          <div class="mb-3">
             <label for="email" class="block text-900 font-medium mb-2">Email address</label>
             <InputText id="email" v-model="email" class="w-full" placeholder="Enter your email" />
          </div>

          <div class="mb-3">
            <label for="password" class="block text-900 font-medium mb-2">Password</label>
            <Password id="password" v-model="password" :feedback="false" toggleMask class="w-full" inputClass="w-full" placeholder="Enter your password" />
          </div>

          <!-- <div class="flex justify-content-end mb-3">
            <a href="#" class="text-sm font-medium no-underline text-primary cursor-pointer">Forgot password?</a>
          </div> -->

          <Button type="submit" label="Sign in" class="w-full" :loading="loading" />
        </div>
      </form>

      <div class="flex align-items-center my-4">
          <div class="flex-1 border-top-1 surface-border"></div>
          <span class="px-2 text-600 font-medium text-sm">OR</span>
          <div class="flex-1 border-top-1 surface-border"></div>
      </div>

      <div>
        <Button 
          label="Continue with Google" 
          icon="pi pi-google" 
          class="w-full p-button-outlined surface-border text-900" 
          @click="onGoogleLogin" 
        />
      </div>

      <div class="text-center mt-4">
        <span class="text-600 font-medium">Don't have an account? </span>
        <router-link to="/register" class="font-bold text-primary no-underline cursor-pointer">Sign up</router-link>
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
import { loginWithGoogle, loginWithEmail } from '@/helpers/firebase';

const router = useRouter();
const toast = useToast();

const email = ref('');
const password = ref('');
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

const onGoogleLogin = async () => {
  try {
    const { user } = await loginWithGoogle();
    toast.add({ severity: 'success', summary: 'Success', detail: `Welcome ${user.displayName}`, life: 3000 });
    router.push('/words');
  } catch {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Google login failed', life: 3000 });
  }
};

const onEmailLogin = async () => {
  if (!email.value.trim() || !password.value.trim()) {
    toast.add({
      severity: 'warn',
      summary: 'Missing information',
      detail: 'Please enter both email and password.',
      life: 3000
    });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    toast.add({
      severity: 'warn',
      summary: 'Invalid Email',
      detail: 'Please enter a valid email address.',
      life: 3000
    });
    return;
  }
  if (password.value.length < 6) {
    toast.add({
      severity: 'warn',
      summary: 'Weak Password',
      detail: 'Password must be at least 6 characters.',
      life: 3000
    });
    return;
  }

  loading.value = true;

  try {
    const user = await loginWithEmail(email.value, password.value);
    toast.add({
      severity: 'success',
      summary: 'Login Successful',
      detail: `Welcome back, ${user.email}`,
      life: 3000
    });

    router.push('/words');

  } catch (err) {
    console.error(err);
    let message = 'Login failed. Please check your email and password.';
    toast.add({
      severity: 'error',
      summary: 'Login Error',
      detail: message,
      life: 3000
    });
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
