import Vue from 'vue'
import Toast from './toast.vue'

function toast(content, time = 2000) {
  return new Promise((resolve, reject) => {
    if (content && time > 0) {
      new Vue({
        data: {
          content
        },
        render(h) {
          if (this.content) {
            return h('transition', {
              props: {
                appear: true
              },
              on: {
                afterLeave: () => this.$destroy()
              }
            }, [
              h(Toast, {
                props: {
                  content: this.content
                }
              })
            ])
          }
        },
        created() {
          setTimeout(() => {
            this.content = null;
            resolve()
          }, time)
        },
        mounted() {
          document.body.appendChild(this.$el)
        },
        destroyed() {
          document.body.removeChild(this.$el)
        }
      }).$mount()
    } else {
      reject('invalid toast content or time')
    }
  })
}

toast.install = function install(Vue) {
  Vue.prototype.$toast = toast
};

export default toast