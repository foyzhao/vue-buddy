import Layer from '../layer'
import Toast from './toast.vue'

/**
 * @method
 * @desc show message for while
 * @param {component|string} component
 * @param {object|number} options
 * @return {Promise} will be resolved when message disappear
 */
function toast(component, options) {

  if (options && typeof options !== 'object') {
    options = {
      time: options
    }
  }

  options = Object.assign({
    name: 'popup-layer',
    gravity: 'golden',
    time: 2000
  }, options);

  if (typeof component === 'string') {
    options.props = {
      message: component
    };
    component = Toast
  }

  return new Promise(resolve => {
    const close = Layer.open(component, options);
    setTimeout(() => {
      close();
      resolve()
    }, options.time)
  })
}

toast.install = function install(Vue) {
  Vue.prototype.$toast = toast
};

export default toast