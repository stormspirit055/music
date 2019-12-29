<template>
  <div class='recommend-mv-wrap'>
    <div class="w-title">
      推荐mv
      <Icon type='iconfontyoujiantou-copy-copy-copy-copy-copy' :size='14' />
    </div>
    <div class="w-list">
      <div class="l-item" v-for='(item, index) in mvList' :key='index'>
        <div class="i-innerwrap">
          <div class="i-desc">{{item.copywriter}}</div>
          <img class='i-img'  v-lazy='$utils.generateImgurl(item.picUrl, 220, 126)' />
          <div class="i-num" > 
            <Icon type='bofang-' :size='12' />
            {{item.playCount | countFilter}}
          </div>
          <Playbtn class='i-play' />
        </div>
        <div class="i-name">{{item.name}}</div>
        <div class="i-author">{{item.artistName}}</div>
      </div>
    </div>
  </div>
</template>
<script>

import { getRecommendMv } from '@/api'
export default {
  data () {
    return {
      mvList: []
    };
  },

  async created(){
    let { result } = await getRecommendMv()
    this.mvList = result
  },
  methods: {},
  computed: {},
  filters: {
    countFilter(v) {
      return v / 10000 > 1 ? (v / 10000).toFixed(1) + '万' : '1万'
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.recommend-mv-wrap{
  margin-bottom: 40px;
  .w-title{
    font-weight: 500;
    display: flex;
    align-items: center;
    color: $grey;
    @include text-vertical-center($font-size-lg);
    cursor: pointer;
    width: fit-content;
    margin-bottom: 20px;
    i{
      color: $grey;
      margin-left: 4px;
    }
    &:hover{
      color: #fff;
      i{
        color: #fff;
      }
    }
  }
  .w-list{
    display: flex;
    justify-content: space-between;
    .l-item{
      width: calc(25% - 12px);
      .i-innerwrap{
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        cursor: pointer;
        .i-num{
          position: absolute;
          right: 5px;
          top: 5px;
          display: flex;
          align-items: center;
          color: #fff;
          font-size: $font-size-sm;
          i{
            color: #fff;
            margin-right: 4px;
          }
        }
        &:hover{
          .i-desc{
            transform: translateY(0);  
          }
          .i-play{
            display: flex;
          }
        }
        .i-desc{
          width: 100%;
          transition: .4s all;
          position: absolute;
          transform: translateY(-100%);
          z-index: 2;
          background: rgba($color: #000, $alpha: 0.3);
          padding: 5px;
          color: #fff;
          font-size: $font-size-sm;
        }
        .i-play{
          position: absolute;
          bottom: 10px;
          right: 10px;
          display: none;
        }
        .i-img{
          border-radius: 8px;
          width: 100%;
        }
      }
      .i-name{
        padding: 4px 1px 0;
        position: relative;
        @include limit-line(1);
        height: 18px;
        color: $grey;
        font-size: $font-size-sm;
      }
      .i-author{
        padding: 0 1px 0;
        position: relative;
        @include limit-line(1);
        height: 20px;
        color: $font-normal-color;
        font-size: $font-size-xs;
      }
    }
  }
}
</style>