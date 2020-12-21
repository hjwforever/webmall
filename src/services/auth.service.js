// import axios from 'axios'
import axios from '../boot/axios'
// const API_URL = 'http://localhost:8086/api/'
// const API_URL = 'http://aruoxi-nodejs-mysql.herokuapp.com/api/'

class AuthService {
  login (user) {
    return axios
      .post('signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  logout () {
    localStorage.removeItem('user')
  }

  register (user) {
    return axios.post('signup', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }
}

export default new AuthService()
