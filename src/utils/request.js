import axios from 'axios'
import { Message } from 'element-ui'

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
