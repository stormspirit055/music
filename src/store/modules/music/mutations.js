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
  }
}