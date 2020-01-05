<template>
  <div class='pagination-wrap' v-if='total > pageSize'>
    <el-pagination
      @current-change='_handleChange'
      background
      :pageSize="pageSize"
      :total="total"
      :current-page='pageNum'
      layout="prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
import { Pagination } from 'element-ui'
export default {
  name: 'Pagination',
  props: ['total', 'pageSize', 'pageNum'],
  data () {
    return {
    };
  },

  mounted(){},
  methods: {
    _handleChange(e) {
      this.$emit('pagechange', e)
    }
  },
  components: {
    elPagination: Pagination
  },
  computed: {},
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.pagination-wrap{
  position: relative;
  text-align: center;
  margin: 20px 0 30px;
  /deep/.el-pagination{
    button{
      background-color: rgba(0,0,0,0) !important;
      border:1px solid #666 !important;
      color: #666 !important;
      border-radius: 4px !important;
      &:disabled{
        border:1px solid #444 !important;
        color: #444 !important;
      }
    }
    .el-pager{
      li{
        border-radius: 4px !important;
        border:1px solid #666 !important;
        background-color: rgba(0,0,0,0) !important;
        color: #666 !important;
        font-weight: 400 !important
      }
      .active{
        background-color: $red !important;
        border-color: $red !important;
        color: #fff !important;
      }
    }
  }
}
</style>