<!--  -->
<template>
  <div class='playbtn-wrap' :style='style'>
    <Icon type='right' color='red' />
  </div>
</template>

<script>
export default {
  name:'Playbtn',
  props: {
    size: {
      type: Number,
      default: 30
    }
  },
  computed:{
    style() {
      return `width:${this.size}px;height:${this.size}px`
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.playbtn-wrap{
  @include flex-center();
  background: rgba(255, 255, 255, .4);
  border-radius: 50%;
}
</style>