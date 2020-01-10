<template>
  <div class='songsheet-wrap'>
    <div class="w-list">
      <router-link tag='div' :to="'/songsheet/' + item.id" class="l-item" v-for='(item ,index) in playlists' :key='index'>
        <div class="i-left">
          <img class='i-avatar' v-if='item.coverImgUrl' v-lazy="$utils.generateImgurl(item.coverImgUrl, 60)" alt="">
          <img class='i-avatar' v-if='!item.coverImgUrl' src='/src/assets/default_avatar.jpg' alt="">
          <p class="i-name">
            <Highlight :keywords='keywords' :text='item.name' />
          </p>
        </div>
        <div class="i-right">
          <div class="r-count">{{item.trackCount}}首</div>
          <div class="r-creater">by {{item.creator.nickname}}</div>
        </div>
      </router-link>
    </div>
    <div class="w-empty" v-if='!total && getResult' >没有找到与 <span>'{{keywords}}'</span> 的相关歌单</div>
    <Pagination v-if='total > pageSize' @pagechange='_handlePageChange' :total='total'  :pageSize='pageSize' />
  </div>
</template>

<script>
import { searchResult } from '@/api'
import { typeMap } from './config'
export default {
  name: 'Songsheet',
  data () {
    return {
      playlists: [],
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
      const { result } = await searchResult({keywords: this.keywords, offset: (this.pageNum - 1) * this.pageSize, type: 100, type: typeMap['TYPE_SONGSHEET'].type })
      console.log(result)
      const {playlistCount, playlists} = result
      this.total = playlistCount
      this.$parent.total = playlistCount
      playlists.forEach(v => {
        v.createrId = v.creator.userId
      })
      this.playlists = playlists
      this.$emit('update', true)
      this.getResult = !0
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
.songsheet-wrap{
  .w-list{
    .l-item{
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;
      padding-left: 30px;
      background: #212121;
      position: relative;
      cursor: pointer;
      &:nth-child(2n) {
        background: #252525;
      }
      &:hover{
        background: #2e2e2e !important;
        color: #fff !important;
      }
      .i-left{
        position: relative;
        width: 66.6%;
        display: flex;
        align-items: center;
        .i-avatar{
          width: 60px;
          height: 60px;
          border-radius: 6px;
          margin-right: 12px;
        }
        .i-name{
          color: $grey;
          font-size:$font-size-medium-sm;
          
          span{
            color: #888;
            &:hover{
              color: #ddd !important;
            }
          }
        }
      }
      .i-right{
        width: 33.3%;
        display: flex;
        font-size: $font-size-medium-sm;
        color: $grey;
        div{
          width: 50%
        }
        .r-creater{
          &:hover{
            color: #ddd !important;
          }
        }
      }
    }
  }
}
</style>