<template>
  <div class='artists-wrap'>
    <div class="w-list">
      <div class="l-item" v-for='(item ,index) in artists' :key='index'>
        <img class='i-avatar' v-if='item.picUrl' v-lazy="$utils.generateImgurl(item.picUrl, 60)" alt="">
        <img class='i-avatar' v-if='!item.picUrl' src='/src/assets/default_avatar.jpg' alt="">
        <p class="i-name">
           <Highlight :keywords='keywords' :text='item.name' />
          <span v-if='item.alias.length'>(<Highlight :keywords='keywords' :text='item.alias[0]' />)</span>    
        </p>
        <div class="i-identify" v-if='item.accountId'></div>
      </div>
    </div>
     <div class="w-empty" v-if='!total && getResult' >没有找到与 <span>'{{keywords}}'</span> 的相关用户</div>
    <Pagination v-if='total > pageSize' @pagechange='_handlePageChange' :total='total'  :pageSize='pageSize' />
  </div>
</template>

<script>
import { searchResult } from '@/api'
import { typeMap } from './config'
export default {
  name: 'Artists',
  data () {
    return {
      artists: [],
      loading: false,
      pageSize: 30,
      pageNum: 1,
      total: 0,
      getResult: !1
    };
  },
  methods: {
    async _handleSearch() {
      this.$emit('update', false)
      const { result } = await searchResult({keywords: this.keywords, offset: (this.pageNum - 1) * this.pageSize, type: typeMap['TYPE_ARTISTS'].type })
      const {artistCount, artists} = result
      this.total = artistCount
      this.$parent.total = artistCount
      this.artists = artists
      this.$emit('update', true)
      this.getResult = true
    },
    _handlePageChange(e) {
      this.pageNum = e
      this._handleSearch()
    },
  },
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
.artists-wrap{
  .w-list{
    .l-item{
      display: flex;
      align-items: center;
      height: 80px;
      padding-left: 30px;
      background: #212121;
      position: relative;
      &:nth-child(2n) {
        background: #252525;
      }
      &:hover{
        background: #2e2e2e !important;
        color: #fff !important;
      }
      .i-avatar{
        width: 60px;
        height: 60px;
        border-radius: 6px;
        margin-right: 6px;
      }
      .i-name{
        color: $grey;
        font-size:$font-size-medium-sm;
        span{
          color: #888;
        }
      }
      .i-identify{
        @include round(14px);
        position: absolute;
        right: 40px;
        top: 50%;
        margin-top: -7px;
        background: $red;
      }
    }
  }
  .w-empty{
    position: relative;
    text-align: center;
    color: #fff;
    margin-top: 50px;
    span{
      color: $blue;
    }
  }
}
</style>