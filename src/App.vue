<!--  -->
<template>
  <div id='app'>
    <Layout />
    <MiniPlayer />
  </div>
</template>

<script>
import Layout from '@/view/layout'
import MiniPlayer from '@/components/mini-player'
export default {
  data () {
    return {
    };
  },

  components: {
    Layout,
    MiniPlayer
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