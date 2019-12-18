import Vue from 'vue'
import App from './App'
import router from './router'
import global from '@/utils/registerGlobal'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/utils/rem'
import '@/style/index'
Vue.use(router)
Vue.use(global)
Vue.use(ElementUI)
// Vue.component(Button.name, Button);
new Vue({
  router,
  el: '#app',
  render: h => h(App),
})