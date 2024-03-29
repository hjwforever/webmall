import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // 全局路由守卫
  // Router.beforeEach((to, from, next) => {
  //   const publicPages = ['/login', '/register', '/home']
  //   const authRequired = !publicPages.includes(to.path)
  //   const loggedIn = localStorage.getItem('user')
  //
  //   // 未登录则重定向至登录页
  //   if (authRequired && !loggedIn) {
  //     next('/login')
  //   } else {
  //     next()
  //   }
  // })

  // Router.beforeEach((to, from, next) => {
  //   if (to.matched.some(record => record.meta.requireAuth) && !store.getters['auth/isSignedIn']) {
  //     next({ name: 'account-signin', query: { next: to.fullPath } })
  //   } else {
  //     next()
  //   }
  // })
  return Router
}
