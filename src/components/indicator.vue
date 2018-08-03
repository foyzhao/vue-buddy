<template>
  <ul class="indicator">
    <li v-for="i in total"
        :class="{active: current === i - 1}"
        :style="itemStyle"
        :key="i"></li>
  </ul>
</template>

<script>
  export default {
    props: {
      current: Number,
      total: Number,
      color: String,
    },
    computed: {
      itemStyle() {
        return this.color && {
          backgroundColor: this.color
        }
      }
    }
  }
</script>

<style lang="stylus">
  .indicator {
    padding 8px
    line-height 0
    text-align center
    li {
      display inline-block
      width 6px
      height @width
      margin 0 (@width / 2)
      border-radius @width
      background #fff
      opacity .4
      transition .2s
      &.active {
        opacity 1
        box-shadow 1px 1px 1px rgba(0, 0, 0, .2)
      }
    }
    &.dashed {
      li {
        height 2px
        border-radius 0
      }
    }
    &.divider {
      display flex
      padding 0
      li {
        flex 1 0 0
        height 2px
        margin 0
        border-radius 0
      }
    }
  }
</style>