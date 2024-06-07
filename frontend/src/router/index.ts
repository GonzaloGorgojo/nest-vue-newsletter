import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from '@/store/user.store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
      children: [
        {
          name: 'recipient-list',
          path: '/RecipientsList',
          component: () => import('@/components/RecipientsList.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

router.beforeEach((to) => {
  console.log('userStore.active', userStore.active)
  if (!userStore.active && to.name !== 'login') {
    return { name: 'login' }
  } else {
    return true
  }
})

export default router
