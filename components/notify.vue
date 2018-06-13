<template>
  <transition-group class="notify-wrapper" tag="ul">
    <li class="notify"
        v-for="item in list"
        v-text="item.text"
        :class="item.type"
        :key="item.timer">
    </li>
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
            this.list.splice(this.list.indexOf(item), 1);
          }, time)
        };
        this.list.push(item);
      },
      $notifySuccess(text, time) {
        this.$notify(text, time, 'success');
      },
      $notifyError(text, time) {
        this.$notify(text, time, 'error');
      }
    }
  }
</script>

<style lang="stylus">
  .notify-wrapper {
    list-style none
    position fixed
    left 0
    top 0
    z-index 999
    width 100%
    font-size .9rem
    text-align center
    > .notify {
      margin 5px
      padding .7rem 1rem
      border-radius .4rem
      background #eee
      box-shadow 0 0 4px alpha(#000, .4)
      color #222
      transition .5s
      &.success {
        background #32b464
        color #fff
      }
      &.error {
        background #b4323c
        color #fff
      }
      &.v-enter
      &.v-leave-to {
        transform translateY(-100%)
        opacity 0
      }
    }
  }
</style>