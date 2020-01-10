<template>
  <div class='fm-wrap'>
    <p>我抓包到了接口, 但不知道他需要什么参数, 有没有兄弟可以教教我</p>
    <el-image  class='img' :src="pic1" alt="" />
    <el-image class='img' :src="pic2" alt="" />
    <el-image class='img' :src="pic3" alt=""/>
  </div>
</template>

<script>
import pic1 from '@/assets/fm_skip1.png'
import pic2 from '@/assets/fm_skip2.png'
import pic3 from '@/assets/fm_skip3.png'
export default {
  name: 'Fm',
  data () {
    return {
      pic1,
      pic2,
      pic3
    };
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.fm-wrap{
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    margin-bottom: 20px;
    color: $blue;
  }
  .img{
    margin-bottom: 20px;
    width: 700px;
  }
}
</style>