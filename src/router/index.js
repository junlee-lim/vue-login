import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'
import BoardWriteMod from '@/views/BoardWriteMod.vue'
import { useAuthenticationStore } from '@/stores/authentication'
import BoardList from '@/views/BoardList.vue'
import BoardDetail from '@/views/BoardDetail.vue'

/*
meta 속성에 requiresAuth: true면 비로그인 시 접근 가능한 path
meta 속성에 requiresGuest: true면 로그인 시 접근 가능한 path
*/

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:() => import('../views/home.vue')
    },
    {
      path: '/signup',
      component:()=> import('../views/SignUp.vue'),
      meta: {requiresGuest: true}
    },
    {
      path: '/signin',
      component: SignIn,
      meta: {requiresGuest: true}
    },
    {
      path: '/board/write',
      component: BoardWriteMod,
      meta: {requireAuth: true}
    },
    {
      path: '/board/list',
      component: BoardList
    },
    {
      path: '/board/:id',
      component: BoardDetail
    },
  ],
})

//로그인, 비로그인 상태일 때 접근할 수 없는 라우팅 처리
//navigation guard 이용해서 처리

//라우팅 될 때마다 아래 콜백함수가 계속 실행됨
router.beforeEach( (to, from, next) => {
  const authentication = useAuthenticationStore();
  const isSigned = authentication.state.isSigned;

  //비로그인 상태에서 로그인이 필요한 path로 가려고 할 때
  if(to.meta.requiresAuth && !isSigned){
    return next('/signin');
  }
  //로그인 상태에서 로그인이 필요한 path로 가려고 할 때
  if(to.meta.requiresGuest && isSigned){
    return next('/');
  }
  next(); //원래 처리대로
});

export default router