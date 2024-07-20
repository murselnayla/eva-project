import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import HighchartsVue from 'highcharts-vue'
import '@/assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast)
app.use(HighchartsVue)

app.mount('#app')
