import './style.css'
import ScrollDetector from './scroll-detector/scroll-detector'
import Layer from './layer'
import Lock from './lock'
import Toast from './toast'
import GestureDetector from './components/gesture-detector.vue'
import ModalDialog from './components/modal-dialog.vue'
import Indicator from './components/indicator.vue'
import Loader from './components/loader.vue'
import SlideView from './components/slide-view'
import ScrollView from './components/scroll-view'
import ViewPager from './components/view-pager.vue'
import Wheel from './components/wheel.vue'
import ScrollEnd from './scroll-end' // TODO remove in 1.0.0
import PageEnd from './page-end' // TODO remove in 1.0.0
import * as uriUtil from './util/uri'
import * as uuidUtil from './util/uuid'
import * as dateUtil from './util/date'
import * as stringUtil from './util/string'
import * as validateUtil from './util/validate'

function install(Vue) {
  // plugin
  Vue.use(Layer);
  Vue.use(Lock);
  Vue.use(Toast);
  // component
  Vue.component('GestureDetector', GestureDetector);
  Vue.component('ModalDialog', ModalDialog);
  Vue.component('Indicator', Indicator);
  Vue.component('Loader', Loader);
  Vue.component('SlideView', SlideView);
  Vue.component('ScrollView', ScrollView);
  Vue.component('ViewPager', ViewPager);
  Vue.component('Wheel', Wheel);
  // directive
  Vue.directive('scroll', ScrollEnd);
  // filter
  Vue.filter('date', dateUtil.formatDate);
}

export default install

export const Util = {
  ...uriUtil,
  ...uuidUtil,
  ...dateUtil,
  ...stringUtil,
  ...validateUtil
};

export {
  ScrollDetector,
  Layer,
  Lock,
  Toast,
  GestureDetector,
  ModalDialog,
  Indicator,
  Loader,
  SlideView,
  ScrollView,
  ViewPager,
  Wheel,
  ScrollEnd,
  PageEnd,
  install
};