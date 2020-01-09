import { 
  Button,
  Input,
  Dialog,
  Loading,
  Carousel,
  CarouselItem,
  Image,
  Table,
  TableColumn
} from 'element-ui';
import * as utils from '@/utils'
import VueLazyload from "vue-lazyload"
export const EMPTY_IMG =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
export default {
  install(Vue) {
    const requireComponent = require.context(
      "@/base",
      true,
      /[a-z0-9]+\.(jsx?|vue)$/i,
    )
    requireComponent.keys().forEach(fileName => {
      const componentConfig = requireComponent(fileName)
      const componentName = componentConfig.default.name
      if (componentName) {
        Vue.component(componentName, componentConfig.default || componentConfig)
      }
    })
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(Dialog)
    Vue.use(Loading)
    Vue.use(Carousel)
    Vue.use(CarouselItem)
    Vue.use(Image)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.prototype.$ELEMENT = { size: "small" }
    Vue.prototype.$utils = utils
    Vue.prototype.$formatDate = formatDate
    Vue.use(VueLazyload, {
      loading: EMPTY_IMG,
      error: EMPTY_IMG,
    })
  },
}
 function formatDate (date, format = 'yyyy-MM-DD hh:mm:ss') {
   if (!date) return ''
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, new Date(date).getFullYear())
  }
  let o = {
    'M+': new Date(date).getMonth() + 1,
    'D+': new Date(date).getDate(),
    'h+': new Date(date).getHours(),
    'm+': new Date(date).getMinutes(),
    's+': new Date(date).getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      let str = o[k] + ''
      format = format.replace(RegExp.$1, RegExp.$1.length > str.length ? padLeftZero(str) : str)
    }
  }
  return format
}
// 对于月、天、时、分、秒不够两位的在左侧补充0
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
};