export default {
  async switchSong({ commit }, song) {
    commit('setCurrentSong', song)
  }
  
}