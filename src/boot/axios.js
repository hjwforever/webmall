import Vue from 'vue'
import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:8086/api',
  // baseURL: 'https://aruoxi-nodejs-mysql.herokuapp.com/api',
  headers: {
    'Content-type': 'application/json'
  }
})

Vue.prototype.$axios = axios
