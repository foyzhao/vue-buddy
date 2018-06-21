<template>
  <ul class="indicator">
    <li v-for="i in total"
        v-text="number ? i : ''"
        :class="{active: current === i - 1}"
        :style="[itemStyle, current === i - 1 && activeStyle]"
        :key="i"></li>
  </ul>
</template>

<script>
  export default {
    props: {
      current: Number,
      total: Number,
      number: Boolean,
      color: {
        type: String,
        default: '#fff'
      },
      activeColor: {
        type: String,
        default: '#000'
      }
    },
    computed: {
      itemStyle() {
        return {
          color: this.color,
          borderColor: this.color
        }
      },
      activeStyle() {
        return {
          color: this.activeColor,
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
      width 1rem
      height @width
      margin 0 2px
      border 1px solid transparent
      border-radius @width
      font-size .75rem
      line-height @width
      transition .2s
      &:empty {
        width 4px
        height @width
      }
    }
  }
</style>