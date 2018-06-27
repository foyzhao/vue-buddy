/**
 * 混入onPageEnd生命周期方法，会在页面滚动到底部时调用
 */
export default {
  created() {
    if (this.$options.onPageEnd) {
      this.$onPageEnd = this.$options.onPageEnd.bind(this);
    }
  },
  activated() {
    if (this.$onPageEnd) {
      window.addEventListener('scroll', this.$scrollListener);
    }
  },
  methods: {
    $scrollListener() {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || window.pageYOffset || document.body.scrollTop;
      if (scrollTop + doc.clientHeight === doc.scrollHeight) {
        this.$onPageEnd();
      }
    }
  },
  deactivated() {
    window.removeEventListener('scroll', this.$scrollListener);
  },
  destroyed() {
    window.removeEventListener('scroll', this.$scrollListener);
  }
}