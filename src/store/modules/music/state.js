import storage from 'good-storage'
export default {
  currentSong: {},
  currentProcess: 0,
  isPlaying: !1,
  currentOrderKey: 'ORDER_LOOP',
  isShowPlaylist: !1,
  playHistory: storage.get('PLAY_HISTORY', []),
  playList: {
    list: [],
    albumId: ''
  }
}