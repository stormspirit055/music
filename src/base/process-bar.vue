<template>
  <div class='process-bar-wrap'
    ref='process'
    @mouseenter='!alwaysShowBall ? showball = true : ""'
    @mouseleave='!alwaysShowBall ? showball = false : ""'
    @click='_handleClick'
  >
    <div class="w-line" :style='{background: bgColor ? bgColor : "202020"}' ref='line' >
      <div class="l-process" :style='{width: currentWidth}'>
        <div class="p-ball" 
          v-if='alwaysShowBall || showball' 
          @mousedown.stop="_handleMousedown"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProcessBar',
  props: ['percent', 'bgColor', 'alwaysShowBall'],
  data () {
    return {
      showball: !1,
      currentWidth: '',
      isLock: !1
    };
  },

  mounted(){},
  methods: {
    _handleMouseup(e) {
      this.isLock = !1
      this._setProcess(e.clientX)
      document.removeEventListener('mouseup', this._handleMouseup)
      document.removeEventListener('mousemove', this._handleMousemove)
    },
    _handleMousedown(e) {
      this.isLock = !0
      document.addEventListener('mouseup', this._handleMouseup, false)
      document.addEventListener('mousemove', this._handleMousemove, {passive: false})
    },
    _handleMousemove(e) {
      e.preventDefault()
      this.islock = !0
      this._setPos(e.clientX)
    },
    _handleClick(e) {
      this._setPos(e.clientX)
      this._setProcess(e.clientX)
    },
    _setProcess(current) {
      let process = this.$refs.process.clientWidth
      let startX = this.$refs.process.getBoundingClientRect().left
      current = Math.min(Math.max(current - startX, 0), process)
      const percent = (current/ process).toFixed(2)
      this.$emit('setProcess', percent)
    },
    _setPos(currentPos) {
      let startX = this.$refs.process.getBoundingClientRect().left
      let process = this.$refs.process.clientWidth
      this.currentWidth = this.$utils.toCurrentRem(Math.min(Math.max(currentPos - startX, 0), process))
    }
  },
  components: {},
  computed: {
  },
  watch: {
    percent:{
      handler(newVal) {
        if (this.isLock) return
        this.$nextTick(() => {
          let process = this.$refs.process.clientWidth
          let startX = this.$refs.process.getBoundingClientRect().left
          this._setPos(process * newVal + startX)
        })
      },
      immediate: !0
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.process-bar-wrap{
  cursor: pointer;
  height: 2px;
  padding: 6px 0;
  width: 100%;
  .w-line{
    // background: #202020;
    position: relative;
    height: 2px;
    width: 100%;
    .l-process{
      background: $red;
      position: absolute;
      height: 100%;
      width: 0%;
      .p-ball{
        position: absolute;
        right: -10px;
        @include round(10px);
        top: -4px;
        background: $red;
      }
    }
  }
}
</style>