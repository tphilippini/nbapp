import '../index.scss';

import App from '@/App.vue';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';
import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { router } from '@/routes';

const i18n = createI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  messages: {
    en,
    fr,
  },
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);

app.use(i18n);
app.use(pinia);
app.use(router);

app.mount('#app');
