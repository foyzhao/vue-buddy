<template>
  <div class="view-pager" @touchstart="onTouchStart">
    <div class="view-wrapper" :style="viewWrapperStyle">
      <slot/>
    </div>
    <slot name="cover" :current="mCurrent" :number="mNumber"/>
  </div>
</template>

<script>
  // TODO abstract touch logic
  export default {
    props: {
      number: Number,
      current: {
        type: Number,
        default: 0
      },
      interval: Number
    },
    data() {
      return {
        mCurrent: this.current,
        mNumber: this.number,
        width: 0,
        state: 0,
        offset: 0,
        downPoint: null
      }
    },
    computed: {
      viewWrapperStyle() {
        return {
          transform: `translateX(${this.offset - this.width * this.mCurrent}px)`,
          transition: this.state === 2 ? 'none' : '.2s'
        }
      }
    },
    watch: {
      current(value, oldValue) {
        if (value < 0 || value && value >= this.mNumber || 0) {
          this.$emit('update:current', oldValue)
        } else {
          this.mCurrent = value
        }
      },
      number(value) {
        this.mNumber = value;
        if (this.mCurrent >= this.mNumber) {
          this.mCurrent = Math.max(0, value - 1)
        }
      },
      mCurrent(value) {
        this.$emit('update:current', value)
      }
    },
    created() {
      document.addEventListener('touchmove', this.onTouchMove, {passive: false});
      document.addEventListener('touchend', this.onTouchEnd);
      window.addEventListener('resize', this.onResize)
    },
    mounted() {
      this.onResize();
      if (this.number === undefined) {
        this.$nextTick(() => {
          this.mNumber = this.$el.children[0].children.length
        })
      }
      this.setInterval()
    },
    destroyed() {
      this.clearInterval();
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
      window.removeEventListener('resize', this.onResize)
    },
    methods: {
      getPoint(e) {
        return {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY
        }
      },
      onTouchStart(e) {
        if (this.number === undefined) {
          this.mNumber = this.$el.children[0].children.length
        }
        if (!this.width) {
          this.onResize()
        }
        if (this.mNumber > 0) {
          this.state = 1;
          this.downPoint = this.getPoint(e);
          this.downPoint.time = new Date().getTime()
        }
      },
      onTouchMove(e) {
        if (this.state === 1) {
          const point = this.getPoint(e);
          if (Math.abs(point.x - this.downPoint.x) > Math.abs(point.y - this.downPoint.y)) {
            e.preventDefault();
            this.state = 2;
            this.clearInterval()
          } else {
            this.state = 0
          }
        } else if (this.state === 2) {
          e.preventDefault();
          const point = this.getPoint(e);
          this.offset = point.x - this.downPoint.x;
          if (this.mCurrent === 0 && point.x > this.downPoint.x || this.mCurrent === this.mNumber - 1 && point.x < this.downPoint.x) {
            this.offset = Math.tanh(this.offset / 400) * this.width / 2
          }
        }
      },
      onTouchEnd() {
        if (this.state === 2) {
          this.state = 0;
          const speed = this.offset / (new Date().getTime() - this.downPoint.time);
          if (this.mCurrent > 0 && (speed > 0.4 || this.offset > this.width / 2)) {
            this.mCurrent--
          }
          if (this.mCurrent < this.mNumber - 1 && (speed < -0.4 || this.offset < this.width / -2)) {
            this.mCurrent++
          }
          this.offset = 0;
          this.setInterval()
        }
      },
      onResize() {
        this.width = this.$el.clientWidth
      },
      setInterval() {
        if (this.interval > 0) {
          this.timer = setInterval(() => {
            if (this.mCurrent < this.mNumber - 1) {
              this.mCurrent++
            } else {
              this.mCurrent = 0
            }
          }, this.interval)
        }
      },
      clearInterval() {
        clearInterval(this.timer)
      }
    }
  }
</script>

<style>
  .view-pager {
    position: relative;
    overflow: hidden;
    > .view-wrapper {
      display: flex;
      align-items: flex-start;
      > * {
        flex: 0 0 100%;
      }
    }
    > .indicator {
      position: absolute;
      left: 0;
      bottom: 10%;
      width: 100%;
      &.divider {
        bottom: 0;
      }
    }
  }
</style>