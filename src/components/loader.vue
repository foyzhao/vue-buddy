<template functional>
  <span class="loader"/>
</template>

<style>
  .loader {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    box-sizing: border-box;
    border-width: 2px;
    border-style: solid;
    border-left-color: #ffffff88;
    border-top-color: #ffffff88;
    border-right-color: #ffffff88;
    border-radius: 100%;
    animation: spin 1s infinite linear;
  }
</style>