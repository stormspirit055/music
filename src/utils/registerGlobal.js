// import { 
//   Button,
//   Select,
//   Input
// } from 'element-ui';
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
    // Vue.use(Button)
    // Vue.use(Select)
    // Vue.use(Input)
    Vue.prototype.$ELEMENT = { size: "small" }
  },
}