<template>
  <div id='video-player' ref='player'>
  </div>
</template>

<script>
import xyPlayer from 'xgplayer'
export default {
  name:'Videocomponent',
  props: {
    url: {
      default: 'http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/728179446/c4518a1622c555b2081bc9323d984446.mp4?wsSecret=c8d916ddac0ae5c872abe02474d72a8a&wsTime=1577942663',
      type: String,
    }
  },
  data() {
    return {
      player: ''
    }
  },
  methods: {
    initVideo() {
      this.player = new xyPlayer({
          id: 'video-player',
          url: this.url
      })
      this.player.once('ready',()=>{
        const player = this.$refs.player
        player.style.height = ''
        player.style.width = ''
      })
      // this.player.play()
    }
  },
  components: {},
  watch: {
    url: {
      handler(newV, oldV) {
        if (newV && newV !== oldV) {
          if (!this.player) {
            this.initVideo()
          } else {
            this.player.src = newV
            this.player.reload()
          }
        }
      },
      immediate: !0
    }
  }

}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
#video-player{
  width: 620px;
  height: 344px;
  border-radius: 6px;
  overflow: hidden;
}
</style>