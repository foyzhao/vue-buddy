<template>
  <div class="toast-wrapper">
    <transition>
      <div class="toast" v-html="queue[0]" v-if="queue.length"/>
    </transition>
  </div>
</template>

<script>
  let deferred = Promise.resolve();

  export default {
    data() {
      return {
        queue: []
      }
    },
    methods: {
      $toast(text, time = 2000) {
        this.queue.push(text);
        return deferred = deferred
          .then(() => new Promise(done => setTimeout(done, time)))
          .then(() => this.queue.shift())
      }
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
    & > .toast {
      display: inline-block;
      max-width: 76%;
      padding: .5rem .8rem;
      background: #444;
      border-radius: .1rem;
      word-break: break-all;
      font-size: .9rem;
      color: #fff;
      transition: .4s;
      &.v-enter, &.v-leave-to {
        transform: translateY(100%);
        opacity: 0;
      }
    }
  }
</style>