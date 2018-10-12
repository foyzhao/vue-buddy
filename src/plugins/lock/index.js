import Layer from '../layer'
import Lock from './lock.vue'

const identifiers = {};
let close = null;

function lock(identifier) {
  if (identifier && typeof identifier === 'string') {
    identifiers[identifier] = 1
  }
  if (!close) {
    close = Layer.open(Lock)
  }
}

function unlock(identifier) {
  if (close) {
    if (identifier && typeof identifier === 'string') {
      delete identifiers[identifier]
    }
    if (!Object.keys(identifiers).length) {
      close();
      close = null
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