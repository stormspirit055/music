<template>
  <div class='mini-player-wrap'>
    <div class="w-process">
      <ProcessBar :percent='currentPercent' @setProcess='_handleSetProcess' />
    </div>
    <div class="w-panel">
      <div class="p-left">
        <template v-if='currentSong.name'>
          <div class="l-img">
            <el-image :src='$utils.generateImgurl(currentSong.picUrl, 40)'></el-image>
            <Icon type='zhankaishangxia-1' />
          </div>
          <div class="l-info">
            <div class="i-name">
              <span class='n-song'>{{currentSong.name}}</span>
              <span class='n-author' v-for='(item, index) in currentSong.artists' :key="index">{{item.name}}</span>
            </div>
            <div class="i-time">{{$utils.filterProcessTime(currentProcess) + ' / ' + $utils.filterProcessTime(currentSong.duration)}} </div>
          </div>
        </template>
      </div>
      <div class="p-middle">
        <Icon class='m-like' type='main_girl' />
        <Icon class='m-prev' type='shangyishou' />
        <div class="m-play">
          <Icon type='bofang' />
        </div>
        <Icon class='m-next' type='xiayishou' />
        <Icon type='fenxiang' />
      </div>
      <div class="p-right">
        <div class="r-order"></div>
        <div class="r-songlist-trigger"></div>
        <div class="r-lyric-trigger"></div>
        <div class="r-volume-trigger"></div>
      </div>
    </div>
    <audio 
      autoplay
      @timeupdate="updateTime"
      ref='audio'
      :src='currentSong.url'
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from '@/store/helper/music'
export default {
  data () {
    return {
    };
  },

  mounted(){},
  methods: {
    ...mapMutations(['setCurrentProcess']),
    updateTime(e) {
      this.setCurrentProcess(e.target.currentTime)
    },
    _handleSetProcess(e) {
      this.audio.currentTime = (e * this.currentSong.duration).toFixed(2)
      this.setCurrentProcess((e * this.currentSong.duration).toFixed(2))
    }
  },
  components: {},
  computed: {
    ...mapState(['currentSong', 'currentProcess']),
    currentPercent() {
      return (this.currentProcess / this.currentSong.duration).toFixed(3)
    },
    audio() {
      return this.$refs.audio
    },
  },
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.mini-player-wrap{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: $mini-player-height;
  .w-panel{
    display: flex;
    justify-content: space-between;
    .p-left{
      display: flex;
    }
  }
}
</style>