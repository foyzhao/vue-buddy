<template>
  <div class="view-pager" @touchstart="onTouchStart">
    <div class="wrapper" :style="style">
      <slot></slot>
    </div>
    <div class="cover">
      <slot name="cover" :current="mCurrent" :total="mTotal"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      current: {
        type: Number,
        default: 0
      },
      total: Number,
      interval: Number
    },
    data() {
      return {
        mCurrent: this.current,
        mTotal: this.total,
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
      if (this.total === undefined) {
        this.$nextTick(() => {
          this.mTotal = this.$el.children[0].children.length;
        });
      }
      this.setInterval();
    },
    watch: {
      current(value, oldValue) {
        if (value < 0 || value && value >= this.mTotal || 0) {
          this.$emit('update:current', oldValue);
        } else {
          this.mCurrent = value;
        }
      },
      total(value) {
        this.mTotal = value;
        if (this.mCurrent >= this.mTotal) {
          this.mCurrent = Math.max(0, value - 1);
        }
      },
      mCurrent(value) {
        this.$emit('update:current', value);
      }
    },
    computed: {
      style() {
        return {
          transform: `translateX(${this.offset - this.width * this.mCurrent}px)`,
          transition: this.state === 2 ? 'none' : '.2s'
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
        if (this.total === undefined) {
          this.mTotal = this.$el.children[0].children.length;
        }
        if (this.mTotal > 0) {
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
            this.clearInterval();
          } else {
            this.state = 0;
          }
        } else if (this.state === 2) {
          e.preventDefault();
          const point = this.getPoint(e);
          this.offset = point.x - this.downPoint.x;
          if (this.mCurrent === 0 && point.x > this.downPoint.x ||
            this.mCurrent === this.mTotal - 1 && point.x < this.downPoint.x) {
            this.offset /= 3;
          }
        }
      },
      onTouchEnd() {
        if (this.state === 2) {
          this.state = 0;
          const speed = this.offset / (new Date().getTime() - this.downPoint.time);
          if (this.mCurrent > 0 && (speed > 0.4 || this.offset > this.width / 2)) {
            this.mCurrent--;
          }
          if (this.mCurrent < this.mTotal - 1 && (speed < -0.4 || this.offset < this.width / -2)) {
            this.mCurrent++;
          }
          this.offset = 0;
          this.setInterval();
        }
      },
      onResize() {
        this.width = this.$el.clientWidth;
      },
      setInterval() {
        if (this.interval > 0) {
          this.timer = setInterval(() => {
            if (this.mCurrent < this.mTotal - 1) {
              this.mCurrent++;
            } else {
              this.mCurrent = 0;
            }
          }, this.interval);

        }
      },
      clearInterval() {
        clearInterval(this.timer);
      }
    },
    destroyed() {
      this.clearInterval();
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
      window.removeEventListener('resize', this.onResize);
    }
  }
</script>

<style lang="stylus">
  .view-pager {
    position relative
    overflow hidden
    > .wrapper {
      display flex
      align-items flex-start
      > * {
        flex 0 0 100%
      }
    }
    > .cover {
      position absolute
      left 0
      bottom 0
      width 100%
      &:empty {
        display none
      }
    }
  }
</style>