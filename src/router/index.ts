import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, loginTokenGuard } from '@/core/guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'authLayout',
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/pages/auth/LoginPage.vue'),
          beforeEnter: [loginTokenGuard]
        }
      ]
    },

    {
      path: '',
      name: 'mainLayout',
      component: () => import('@/layouts/DashboardLayout.vue'),
      children: [
        {
          path: '',
          redirect: '/overview'
        },
        {
          path: '/overview',
          name: 'overview',
          component: () => import('@/pages/dashboard/OverviewPage.vue'),
          beforeEnter: [authGuard]
        }
      ]
    }
  ]
})

export default router
