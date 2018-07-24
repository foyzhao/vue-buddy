import KeepBack from './components/keep-back'
import ViewPager from './components/view-pager.vue'
import Indicator from './components/indicator.vue'
import Wheel from './components/wheel.vue'
import Notify from './plugins/notify'
import Toast from './plugins/toast'
import PageEnd from './mixins/page-end'
import {dateFormatter, dateTimeFormatter, timeFormatter} from './filters/date'

function install(Vue) {
  Vue.component('KeepBack', KeepBack);
  Vue.component('ViewPager', ViewPager);
  Vue.component('Indicator', Indicator);
  Vue.component('Wheel', Wheel);
  Vue.use(Notify);
  Vue.use(Toast);
  Vue.filter('date', dateFormatter);
  Vue.filter('time', timeFormatter);
  Vue.filter('datetime', dateTimeFormatter);
}

export {
  Notify,
  Toast,
  PageEnd,
  install as default
}