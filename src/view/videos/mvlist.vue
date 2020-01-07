<template>
  <div class='mvlist' ref='wrap'>
    <div class="l-filter">
      <div class="f-line" v-for='(item, index) in filterList' :key='index'>
        <div class="l-title">{{item.title}}:</div>
        <ul class="l-tabs">
          <li class="tab" v-for='(tab, index) in item.tabs' @click='_handleChoose(item.type, tab)' :class='{active: getActive(item.type) === tab}'  :key='index'>{{tab}}</li>
        </ul>
      </div>
    </div>
    <div class="l-list">
      <Mvitem v-for='(item, index) in mvs' :key="index" :item='item' />
    </div>
  </div>
</template>

<script>
import { getAllMv } from '@/api'
import { throttle } from 'lodash-es'
export default {
  data () {
    const filterList = [
        { 
          type: 'area',
          title: '地区',
          tabs: ['全部', '内地', '港台', '欧美', '韩国', '日本']
        }, {
          type: 'type',
          title: '类型',
          tabs: ['全部', '官方版', '原生', '现场版', '网易出品']
        }, {
          type: 'order',
          title: '排序',
          tabs: ['上升最快', '最热', '最新']
        }
      ]
    return {
      currentarea: filterList[0].tabs[0],
      currenttype: filterList[1].tabs[0],
      currentorder: filterList[2].tabs[0],
      filterList,
      mvs: [],
      pageNum: 1,
    };
  },

  mounted(){
    this._getAllMv()
    this._initScroll()
  },
  methods: {
    _isTouchBottom(scrollHeight, scrollTop) {
      const mvLines = Math.ceil(this.mvs.length / 4)
      const mvH = 201
      const mvTotalH = mvH * mvLines
      const otherH = 115
      const currentHeight = this.$utils.toCurrentPx(otherH + mvTotalH)
      if (scrollHeight + scrollTop + 20 >= currentHeight) {
        console.log('去拿数据吧')
        return true
      } 
      return false
    },
    _initScroll() {
      let wrap = this.$refs.wrap
      const scrollHeight = wrap.scrollHeight
      const wrapHeight = wrap.getBoundingClientRect().height
      wrap.addEventListener('scroll', throttle(() => {
        if (this._isTouchBottom(scrollHeight, wrap.scrollTop)) {
          this.pageNum++
          this._getAllMv()
        }
      }, 500))
    },
    async _getAllMv() {
      const params = {
        type: this.currenttype,
        order: this.currentorder,
        area: this.currentarea,
        offset: (this.pageNum - 1) * 30
      }
      const { data } = await getAllMv(params)
      this.mvs = this.mvs.concat(this._generateMv(data))
    },  
    _generateMv(data) {
      return data.map(v => {
        const {
          name: title,
          cover: coverUrl,
          id,
          duration: durationms,
          playCount: playTime,
          artistName
        } = v
        const mode = 'mv'
        return {
          title,
          coverUrl,
          id,
          durationms,
          playTime,
          artistName,
          mode
        }
      })
    },
    getActive(type) {
      return this[`current${type}`]
    },
    _handleChoose(type, tab) {
      if (tab === this[`current${type}`]) return
      this.mvs = []
      this.pageNum = 1
      this[`current${type}`] = tab
      this._getAllMv()
    }
  },
  components: {},
  computed: {},
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.mvlist{
width: 100%;
display: flex;
flex-direction: column;
padding-top: 20px;
align-items: center;
height: 100%;
overflow-y: auto;
  .l-filter{
    width: 1000px; 
    margin-bottom: 20px;
    .f-line{
      display: flex;
      align-items: center;
      font-size: $font-size-medium-sm;
      margin-bottom: 10px;
      .l-title{
        color: $font-normal-color;
        margin-right: 10px;
      }
      .l-tabs{
        display: flex;
        align-items: center;
        .tab{
          color: $grey;
          width: 76px;
          height: 15px;
          line-height: 15px;
          text-align: center;
          cursor: pointer;
          border-right: 1px solid #666;
          &.active{
            color: $red;
          }
        }
      }
    }
  }
  .l-list{
    width: 1040px;
    display: flex;
    flex-wrap: wrap;
  }
}
</style>