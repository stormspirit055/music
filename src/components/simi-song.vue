<template>
  <div class='simisong-wrap' @click='_handlePlay'>
    <div class="w-img">
      <img class='img'  v-lazy='$utils.generateImgurl(info.picUrl, 50)' />
      <Playbtn />
    </div>
    <div class="w-info">
      <p class="i-name">{{info.name}}</p>
      <p class="i-singer">{{info.singerText}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions} from '@/store/helper/music'
export default {
  name:'Simisong',
  props: ['info'],
  data () {
    return {
    };
  },
  mounted(){},
  methods: {
    ...mapActions(['startSong']),
    _handlePlay() {
      this.startSong(this.info)
    }
  },
  components: {},
  computed: {},
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.simisong-wrap{
  width: 270px;
  height: 60px;
  position: relative;
  margin-left: -10px;
  padding-left: 10px;
  background: #262626;
  border-radius: 6px;
  display: flex;
  align-items: center;
  .w-img{
    @include flex-center();
    width: 50px;
    height: 50px;
    border-radius: 6px;
    position: relative;
    margin-right: 10px;
    .img{
      width: 100%;
      height: 100%;
      border-radius: 6px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .w-info{
    height: 36px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .i-name{
      color: $font-normal-color;
      @include text-vertical-center($font-size);
      margin-bottom: 10px;
    }
    .i-singer{
      @include text-vertical-center($font-size-medium-sm);
      color: $grey;
    }
  }
  &:hover{
    background: #333;
  }
}
</style>