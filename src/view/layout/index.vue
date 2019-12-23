<!--  -->
<template>
  <div class='layout-wrap'>
    <LayoutHeader />
    <div class="w-body">
      <LayoutMenu />
      <div class="b-view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import LayoutHeader from './header'
import LayoutMenu from './menu'
export default {
  data () {
    return {
    };
  },

  components: {
    LayoutHeader,
    LayoutMenu,
  },

  computed: {},

  mounted(){},

  methods: {}
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.layout-wrap{
  height: 100%;
  .w-body{
    display: flex;
    position: relative;
    height: calc(100% - #{$layout-header-height});
    .b-view{
      flex: 1;
      overflow-y: auto;
      min-width: $layout-content-min-width;
      margin-bottom: $mini-player-height;
      background: #212121;
    }
  }
}
</style>