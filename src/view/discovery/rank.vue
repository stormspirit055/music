<template>
  <div class='rank-wrap'>
    <div class="w-top">
      <p class="title">官方榜</p>
      <div class="t-list">
        <router-link tag='div' :to='"/songsheet/" + item.id' class="l-item" v-for='(item, index) in officialRank' :key='index'>
          <div class="i-left">
            <img :src="$utils.generateImgurl(item.coverImgUrl, 170)" alt="" class="l-cover">
            <div class="l-desc">{{$formatDate(item.updateTime, 'MM月DD日') + '更新'}}</div>
          </div>
          <div class="i-right">
            <div class="r-item" v-for='(child, index) in item.tracks' :key='index'>
              <div class="i-name">
                <span>{{index + 1}}</span>
                <span>{{child.first}}</span>
              </div>
              <div class="i-singer">{{child.second}}</div>
            </div>
            <div class="r-go">
              查看全部
              <Icon type='iconfontyoujiantou-copy-copy-copy-copy-copy' :size='10' />
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="w-bottom">
      <p class="title">全球榜</p>
      <div class="b-list">
        <router-link tag='div' :to='"/songsheet/" + item.id' class="global-item" v-for='(item, index) in  globalRank' :key='index'>
          <div class="i-card">
            <img v-lazy="$utils.generateImgurl(item.coverImgUrl, 140)" alt="" class="c-img" />
            <Playcount :count='item.playCount' />
            <Playbtn class="c-play" />  
          </div>
          <p class="i-name">{{item.name}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { singerRank, allRank, rankDetail } from '@/api'
export default {
  name: 'Songsheet',
  data () {
    return {
      officialRank: [
        {
          tracks: []
        }
      ],
      globalRank: []
    };
  },

  mounted(){
    this._rankDetail()
  },
  methods: {
    async _rankDetail() {
      const { list } = await rankDetail()
      this.officialRank = list.slice(0, 4)
      this.globalRank = list.slice(4)
    },
    // async _singerRank(){
    //   const result = await singerRank()
    //   console.log(result)
    // },
    // async _allRank() {
    //   const result = await allRank()
    //   console.log(result)
    // }
  },
  components: {},
  computed: {},
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.rank-wrap{
  margin: 0 auto;
  background: #212121;
  padding: 20px 30px 0;
  width: $center-content-max-width;
  // min-width: $layout-content-min-width;
  .title{
    font-size: 18px;
    font-weight: 500;
    color: $grey;
    margin-bottom: 20px;
  }

  .t-list{
    .l-item{
      margin-bottom: 30px;
      display: flex;
      align-items: flex-start;
      cursor: pointer;
      height: 170px;
      .i-left{
        position: relative;
        width: 170px;
        height: 170px;
        border-radius: 6px;
        overflow: hidden;
        margin-right: 30px;
        .l-cover{
          width: 100%;
          height: 100%;
        }
        .l-desc{
          position: absolute;
          bottom: 40px;
          width: 100%;
          text-align: center;
          color: #fff;
          font-size: $font-size-medium-sm;
          font-weight: 300;
        }
      }
      .i-right{
        flex: 1;
        .r-item{
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: $font-size-sm;
          padding: 0 10px;
          font-weight: 300;
          .i-name{
            span:nth-child(1) {
              color: $red;
              margin-right: 20px;
            }
            span:nth-child(2) {
              color: #fff;
            }
          }
          .i-singer{
            color: $font-normal-color;
          }
          &:hover{
            background: #2a2a2a;
          }
          &:nth-child(2n - 1) {
            background: #212121;
          }
          &:nth-child(2n) {
            background: #252525;
          }
        }
        .r-go{
          height: 30px;
          display: flex;
          align-items: center;
          color: $grey;
          font-size: $font-size-medium-sm;
          padding-left: 20px;
          i{
            color: $grey;
            margin-left: 6px;
          }
        }
      }
    }
  }
  .b-list{
    display: flex;
    flex-wrap: wrap;
    .global-item{
      width: 140px;
      margin-right: 20px;
      margin-bottom: 40px;
      &:nth-child(6n) {
        margin-right: 0 !important;
      }
      cursor: pointer;
      &:hover{
        .c-play{
          opacity: 1 !important;
        }
      }
      .i-card{
        position: relative;
        width: 140px;
        height: 140px;
        border-radius: 6px;
        overflow: hidden;
        .c-img{
          width: 100%;
          height: 100%;
        }
        .c-play{
          transition: all .4s;
          position: absolute;
          top: 50%;
          transform: translate3d(-50%, -50%, 0);
          left: 50%;
          opacity: 0;
        }
      }
      .i-name{
        height: 30px;
        line-height: 30px;
        font-size: $font-size-sm;
        color: $grey;
        @include limit-line(1);
      }
    }
  }
}
</style>