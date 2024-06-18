
import axios from 'axios'
import { ElMessage  } from 'element-plus'
import useUserStore from '@/store/modules/user'



const request = axios.create({
  baseURL: import.meta.env.VITE_USER_NODE_ENV === "development" ? import.meta.env.VITE_APP_BASE_URL : import.meta.env.VITE_APP_SERVER_URL, // api的base_url
  timeout: 5000 // request timeout
})

console.log(import.meta.env, 'import.meta.env')

request.interceptors.request.use(
    config => {
        let userStore = useUserStore()

        if (userStore.token) {
            config.headers.token = userStore.token
        }
        return config
    },
    error => {
        // Do something with request error
        Promise.reject(error)
    }
)
request.interceptors.response.use(
  response => {
    // Do something with response data
    return response.data
  },
    error => {
        let status = error.response?.status
        let message = ''
        switch (status) {
            case 401:
                message = '登录过期，请重新登录'
                break
            case 403:
                message = '无权访问'
                break
            case 404:
                message = '请求错误,未找到该资源'
                break
            case 500:
                message = '服务器端出错'
                break
            default:
                message = '网络出现问题'
        }
    // Do something with response error
    ElMessage({
        message: message,
        type: 'error'
    })
    return Promise.reject(error)
  }
)

export default request