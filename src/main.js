import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import * as helpers from './helpers'
import * as mySettings from './settings'
const pinia = createPinia()

createApp(App)
  .provide("myHelpers", helpers)
  .provide("mySettings", mySettings)
  .use(router)
  .use(pinia)
  .mount('#app')
