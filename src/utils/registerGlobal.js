import { 
  Button,
  Select,
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
import moment from 'moment'
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
    Vue.use(Select)
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
function formatDate(stmp, format = 'YYYY-MM-DD') {
  return moment(stmp).format(format)
}