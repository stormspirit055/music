import state from './state'
import * as getters from './getters'
import mutations from './mutations'
import actions from './actions'
import Vuex from 'vuex'
import Vue from 'vue'
import createLogger from 'vuex/dist/logger'
const debug = process.env.NODE_ENV !== 'production';
Vue.use(Vuex)
export default new Vuex.Store({
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
  plugins: debug ? [createLogger()] : []
})