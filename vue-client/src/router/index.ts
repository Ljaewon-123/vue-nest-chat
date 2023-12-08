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
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router