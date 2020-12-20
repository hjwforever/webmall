
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/index',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/category',
        component: () => import('pages/Category')
      },
      {
        path: '/cart',
        component: () => import('pages/Cart')
      },
      {
        path: '/user',
        component: () => import('pages/User')
      }
    ]
  },
  {
    path: '/user/login',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/User/Login1.vue')
      }
    ]
  },
  {
    path: '/user/register',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/User/Register.vue')
      }
    ]
  },
  {
    path: '/user/registerResult',
    name: 'registerResult',
    props: true,
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/RegisterResult.vue')
      }
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
