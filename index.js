import KeepBack from './components/keep-back'
import Notify from './components/notify.vue'
import Toast from './components/toast.vue'

function install(Vue) {
  Vue.component('KeepBack', KeepBack);

  const notify = new (Vue.extend(Notify))().$mount();
  document.body.appendChild(notify.$el);
  Vue.prototype.$notify = notify.$notify;
  Vue.prototype.$notifySuccess = notify.$notifySuccess;
  Vue.prototype.$notifyError = notify.$notifyError;

  const toast = new (Vue.extend(Toast))().$mount();
  document.body.appendChild(toast.$el);
  Vue.prototype.$toast = toast.$toast;
}

export default {install}