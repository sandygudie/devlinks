import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const app = createApp(App)
app.component('v-select', vSelect)

app.use(Vue3Toasity, {
  autoClose: 3000,
  toastClassName: 'text-xs !min-h-[7px]',
} as ToastContainerOptions)
app.use(router)

app.mount('#app')
