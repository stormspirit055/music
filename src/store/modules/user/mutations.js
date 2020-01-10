export default {
  setUser(state, user) {
    state.user = user
  },
  setUserPlaylist(state, userPlaylist) {
    state.userPlaylist = userPlaylist
  },
  setLoginState(state, isShowLogin) {
    state.isShowLogin = isShowLogin
  }
}