import Layer from '../layer'
import Loader from '../components/loader.vue'

const identifiers = {};
let close = null;

/**
 * @method
 * @desc lock the screen with a loader
 * @param {string} identifier
 */
function lock(identifier) {
  if (identifier) {
    identifiers[identifier] = 1
  }
  if (!close) {
    close = Layer.open(Loader, {
      name: 'lock-layer'
    })
  }
}

/**
 * @method
 * @desc unlock the screen if there has no more identifiers
 * @param {string} identifier
 */
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