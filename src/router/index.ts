import { createRouter, createWebHashHistory } from "vue-router";
// import type { RouteRecordRaw } from "vue-router";
import{ constRoutes } from './router'

import setting from '@/setting'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/store'
import useUserStore from '@/store/modules/user'
const routes = [
    ...constRoutes,
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    // 滚动行为
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})

// pinia参数是防止在初始化之前使用pinia
let userStore = useUserStore(pinia)
// 进度条配置
nprogress.configure({ showSpinner: false })
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title + `- ${setting.title}`
    nprogress.start()
    let token = userStore.token
    let username = userStore.username

    if (token) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            // 有用户信息直接放行
            if (username) {
                next()
            } else {
                try {
                    await userStore.userInfo()
                    next({ ...to })
                } catch (error) {
                    // token 过期获取不到用户信息 先退出登录 然后跳转到登录页
                    await userStore.userLogout()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
})
// 全局后置守卫
router.afterEach((route) => {
    nprogress.done()
})

export default router

