import Axios from 'axios'
import router from '@/router/index.js'

const axios = Axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? '' : '',
})
// 请求方式和权限的映射表
const actionMapping = {
  'get': 'view',
  'post': 'add',
  'put': 'edit',
  'delete': 'delete'
}

axios.interceptors.request.use(config => {
  if (config.url !== '/login') {
    config.headers.Authorization = localStorage.getItem('token')
    // 判断非权限范围内的请求
    // 当前的请求是view, add, edit, delete的哪一个
    const action = actionMapping[config.method]
    // 当前路由拥有的权限
    const currentRight = router.currentRoute.meta
    if (currentRight && !currentRight.includes(action)) {
      alert('没有权限')
      return Promise.reject(new Error('没有权限'))
    }
  }
  return config
})

axios.interceptors.response.use(res => {
  // 如果请求401则强制跳转登录
  if (res.status === 401) {
    router.push('/login')
    localStorage.clear()
    // 重置vuex
    window.location.reload()
  }
  return res
})

export default (url, method = 'get', data = {}) => {
  return axios({
    url,
    method,
    data
  })
}
