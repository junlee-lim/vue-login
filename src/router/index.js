import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      component:()=> import('../views/SignUp.vue')
    },
    {
      path: '/signin',
      component: SignIn
    }
  ],
})

export default router
