import axios from 'axios'
import { message } from 'antd'

let service = axios.create({
  baseURL: 'https://api.tonyhew.com',
  timeout: 50000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    console.log('request:', err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    let m = ''

    if (err.code === 'ECONNABORTED') {
      return Promise.reject(message.error('数据请求超时, 请稍后重试'))
    }

    if (err && err.response) {
      console.log(err)
      switch (err.response.status) {
        case 302:
          m = '接口重定向了！'
          break
        case 400:
          m = '参数不正确！'
          break
        case 401:
          m = '您未登录，或者登录已经超时，请先登录！'
          break
        case 403:
          m = '您没有权限操作！'
          localStorage.removeItem('openId')
          localStorage.removeItem('roleId')
          window.location.href = '/'
          break
        case 404:
          m = `请求地址出错: ${err.response.config.url}`
          break
        case 405:
          m = `请求方法不允许: ${err.response.config.url}`
          break
        case 408:
          m = '请求超时！'
          break
        case 409:
          m = '系统已存在相同数据！'
          break
        case 500:
          m = '服务器内部错误！'
          break
        case 501:
          m = '服务未实现！'
          break
        case 502:
          m = '网关错误！'
          break
        case 503:
          m = '服务不可用！'
          break
        case 504:
          m = '服务暂时无法访问，请稍后再试！'
          break
        case 505:
          m = 'HTTP 版本不受支持！'
          break
        default:
          m = '异常问题，请联系管理员！'
          break
      }
    }
    return Promise.reject(message.error(m))
  }
)

export default service
