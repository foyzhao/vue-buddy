<template>
  <div class="dialog-wrapper" @click.self="close">
    <div class="dialog">
      <span class="close" v-if="closeable" @click="close">✕</span>
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
  </div>
</template>

<script>
  import Scroll from '../directives/scroll'

  export default {
    inject: {
      closeLayer: {
        default: null
      }
    },
    props: {
      closeable: Boolean
    },
    methods: {
      close() {
        if (this.closeable) {
          if (this.closeLayer) {
            this.closeLayer()
          }
          this.$emit('close')
        }
      }
    },
    directives: {
      Scroll
    }
  }
</script>

<style>
  .dialog-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background: #00000080;
    transition: .2s;
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
    &.v-enter, &.v-leave-to {
      background: #00000000;
      & > .dialog-box {
        transform: scale(0, 0);
      }
    }
  }
  .dialog {
    position: relative;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
    transition: .2s;
    & > .close {
      position: absolute;
      right: .4rem;
      top: .4rem;
      z-index: 10;
      width: 1.6rem;
      height: 1.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #00000088;
      border-radius: 100%;
      line-height: 0;
      color: #fff;
    }
    & > .body {
      flex: 1 1 auto;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
  .v-enter > .dialog, .v-leave-to > .dialog {
    transform: scale(0, 0);
  }
</style>