/*
export function someGetter(state) {
}
*/
export function isloggedIn(state) {
  return state.status.loggedIn
}

export function getUser(state) {
  return state.user || { userId: Math.random(), username: 'me', password: '123456', avatar: 'https://s3.ax1x.com/2020/12/30/rq3lmF.png' }
}
