import axios from 'axios'
import { Message } from 'element-ui'
import Cookies from 'js-cookie'

import router from '@/router'
import store from '@/store'
// import { getToken, setToken } from '@/utils/auth'

// import convert from './converter'

// create an axios instance
const service = axios.create({
  // baseURL: 'http://127.0.0.1:5000',
  //通用请求的地址前缀
  baseURL: '/api',
  // baseURL: 'http://121.36.47.237',
  timeout: 10000,
  // withCredentials: true
})
service.interceptors.request.use(
  config => {  
    let token = Cookies.get('token')
    // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
    // console.log(store.state.loading)
    // console.log('准备发送请求...')
    // 2. 带上token
    console.log("@@@@config",config);
    if (token) {
      config.headers.accessToken = token
    } else {
      // 重定向到登录页面
      router.push('/login')
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response
      return res
    },
  error => {
    return Promise.reject(error)
  }
)

export default service
