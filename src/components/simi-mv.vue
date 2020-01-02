<template>
  <div class='simimv-wrap' @click='_handleClick'>
    <div class="w-left">
      <img v-lazy="$utils.generateImgurl(info.cover, 140, 80)" alt="" class="l-img">
      <div class="l-count">
        <Icon type='bofang-' :size='10' />
        {{$utils.countFilter(info.playCount)}}
      </div>
      <div class="l-time">{{$utils.filterProcessTime(info.duration / 1000)}}</div>
    </div>
    <div class="w-right">
      <div class="r-title">
        <div class='mv' v-if='type === "mv"'>MV</div>
        {{info.name}}
      </div>
      <p class="r-creater">by {{info.artistName}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Simimv',
  props: ['type', 'info'],
  data () {
    return {
    };
  },

  mounted(){
  },
  methods: {
    _handleClick() {
      this.$router.push({path: this.$route.path, query: {id: this.info.id, type: this.type}})
    }
  },
  components: {},
  computed: {},
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.simimv-wrap{
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;
  .w-left{
    width: 140px;
    height: 80px;
    margin-right: 10px;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    .l-img{
      position: absolute;
      left: 0;
      top: 0;
    }
    .l-count{
      position: absolute;
      top: 2px;
      right: 2px;
      display: flex;
      align-items: center;
      color: #fff;
      font-size: $font-size-sm; 
      i{
        color: #fff !important;
      }
    }
    .l-time{
      color: #fff;
      font-size: $font-size-sm; 
      position: absolute;
      bottom: 2px;
      right: 2px;
    }
  }
  .w-right{
    width: 140px;
    .r-title{
      position: relative;
      @include limit-line(2);
      margin-bottom: 20px;
      line-height: 1.3;
      font-size: $font-size;
      color: $font-normal-color;
      .mv{
        border-radius: 2px;
        display: inline-block;
        border: 1px solid $red;
        color: $red;
        font-size: 12px;
        height: 16px;
        padding: 0 2px;
        margin-right: 2px;
        line-height: 16px;
        transform: scale(0.9);
      }
    }
    .r-creater{
      color: $grey;
      font-size: $font-size-medium-sm;
      &:hover{
        color: $font-normal-color !important;
      }
    } 
  }
}
</style>