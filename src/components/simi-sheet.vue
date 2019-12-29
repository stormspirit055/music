<template>
  <div class='simisheet-wrap' @click='_handleGo'>
    <img class='w-img' v-lazy='$utils.generateImgurl(info.coverImgUrl, 50)'>
    <div class="w-info">
      <div class="i-name">{{info.name}}</div>
      <div class="i-play">
        <Icon type='bofang-' :size='10' />
        {{info.playCount | countFilter}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from '@/store/helper/music' 
export default {
  name: 'Simisheet',
  props: ['info'],
  data () {
    return {
    };
  },
  methods: {
    ...mapMutations(['setPlayPanelState']),
    _handleGo() {
      this.$router.push({path: `/songsheet/${this.info.id}`})
      this.setPlayPanelState(false)
    }
  },
  components: {},
  computed: {},
  filters: {
    countFilter(v) {
      return v / 10000 > 1 ? (v / 10000).toFixed(1) + '万' : '1万'
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.simisheet-wrap{
  width: 270px;
  height: 60px;
  position: relative;
  margin-left: -10px;
  padding-left: 10px;
  background: #262626;
  border-radius: 6px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .w-img{
    width: 50px;
    height: 50px;
    border-radius: 6px;
    margin-right: 10px;
  }
  .w-info{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 36px;
    .i-name{
      width: 180px;
      color: $font-normal-color;
      @include text-vertical-center($font-size);
      @include limit-line(1);
    }
    .i-play{
      display: flex;
      align-items: center;
      color: $grey;
      i{
        color: $grey;
        margin-right: 4px;
      }
    }
  }
  &:hover{
    background: #333;
  }
}
</style>