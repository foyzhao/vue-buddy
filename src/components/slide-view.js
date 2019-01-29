export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    roomLeft: Number,
    roomRight: Number,
    roomTop: Number,
    roomBottom: Number,
    dampingLeft: Number,
    dampingRight: Number,
    dampingTop: Number,
    dampingBottom: Number
  },
  data() {
    return {
      downPoint: null,
      detected: false,
      ignored: false,
      targetWidth: 0,
      targetHeight: 0,
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
      if (e.touches.length > 1) { // ignore multiple touch
        return
      }
      this.downPoint = this.getPoint(e);
      this.detected = false;
      this.ignored = false;
      this.horizontalPointRecords = [];
      this.verticalPointRecords = []
    },
    onTouchMove(e) {
      if (!this.detected) {
        this.detectTouch(e)
      }
      if (this.ignored) {
        return
      }
      e.preventDefault();
      e.stopPropagation();
      const point = this.getPoint(e);
      let offsetX = 0;
      let offsetY = 0;
      if (this.roomLeft >= 0 || this.roomRight >= 0) {
        offsetX = point.x - this.downPoint.x;
        // records
        if (this.horizontalPointRecords.length > 1) {
          const recentDirection = this.horizontalPointRecords[1].x - this.horizontalPointRecords[0].x;
          const currentDirection = point.x - this.horizontalPointRecords[this.horizontalPointRecords.length - 1].x;
          if (recentDirection * currentDirection < 0) { // direction changed
            this.horizontalPointRecords = [this.horizontalPointRecords.pop()]
          } else if (this.horizontalPointRecords.length >= 4) { // only record last 4 points
            this.horizontalPointRecords.shift()
          }
        }
        this.horizontalPointRecords.push(point);
        // boundary and damping
        if (offsetX > 0) {
          if (this.roomRight >= 0) {
            if (offsetX > this.roomRight) {
              offsetX = this.roomRight + this.damp(offsetX - this.roomRight, this.dampingLeft, this.targetWidth)
            }
          } else {
            offsetX = this.damp(offsetX, this.dampingLeft, this.targetWidth)
          }
        } else if (offsetX < 0) {
          if (this.roomLeft >= 0) {
            if (offsetX < -this.roomLeft) {
              offsetX = -this.roomLeft + this.damp(offsetX + this.roomLeft, this.dampingRight, this.targetWidth)
            }
          } else {
            offsetX = this.damp(offsetX, this.dampingRight, this.targetWidth)
          }
        }
      }
      if (this.roomTop >= 0 || this.roomBottom >= 0) {
        offsetY = point.y - this.downPoint.y;
        // records
        if (this.verticalPointRecords.length > 1) {
          const recentDirection = this.verticalPointRecords[1].y - this.verticalPointRecords[0].y;
          const currentDirection = point.y - this.verticalPointRecords[this.verticalPointRecords.length - 1].y;
          if (recentDirection * currentDirection < 0) { // direction changed
            this.verticalPointRecords = [this.verticalPointRecords.pop()]
          } else if (this.verticalPointRecords.length >= 4) { // only record last 4 points
            this.verticalPointRecords.shift()
          }
        }
        this.verticalPointRecords.push(point);
        // boundary and damping
        if (offsetY > 0) {
          if (this.roomBottom >= 0) {
            if (offsetY > this.roomBottom) {
              offsetY = this.roomBottom + this.damp(offsetY - this.roomBottom, this.dampingTop, this.targetHeight)
            }
          } else {
            offsetY = this.damp(offsetY, this.dampingTop, this.targetHeight)
          }
        } else if (offsetY < 0) {
          if (this.roomTop >= 0) {
            if (offsetY < -this.roomTop) {
              offsetY = -this.roomTop + this.damp(offsetY + this.roomTop, this.dampingBottom, this.targetHeight)
            }
          } else {
            offsetY = this.damp(offsetX, this.dampingBottom, this.targetHeight)
          }
        }
      }
      this.$emit('slide', offsetX, offsetY)
    },
    onTouchEnd() {
      if (!this.detected || this.ignored) {
        return
      }
      let velocityX = 0;
      let velocityY = 0;
      if (this.roomLeft >= 0 || this.roomRight >= 0) {
        const firstPoint = this.horizontalPointRecords.shift();
        const lastPoint = this.horizontalPointRecords.pop();
        velocityX = (lastPoint.x - firstPoint.x) / (lastPoint.timestamp - firstPoint.timestamp)
      }
      if (this.roomTop >= 0 || this.roomBottom >= 0) {
        const firstPoint = this.verticalPointRecords.shift();
        const lastPoint = this.verticalPointRecords.pop();
        velocityY = (lastPoint.y - firstPoint.y) / (lastPoint.timestamp - firstPoint.timestamp)
      }
      this.$emit('stop', velocityX, velocityY)
    },
    detectTouch(e) {
      this.detected = true;
      const point = this.getPoint(e);
      const offsetX = point.x - this.downPoint.x;
      const offsetY = point.y - this.downPoint.y;
      if (Math.abs(offsetX) > Math.abs(offsetY)) { // horizontal
        if (this.roomLeft >= 0 || this.roomRight >= 0) {
          if (offsetX < 0) { // slide left
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
          } else { // slide right
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
        } else {
          this.ignored = true;
          return
        }
      } else { // vertical
        if (this.roomTop >= 0 || this.roomBottom >= 0) {
          if (offsetY < 0) { // slide up
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
          } else { // slide down
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
        } else {
          this.ignored = true;
          return
        }
      }
      // handle this touch event
      if (this.roomLeft >= 0 || this.roomRight >= 0) {
        this.targetWidth = e.currentTarget.clientWidth;
        this.horizontalPointRecords.push(this.downPoint)
      }
      if (this.roomTop >= 0 || this.roomBottom >= 0) {
        this.targetHeight = e.currentTarget.clientHeight;
        this.verticalPointRecords.push(this.downPoint)
      }
      this.$emit('start')
    },
    damp(value, ratio, length) {
      if (ratio >= 0 && ratio < 1) {
        return Math.tanh(value / length) * length * (1 - ratio)
      }
      return 0
    },
    getPoint(e) {
      return {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
        timestamp: new Date().getTime()
      }
    }
  }
}