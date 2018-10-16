import Vue from 'vue'

/**
 * @method
 * @desc open a layer
 * @param {object} component
 * @param {object} options
 * @return {function} close the opened layer
 */
function open(component, options) {

  options = Object.assign({
    gravity: 'center',
    transition: 'zoom-inner',
    cancelable: true,
    style: {},
    props: {},
    listeners: {}
  }, options);

  let layer = new Vue({
    name: 'Layer',
    data: {
      open: true
    },
    provide: {
      cancelable: options.cancelable,
      closeLayer
    },
    render(h) {
      if (this.open) {
        return h(
          'transition',
          {
            props: {
              name: options.transition,
              appear: true
            },
            on: {
              afterLeave: () => this.$destroy()
            }
          },
          [
            h(
              'div',
              {
                'class': [
                  'layer',
                  options.name,
                  options.gravity,
                  {
                    transition: !!options.transition
                  }
                ],
                style: options.style,
                on: {
                  click(event) {
                    if (event.target !== event.currentTarget) {
                      return
                    }
                    if (options.cancelable) {
                      closeLayer()
                    }
                  }
                }
              },
              [
                h(
                  component,
                  {
                    props: options.props,
                    on: {
                      close: closeLayer,
                      ...options.listeners
                    }
                  }
                )
              ]
            )
          ]
        )
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