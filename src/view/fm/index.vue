<template>
  <div>
    私人fm
  </div>
</template>

<script>
import { getFm } from '@/api'
export default {
  name: 'Fm',
  data () {
    return {
    };
  },

  mounted(){
    this._initData()
  },
  methods: {
    async _initData() {
      const result = await getFm()
      console.log(result)
    }
  },
  components: {},
  computed: {},
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
</style>