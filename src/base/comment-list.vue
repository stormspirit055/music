<template>
  <div class='comment-list-wrap' v-if='comments.length'>
    <div class="w-item"  v-for='(item, index) in comments' :key='index'>
      <img  class='i-avatar'  v-lazy='$utils.generateImgurl(item.user.avatarUrl, 35)' />
      <div class="i-info">
        <p class="i-top">
          <span class="t-name">{{item.user.nickname}}: </span>
          <span class="t-content">{{item.content}}</span>
        </p>
        <p class="i-reply" v-if='item.beReplied.content'>
          <span class="t-name">@{{item.beReplied.user.nickname}}: </span>
          <span class="t-content">{{item.beReplied.content}}</span>
        </p>
        <div class="i-bottom">
          <div class="b-time">{{$formatDate(item.time, 'YYYY-MM-DD HH:mm')}}</div>
          <div class="b-like">
            <Icon type='dianzan' :class='{active: item.liked}' :size='12' />
            {{item.likedCount}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Commentlist',
  props: ['comments'],
  data () {
    return {
    };
  },

  mounted(){},
  methods: {},
  components: {},
  computed: {}
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.comment-list-wrap{
  .w-item{
    display: flex;
    align-items: flex-start;
    position: relative;
    margin-top: 20px;
    .i-avatar{
      @include round(35px);
      margin-right: 15px;
    }
    .i-info{
      flex: 1;
      padding-bottom: 20px;
      // border-bottom: 0.5px solid #666;
      position: relative;
      .i-top{
        font-size: $font-size-medium-sm;
        margin-bottom: 10px;
        line-height: 1.3;
        .t-name{
          color: $blue;
        }
        .t-content{
          color: $font-normal-color;
        }
      }
      .i-reply{
        border-radius: 4px;
        background-color: #2a2a2a;
        font-size: $font-size-medium-sm;
        margin-bottom: 10px;
        line-height: 1.3;
        padding: 8px;
        .t-name{
          color: $blue;
        }
        .t-content{
          color: $grey;
        }
      }
      .i-bottom{
        display: flex;
        justify-content: space-between;
        color: $grey;
        .b-time{
          font-size: $font-size-medium-sm;
        }
        .b-like{
          display: flex;
          align-items: center;
          .active{
            color: $red;
          }
          i{
            color: $grey;
            margin-right: 4px;
          }
        }
      }
      &:after{
        position: absolute;
        content: " ";
        height: 1px;
        width: 100%;
        left: 0;
        bottom: 0;
        background-color: #666;
        transform: scaleY(.5);
      }
    }
  }
}
</style>