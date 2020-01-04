<template>
  <div class='fm-wrap'>
    <p>我抓包到了接口, 但不知道他需要什么参数, 有没有兄弟可以教教我</p>
    <el-image  class='img' src="/src/assets/fm_skip1.png" alt="" />
    <el-image class='img' src="/src/assets/fm_skip2.png" alt="" />
    <el-image class='img' src="/src/assets/fm_skip3.png" alt=""/>
  </div>
</template>

<script>
import { getFm, getFmNext } from '@/api'
export default {
  name: 'Fm',
  data () {
    return {
    };
  },

  mounted(){
    
  },
  methods: {
    async _initData() {
      const result = await getFm()
      console.log(result)
    }
  },
  components: {},
  computed: {},
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