import { getSongUrl } from '@/api'
import { Notification } from 'element-ui'
import storage from 'good-storage'
export default {
   async startSong({ commit, state }, song) {
     let isCanPlay = await checkSong(song.id)
    if (!isCanPlay) {
      Notification({
        title: '提示',
        message: '我也不知道为啥播不了',
        type: 'error'
      })
      return
    }
    commit('setSongState', !0)
    const { playList } = state
    generatePlayList(state, commit, playList, song)
    commit('setCurrentSong', song)
    commit('setCurrentProcess', 0)
    generatePlayHistory(commit, song)
  },
  cleanPlayHistory({ commit }) {
    commit('updatePlayHistory', [])
    storage.set('PLAY_HISTORY', [])
  },
  cleanPlayList({ commit }) {
    commit('setPlayList', {
      albumId: '',
      list: []
    })
  }
}
async function checkSong(id) {
  let { data }  = await getSongUrl({ id })
  // console.log(!!data[0].url)
  const [item] = data
  return !!item.url
}
function generatePlayList(state, commit, playList, song) {
  if (!song.inSheet) {
    if (playList.list.filter(v => v.id === song.id).length === 0) {
      const { currentSong } = state
      console.log('选择歌曲id:' + currentSong.id)
      const currentIndex = playList.list.findIndex(v => v.id == currentSong.id)
      console.log('currentIndex'+ currentIndex)
      playList.list.splice(currentIndex + 1, 0, song)
      commit('setPlayList', playList)
    }
  }
}
function generatePlayHistory(commit, song) {
  const currentHistrory = storage.get('PLAY_HISTORY') || []
  console.log('这是播放历史')
  console.log(currentHistrory)
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