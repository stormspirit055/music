<template>
  <div class='songsheet-header-wrap'>
    <img class='w-cover' v-lazy='$utils.generateImgurl(headInfo.coverImgUrl, 200)' />
    <div class="w-info">
      <div class="i-name">
        <div class="n-tag">歌单</div>
        <span class="n-name">{{headInfo.name}}</span>
      </div>
      <div class="i-creator">
        <img class='c-avatar' v-lazy='$utils.generateImgurl(headInfo.avatarUrl, 25)'>
        <span class='c-name'>{{headInfo.nickname}}</span>
        <span class="c-time">{{$formatDate(headInfo.createTime)}}创建</span>
      </div>
      <div class="i-btn" @click='_handlePlayAll'>
        <Icon type='bofang1' />
        播放全部
      </div>
      <div class="i-detail">
        <div>
          歌曲数: {{headInfo.songCount}}
        </div>
        <div>
          播放数: {{headInfo.playCount}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sheetHeader',
  props: ['headInfo'],
  data () {
    return {
    };
  },

  mounted(){},
  methods: {
    _handlePlayAll() {

      this.$bus.emit('PLAY_ALL', this.headInfo.id)
    }
  },
  components: {},
  computed: {},
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.songsheet-header-wrap{
  padding: 12px 0 0 30px;
  box-sizing: border-box;
  display: flex;
  .w-cover{
    border-radius: 10px;
    margin-right: 30px;
    width: 200px;
    height: 200px;
  }
  .w-info{
    padding-top: 8px;
    .i-name{
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .n-tag{
        width: 40px;
        height: 20px;
        line-height: 20px;
        font-size: $font-size-medium-sm;
        border: 1px solid $red;
        color: $red;
        text-align: center;
        border-radius: 4px;
        margin-right: 10px;
      }
      .n-name{
        color: $grey;
        font-size: $font-size-title-sm;
        font-weight: 400;
      }
    }
    .i-creator{
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .c-avatar{
        @include round(25px);
        margin-right: 10px;
      }
      .c-name{
        color: $blue;
        margin-right: 10px;
        font-size: $font-size-sm;
      }
      .c-time{
        font-size: $font-size-sm;
        color: $grey;
      }
    }
    .i-btn{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      cursor: pointer;
      i{
        color: #fff;
        margin-right: 5px;
      }
      font-size: $font-size-medium-sm;
      color: #fff;
      background: $red;
      width: 120px;
      height: 30px;
      border-radius: 15px;
      font-weight: 300;
    }
    .i-detail{
      display: flex;
      color: $grey;
      font-size: $font-size-sm;
      font-weight: 300;
      &>div{
        margin-right: 20px;
      }
    }
  }
}
</style>