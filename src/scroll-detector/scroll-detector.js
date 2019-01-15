const doc = document.documentElement;

export default {
  created() {
    this.$_scrollDetectorMixin_scrollTop = 0;
    window.addEventListener('scroll', this.$_scrollDetectorMixin_onScroll)
  },
  activated() {
    window.addEventListener('scroll', this.$_scrollDetectorMixin_onScroll)
  },
  deactivated() {
    window.removeEventListener('scroll', this.$_scrollDetectorMixin_onScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.$_scrollDetectorMixin_onScroll)
  },
  methods: {
    $_scrollDetectorMixin_onScroll() {
      const scrollTop = doc.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (scrollTop < this.$_scrollDetectorMixin_scrollTop) {
        this.onScrollUp(scrollTop);
        if (!scrollTop) {
          this.onScrollTop(scrollTop)
        }
      } else {
        this.onScrollDown(scrollTop);
        if (scrollTop + doc.clientHeight === doc.scrollHeight) {
          this.onScrollBottom(scrollTop)
        }
      }
      this.$_scrollDetectorMixin_scrollTop = scrollTop
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

