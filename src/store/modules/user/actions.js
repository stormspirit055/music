import { getUserDetail } from '@/api/index'
import { getUserPlaylist } from '@/api'
import storage from 'good-storage'
import { Notification } from 'element-ui'
export default {
  getUserDetail({ commit }, uid) {
    getUserDetail({ uid }).then(async res => {
      if (res) {
        storage.set('U_ID', uid)
        commit('setUser', res.profile)
        let { playlist } = await getUserPlaylist({ uid })
        commit('setUserPlaylist', playlist)
      } else {
        Notification({
          title: '提示',
          message: '登录失败, 请输入正确的网易云id',
          type: 'error'
        })
      }
    })
  },
  logout({ commit }) {
    commit('setUser', {})
    commit('setUserPlaylist', [])
    storage.set('U_ID', null)
  }
}