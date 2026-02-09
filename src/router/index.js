import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '../views/SignIn.vue'
import BoardWriteMod from '@/views/BoardWriteMod.vue'
import { useAuthenticationStore } from '@/stores/authentication'
import BoardList from '@/views/BoardList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component:() => import('../views/home.vue')
    },
    {
      path: '/signup',
      component:()=> import('../views/SignUp.vue')
    },
    {
      path: '/signin',
      component: SignIn
    },
    {
      path: '/board/write',
      component: BoardWriteMod
    },
    {
      path: '/board/list',
      component: BoardList
    }
  ],
})

//로그인, 비로그인 상태일 때 접근할 수 없는 라우팅 처리
//navigation guard 이용해서 처리

//비로그인 시 이용할 수 있는 path들
const publicPathList = ['/board/list', '/board/detail/']
const unSignedPathList = ['/signin', '/signup'];

//라우팅 될 때마다 아래 콜백함수가 계속 실행됨
router.beforeEach( (to, from) => {
  const authentication = useAuthenticationStore();

  //이동하는 경로가 unSignedPathList에 포함되어 있으면 true, 없으면 false
  if(publicPathList.includes(to.path)){
    return;
  }else if(unSignedPathList.includes(to.path) && authentication.state.isSigned){
    return{path: '/'};
  }else if(!authentication.state.isSigned && !unSignedPathList.includes(to.path)){
    return{path:'/signin'}
  }
});

export default router