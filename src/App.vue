<!--  -->
<template>
  <div id='app'>
    <Layout />
    <MiniPlayer />
    <Playlist />
  </div>
</template>

<script>
import Layout from '@/view/layout'
import MiniPlayer from '@/components/mini-player'
import Playlist from '@/components/playlist'
export default {
  data () {
    return {
    };
  },

  components: {
    Layout,
    MiniPlayer,
    Playlist
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