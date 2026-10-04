import { createApp } from 'vue'
import { createI18n } from './i18n'
import router from './router'
import App from './App.vue'
import './assets/css/main.css'

// Create the app instance
const app = createApp(App)

// Create i18n instance
const i18n = createI18n()

// Use plugins
app.use(i18n)
app.use(router)

// Mount the app
app.mount('#app')