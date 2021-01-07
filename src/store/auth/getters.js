/*
export function someGetter(state) {
}
*/
export function isloggedIn(state) {
  return state.status.loggedIn
}

export function getUser(state) {
  const userId = Math.ceil((1 + Math.random()) * 100000)
  return state.user || { id: userId, username: '游客' + userId, password: '123456', avatar: 'https://s3.ax1x.com/2020/12/30/rq3lmF.png' }
}
