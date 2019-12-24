<template>
  <div class='volume-wrap'>
    <Icon @click='_handleSwitch' :type='isSilence ? "jingyin" : "yinliang"' :size='18' />
    <div class="w-line">
      <ProcessBar @setProcess='setProcess' :percent='volumeProp' bgColor='#434343' :alwaysShowBall='true'/>
    </div>
  </div>
</template>

<script>
import storage from 'good-storage'
export default {
  name: 'Volume',
  props: ['volume'],
  data () {
    return {
      isSilence: !1,
      volumeProp: this.volume
    };
  },
  mounted(){},
  methods: {
    setProcess(e) {
      console.log(e)
      if (e == '0.00') this.isSilence = !0
      if (this.isSilence && e != '0.00') this.isSilence = !1
      storage.set('VOLUME', e)
      this.$emit('changeVolume', e)
      this.volumeProp = e
    },
    _handleSwitch() {
      if (!this.isSilence) {
        storage.set('PREV_VOLUME', this.volumeProp)
        this.isSilence = !0
        this.volumeProp = '0.00'
        this.$emit('changeVolume', this.volumeProp)
      } else {
        this.isSilence = !1
        this.volumeProp = storage.get('PREV_VOLUME', 0.5)
        this.$emit('changeVolume', this.volumeProp)
      }
    }
  },
  components: {},
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.volume-wrap{
  display: flex;
  align-items: center;
  cursor: pointer;
  i{
    color: #fff !important;
  }
  .w-line{
    margin-left: 6px;
    width: 100px;
    position: relative;
  }
}
</style>