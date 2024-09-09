import { createApp } from 'vue'
import './assets/css/index.scss'
import App from './App.vue'
import router from '@/router/index'
import globalComponents from '@/components/index.ts'
import pinia from '@/store'
import 'virtual:svg-icons-register'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { isHasButton } from './directive/has'

import WujieVue from 'wujie-vue3'
const app = createApp(App)
isHasButton(app)
app.use(pinia)
app.use(WujieVue)
app.use(globalComponents)
app.use(router)
app.mount('#app')


declare global { 
    interface Window { 
        $wujie: {
            props: Record<string, any>
        },
        subProps: Record<string, any>
    }
}