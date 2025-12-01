<template>
  <div class="layout-wrapper">
    <Toast />
    <!-- Hide header on login/register pages -->
    <div v-if="!$route.meta.hideHeader" class="header-wrapper">
      <div class="header-content">
        <Menubar :model="items" class="custom-menubar">
          <template #end>
            <Button 
                label="Logout"
                icon="pi pi-sign-out"
                text
                severity="danger"
                class="mr-2"
                @click="onLogout"
            />
            <Button 
                  :icon="isDarkMode ? 'pi pi-moon' : 'pi pi-sun'" 
                  rounded 
                  text 
                  severity="secondary"
                  @click="toggleTheme" 
                  aria-label="Toggle Theme"
            />
          </template>
          
        </Menubar>
      </div>
    </div>

    <div class="layout-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Menubar from 'primevue/menubar';
import Toast from 'primevue/toast';
import Button from 'primevue/button';
import { logout } from '@/helpers/firebase';

const router = useRouter();
const isDarkMode = ref(false);

const items = ref([
    {
        label: 'Words',
        icon: 'pi pi-comments',
        command: () => router.push('/words')
    },
    {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => router.push('/words/new')
    },
    {
        label: 'Test',
        icon: 'pi pi-question',
        command: () => router.push('/test')
    },
    
]);

function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
    const element = document.querySelector('html');
    if (isDarkMode.value) {
        element.classList.add('app-dark');
    } else {
        element.classList.remove('app-dark');
    }
    // Save preference
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
}

async function onLogout() {
    try {
        await logout();
    } finally {
        router.push('/login');
    }
}

onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        isDarkMode.value = true;
        document.querySelector('html').classList.add('app-dark');
    }
});
</script>

<style>
:root {
    --surface-ground: var(--p-surface-50);
    --surface-card: var(--p-surface-0);
    --surface-border: var(--p-content-border-color);
    --text-color: var(--p-text-color);
}

.app-dark {
    --surface-ground: var(--p-surface-950);
    --surface-card: var(--p-surface-900);
}


body {
    margin: 0;
    font-family: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont,
                 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--surface-ground);
    color: var(--text-color);
}

.header-wrapper {
    background-color: var(--surface-card);
    border-bottom: 1px solid var(--surface-border);
    padding: 0.5rem 0; /* Padding dọc cho wrapper */
}

.header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem; /* Padding ngang để content thụt vào trong */
}

.custom-menubar {
    border: none !important;
    padding: 0 !important; /* Reset padding mặc định của Menubar vì đã padding ở wrapper */
    background: transparent !important;
}

.layout-content {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.mr-2 {
    margin-right: 0.5rem;
}
</style>
