import axios from 'axios'
import { Notify } from 'vant'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: "http://39.100.88.196/api/", // url = base url + request url
  // withCredentials: true, // 当跨域请求时发送cookie
  timeout: 20000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    if (getToken()) {
      // 让每个请求携带token请求头
      config.headers['Authorization'] = 'Bearer ' + getToken()
      // config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      // ...
    }
    return config
  },
  error => {
    // 处理请求错误
    Notify('R001- ' + error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 如果自定义代码不是20000，则判断为错误。
    if (res.code !== 20000) {
      Notify(res.message || '请求错误！')
      // 50008:非法令牌;50012:其他客户登录;50014:令牌过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
       
      }
      return Promise.reject(new Error(res.message || '请求错误-后端接口有误！'))
    } else {
      return res
    }
  },
  error => {
    Notify(error.message)
    return Promise.reject(error)
  }
)

export default service
