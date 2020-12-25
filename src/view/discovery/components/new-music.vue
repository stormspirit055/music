<template>
  <div class='new-music-wrap' v-if='songList.length'>
    <div class="w-title">
      最新音乐
      <Icon type='iconfontyoujiantou-copy-copy-copy-copy-copy' :size='14' />
    </div>
    <div class="w-list">
      <div class="l-item" v-for='(item, index) in songList' @click='_handlePlay(item)' :key='index'>
        <div class="i-left">
          <img class='l-img' v-lazy='$utils.generateImgurl(item.picUrl, 90)'>
          <Playbtn class='l-play' />
        </div>
        <div class="i-middle">
          <Icon type='laba1' :size='12'  v-if='currentSong.id == item.id' />
          <span v-else>{{index + 1 | addZero}}</span>
        </div>
        <div class="i-right">
          <div class="r-name">{{item.name}}</div>
          <div class="r-artists">
            <div class="a-item" v-for='(child, index) in item.artists' :key='index'>
              {{index == item.artists.length - 1 ? child.name : child.name + ' / '}}
            </div>
            <!-- {{item.artists}} -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewRecommendSongs, getSongDetail, getSongUrl } from '@/api'
import { generateSong } from '@/utils'
import { mapActions, mapState } from '@/store/helper/music'
export default {
  data () {
    return {
      a: '',
      songList: [
      ]
    };
  },

  async created(){
    let { result } = await getNewRecommendSongs()
    this.songList = result.map(v => {
      const {
        id,
        name,
        picUrl,
        song: {
          artists,
          duration,
          mvid,
        }
      } = v
      return generateSong({
        id,
        name,
        picUrl,
        artists,
        duration,
        mvid,
        albumId: v.song.album.id,
        inSheet: !1
      })
    })
    this.songList.splice(10)
  },
  methods: {
    ...mapActions(['startSong']),
    async _handlePlay(song) {
      // let result = await getSongDetail({ids: song.id })
      // this.startSong(song)
      import('./click').then(({ default: click }) => {
        click(this.startSong, song)
      })
    }
  },
  components: {
    
  },
  computed: {
    ...mapState(['currentSong'])
  },
  filters: {
    addZero(v) {
      if (v < 10) return '0' + v
      return v
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.new-music-wrap{
  margin-bottom: 40px;
  .w-title{
    font-weight: 500;
    display: flex;
    align-items: center;
    color: $grey;
    @include text-vertical-center($font-size-lg);
    cursor: pointer;
    width: fit-content;
    margin-bottom: 20px;
    i{
      color: $grey;
      margin-left: 4px;
    }
    &:hover{
      color: #fff;
      i{
        color: #fff;
      }
    }
  }
  .w-list{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .l-item{
      width: calc(50% - 15px);
      height: 80px;
      border-radius: 4px;
      padding-left: 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      &:hover{
        background: #2e2e2e;
      }
      &.active{
        background: #2e2e2e;
      }
      .i-left{
        @include flex-center();
        margin-right: 8px;
        position: relative;
        cursor: pointer;
        .l-img{
          width: 60px;
          height: 60px;
          border-radius: 4px;
        }
        .l-play{
          position: absolute;
        }
      }
      .i-middle{
        color: $font-normal-color;
        font-size: $font-size-sm;
        margin-right: 8px;
        i{
          color: $red !important;
        }
      }
      .i-right{
        height: 60px;
        padding-top: 12px;
        box-sizing: border-box;
        .r-name{
          color: $grey;
          font-size: $font-size;
          margin-bottom: 10px;
        }
        .r-artists{
          display: flex;
          font-size: $font-size-sm;
          color: $font-normal-color;
          margin-right: 4px;
        }
      }
    }
  }
}
</style>