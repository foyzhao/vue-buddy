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
    appear: 'fade-in',
    gravity: 'center',
    launch: 'zoom-in',
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
      closeLayer
    },
    render(h) {
      if (this.open) {
        return h(
          'transition',
          {
            props: {
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
                  options.appear,
                  options.gravity,
                  options.name
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
                    'class': options.launch,
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