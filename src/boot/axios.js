import Vue from 'vue'
import axios from 'axios'
import {
  LoadingBar
} from 'quasar'

export default axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'https://webmall-server.herokuapp.com/api',
  // baseURL: 'http://localhost:8086/api',
  headers: {
    'Content-type': 'application/json;charset=utf-8'
  },
  timeout: 20000
})

// 请求拦截器
axios.interceptors.request.use(function(config) {
  return config
}, function(error) {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function(response) {
  // const { code, message, data } = response.data
  // if (code >= 30000) {
  //   console.log('>>> 自定义错误信息，全局提示处理', message)
  //   return data
  // }
  // // 正常的code
  // if (code >= 200 && code < 300) {
  //   return data
  // }
  //
  // // 错误的code, 自己处理
  // if (code >= 300 && code < 600) {
  //   return Promise.reject(response.data)
  // }
  return response
}, function(error) {
  return Promise.reject(error)
})

LoadingBar.setDefaults({
  color: 'light-blue-4',
  size: '4px',
  position: 'top'
})

Vue.prototype.$axios = axios
