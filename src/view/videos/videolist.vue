<template>
  <div class='videos-wrap' ref='wrap'>
    <div class="w-title">
      <div class="t-left">
        {{currentTag.name}}
        <Icon type='iconfontyoujiantou-copy-copy-copy-copy-copy' :size='12'  />
      </div>
      <div class="t-right">
        <span class="r-item" @click='_switchType(item)' :class='{active: currentTag.id === item.id}' v-for='(item, index) in defaultTags' :key='index'>{{item.name}}</span>
      </div>
    </div>
    <div class="w-list">
      <Mvitem v-for='(item, index) in mvs' :key="index" :item='item' />
    </div>
  </div>
</template>

<script>
import { getVideoTagList, getTagVideos } from '@/api'
import { throttle } from 'lodash-es'
export default {
  data () {
    return {
      tags: [],
      mvs: [],
      defaultTags: [],
      currentTag: {},
      scroll: '',
      idMap: {}
    };
  },
  mounted(){
    this._getVideoTagList()
    let wrap = this.$refs.wrap
    const scrollHeight = wrap.scrollHeight
    const wrapHeight = wrap.getBoundingClientRect().height
    wrap.addEventListener('scroll', throttle(() => {
      if (this._isTouchBottom(scrollHeight, wrap.scrollTop)) this._getTagVideos()
    }, 500))
  },
  methods: {
    _isTouchBottom(scrollHeight, scrollTop) {
      const mvLines = Math.ceil(this.mvs.length / 4)
      const mvH = 201
      const mvTotalH = mvH * mvLines
      const otherH = 104
      const currentHeight = this.$utils.toCurrentPx(otherH + mvTotalH)
      if (scrollHeight + scrollTop + 20 >= currentHeight) {
        console.log('去拿数据吧')
        return true
      } 
      return false
    },
    _initData() {
      this.idMap = {}
      this.mvs = []
      this._getTagVideos()
      this._getTagVideos()
    },
    _switchType(item) {
      if (item.id === this.currentTag.id) return
      this.currentTag = item
      this._initData()
    },
    async _getVideoTagList() {
      let { data } = await getVideoTagList()
      this.currentTag = data[2]
      this.defaultTags = data.slice(2, 10)
      this.tags = data
      this._initData()
    },
    async _getTagVideos() {
      let { datas } = await getTagVideos({ id: this.currentTag.id, time: new Date().getTime() })
      datas = datas.filter(v => v.type === 1 || v.type === 2)
      datas = datas.filter(v => {
        const id = v.type == 1 ? v.data.vid : v.data.id
        return !this.idMap[id]
      })
      datas.forEach(v => {
        const id = v.type == 1 ? v.data.vid : v.data.id
        this.idMap[id] = !0
      })
      const mvs = datas.map(v => {
        const mode = v.type == 2 ? 'mv' : 'video'
        if (v.type == 1) {
          const {
            title,
            coverUrl,
            vid: id,
            durationms,
            playTime,
            description,
          } = v.data
          let artistName = v.data.creator.nickname
          return {
            title,
            coverUrl,
            id,
            durationms,
            playTime,
            description,
            artistName,
            mode
          }
        } else {
          const {
            name: title,
            coverUrl,
            id,
            duration: durationms,
            playCount: playTime,
            description,
          } = v.data
          let artistName = v.data.artists[0].name
          return {
            title,
            coverUrl,
            id,
            durationms,
            playTime,
            description,
            artistName,
            mode
          }
        }
      })
      this.mvs = this.mvs.concat(mvs)
      if (this.mvs.length < 16) this._getTagVideos()
    }
  },
  components: {},
  computed: {},
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.videos-wrap{
  width: 100%;
  padding-top: 40px;
  // box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 15px;
  // min-width: 1040px;;
  .w-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1040px;
    padding-right: 30px;
    box-sizing: border-box;
    margin: 0 auto 30px;
    height: 32px;
    .t-left{
      display: flex;
      align-items: center;
      border: 1px solid #666;
      justify-content: center;
      font-size: $font-size-medium-sm;
      color: $grey;
      height: 30px;
      border-radius: 15px;
      min-width: 100px;
      padding: 0 20px;
      &:hover{
        background: #2b2b2b;
      }
      i{
        color: $grey;
        margin-left: 4px;
      }
    }
    .t-right{
      .r-item{
        margin-right: 20px;
        font-size: $font-size-sm;
        color: $grey;
        &.active{
          color: $red;
        } 
        &:hover{
          color: #fff;
        }
        &:nth-last-child(1) {
          margin-right: 0;
        }
      }
    }
  }
  .w-list{
    display: flex;
    margin: 0 auto;
    width: 1040px;
    flex-wrap: wrap;
  }
}
</style>