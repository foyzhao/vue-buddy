<template>
  <div class="layer" v-scroll.end="() => $emit('scroll-end')" @click.self="$emit('click')">
    <slot/>
  </div>
</template>

<style>
  .layer {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    overflow: auto;
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
  }
</style>