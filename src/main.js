import { createApp } from 'vue'
import { createPinia } from 'pinia'
import CKEditor from '@ckeditor/ckeditor5-vue';

import App from './App.vue'
import router from './router'
import setupInterceptors from './services/interceptors';

// eslint-disable-next-line
import 'bootstrap'

setupInterceptors(router);
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(CKEditor)
app.mount('#app')
