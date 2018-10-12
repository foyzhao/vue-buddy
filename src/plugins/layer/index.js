import Vue from 'vue'

function open(component, props, listeners) {
  let layer = new Vue({
    name: 'Layer',
    data: {
      open: true
    },
    provide: {
      closeLayer
    },
    render(h) {
      if (this.open) {
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
              close: closeLayer,
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

  function closeLayer() {
    if (layer) {
      layer = layer.open = null
    }
  }

  return closeLayer
}

export default {
  open,
  install(Vue) {
    Vue.prototype.$open = open
  }
}