<template>
  <div class="scroll-view" @scroll="scroll">
    <slot/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        scrollTop: 0
      }
    },
    methods: {
      scroll(e) {
        const scrollTop = e.target.scrollTop;
        if (scrollTop > this.scrollTop) {
          this.$emit('down', scrollTop);
          if (e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight) {
            this.$emit('bottom', scrollTop)
          }
        } else {
          this.$emit('up', scrollTop);
          if (!scrollTop) {
            this.$emit('top', scrollTop)
          }
        }
        this.scrollTop = scrollTop
      }
    }
  }
</script>

<style>
  .scroll-view {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>