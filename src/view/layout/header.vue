 <template>
   <div class='layoutHeader-wrap' >
     <div class="w-left" :class='{showPanel:showPlayPanel}'>
      <div class="l-macbtn">
       <div class='m-button red'>
       </div>
       <div class='m-button yellow'>
       </div>
       <div class='m-button green'>
       </div>
      </div>  
      <Icon type='shouzhanjintui'  @click='setPlayPanelState(false)' v-show='showPlayPanel' class='l-showPlayer' :size='24' />
      <div class="l-history" v-show='!showPlayPanel'>
        <Icon type='shouzhanjintui' @click='_handleBack' class='h-icon rotate active'  :size='24'  />
        <Icon type='shouzhanjintui' class='h-icon active' @click='_handleForward' :size='24' />
      </div>
     </div>
     <div class="w-right" :class='{showPanel:showPlayPanel}'>
       <div class="r-router" >
         <template v-if='!showPlayPanel'>
          <router-link tag='div' :to='item.path' class="r-item default" active-class='active' v-for='(item, index) in children' :key='index'>
            {{item.meta.title}}
          </router-link>
         </template>
       </div>
       <div class="r-search">
        <el-input
          @keyup.enter.native='_handleEnter'
          @focus="setSearchPanelState(true)"
          prefix-icon="el-icon-search"
          class='el-input-search'
          v-model="keywords">
        </el-input>
        <Searchpanel ref='search' @updatekeywords='_handleUpdate' :keywords='keywords' />
       </div>
     </div>
   </div>
 </template>
 <script>
 import Icon from '@/base/icon'
 import { mapState, mapMutations } from '@/store/helper/music'
 import { globalMapMutations } from '@/store/helper/global'
 import { noImpactNodeMap } from '@/config'
 import storage from 'good-storage'
import { menuRoutes } from '@/router'
 import Searchpanel from '@/components/searchpanel'
 export default {
  data () {
    return {
      routeHasNext: false,
      routeHasPrev: true,
      keywords: '',
      currentIndex: 0,
      doms: noImpactNodeMap['SEARCH_PANEL']
    };
  },
  components: { Icon, Searchpanel },
  mounted() {
    console.log(menuRoutes)
    console.log(this.$route.path.split('/')[1])
      // console.log(route)
  },
  computed: { 
    ...mapState(['showPlayPanel', ]),
    routerList() {
      return ['个性推荐', '歌单', '主播电台']
    },
    children() {
      const current = menuRoutes.find(v => v.path === '/' + this.$route.path.split('/')[1])
      if (current && current.children && current.children.length)  {
        console.log(current.children)
        return current.children.slice(1)
      } else {
        return []
      }
      
    }
  },
  methods: {
    ...mapMutations(['setPlayPanelState', 'setSearchPanelState']),
    ...globalMapMutations(['updateSearchHistory']),
    _handleUpdate(e) {
      this.keywords = e
    },
    async _handleEnter() {
      if (!this.keywords.trim() || this.keywords == this.$route.params.keywords) return 
      this.setSearchPanelState(!1)
      this.setPlayPanelState(false)
      this.$router.push(`/searchpage/${this.keywords}`) 
    },
    _handleBack() {
      this.$router.back()
    },
    _handleForward() {
      this.$router.forward()
    },
  },
}
 
 </script>
 <style lang='scss' rel='stylesheet/scss' scoped>
 .layoutHeader-wrap{
   position: relative;
   display: flex;
   z-index: $search-panel-z-index;
   min-width: $layout-content-min-width;
   .showPanel{
     background: #262626 !important;
   }
   .w-left{
     width: $menu-side-width;
     box-sizing: border-box;
     padding: 12px 8px 0; 
     display: flex;
     justify-content: space-between;
     background: #272727;
     height: $layout-header-height;
     .l-macbtn{
       
       display: flex;
       .m-button{
         @include round(12px);
         @include flex-center();
         margin-right: 10px;
         &.red{
           background: #ed655a;
         }
         &.green {
          background: #72be47;
        }
        &.yellow {
          background: #e0c04c;
        }
        &:nth-last-child(1){
          margin-right: 0;
        }
       }
     }
     .l-showPlayer{
       transform: rotate(90deg);
       color: #fff !important;
       margin-bottom: 20px;
       cursor: pointer;
     }
     .l-history{
       display: flex;
       width: 50px;
       align-items: center;
       justify-content: space-between;
       position: relative;
       margin-top: -4px;
       .h-icon{
        &.active{
          color: #fff !important;
          cursor: pointer;
        }
        &.rotate{
          transform: rotate(180deg);
        }
       }
       
     }
   }
   .w-right{
     flex: 1;
     background: #252525;
     display: flex;
     padding: 8px 15px 0;
     box-sizing: border-box;
     align-items: center;
     justify-content: space-between;
     .r-router{
       display: flex;
       .r-item{
         font-size: 14px;
         margin-right: 20px;
         cursor: pointer;
         &:nth-last-child(1) {
           margin-right: 0;
         }
         &.active{
           color: #eee !important;
         }
         &.default{
           color: $grey ;
         }
       }
     }
    .r-search{
    }
    
   }
 }
 </style>