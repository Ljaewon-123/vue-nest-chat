import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/main'
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
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router