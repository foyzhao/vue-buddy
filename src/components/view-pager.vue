<template>
  <slide-view
      class="view-pager"
      horizontal
      :damping-left="dampingLeft"
      :damping-right="dampingRight"
      @start="onStart"
      @slide="onSlide"
      @end="onEnd">
    <div class="view-wrapper" :style="viewWrapperStyle">
      <slot/>
    </div>
    <slot name="cover" :current="pagerCurrent" :number="pagerNumber"/>
  </slide-view>
</template>

<script>
  import SlideView from './slide-view'

  // TODO recycle component pager
  export default {
    components: {
      SlideView
    },
    props: {
      current: {
        type: Number,
        default: 0
      },
      number: Number,
      damping: {
        type: Number,
        default: 0.5
      },
      interval: Number
    },
    data() {
      return {
        pagerCurrent: this.current,
        pagerNumber: this.number,
        pagerWidth: 0,
        pagerOffset: 0,
        sliding: false
      }
    },
    computed: {
      isFirst() {
        return this.pagerCurrent === 0
      },
      isLast() {
        return this.pagerCurrent === this.pagerNumber - 1
      },
      dampingLeft() {
        return this.isFirst ? this.damping : 0
      },
      dampingRight() {
        return this.isLast ? this.damping : 0
      },
      viewWrapperStyle() {
        return {
          transition: this.sliding ? 'none' : '.2s',
          transform: `translateX(${this.pagerOffset - this.pagerWidth * this.pagerCurrent}px)`
        }
      }
    },
    watch: {
      current(value, oldValue) {
        if (value < 0 || value && value >= this.pagerNumber || 0) {
          this.$emit('update:current', oldValue)
        } else {
          this.pagerCurrent = value
        }
      },
      number(value) {
        // TODO slot dynamic change
        this.pagerNumber = value;
        if (this.pagerCurrent >= this.pagerNumber) {
          this.pagerCurrent = Math.max(0, value - 1)
        }
      },
      pagerCurrent(value) {
        this.$emit('update:current', value)
      },
      sliding() {
        if (this.sliding) {
          this.clearInterval()
        } else {
          this.setInterval()
        }
      }
    },
    created() {
      window.addEventListener('resize', this.onResize)
    },
    mounted() {
      this.onResize();
      if (this.number === undefined) {
        this.$nextTick(() => {
          this.pagerNumber = this.$el.children[0].children.length
        })
      }
      this.setInterval()
    },
    activated() {
      // TODO activated width change ?
      this.setInterval()
    },
    deactivated() {
      this.clearInterval();
    },
    destroyed() {
      this.clearInterval();
      window.removeEventListener('resize', this.onResize)
    },
    methods: {
      onStart() {
        // TODO a better place?
        if (this.number === undefined) {
          this.pagerNumber = this.$el.children[0].children.length
        }
        if (!this.pagerWidth) {
          this.onResize()
        }
        this.sliding = true
      },
      onSlide(offsetX) {
        this.pagerOffset = offsetX
      },
      onEnd(velocityX) {
        this.sliding = false;
        if (!this.isFirst && (velocityX > 0.5 && this.pagerOffset > 0 || this.pagerOffset > this.pagerWidth / 2 && velocityX > 0)) {
          this.pagerCurrent--
        }
        if (!this.isLast && (velocityX < -0.5 && this.pagerOffset < 0 || this.pagerOffset < this.pagerWidth / -2 && velocityX < 0)) {
          this.pagerCurrent++
        }
        this.pagerOffset = 0
      },
      onResize() {
        this.pagerWidth = this.$el.clientWidth
      },
      setInterval() {
        this.clearInterval();
        if (this.interval > 0) {
          this.timer = setInterval(() => {
            if (this.isLast) {
              this.pagerCurrent = 0
            } else {
              this.pagerCurrent++
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