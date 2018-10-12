<template>
  <div class="lock" @touchmove.prevent>
    <loader/>
  </div>
</template>

<script>
  import Loader from '../../components/loader.vue'

  export default {
    components: {
      Loader
    }
  }
</script>

<style>
  .lock {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #00000010;
    transition: .4s;
    & > .loader {
      width: 2rem;
      height: 2rem;
      color: #00000099;
    }
  }
</style>