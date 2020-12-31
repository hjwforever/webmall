/*
export function someGetter(state) {
}
*/
export function isloggedIn(state) {
  return state.status.loggedIn
}

export function getUser(state) {
  return state.user || { username: 'me', password: '123456' }
}
