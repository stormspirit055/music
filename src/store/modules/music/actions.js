import { getSongUrl, getSongDetail } from '@/api'
import { Notification } from 'element-ui'
import storage from 'good-storage'
export default {
   async startSong({ commit, state }, song) {
     const newSong = JSON.parse(JSON.stringify(song))
     let isCanPlay = await checkSong(newSong.id)
    if (!isCanPlay) {
      Notification({
        title: '提示',
        message: `${newSong.name}播放失败 :(`,
        type: 'error'
      })
      return false
    }
    if (!newSong.picUrl) {
      let { songs } = await getSongDetail({ ids: newSong.id })
      newSong.picUrl = songs[0].al.picUrl
    }
    const { playList } = state
    generatePlayList(state, commit, playList, newSong)
    commit('setCurrentSong', newSong)
    commit('setSongState', !0)
    commit('setCurrentProcess', 0)
    generatePlayHistory(commit, newSong)
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