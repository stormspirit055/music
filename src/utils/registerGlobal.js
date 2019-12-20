import { 
  Button,
  Select,
  Input,
  Dialog,
  Loading,
} from 'element-ui';
import * as utils from '@/utils'
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
    Vue.prototype.$ELEMENT = { size: "small" }
    Vue.prototype.$utils = utils
  },
}