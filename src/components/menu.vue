<!--  -->
<template>
  <div class='menu-wrap'>
    <div>{{message}}</div>
  </div>
</template>

<script>
import {search, login} from '@/api'
export default {
  data () {
    return {
      message: '这是m222e222nu页'
    };
  },

  components: {},

  computed: {},
  
  mounted(){
    search().then(res => {
      console.log(res)
    }, e => console.error(e))
    this._handleLogin()
  },

  methods: {
    _handleLogin() {
      login({phone: 18368493566, password: '64302028'}).then(res => {
        console.log(res)
      }, e => console.error(e))
    }
  }
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.menu-wrap{
  color: $blue;
  font-size: 48px;
}
</style>