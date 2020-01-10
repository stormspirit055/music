<template>
  <div class='mvs-wrap'>
    <div class="w-list">
      <Mvitem :item='item' :keywords='keywords'   v-for='(item, index) in videos' :key='index' />
    </div>
    <div class="w-empty" v-if='!total && getResult' >没有找到与 <span>'{{keywords}}'</span> 的相关mv</div>
    <Pagination v-if='total > pageSize' @pagechange='_handlePageChange' :total='total'  :pageSize='pageSize' />
  </div>
</template>

<script>
import { searchResult } from '@/api'
import { typeMap } from './config'
export default {
  name: 'Videos',
  data () {
    return {
      videos: [],
      loading: false,
      pageSize: 28,
      pageNum: 1,
      total: 0,
      getResult: false
    };
  },
  methods: {
    async _handleSearch() {
      this.$emit('update', false)
      const { result} = await searchResult({keywords: this.keywords, offset: (this.pageNum - 1) * this.pageSize, type: typeMap['TYPE_MVS'].type, limit: 28 })
      console.log(result)
      const { videos, videoCount } = result
      this.total = videoCount
      this.$parent.total = videoCount
      videos.forEach(v => {
        v.mode = v.type == 0 ? 'mv' : 'video'
        v.id = v.vid
        v.artistName = v.creator[0].userName
      })
      this.videos = videos
      this.getResult = !0
      this.$emit('update', true)
    },
    _handlePageChange(e) {
      this.pageNum = e
      this._handleSearch()
    },
  },
  components: {},
   computed: {
    keywords() {
      return this.$route.params.keywords
    }
  },
  watch: {
    keywords: {
      handler(newV) {
        this._handleSearch()
      },
      immediate: !0
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.mvs-wrap{
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 1080px;
  .w-list{
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    width: 1040px;
  }
}
</style>