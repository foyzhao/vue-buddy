<template>
  <transition>
    <layer class="dialog-wrapper" @click="close">
      <div class="dialog-box">
        <span class="close" v-if="$listeners.close" @click="$emit('close')">✕</span>
        <header class="header">
          <slot name="header"/>
        </header>
        <div class="body" v-scroll.end="() => $emit('scroll-end')">
          <slot/>
        </div>
        <footer class="footer">
          <slot name="footer"/>
        </footer>
      </div>
    </layer>
  </transition>
</template>

<script>
  export default {
    props: {
      nailed: Boolean
    },
    methods: {
      close() {
        if (!this.nailed) {
          this.$emit('close')
        }
      }
    }
  }
</script>

<style>
  .dialog-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #00000088;
    transition: .2s;
    &.v-enter, &.v-leave-to {
      opacity: 0;
      & > .dialog-box {
        transform: scale(0, 0);
      }
    }
  }
  .dialog-box {
    position: relative;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    transition: .2s;
    & > .close {
      position: absolute;
      right: .2rem;
      top: .2rem;
      z-index: 10;
      width: 1.6rem;
      height: 1.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #00000088;
      border-radius: 100%;
      text-align: center;
      line-height: 0;
      color: #fff;
    }
    & > .body {
      flex: 1 1 auto;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>