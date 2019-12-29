import storage from 'good-storage'
export default {
  // currentSong: storage.get('PLAY_HISTORY', [])[0],
  currentSong: {},
  currentProcess: 0,
  isPlaying: !1,
  currentOrderKey: storage.get('PLAY_ORDER', 'ORDER_LOOP'),
  isShowPlaylist: !1,
  playHistory: storage.get('PLAY_HISTORY', []),
  playList: {
    list: [],
    albumId: ''
  },
  showPlayPanel: !1
}