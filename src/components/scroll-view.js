export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  data() {
    return {
      scrollTop: 0
    }
  },
  render(h) {
    return h(this.tag, {
      on: {
        scroll: this.onScroll
      }
    }, this.$slots.default)
  },
  methods: {
    onScroll(e) {
      const scrollTop = e.target.scrollTop;
      if (scrollTop > this.scrollTop) {
        this.$emit('down', scrollTop);
        if (scrollTop + e.currentTarget.clientHeight === e.currentTarget.scrollHeight) {
          this.$emit('bottom', scrollTop)
        }
      } else {
        this.$emit('up', scrollTop);
        if (!scrollTop) {
          this.$emit('top', scrollTop)
        }
      }
      this.scrollTop = scrollTop
    }
  }
}