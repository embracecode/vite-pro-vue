// 定义modules里的小仓库类型
import type { RouteRecordRaw  } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'
export interface UserState {
    token: string | null,
    menuRouter: RouteRecordRaw[],
    username: string,
    avatar: string,
    buttons: string[]
}
// category 类型
export interface CategoryState {
    c1Id: string | number
    c2Id: string | number
    c3Id: string | number
    c1Arr: CategoryObj[]
    c2Arr: CategoryObj[]
    c3Arr: CategoryObj[]
}