<template>
  <div class='process-bar-wrap'
    ref='process'
    @mouseenter='showball = true'
    @mouseleave="showball = false"
    @click='_handleClick'
  >
    <div class="w-line" ref='line' >
      <div class="l-process" :style='{width: currentWidth}'>
        <div class="p-ball" 
          v-if='showball' 
          @mousedown.stop="_handleMousedown"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProcessBar',
  props: ['percent'],
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
      this.$emit('setProcess', (current / process).toFixed(2))
    },
    _setPos(currentPos) {
      let process = this.$refs.process.clientWidth
      this.currentWidth = this.$utils.toCurrentRem(currentPos)
    }
  },
  components: {},
  computed: {
  },
  watch: {
    percent(newVal) {
      if (this.isLock) return
      let process = this.$refs.process.clientWidth
      this._setPos(process * newVal)
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.process-bar-wrap{
  cursor: pointer;
  height: 2px;
  padding: 6px 0;
  position: absolute;
  top: -7px;
  width: 100%;
  .w-line{
    background: #202020;
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
        right: 0;
        @include round(10px);
        top: -4px;
        background: $red;
      }
    }
  }
}
</style>