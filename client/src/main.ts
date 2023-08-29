import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import vue3GoogleLogin from 'vue3-google-login'


const app = createApp(App)
app.component('v-select', vSelect)

app.use(Vue3Toasity, {
  autoClose: 3000,
  toastClassName: 'text-xs !min-h-[7px]',
} as ToastContainerOptions)
app.use(vue3GoogleLogin, {
  clientId: '154494793944-q0j1j03tp2pjtlonk8b736n22if11ce7.apps.googleusercontent.com'
})
app.use(router)

app.mount('#app')

