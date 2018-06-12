<template>
  <transition-group name="list" tag="ul">
    <li v-for="item in list"
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
      notify(text, type, time = 2000) {
        const item = {
          text,
          type,
          timer: setTimeout(() => {
            this.list.splice(this.list.indexOf(item), 1);
          }, time)
        };
        this.list.push(item);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  ul {
    list-style none
    position fixed
    left 0
    top 0
    z-index 999
    width 100%
    font-size .9rem
    text-align center
    li {
      margin 5px
      padding .7rem 1rem
      border-radius .4rem
      background #eee
      box-shadow 0 0 4px alpha(#000, .4)
      color #222
      &.success {
        background #32b464
        color #fff
      }
      &.error {
        background #b4323c
        color #fff
      }
    }
  }
  .list-enter-active,
  .list-leave-active {
    transition all .5s
    transform translateY(0)
  }
  .list-enter,
  .list-leave-to {
    opacity 0
    transform translateY(-100%)
  }
</style>