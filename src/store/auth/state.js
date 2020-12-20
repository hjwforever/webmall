export default function () {
  const user = JSON.parse(localStorage.getItem('user'))
  return user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null }
}
