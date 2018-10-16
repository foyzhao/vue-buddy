<template>
  <div class="wheel" :class="{horizontal}" @touchstart="onTouchStart">
    <ul class="wheel-list" :style="listStyle">
      <li class="wheel-item"
          v-for="(item, index) in items"
          :key="index"
          :class="{current: state !== 2 && current === index}"
          :style="itemStyle"
          @click="current = index">
        <slot :item="item">
          <span>{{item}}</span>
        </slot>
      </li>
    </ul>
    <div class="wheel-cover"/>
    <div class="wheel-indicator" :style="indicatorStyle"/>
  </div>
</template>

<script>
  export default {
    props: {
      items: Array,
      value: [String, Number, Object],
      horizontal: Boolean,
      spread: {
        type: Number,
        default: 2
      }
    },
    data() {
      return {
        current: this.items ? this.items.indexOf(this.value) : -1,
        width: 0,
        height: 0,
        offset: 0,
        state: 3
      }
    },
    created() {
      document.addEventListener('touchmove', this.onTouchMove, {passive: false});
      document.addEventListener('touchend', this.onTouchEnd);
      window.addEventListener('resize', this.measure)
    },
    mounted() {
      this.measure()
    },
    computed: {
      itemWidth() {
        return this.width / (Math.max(this.spread, 0) * 2 + 1)
      },
      itemHeight() {
        return this.height / (Math.max(this.spread, 0) * 2 + 1)
      },
      itemSize() {
        return this.horizontal ? this.itemWidth : this.itemHeight
      },
      itemStyle() {
        if (this.horizontal) {
          return {
            width: `${this.itemWidth}px`
          }
        } else {
          return {
            height: `${this.itemHeight}px`
          }
        }
      },
      listStyle() {
        if (this.horizontal) {
          const translateX = this.offset - this.width - this.itemWidth * (this.current - Math.max(this.spread, 0));
          return {
            padding: `0 ${this.width}px`,
            transform: `translateX(${translateX}px)`,
            transition: this.state > 1 ? 'none' : '.2s'
          }
        } else {
          const translateY = this.offset - this.height - this.itemHeight * (this.current - Math.max(this.spread, 0));
          return {
            padding: `${this.height}px 0`,
            transform: `translateY(${translateY}px)`,
            transition: this.state > 1 ? 'none' : '.2s'
          }
        }
      },
      indicatorStyle() {
        if (this.horizontal) {
          return {
            left: `${(this.width - this.itemWidth) / 2}px`,
            top: 0,
            width: `${this.itemWidth}px`,
            height: '100%'
          }
        } else {
          return {
            left: 0,
            top: `${(this.height - this.itemHeight) / 2}px`,
            width: '100%',
            height: `${this.itemHeight}px`
          }
        }
      },
      maxOverScroll() {
        return (this.horizontal ? this.width : this.height) / 2
      }
    },
    watch: {
      items(items) {
        this.current = items ? items.indexOf(this.value) : -1
      },
      value(value) {
        this.current = this.items ? this.items.indexOf(value) : -1
      },
      current(current) {
        if (current > -1) {
          this.$emit('input', this.items[current]);
          this.$emit('change')
        }
      }
    },
    methods: {
      measure() {
        if (this.horizontal) {
          this.width = this.$el.clientWidth
        } else {
          this.height = this.$el.clientHeight
        }
      },
      getPoint(e) {
        return {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY,
          time: new Date().getTime()
        }
      },
      onTouchStart(e) {
        if (e.touches.length > 1) {
          return
        }
        if (this.items && this.items.length) {
          this.state = 1;
          this.pending = this.offset;
          this.downPoint = this.getPoint(e);
          this.movePoints = [this.downPoint]
        }
      },
      onTouchMove(e) {
        if (this.state === 1) {
          const point = this.getPoint(e);
          const slope = Math.abs(point.x - this.downPoint.x) / Math.abs(point.y - this.downPoint.y);
          if (this.horizontal && slope > 1 || !this.horizontal && slope < 1) {
            e.preventDefault();
            this.state = 2
          } else {
            this.state = 0
          }
        } else if (this.state === 2) {
          e.preventDefault();
          const point = this.getPoint(e);
          this.distance = this.horizontal ? point.x - this.downPoint.x : point.y - this.downPoint.y;
          this.scroll(this.pending + this.distance);
          this.movePoints.push(point);
          if (this.movePoints.length > 4) {
            this.movePoints.shift()
          }
        }
      },
      onTouchEnd(e) {
        if (e.touches.length) {
          return
        }
        if (this.state === 2) {
          this.pending += this.distance;
          if (this.movePoints.length > 2) {
            const start = this.movePoints.shift();
            const end = this.movePoints.pop();
            const distance = this.horizontal ? end.x - start.x : end.y - start.y;
            this.slideDistance = distance / (end.time - start.time) * 160;
            requestAnimationFrame(this.slide)
          } else {
            this.adjust()
          }
        } else {
          this.state = 0
        }
      },
      slide() {
        let step = this.slideDistance / 16;
        this.slideDistance -= step;
        this.pending += step;
        this.scroll(this.pending);
        if (Math.abs(this.slideDistance) < 10 ||
          this.offset > (this.current + 0.5) * this.itemSize ||
          this.offset < (this.current - this.items.length + 0.5) * this.itemSize
        ) {
          this.adjust()
        } else if (this.state === 2) {
          requestAnimationFrame(this.slide)
        }
      },
      scroll(offset) {
        const startRemain = Math.max(this.current * this.itemSize, 0);
        const endRemain = (this.current - this.items.length + 1) * this.itemSize;
        if (offset > startRemain) {
          offset = startRemain + Math.tanh((offset - startRemain) / 400) * this.maxOverScroll
        } else if (offset < endRemain) {
          offset = endRemain + Math.tanh((offset - endRemain) / 400) * this.maxOverScroll
        }
        this.offset = offset
      },
      adjust() {
        const count = Math.round(this.pending / this.itemSize);
        this.current = Math.min(this.items.length - 1, Math.max(this.current - count, 0));
        this.pending = this.offset = this.state = 0
      }
    },
    destroyed() {
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
      window.removeEventListener('resize', this.measure)
    }
  }
</script>

<style>
  .wheel {
    position: relative;
    height: 200px;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    & > .wheel-list {
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: inherit;
      & > .wheel-item {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: inherit;
        & > * {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    & > .wheel-cover {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(#ffffff99, #ffffff00, #ffffff99);
      pointer-events: none;
    }
    & > .wheel-indicator {
      position: absolute;
      box-sizing: border-box;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }
    &.horizontal {
      height: 40px;
      & > .wheel-list {
        display: table;
        height: 100%;
        white-space: nowrap;
        & > .wheel-item {
          display: inline-flex;
          height: 100%;
        }
      }
      & > .wheel-cover {
        background: linear-gradient(to right, #ffffff99, #ffffff00, #ffffff99);
      }
      & > .wheel-indicator {
        border: none;
      }
    }
  }
</style>