import Notify from '../components/notify.vue'

function install(Vue) {
  const notify = new Vue({
    extends: Notify,
    mounted() {
      document.body.appendChild(this.$el);
    }
  }).$mount();
  Vue.prototype.$notify = notify.$notify;
  Vue.prototype.$notifySuccess = notify.$notifySuccess;
  Vue.prototype.$notifyError = notify.$notifyError;
}

export default {install}