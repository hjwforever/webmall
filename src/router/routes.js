
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        alias: '/index',
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
        component: () => import('pages/user')
      }
    ]
  },
  {
    path: '/user/login',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/user/Login.vue')
      }
    ]
  },
  {
    path: '/user/register',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/user/Register.vue')
      }
    ]
  },
  // {
  //   path: '/user/registerResult',
  //   name: 'registerResult',
  //   props: true,
  //   component: () => import('layouts/UserLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('pages/RegisterResult.vue')
  //     }
  //   ]
  // },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
