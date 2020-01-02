
<template>
  <span>
    <!-- <span v-for='(item, index) in filterText' :key='index' :data-aftertext='index == filterText.length - 1 || (index != filterText.length - 1 && filterText[index + 1].type == "active" )? "" : filterText[index + 1].text' :data-beforetext='index == 0 || (index !=0 &&filterText[index - 1].type == "active" )  ? "" : filterText[index - 1].text'>s</span> -->
    <span v-for='(item, index) in filterText' :key='index' :style='{color: item.type == "active" ? active : "" }'>{{item.text}}</span>
    <!-- <span data-beforetext='hhh' data-aftertext='hhh'>{{str}}</span>   -->
  </span>
</template>
<script>
export default {
  name: 'Highlight',
  props: {
    keywords: {
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    active: {
      default: '#517eaf',
      type: String
    }
  },
  computed: {
    filterText(){
      if (!this.keywords) return [{
        type: 'normal',
        text: this.text
      }]
      const normalTextArr = this.text.split(this.keywords)
      const filterArr = []
      normalTextArr.forEach((v, index) => {
        filterArr.push({
            type: 'normal',
            text: v
          })
        if (index != normalTextArr.length - 1) {
          filterArr.push({
            type: 'active',
            text: this.keywords
          })
        } 
      })
      return filterArr
    }
  },
  
}
</script>
<style lang='scss' rel='stylesheet/scss' scoped>
span{
  // &::after{
  //   content: attr(data-aftertext);
  // }
  // &::before{
  //   content: attr(data-beforetext);
  // }
}
</style>