(()=>{var t={228:t=>{t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}},858:t=>{t.exports=function(t){if(Array.isArray(t))return t}},506:t=>{t.exports=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}},575:t=>{t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},100:(t,e,r)=>{var n=r(489),o=r(67);function a(e,r,s){return o()?t.exports=a=Reflect.construct:t.exports=a=function(t,e,r){var o=[null];o.push.apply(o,e);var a=new(Function.bind.apply(t,o));return r&&n(a,r.prototype),a},a.apply(null,arguments)}t.exports=a},913:t=>{function e(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}t.exports=function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}},754:t=>{function e(r){return t.exports=e=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},e(r)}t.exports=e},205:(t,e,r)=>{var n=r(489);t.exports=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&n(t,e)}},430:t=>{t.exports=function(t){return-1!==Function.toString.call(t).indexOf("[native code]")}},67:t=>{t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}},884:t=>{t.exports=function(t,e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t)){var r=[],n=!0,o=!1,a=void 0;try{for(var s,i=t[Symbol.iterator]();!(n=(s=i.next()).done)&&(r.push(s.value),!e||r.length!==e);n=!0);}catch(t){o=!0,a=t}finally{try{n||null==i.return||i.return()}finally{if(o)throw a}}return r}}},521:t=>{t.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},585:(t,e,r)=>{var n=r(8),o=r(506);t.exports=function(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?o(t):e}},489:t=>{function e(r,n){return t.exports=e=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},e(r,n)}t.exports=e},38:(t,e,r)=>{var n=r(858),o=r(884),a=r(379),s=r(521);t.exports=function(t,e){return n(t)||o(t,e)||a(t,e)||s()}},8:t=>{function e(r){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=e=function(t){return typeof t}:t.exports=e=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(r)}t.exports=e},379:(t,e,r)=>{var n=r(228);t.exports=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}},957:(t,e,r)=>{var n=r(754),o=r(489),a=r(430),s=r(100);function i(e){var r="function"==typeof Map?new Map:void 0;return t.exports=i=function(t){if(null===t||!a(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==r){if(r.has(t))return r.get(t);r.set(t,e)}function e(){return s(t,arguments,n(this).constructor)}return e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),o(e,t)},i(e)}t.exports=i}},e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={exports:{}};return t[n](o,o.exports,r),o.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";var t=r(38),e=r.n(t),n=r(575),o=r.n(n),a=r(913),s=r.n(a),i=r(506),u=r.n(i),f=r(205),c=r.n(f),l=r(585),h=r.n(l),p=r(754),y=r.n(p),d=r(957),b=r.n(d);const _=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:32768,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(o()(this,t),e<=0)throw"bufferLength must be >= 1";if(r<1)throw"nChannels must >= 1";this._data=new Float32Array(e*r),this._nChannels=r,this._readPos=0,this._writePos=0}return s()(t,[{key:"getNReadableSamples",value:function(){return this._readPos==this._writePos?0:(this._readPos<this._writePos?this._writePos-this._readPos:this._data.length-this._readPos+this._writePos)/this._nChannels}},{key:"read",value:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=null===e?Array.apply(null,Array(this._nChannels)).map((function(e,r){return new Float32Array(t)})):e,n=Math.min(t,this.getNReadableSamples()),o=this._readPos,a=0;a<n;a++)for(var s=0;s<r.length;s++)o===this._data.length&&(o=0),r[s][a]=this._data[o++];return this._readPos=o,r}},{key:"_resize",value:function(t){for(var e=this.getNReadableSamples()*this._nChannels,r=new Float32Array(t+e),n=this._readPos,o=0;o<e;o++)r[o]=this._data[n++];this._writePos=e,this._readPos=0,this._data=r}},{key:"write",value:function(t){if(!ArrayBuffer.isView(t))throw"Must submit a TypedArray. Received ".concat(t.constructor.name);var e=!1;t.length>this._data.length&&(this._resize(t.length),e=!0);for(var r=this._writePos,n=0;n<t.length;n++)r===this._data.length&&(r=0),this._data[r++]=t[n];return this._writePos=r,[e,this._data.length/this._nChannels]}},{key:"bufferLength",get:function(){return this._data.length/this._nChannels}}]),t}();var v={UNINITIALIZED:1,READY:2,PLAYING:3,STARVED:4};Object.freeze(v);var g=function(t){c()(i,t);var r,n,a=(r=i,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=y()(r);if(n){var o=y()(this).constructor;t=Reflect.construct(e,arguments,o)}else t=e.apply(this,arguments);return h()(this,t)});function i(t){var e;return o()(this,i),(e=a.call(this)).port.onmessage=e._onMessage.bind(u()(e)),e.bufferThreshold,e.state=v.UNINITIALIZED,e}return s()(i,[{key:"process",value:function(t,e,r){return this._updateState(),this.state===v.PLAYING?this._buffer.read(128,e[0]):function(t){for(var e=0;e<t.length;e++)for(var r=t[e],n=0;n<r.length;n++)r[n]=0}(e[0]),!0}},{key:"_updateState",value:function(){var t=this.state;switch(this.state){case v.UNINITIALIZED:return;case v.PLAYING:0===this._buffer.getNReadableSamples()&&(this.state=v.STARVED);break;case v.READY:case v.STARVED:this._buffer.getNReadableSamples()>=this.bufferThreshold&&(this.state=v.PLAYING)}t!=this.state&&this._notifyStateChange()}},{key:"_notifyStateChange",value:function(){this.port.postMessage({command:"stateChange",state:this.state})}},{key:"_onMessage",value:function(t){switch(t.data.command){case"init":this.nChannels=t.data.nChannels,this._init(t.data.bufferLength,t.data.nChannels,t.data.bufferThreshold);break;case"feed":this._feed(t.data.data);break;case"connect":t.ports[0].onmessage=this._onMessage.bind(this);break;default:throw Error("command not specified")}}},{key:"_feed",value:function(t){var r=this._buffer.write(t),n=e()(r,2),o=n[0],a=n[1];o&&this.port.postMessage({command:"bufferLengthChange",bufferLength:a})}},{key:"_init",value:function(t,e,r){this._buffer=new _(t,e),this.bufferThreshold=r,this.state=v.READY,this._notifyStateChange()}}]),i}(b()(AudioWorkletProcessor));registerProcessor("FeederNode",g)})()})();