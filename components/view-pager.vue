<template>
  <div class="view-pager" @touchstart="onTouchStart">
    <div :style="style">
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      current: {
        type: Number,
        default: 0
      },
      total: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        width: 0,
        state: 0,
        offset: 0,
        downPoint: null
      }
    },
    created() {
      document.addEventListener('touchmove', this.onTouchMove, {passive: false});
      document.addEventListener('touchend', this.onTouchEnd);
      window.addEventListener('resize', this.onResize);
    },
    mounted() {
      this.onResize();
    },
    watch: {
      current(value, oldValue) {
        if (value < 0 || value && value >= this.total) {
          this.$emit('update:current', oldValue);
        }
      },
      total(value) {
        if (this.current >= value) {
          this.$emit('update:current', Math.max(0, value - 1));
        }
      }
    },
    computed: {
      style() {
        return {
          transform: `translateX(${this.offset - this.width * this.current}px)`,
          transition: this.state ? 'none' : '.2s'
        }
      }
    },
    methods: {
      getPoint(e) {
        return {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY
        }
      },
      onTouchStart(e) {
        if (this.total > 0) {
          this.state = 1;
          this.downPoint = this.getPoint(e);
          this.downPoint.time = new Date().getTime();
        }
      },
      onTouchMove(e) {
        if (this.state === 1) {
          const point = this.getPoint(e);
          if (Math.abs(point.x - this.downPoint.x) > Math.abs(point.y - this.downPoint.y)) {
            e.preventDefault();
            this.state = 2;
          } else {
            this.state = 0;
          }
        } else if (this.state === 2) {
          e.preventDefault();
          const point = this.getPoint(e);
          this.offset = point.x - this.downPoint.x;
          if (this.current === 0 && point.x > this.downPoint.x ||
            this.current === this.total - 1 && point.x < this.downPoint.x) {
            this.offset /= 3;
          }
        }
      },
      onTouchEnd() {
        if (this.state === 2) {
          this.state = 0;
          const speed = this.offset / (new Date().getTime() - this.downPoint.time);
          if (this.current > 0 && (speed > 0.4 || this.offset > this.width / 2)) {
            this.$emit('update:current', this.current - 1)
          }
          if (this.current < this.total - 1 && (speed < -0.4 || this.offset < this.width / -2)) {
            this.$emit('update:current', this.current + 1)
          }
          this.offset = 0;
        }
      },
      onResize() {
        this.width = this.$el.clientWidth;
      }
    },
    destroyed() {
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
      window.removeEventListener('resize', this.onResize);
    }
  }
</script>

<style lang="stylus" scoped>
  .view-pager {
    overflow hidden
    > div {
      display flex
      align-items flex-start
      > * {
        flex 0 0 100%
      }
    }
  }
</style>