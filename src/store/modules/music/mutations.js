import storage from 'good-storage'
export default{
  setCurrentSong(state, currentSong) {
    state.currentSong = currentSong
  },
  setCurrentProcess(state, currentProcess) {
    state.currentProcess = currentProcess
  },
  setSongState(state, isPlaying) {
    if (!state.currentSong.name) return
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
  },
  setPlayPanelState(state, type) {
    state.showPlayPanel = type
  },
  setSearchPanelState(state, type) {
    state.isShowSearchPanel = type
  }
}