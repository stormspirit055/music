<template>
  <el-carousel :interval="4000" type="card" :height="$utils.toRem(200)">
    <el-carousel-item v-for="(item, index) in banners" :key="index">
      <el-image fit='fill' class="medium" :src='item.imageUrl' />
    </el-carousel-item>
  </el-carousel>
</template>
<script>
import { getBanner } from '@/api'
export default {
  data() {
    return {
      banners: []
    }
  },
  async created() {
    const { banners } = await getBanner()
    console.log(banners)
    this.banners = banners
  },
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.el-carousel{
  /deep/.el-carousel__container{
    .el-carousel__item{
      // width: 460px;
      // height: 150px;
    }
  }
  /deep/.el-image__inner{
    border-radius: 10px;
  }
  /deep/.el-carousel__mask{
    opacity: 0;
    display: none;
  }
  /deep/.el-carousel__indicator{
    .el-carousel__button{
      @include round(8px);
    }
    &.is-active {
      .el-carousel__button{
        background: $red;
      }
    }
  }
  
} 
</style>