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
            this.recordPoint(this.horizontalMoveRecords, point, 'x')
          }
          if (this.vertical) {
            this.recordPoint(this.verticalMoveRecords, point, 'y')
          }
        }
      },
      onTouchEnd() {
        if (this.touchState) {
          let horizontalVelocity = 0, verticalVelocity = 0;
          if (this.horizontal) {
            horizontalVelocity = this.computeVelocity(this.horizontalMoveRecords, 'x')
          }
          if (this.vertical) {
            verticalVelocity = this.computeVelocity(this.verticalMoveRecords, 'y')
          }
          this.$emit('release', horizontalVelocity, verticalVelocity);
          this.horizontalMoveRecords = [];
          this.verticalMoveRecords = [];
          this.touchState = 0
        }
      },
      getPoint(e) {
        return {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY,
          time: new Date().getTime()
        }
      },
      recordPoint(records, point, xy) {
        const distance1 = point[xy] - records[0][xy];
        const distance2 = point[xy] - records[records.length - 1][xy];
        if (distance1 > 0 && distance2 < 0 || distance1 < 0 && distance2 > 0) {
          records.length = 0
        } else if (records.length >= 4) {
          records.shift()
        }
        records.push(point)
      },
      computeVelocity(moveRecords, xy) {
        const distance = moveRecords[moveRecords.length - 1][xy] - moveRecords[0][xy];
        const time = moveRecords[moveRecords.length - 1].time - moveRecords[0].time;
        return distance / time
      }
    }
  }
</script>