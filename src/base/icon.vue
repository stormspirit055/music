<script>
import { toRem } from '@/utils/rem'
export default {
  name: 'Icon',
  props: {
    size: {
      type: Number,
      default: 16
    },
    type: {
      type: String,
      required: true
    },
    color: {
      type: String
    }
  },
  data () {
    return {
    };
  },
  render(h) {
    const Icon = (<i class={this.getIconClass()}  style={this.getIconStyle()} />)
    return Icon
  },
  methods: {
    getIconClass() {
      let iconClass = 'iconfont icon-' + this.type
      return iconClass
    },
    getIconStyle() {
      let iconStyle = `font-size: ${toRem(this.size)};`
      console.log(this.size)
      if (this.size < 12) {
        let radio = this.size / 12
        iconStyle += `transform: scale(${radio})`
      }
      if (this.color) {
        iconStyle += `color: ${this.color}`
      }
      console.log(iconStyle)
      return iconStyle
    }
  }
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
</style>