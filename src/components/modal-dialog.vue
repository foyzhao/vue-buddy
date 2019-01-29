<template>
  <div class="modal-dialog">
    <span class="close" v-if="cancelable || closeable" @click="close"/>
    <header class="header">
      <slot name="header"/>
    </header>
    <scroll-view class="body" @bottom="$emit('scroll-bottom')">
      <slot/>
    </scroll-view>
    <footer class="footer">
      <slot name="footer"/>
    </footer>
  </div>
</template>

<script>
  import ScrollView from './scroll-view'

  export default {
    components: {
      ScrollView
    },
    inject: {
      cancelable: {
        default: false
      },
      closeLayer: {
        default: null
      }
    },
    props: {
      closeable: Boolean
    },
    methods: {
      close() {
        if (this.closeLayer) {
          this.closeLayer()
        } else {
          this.$emit('close')
        }
      }
    }
  }
</script>

<style>
  .modal-dialog {
    position: relative;
    width: 80%;
    max-height: 86%;
    background: #fff;
    display: flex;
    flex-direction: column;
    > .close {
      position: absolute;
      right: .4rem;
      top: .4rem;
      z-index: 10;
      width: 1rem;
      height: 1rem;
      padding: 0.4rem;
      background: #00000088;
      border-radius: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      &:before, &:after {
        width: 100%;
        height: 0;
        border-top-width: 2px;
        border-top-style: solid;
        content: '';
      }
      &:before {
        transform: rotate(45deg);
      }
      &:after {
        margin-top: -2px;
        transform: rotate(-45deg);
      }
    }
    > .body {
      flex: 1 1 auto;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
</style>