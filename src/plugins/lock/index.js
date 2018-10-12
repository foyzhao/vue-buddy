import Launcher from '../launcher'
import Lock from './lock.vue'

const identifiers = {};
let shutdown = null;

function lock(identifier) {
  if (identifier && typeof identifier === 'string') {
    identifiers[identifier] = 1
  }
  if (!shutdown) {
    shutdown = Launcher.startup(Lock)
  }
}

function unlock(identifier) {
  if (shutdown) {
    if (identifier && typeof identifier === 'string') {
      delete identifiers[identifier]
    }
    if (!Object.keys(identifiers).length) {
      shutdown();
      shutdown = null
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