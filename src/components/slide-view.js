export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    dampingLeft: Number,
    dampingRight: Number,
    dampingTop: Number,
    dampingBottom: Number
  },
  data() {
    return {
      downPoint: null,
      ignored: false,
      detected: false,
      clientWidth: 0,
      clientHeight: 0,
      horizontalPointRecords: [],
      verticalPointRecords: []
    }
  },
  render(h) {
    return h(this.tag, {
      on: {
        touchstart: this.onTouchStart,
        touchmove: this.onTouchMove,
        touchend: this.onTouchEnd,
        touchcancel: this.onTouchEnd
      }
    }, this.$slots.default)
  },
  methods: {
    onTouchStart(e) {
      if (e.touches.length > 1) {
        return
      }
      this.downPoint = this.getPoint(e);
      this.ignored = false;
      this.detected = false;
      this.horizontalPointRecords = [];
      this.verticalPointRecords = []
    },
    onTouchMove(e) {
      if (this.ignored) {
        return
      }
      if (!this.detected) {
        this.detectTouch(e);
        return;
      }
      e.preventDefault();
      const point = this.getPoint(e);
      let offsetX = 0, offsetY = 0;
      if (this.horizontal) {
        offsetX = point.x - this.downPoint.x;
        // records
        const stepOffsetX = point.x - this.horizontalPointRecords[this.horizontalPointRecords.length - 1].x;
        if (offsetX > 0 && stepOffsetX < 0 || offsetX < 0 && stepOffsetX > 0) { // horizontal direction changed
          this.horizontalPointRecords = []
        } else if (this.horizontalPointRecords.length >= 4) {
          this.horizontalPointRecords.shift()
        }
        this.horizontalPointRecords.push(point);
        // damping
        const damping = offsetX > 0 ? this.dampingLeft : this.dampingRight;
        if (damping >= 1) {
          offsetX = 0
        } else if (damping > 0) {
          offsetX = Math.tanh(offsetX * (1 - damping) / this.clientWidth) * this.clientWidth * (1 - damping)
        }
      }
      if (this.vertical) {
        offsetY = point.y - this.downPoint.y;
        // records
        const stepOffsetY = point.y - this.verticalPointRecords[this.verticalPointRecords.length - 1].y;
        if (offsetY > 0 && stepOffsetY < 0 || offsetY < 0 && stepOffsetY > 0) { // vertical direction changed
          this.verticalPointRecords = []
        } else if (this.verticalPointRecords.length >= 4) {
          this.verticalPointRecords.shift()
        }
        this.verticalPointRecords.push(point);
        // damping
        const damping = offsetY > 0 ? this.dampingTop : this.dampingBottom;
        if (damping >= 1) {
          offsetY = 0
        } else if (damping > 0) {
          offsetY = Math.tanh(offsetY * (1 - damping) / this.clientHeight) * this.clientHeight * (1 - damping)
        }
      }
      this.$emit('slide', offsetX, offsetY)
    },
    onTouchEnd() {
      if (!this.detected || this.ignored) {
        return
      }
      let velocityX = 0, velocityY = 0;
      if (this.horizontal) {
        const distance = this.horizontalPointRecords[this.horizontalPointRecords.length - 1].x - this.horizontalPointRecords[0].x;
        const time = this.horizontalPointRecords[this.horizontalPointRecords.length - 1].time - this.horizontalPointRecords[0].time;
        velocityX = distance / time
      }
      if (this.vertical) {
        const distance = this.verticalPointRecords[this.verticalPointRecords.length - 1].y - this.verticalPointRecords[0].y;
        const time = this.verticalPointRecords[this.verticalPointRecords.length - 1].time - this.verticalPointRecords[0].time;
        velocityY = distance / time
      }
      this.$emit('end', velocityX, velocityY)
    },
    detectTouch(e) {
      this.detected = true;
      const point = this.getPoint(e);
      const offsetX = point.x - this.downPoint.x, offsetY = point.y - this.downPoint.y;
      if (Math.abs(offsetX) < Math.abs(offsetY)) { // vertical
        if (!this.vertical) {
          this.ignored = true;
          return
        }
        if (offsetY < 0) { // up
          let node;
          do {
            node = node && node.parentNode || e.target;
            if (node.clientHeight < node.scrollHeight) { // overflow
              if (node.scrollTop + node.clientHeight < node.scrollHeight) { // not reach bottom
                const overflowBehavior = getComputedStyle(node).overflow;
                if (overflowBehavior === 'scroll' || overflowBehavior === 'auto') { // scrollable
                  this.ignored = true;
                  return
                }
              }
            }
          } while (node !== e.currentTarget)
        } else { // down
          let node;
          do {
            node = node && node.parentNode || e.target;
            if (node.clientHeight < node.scrollHeight) { // overflow
              if (node.scrollTop) { // not reach top
                const overflowBehavior = getComputedStyle(node).overflow;
                if (overflowBehavior === 'scroll' || overflowBehavior === 'auto') { // scrollable
                  this.ignored = true;
                  return
                }
              }
            }
          } while (node !== e.currentTarget)
        }
      } else { // horizontal
        if (!this.horizontal) {
          this.ignored = true;
          return
        }
        if (offsetX < 0) { // left
          let node;
          do {
            node = node && node.parentNode || e.target;
            if (node.clientWidth < node.scrollWidth) { // overflow
              if (node.scrollLeft + node.clientWidth < node.scrollWidth) { // not reach right
                const overflowBehavior = getComputedStyle(node).overflow;
                if (overflowBehavior === 'scroll' || overflowBehavior === 'auto') { // scrollable
                  this.ignored = true;
                  return
                }
              }
            }
          } while (node !== e.currentTarget)
        } else { // right
          let node;
          do {
            node = node && node.parentNode || e.target;
            if (node.clientWidth < node.scrollWidth) { // overflow
              if (node.scrollLeft) { // not reach left
                const overflowBehavior = getComputedStyle(node).overflow;
                if (overflowBehavior === 'scroll' || overflowBehavior === 'auto') { // scrollable
                  this.ignored = true;
                  return
                }
              }
            }
          } while (node !== e.currentTarget)
        }
      }
      // handle this touch event
      e.preventDefault();
      this.clientWidth = e.currentTarget.clientWidth;
      this.clientHeight = e.currentTarget.clientHeight;
      if (this.horizontal) {
        this.horizontalPointRecords.push(point)
      }
      if (this.vertical) {
        this.verticalPointRecords.push(point)
      }
      this.$emit('start')
    },
    getPoint(e) {
      return {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
        time: new Date().getTime()
      }
    }
  }
}