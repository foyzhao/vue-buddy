<template>
  <gesture-detector
      horizontal
      :left-damping="leftDamping"
      :right-damping="rightDamping"
      @press="onPress"
      @drag="onDrag"
      @release="onRelease">
    <div class="view-pager">
      <div class="view-wrapper" :style="viewWrapperStyle">
        <slot/>
      </div>
      <slot name="cover" :current="pagerCurrent" :number="pagerNumber"/>
    </div>
  </gesture-detector>
</template>

<script>
  import GestureDetector from './gesture-detector.vue'

  // TODO use slide-view
  // TODO recycle component pager
  export default {
    components: {
      GestureDetector
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
        touching: false
      }
    },
    computed: {
      isFirst() {
        return this.pagerCurrent === 0
      },
      isLast() {
        return this.pagerCurrent === this.pagerNumber - 1
      },
      leftDamping() {
        return this.isFirst ? this.damping : 0
      },
      rightDamping() {
        return this.isLast ? this.damping : 0
      },
      viewWrapperStyle() {
        return {
          transition: this.touching ? 'none' : '.2s',
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
      touching() {
        if (this.touching) {
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
      onPress() {
        if (this.number === undefined) {
          this.pagerNumber = this.$el.children[0].children.length
        }
        if (!this.pagerWidth) {
          this.onResize()
        }
        this.touching = true
      },
      onDrag(offset) {
        this.pagerOffset = offset
      },
      onRelease(velocity) {
        this.touching = false;
        if (!this.isFirst && (velocity > 0.5 && this.pagerOffset > 0 || this.pagerOffset > this.pagerWidth / 2 && velocity > 0)) {
          this.pagerCurrent--
        }
        if (!this.isLast && (velocity < -0.5 && this.pagerOffset < 0 || this.pagerOffset < this.pagerWidth / -2 && velocity < 0)) {
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