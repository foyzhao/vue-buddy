import './style.css'
import Layer from './layer'
import Lock from './lock'
import Toast from './toast'
import ModalDialog from './components/modal-dialog.vue'
import Indicator from './components/indicator.vue'
import Loader from './components/loader.vue'
import ScrollView from './components/scroll-view.vue'
import ViewPager from './components/view-pager.vue'
import Wheel from './components/wheel.vue'
import ScrollEnd from './scroll-end'
import PageEnd from './page-end'
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
  Vue.component('ModalDialog', ModalDialog);
  Vue.component('Indicator', Indicator);
  Vue.component('Loader', Loader);
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
  Layer,
  Lock,
  Toast,
  PageEndMixin,
  ModalDialog,
  Indicator,
  Loader,
  ScrollView,
  ViewPager,
  Wheel,
  ScrollEnd,
  PageEnd,
  install
};