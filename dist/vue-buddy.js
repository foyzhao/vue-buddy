!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("vue")):"function"==typeof define&&define.amd?define(["vue"],e):"object"==typeof exports?exports.VueBuddy=e(require("vue")):t.VueBuddy=e(t.Vue)}(window,function(t){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=14)}([function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(e,n){e.exports=t},function(t,e,n){},function(t,e,n){"use strict";var i=n(0);n.n(i).a},function(t,e,n){"use strict";var i=n(1);n.n(i).a},function(t,e,n){"use strict";var i=n(2);n.n(i).a},function(t,e,n){"use strict";var i=n(3);n.n(i).a},function(t,e,n){"use strict";var i=n(4);n.n(i).a},function(t,e,n){"use strict";var i=n(5);n.n(i).a},function(t,e,n){"use strict";n.r(e);var i={};n.r(i),n.d(i,"getUrlParams",function(){return U});var r={};n.r(r),n.d(r,"getUUID",function(){return B});var o={};n.r(o),n.d(o,"formatDate",function(){return q});var s={};n.r(s),n.d(s,"copyToClipboard",function(){return A});var a={};n.r(a),n.d(a,"isValidMobileNumber",function(){return K});n(7);var c=n(6),u=n.n(c);function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function h(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e=Object.assign({gravity:"center",transition:function(t){if(t.transition||!t.gravity)return"v";if("top"===t.gravity)return"slide-down-inner";if("bottom"===t.gravity)return"slide-up-inner";if("left"===t.gravity)return"slide-right-inner";if("right"===t.gravity)return"slide-left-inner";return"v"}(e),cancelable:!0,style:{},props:{},listeners:{}},e);var n=new u.a({name:"Layer",data:{open:!0},provide:{cancelable:e.cancelable,closeLayer:i},render:function(n){var r=this;if(this.open)return n("transition",{props:{name:e.transition,appear:!0},on:{afterLeave:function(){return r.$destroy()}}},[n("div",{class:["layer",e.name,e.gravity,{transition:!!e.transition}],style:e.style,on:{click:function(t){t.target===t.currentTarget&&e.cancelable&&i()}}},[n(t,{props:e.props,on:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){l(t,e,n[e])})}return t}({close:i},e.listeners)})])])},mounted:function(){document.body.appendChild(this.$el)},destroyed:function(){document.body.removeChild(this.$el)}}).$mount();function i(){n&&(n=n.open=null)}return i}var d={open:h,install:function(t){t.prototype.$open=h}};n(8);function f(t,e,n,i,r,o,s,a){var c,u="function"==typeof t?t.options:t;if(e&&(u.render=e,u.staticRenderFns=n,u._compiled=!0),i&&(u.functional=!0),o&&(u._scopeId="data-v-"+o),s?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(s)},u._ssrRegister=c):r&&(c=a?function(){r.call(this,this.$root.$options.shadowRoot)}:r),c)if(u.functional){u._injectStyles=c;var l=u.render;u.render=function(t,e){return c.call(e),l(t,e)}}else{var h=u.beforeCreate;u.beforeCreate=h?[].concat(h,c):[c]}return{exports:t,options:u}}var m=f({},function(t,e){return(0,e._c)("span",{staticClass:"loader"})},[],!0,null,null,null);m.options.__file="loader.vue";var p=m.exports,v={},g=null;function y(t){t&&(v[t]=1),g||(g=d.open(p,{name:"lock-layer",cancelable:!1}))}function b(t){g&&(t&&"string"==typeof t&&delete v[t],Object.keys(v).length||(g(),g=null))}var x={lock:y,unlock:b,install:function(t){t.prototype.$lock=y,t.prototype.$unlock=b}},w=(n(9),f({},function(t,e){return(0,e._c)("div",{staticClass:"toast"},[e._v(e._s(e.props.message))])},[],!0,null,null,null));w.options.__file="toast.vue";var _=w.exports;function $(t){return($="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function E(t,e){return e&&"object"!==$(e)&&(e={time:e}),e=Object.assign({name:"popup-layer",gravity:"golden",time:2e3},e),"string"==typeof t&&(e.props={message:t},t=_),new Promise(function(n){var i=d.open(t,e);setTimeout(function(){i(),n()},e.time)})}E.install=function(t){t.prototype.$toast=E};var P=E,C={bind:function(t,e){var n=t.scrollTop||0;t.onscroll=function(i){e.modifiers.up&&t.scrollTop<n&&e.value(i,t.scrollTop,n),e.modifiers.down&&t.scrollTop>n&&e.value(i,t.scrollTop,n),e.modifiers.top&&!t.scrollTop&&e.value(i,t.scrollTop,n),e.modifiers.end&&t.scrollTop+t.clientHeight===t.scrollHeight&&e.value(i,t.scrollTop,n),n=t.scrollTop}},unbind:function(t){t.onscroll=null}},S={inject:{cancelable:{default:!1},closeLayer:{default:null}},props:{closeable:Boolean},directives:{scroll:C},methods:{close:function(){this.closeLayer?this.closeLayer():this.$emit("close")}}},M=(n(10),f(S,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"modal-dialog"},[t.cancelable||t.closeable?n("span",{staticClass:"close",on:{click:t.close}}):t._e(),t._v(" "),n("header",{staticClass:"header"},[t._t("header")],2),t._v(" "),n("div",{directives:[{name:"scroll",rawName:"v-scroll.end",value:function(){return t.$emit("scroll-end")},expression:"() => $emit('scroll-end')",modifiers:{end:!0}}],staticClass:"body"},[t._t("default")],2),t._v(" "),n("footer",{staticClass:"footer"},[t._t("footer")],2)])},[],!1,null,null,null));M.options.__file="modal-dialog.vue";var T=M.exports,O={props:{type:String,number:Number,current:{type:Number,default:0}}},L=(n(11),f(O,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"indicator",class:t.type},t._l(t.number,function(e){return n("li",{key:e,staticClass:"item",class:{current:t.current===e-1}})}))},[],!1,null,null,null));L.options.__file="indicator.vue";var k=L.exports,j=f({name:"keep-back",abstract:!0,created:function(){this.keys=[],this.cache={},history.state&&history.state.key&&this.keys.push(history.state.key)},render:function(){var t=this.$slots.default;if(t&&t.length){for(var e,n=0;n<t.length;n++){var i=t[n];if(i&&(i.componentOptions||i.isComment&&i.asyncFactory)){e=i;break}}if(e&&e.componentOptions&&this.$route&&history.state&&history.state.key){var r=history.state.key+"-"+e.tag;this.cache[r]?e.componentInstance=this.cache[r].componentInstance:this.cache[r]=e,e.data.keepAlive=!0}return e||t[0]}},methods:{clearCache:function(t){for(var e in this.cache)t&&0!==e.indexOf(t)||(this.cache[e].componentInstance.$destroy(),delete this.cache[e])}},watch:{$route:function(t,e){if(history.state&&history.state.key){var n=history.state.key,i=this.keys.indexOf(n);i>=0?this.keys.splice(i+1).forEach(this.clearCache):0===e.path.indexOf(t.path)?(this.clearCache(),this.keys=[n]):this.keys.push(n)}}},destroyed:function(){this.clearCache(),this.keys=this.cache=null}},void 0,void 0,!1,null,null,null);j.options.__file="keep-back.vue";var z=j.exports,N={props:{number:Number,current:{type:Number,default:0},interval:Number},data:function(){return{mCurrent:this.current,mNumber:this.number,width:0,state:0,offset:0,downPoint:null}},computed:{viewWrapperStyle:function(){return{transform:"translateX(".concat(this.offset-this.width*this.mCurrent,"px)"),transition:2===this.state?"none":".2s"}}},watch:{current:function(t,e){t<0||t&&t>=this.mNumber?this.$emit("update:current",e):this.mCurrent=t},number:function(t){this.mNumber=t,this.mCurrent>=this.mNumber&&(this.mCurrent=Math.max(0,t-1))},mCurrent:function(t){this.$emit("update:current",t)}},created:function(){document.addEventListener("touchmove",this.onTouchMove,{passive:!1}),document.addEventListener("touchend",this.onTouchEnd),window.addEventListener("resize",this.onResize)},mounted:function(){var t=this;this.onResize(),void 0===this.number&&this.$nextTick(function(){t.mNumber=t.$el.children[0].children.length}),this.setInterval()},destroyed:function(){this.clearInterval(),document.removeEventListener("touchmove",this.onTouchMove),document.removeEventListener("touchend",this.onTouchEnd),window.removeEventListener("resize",this.onResize)},methods:{getPoint:function(t){return{x:t.touches[0].pageX,y:t.touches[0].pageY}},onTouchStart:function(t){void 0===this.number&&(this.mNumber=this.$el.children[0].children.length),this.width||this.onResize(),this.mNumber>0&&(this.state=1,this.downPoint=this.getPoint(t),this.downPoint.time=(new Date).getTime())},onTouchMove:function(t){if(1===this.state){var e=this.getPoint(t);Math.abs(e.x-this.downPoint.x)>Math.abs(e.y-this.downPoint.y)?(t.preventDefault(),this.state=2,this.clearInterval()):this.state=0}else if(2===this.state){t.preventDefault();var n=this.getPoint(t);this.offset=n.x-this.downPoint.x,(0===this.mCurrent&&n.x>this.downPoint.x||this.mCurrent===this.mNumber-1&&n.x<this.downPoint.x)&&(this.offset=Math.tanh(this.offset/400)*this.width/2)}},onTouchEnd:function(){if(2===this.state){this.state=0;var t=this.offset/((new Date).getTime()-this.downPoint.time);this.mCurrent>0&&(t>.4||this.offset>this.width/2)&&this.mCurrent--,this.mCurrent<this.mNumber-1&&(t<-.4||this.offset<this.width/-2)&&this.mCurrent++,this.offset=0,this.setInterval()}},onResize:function(){this.width=this.$el.clientWidth},setInterval:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){var t=this;this.interval>0&&(this.timer=setInterval(function(){t.mCurrent<t.mNumber-1?t.mCurrent++:t.mCurrent=0},this.interval))}),clearInterval:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){clearInterval(this.timer)})}},R=(n(12),f(N,function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"view-pager",on:{touchstart:this.onTouchStart}},[e("div",{staticClass:"view-wrapper",style:this.viewWrapperStyle},[this._t("default")],2),this._v(" "),this._t("cover",null,{current:this.mCurrent,number:this.mNumber})],2)},[],!1,null,null,null));R.options.__file="view-pager.vue";var D=R.exports,H={props:{items:Array,value:[String,Number,Object],horizontal:Boolean,spread:{type:Number,default:2}},data:function(){return{current:this.items?this.items.indexOf(this.value):-1,width:0,height:0,offset:0,state:3}},created:function(){document.addEventListener("touchmove",this.onTouchMove,{passive:!1}),document.addEventListener("touchend",this.onTouchEnd),window.addEventListener("resize",this.measure)},mounted:function(){var t=this;this.$nextTick(function(){return t.measure()})},computed:{itemWidth:function(){return this.width/(2*Math.max(this.spread,0)+1)},itemHeight:function(){return this.height/(2*Math.max(this.spread,0)+1)},itemSize:function(){return this.horizontal?this.itemWidth:this.itemHeight},itemStyle:function(){return this.horizontal?{width:"".concat(this.itemWidth,"px")}:{height:"".concat(this.itemHeight,"px")}},listStyle:function(){if(this.horizontal){var t=this.offset-this.width-this.itemWidth*(this.current-Math.max(this.spread,0));return{padding:"0 ".concat(this.width,"px"),transform:"translateX(".concat(t,"px)"),transition:this.state>1?"none":".2s"}}var e=this.offset-this.height-this.itemHeight*(this.current-Math.max(this.spread,0));return{padding:"".concat(this.height,"px 0"),transform:"translateY(".concat(e,"px)"),transition:this.state>1?"none":".2s"}},indicatorStyle:function(){return this.horizontal?{left:"".concat((this.width-this.itemWidth)/2,"px"),top:0,width:"".concat(this.itemWidth,"px"),height:"100%"}:{left:0,top:"".concat((this.height-this.itemHeight)/2,"px"),width:"100%",height:"".concat(this.itemHeight,"px")}},maxOverScroll:function(){return(this.horizontal?this.width:this.height)/2}},watch:{items:function(t){this.current=t?t.indexOf(this.value):-1},value:function(t){this.current=this.items?this.items.indexOf(t):-1},current:function(t){t>-1&&(this.$emit("input",this.items[t]),this.$emit("change"))}},methods:{measure:function(){this.horizontal?this.width=this.$el.clientWidth:this.height=this.$el.clientHeight},getPoint:function(t){return{x:t.touches[0].pageX,y:t.touches[0].pageY,time:(new Date).getTime()}},onTouchStart:function(t){t.touches.length>1||this.items&&this.items.length&&(this.state=1,this.pending=this.offset,this.downPoint=this.getPoint(t),this.movePoints=[this.downPoint])},onTouchMove:function(t){if(1===this.state){var e=this.getPoint(t),n=Math.abs(e.x-this.downPoint.x)/Math.abs(e.y-this.downPoint.y);this.horizontal&&n>1||!this.horizontal&&n<1?(t.preventDefault(),this.state=2):this.state=0}else if(2===this.state){t.preventDefault();var i=this.getPoint(t);this.distance=this.horizontal?i.x-this.downPoint.x:i.y-this.downPoint.y,this.scroll(this.pending+this.distance),this.movePoints.push(i),this.movePoints.length>4&&this.movePoints.shift()}},onTouchEnd:function(t){if(!t.touches.length)if(2===this.state)if(this.pending+=this.distance,this.movePoints.length>2){var e=this.movePoints.shift(),n=this.movePoints.pop(),i=this.horizontal?n.x-e.x:n.y-e.y;this.slideDistance=i/(n.time-e.time)*160,requestAnimationFrame(this.slide)}else this.adjust();else this.state=0},slide:function(){var t=this.slideDistance/16;this.slideDistance-=t,this.pending+=t,this.scroll(this.pending),Math.abs(this.slideDistance)<10||this.offset>(this.current+.5)*this.itemSize||this.offset<(this.current-this.items.length+.5)*this.itemSize?this.adjust():2===this.state&&requestAnimationFrame(this.slide)},scroll:function(t){var e=Math.max(this.current*this.itemSize,0),n=(this.current-this.items.length+1)*this.itemSize;t>e?t=e+Math.tanh((t-e)/400)*this.maxOverScroll:t<n&&(t=n+Math.tanh((t-n)/400)*this.maxOverScroll),this.offset=t},adjust:function(){var t=Math.round(this.pending/this.itemSize);this.current=Math.min(this.items.length-1,Math.max(this.current-t,0)),this.pending=this.offset=this.state=0}},destroyed:function(){document.removeEventListener("touchmove",this.onTouchMove),document.removeEventListener("touchend",this.onTouchEnd),window.removeEventListener("resize",this.measure)}},I=(n(13),f(H,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wheel",class:{horizontal:t.horizontal},on:{touchstart:t.onTouchStart}},[n("ul",{staticClass:"wheel-list",style:t.listStyle},t._l(t.items,function(e,i){return n("li",{key:i,staticClass:"wheel-item",class:{current:2!==t.state&&t.current===i},style:t.itemStyle,on:{click:function(e){t.current=i}}},[t._t("default",[n("span",[t._v(t._s(e))])],{item:e})],2)})),t._v(" "),n("div",{staticClass:"wheel-cover"}),t._v(" "),n("div",{staticClass:"wheel-indicator",style:t.indicatorStyle})])},[],!1,null,null,null));I.options.__file="wheel.vue";var W=I.exports,V={created:function(){this.$options.onPageEnd&&(this.$onPageEnd=this.$options.onPageEnd.bind(this),window.addEventListener("scroll",this.$scrollListener),this.$scrollListener.binded=!0)},activated:function(){this.$onPageEnd&&!this.$scrollListener.binded&&(window.addEventListener("scroll",this.$scrollListener),this.$scrollListener.binded=!0)},methods:{$scrollListener:function(){var t=document.documentElement;(t.scrollTop||window.pageYOffset||document.body.scrollTop)+t.clientHeight===t.scrollHeight&&this.$onPageEnd()}},deactivated:function(){this.$onPageEnd&&this.$scrollListener.binded&&(window.removeEventListener("scroll",this.$scrollListener),this.$scrollListener.binded=!1)},destroyed:function(){this.$onPageEnd&&this.$scrollListener.binded&&(window.removeEventListener("scroll",this.$scrollListener),this.$scrollListener.binded=!1)}},U=function(t){var e={};if(location.search)for(var n,i=/([^&=]+)=?([^&]*)/g;n=i.exec(location.search.substr(1));)e[n[1]]=decodeURIComponent(n[2].replace(/\+/g," "));return t?e[t]:e},B=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)})},X=["日","一","二","三","四","五","六"],F=["一","二","三","四","五","六","七","八","九","十","十一","十二"],Y={date:"yyyy-MM-dd",time:"HH:mm",datetime:"yyyy-MM-dd HH:mm"},q=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"date";if(!t)return t;"string"==typeof t&&(t=new Date(t.replace(/-/g,"/"))),e=Y[e]||e;var n={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours()%12==0?12:t.getHours()%12,"H+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),S:t.getMilliseconds()};for(var i in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,t.getFullYear().toString().substr(4-RegExp.$1.length))),/(E+)/.test(e)&&(e=e.replace(RegExp.$1,(RegExp.$1.length>1?RegExp.$1.length>2?"星期":"周":"")+X[t.getDay()])),/(MMM+)/.test(e)&&(e=e.replace(RegExp.$1,F[t.getMonth()]+(RegExp.$1.length>3?"月":""))),n)new RegExp("(".concat(i,")")).test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?n[i]:"00".concat(n[i]).substr("".concat(n[i]).length)));return e},A=function(t){var e=document.createElement("input");e.value=t,e.readOnly=!0,document.body.appendChild(e),e.select(),e.setSelectionRange(0,e.value.length),document.execCommand("Copy"),document.body.removeChild(e)},K=function(t){return/^1[3-9][0-9]{9}$/.test(t)};function G(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function J(t){t.use(d),t.use(x),t.use(P),t.component("ModalDialog",T),t.component("Indicator",k),t.component("KeepBack",z),t.component("Loader",p),t.component("ViewPager",D),t.component("Wheel",W),t.directive("scroll",C),t.filter("date",q)}n.d(e,"Util",function(){return Q}),n.d(e,"PageEndMixin",function(){return PageEndMixin}),n.d(e,"install",function(){return J}),n.d(e,"Layer",function(){return d}),n.d(e,"Lock",function(){return x}),n.d(e,"Toast",function(){return P}),n.d(e,"ModalDialog",function(){return T}),n.d(e,"Indicator",function(){return k}),n.d(e,"KeepBack",function(){return z}),n.d(e,"Loader",function(){return p}),n.d(e,"ViewPager",function(){return D}),n.d(e,"Wheel",function(){return W}),n.d(e,"ScrollEnd",function(){return C}),n.d(e,"PageEnd",function(){return V});e.default=J;var Q=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){G(t,e,n[e])})}return t}({},i,r,o,s,a)}])});