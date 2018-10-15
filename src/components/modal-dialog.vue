<template>
  <div class="modal-dialog">
    <!--TODO optimize style-->
    <span class="close" v-if="closeable" @click="closeLayer">✕</span>
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
</template>

<script>
  import ScrollEnd from '../scroll-end'

  export default {
    inject: {
      closeLayer: {
        default: null
      }
    },
    props: {
      closeable: Boolean
    },
    directives: {
      scroll: ScrollEnd
    }
  }
</script>

<style>
  .modal-dialog {
    position: relative;
    width: 86%;
    max-height: 86%;
    display: flex;
    flex-direction: column;
    background: #fff;
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
</style>