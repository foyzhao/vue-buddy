<template functional>
  <span class="loader" :class="props.size"/>
</template>

<style>
  .loader {
    display: inline-block;
    box-sizing: border-box;
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    border-width: 2px;
    border-style: solid;
    border-left-color: #ffffff88;
    border-top-color: #ffffff88;
    border-right-color: #ffffff88;
    animation: spin 1s infinite linear;
    &.big {
      width: 2rem;
      height: 2rem;
    }
  }
</style>