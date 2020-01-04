<template>
  <div>  
    <router-link tag='div' :to='path' class="video-item" >
      <div class="i-cover">
        <Playbtn class='c-play' />
        <div class="c-desc" v-if='item.copywriter'>{{item.copywriter}}</div>
        <img v-lazy="$utils.generateImgurl(item.coverUrl, 230, 130)" alt="" class="c-img">
        <div class="c-count">
          <Icon type='bofang-' :size='10' />
          {{$utils.countFilter(item.playTime)}}
        </div>
        <div class="c-time">{{$utils.filterProcessTime(item.durationms / 1000)}}</div>
      </div>
      <div class="i-info">
        <div class="i-title"><Highlight :text='item.title' :keywords='keywords' /></div>
        <div class="i-creater"><Highlight :text='item.artistName' :keywords='keywords' /></div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Mvitem',
  props: {
    item: {
      type: Object,
    },
    keywords: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    };
  },

  mounted(){
    
  },
  methods: {},
  components: {},
  computed: {
    path() {
      if (this.item.mode === 'mv') {
        return `/mv?type=mv&id=${this.item.id}`
      } else {
        return `/mv?type=video&id=${this.item.id}`
      }
    }
  },
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.video-item{
  width: 230px;
  margin-right: 30px;
  margin-bottom: 30px;
  cursor: pointer;
  overflow: hidden;
  .i-cover{
    width: 230px;
    height: 130px;
    position: relative;
     &:hover{
      .c-desc{
        transform: translateY(0);  
      }
      .c-play{
        display: flex;
      }
    }
    .c-play{
        position: absolute;
        bottom: 10px;
        right: 10px;
        display: none;
      }
    .c-desc{
      transition: all .4s ;
      width: 100%;
      position: absolute;
      transform: translateY(-100%);
      z-index: 2;
      background: rgba($color: #000, $alpha: 0.3);
      padding: 5px;
      color: #fff;
      font-size: $font-size-sm;
    }
    .c-img{
      width: 230px;
      height: 130px;
      border-radius: 6px;
      position: absolute;
      top: 0;
      left: 0
    }
    .c-count{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: #fff;
      font-size: $font-size-medium-sm;
      position: absolute;
      right: 8px;
      top: 4px;
      i{
        color: #fff !important;
        margin-right: 2px;
        margin-top: 1px;
      }
    }
    .c-time{
      position: absolute;
      right: 8px;
      bottom: 4px;
      font-size: $font-size-medium-sm;
      color: #fff;
    }
  }
  .i-info{
    .i-title{
      position: relative;
      @include limit-line(1);
      color: $font-normal-color;
      font-size: $font-size-medium-sm;
      // height: $font-size-medium-sm;
      margin: 8px 0 8px;
    }
    .i-creater{
      font-size: $font-size-sm;
      height: $font-size-sm;
      color: $grey;
      font-weight: 300;
    }
  }

}
</style>