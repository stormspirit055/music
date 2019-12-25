<template>
  <div class='playlist-wrap'>
    <Panel :doms='doms' @update='_handleHide' :isShow='isShow' v-if='isShow'>
      <div class="w-innerwrap">
        <div class="w-title">
          <div class="t-item" @click='currentType = 0' :class='{active: currentType == 0}'>播放列表</div>
          <div class="t-item" @click='currentType = 1' :class='{active: currentType == 1}'>历史记录</div>
        </div>
        <!-- <div class="w-head">
          <div class="h-total">总{{list.length}}首</div>
          <div class="h-clean">
            <Icon type='lajitong' />
            清空
          </div>
        </div> -->
        <div class="w-table-wrap">
          <el-table
            empty-text='您还没有添加任何歌曲!'
            :data="list"
            :row-class-name="tableRowClassName"
            @row-dblclick="_handleDbclick"
            style="width: 100%">
            <el-table-column
              width="20">
              <template slot-scope='scope'>
                <Icon class='c-playstate' v-if='currentSong.id == scope.row.id' :size='9' :type='isPlaying ? "bofang" : "zantingtingzhi"' />
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              :label="'总' + list.length + '首'"
              width="215">
              <template slot-scope='scope'>
                <span :class='{red: scope.row.id === currentSong.id}'>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column
              width="100">
              <template slot-scope='scope'>
                <div class='c-limit'>
                  <span class='c-pointer' v-for='(item, index) in scope.row.artists' :key='index'>{{item.name +( index !== scope.row.artists.length - 1 ?  ' / ' : '')}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              width='80'>
              <template slot="header" >
                <div @click='_handleCleanList' class="h-clean">
                  <Icon type='lajitong' />
                  清空
                </div>
              </template>
                <template slot-scope='scope'>
                {{$utils.filterProcessTime(scope.row.duration)}}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <div class="h-empty" v-if='!list.length'>还有歌曲~</div> -->
      </div>
    </Panel>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from '@/store/helper/music'
import storage from 'good-storage'
import { noImpactNodeMap } from '@/config'
export default {
  name: 'Playlist',
  data () {
    return {
      currentType: 0,
      currentId: '',
      doms: []
    };
  },
  mounted(){
    this.doms = noImpactNodeMap['PLAY_LIST']
  },
  methods: {
    ...mapActions(['startSong', 'cleanPlayList', 'cleanPlayHistory']),
    ...mapMutations(['setPlaylistState']),
    _handleDbclick(e) {
      this.startSong(e)
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex & 1) {
        return 'even-row'
      } else {
        return 'odd-row'
      }
    },
    _handleCleanList() {
      this.currentType == 0 ? this.cleanPlayList() : this.cleanPlayHistory()
    },
    _handleHide() {
      this.setPlaylistState(!1)
    }
  },
  components: {},
  computed: {
    ...mapState({
      isShow: 'isShowPlaylist',
      playList: 'playList',
      isPlaying: 'isPlaying',
      playHistory: 'playHistory'
    }),
    ...mapGetters(['currentSong']),
    list() {
      if (this.currentType == 0) {
        return this.playList.list
      } else {
        return this.playHistory
      }
    }
  },
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.playlist-wrap{
  .w-innerwrap{
    padding-top: 20px;
    width: 415px;
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
    .w-title{
      width: 210px;
      height: 35px;
      border-radius: 17.5px;
      border: 1px solid #5b5b5b;
      background: #2f2f2f;
      position: relative;
      left: 50%;
      margin-left: -105px;
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
      .t-item{
        color: $grey;
        font-size: $font-size;
        width: 108px;
        height: 33px;
        border-radius: 16.5px;
        text-align: center;
        line-height: 33px;
        &.active{
          background: #5b5b5b !important;
          color: #fff !important;
        }
      }
    }
    .w-table-wrap{
      flex: 1;
      overflow-y: overlay;
      .el-table{
        .c-playstate{
          color: $red;
        }
        &::before{
          background-color: #2f2f2f !important;
        }
        /deep/.el-table__empty-block{
          background-color: #2f2f2f;
          color: $grey;
        }
        /deep/.el-table__header{
          tr{
            background-color: #2f2f2f !important;
            th{
              font-weight: 300 !important;
              border-bottom: none !important;
              background-color: #2f2f2f !important;
              &:hover{
                background-color: #2f2f2f !important;
              }
            }
          }
        }
        /deep/.el-table__body-wrapper{
          .el-table__row{
            padding-left: 10px;
            border-bottom: none !important;
            transition: background-color .4s ease !important;
            color: $font-normal-color !important;
            td:nth-child(1){
              // padding-left: 10px !important;
            }
            &:hover > td{
              background-color: #373737 !important
            }
            td{
              border-bottom: none !important;
            }
            &:hover{
              background-color: #373737 !important
            }
            &.even-row{
              background-color: #2f2f2f !important;
            }
            &.odd-row{
              background-color: #333 !important;
            }
            .cell{
              height: 26px;
              line-height: 26px;
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
            .red{
              color: $red !important;
            }
            .c-limit{
              @include limit-line(1);
            }
            .h-clean{
              display: flex;
              align-items: center;
              cursor: pointer;
            }
          }
        } 
      }
    }
  }
}
</style>