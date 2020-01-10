<template>
<transition name="slide">
  <div class='playpanel-wrap' :class='{active: showPlayPanel}'>
    <div class="w-songdetail">
      <div class="s-cd">
        <img class='c-bar' :class='{playing: isPlaying}' :src="playBar" alt="">
        <div class="c-support">
          <img :class='{paused: !isPlaying}' :src="$utils.generateImgurl(currentSong.picUrl, 133)" alt="">
        </div>
      </div>
      <Lyric :currentSong='currentSong' :id='currentSong.id' />
    </div>
    <div class="w-comment">
      <div class="c-comment-wrap">
        <Comment :isNeedLoading='false' :id='currentSong.id'  />
      </div>
      <div class="c-relate">
        <Simiwrap type='song' :id='currentSong.id' />
        <Simiwrap type='sheet' :id='currentSong.id' />
        <Simiwrap type='user' :id='currentSong.id' />
      </div>
    </div>
  </div>
</transition> 
</template>

<script>
import playBar from '@/assets/play-bar.png'
import { mapState } from '@/store/helper/music'
import Lyric from '@/components/lyric'
import Comment from '@/components/comment'
import Simiwrap from '@/components/simi-wrap'
export default {
  name: 'Playpanel',
  data () {
    return {
      playBar,
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
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
  transform: none;
}
.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}
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
  min-width: $layout-playpanel-min-width;
  position: fixed;
  z-index: $play-panel-z-index;
  height: calc(100%  - #{$mini-player-height});
  // top: calc(100% - #{$mini-player-height});
  top: 0;
  transition: transform .4s ease ;
  padding-top: calc(#{$layout-header-height} + 10px); 
  box-sizing: border-box;
  overflow: auto;
  transform: translateY(100%);
  &.active{
    transform: translateY(0);
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
        width: 204Px;
        height: 204Px;
        background: url(http://s2.music.126.net/style/web2/img/coverall.png?1969ba9d4bd248a86abcc63f9f6590a5) no-repeat;
        background-position: -140Px -580Px;
        transform: scale(1.5);
        position: relative;
        margin-top: -10px;
        margin-left: -40px;
        img{
          position: absolute;
          @include round(133Px);
          left: 50%;
          margin-left: -66.5Px;
          top: 50%;
          margin-top: -66.5Px;
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