<template>
  <div class='searchpage-wrap'>
    <div class='w-fixed'>
      <div class="w-title">
        <div class="t-keywords">{{$route.params.keywords}}</div>
        <div class='t-desc'>找到 {{total + ' ' + currentType['unit'] + currentType['label']}}</div>
      </div>
      <div class="w-tabs">
        <router-link  tag='div' :to='item.path' class="t-item" active-class='active' v-for='(item, index) in tabs' :key='index'>{{item.label}}</router-link>
      </div>
    </div>
    <div class="w-block" ref='block'></div>
    <div class="v-loading" v-if='isLoading' v-loading.lock="isLoading"></div>
    <div class='w-view' >
      <router-view @update='_handleUpdate'></router-view>
    </div>
  </div>
</template>

<script>
import { typeMap } from './config'
import { Loading } from 'element-ui'
export default {
  data () {
    return {
      isLoading: false,
      total: 0,
      tabs: Object.keys(typeMap).map(v => typeMap[v])
    };
  },
  mounted(){
    // Loading.service()
  },
  methods: {
    _handleUpdate(e) {
      if (e) {
        this.$refs.block.scrollIntoView({ behavior: "smooth" })
        this.isLoading = false
      } else {
        this.isLoading = true
      }
    }
  },
  components: {},
  computed: {
    keywords() {
      return this.$route.params.keywords
    },
    currentType() {
      return typeMap[this.$route.meta.type]
    },

  },
  watch: {
  }
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.searchpage-wrap{
  background: #212121;
  width: 100%;
  position: relative;
  .w-fixed{
    position: fixed;
    top: $layout-header-height;
    width: 100%;
    z-index: 2;
    background: #212121;
    padding-top: 18px;
    .w-title{
      display: flex;
      padding-left: 30px;
      align-items: flex-end;
      margin-bottom: 20px;
      height: 24px;
      .t-keywords{
        font-size: $font-size-title-sm;
        font-weight: 500;
        color: $grey; 
        margin-right: 6px;
      }
      .t-desc{
        margin-bottom: 3px;
        font-weight: 300;
        font-size: $font-size-sm;
        color: $font-normal-color;
      }
    }
    .w-tabs{
      display: flex;
      height: 40px;;
      align-items: center;
      padding-left: 30px;
      position: relative;
      .t-item{
        font-size: $font-size;
        margin-right: 30px;
        color: $grey; 
        cursor: pointer;
        &.active{
          color: #fff !important;
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
  .w-block{
    height: 102px;
    position: relative;
  }
  .v-loading{
    position: fixed;
    margin: 0;
    height: calc(100vh -  #{$layout-header-height} - 102px  - #{$mini-player-height});
    width: calc(100vw -  #{$menu-side-width});
    left: $menu-side-width;
    z-index: 9999 !important;
  }
  .w-view{
    position: relative;
    height: 100%;
  }
}
</style>