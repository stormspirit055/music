<template>
  <div class='newmusic-wrap'>
    <div class="v-loading" v-if='isLoading' v-loading.lock="isLoading"></div>
    <div class="w-title">
      <div class="t-item" @click='currentType = 0' :class='{active: currentType == 0}'>新歌速递</div>
      <div class="t-item" @click='currentType = 1' :class='{active: currentType == 1}'>新碟上架</div>
    </div>
    <div class="w-middle">
      <div class="m-left">
        <span @click='currentId = item.id' class="l-tab" :class='{active: currentId === item.id}' v-for='(item, index) in tabs' :key='index'>{{item.label}}</span>
      </div>
    </div>
    <Songlist ref='songlist' v-if='currentType == 0' :isShowEmpty='false' :isShowHead='false' :isShowCover='true' :isFilter='false' :songList='songList' />
    <Albumlist v-if='currentType === 1' />
  </div>
</template>
 
<script>
import { getTopsong } from '@/api'
import Albumlist from './components/album-list'
import Songlist from '@/components/songlist'
export default {
  name: 'Discnewmusic',
  data () {
    return {
      isLoading: false,
      currentId: 0,
      currentType: 0,
      songList: [],
      tabs: [
        {
          label: '全部',
          id: 0
        },
        {
          label: '华语',
          id: 7
        },
        {
          label: '欧美',
          id: 96
        },
        {
          label: '日本',
          id: 8
        },
        {
          label: '韩国',
          id: 16
        },
      ]
    };
  },

  mounted(){},
  methods: {
    async _getData() {
      this.isLoading = true
      const { data } = await getTopsong({ type: this.currentId })
      this.songList = this._generateSonglist(data)
      this.isLoading = false
    },
    _generateSonglist(songs) {      
      let songList = songs.map(v => {
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
      return songList
    },
  },
  components: { Songlist, Albumlist },
  computed: {},
  watch: {
    currentId: {
      handler(newV, oldV) {
        if (newV === oldV) return
        this._getData()
      },
      immediate: !0
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.newmusic-wrap{
  padding-top: 30px;
  max-width: $layout-playpanel-min-width;
  margin: 0 auto;
  .v-loading{
    position: fixed;
    margin: 0;
    height: 100%;
    width: calc(100vw -  #{$menu-side-width});
    left: $menu-side-width;
    z-index: 9999 !important;
    top: 0;
  }
  .w-title{
    width: 210px;
    height: 28px;
    border-radius: 14px;
    border: 1px solid #5b5b5b;
    background: #2f2f2f;
    position: relative;
    left: 50%;
    margin-left: -105px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    margin-bottom: 20px;
    .t-item{
      color: $grey;
      font-size: $font-size-sm;
      width: 108px;
      height: 26px;
      border-radius: 13px;
      text-align: center;
      line-height: 27px;
      &.active{
        background: #5b5b5b !important;
        color: #fff !important;
      }
    }
  }
  .w-middle{
    display: flex;
    color: $grey;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    margin-bottom: 20px;
    .m-left{
      span{
        margin-right: 20px;
        font-size: $font-size-medium-sm;
        cursor: pointer;
        &:hover{
          color: #fff;
        }
        &.active{
          color: #fff !important;
        }
      }
    }
    .m-right{
      width: 90px;
      height: 26px;
      line-height: 26px;
      font-size: $font-size-medium-sm;
      text-align: center;
      background: $red;
      border-radius: 12.5px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>