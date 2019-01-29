import './style.css'
import Layer from './layer'
import Lock from './lock'
import Toast from './toast'
import Loader from './components/loader.vue'
import ModalDialog from './components/modal-dialog.vue'
import ScrollView from './components/scroll-view'
import SlideView from './components/slide-view'
import ViewPager from './components/view-pager.vue'
import Wheel from './components/wheel.vue'
import WindowScrollDetector from './mixin/window-scroll-detector'
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
  Vue.component('Loader', Loader);
  Vue.component('ModalDialog', ModalDialog);
  Vue.component('ScrollView', ScrollView);
  Vue.component('SlideView', SlideView);
  Vue.component('ViewPager', ViewPager);
  Vue.component('Wheel', Wheel);
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
  Loader,
  ModalDialog,
  ScrollView,
  SlideView,
  ViewPager,
  Wheel,
  WindowScrollDetector,
  install
};