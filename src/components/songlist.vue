<template>
  <div class='songlist-wrap'>
    <el-table
      v-loading='!filterSongList.length'
      empty-text=' '
      :highlight-current-row='false'
      :data="filterSongList"
      :row-class-name="tableRowClassName"
      @row-dblclick="_handleDbclick"
      style="width: 100%">
      <el-table-column
        width="50px"
      >
        <template slot-scope='scope'>
          <span v-if='currentId != scope.row.id'>{{scope.$index + 1 | addZero}}</span>
          <Icon v-else type='laba1' class='c-play' />
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="音乐标题"
      >
      </el-table-column>
      <el-table-column
        label="歌手"
        width='200px'
        class='c-limit'
      >
        <template slot-scope='scope'>
          <div class='c-limit'>
            <span class='c-pointer' v-for='(item, index) in scope.row.artists' :key='index'>{{item.name +( index !== scope.row.artists.length - 1 ?  ' / ' : '')}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width='200px'
        label="专辑名称"
      >
        <template slot-scope='scope'>
          <div class='c-limit'>
            <span class='c-pointer'>{{scope.row.albumName}}</span>
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
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from '@/store/helper/music'
export default {
  name: 'SongList',
  props: ['songList'],
  data () {
    return {
      currentId: ''
    };
  },
  mounted(){},
  methods: {
    ...mapActions(['startSong']),
    ...mapMutations(['setPlayList']),
    _handleDbclick(e) {
      this.startSong(e)
      this.currentId = e.id
      if (e.albumId !== this.playList.albumId) {
        this.setPlayList({
          albumId: e.albumId,
          list: this.songList
        })
      }
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex & 1) {
        return 'even-row'
      } else {
        return 'odd-row'
      }
    }
  },
  components: {
  },
  computed: {
    ...mapState(['playList']),
    filterSongList() {

      return this.songList
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
       .c-limit{
         @include limit-line(1);
       }
     }
   } 
  }
}
</style>