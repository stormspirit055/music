<template>
  <div class="user-wrap">
    <div class='w-box' @click='_handleTriggerLogin' v-if='!isLogin'>
      <Icon type='morentouxiang' :size='40' />
      <div class="b-name">点击登录</div>
      <Icon type='right' :size='10' />
    </div>
    <div class='w-box'  @mouseenter="infoVisible = !0" @mouseleave="infoVisible = !1"  v-else>
      <img :src="getUser.avatarUrl" alt="" class="b-avatar">
      <div class="b-name">{{getUser.nickname}}</div>
      <Icon type='right' :size='10' />
      <div class="w-detail" v-if='infoVisible'>
        <div class="d-line">
          <div class="l-item">
            <div class="i-num">{{getUser.eventCount}}</div>
            <div class="i-text">动态</div>
          </div>
          <div class="l-item">
            <div class="i-num">{{getUser.follows}}</div>
            <div class="i-text">关注</div>
          </div>
          <div class="l-item">
            <div class="i-num">{{getUser.followeds}}</div>
            <div class="i-text">粉丝</div>
          </div>
        </div>
        <div class="d-logout" @click='_handleLogout'>退出登录</div>
      </div>
    </div>
    <el-dialog
      title="登录"
      :visible.sync="isShowLogin"
      :width="$utils.toRem(300)"
      :before-close="handleClose">
      <el-input class='el-input-login'  placeholder="请输入账号" v-model="phone">
      </el-input>
      <el-input class='el-input-login' type='password'  placeholder="请输入密码" v-model="password">
      </el-input>
      <el-button class='login-btn' @click="_doLogin" :loading="loading">登 录</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from '@/store/helper/user'
import { login, getUserDetail } from '@/api'
import { confirm } from '@/base/confirm'
import storage from 'good-storage'
export default {
  data () {
    return {
      password: '',
      phone: '',
      isVaild: !1,
      loading: !1,
      infoVisible: !1
    };
  },
  components: {},
  computed: {
    ...mapGetters([
      'getUser', ,
      'isLogin'
    ]),
    ...mapState(['isShowLogin'])
  },
  created() {
    const uid = storage.get('U_ID')
    uid && this.getUserDetail(uid)
  },
  mounted(){
  },
  methods: {
    ...mapActions([
      'getUserDetail',
      'logout',
    ]),
    ...mapMutations(['setLoginState']),
    _handleTriggerLogin() {
      this.setLoginState(true)
    },
    handleClose() {
      this.setLoginState(false)
    },
    _doLogin() {
      this.loading = !0
      login({phone: this.phone, password: this.password}).then(res => {
        storage.set('U_ID', res.account.id)
        this.getUserDetail(res.account.id) && this.handleClose()
      }).finally(() => { 
        this.loading = !1
      })
      // storage.set('U_ID', this.account)
      // this.getUserDetail(this.account) && this.handleClose()
    },
    _handleLogout() {
      confirm('确定注销账号?', () => {
        this.logout()
        this.infoVisible = !1
        this.$router.push('/')
      })
    }
  },
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.user-wrap{
  position: relative;
  padding-left: 10px;
  cursor: pointer;
  ul{
    li{
      margin-bottom: 5px;
    }
  }
  .login-btn{
    margin-top: 10px;
    width: 100%;
  }
  .w-box{
    display: flex;
    align-items: center;
    .b-avatar{
      @include round(40px);
    }
    .b-name{
      width: 80px;
      @include limit-line(1);
      @include text-vertical-center($font-size-medium);
      margin: 0 0px 0 10px;
      color: $font-normal-color;
      font-weight: 500;
    }
    .w-detail{
      position: fixed;
      left: 170px;
      top: calc(#{$layout-header-height} + 10px);
      background: #2f2f2f;
      border-radius: 6px;
      width: 320px;
      height: 150px;
      padding: 25px 0 15px 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      z-index: $userdetail-index;
      .d-line{
        display: flex;
        position: relative;
        justify-content: center;
        .l-item{
          width: 90px;
          height: 55px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          &:nth-child(2){
            border-left: 1px solid #444;
            border-right: 1px solid #444;
          }
          .i-num{
            color: #b6b6b6;
            font-weight: 700;
            @include text-vertical-center(26px);
          }
          .i-text{
            color: $grey;
            font-size:  $font-size;
          }
        }
      }
      .d-logout{
        width: 150px;
        border: 1px solid $grey;
        font-size: $font-size;
        color: $font-normal-color;
        border-radius: 4px;
        text-align: center;
        line-height: 30px;
        height: 30px;
      }
    }
  }
  
}
</style>