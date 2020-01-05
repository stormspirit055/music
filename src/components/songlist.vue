<template>
  <div class='songlist-wrap'>
    <el-table
      :show-header='isShowHead'
      v-loading='loading'
      v-if='filterSongList.length'
      :highlight-current-row='false'
      :data="filterSongList"
      :row-class-name="tableRowClassName"
      @row-dblclick="_handleDbclick"
      style="width: 100%">
      <el-table-column
        width="50px"
      >
        <template slot-scope='scope'>
          <span v-if='currentSong.id != scope.row.id'>{{scope.$index + 1 | addZero}}</span>
          <Icon v-else type='laba1' class='c-play' />
        </template>
      </el-table-column>
      <el-table-column
        width="80px"
        v-if='isShowCover'
      >
        <template slot-scope='scope'>
          <div class="c-cover" @click='_handleDbclick(scope.row)'>
            <img v-lazy="$utils.generateImgurl(scope.row.picUrl, 60)" alt="" class="c-img">
            <Playbtn :size='24' />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="音乐标题"
      >
      <template slot-scope='scope'>
        <div class='c-name'>
          <Highlight :keywords='keywords' :text='scope.row.name' />
          <Icon @click='_goMv(scope.row.mvid)' type='MV-' v-if='scope.row.mvid' :size='12' />
        </div>
      </template>
      </el-table-column>
      <el-table-column
        label="歌手"
        width='175px'
        class='c-limit'
      >
        <template slot-scope='scope'>
          <div class='c-limit'>
            <span class='c-pointer' v-for='(item, index) in scope.row.artists' :key='index'>
              <Highlight :keywords='keywords' :text="item.name +( index !== scope.row.artists.length - 1 ?  ' / ' : '')" />
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width='175px'
        label="专辑名称"
      >
        <template slot-scope='scope'>
          <div class='c-limit'>
            <span class='c-pointer'><Highlight :keywords='keywords' :text='scope.row.albumName' /></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width='150px'
        label="时长">
         <template slot-scope='scope'>
           {{$utils.filterProcessTime(scope.row.duration)}}
        </template>
      </el-table-column>
    </el-table>
    <div class="w-emtpy" v-if='filterSongList.length == 0 && loading == false && isShowEmpty'>
      未能找到与'<span style='color: '>{{keywords}}</span>'相关的歌曲
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from '@/store/helper/music'
const filterKey = ['name', 'artistsText', 'albumName']
export default {
  name: 'SongList',
  props: {
    songList: {
      type: Array,
      default: []
    },
    keywords: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    isFilter: {
      type: Boolean,
      default: true
    },
    isShowCover: {
      type: Boolean,
      default: false
    },
    isShowHead: {
      type: Boolean,
      default: true
    },
    isShowEmpty: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
     
    };
  },
  mounted(){
    this.$bus.on('PLAY_ALL', this._playAll)
  },
  methods: {
    ...mapActions(['startSong']),
    ...mapMutations(['setPlayList']),
    _handleDbclick(e) {
      this.startSong(e)
      if (e.albumId !== this.playList.albumId) {
        this.setPlayList({
          albumId: e.albumId,
          list: this.songList
        })
      }
    },
    _playAll(e) {
      console.log(e)
      if (e !== this.playList.albumId) {
        this.setPlayList({
          albumId: e,
          list: this.songList
        })
        let randomIndex = Math.floor(Math.random() * this.songList.length)
        this.startSong(this.songList[randomIndex])
      } else {
        let currentIndex = this.songList.findIndex(v => v.id === this.currentSong.id)
        let randomIndex = currentIndex
        while(randomIndex === currentIndex) {
          randomIndex = Math.floor(Math.random() * this.songList.length)
        }
        this.startSong(this.songList[randomIndex])
      }
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex & 1) {
        return 'even-row'
      } else {
        return 'odd-row'
      }
    },
    _goMv(id) {
      this.$router.push(`/mv?type=mv&id=${id}`)
    }
  },
  components: {
  },
  computed: {
    ...mapState(['playList', 'currentSong', 'isPlaying']),
    filterSongList() {
      if (this.isFilter) {
        return this.songList.filter(line => {
          let mark = false
          filterKey.forEach(v => {
            if (line[v].indexOf(this.keywords) > -1 ) mark = true
          })
          return mark
        })
      } else {
        return this.songList
      }
    }
  },
  filters: {
    addZero(v) {
      return v < 10 ? '0' + v : v
    },
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.songlist-wrap{
  min-width: $layout-content-min-width;
  .el-table{
    &::before{
      background-color: #212121 !important;
    }
    /deep/.el-table__empty-block{
        background-color: #212121;
        color: $grey;
      }
    /deep/.el-table__header{
      tr{
        background-color: #212121 !important;
        th{
          font-weight: 300 !important;
          border-bottom: none !important;
          background-color: #212121 !important;
          &:hover{
           background-color: #2e2e2e !important;
         }
        }
      }
    }
   /deep/.el-table__body-wrapper{
     .el-table__row{
       padding-left: 10px;
       border-bottom: none !important;
       transition: background-color 0s ease !important;
       td:nth-child(1){
         padding-left: 10px !important;
       }
       &:hover > td{
            background-color: #2e2e2e !important
       }
       td{
          border-bottom: none !important;
       }
       &:hover{
            background-color: #2e2e2e !important
          }
       &.even-row{
         background-color: #212121 !important;
       }
       &.odd-row{
         background-color: #252525 !important;
       }
       .cell{
        //  height: 26px;
        //  line-height: 26px;
         min-width: 175px;
         @include limit-line(1);
         padding-left: 10px;
         box-sizing: border-box;
       }
       .c-pointer{
         cursor: pointer;
         &:hover{
           color: $grey;
         }
       }
       .c-play{
         color: $red;
       }
       .c-limit{
         @include limit-line(1);
       }
       .c-cover{
         position: relative;
         width: 60px;
         height: 60px;
         @include flex-center();
         cursor: pointer;
         border-radius: 4px;
         overflow: hidden;
         .c-img{
           position: absolute;
           width: 100%;
           height: 100%;
           left: 0;
           top: 0;
         }
       }
       .c-name{
         display: flex;
         align-items: center;
         i{
           color: $red !important;
           margin-left: 4px;
           cursor: pointer;
         }
       }
     }
   } 
  }
  .w-emtpy{
    position: relative;
    text-align: center;
    margin-top: 50px;
    color: $grey;
    span{
      color: $red;
    }
  }
}
</style>