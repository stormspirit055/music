<template>
  <div class='songsheet-wrap'>
    <div class="v-loading" v-if='isLoading' v-loading.lock="isLoading"></div>
    <router-link tag='div' :to="'/songsheet/' + headSheet.id" class="w-head"  :styele='{backgroundImage: headSheet.coverImgUrl}'>
      <img class='h-bg' :src="$utils.generateImgurl(headSheet.coverImgUrl, 140)" alt="" />
      <img :src="$utils.generateImgurl(headSheet.coverImgUrl, 140)" alt="" class="h-img">
      <div class="h-right">
        <div class="r-label">精品歌单</div>
        <div class="r-name">{{headSheet.name}}</div>
        <div class="r-desc">{{headSheet.copywriter}}</div>
      </div>
    </router-link>
    <div class="w-type" ref='tabs'>
      <div class="t-left">
        {{currentTag.name || '全部'}}
        <Icon type='iconfontyoujiantou-copy-copy-copy-copy-copy' :size='12'  />
      </div>
      <div class="t-right">
        <span class="r-item" @click='_switchType(item)' :class='{active: currentTag.id === item.id}' v-for='(item, index) in tabs' :key='index'>{{item.name}}</span>
      </div>
    </div>
    <div class="w-list">
      <router-link tag='div' :to="'/songsheet/' + item.id" class="l-item" v-for='(item, index) in playlists' :key='index'>
        <div class="i-cover">
          <img v-lazy="$utils.generateImgurl(item.coverImgUrl, 185)" alt="" class="c-img">
          <Playcount :count='item.playCount' />
          <div class="c-play"><Playbtn /></div>
          <div class="c-user">{{item.creator.nickname}}</div>
        </div>
        <div class="i-desc">{{item.name}}</div>
      </router-link>
    </div>
    <Pagination v-if='total > pageSize' @pagechange='_handlePageChange' :total='total' :pageNum='pageNum'  :pageSize='pageSize' />
  </div>
</template>

<script>
import { getQualitySongSheet, getSongSheetClass, getTopSheet } from '@/api'
import { Loading } from 'element-ui'
export default {
  name: 'Songsheet',
  data () {
    return {
      tabs: ['华语', '流行', '摇滚', '民谣', '电子', '另类/独立', '轻音乐', '影视原声', 'ACG', '怀旧'],
      currentTag: {},
      headSheet: {},
      pageSize: 50,
      total: 0,
      pageNum: 1,
      playlists: [],
      lasttime: '',
      isLoading: false
    };
  },

  mounted(){
    this._getQualitySongSheet()
    this._getSongSheetClass()
    this._getTopSheet()
  },
  methods: {
    async _getTopSheet(){
      this.isLoading = true
      const { playlists, total } = await getTopSheet({cat: this.currentTag.name, limit: this.pageSize, offset: (this.pageNum - 1) * this.pageSize})
      this.total = total
      this.playlists = playlists
      this.isLoading = false
      this.$refs.tabs.scrollIntoView({ behavior: "smooth" })
    },
    async _getSongSheetClass() {
      const { tags: tabs} = await getSongSheetClass()
      this.tabs = tabs
    },
    _handlePageChange(e) {
      this.pageNum = e
      this._getTopSheet()
    },
    async _getQualitySongSheet() {
      const { playlists, total, lasttime } = await getQualitySongSheet({ cat: this.currentTag.name, before: this.lasttime })
      this.lasttime = lasttime
      this.headSheet = playlists[0]
    },
    _switchType(item) {
      this.pageNum = 1;
      this.currentTag = item
      this.lasttime = ''
      this._getQualitySongSheet()
      this._getTopSheet()
    }
  },
  components: {},
  computed: {},
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.songsheet-wrap{
  margin: 0 auto;
  background: #212121;
  padding: 20px 30px 0;
  max-width: $center-content-max-width;
  min-width: calc(#{$layout-content-min-width} + 200px);
  .v-loading{
    position: fixed;
    margin: 0;
    height: 100%;
    width: calc(100vw -  #{$menu-side-width});
    left: $menu-side-width;
    z-index: 9999 !important;
    top: 0;
  }
  .w-head{
    cursor: pointer;
    margin-bottom: 20px;
    position: relative;
    height: 170px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    overflow: hidden;
    width: 100%;
    .h-bg{
      filter: blur(20px);
      position: absolute;
      width: 100%;
      right: 0;
      bottom: 0;
      left: 0;
      top: 0;
      z-index: 0;
    }
    .h-img{
      width: 140px;
      height: 140px;
      border-radius: 6px;
      margin-right: 10px;
      z-index: 1;
    }
    .h-right{
      z-index: 1;
      .r-label{
        color: $yellow;
        height: 30px;
        box-sizing: border-box;
        border: 1px solid $yellow;
        text-align: center;
        line-height: 30px;
        border-radius: 15px;
        margin-bottom: 20px;
        width: 100px;
      }
      .r-name{
        color: #fff;
        font-size: $font-size;
        margin-bottom: 10px;
      }
      .r-desc{
        color: #666;
        font-size: $font-size-sm;
        width: 300px;
        @include limit-line(1);
      }
    }
  }
  .w-type{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    margin-bottom: 20px;
    height: 32px;
    .t-left{
      display: flex;
      align-items: center;
      border: 1px solid #666;
      justify-content: center;
      font-size: $font-size-medium-sm;
      color: $grey;
      height: 30px;
      border-radius: 15px;
      min-width: 100px;
      padding: 0 20px;
      &:hover{
        background: #2b2b2b;
      }
      i{
        color: $grey;
        margin-left: 4px;
      }
    }
    .t-right{
      .r-item{
        cursor: pointer;
        margin-right: 20px;
        font-size: $font-size-sm;
        color: $grey;
        &.active{
          color: $red;
        } 
        &:hover{
          color: #fff;
        }
        &:nth-last-child(1) {
          margin-right: 0;
        }
      }
    }
  }
  .w-list{
    display: flex;
    flex-wrap: wrap;
    .l-item{
      width: calc(20% - 20px);
      margin-right: 20px;
      margin-bottom: 30px;
      cursor: pointer;
      &:nth-child(5n) {
        margin-right: 0 !important;
      }
      &:hover{
        .c-play{
          opacity: 1 !important;
        }
      }
      .i-cover{
        overflow: hidden;
        position: relative;
        border-radius: 6px;
        width: 100%;
        .c-img{
          width: 100%;
          border-radius: 6px;
        }
        .c-play{
          transition: all .4s;
          position: absolute;
          opacity: 0;
          right:6px;
          bottom: 4px;
        }
        .c-user{
          color: #fff;
          font-size: $font-size-medium-sm;
          position: absolute;
          left: 10px;
          width: 100px;
          bottom: 10px;
          @include limit-line(1);
        }
      }
      .i-desc{
        margin-top: 4px;
        @include limit-line(2);
        line-height: 1.3;
        font-size: $font-size-medium-sm;
        color: $grey;
      }
    }
  }
}
</style>