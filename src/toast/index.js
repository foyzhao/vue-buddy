import Layer from '../layer'

/**
 * @method
 * @desc show message for while
 * @param {string} message
 * @param {number} time
 * @return {Promise} will be resolved when message disappear
 */
function toast(message, time = 2000) {
  if (!message || time < 1) {
    throw 'toast: invalid params'
  }
  return new Promise(resolve => {
    const close = Layer.open({
      name: 'Toast',
      render(h) {
        return h('div', {
          'class': 'toast'
        }, message)
      }
    }, {
      style: {
        top: '50%',
        zIndex: 9999,
        background: 'none',
        pointerEvents: 'none'
      }
    });
    setTimeout(() => {
      close();
      resolve()
    }, time)
  })
}

toast.install = function install(Vue) {
  Vue.prototype.$toast = toast
};

export default toast