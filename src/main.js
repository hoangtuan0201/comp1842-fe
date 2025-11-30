import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import lara from '@primevue/themes/lara';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';

// thêm CSS semantic-ui-flag
import 'semantic-ui-flag/flag.min.css';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: lara,
        options: {
            darkModeSelector: '.app-dark',
        }
    }
});
app.use(ToastService);

app.mount('#app');
