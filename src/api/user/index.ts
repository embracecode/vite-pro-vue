// 统一用户模块下的接口

import request from '@/utils/request'

import { LoginData, LoginRes, UserInfoRes } from './type'
enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout',
}
// 登录接口
export function reqLogin(data: LoginData) {
    return request<any, LoginRes>({
        url: API.LOGIN_URL,
        method: 'post',
        data: data
    })
}

// 获取用户信息接口

export const reqUserInfo = () => request.get<any, UserInfoRes>(API.USERINFO_URL)


export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL)