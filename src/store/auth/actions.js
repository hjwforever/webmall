/*
export function someAction (context) {
}
*/
import AuthService from '../../services/auth.service'
import { Notify } from 'quasar'

export function login({ commit }, user) {
  return AuthService.login(user).then(
    user => {
      commit('loginSuccess', user)
      // Notify.create({
      //   message: 'loginSuccess'
      // })
      return Promise.resolve(user)
    },
    error => {
      commit('loginFailure')
      return Promise.reject(error)
    }
  )
}
export function logout({ commit }) {
  AuthService.logout()
  commit('logout')
  Notify.create({
    message: 'Logout Successfully'
  })
}
export function register({ commit }, user) {
  return AuthService.register(user).then(
    response => {
      commit('registerSuccess')
      // Notify.create({
      //   message: 'Register Successfully'
      // })
      return Promise.resolve(response.data)
    },
    error => {
      commit('registerFailure')
      // Notify.create({
      //   message: 'Register Failure',
      //   type: 'negative'
      // })
      return Promise.reject(error)
    }
  )
}
