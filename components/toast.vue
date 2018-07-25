<template>
  <transition>
    <div class="toast-wrapper" v-if="queue.length">
      <p class="toast" v-html="queue[0]"/>
    </div>
  </transition>
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
          .then(() => this.queue.shift());
      }
    }
  }
</script>

<style lang="stylus">
  .toast-wrapper {
    position fixed
    left 0
    right 0
    bottom 24%
    z-index 9999
    text-align center
    transition .4s
    &.v-enter
    &.v-leave-to {
      transform translateY(20px)
      opacity 0
    }
    > .toast {
      display inline-block
      margin 0 12%
      padding .5rem .8rem
      background #444
      border-radius 2px
      word-break break-all
      font-size .9rem
      color #fff
    }
  }
</style>