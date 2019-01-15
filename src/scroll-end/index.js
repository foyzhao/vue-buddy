export default {
  bind(el, binding) {
    console.warn('vue-buddy: v-scroll-end directive is deprecated, please use scroll-view component instead.');
    let scrollTop = el.scrollTop || 0;
    el.onscroll = function (e) {
      if (binding.modifiers.up && el.scrollTop < scrollTop) {
        binding.value(e, el.scrollTop, scrollTop)
      }
      if (binding.modifiers.down && el.scrollTop > scrollTop) {
        binding.value(e, el.scrollTop, scrollTop)
      }
      if (binding.modifiers.top && !el.scrollTop) {
        binding.value(e, el.scrollTop, scrollTop)
      }
      if (binding.modifiers.end && el.scrollTop + el.clientHeight === el.scrollHeight) {
        binding.value(e, el.scrollTop, scrollTop)
      }
      scrollTop = el.scrollTop
    }
  },
  unbind(el) {
    el.onscroll = null
  }
}