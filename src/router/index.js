import Router from 'vue-router'
import Vue from 'vue'
import Menu from '@/components/menu'
import Discovery from '@/view/discovery/index'
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      component: Discovery,
      name: '默认',
      meta: {title: '发现音乐'}
    },
    {
      path: '/menu',
      component: Menu,
      name: '菜单'
    }
  ]
})
export default router
