<template>
  <layer class="lock" @touchmove.native.prevent>
    <loader/>
  </layer>
</template>

<script>
  import Layer from '../../components/layer.vue'
  import Loader from '../../components/loader.vue'

  export default {
    components: {
      Layer,
      Loader
    }
  }
</script>

<style>
  .lock {
    z-index: 999;
    background: #00000012;
    & > .loader {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 2rem;
      height: 2rem;
      margin: auto;
      color: #00000099;
    }
  }
</style>