import KeepBack from './components/keep-back'
import Toast from './components/toast.vue'

function install(Vue) {
  Vue.component('KeepBack', KeepBack);

  const toast = new (Vue.extend(Toast))().$mount();
  document.body.appendChild(toast.$el);
  Vue.prototype.$toast = toast.$toast;
}

export default {install}