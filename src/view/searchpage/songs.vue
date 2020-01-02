<template>
  <div class='songs-wrap' ref='wrap'>
    <Songlist :isFilter='false' :songList='songList' :loading='loading' :keywords='keywords'  />
    <Pagination  v-if='total > pageSize'  @pagechange='_handlePageChange' :total='total'  :pageSize='pageSize'></Pagination>
  </div>
</template>

<script>
import Songlist from '@/components/songlist'
import { searchResult, searchMatch } from '@/api'
export default {
  name: 'Songs',
  data () {
    return {
      matchList: [],
      songList: [],
      loading: false,
      pageSize: 30,
      pageNum: 1,
      total: 0,
    };
  },
  mounted(){
  },
  methods: {
    async _handleSearch() {
      this.$emit('update', false)
      const { result } = await searchResult({keywords: this.keywords, offset: (this.pageNum - 1) * this.pageSize })
      const { songs, songCount } = result
      this.total = songCount
      this.$parent.total = songCount
      this.songList = this._generateSonglist(songs)
      console.log(this.songList)
      this.$emit('update', true)
    },
    async _handleMatch() {
      let { result } = await searchMatch({keywords: this.keywords})
      this.matchList = result
    },
    _handlePageChange(e) {
      this.pageNum = e
      this._handleSearch()
    },
    _generateSonglist(songs) {      
      let songList = songs.map(v => {
        let artistsText = ''
        for(let value of v.artists) {
          artistsText += value.name
        }
        return this.$utils.generateSong({
          picUrl: v.picUrl,
          mvid: v.mvid,
          name: v.name,
          albumName: v.album.name,
          albumId: v.album.id,
          id: v.id,
          artists: v.artists,
          duration: v.duration,
          inSheet: !0,
          artistsText
        })
      })
      return songList
    },
  },
  components: {
    Songlist
  },
  computed: {
    keywords() {
      return this.$route.params.keywords
    }
  },
  watch: {
    keywords: {
      handler(newV) {
        this.$nextTick(() => {
          this._handleSearch()
          this._handleMatch()
        })
      },
      immediate: !0
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
</style>