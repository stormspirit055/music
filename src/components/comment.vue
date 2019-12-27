<template>
  <div class='comment-wrap' ref='wrap'>
    <div class='block'>
      <div class="w-title">精彩评论</div>
      <Commentlist :comments='hotComments'  />
    </div>
    <div class='block'>
      <div class='w-title'>最新评论</div>
      <Commentlist :comments='comments'  />
    </div>
    <Pagination @pagechange='_handlePageChange' :total='total'  :pageSize='pageSize'></Pagination>
  </div>
</template>

<script>
import { getSongSheetComment } from '@/api'
import Pagination from '@/base/pagination'
import Commentlist from '@/base/comment-list'
export default {
  name: "Comment",
  props: ['id'],
  data () {
    return {
      pageSize: 20,
      pageNum: 1,
      total: 0,
      comments: [],
      hotComments: []
    };
  },
  mounted(){},
  methods: {
    async _getData() {
      let result = await getSongSheetComment({id: this.id, offset: (this.pageNum - 1) * 20} )
      const { hotComments, comments, total } =  result
      this.total = total
      this.comments = this._generateComment(comments)
      this.hotComments = this._generateComment(hotComments)
      console.log('这是评论数据')
      console.log(result)
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
      this.$refs.wrap.scrollIntoView({ behavior: "smooth" })
    }
  },
  components: { Pagination, Commentlist },
  computed: {},
  watch: {
    id: {
      handler(newV) {
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
  .block{
    margin-bottom: 30px;
    .w-title{
      font-size: $font-size;
      color: $font-normal-color;
    }
  }
}
</style>