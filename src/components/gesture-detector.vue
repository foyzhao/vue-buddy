<script>
  export default {
    abstract: true,
    props: {
      horizontal: {
        type: Boolean,
        default: false
      },
      vertical: {
        type: Boolean,
        default: false
      },
      leftDamping: Number,
      rightDamping: Number,
      topDamping: Number,
      bottomDamping: Number
    },
    data() {
      return {
        targetWidth: 0,
        targetHeight: 0,
        touchState: 0,
        downPoint: null,
        horizontalMoveRecords: [],
        verticalMoveRecords: []
      }
    },
    render() {
      return this.$slots.default[0]
    },
    mounted() {
      this.$el.addEventListener('touchstart', this.onTouchStart);
      this.$el.addEventListener('touchmove', this.onTouchMove);
      this.$el.addEventListener('touchend', this.onTouchEnd)
    },
    destroyed() {
      this.$el.removeEventListener('touchstart', this.onTouchStart);
      this.$el.removeEventListener('touchmove', this.onTouchMove);
      this.$el.removeEventListener('touchend', this.onTouchEnd)
    },
    methods: {
      getPoint(e) {
        return {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY,
          time: new Date().getTime()
        }
      },
      onTouchStart(e) {
        if (e.touches.length > 1 || this.touchState) {
          return
        }
        this.touchState = 1;
        this.targetWidth = this.$el.clientWidth;
        this.targetHeight = this.$el.clientHeight;
        this.downPoint = this.lastMovePoint = this.getPoint(e)
      },
      onTouchMove(e) {
        if (this.touchState === 1) {
          const point = this.getPoint(e);
          const slope = Math.abs(point.x - this.downPoint.x) / Math.abs(point.y - this.downPoint.y);
          if (this.horizontal && this.vertical || this.horizontal && slope > 1 || this.vertical && slope < 1) {
            e.preventDefault();
            this.$emit('press');
            this.horizontalMoveRecords.push(point);
            this.verticalMoveRecords.push(point);
            this.touchState = 2
          } else {
            this.touchState = 0
          }
        } else if (this.touchState === 2) {
          e.preventDefault();
          const point = this.getPoint(e);
          let horizontalDistance = 0;
          let verticalDistance = 0;
          if (this.horizontal) {
            horizontalDistance = point.x - this.downPoint.x;
            const damping = horizontalDistance > 0 ? this.leftDamping : this.rightDamping;
            if (damping >= 1) {
              horizontalDistance = 0
            } else if (damping > 0) {
              horizontalDistance = Math.tanh(horizontalDistance * (1 - damping) / this.targetWidth) * this.targetWidth * (1 - damping)
            }
          }
          if (this.vertical) {
            verticalDistance = point.y - this.downPoint.y;
            const damping = verticalDistance > 0 ? this.topDamping : this.bottomDamping;
            if (damping >= 1) {
              verticalDistance = 0
            } else if (damping > 0) {
              verticalDistance = Math.tanh(verticalDistance * (1 - damping) / this.targetHeight) * this.targetHeight * (1 - damping)
            }
          }
          this.$emit('drag', horizontalDistance, verticalDistance);
          if (this.horizontal) {
            const distance1 = point.x - this.horizontalMoveRecords[0].x;
            const distance2 = point.x - this.horizontalMoveRecords[this.horizontalMoveRecords.length - 1].x;
            if (distance1 > 0 && distance2 < 0 || distance1 < 0 && distance2 > 0) {
              this.horizontalMoveRecords = []
            } else if (this.horizontalMoveRecords.length >= 4) {
              this.horizontalMoveRecords.shift()
            }
            this.horizontalMoveRecords.push(point)
          }
          if (this.vertical) {
            const distance1 = point.y - this.verticalMoveRecords[0].y;
            const distance2 = point.y - this.verticalMoveRecords[this.verticalMoveRecords.length - 1].y;
            if (distance1 > 0 && distance2 < 0 || distance1 < 0 && distance2 > 0) {
              this.verticalMoveRecords = []
            } else if (this.verticalMoveRecords.length >= 4) {
              this.verticalMoveRecords.shift()
            }
            this.verticalMoveRecords.push(point)
          }
        }
      },
      onTouchEnd() {
        if (this.touchState) {
          let horizontalVelocity = 0;
          let verticalVelocity = 0;
          if (this.horizontal) {
            const distance = this.horizontalMoveRecords[this.horizontalMoveRecords.length - 1].x - this.horizontalMoveRecords[0].x;
            const time = this.horizontalMoveRecords[this.horizontalMoveRecords.length - 1].time - this.horizontalMoveRecords[0].time;
            horizontalVelocity = distance / time
          }
          if (this.vertical) {
            const distance = this.horizontalMoveRecords[this.horizontalMoveRecords.length - 1].y - this.horizontalMoveRecords[0].y;
            const time = this.horizontalMoveRecords[this.horizontalMoveRecords.length - 1].time - this.horizontalMoveRecords[0].time;
            verticalVelocity = distance / time
          }
          if (Math.abs(horizontalVelocity) > 0.5 || Math.abs(verticalVelocity) > 0.5) {
            this.$emit('fling', horizontalVelocity, verticalVelocity)
          } else {
            this.$emit('release')
          }
          this.horizontalMoveRecords = [];
          this.verticalMoveRecords = [];
          this.touchState = 0
        }
      }
    }
  }
</script>