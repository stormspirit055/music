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
export default {
  data () {
    return {
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
<style>
#app {
  height: 100%;
}
</style>