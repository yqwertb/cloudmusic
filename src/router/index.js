import Vue from 'vue'
import VueRouter from 'vue-router'

import homeRoutes from './home'
import videoRoutes from './video'

Vue.use(VueRouter)

let routes = [
  {
    path: '*',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '/',
    redirect: '/home/forU',
    component: () => import('@/views/profound/child/foru/forU.vue')
  },
  {
    path: '/fm',
    name: 'MyFm',
    component: () => import('@/views/my_fm/myFm.vue')
  },
  {
    path: '/friend',
    name: 'Friend',
    component: () => import('@/views/my_friend/MyFriend.vue')
  },
  {
    path: '/listdetail/:id',
    name: 'listdetail',
    component: () => import('@/components/context/detail/detail.vue')
  },
  {
    path: '/albumdetail/:id',
    name: 'albumdetail',
    component: () => import('@/components/context/detail/detail.vue')
  },
]
routes.push(homeRoutes, videoRoutes)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
