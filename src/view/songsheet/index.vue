<template>
  <div class='songsheet-wrap'>
    <div class="v-loading" v-if='loading' v-loading.lock="loading"></div>
    <Header ref='header' :type='type' :headInfo='headInfo' v-if='id !== 0' />
    <div class="w-recommendhead" v-if='id === 0'>
      <p class="title">每日推荐歌曲</p>
      <p class="desc">根据您的音乐口味生成, 每天6:00更新</p>
    </div>
    <div class="w-router"  v-if='id != 0'>
      <div class="r-left">
        <div class='l-item' @click='_swtichMode(0)' :class='{active: currentTab == 0}'>歌曲列表</div>
        <div class='l-item' @click='_swtichMode(1)' :class='{active: currentTab == 1}'>评论({{commentCount}})</div>
        <!-- <div class='l-item' @click='_swtichMode(2)' :class='{active: currentTab == 2}'>收藏者</div> -->
      </div>
      <div class="r-right" v-show='currentTab == 0'>
        <el-input
         @input='_handleInput'
          prefix-icon="el-icon-search"
          class='el-input-search'
          v-model="keywords">
        </el-input>
      </div>
    </div>
    <SongList :loading='loading' v-show='currentTab == 0' :keywords='keywords' :songList='songList' />
    <Comment v-show='currentTab == 1' :id='commentId' :type='type' />
  </div>
</template>

<script>
import Header from './header'
import SongList from '@/components/songlist'
import Comment from '@/components/comment'
import { getAlbumDetail, getSongSheetDetail, getRecommendSongs } from '@/api'
export default {
  data () {
    return {
      headInfo: {},
      songList: [],
      currentTab: 0,
      commentCount: 0,
      keywords: '',
      commentId: 0,
      loading:  !1
      // id: 0
    };
  },
  mounted(){
  },
  methods: {
    _handleInput(e) {

    },
    _swtichMode(mode) {
      this.currentTab = mode
      if (mode == 1 && !this.commentId) this.commentId = this.$route.params.id
    },
    _generateHead(data) {
      const {
        coverImgUrl,
        createTime,
        name,
        tracks,
        playCount,
        commentCount,
        id,
        creator: {
          nickname,
          avatarUrl
        }
      } = data
      this.headInfo = {
        id,
        coverImgUrl,
        createTime,
        name,
        playCount,
        nickname,
        avatarUrl,
        songCount: tracks.length
      }
      this.commentCount = commentCount
    },
    _generateAlbumHead(data) {
      const {
        picUrl: coverImgUrl,
        publishTime: createTime,
        name,
        size: songCount,
        info: {
          commentCount,
        },
        id,
        artist: {
          name: nickname,
        }
      } = data
      this.headInfo = {
        id,
        coverImgUrl,
        createTime,
        name,
        nickname,
        songCount
      }
      this.commentCount = commentCount
    },
    _generateSonglist(tracks) {      
      let songList = tracks.map(v => {
        let artistsText = ''
        for(let value of v.ar) {
          artistsText += value.name
        }
        return this.$utils.generateSong({
          picUrl: v.al.picUrl,
          mvid: v.mv,
          name: v.name,
          albumName: v.al.name,
          albumId: v.al.id,
          id: v.id,
          artists: v.ar,
          duration: v.dt,
          inSheet: !0,
          artistsText
        })
      })
      this.songList = songList
    },
    _generateRecommedlist(tracks) {
      let songList = tracks.map(v => {
        let artistsText = ''
        for(let value of v.artists) {
          artistsText += value.name
        }
        return this.$utils.generateSong({
          picUrl: v.album.picUrl,
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
      this.songList = songList
    },
    async getRecommend() {
      this.loading = !0
      const { recommend } = await getRecommendSongs()
      this._generateRecommedlist(recommend)
      this.loading = !1
    },
    async _getAlbumDetail() {
      const { songs, album }  = await getAlbumDetail({ id: this.id})
      this._generateAlbumHead(album)
      this._generateSonglist(songs)
    },
    async _getSongsheetDetail() {
      this.loading =  !0
      let { playlist } = await getSongSheetDetail({ id: this.$route.params.id})
      this._generateHead(playlist)
      const { tracks } = playlist 
      this._generateSonglist(tracks)
      this.loading = !1
    }
  },
  components: { Header, SongList, Comment },
  watch: {
    id: {
      handler(newV) {
        if(newV === 0) {
          this.getRecommend()
        } else{
          if (this.type === 'songsheet') {
            this._getSongsheetDetail()
          } else {
            this._getAlbumDetail()
          }
        }
        this.keywords = ""
      },
      immediate: true,
    }
  },
  computed: {
    type() {
      if(this.$route.query.type) {
        return this.$route.query.type
      } else {
        return 'songsheet'
      }
    },
    id() {
      return Number(this.$route.params.id)
    },
  },
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.songsheet-wrap{
  .v-loading{
    position: fixed;
    margin: 0;
    height: calc(100vh -  #{$layout-header-height});
    top: $layout-header-height;
    width: calc(100vw -  #{$menu-side-width});
    left: $menu-side-width;
    z-index: 9999 !important;
  }
  .w-recommendhead{
    padding: 20px 0 0 30px;
    margin-bottom: 20px;
    .title{
      font-size: $font-size-title-sm;
      font-weight: 500;
      color: $font-normal-color;
      margin-bottom: 10px;
    }
    .desc{
      color: $grey;
      font-size:  $font-size-sm;
    }
  }
  .w-router{
    display: flex;
    margin: 50px 30px 0;
    position: relative;
    border-bottom: 1px solid #666;
    align-items: center;
    justify-content: space-between;
    .r-left{
      display: flex;
      .l-item{
        height: 34px;
        border-bottom: 2px solid rgba(255, 255, 255, 0);
        color: $font-normal-color;
        font-size: $font-size;
        margin-right: 30px;
        line-height: 34px;
        z-index: 2;
        margin-bottom: -1px;
        cursor: pointer;
        &.active{
          border-color: $red !important;
          color: $red !important;
        }
      }
    }
  }
}
</style>