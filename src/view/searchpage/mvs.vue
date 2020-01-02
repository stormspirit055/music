<template>
  <div class='mvs-wrap'>
    <div class="w-list">
      <router-link tag='div' :to='"/mv?type=video&id=" + item.vid' class="l-item"  v-for='(item, index) in videos' :key='index'>
        <div class="i-cover">
          <img v-lazy="$utils.generateImgurl(item.coverUrl, 230, 130)" alt="" class="c-img">
          <div class="c-count">
            <Icon type='bofang-' :size='10' />
            {{$utils.countFilter(item.playTime)}}
          </div>
          <div class="c-time">{{$utils.filterProcessTime(item.durationms / 1000)}}</div>
        </div>
        <div class="i-info">
          <div class="i-title"><Highlight :text='item.title' :keywords='keywords' /></div>
          <div class="i-creater"><Highlight :text='item.creator[0].userName' :keywords='keywords' /></div>
        </div>
      </router-link>
    </div>
    <Pagination v-if='total > pageSize' @pagechange='_handlePageChange' :total='total'  :pageSize='pageSize' />
  </div>
</template>

<script>
import { searchResult } from '@/api'
import { typeMap } from './config'
export default {
  name: 'Videos',
  data () {
    return {
      videos: [],
      loading: false,
      pageSize: 28,
      pageNum: 1,
      total: 0,
    };
  },
  methods: {
    async _handleSearch() {
      this.$emit('update', false)
      const { result} = await searchResult({keywords: this.keywords, offset: (this.pageNum - 1) * this.pageSize, type: typeMap['TYPE_MVS'].type, limit: 28 })
      console.log(result)
      const { videos, videoCount } = result
      this.total = videoCount
      this.$parent.total = videoCount
      this.videos = videos
      // this.songList = this._generateSonglist(songs)
      this.$emit('update', true)
    },
    _handlePageChange(e) {
      this.pageNum = e
      this._handleSearch()
    },
  },
  components: {},
   computed: {
    keywords() {
      return this.$route.params.keywords
    }
  },
  watch: {
    keywords: {
      handler(newV) {
        this._handleSearch()
      },
      immediate: !0
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.mvs-wrap{
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 1040px;
  .w-list{
    max-width: 1000px;
    display: flex;
    flex-wrap: wrap;
    min-width: 1040px;
    .l-item{
      width: 230px;
      margin-right: 30px;
      margin-bottom: 30px;
      cursor: pointer;
      .i-cover{
        width: 230px;
        height: 130px;
        position: relative;
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
          font-size: $font-size-medium-sm;
          color: $font-normal-color;
          margin: 8px 0 5px;

        }
        .i-creater{
          font-size: $font-size-sm;
          color: $grey;
          font-weight: 300;
        }
      }
    }
  }
}
</style>