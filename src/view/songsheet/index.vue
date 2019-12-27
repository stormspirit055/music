<template>
  <div class='songsheet-wrap'>
    <Header ref='header' :headInfo='headInfo' />
    <div class="w-router">
      <div class="r-left">
        <div class='l-item' @click='_swtichMode(0)' :class='{active: currentTab == 0}'>歌曲列表</div>
        <div class='l-item' @click='_swtichMode(1)' :class='{active: currentTab == 1}'>评论({{commentCount}})</div>
        <div class='l-item' @click='_swtichMode(2)' :class='{active: currentTab == 2}'>收藏者</div>
      </div>
      <div class="r-right" v-show='currentTab == 0'>
        <el-input
          prefix-icon="el-icon-search"
          class='el-input-search'
          v-model="keywords">
        </el-input>
      </div>
    </div>
    <SongList v-show='currentTab == 0' :songList='songList' />
    <Comment :id='$route.params.id' v-show='currentTab == 1' />
  </div>
</template>

<script>
import Header from './header'
import SongList from '@/components/songlist'
import Comment from '@/components/comment'
import { getSongSheetDetail } from '@/api'
export default {
  data () {
    return {
      headInfo: {},
      songList: [],
      currentTab: 0,
      commentCount: 0,
      keywords: ''
    };
  },
  mounted(){
    console.log(this.$el)
  },
  methods: {
    _swtichMode(mode) {
      this.currentTab = mode
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
    _generateSonglist(tracks) {      
      let songList = tracks.map(v => {
        return this.$utils.generateSong({
          picUrl: v.al.picUrl,
          mvid: v.mv,
          name: v.name,
          albumName: v.al.name,
          albumId: v.al.id,
          id: v.id,
          artists: v.ar,
          duration: v.dt,
          inSheet: !0
        })
      })
      this.songList = songList
    },
    async _getDetail() {
      let { playlist } = await getSongSheetDetail({ id: this.$route.params.id})
      this._generateHead(playlist)
      const { tracks } = playlist 
      this._generateSonglist(tracks)
    }
  },
  components: { Header, SongList, Comment },
  watch: {
    id: {
      handler() {
        this._getDetail()
        this.keywords = ""
      },
      immediate: true,
    }
  },
  computed: {
    id() {
      return Number(this.$route.params.id)
    },
  },
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.songsheet-wrap{
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