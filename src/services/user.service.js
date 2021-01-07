import axios from 'axios'
import authHeader from './auth-header'

// const API_URL = 'http://localhost:8080/api/test/'
// const API_URL = 'http://aruoxi-nodejs-mysql.herokuapp.com/api/user/'
const API_URL = process.env.VUE_APP_BASE_API + '/user/'

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all')
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() })
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() })
  }
}

export default new UserService()
