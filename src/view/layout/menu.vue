<template>
  <div class='menu-wrap'>
    <User />
    <div class="w-block" v-for='(menu, index) in menuListWithRoot' :key='index'>
      <p class="b-title" v-if='menu.title'>{{menu.title}}</p>
      <ul class='b-list'>
        <router-link tag='li' class="b-item" active-class='b-item-acitve' v-for='(item, index) in menu.children' :to='item.path' :key='index'>
          <Icon :type='item.meta.icon' :size='16' />
          {{item.meta.title}}
        </router-link>  
      </ul>
    </div>
  </div>
</template>

<script>
import User from '@/components/user'
import { menuRoutes } from '@/router'
import { mapGetters } from '@/store/helper/user'
export default {
  data () {
    return {
      menus: [
        {
          type: "root",
          children: menuRoutes
        }
      ]
    };
  },

  components: { User },

  computed: {
    menuListWithRoot() {
      return this.isLogin ? this.menus.concat(this.menuList) : this.menus
    },
    ...mapGetters(['menuList', 'isLogin']),
  },

  mounted(){},

  methods: {
    log(){
    }
  }
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.menu-wrap{
  background: #1d1d1d;
  padding-top: 10px;
  width: $menu-side-width;
  min-width: $menu-side-width;
  position: relative;
  height:  calc(100% - #{$mini-player-height});
  .w-block{
    margin-top: 15px;
    .b-title{
      color: $font-title-color;
      font-size: $font-size-medium-sm;
      padding-left: 18px;
      margin-bottom: 18px;
    }
   .b-item{
    display: flex;
    align-items: center;
    color: $grey;
    padding-left: 18px;  
    cursor: pointer;
    height: 34px;
    width: 190px;
    line-height: 34px;
    @include limit-line(1);
    padding-right: 10px;
    box-sizing: border-box;
    &:hover{
      background: #2a2a2a;
    }
    i{
      margin-right: 6px;
    }
   } 
   .b-item-acitve{
     color: $red !important;
     background: #2a2a2a !important;
     i{
       color: $red !important;
     }
   }
  }
}
</style>