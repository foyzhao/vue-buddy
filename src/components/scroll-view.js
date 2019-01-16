export default {
  inject: {
    slideView: {
      default: null
    }
  },
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  data() {
    return {
      scrollTop: 0,
      downX: 0,
      downY: 0
    }
  },
  render(h) {
    const listeners = {
      scroll: this.onScroll
    };
    if (this.slideView) {
      listeners.touchstart = this.onTouchStart
    }
    return h(this.tag, {
      on: listeners
    }, this.$slots.default)
  },
  methods: {
    onTouchStart(e) {
      // TODO check overflow
      if (e.currentTarget.clientHeight < e.currentTarget.scrollHeight) {
        this.downX = e.touches[0].pageX;
        this.downY = e.touches[0].pageY;
        e.currentTarget.addEventListener('touchmove', this.onTouchMove, {once: true})
      }
    },
    onTouchMove(e) {
      const offset = e.touches[0].pageY - this.downY;
      const slope = Math.abs(e.touches[0].pageX - this.downX) / Math.abs(offset);
      if (slope < 1) {
        if (this.scrollTop && offset > 0 || !this.isScrollAtBottom(e) && offset < 0) {
          e.stopPropagation();
          this.slideView.$el.dispatchEvent(new Event('touchend'))
        }
      }
    },
    onScroll(e) {
      const scrollTop = e.target.scrollTop;
      if (scrollTop > this.scrollTop) {
        this.$emit('down', scrollTop);
        if (this.isScrollAtBottom(e)) {
          this.$emit('bottom', scrollTop)
        }
      } else {
        this.$emit('up', scrollTop);
        if (!scrollTop) {
          this.$emit('top', scrollTop)
        }
      }
      this.scrollTop = scrollTop
    },
    isScrollAtBottom(e) {
      return e.currentTarget.scrollTop + e.currentTarget.clientHeight === e.currentTarget.scrollHeight
    }
  }
}