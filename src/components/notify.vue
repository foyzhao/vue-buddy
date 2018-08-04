<template>
  <transition-group tag="ul" class="notify-wrapper">
    <li class="notify"
        v-for="item in list"
        :key="item.timer"
        :class="item.type"
        v-text="item.text"/>
  </transition-group>
</template>

<script>
  export default {
    data() {
      return {
        list: []
      }
    },
    methods: {
      $notify(text, time = 2000, type = 'info') {
        const item = {
          text,
          type,
          timer: setTimeout(() => {
            this.list.splice(this.list.indexOf(item), 1)
          }, time)
        };
        this.list.push(item)
      },
      $notifySuccess(text, time) {
        this.$notify(text, time, 'success')
      },
      $notifyError(text, time) {
        this.$notify(text, time, 'error')
      }
    }
  }
</script>

<style>
  .notify-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    list-style: none;
    width: 100%;
    margin: 0;
    padding: 0;
    & > .notify {
      margin: .3rem;
      padding: .7rem 1rem;
      border-radius: .2rem;
      background: #fff;
      box-shadow: 0 0 6px #00000060;
      word-break: break-all;
      text-align: center;
      font-size: .9rem;
      color: #222;
      transition: .4s;
      &.success {
        background: #32b464;
        color: #fff;
      }
      &.error {
        background: #e33338;
        color: #fff;
      }
      &.v-enter, &.v-leave-to {
        transform: translateY(-100%);
        opacity: 0;
      }
    }
  }
</style>