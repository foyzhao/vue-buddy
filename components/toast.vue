<template>
  <transition>
    <div v-if="queue.length">
      <p>{{queue[0]}}</p>
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

<style lang="stylus" scoped>
  div {
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
    p {
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