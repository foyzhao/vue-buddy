import Layer from '../layer'
import Toast from './toast.vue'

function toast(content, time = 2000) {
  return new Promise((resolve, reject) => {
    if (content && time > 0) {
      const close = Layer.open(Toast, {content});
      setTimeout(() => {
        close();
        resolve()
      }, time)
    } else {
      reject('invalid toast content or time')
    }
  })
}

toast.install = function install(Vue) {
  Vue.prototype.$toast = toast
};

export default toast