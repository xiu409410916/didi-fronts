import display from './display'

const install = function(Vue) {
  Vue.directive('display', display)
}

if (window.Vue) {
  window.display = display
  Vue.use(install); // eslint-disable-line
}

display.install = install
export default display