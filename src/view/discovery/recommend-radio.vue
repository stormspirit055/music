<template>
  <div class='recommend-radio-wrap'>
    <div class="w-title">
      主播电台
      <Icon type='iconfontyoujiantou-copy-copy-copy-copy-copy' :size='14' />
    </div>
    <div class="w-list">
      <div class="l-item" v-for='(item, index) in radioList' :key='index'>
        <img class="i-left" v-lazy='$utils.generateImgurl(item.picUrl, 90)' />
        <div class="i-right">
          <div class="r-name">{{item.name}}</div>
          <div class="r-artists">
            {{item.program.dj.brand}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommendRadio } from '@/api'
export default {
  data () {
    return {
      radioList: [
        {
          program: {
            dj: {}
          }
        }
      ]
    };
  },

  async created(){
    let { result } = await getRecommendRadio()
    this.radioList = result
  },
  methods: {},
  components: {},
  computed: {},
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.recommend-radio-wrap{
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
    flex-wrap: wrap;
    .l-item{
      width: calc(50% - 15px);
      height: 120px;
      border-radius: 4px;
      padding-left: 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover{
        background: #2e2e2e;
      }
      &.active{
        background: #2e2e2e;
      }
      .i-left{
        margin-right: 8px;
        width: 90px;
        height: 90px;
        border-radius: 4px;
      }
      .i-right{
        height: 60px;
        padding-top: 12px;
        box-sizing: border-box;
        .r-name{
          color: $grey;
          font-size: $font-size;
          margin-bottom: 10px;
        }
        .r-artists{
          font-size: $font-size-sm;
          color: $font-normal-color;
        }
      }
    }
  }
}
</style>