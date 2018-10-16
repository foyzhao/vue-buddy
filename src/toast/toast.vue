<template functional>
  <div class="toast">{{props.message}}</div>
</template>

<style>
  .toast {
    max-width: 80%;
    padding: .5rem .8rem;
    background: #000000bd;
    border-radius: .1rem;
    text-align: center;
    font-size: .9rem;
    color: #fff;
    word-break: break-all;
  }
</style>