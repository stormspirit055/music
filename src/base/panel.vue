<template>
  <div class='panel-wrap' >
    <slot></slot>
  </div>
</template>

<script>
import { isChildOf } from '@/utils'
export default {
  name: 'Panel',
  props: ['isShow', 'doms'],
  data () {
    return {
    };
  },
  created(){
    this._addListener()
  },
  methods: {
    _addListener() {      
      document.addEventListener('mousedown', this._handleClick)
    },
    _removeListener() {
      document.removeEventListener('mousedown', this._handleClick)
    },
    _handleClick(e) {
      let targetNode = e.target
      const parentNodes = this.doms.concat('.panel-wrap')
      if (!isChildOf(targetNode, parentNodes)) this.$emit('update', false)
    }
  },
  components: {},
  computed: {},
  beforeDestroy() {
    this._removeListener()
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.panel-wrap{
  position: fixed;
  overflow-y: auto;
  top: $layout-header-height;
  right: 0;
  height: calc(100% - #{$layout-header-height} - #{$mini-player-height});
  background-color: #2f2f2f;
  z-index: $search-panel-z-index;
}
</style>