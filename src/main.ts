import { createApp } from 'vue'
import './assets/css/index.scss'
import App from './App.vue'
import router from '@/router/index'
import globalComponents from '@/components/index.ts'
import pinia from '@/store'
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { isHasButton } from './directive/has'
const app = createApp(App)
isHasButton(app)
app.use(pinia)
app.use(globalComponents)
app.use(router)
app.mount('#app')
