import IndicatorComponent from './components/indicator.vue'
import KeepBackComponent from './components/keep-back.vue'
import ViewPagerComponent from './components/view-pager.vue'
import WheelComponent from './components/wheel.vue'
import NotifyPlugin from './plugins/notify'
import ToastPlugin from './plugins/toast'
import PageEndMixin from './mixins/page-end'
import * as dateUtil from './util/date'
import * as uriUtil from './util/uri'
import * as uuidUtil from './util/uuid'
import * as validateUtil from './util/validate'

function install(Vue) {
  // component
  Vue.component('Indicator', IndicatorComponent);
  Vue.component('KeepBack', KeepBackComponent);
  Vue.component('ViewPager', ViewPagerComponent);
  Vue.component('Wheel', WheelComponent);
  // plugin
  Vue.use(NotifyPlugin);
  Vue.use(ToastPlugin);
  // filter
  Vue.filter('date', dateUtil.formatDate);
}

export default install

export const Util = {
  ...dateUtil,
  ...uriUtil,
  ...uuidUtil,
  ...validateUtil
};

export {
  IndicatorComponent,
  KeepBackComponent,
  ViewPagerComponent,
  WheelComponent,
  NotifyPlugin,
  ToastPlugin,
  PageEndMixin,
  install
};