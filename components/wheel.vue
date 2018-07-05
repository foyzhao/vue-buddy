<template>
  <section :class="['wheel', {horizontal}]"
           @touchstart="onTouchStart"
           @click="onClick"
           v-if="items && items.length">
    <ul :style="itemsStyle">
      <li v-for="(item, index) in items"
          :class="['item', {active: state !== 2 && current === index}]"
          :style="itemStyle">
        <slot :item="item">{{item}}</slot>
      </li>
    </ul>
    <div class="shade"/>
    <div class="indicator"
         :style="indicatorStyle"
         v-if="indicator"/>
  </section>
</template>

<script>
  export default {
    props: {
      items: Array,
      value: {},
      horizontal: Boolean,
      indicator: Boolean,
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
        state: 0,
        offset: 0
      }
    },
    created() {
      document.addEventListener('touchmove', this.onTouchMove, {passive: false});
      document.addEventListener('touchend', this.onTouchEnd);
      window.addEventListener('resize', this.measure);
    },
    mounted() {
      this.measure()
    },
    computed: {
      itemWidth() {
        return this.width / (this.spread * 2 + 1)
      },
      itemHeight() {
        return this.height / (this.spread * 2 + 1)
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
      itemsStyle() {
        if (this.horizontal) {
          return {
            transform: `translateX(${this.offset - this.itemWidth * (this.current - this.spread)}px)`,
            transition: this.state === 2 ? 'none' : '.2s'
          }
        } else {
          return {
            transform: `translateY(${this.offset - this.itemHeight * (this.current - this.spread)}px)`,
            transition: this.state === 2 ? 'none' : '.2s'
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
          this.$emit('input', this.items[current])
        }
      }
    },
    methods: {
      measure() {
        if (this.horizontal) {
          this.width = this.$el.clientWidth;
        } else {
          this.height = this.$el.clientHeight;
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
        this.state = 1;
        this.pending = this.offset;
        this.downPoint = this.getPoint(e);
      },
      onTouchMove(e) {
        if (this.state === 1) {
          const point = this.getPoint(e);
          const slope = Math.abs(point.x - this.downPoint.x) / Math.abs(point.y - this.downPoint.y);
          if (this.horizontal && slope > 1 || !this.horizontal && slope < 1) {
            e.preventDefault();
            this.state = 2;
          } else {
            this.state = 0;
          }
        } else if (this.state === 2) {
          e.preventDefault();
          const point = this.getPoint(e);
          this.distance = this.horizontal ? point.x - this.downPoint.x : point.y - this.downPoint.y;
          this.scroll(this.pending + this.distance);
        }
      },
      onTouchEnd() {
        if (this.state === 2) {
          this.pending += this.distance;
          this.slideDistance = this.distance / (new Date().getTime() - this.downPoint.time) * 200;
          requestAnimationFrame(this.slide);
        } else {
          this.state = 0;
        }
      },
      onClick(e) {
        const length = this.horizontal ? e.layerX : e.layerY;
        const count = parseInt(length / this.itemSize) - this.spread;
        this.current = Math.min(this.items.length - 1, Math.max(this.current + count, 0));
      },
      slide() {
        let step = this.slideDistance / 16;
        this.slideDistance -= step;
        this.pending += step;
        this.scroll(this.pending);
        if (Math.abs(this.slideDistance) < 10 ||
          this.offset > this.current * this.itemSize + 20 ||
          this.offset < (this.current - this.items.length + 1) * this.itemSize - 20
        ) {
          this.adjust();
        } else if (this.state === 2) {
          requestAnimationFrame(this.slide)
        }
      },
      scroll(offset) {
        const startRemain = this.current * this.itemSize;
        const endRemain = (this.current - this.items.length + 1) * this.itemSize;
        if (offset > startRemain) {
          offset = startRemain + Math.tanh((offset - startRemain) / 400) * 100
        } else if (offset < endRemain) {
          offset = endRemain + Math.tanh((offset - endRemain) / 400) * 100
        }
        this.offset = offset;
      },
      adjust() {
        const count = Math.round(this.pending / this.itemSize);
        this.current = Math.min(this.items.length - 1, Math.max(this.current - count, 0));
        this.pending = 0;
        this.offset = 0;
        this.state = 0;
      }
    },
    destroyed() {
      document.removeEventListener('touchmove', this.onTouchMove);
      document.removeEventListener('touchend', this.onTouchEnd);
      window.removeEventListener('resize', this.measure);
    }
  }
</script>

<style lang="stylus">
  .wheel {
    position relative
    height 200px
    overflow hidden
    -webkit-tap-highlight-color transparent
    li {
      display flex
      align-items center
      justify-content center
    }
    .shade {
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      background linear-gradient(#eee, transparent, #eee)
    }
    .indicator {
      position absolute
      background alpha(#000, .1)
    }
    &.horizontal {
      height 50px
      ul {
        display flex
        height 100%
        li {
          flex 0 0 auto
        }
      }
      .shade {
        background linear-gradient(to right, #eee, transparent, #eee)
      }
    }
  }
</style>