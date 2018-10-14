import Vue from 'vue'

/**
 * @method
 * @desc open a layer
 * @param {object} component
 * @param {object} options
 * @return {function} close the opened layer
 */
function open(component, options = {}) {
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
                  options.name,
                  options.appear || 'fade-in',
                  options.gravity || 'center'
                ],
                style: options.style,
                on: {
                  click(event) {
                    if (event.target !== event.currentTarget) {
                      return
                    }
                    if (options.cancelable !== false) {
                      closeLayer()
                    }
                  }
                }
              },
              [
                h(
                  component.component || component,
                  {
                    'class': component.appear || 'zoom-in',
                    props: component.props,
                    on: {
                      close: closeLayer,
                      ...component.listeners
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