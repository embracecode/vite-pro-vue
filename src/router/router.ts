



import type { RouteRecordRaw } from 'vue-router'

import { VueSubRouter } from './vuesub'

export const constRoutes: RouteRecordRaw[] = [
    {
        // 登录
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
        meta: {
            title: '登录', // 路由的标题
            hidden: true, // 代表该路由需要隐藏
            icon: '', // 菜单路由的图标
        }
    },
    {
        // 首页
        path: '/',
        name: 'layout',
        component: () => import('@/components/layout/index.vue'),
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            }
        ]
    },
    {
        path: '/screen',
        name: 'screen',
        component: () => import('@/views/screen/index.vue'),
        meta: {
            title: '数据大屏',
            icon: 'DataBoard'
        }
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/index.vue'),
        meta: {
            title: '404页',
            hidden: true // 代表该路由需要隐藏
        }
    },
    ...VueSubRouter
]
// 匹配不到的路由跳转404 这个路由只能动态加入 不能直接写在常量路由里 不然会导致 刷新页面匹配不到路由
export const anyRouter: RouteRecordRaw[] = [{
        //  匹配不到的路由跳转404
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'anyrouter',
        meta: {
            title: '任意路由',
            hidden: true // 代表该路由需要隐藏
        }
    }
]