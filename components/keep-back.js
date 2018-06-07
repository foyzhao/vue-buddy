export default {
  name: 'keep-back',
  abstract: true,
  created() {
    this.cache = {};
  },
  render() {
    const slots = this.$slots.default;
    let vNode;
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      if (slot && (slot.componentOptions || (slot.isComment && slot.asyncFactory))) {
        vNode = slot;
        break;
      }
    }
    if (vNode && vNode.componentOptions && this.$route) {
      const key = this.$route.path;
      if (this.cache[key]) {
        vNode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vNode;
      }
      vNode.data.keepAlive = true;
    }
    return vNode || (slots && slots[0]);
  },
  watch: {
    $route() {
      const path = this.$route.path;
      for (const key in this.cache) {
        if (key !== path && key.substr(0, path.length) === path) {
          this.cache[key].componentInstance.$destroy();
          delete this.cache[key];
        }
      }
    }
  },
  destroyed() {
    for (const key in this.cache) {
      this.cache[key].componentInstance.$destroy();
      this.cache[key] = null;
    }
    this.cache = null;
  }
}