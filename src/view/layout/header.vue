 <template>
   <div class='layoutHeader-wrap'>
     <div class="w-left">
      <div class="l-macbtn">
       <div class='m-button red'>
       </div>
       <div class='m-button yellow'>
       </div>
       <div class='m-button green'>
       </div>
      </div>  
      <div class="l-history">
        <Icon type='shouzhanjintui' class='h-icon rotate' :class='routeHasPrev ? "active" : "default"' :size='24'  />
        <Icon type='shouzhanjintui' class='h-icon' :class='routeHasNext ? "active" : "default"' :size='24' />
      </div>
     </div>
     <div class="w-right">
       <div class="r-router">
          <div class="r-item" :class='currentIndex == index ? "active" : "default"' v-for='(item, index) in routerList' :key='index'>
            {{item}}
          </div>
       </div>
       <div class="r-search">
        <el-input
          prefix-icon="el-icon-search"
          class='el-input-search'
          v-model="keywords">
        </el-input>
       </div>
     </div>
     
   </div>
 </template>
 <script>
 import Icon from '@/base/icon'
 export default {
   data () {
     return {
       routeHasNext: false,
       routeHasPrev: true,
       keywords: '',
       currentIndex: 0
     };
   },
 
   components: {Icon},
 
   computed: {
     routerList() {
       return ['个性推荐', '歌单', '主播电台']
     }
   },
 
   mounted(){
     console.log(this.$route)
   },
 
   methods: {}
 }
 
 </script>
 <style lang='scss' rel='stylesheet/scss' scoped>
 .layoutHeader-wrap{
   position: relative;
   display: flex;
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
     .l-history{
       display: flex;
       width: 50px;
       align-items: center;
       justify-content: space-between;
       position: relative;
       margin-top: -4px;
       .h-icon{
        &.active{
          color: $white;
          cursor: pointer;
        }
        &.default{
          color: $grey;
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
         &:nth-last-child(1) {
           margin-right: 0;
         }
         &.active{
           color: #eee;
         }
         &.default{
           color: $grey;
         }
       }
     }
   }
 }
 </style>