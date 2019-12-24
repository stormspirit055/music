export default {
  startSong({ commit }, song) {
    commit('setCurrentSong', song)
    commit('setSongState', !0)
  },
}