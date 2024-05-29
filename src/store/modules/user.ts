// 用户相关store


import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogOut } from '@/api/user'
import { constRoutes, anyRouter } from '@/router/router'
import { authRoute } from '@/router/auth'
import { productRoute } from '@/router/product'
import router from '@/router'
import type { UserState } from './type/type'
import type { LoginData, UserInfoRes } from '@/api/user/type'
import type { RouteRecordRaw } from 'vue-router'

import { cloneDeep } from 'lodash'


// 动态路由
let dynamicRoutes: RouteRecordRaw[] = []

/**
 * 
 * @param asyncRoute 用户定义的路由
 * @param routes 接口返回的路由
 * @returns 与接口返回相匹配的路由
 */
function filterRoute(asyncRoute: RouteRecordRaw[], routes: any) {
  return asyncRoute.filter((item) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterRoute(item.children, routes)
      }
      return true
    }
  })
}


const useUserStore = defineStore('user', {
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRouter: [
                ...constRoutes
            ],
            username: '',
            avatar: '',
            buttons: [],
        }
    },
    getters: {
        getUserInfo: (state) => {
            return state
        }
    },
    actions: {
        //用户登录方法
        async userLogin(data: LoginData) {
            let res = await reqLogin(data)
            console.log(res, '登录');

            if (res.code === 200) {
                this.token = res.data as string
                // 持久化
                SET_TOKEN(this.token)
                return 'ok'
            } else {
                return Promise.reject(new Error(res.data))
            }
        },
        async userInfo() {
            let res: UserInfoRes = await reqUserInfo()

            if (res.code === 200) {
                this.username = res.data.name as string
                this.avatar = res.data.avatar as string
                this.buttons = res.data.buttons
                let userAsyncRoute = filterRoute(
                    cloneDeep([...authRoute, ...productRoute]),
                    res.data.routes,
                )
                console.log(userAsyncRoute, 'userAsyncRoute');
                
                this.menuRouter = [...constRoutes, ...userAsyncRoute,...anyRouter]
                dynamicRoutes = [...userAsyncRoute, ...anyRouter] // 记录动态添加的路由
                dynamicRoutes.forEach((route) => {
                    router.addRoute(route) // 动态添加路由
                })
                console.log('routerdongtai', router.getRoutes());
                
                return 'ok'
            } else {
                return Promise.reject(new Error(res.message))
            }
        },
        async userLogout() {
            let res = await reqLogOut()
            if (res.code === 200) {
                this.token = ''
                this.username = ''
                this.avatar = ''
                REMOVE_TOKEN()
                dynamicRoutes.forEach((route) => {
                    router.removeRoute(route.name as string)
                })
            } else {
                return Promise.reject(new Error(res.message))
            }
        },
    }
})

export default useUserStore

// 封装本地存储数据与读取数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
