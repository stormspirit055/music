export const currentSong = (state) => {
  let currentSong = state.currentSong
  //每次返回不同url的歌, 保证双击同一歌曲会从头开始
  currentSong.url += `&stmp=${new Date().getTime()}`
  return currentSong
}