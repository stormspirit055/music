 -->
<template>
  <div class='albumlist-wrap'>
    <div class="w-item">

    </div>
  </div>
</template>
<script>
import { getTopAlbum } from '@/api'
export default {
  data () {
    return {
      total: 0,
      pageNum: 1,
      pageSize: 30
    };
  },
  mounted(){
    this._handlePageChange()
  },
  methods: {
    async _handlePageChange() {
      const { albums } = await getTopAlbum({offset: (this.pageNum - 1) * this.pageSize, limit: this.pageSize})
      
    }
  },
  components: {},
  computed: {},
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.albumlist-wrap{
  width: 100%;
}
</style>