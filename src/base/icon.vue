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
    canBubble: {
      default: false,
      type: Boolean
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
    const Icon = (<i onClick={this._handleClick} class={this.getIconClass()}  style={this.getIconStyle()} />)
    return Icon
  },
  methods: {
    getIconClass() {
      let iconClass = 'iconfont icon-' + this.type
      if (this.color) {
        iconClass += ` ${this.color}`
      } else {
        iconClass += ' default'
      }
      return iconClass
    },
    _handleClick(e) {
      if (!this.canBubble) e.cancelBubble=true
      this.$emit('click')
    },
    getIconStyle() {
      let iconStyle = `font-size: ${toRem(this.size)};`
      if (this.size < 12) {
        let radio = this.size / 12
        iconStyle += `transform: scale(${radio})`
      }
      return iconStyle
    }
  }
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
.iconfont{
  &.default{
    color: #606060;
  }
  &.red{
    color: $red;
  }
}
</style>