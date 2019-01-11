<template functional>
  <span :class="['loader', {center: props.center !== undefined, inline: props.inline !== undefined}]"/>
</template>

<style>
  .loader {
    display: block;
    width: 1em;
    height: 1em;
    margin: 1rem auto;
    box-sizing: border-box;
    border-width: 2px;
    border-style: solid;
    border-left-color: #ffffff88;
    border-top-color: #ffffff88;
    border-right-color: #ffffff88;
    border-radius: 100%;
    animation: spin 1s infinite linear;
  }
  .loader.center {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1.6em;
    height: 1.6em;
    margin: auto;
  }
  .loader.inline {
    display: inline-block;
    margin: 0;
    vertical-align: middle;
  }
</style>