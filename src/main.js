import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import * as helpers from './helpers'

const pinia = createPinia()

createApp(App)
  .provide("myHelpers", helpers)
  .use(router)
  .use(pinia)
  .mount('#app')
