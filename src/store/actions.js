import { getUserDetail } from '@/api/index'
import { getUserPlaylist } from '@/api'
import storage from 'good-storage'
export default {
   async getUserDetail({ commit }, uid) {
    let userDetail = await getUserDetail({ uid })
    commit('setUser', userDetail.profile)
    let { playlist } = await getUserPlaylist({ uid })
    commit('setUserPlaylist', playlist)
  },
  logout({ commit }) {
    commit('setUser', {})
    commit('setUserPlaylist', [])
    storage.set('U_ID', null)
  }
}