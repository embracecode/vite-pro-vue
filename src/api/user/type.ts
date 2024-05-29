
// 登录接口参数类型
export interface LoginData {
    username: string,
    password: string,
    verifyCode: string
}

export interface ResponseData {
  code?: number
  message?: string
  ok?: boolean
}

// 登录接口返回参数类型
export interface LoginRes extends ResponseData{
    data?: string
}

// 获取用户信息接口返回参数类型
export interface UserInfoRes extends ResponseData{
    code: number,
    data: {
        routes: string[]
        buttons: string[]
        roles: string[]
        name: string
        avatar: string
    }
}
