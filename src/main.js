import './style/base.css'
import Launcher from './plugins/launcher'
import Lock from './plugins/lock'
import Toast from './plugins/toast'
import PageEndMixin from './mixins/page-end'
import DialogBoxComponent from './components/dialog-box.vue'
import IndicatorComponent from './components/indicator.vue'
import KeepBackComponent from './components/keep-back.vue'
import LayerComponent from './components/layer.vue'
import LoaderComponent from './components/loader.vue'
import ViewPagerComponent from './components/view-pager.vue'
import WheelComponent from './components/wheel.vue'
import ScrollDirective from './directives/scroll'
import * as dateUtil from './util/date'
import * as uriUtil from './util/uri'
import * as uuidUtil from './util/uuid'
import * as validateUtil from './util/validate'

function install(Vue) {
  // plugin
  Vue.use(Launcher);
  Vue.use(Lock);
  Vue.use(Toast);
  // component
  Vue.component('DialogBox', DialogBoxComponent);
  Vue.component('Indicator', IndicatorComponent);
  Vue.component('KeepBack', KeepBackComponent);
  Vue.component('Layer', LayerComponent);
  Vue.component('Loader', LoaderComponent);
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
  Launcher,
  Lock,
  Toast,
  PageEndMixin,
  DialogBoxComponent,
  IndicatorComponent,
  KeepBackComponent,
  LayerComponent,
  LoaderComponent,
  ViewPagerComponent,
  WheelComponent,
  ScrollDirective,
  install
};