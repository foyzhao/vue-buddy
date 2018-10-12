import Vue from 'vue'

function startup(component, props, listeners) {
  let app = new Vue({
    data: {
      running: true
    },
    render(h) {
      if (this.running) {
        return h('transition', {
          props: {
            appear: true
          },
          on: {
            afterLeave: () => this.$destroy()
          }
        }, [
          h(component, {
            props: props,
            on: {
              shutdown() {
                app = app.running = null
              },
              ...listeners
            }
          })
        ])
      }
    },
    mounted() {
      document.body.appendChild(this.$el)
    },
    destroyed() {
      document.body.removeChild(this.$el)
    }
  }).$mount();
  return function () {
    if (app) {
      app = app.running = null
    }
  }
}

export default {
  startup,
  install(Vue) {
    Vue.prototype.$startup = startup
  }
}