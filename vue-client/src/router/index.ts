import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/name'
  },
  {
    path: '/name',
    name : 'Name',
    component: () => import('@/views/UserNameView.vue')
  },
  {
    path: '/main',
    name : 'Main',
    component: () => import('@/views/MainView.vue')
  },
  {
    path: '/room/:roomName',
    name: 'Room',
    component: () => import('@/views/RoomView.vue')
  },
  {
    path: '/redis',
    name: 'Redis',
    component: () => import('@/views/RedisStreamView.vue')
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router