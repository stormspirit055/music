<template>
  <div class='comment-wrap' v-if='id' ref='wrap' >
    <div class="v-loading" v-if='isLoading && isNeedLoading' v-loading.lock="isLoading"></div>
    <div v-if='comments.length'>
      <div class='block' v-if='pageNum == 1 && hotComments.length' >
        <div class="w-title">精彩评论{{isNeedLoading}}</div>
        <Commentlist  :comments='hotComments'  />
      </div>
      <div class='block'>
        <div class='w-title new' ref='wrap'>最新评论 ({{total}})</div>
        <Commentlist  :comments='comments'  />
      </div>
    </div>
    <div class="w-empty" v-if='!isLoading && !comments.length'>
      还没有评论~
    </div>
    <Pagination @pagechange='_handlePageChange' :total='total'  :pageSize='pageSize'></Pagination>
  </div>
</template>

<script>
import { getSongSheetComment, getSongComment, getVideoComment, getMvComment,  getAlbumComment } from '@/api'
import Pagination from '@/base/pagination'
import Commentlist from '@/base/comment-list'
export default {
  name: "Comment",
  props: {
    id: {
      required: true
    },
    type: {
      type: String,
      default: 'song'
    },
    isNeedLoading: {
      type: Boolean,
      default: !0
    }
  },
  data () {
    return {
      pageSize: 20,
      pageNum: 1,
      total: 0,
      comments: [],
      hotComments: [],
      isLoading: false,
      isPageChange: false
    };
  },
  mounted(){},
  methods: {
    async _getData() {
      this.isLoading = true
      let result
      const params = {id: this.id, offset: (this.pageNum - 1) * 20}
      switch(this.type) {
        case 'songsheet':
          result = await getSongSheetComment(params)
          break;
        case 'song': 
          result = await getSongComment(params)
          break;
        case 'video':
          result = await getVideoComment(params)
          break;
        case 'mv':
          result = await getMvComment(params)
          break;
        case 'album': 
          result = await getAlbumComment(params)
          break;
      }
      const { hotComments, comments, total } =  result
      this.total = total
      this.comments = this._generateComment(comments)
      if (this.pageNum == 1) this.hotComments = this._generateComment(hotComments)
      this.isLoading = false
      if (this.isPageChange) {
        this.$refs.wrap.scrollIntoView({ behavior: "smooth" })
        this.isPageChange = false
      }
    },
    _generateComment(list) {
      return list.map(v => {
        const {
          user,
          time,
          liked,
          likedCount,
          content
        } = v
        const beReplied = v.beReplied[0] || {}
        return {
          user,
          time,
          liked,
          likedCount,
          content,
          beReplied
        }
      })
    },
    _handlePageChange(e) {
      this.pageNum = e
      this._getData()
      this.isPageChange = true
    }
  },
  components: { Pagination, Commentlist },
  computed: {},
  watch: {
    id: {
      handler(newV) {
        if (!newV) return
        this.pageNum = 1
        this._getData()
      },
      immediate: !0
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.comment-wrap{
  position: relative;
  margin: 20px 30px 0;
  .v-loading{
    position: fixed;
    margin: 0;
    height: calc(100% - #{$mini-player-height});
    width: calc(100vw -  #{$menu-side-width});
    left: $menu-side-width;
    z-index: 9999 !important;
    bottom: $mini-player-height;
  }
  .block{
    // margin-bottom: 30px;
    .w-title{
      font-size: $font-size;
      color: $font-normal-color;
      &.new{
        padding-top: $layout-header-height;
      }
    }
  }
  .w-empty{
    color: $red;
    position: relative;
    margin-top: 50px;
    text-align: center;
  }
}
</style>