import Vue from 'vue'
import App from './App'
import router from './router'
import global from '@/utils/registerGlobal'
import store from '@/store'
import '@/utils/rem'
import '@/style/index'
Vue.use(router)
Vue.use(global)
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
})