<template>
  <div class='albums-wrap'>
    <div class="w-list">
      <router-link tag='div' :to="'/songsheet/' + item.id + '?type=album'" class="l-item" v-for='(item ,index) in albums' :key='index'>
        <div class="i-left">
          <img class='i-avatar' v-if='item.picUrl' v-lazy="$utils.generateImgurl(item.picUrl, 60)" alt="">
          <img class='i-avatar' v-if='!item.picUrl' src='/src/assets/default_avatar.jpg' alt="">
          <p class="i-name">
            <Highlight :keywords='keywords' :text='item.name' />
            <span v-if='item.alias.length'>(<Highlight :keywords='keywords' :text='item.alias[0]' />)</span>    
          </p>
        </div>
        <div class="i-artists">
          <Highlight :keywords='keywords' :text='item.artistText' />
        </div>
      </router-link>
    </div>
    <div class="w-empty" v-if='!total && getResult' >没有找到与 <span>'{{keywords}}'</span> 的相关专辑</div>
    <Pagination v-if='total > pageSize' @pagechange='_handlePageChange' :total='total'  :pageSize='pageSize' />
  </div>
</template>

<script>
import { searchResult } from '@/api'
import { typeMap } from './config'
export default {
  name: 'albums',
  data () {
    return {
      albums: [],
      loading: false,
      pageSize: 30,
      pageNum: 1,
      total: 0,
      getResult: false
    };
  },
  methods: {
    async _handleSearch() {
      this.$emit('update', false)
      const { result } = await searchResult({keywords: this.keywords, offset: (this.pageNum - 1) * this.pageSize, type: 100, type: typeMap['TYPE_ALBUMS'].type })
      const {albumCount, albums} = result
      if (albums) {
        albums.forEach(v => {
          v.artistText = v.artist.name + (v.artist.alias.length ? ` (${v.artist.alias[0]})` : '')
          v.artistId = v.artist.id
        })
        this.albums = albums
      }
      this.total = albumCount
      this.$parent.total = albumCount
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
.albums-wrap{
  .w-list{
    .l-item{
      cursor: pointer;
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
      .i-left{
        position: relative;
        min-width: 50%;
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
          }
        }
      }
      .i-artists{
        color: #888;
        cursor: pointer;
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