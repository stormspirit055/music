import storage from 'good-storage'
export default {
  searchHistory: storage.get('SEARCH_HISTORY', [])
}