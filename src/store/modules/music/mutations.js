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
  },
  setPlaylistState(state, type) {
    state.isShowPlaylist = type
  },
  updatePlayHistory(state, list) {
    state.playHistory = list
  },
  // setPlayHistory(state, list) {
  //   state.playHistory = list
  // },
  //如果是专辑或歌单, 播放列表为该专辑或歌单, 如果是搜索出来的单曲, 则在当前播放列表的中的当前播放歌曲的下一首插入该歌; 如已存在则不插入
  setPlayList(state, list) {
    state.playList = list
  }
}