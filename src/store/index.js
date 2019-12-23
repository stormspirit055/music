import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production';
import userModule from './modules/user'
import musicModule from './modules/music'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    user: userModule,
    music: musicModule
  },
  plugins: debug ? [createLogger()] : []
})
