<template>
  <slide-view
      :class="['view-pager', {vertical}]"
      :room-left="roomLeft"
      :room-right="roomRight"
      :room-top="roomTop"
      :room-bottom="roomBottom"
      :damping-left="damping"
      :damping-right="damping"
      :damping-top="damping"
      :damping-bottom="damping"
      @start="transition = false"
      @slide="slide"
      @stop="reset">
    <div class="view-wrapper" :style="wrapperStyle">
      <slot/>
    </div>
    <ul v-if="indicator" class="indicator">
      <li v-for="i in number"
          :key="i"
          :class="['item', {active: mCurrent === i - 1}]"/>
    </ul>
    <slot name="cover" class="cover" :current="mCurrent" :number="number"/>
  </slide-view>
</template>

<script>
  import SlideView from './slide-view'

  // TODO emit slide state
  // TODO recycler view
  // TODO loop
  export default {
    components: {
      SlideView
    },
    props: {
      vertical: Boolean,
      current: {
        type: Number,
        default: 0
      },
      damping: {
        type: Number,
        default: 0.6
      },
      indicator: Boolean,
      interval: Number
    },
    data() {
      return {
        mCurrent: this.current,
        number: 0,
        size: 0,
        offset: 0,
        transition: false
      }
    },
    computed: {
      roomLeft() {
        if (!this.vertical && this.number > 0) {
          return (this.number - this.mCurrent - 1) * this.size
        }
      },
      roomRight() {
        if (!this.vertical && this.number > 0) {
          return this.mCurrent * this.size
        }
      },
      roomTop() {
        if (this.vertical && this.number > 0) {
          return (this.number - this.mCurrent - 1) * this.size
        }
      },
      roomBottom() {
        if (this.vertical && this.number > 0) {
          return this.mCurrent * this.size
        }
      },
      wrapperStyle() {
        return {
          transition: this.transition ? '.2s' : 'none',
          transform: `translate${this.vertical ? 'Y' : 'X'}(${this.offset - this.size * this.mCurrent}px)`
        }
      }
    },
    watch: {
      current(value) {
        if (this.mCurrent !== value) {
          if (value >= 0 && value < this.number) {
            this.mCurrent = value
          } else {
            console.warn('ViewPager: Invalid current value: ' + value)
          }
        }
      },
      mCurrent(value) {
        this.$emit('update:current', value)
      },
      number(value) {
        if (this.mCurrent >= value) {
          this.mCurrent = Math.max(0, value - 1)
        }
        this.autoPlay()
      },
      transition() {
        this.autoPlay()
      },
      interval() {
        this.autoPlay()
      }
    },
    created() {
      window.addEventListener('resize', this.measure)
    },
    mounted() {
      this.$nextTick(() => {
        this.number = this.$el.children[0].children.length;
        this.transition = true
      });
      this.measure()
    },
    activated() {
      window.addEventListener('resize', this.measure);
      this.measure()
    },
    updated() {
      this.number = this.$el.children[0].children.length
    },
    deactivated() {
      window.removeEventListener('resize', this.measure)
    },
    destroyed() {
      window.removeEventListener('resize', this.measure)
    },
    methods: {
      measure() {
        this.size = this.vertical ? this.$el.clientHeight : this.$el.clientWidth
      },
      slide(offsetX, offsetY) {
        this.offset = this.vertical ? offsetY : offsetX
      },
      reset(velocityX, velocityY) {
        this.transition = true;
        const velocity = this.vertical ? velocityY : velocityX;
        if (this.mCurrent > 0 && (velocity > 0.5 && this.offset > 0 || this.offset > this.size / 2 && velocity > 0)) {
          this.mCurrent--
        }
        if (this.mCurrent < this.number - 1 && (velocity < -0.5 && this.offset < 0 || this.offset < this.size / -2 && velocity < 0)) {
          this.mCurrent++
        }
        this.offset = 0
      },
      autoPlay() {
        clearTimeout(this.timer);
        if (this.transition && this.interval > 0 && this.number > 0) {
          this.timer = setTimeout(() => {
            if (this.mCurrent < this.number - 1) {
              this.mCurrent++
            } else {
              this.mCurrent = 0
            }
            this.autoPlay()
          }, this.interval)
        }
      }
    }
  }
</script>

<style>
  .view-pager {
    position: relative;
    overflow: hidden;
    > .view-wrapper {
      height: 100%;
      > * {
        height: 100%;
        box-sizing: border-box;
      }
    }
    &:not(.vertical) > .view-wrapper {
      display: flex;
      > * {
        flex: 0 0 100%;
      }
    }
    > .indicator {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 1rem;
      margin: 0;
      padding: 0;
      line-height: 0;
      list-style: none;
      display: flex;
      justify-content: center;
      > .item {
        width: 8px;
        height: 8px;
        margin: 0 4px;
        background: #00000066;
        border-radius: 4px;
        vertical-align: middle;
        transition: .2s;
        &.active {
          background: #000000;
        }
      }
    }
    &.vertical > .indicator {
      left: auto;
      right: 1rem;
      top: 0;
      bottom: 0;
      flex-direction: column;
      > .item {
        margin: 4px 0;
      }
    }
  }
</style>