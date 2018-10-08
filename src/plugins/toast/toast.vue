<template>
  <div class="toast-wrapper">
    <div class="toast">{{content}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      content: String
    }
  }
</script>

<style>
  .toast-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 24%;
    z-index: 9999;
    text-align: center;
    transition: .4s;
    & > .toast {
      display: inline-block;
      max-width: 80%;
      padding: .5rem .8rem;
      background: #444;
      border-radius: .1rem;
      word-break: break-all;
      font-size: .9rem;
      color: #fff;
      transition: inherit;
    }
    &.v-enter > .toast, &.v-leave-to > .toast {
      opacity: 0;
      transform: scale(0);
    }
  }
</style>