<template>
  <div class='mini-player-wrap'>
    <div class="w-process" v-if='currentSong.name'>
      <ProcessBar :percent='currentPercent' @setProcess='_handleSetProcess' />
    </div>
    <div class="w-panel">
      <div class="p-left">
        <template v-if='currentSong.name'>
          <div class="l-img" @click='_handleShowPlayPanel'>
            <img :src='$utils.generateImgurl(currentSong.picUrl, 40)' />
            <Icon type='zhankaishangxia-1' />
          </div>
          <div class="l-info">
            <div class="i-name">
              <span class='n-song'>{{currentSong.name}}</span>
              <span class='n-author' v-for='(item, index) in currentSong.artists' :key="index">- {{item.name}}</span>
            </div>
            <div class="i-time">{{$utils.filterProcessTime(currentProcess) + ' / ' + $utils.filterProcessTime(currentSong.duration)}} </div>
          </div>
        </template>
      </div>
      <div class="p-middle">
        <Icon class='m-like' type='main_girl' />
        <Icon class='m-prev' @click='_handleSwitchSong("prev")' type='shangyishou' :size='24' />
        <div class="m-play" @click='_switchState'>
          <Icon type='bofang' v-if='!isPlaying' />
          <Icon type='zantingtingzhi' v-else />
        </div>
        <Icon class='m-prev rotate' @click='_handleSwitchSong("next")' type='shangyishou' :size='24' />
        <Icon type='fenxiang' class='m-share'  :size='16' />
      </div>
      <div class="p-right">
        <div class="r-order"
          @mouseenter='isShowOrder = true' 
          @mouseleave='isShowOrder = false'>
          <Icon @click='_handleSwitchOrder' :type='currentOrder.icon' :size='18' />
          <div class="o-label"  v-if='isShowOrder'>{{currentOrder.label}}</div>
        </div>
        <Icon @click='_handleDisplayPlaylist' class="r-songlist-trigger" :class='{active: isShowPlaylist}' type='bofangliebiao' :size='16' />
        <div class="r-lyric-trigger"></div>
        <div class="r-volume-trigger">
          <Volume :volume='volume' @changeVolume='_handleChangeVolume' />
        </div>
      </div>
    </div>
    <audio 
      autoplay
      @canplay='_isCanplay'
      @timeupdate="updateTime"
      @ended='_handleEnded'
      ref='audio'
      :src='currentSong.url'
    />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from '@/store/helper/music'
import { playOrderMap } from '@/config'
import storage from 'good-storage'
let failIndex = 0
export default {
  data () {
    return {
      isSongReady: !1,
      isShowOrder: !1,
      volume: storage.get('VOLUME', 0.5),
    };
  },

  mounted() {
    this.audio.volume = this.volume
  },
  methods: {
    ...mapMutations(['setCurrentProcess', 'setSongState', 'setOrderType', 'setPlaylistState', 'setPlayPanelState']),
    ...mapActions(['endSong', 'startSong', 'cleanCurrentSong']),
    _handleSwitchSong(type) {
      let nextSong
      if (type == 'prev') {
        nextSong = storage.get('PLAY_HISTORY')[1]
      } else {
        const playList = this.playList.list
        const id = this.currentSong.id
        let currentIndex = playList.findIndex(v => v.id === id)
        if (this.currentOrderKey == 'ORDER_RANDOM') {
          let randomIndex = currentIndex
          while(randomIndex === currentIndex) {
            randomIndex = Math.floor(Math.random() * playList.length)
          }
          nextSong = playList[randomIndex]
        } else {
          currentIndex += failIndex
          console.log(currentIndex)
          nextSong = currentIndex === playList.length - 1 ? playList[0] : playList[currentIndex + 1]
        }
      }
      this.startSong(nextSong).then(res => {
        if (!res) {
          failIndex++
          this._handleSwitchSong(type)
        } else {
          failIndex = 0
        }
      })
    },
    updateTime(e) {
      this.setCurrentProcess(e.target.currentTime)
    },
    _handleSetProcess(e) {
      this.audio.currentTime = (e * this.currentSong.duration).toFixed(2)
      this.setCurrentProcess((e * this.currentSong.duration).toFixed(2))
    },
    _play() {
      this.isSongReady && this.audio.play()
    },
    _pause() {
      this.audio.pause()
    },
    _switchState() {
      this.setSongState(!this.isPlaying)
    },
    _handleEnded() {
      const playList = this.playList.list
      const id = this.currentSong.id
      const currentIndex = playList.findIndex(v => v.id === id)
      switch(this.currentOrderKey) {
        case 'ORDER_LOOP':
          this.setCurrentProcess(0)
          // this.startSong(playList[currentIndex])
          break;
        case 'ORDER_SEQUENCE':
          if (currentIndex + 1 < playList.length) {
            this.startSong(playList[currentIndex + 1])
          } else {
            this.cleanCurrentSong()
            return
          }
          break;
        case 'ORDER_LIST':
          if (currentIndex + 1 < playList.length) {
            this.startSong(playList[currentIndex + 1])
          } else {
            this.startSong(playList[0])
          }
          break;
        case 'ORDER_RANDOM':
          let randomIndex = currentIndex
          while(randomIndex === currentIndex) {
            randomIndex = Math.floor(Math.random() * playList.length)
          }
          this.startSong(playList[randomIndex])
          break;
      }
      // this.endSong(this.currentSong.id)
      this._play()
    },
    _isCanplay(){
      this.isSongReady = !0
    },
    _handleSwitchOrder() {
      let keys = Object.keys(playOrderMap)
      let currentIndex = keys.findIndex(v => v == this.currentOrderKey)
      this.setOrderType(keys[currentIndex === keys.length - 1 ? 0 : currentIndex + 1])
    },
    _handleChangeVolume(e) {
      this.audio.volume = e
    },
    _handleDisplayPlaylist() {
      this.setPlaylistState(!this.isShowPlaylist)
    },
    _handleShowPlayPanel() {
      this.setPlayPanelState(!this.showPlayPanel)
    }
  },
  components: {},
  computed: {
    ...mapState(['currentProcess', 'isPlaying', 'currentOrderKey', 'isShowPlaylist', 'playList', 'showPlayPanel']),
    ...mapGetters(['currentSong']),
    currentPercent() {
      return (this.currentProcess / this.currentSong.duration).toFixed(3)
    },
    audio() {
      return this.$refs.audio
    },
    currentOrder() {
      return playOrderMap[this.currentOrderKey]
    }
  },
  watch: {
    isPlaying(newV) {
      newV ? this._play() : this._pause()
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.mini-player-wrap{
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: $mini-player-height;
  background: #212121;
  min-width: $layout-content-min-width;
  z-index: $mini-player-z-index;
  .w-process{
    position: absolute;
    width: 100%;
    top: -7px;
  }
  .w-panel{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    .p-left{
      display: flex;
      width: 30%;
      align-items: center;
      padding-left: 8px;
      .l-img{
        position: relative;
        @include flex-center;
        width: 40px;
        height: 40px;
        border-radius: 4px;
        margin-right: 10px;
        overflow: hidden;
        cursor: pointer;
        &:hover{
          img{
            filter: blur(2px);
          }
        }
        i{
          position: absolute;
        }
      }
      .l-info{
        .i-name{
          margin-bottom: 4px;
          .n-song{
            font-size: $font-size-medium-sm;
            color: $grey;
          }
          .n-author{
            font-size: $font-size-sm;
            color: $font-normal-color;
          }
        }
        .i-time{
           font-size: $font-size-sm;
            color: $font-normal-color;
        }
      }
    }
    .p-middle{
      display: flex;
      width: 300px;
      justify-content: space-between;
      align-items: center;
      width: 200px;
      .m-prev {
        color: $red;
        &.rotate{
          transform: rotate(180deg);
        }
      }
      .m-play{
        @include round(40px);
        @include flex-center();
        background: $red;
        i{
          color: #fff;
        }
      }
      .m-share{
        color: #fff;
      }
    }
    .p-right{
      display: flex;
      width: 30%;
      align-items: center;
      justify-content: flex-end;
      padding-right: 30px;
      box-sizing: border-box;
      .r-order{
        position: relative;
        user-select: none;
        margin-right: 10px;
        cursor: pointer;
        i{
          color: #fff;
        }
        .o-label{
          position: absolute;
          width: 60px;
          height: 20px;
          top: -20px;
          color: $grey;
          text-align: center;
          line-height: 20px;
          font-size: $font-size-sm;
          background: #212121;
          border-radius: 4px;
          box-shadow: 0px 0px 4px 2px #333;
          left: 50%;
          margin-left: -30px;
        }
      }
      .r-songlist-trigger{
        color: #fff;
        margin-right: 10px;
        &.active{
          color: $red;
        }
      }
    }
  }
}
</style>