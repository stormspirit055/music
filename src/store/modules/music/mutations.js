import storage from 'good-storage'
export default{
  setCurrentSong(state, currentSong) {
    state.currentSong = currentSong
  },
  setCurrentProcess(state, currentProcess) {
    state.currentProcess = currentProcess
  },
  setSongState(state, isPlaying) {
    state.isPlaying = isPlaying
  },
  setOrderType(state, type) {
    state.currentOrderKey = type
    storage.set('PLAY_ORDER', type)
  },
  setPlaylistState(state, type) {
    state.isShowPlaylist = type
  },
  updatePlayHistory(state, list) {
    state.playHistory = list
  },
  setPlayList(state, list) {
    state.playList = list
  }
}