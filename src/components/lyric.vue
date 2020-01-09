<template>
  <div class='lyric-wrap' v-if='id'>
    <div class="w-title">
      {{currentSong.name}}
      <span class='t-tag'>标准音质</span>
    </div>
    <div class="w-desc">
      <p class='d-album'>
        <span class="i-label">专辑: </span>
        <span class="i-content">{{currentSong.albumName}}</span>
      </p>
      <p class='d-singer'>
        <span class="i-label">歌手: </span>
        <span class="i-content">{{currentSong.artists[0].name}}</span>
      </p>
      <!-- <p class='d-from'>
        <span class="i-label">来源: </span>
        <span class="i-content">我喜欢的音乐</span>
      </p> -->
    </div>
    <div class="w-lyric">
      <!-- <ul> -->
      <div class='l-innerbox'>
        <li class="l-item"  :class='[{active: currentLineNum === index }, "line" + index]' v-for='(item, index) in lyricDetail' :key='index'>
          {{item.text}}
        </li>
      </div>
      <!-- </ul> -->
    </div>
  </div>
</template>

<script>
import { getSongLyric } from '@/api'
import { mapState } from '@/store/helper/music'
import BScroll from '@better-scroll/core'
import MouseWheel from "@better-scroll/mouse-wheel"
import ScrollBar from "@better-scroll/scroll-bar"
// let xyPlayer 
// import(/* webpackPrefetch:true */'xgplayer').then((module) => {
//   xyPlayer = module.default;
// })
BScroll.use(ScrollBar)
BScroll.use(MouseWheel)
const QUICK_SECOND = 2000
export default {
  name: 'Lyric',
  props: {
    id: {
      default: 0,
      type: Number
    },
    currentSong: {
      default: {
        artists: [{}]
      },
      type: Object
    }
  },
  data () {
    return {
      lyricDetail: [],
      scrollHeight: 0,
    };
  },
  mounted() {
  },
  methods: {
    async _getSongLyric() {
      let result = await getSongLyric({ id: this.id })
      if (!result.lrc) {
        this.lyricDetail = [{time: 0, text:'无歌词'}]
      } else {
        this.lyricDetail = this._parseLyric(result.lrc.lyric)
      }
    },
    _parseLyric(lyric) {
        lyric = lyric.split('\n')
        lyric.pop()
        let list = []
        let reg = /\[(\d*)(\:\d*)(.\d*)\]/g
        for(var v of lyric){
          let time = v.match(reg)
          let text = ''
          if (!time) continue
          text = v.split(time[0])[1]
          let minute = time[0].match(/\[\d+/i)[0].slice(1)
          let second = time[0].match(/\:\d+(\.?)\d+/g)[0].slice(1)
          list.push({
            time: +minute * 60 * 1000 + +second * 1000,
            text
          })
        }
        return list
    },
  },
  components: {},
  computed: {
    ...mapState(['isPlaying', 'currentProcess']),
    currentLineNum() {
      let currentTime = +this.currentProcess * 1000
      return this.lyricDetail.findIndex((v, index) => {
       return  v.time <= currentTime + QUICK_SECOND && (index == this.lyricDetail.length - 1 ||this.lyricDetail[index + 1].time > currentTime + QUICK_SECOND )
      }) || -1
    }
  },
  watch: {
    currentLineNum(newV) {
      newV !== -1 &&  this.scroll &&  this.scroll.scrollToElement('.line' + newV, 200, 0, true)
    },
    id: {
      handler(newV) {
        if (!newV) return
        this.scroll && this.scroll.destroy()
        this._getSongLyric()
      },
      immediate: !0
    },
    lyricDetail: {
      handler(newV) {
        if (!newV.length) return
          this.$nextTick(() => {
              this.scroll = new BScroll('.w-lyric', {
                scrollbar: true,
                mouseWheel: true,
                scrollY: true,
                probeType: 3
              })
          })
      },
      immediate: !0
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.lyric-wrap{
  min-width: 380px;
  padding-top: 20px;
  .w-title{
    display: flex;
    align-items: center;
    font-size: $font-size-title-lg;
    color: $font-normal-color;
    margin-bottom: 20px;
    .t-tag{
      width: 70px;
      line-height: 22px;
      height: 22px;
      font-size: $font-size;
      color: $red;
      border: 1px solid $red;
      border-radius: 4px;
      text-align: center;
      margin-left: 6px;
      box-sizing: border-box;
    }
  }
  .w-desc{
    display: flex;
    font-size: $font-size-medium-sm;
    // justify-content: space-between;
    color: $blue;
    margin-bottom: 40px;
    .i-label{
      color: $grey;
    }
    .i-content{
      color: $blue;
    }
    .d-album{
      width: 170px;
      @include limit-line(1);
    }
    .d-singer{
      width: 80px;
      @include limit-line(1);
      margin-right: 10px;
    }
    .d-from{
      flex: 1;
      @include limit-line(1);
    }
  }
  .w-lyric{
    height: 350px;
    overflow: hidden;
    position: relative;
    width: 440px;
    .l-innerbox{
      position: relative;
      width: 370px;
      .l-item{
        width: 370px;
        // height: 30px;
        padding: 8px 0;
        line-height: 1.3em;
        color: #888;
        font-size: $font-size-medium-sm;
        transition: all .3s;
        &.active{
          color: #fff;
          font-size: $font-size-lg;
        }
      }
    }
  }
}
</style>