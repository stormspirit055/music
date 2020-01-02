import storage from 'good-storage'
export default {
  updateSearchHistory(state, item) {
    if (!item.trim()) return
    const currentList = state.searchHistory
    if (currentList.indexOf(item) == -1) {
      currentList.push(item)
      state.searchHistory = currentList
      storage.set('SEARCH_HISTORY', currentList)
    }
    
  }
}