const doc = document.documentElement;

export default {
  created() {
    this.$_windowScrollDetectorMixin_scrollTop = 0;
    window.addEventListener('scroll', this.$_windowScrollDetectorMixin_onScroll)
  },
  activated() {
    window.addEventListener('scroll', this.$_windowScrollDetectorMixin_onScroll)
  },
  deactivated() {
    window.removeEventListener('scroll', this.$_windowScrollDetectorMixin_onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.$_windowScrollDetectorMixin_onScroll)
  },
  methods: {
    $_windowScrollDetectorMixin_onScroll() {
      const scrollTop = doc.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (scrollTop < this.$_windowScrollDetectorMixin_scrollTop) {
        this.onScrollUp(scrollTop);
        if (scrollTop <= 0) {
          this.onScrollTop(scrollTop)
        }
      } else {
        this.onScrollDown(scrollTop);
        if (scrollTop + doc.clientHeight >= doc.scrollHeight) {
          this.onScrollBottom(scrollTop)
        }
      }
      this.$_windowScrollDetectorMixin_scrollTop = scrollTop
    },
    onScrollUp(scrollTop) {
    },
    onScrollTop(scrollTop) {
    },
    onScrollDown(scrollTop) {
    },
    onScrollBottom(scrollTop) {
    }
  }
}