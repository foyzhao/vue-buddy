import KeepBack from './components/keep-back'
import ViewPager from './components/view-pager.vue'
import Indicator from './components/indicator.vue'
import Notify from './plugins/notify'
import Toast from './plugins/toast'
import PageEnd from './mixins/page-end'

function install(Vue) {
  Vue.component('KeepBack', KeepBack);
  Vue.component('ViewPager', ViewPager);
  Vue.component('Indicator', Indicator);
  Vue.use(Notify);
  Vue.use(Toast);
}

export {
  Notify,
  Toast,
  PageEnd,
  install as default
}