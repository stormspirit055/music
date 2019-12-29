<template>
  <div class='simiuser-wrap'>
    <img lazy class="w-img"  :src='$utils.generateImgurl(info.avatarUrl, 50)' />
    <div class="w-info">
      <div class="i-name">
        {{info.nickname}}
        <Icon v-if='info.gender === 1' class='nv' type='nv' />
        <Icon v-else type='nan' class='nan' />
      </div>
      <div class="i-singer">{{info.recommendReason}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Simiuser',
  props: ['info'],
  data () {
    return {
    };
  },

  mounted(){},
  methods: {},
  components: {},
  computed: {},
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.simiuser-wrap{
  width: 270px;
  height: 60px;
  position: relative;
  margin-left: -10px;
  padding-left: 10px;
  background: #262626;
  border-radius: 6px;
  display: flex;
  align-items: center;
  .w-img{
    @include flex-center();
    @include round(50px);
    position: relative;
    margin-right: 10px;
    .img{
      width: 100%;
      height: 100%;
      border-radius: 6px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .w-info{
    height: 36px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .i-name{
      color: $font-normal-color;
      @include text-vertical-center($font-size);
      margin-bottom: 10px;
      i{
        margin-left: 4px;
      }
      .nan{
        color: #1296db !important;
      }
      .nv{
        color: #ff254d !important;
      }
    }
    .i-singer{
      @include text-vertical-center($font-size-medium-sm);
      color: $grey;
    }
  }
  &:hover{
    background: #333;
  }
}
</style>