/**
 * 混入onPageEnd生命周期方法，会在页面滚动到底部时调用
 */
export default {
  created() {
    if (this.$options.onPageEnd) {
      this.$onPageEnd = this.$options.onPageEnd.bind(this);
      window.addEventListener('scroll', this.$scrollListener);
      this.$scrollListener.binded = true;
    }
  },
  activated() {
    if (this.$onPageEnd && !this.$scrollListener.binded) {
      window.addEventListener('scroll', this.$scrollListener);
      this.$scrollListener.binded = true;
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
    if (this.$onPageEnd && this.$scrollListener.binded) {
      window.removeEventListener('scroll', this.$scrollListener);
      this.$scrollListener.binded = false;
    }
  },
  destroyed() {
    if (this.$onPageEnd && this.$scrollListener.binded) {
      window.removeEventListener('scroll', this.$scrollListener);
      this.$scrollListener.binded = false;
    }
  }
}