let homeRoutes = {
  path: '/home',
  name: 'ProFound',
  redirect: '/home/forU',
  component: () => import('@/views/profound/ProFound.vue'),
  children: [
    {
      path: 'forU',
      name: 'forU',
      component: () => import('@/views/profound/child/foru/forU.vue')
    },
    {
      path: 'songlist',
      name: 'songlist',
      component: () => import('@/views/profound/child/songlist.vue')
    },
    {
      path: 'dj',
      name: 'dj',
      component: () => import('@/views/profound/child/dj.vue')
    },
    {
      path: 'top',
      name: 'top',
      component: () => import('@/views/profound/child/top.vue')
    },
    {
      path: 'artist',
      name: 'artist',
      component: () => import('@/views/profound/child/artist.vue')
    },
    {
      path: 'newsong',
      name: 'newsong',
      component: () => import('@/views/profound/child/newSong.vue')
    },
  ]
}

export default homeRoutes