<template>
  <div id='video-player' ref='player'>
  </div>
</template>

<script>
let xyPlayer 
import(/* webpackPrefetch:true */'xgplayer').then((module) => {
  xyPlayer = module.default;
})
export default {
  name:'Videocomponent',
  props: {
    url: {
      default: '',
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
          url: this.url,
          autoplay: true
      })
      this.player.once('ready',()=>{
        const player = this.$refs.player
        player.style.height = ''
        player.style.width = ''
        // this.player.play()
      })
    }
  },
  components: {},
  watch: {
    url: {
      handler(newV, oldV) {
        if (newV && newV !== oldV) {
          if (!this.player) {
            console.log('哈哈哈哈哈')
            import(/* webpackPrefetch:true */'xgplayer').then((module) => {
              xyPlayer = module.default;
              this.initVideo()
            })
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