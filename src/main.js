import './style/base.css'
import NotifyPlugin from './plugins/notify'
import ToastPlugin from './plugins/toast'
import PageEndMixin from './mixins/page-end'
import DialogBoxComponent from './components/dialog-box.vue'
import IndicatorComponent from './components/indicator.vue'
import KeepBackComponent from './components/keep-back.vue'
import LayerComponent from './components/layer.vue'
import ViewPagerComponent from './components/view-pager.vue'
import WheelComponent from './components/wheel.vue'
import ScrollDirective from './directives/scroll'
import * as dateUtil from './util/date'
import * as uriUtil from './util/uri'
import * as uuidUtil from './util/uuid'
import * as validateUtil from './util/validate'

function install(Vue) {
  // plugin
  Vue.use(NotifyPlugin);
  Vue.use(ToastPlugin);
  // component
  Vue.component('DialogBox', DialogBoxComponent);
  Vue.component('Indicator', IndicatorComponent);
  Vue.component('KeepBack', KeepBackComponent);
  Vue.component('Layer', LayerComponent);
  Vue.component('ViewPager', ViewPagerComponent);
  Vue.component('Wheel', WheelComponent);
  // directive
  Vue.directive('scroll', ScrollDirective);
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
  NotifyPlugin,
  ToastPlugin,
  PageEndMixin,
  DialogBoxComponent,
  IndicatorComponent,
  KeepBackComponent,
  LayerComponent,
  ViewPagerComponent,
  WheelComponent,
  ScrollDirective,
  install
};