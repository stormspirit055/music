<!--  -->
<template>
  <div id='app'>
    <Layout />
    <MiniPlayer />
    <Playlist />
    <Playpanel />
  </div>
</template>

<script>
import Layout from '@/view/layout'
import MiniPlayer from '@/components/mini-player'
import Playlist from '@/components/playlist'
import Playpanel from '@/components/playpanel'
import img from '@/assets/default_avatar.jpg'
export default {
  data () {
    return {
      img
    };
  },

  components: {
    Layout,
    MiniPlayer,
    Playlist,
    Playpanel
  },

  computed: {},

  mounted(){},

  methods: {}
}
</script>
<style lang='scss'>
#app {
  height: 100%;
}
</style>