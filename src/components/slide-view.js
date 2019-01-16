export default {
  provide() {
    return {
      slideView: this
    }
  },
  inject: {
    cancelable: {
      default: false
    },
    preventSlide: {
      default: null
    }
  },
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
      touchState: 0,
      clientWidth: 0,
      clientHeight: 0,
      downPoint: null,
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
      if (e.touches.length > 1 || this.touchState) {
        return
      }
      this.touchState = 1;
      this.clientWidth = e.currentTarget.clientWidth;
      this.clientHeight = e.currentTarget.clientHeight;
      this.downPoint = this.getPoint(e)
    },
    onTouchMove(e) {
      if (this.touchState === 1) {
        const point = this.getPoint(e);
        const slope = Math.abs(point.x - this.downPoint.x) / Math.abs(point.y - this.downPoint.y);
        if (this.horizontal && this.vertical || this.horizontal && slope > 1 || this.vertical && slope < 1) {
          e.preventDefault();
          this.touchState = 2;
          if (this.horizontal) {
            this.horizontalPointRecords.push(point)
          }
          if (this.vertical) {
            this.verticalPointRecords.push(point)
          }
          this.$emit('press')
        } else {
          this.touchState = 0
        }
      } else if (this.touchState === 2) {
        e.preventDefault();
        const point = this.getPoint(e);
        let offsetX = 0, offsetY = 0;
        if (this.horizontal) {
          offsetX = point.x - this.downPoint.x;
          const damping = offsetX > 0 ? this.dampingLeft : this.dampingRight;
          if (damping >= 1) {
            offsetX = 0
          } else if (damping > 0) {
            offsetX = Math.tanh(offsetX * (1 - damping) / this.clientWidth) * this.clientWidth * (1 - damping)
          }
        }
        if (this.vertical) {
          offsetY = point.y - this.downPoint.y;
          const damping = offsetY > 0 ? this.dampingTop : this.dampingBottom;
          if (damping >= 1) {
            offsetY = 0
          } else if (damping > 0) {
            offsetY = Math.tanh(offsetY * (1 - damping) / this.clientHeight) * this.clientHeight * (1 - damping)
          }
        }
        if (this.horizontal) {
          const totalOffset = point.x - this.horizontalPointRecords[0].x;
          const stepOffset = point.x - this.horizontalPointRecords[this.horizontalPointRecords.length - 1].x;
          if (totalOffset > 0 && stepOffset < 0 || totalOffset < 0 && stepOffset > 0) {
            this.horizontalPointRecords = []
          } else if (this.horizontalPointRecords.length >= 4) {
            this.horizontalPointRecords.shift()
          }
          this.horizontalPointRecords.push(point)
        }
        if (this.vertical) {
          const totalOffset = point.y - this.verticalPointRecords[0].y;
          const stepOffset = point.y - this.verticalPointRecords[this.verticalPointRecords.length - 1].y;
          if (totalOffset > 0 && stepOffset < 0 || totalOffset < 0 && stepOffset > 0) {
            this.verticalPointRecords = []
          } else if (this.verticalPointRecords.length >= 4) {
            this.verticalPointRecords.shift()
          }
          this.verticalPointRecords.push(point)
        }
        this.$emit('slide', offsetX, offsetY)
      }
    },
    onTouchEnd() {
      if (this.touchState) {
        if (this.touchState > 1) {
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
          this.$emit('release', velocityX, velocityY)
        }
        this.horizontalPointRecords = [];
        this.verticalPointRecords = [];
        this.touchState = 0
      }
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