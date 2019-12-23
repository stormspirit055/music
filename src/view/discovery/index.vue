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
import Banner from './banner'
import RecommendSongsheet from './recommend-songsheet'
import NewMusic from './new-music'
import RecommendMv from './recommend-mv'
import RecommendRadio from './recommend-radio'
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