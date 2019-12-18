<!--  -->
<template>
  <div>
    这是发现页
    <i class="iconfont icon-color-blue" :class='"icon-" + type'></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 'main_girl'
    };
  },

  components: {},

  computed: {},

  mounted(){},

  methods: {}
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.icon-color-blue{
  color: $red;
}
</style>