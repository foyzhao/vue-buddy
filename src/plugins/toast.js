import ToastComponent from '../components/toast.vue'

function install(Vue) {
  const toast = new Vue({
    extends: ToastComponent,
    mounted() {
      document.body.appendChild(this.$el)
    }
  }).$mount();
  Vue.prototype.$toast = toast.$toast
}

export default install