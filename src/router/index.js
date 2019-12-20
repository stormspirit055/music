import Router from 'vue-router'
import Vue from 'vue'
import Menu from '@/components/menu'
import Discovery from '@/view/discovery'
import Timeline from '@/view/timeline'
Vue.use(Router)
export const menuRoutes = [
  {
    path: '/discovery',
    name: 'discovery',
    component: Discovery,
    meta: {
      title: '发现音乐',
      icon: 'yinle1',
    },
  },
  {
    path: '/fm',
    name: 'fm',
    component: Discovery,
    meta: {
      title: '私人fm',
      icon: 'yinlediantai',
    },
  },
  {
    path: '/video',
    name: 'video',
    component: Discovery,
    meta: {
      title: '视频',
      icon: 'shipin',
    },
  },
  {
    path: '/friends',
    name: 'friends',
    component: Discovery,
    meta: {
      title: '朋友',
      icon: 'pengyou',
    },
  },
]
const router = new Router({
  routes: [
    ...menuRoutes,
    {
      path: '/',
      component: Discovery,
      name: '默认',
      meta: {title: '发现音乐'}
    },
    {
      path: '/timeline',
      component: Timeline,
      name: '动态'
    }
  ]
})
console.log(router)
export default router
