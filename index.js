import KeepBack from './components/keep-back'
import ViewPager from './components/view-pager.vue'
import Indicator from './components/indicator.vue'
import Notify from './plugins/notify'
import Toast from './plugins/toast'

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
  install as default
}