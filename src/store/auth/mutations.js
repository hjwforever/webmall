/*
export function someMutation (state) {
}
*/
export function loginSuccess(state, user) {
  state.status.loggedIn = true
  state.user = user
}
export function loginFailure(state) {
  state.status.loggedIn = false
  state.user = null
}
export function logout(state) {
  state.status.loggedIn = false
  state.user = null
}
export function registerSuccess(state) {
  state.status.loggedIn = false
}
export function registerFailure(state) {
  state.status.loggedIn = false
}
