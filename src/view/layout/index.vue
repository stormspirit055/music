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
    LayoutMenu
  },

  computed: {},

  mounted(){},

  methods: {}
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
</style>