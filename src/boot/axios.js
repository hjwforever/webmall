import Vue from 'vue'
import axios from 'axios'
import {
  LoadingBar
} from 'quasar'

export default axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: 'https://webmall-server.herokuapp.com/api',
  baseURL: 'http://localhost:8086/api',
  headers: {
    'Content-type': 'application/json;charset=utf-8'
  },
  timeout: 10000
})

// 请求拦截器
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

LoadingBar.setDefaults({
  color: 'light-blue-4',
  size: '4px',
  position: 'top'
})

Vue.prototype.$axios = axios
