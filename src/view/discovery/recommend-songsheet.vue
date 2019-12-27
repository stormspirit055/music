<!--  -->
<template>
  <div class='recommend-ss-wrap'>
    <div class="w-title">
      推荐歌单
      <Icon type='iconfontyoujiantou-copy-copy-copy-copy-copy' :size='14' />
    </div>
    <!-- <Playbtn /> -->
    <div class="w-list">
      <router-link tag='div' :to='"/songsheet/" + item.id' class="l-item" v-for='(item, index) in recommendList' :key='index'>
        <div class="i-innerwrap">
          <div class="i-desc" v-if='index == 0'>{{item.desc}}</div>
          <el-image class='i-img' lazy  :src='$utils.generateImgurl(item.picUrl, 180)'></el-image>
          <div class="i-num" v-if='index != 0'> 
            <Icon type='bofang-' :size='12' />
            {{item.playcount | countFilter}}
          </div>
          <Playbtn class='i-play' />
        </div>
        <div class="i-name">{{item.name}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { getRecommendSongsheet } from '@/api'
import logo from '@/assets/logo.jpeg'
export default {
  data () {
    return {
      recommendList: []
    };
  },
  async created() {
    let defaultSheet = {
      id: 0,
      name: '每日推荐歌曲',
      picUrl: logo,
      playcount: 0,
      desc: '根据您的音乐口味生成每日更新'
    }
    const { recommend } = await getRecommendSongsheet()
    this.recommendList = recommend
    this.recommendList.splice(9)
    this.recommendList.unshift(defaultSheet)
    console.log(this.recommendList)
  },
  methods: {},
  components: {},
  computed: {},
  filters: {
    countFilter(v) {
      return v / 10000 > 1 ? (v / 10000).toFixed(1) + '万' : '1万'
    }
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.recommend-ss-wrap{
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
    flex-wrap: wrap;
    justify-content: space-between;
    .l-item{
      width: calc(20% - 12px);
      margin-bottom: 30px;
      overflow: hidden;
      &:nth-child(n + 5) {
        margin-bottom: 0;
      }
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
        height: 40px;
        @include limit-line(2);
        line-height: 1.3em;
        color: $grey;
        font-size: $font-size-sm;
      }
    }
  }
}
</style>