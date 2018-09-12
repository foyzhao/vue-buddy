<template>
  <ul class="indicator" :class="type">
    <li class="item" v-for="i in number" :key="i" :class="{current: current === i - 1}"/>
  </ul>
</template>

<script>
  export default {
    props: {
      type: String,
      number: Number,
      current: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style>
  .indicator {
    margin: 0;
    padding: 0;
    line-height: 0;
    text-align: center;
    & > .item {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin: 0 4px;
      border-radius: 4px;
      background: #00000066;
      vertical-align: middle;
      transition: .2s;
      &.current {
        background: #000000;
      }
    }
    &.dashed > .item {
      height: 3px;
      border-radius: 0;
    }
    &.divider {
      display: flex;
      & > .item {
        flex: 1 0 0;
        height: 2px;
        margin: 0;
        border-radius: 0;
      }
    }
  }
</style>