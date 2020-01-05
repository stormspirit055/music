<template>
  <div class='playcount-wrap'>
    <Icon type='bofang-' :size='10' />
    {{$utils.countFilter(count)}}
  </div>
</template>

<script>
export default {
  name: 'Playcount',
  props:[ 'count'],
  data () {
    return {
    };
  }
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.playcount-wrap{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #fff;
  font-size: $font-size-medium-sm;
  position: absolute;
  right: 8px;
  top: 4px;
  i{
    color: #fff !important;
    margin-right: 2px;
    margin-top: 1px;
  }
}
</style>