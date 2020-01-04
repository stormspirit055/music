<!--  -->
<template>
  <div class='discovery-wrap'>
    <Banner />
    <RecommendSongsheet />
    <NewMusic />
    <RecommendMv />
    <RecommendRadio />
  </div>
</template>

<script>
import Banner from './components/banner'
import RecommendSongsheet from './components/recommend-songsheet'
import NewMusic from './components/new-music'
import RecommendMv from './components/recommend-mv'
import RecommendRadio from './components/recommend-radio'
export default { 
  components: { Banner, RecommendSongsheet, NewMusic, RecommendMv, RecommendRadio },
  data() {
    return {

    }
  }
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.discovery-wrap{
  margin: 0 auto;
  background: #212121;
  padding: 20px 30px 0;
  max-width: $center-content-max-width;
  min-width: $layout-content-min-width;
}
</style>