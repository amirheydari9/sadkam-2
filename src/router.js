import Vue from 'vue'
import Router from 'vue-router'
import { authService } from './service/authService'
// import { permission } from './plugins/permission'
import store from './store/store'

Vue.use(Router)

const routes = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/test',
      name: 'Test',
      component: () => import('@/views/pages/Test/Index'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Auth/Login'),
      meta: {
        guest: true,
      },
    },
    {
      path: '/verify-code',
      name: 'LoginCheck',
      component: () => import('@/views/Auth/LoginCheck'),
      meta: {
        guest: true,
        phoneVerified: true,
      },
    },
    {
      path: '/',
      name: 'Panel',
      component: () => import('@/views/dashboard/Index'),
      meta: {
        auth: true,
      },
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // pages
        {
          name: 'Users',
          path: '/users',
          component: () => import('@/views/pages/User/Index.vue'),
          meta: {
            permission: 'USER_MANAGER',
          },
        },
        {
          name: 'Organizations',
          path: '/organizations',
          component: () => import('@/views/pages/Organization/Index.vue'),
          meta: {
            isSuperAdmin: true,
          },
        },
        {
          name: 'Products',
          path: '/products',
          component: () => import('@/views/pages/Product/Index.vue'),
          meta: {
            permission: 'ORDERS',
          },
        },
        {
          name: 'Episodes',
          path: '/episodes',
          component: () => import('@/views/pages/Episode/Index.vue'),
          meta: {
            permission: 'ORDERS',
          },
        },
        // {
        //   name: 'AssessmentRequest',
        //   path: '/assessmentRequest',
        //   component: () => import('@/views/pages/AssessmentRequest/Index.vue'),
        //   meta: {
        //     hasAssessmentRequestPermission: true,
        //   },
        // },
        {
          name: 'Request',
          path: '/request',
          component: () => import('@/views/pages/Request/Index.vue'),
          // meta: {
          //   hasAssessmentRequestPermission: true,
          // },
        },
        {
          name: 'ViewRequest',
          path: '/viewRequest',
          component: () => import('@/views/pages/ViewRequest/Index.vue'),
          meta: {
            permission: 'ORDERS',
          },
        },
        {
          name: 'Ticket',
          path: '/ticket',
          component: () => import('@/views/pages/Ticket/Index.vue'),
        },
        {
          name: 'StaticData',
          path: '/staticData',
          component: () => import('@/views/pages/StaticData/Index.vue'),
          beforeEnter: async (to, from, next) => {
            await store.dispatch('staticData/fetchRulesList')
            next()
          },
        },
      ],
    },
  ],
})

routes.beforeEach(async (to, from, next) => {
  if (authService().existToken() && !store.getters.getCurrentUser) {
    await store.dispatch('handleCurrentUser', authService().decodeToken(authService().getToken()))
  }

  if ((to.meta.phoneVerified || to.matched.some(parent => parent.meta.phoneVerified))
    && !store.getters['getLoginPhone']) {
    return next({ name: 'Login' })
  }
  if ((to.meta.guest || to.matched.some(parent => parent.meta.guest)) &&
    authService().existToken()) {
    console.log('hi')
    return next({ name: 'Panel' })
  }

  if ((to.meta.auth || to.matched.some(parent => parent.meta.auth)) &&
    !authService().existToken()) {
    return next({ name: 'Login' })
  }
  //
  // if (store.getters.getCurrentUser && to.meta.permission) {
  //   if (permission().can(to.meta.permission)) {
  //     return next()
  //   } else {
  //     await store.dispatch('logout')
  //     return next({ name: 'Login' })
  //   }
  // }
  //
  // if (store.getters.getCurrentUser && to.meta.isSuperAdmin) {
  //   if (permission().isSuperAdmin()) {
  //     return next()
  //   } else {
  //     await store.dispatch('logout')
  //     return next({ name: 'Login' })
  //   }
  // }
  // if (store.getters.getCurrentUser && to.meta.hasAssessmentRequestPermission) {
  //   if (permission().hasAssessmentRequestPermission()) {
  //     return next()
  //   } else {
  //     await store.dispatch('logout')
  //     return next({ name: 'Login' })
  //   }
  // }
  // if ((to.meta.phoneVerified || to.matched.some(parent => parent.meta.phoneVerified))
  //     && !store.state.loginPhone) {
  //     console.log(store.state.loginPhone)
  //     return next({name: 'Login'});
  // }
  return next()
})

export default routes
