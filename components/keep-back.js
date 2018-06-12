export default {
  name: 'keep-back',
  abstract: true,
  created() {
    this.keys = [history.state.key];
    this.cache = {};
  },
  render() {
    const slots = this.$slots.default;
    if (!slots || !slots.length) {
      return
    }
    let vNode;
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      if (slot && (slot.componentOptions || (slot.isComment && slot.asyncFactory))) {
        vNode = slot;
        break;
      }
    }
    if (vNode && vNode.componentOptions && this.$route) {
      const key = history.state.key + '-' + vNode.tag;
      if (this.cache[key]) {
        vNode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vNode;
      }
      vNode.data.keepAlive = true;
    }
    return vNode || slots[0];
  },
  methods: {
    clearCache(k) {
      for (const key in this.cache) {
        if (!k || key.indexOf(k) === 0) {
          this.cache[key].componentInstance.$destroy();
          delete this.cache[key];
        }
      }
    }
  },
  watch: {
    $route(to, from) {
      const key = history.state.key;
      const index = this.keys.indexOf(key);
      if (index >= 0) {
        this.keys.splice(index + 1).forEach(this.clearCache);
      } else if (from.path.indexOf(to.path) === 0) {
        this.clearCache();
        this.keys = [key];
      } else {
        this.keys.push(key);
      }
    }
  },
  destroyed() {
    this.clearCache();
    this.keys = null;
    this.cache = null;
  }
}