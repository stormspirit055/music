import { getSongUrl } from '@/api'
import { Notification } from 'element-ui'
import storage from 'good-storage'
export default {
   async startSong({ commit, state }, song) {
     let isCanPlay = await checkSong(song.id)
    if (!isCanPlay) {
      Notification({
        title: '提示',
        message: `${song.name}播放失败 :(`,
        type: 'error'
      })
      return false
    }
    const { playList } = state
    generatePlayList(state, commit, playList, song)
    commit('setCurrentSong', song)
    commit('setSongState', !0)
    commit('setCurrentProcess', 0)
    generatePlayHistory(commit, song)
    return true
  },
  cleanPlayHistory({ commit }) {
    commit('updatePlayHistory', [])
    storage.set('PLAY_HISTORY', [])
  },
  cleanCurrentSong({ commit }) {
    commit('setCurrentSong', {})
    commit('setSongState', !1)
  },
  cleanPlayList({ commit }) {
    commit('setPlayList', {
      albumId: '',
      list: []
    })
  },
}
async function checkSong(id) {
  let { data }  = await getSongUrl({ id })
  const [item] = data
  return !!item.url
}
function generatePlayList(state, commit, playList, song) {
  if (!song.inSheet) {
    if (playList.list.filter(v => v.id === song.id).length === 0) {
      const { currentSong } = state
      const currentIndex = playList.list.findIndex(v => v.id == currentSong.id)
      playList.list.splice(currentIndex + 1, 0, song)
      commit('setPlayList', playList)
    }
  }
}
function generatePlayHistory(commit, song) {
  const currentHistrory = storage.get('PLAY_HISTORY') || []
  if (currentHistrory.filter(v => v.id === song.id).length === 0) {
    currentHistrory.unshift(song)
    if (currentHistrory.length > 100) currentHistrory.pop()
  } else {
    const currentIndex = currentHistrory.findIndex(v => v.id === song.id)
    currentHistrory.splice(currentIndex, 1)
    currentHistrory.unshift(song)
  }
  storage.set('PLAY_HISTORY', currentHistrory)
  commit('updatePlayHistory', currentHistrory)
}