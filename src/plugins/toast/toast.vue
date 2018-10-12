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
    top: 50%;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .4s;
    pointer-events: none;
  }
  .toast {
    max-width: 80%;
    padding: .5rem .8rem;
    background: #000000bd;
    border-radius: .1rem;
    word-break: break-all;
    font-size: .9rem;
    color: #fff;
    transition: inherit;
  }
  .v-enter > .toast, .v-leave-to > .toast {
    opacity: 0;
    transform: scale(0);
  }
</style>