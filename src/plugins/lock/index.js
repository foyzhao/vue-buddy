import Vue from 'vue'
import Lock from './lock.vue'

let vm = null;
const identifiers = {};

function lock(identifier) {
  if (identifier && typeof identifier === 'string') {
    identifiers[identifier] = 1
  }
  if (!vm) {
    vm = new Vue({
      extends: Lock,
      mounted() {
        document.body.appendChild(this.$el)
      },
      destroyed() {
        document.body.removeChild(this.$el)
      }
    }).$mount()
  }
}

function unlock(identifier) {
  if (vm) {
    if (identifier && typeof identifier === 'string') {
      delete identifiers[identifier]
    }
    if (!Object.keys(identifiers).length) {
      vm.$destroy();
      vm = null
    }
  }
}

function install(Vue) {
  Vue.prototype.$lock = lock;
  Vue.prototype.$unlock = unlock
}

export default {
  lock,
  unlock,
  install
}