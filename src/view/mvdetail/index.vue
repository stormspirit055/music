<template>
  <div class='mv-wrap'>
    <template>
      <div class="w-left">
        <Videocomponent ref='video' :url='url' />
        <div class="l-info" v-if='detail.name'>
          <div class="i-creater">
            <el-image fit='cover' :src="$utils.generateImgurl(detail.cover, 55)" alt="" class="c-img" />
            <div class="c-artist">{{detail.artistText}}</div>
          </div>
          <div class="i-title">{{detail.name}}</div>
          <div class="i-detail">
            <span>发布: {{detail.publishTime}}</span>
            <span>播放: {{$utils.countFilter(detail.playCount)}}</span>
          </div>
          <div class="i-desc">{{detail.desc}}</div>
          <div class="i-tags" v-if='type === "video"'></div>
        </div>
        <Comment :isNeedLoading='false' class='l-comment' :id='id' :type='type' />
      </div>
      <div class="w-right">
        <Simiwrap :type='type' :id='id' />
      </div>
    </template>
  </div>
</template>

<script>
import Comment from '@/components/comment'
import Simiwrap from '@/components/simi-wrap'
import { getVideoDetail, getVideoUrl, getMvDetail, getMvUrl } from '@/api'
export default {
  data () {
    return {
      url: '',
      detail: {
        artists: []
      },
    };
  },
  methods: {
    _initData() {
      if (this.type === 'mv') {
        this._getMvUrl()
        this._getMvDetail()
      } else {
        this._getVideoDetail()
        this._getVideoUrl()
      }
    },
    async _getMvDetail() {
      const  { data }  = await getMvDetail({ mvid: this.id})
      data.artistText = data.artists.reduce((sum, v) => {
        return sum + v.name + ' / '
      }, '').slice(0, -2)
      this.detail = data
    },
    async _getMvUrl() {
      const  { data } = await getMvUrl({ id: this.id})
      this.url = data.url
    },
    async _getVideoDetail() {
      console.log('视频详情')
      let { data } = await getVideoDetail({ id: this.id})
      data.artistText = data.creator.nickname
      data.cover = data.creator.avatarUrl
      data.publishTime = this.$formatDate(data.publishTime)
      data.playCount = this.$utils.countFilter(data.playTime)
      data.desc = data.description
      data.name = data.title
      this.detail = data
    },
    async _getVideoUrl() {
      console.log('视频链接')
      let { urls } = await getVideoUrl({ id: this.id})
      this.url = urls[0].url
    }
  },
  components: { Comment, Simiwrap },
  beforeDestroy() {
    this.$refs.video.destory()
  },
  computed: {
    type() {
      return this.$route.query.type
    },
    id() {
      return this.$route.query.id
    },
  },
  watch: {
    id: {
      handler(newV) {
        this._initData()
      },
      immediate: !0
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.mv-wrap{
  padding-top: 30px;
  position: fixed;
  background: #212121;
  width: 100vw;
  left: 0;
  height: calc(100% - #{$layout-header-height});
  top: $layout-header-height;
  z-index: $mv-z-index;
  overflow: auto;
  display: flex;
  justify-content: center;
  .v-loading{
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;
    left: 0;
    z-index: 9999 !important;
  }
  .w-left{
    width: 630px;
    margin-right: 20px;
    .l-info{
      padding-top: 20px;
      margin-bottom: 40px;
      .i-creater{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .c-img{
          @include round(55px);
          margin-right: 10px;
        }
        .c-artist{
          font-size: $font-size;
          color: $grey;
        }
      }
      .i-title{
        font-weight: 500;
        font-size: $font-size-title-sm;
        color: $font-normal-color;
        margin-bottom: 20px; 
      }
      .i-detail{
        color: $grey;
        font-size: $font-size-sm;
        margin-bottom: 20px;
        span{
          margin-right: 50px;
        }
      }
      .i-desc{
        font-size: $font-size-medium-sm;
        color: $font-normal-color;
      }
    }
    .l-comment{
      margin-left: 0px;
    }
  }
  .w-right{
    width: 270px;
  }
}
</style>