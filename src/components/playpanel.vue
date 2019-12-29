<template>
  <div class='playpanel-wrap' :class='{active: showPlayPanel}'>
    <div class="w-fixed"></div>
    <div class="w-songdetail">
      <div class="s-cd">
        <img class='c-bar' :class='{playing: isPlaying}' src="/src/assets/play-bar.png" alt="">
        <div class="c-support">
          <img :class='{paused: !isPlaying}' :src="$utils.generateImgurl(currentSong.picUrl, 133)" alt="">
        </div>
      </div>
      <Lyric :currentSong='currentSong' :id='currentSong.id' />
    </div>
    <div class="w-comment">
      <div class="c-comment-wrap">
        <Comment :id='currentSong.id'  />
      </div>
      <div class="c-relate">
        <Simiwrap type='song' :id='currentSong.id' />
        <Simiwrap type='sheet' :id='currentSong.id' />
        <Simiwrap type='user' :id='currentSong.id' />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from '@/store/helper/music'
import Lyric from '@/components/lyric'
import Comment from '@/components/comment'
import Simiwrap from '@/components/simi-wrap'
export default {
  name: 'Playpanel',
  data () {
    return {
    };
  },

  mounted(){

  },
  methods: {
  },
  components: {
    Lyric,
    Comment,
    Simiwrap
  },
  computed: {
    ...mapState(['showPlayPanel', 'currentSong', 'isPlaying'])
  },
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
.playpanel-wrap{
  background: #262626;
  width: 100%;
  position: absolute;
  z-index: $play-panel-z-index;
  height: calc(100%  - #{$mini-player-height});
  top: calc(100% - #{$mini-player-height});
  transition: top .4s ease ;
  padding-top: calc(#{$layout-header-height} + 10px); 
  box-sizing: border-box;
  overflow: auto;
  .w-fixed{
    background: #262626;
    position: fixed;
    top: 0;
    width: 100%;
    height: $layout-header-height;
    z-index: 1001;
  }
  &.active{
    top: 0;
  }
  .w-songdetail{
    position: relative;
    display: flex;
    justify-content: center;
    height: 600px;
    .s-cd{
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 306px;
      margin-right: 30px;
      .c-bar{
        width: 80px;
        height: 116px;
        z-index: 2;
        transform: rotate(-30deg);
        transform-origin: 0 0;
        transition: all .3s ease;
        &.playing{
          transform: rotate(-10deg);
        }
      }
      .c-support{
        width: 204px;
        height: 204px;
        background: url(http://s2.music.126.net/style/web2/img/coverall.png?1969ba9d4bd248a86abcc63f9f6590a5) no-repeat;
        background-position: -140px -580px;
        transform: scale(1.5);
        position: relative;
        margin-top: -10px;
        margin-left: -40px;
        img{
          position: absolute;
          @include round(133px);
          left: 50%;
          margin-left: -66.5px;
          top: 50%;
          margin-top: -66.5px;
          animation: rotate 10s linear infinite;
          &.paused{
            animation-play-state: paused;
          }
        }
      }
    }
  }
  .w-comment{
    display: flex;
    position: relative;
    justify-content: center;
    .c-comment-wrap{
      min-width: 600px;
      max-width: 600px;
      margin-right: 40px;
    }
    .c-relate{
      width: 300px;
    }
  }
}
</style>