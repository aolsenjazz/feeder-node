(()=>{var n={756:function(n,e,r){n.exports=(()=>{var n={17:(n,e,r)=>{var t;function o(n){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}n=r.nmd(n);var i,a=(i=(i="undefined"!=typeof document&&document.currentScript?document.currentScript.src:void 0)||__filename,function(n){var e,t,a=void 0!==(n=n||{})?n:{};a.ready=new Promise((function(n,r){e=n,t=r}));var u,f={};for(u in a)a.hasOwnProperty(u)&&(f[u]=a[u]);var c=[],s=function(n,e){throw e},l=!1,p=!1,d=!1,h=!1;l="object"===("undefined"==typeof window?"undefined":o(window)),p="function"==typeof importScripts,d="object"===("undefined"==typeof process?"undefined":o(process))&&"object"===o(process.versions)&&"string"==typeof process.versions.node,h=!l&&!d&&!p;var v,y,m,g,w="";function b(n){return a.locateFile?a.locateFile(n,w):w+n}d?(w=p?r(622).dirname(w)+"/":__dirname+"/",v=function(n,e){return m||(m=r(747)),g||(g=r(622)),n=g.normalize(n),m.readFileSync(n,e?null:"utf8")},y=function(n){var e=v(n,!0);return e.buffer||(e=new Uint8Array(e)),E(e.buffer),e},process.argv.length>1&&process.argv[1].replace(/\\/g,"/"),c=process.argv.slice(2),process.on("uncaughtException",(function(n){if(!(n instanceof De))throw n})),process.on("unhandledRejection",hn),s=function(n){process.exit(n)},a.inspect=function(){return"[Emscripten Module object]"}):h?("undefined"!=typeof read&&(v=function(n){return read(n)}),y=function(n){var e;return"function"==typeof readbuffer?new Uint8Array(readbuffer(n)):(E("object"===o(e=read(n,"binary"))),e)},"undefined"!=typeof scriptArgs?c=scriptArgs:void 0!==arguments&&(c=arguments),"function"==typeof quit&&(s=function(n){quit(n)}),"undefined"!=typeof print&&("undefined"==typeof console&&(console={}),console.log=print,console.warn=console.error="undefined"!=typeof printErr?printErr:print)):(l||p)&&(p?w=self.location.href:"undefined"!=typeof document&&document.currentScript&&(w=document.currentScript.src),i&&(w=i),w=0!==w.indexOf("blob:")?w.substr(0,w.lastIndexOf("/")+1):"",v=function(n){var e=new XMLHttpRequest;return e.open("GET",n,!1),e.send(null),e.responseText},p&&(y=function(n){var e=new XMLHttpRequest;return e.open("GET",n,!1),e.responseType="arraybuffer",e.send(null),new Uint8Array(e.response)})),a.print||console.log.bind(console);var A,_,T,S=a.printErr||console.warn.bind(console);for(u in f)f.hasOwnProperty(u)&&(a[u]=f[u]);f=null,a.arguments&&(c=a.arguments),a.thisProgram&&a.thisProgram,a.quit&&(s=a.quit),a.wasmBinary&&(A=a.wasmBinary),a.noExitRuntime&&(_=a.noExitRuntime),"object"!==("undefined"==typeof WebAssembly?"undefined":o(WebAssembly))&&hn("no native wasm support detected");var C=!1;function E(n,e){n||hn("Assertion failed: "+e)}var R="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function P(n,e,r){for(var t=e+r,o=e;n[o]&&!(o>=t);)++o;if(o-e>16&&n.subarray&&R)return R.decode(n.subarray(e,o));for(var i="";e<o;){var a=n[e++];if(128&a){var u=63&n[e++];if(192!=(224&a)){var f=63&n[e++];if((a=224==(240&a)?(15&a)<<12|u<<6|f:(7&a)<<18|u<<12|f<<6|63&n[e++])<65536)i+=String.fromCharCode(a);else{var c=a-65536;i+=String.fromCharCode(55296|c>>10,56320|1023&c)}}else i+=String.fromCharCode((31&a)<<6|u)}else i+=String.fromCharCode(a)}return i}function k(n,e){return n?P(U,n,e):""}function x(n,e,r,t){if(!(t>0))return 0;for(var o=r,i=r+t-1,a=0;a<n.length;++a){var u=n.charCodeAt(a);if(u>=55296&&u<=57343&&(u=65536+((1023&u)<<10)|1023&n.charCodeAt(++a)),u<=127){if(r>=i)break;e[r++]=u}else if(u<=2047){if(r+1>=i)break;e[r++]=192|u>>6,e[r++]=128|63&u}else if(u<=65535){if(r+2>=i)break;e[r++]=224|u>>12,e[r++]=128|u>>6&63,e[r++]=128|63&u}else{if(r+3>=i)break;e[r++]=240|u>>18,e[r++]=128|u>>12&63,e[r++]=128|u>>6&63,e[r++]=128|63&u}}return e[r]=0,r-o}function W(n,e,r){return x(n,U,e,r)}function F(n){for(var e=0,r=0;r<n.length;++r){var t=n.charCodeAt(r);t>=55296&&t<=57343&&(t=65536+((1023&t)<<10)|1023&n.charCodeAt(++r)),t<=127?++e:e+=t<=2047?2:t<=65535?3:4}return e}var I,O,U,j,M,D,B,N,H,L="undefined"!=typeof TextDecoder?new TextDecoder("utf-16le"):void 0;function q(n,e){for(var r=n,t=r>>1,o=t+e/2;!(t>=o)&&M[t];)++t;if((r=t<<1)-n>32&&L)return L.decode(U.subarray(n,r));for(var i="",a=0;!(a>=e/2);++a){var u=j[n+2*a>>1];if(0==u)break;i+=String.fromCharCode(u)}return i}function V(n,e,r){if(void 0===r&&(r=2147483647),r<2)return 0;for(var t=e,o=(r-=2)<2*n.length?r/2:n.length,i=0;i<o;++i){var a=n.charCodeAt(i);j[e>>1]=a,e+=2}return j[e>>1]=0,e-t}function z(n){return 2*n.length}function Y(n,e){for(var r=0,t="";!(r>=e/4);){var o=D[n+4*r>>2];if(0==o)break;if(++r,o>=65536){var i=o-65536;t+=String.fromCharCode(55296|i>>10,56320|1023&i)}else t+=String.fromCharCode(o)}return t}function Q(n,e,r){if(void 0===r&&(r=2147483647),r<4)return 0;for(var t=e,o=t+r-4,i=0;i<n.length;++i){var a=n.charCodeAt(i);if(a>=55296&&a<=57343&&(a=65536+((1023&a)<<10)|1023&n.charCodeAt(++i)),D[e>>2]=a,(e+=4)+4>o)break}return D[e>>2]=0,e-t}function G(n){for(var e=0,r=0;r<n.length;++r){var t=n.charCodeAt(r);t>=55296&&t<=57343&&++r,e+=4}return e}function X(n,e){return n%e>0&&(n+=e-n%e),n}function Z(n){I=n,a.HEAP8=O=new Int8Array(n),a.HEAP16=j=new Int16Array(n),a.HEAP32=D=new Int32Array(n),a.HEAPU8=U=new Uint8Array(n),a.HEAPU16=M=new Uint16Array(n),a.HEAPU32=B=new Uint32Array(n),a.HEAPF32=N=new Float32Array(n),a.HEAPF64=H=new Float64Array(n)}a.INITIAL_MEMORY;var J,$=[],K=[],nn=[],en=[];function rn(){if(a.preRun)for("function"==typeof a.preRun&&(a.preRun=[a.preRun]);a.preRun.length;)un(a.preRun.shift());Sn($)}function tn(){Sn(K)}function on(){Sn(nn)}function an(){if(a.postRun)for("function"==typeof a.postRun&&(a.postRun=[a.postRun]);a.postRun.length;)fn(a.postRun.shift());Sn(en)}function un(n){$.unshift(n)}function fn(n){en.unshift(n)}var cn=0,sn=null,ln=null;function pn(n){cn++,a.monitorRunDependencies&&a.monitorRunDependencies(cn)}function dn(n){if(cn--,a.monitorRunDependencies&&a.monitorRunDependencies(cn),0==cn&&(null!==sn&&(clearInterval(sn),sn=null),ln)){var e=ln;ln=null,e()}}function hn(n){a.onAbort&&a.onAbort(n),S(n+=""),C=!0,n="abort("+n+"). Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(n);throw t(e),e}function vn(n,e){return String.prototype.startsWith?n.startsWith(e):0===n.indexOf(e)}a.preloadedImages={},a.preloadedAudios={};var yn="data:application/octet-stream;base64,";function mn(n){return vn(n,yn)}var gn="file://";function wn(n){return vn(n,gn)}var bn="glue.wasm";function An(n){try{if(n==bn&&A)return new Uint8Array(A);if(y)return y(n);throw"both async and sync fetching of the wasm failed"}catch(n){hn(n)}}function _n(){return A||!l&&!p||"function"!=typeof fetch||wn(bn)?Promise.resolve().then((function(){return An(bn)})):fetch(bn,{credentials:"same-origin"}).then((function(n){if(!n.ok)throw"failed to load wasm binary file at '"+bn+"'";return n.arrayBuffer()})).catch((function(){return An(bn)}))}function Tn(){var n={a:Ie};function e(n,e){var r=n.exports;a.asm=r,Z((T=a.asm.q).buffer),J=a.asm.r,dn()}function r(n){e(n.instance)}function o(e){return _n().then((function(e){return WebAssembly.instantiate(e,n)})).then(e,(function(n){S("failed to asynchronously prepare wasm: "+n),hn(n)}))}if(pn(),a.instantiateWasm)try{return a.instantiateWasm(n,e)}catch(n){return S("Module.instantiateWasm callback failed with error: "+n),!1}return(A||"function"!=typeof WebAssembly.instantiateStreaming||mn(bn)||wn(bn)||"function"!=typeof fetch?o(r):fetch(bn,{credentials:"same-origin"}).then((function(e){return WebAssembly.instantiateStreaming(e,n).then(r,(function(n){return S("wasm streaming compile failed: "+n),S("falling back to ArrayBuffer instantiation"),o(r)}))}))).catch(t),{}}function Sn(n){for(;n.length>0;){var e=n.shift();if("function"!=typeof e){var r=e.func;"number"==typeof r?void 0===e.arg?J.get(r)():J.get(r)(e.arg):r(void 0===e.arg?null:e.arg)}else e(a)}}function Cn(n,e,r,t){hn("Assertion failed: "+k(n)+", at: "+[e?k(e):"unknown filename",r,t?k(t):"unknown function"])}function En(n){switch(n){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+n)}}function Rn(){for(var n=new Array(256),e=0;e<256;++e)n[e]=String.fromCharCode(e);Pn=n}mn(bn)||(bn=b(bn));var Pn=void 0;function kn(n){for(var e="",r=n;U[r];)e+=Pn[U[r++]];return e}var xn={},Wn={},Fn={},In=48,On=57;function Un(n){if(void 0===n)return"_unknown";var e=(n=n.replace(/[^a-zA-Z0-9_]/g,"$")).charCodeAt(0);return e>=In&&e<=On?"_"+n:n}function jn(n,e){return n=Un(n),new Function("body","return function "+n+'() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(e)}function Mn(n,e){var r=jn(e,(function(n){this.name=e,this.message=n;var r=new Error(n).stack;void 0!==r&&(this.stack=this.toString()+"\n"+r.replace(/^Error(:[^\n]*)?\n/,""))}));return r.prototype=Object.create(n.prototype),r.prototype.constructor=r,r.prototype.toString=function(){return void 0===this.message?this.name:this.name+": "+this.message},r}var Dn=void 0;function Bn(n){throw new Dn(n)}var Nn=void 0;function Hn(n){throw new Nn(n)}function Ln(n,e,r){function t(e){var t=r(e);t.length!==n.length&&Hn("Mismatched type converter count");for(var o=0;o<n.length;++o)qn(n[o],t[o])}n.forEach((function(n){Fn[n]=e}));var o=new Array(e.length),i=[],a=0;e.forEach((function(n,e){Wn.hasOwnProperty(n)?o[e]=Wn[n]:(i.push(n),xn.hasOwnProperty(n)||(xn[n]=[]),xn[n].push((function(){o[e]=Wn[n],++a===i.length&&t(o)})))})),0===i.length&&t(o)}function qn(n,e,r){if(r=r||{},!("argPackAdvance"in e))throw new TypeError("registerType registeredInstance requires argPackAdvance");var t=e.name;if(n||Bn('type "'+t+'" must have a positive integer typeid pointer'),Wn.hasOwnProperty(n)){if(r.ignoreDuplicateRegistrations)return;Bn("Cannot register type '"+t+"' twice")}if(Wn[n]=e,delete Fn[n],xn.hasOwnProperty(n)){var o=xn[n];delete xn[n],o.forEach((function(n){n()}))}}function Vn(n,e,r,t,o){var i=En(r);qn(n,{name:e=kn(e),fromWireType:function(n){return!!n},toWireType:function(n,e){return e?t:o},argPackAdvance:8,readValueFromPointer:function(n){var t;if(1===r)t=O;else if(2===r)t=j;else{if(4!==r)throw new TypeError("Unknown boolean type size: "+e);t=D}return this.fromWireType(t[n>>i])},destructorFunction:null})}var zn=[],Yn=[{},{value:void 0},{value:null},{value:!0},{value:!1}];function Qn(n){n>4&&0==--Yn[n].refcount&&(Yn[n]=void 0,zn.push(n))}function Gn(){for(var n=0,e=5;e<Yn.length;++e)void 0!==Yn[e]&&++n;return n}function Xn(){for(var n=5;n<Yn.length;++n)if(void 0!==Yn[n])return Yn[n];return null}function Zn(){a.count_emval_handles=Gn,a.get_first_emval=Xn}function Jn(n){switch(n){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:var e=zn.length?zn.pop():Yn.length;return Yn[e]={refcount:1,value:n},e}}function $n(n){return this.fromWireType(B[n>>2])}function Kn(n,e){qn(n,{name:e=kn(e),fromWireType:function(n){var e=Yn[n].value;return Qn(n),e},toWireType:function(n,e){return Jn(e)},argPackAdvance:8,readValueFromPointer:$n,destructorFunction:null})}function ne(n){if(null===n)return"null";var e=o(n);return"object"===e||"array"===e||"function"===e?n.toString():""+n}function ee(n,e){switch(e){case 2:return function(n){return this.fromWireType(N[n>>2])};case 3:return function(n){return this.fromWireType(H[n>>3])};default:throw new TypeError("Unknown float type: "+n)}}function re(n,e,r){var t=En(r);qn(n,{name:e=kn(e),fromWireType:function(n){return n},toWireType:function(n,e){if("number"!=typeof e&&"boolean"!=typeof e)throw new TypeError('Cannot convert "'+ne(e)+'" to '+this.name);return e},argPackAdvance:8,readValueFromPointer:ee(e,t),destructorFunction:null})}function te(n,e){if(!(n instanceof Function))throw new TypeError("new_ called with constructor type "+o(n)+" which is not a function");var r=jn(n.name||"unknownFunctionName",(function(){}));r.prototype=n.prototype;var t=new r,i=n.apply(t,e);return i instanceof Object?i:t}function oe(n){for(;n.length;){var e=n.pop();n.pop()(e)}}function ie(n,e,r,t,o){var i=e.length;i<2&&Bn("argTypes array size mismatch! Must at least get return value and 'this' types!");for(var a=null!==e[1]&&null!==r,u=!1,f=1;f<e.length;++f)if(null!==e[f]&&void 0===e[f].destructorFunction){u=!0;break}var c="void"!==e[0].name,s="",l="";for(f=0;f<i-2;++f)s+=(0!==f?", ":"")+"arg"+f,l+=(0!==f?", ":"")+"arg"+f+"Wired";var p="return function "+Un(n)+"("+s+") {\nif (arguments.length !== "+(i-2)+") {\nthrowBindingError('function "+n+" called with ' + arguments.length + ' arguments, expected "+(i-2)+" args!');\n}\n";u&&(p+="var destructors = [];\n");var d=u?"destructors":"null",h=["throwBindingError","invoker","fn","runDestructors","retType","classParam"],v=[Bn,t,o,oe,e[0],e[1]];for(a&&(p+="var thisWired = classParam.toWireType("+d+", this);\n"),f=0;f<i-2;++f)p+="var arg"+f+"Wired = argType"+f+".toWireType("+d+", arg"+f+"); // "+e[f+2].name+"\n",h.push("argType"+f),v.push(e[f+2]);if(a&&(l="thisWired"+(l.length>0?", ":"")+l),p+=(c?"var rv = ":"")+"invoker(fn"+(l.length>0?", ":"")+l+");\n",u)p+="runDestructors(destructors);\n";else for(f=a?1:2;f<e.length;++f){var y=1===f?"thisWired":"arg"+(f-2)+"Wired";null!==e[f].destructorFunction&&(p+=y+"_dtor("+y+"); // "+e[f].name+"\n",h.push(y+"_dtor"),v.push(e[f].destructorFunction))}return c&&(p+="var ret = retType.fromWireType(rv);\nreturn ret;\n"),p+="}\n",h.push(p),te(Function,h).apply(null,v)}function ae(n,e,r){if(void 0===n[e].overloadTable){var t=n[e];n[e]=function(){return n[e].overloadTable.hasOwnProperty(arguments.length)||Bn("Function '"+r+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+n[e].overloadTable+")!"),n[e].overloadTable[arguments.length].apply(this,arguments)},n[e].overloadTable=[],n[e].overloadTable[t.argCount]=t}}function ue(n,e,r){a.hasOwnProperty(n)?((void 0===r||void 0!==a[n].overloadTable&&void 0!==a[n].overloadTable[r])&&Bn("Cannot register public name '"+n+"' twice"),ae(a,n,n),a.hasOwnProperty(r)&&Bn("Cannot register multiple overloads of a function with the same number of arguments ("+r+")!"),a[n].overloadTable[r]=e):(a[n]=e,void 0!==r&&(a[n].numArguments=r))}function fe(n,e){for(var r=[],t=0;t<n;t++)r.push(D[(e>>2)+t]);return r}function ce(n,e,r){a.hasOwnProperty(n)||Hn("Replacing nonexistant public symbol"),void 0!==a[n].overloadTable&&void 0!==r?a[n].overloadTable[r]=e:(a[n]=e,a[n].argCount=r)}function se(n,e,r){return r&&r.length?a["dynCall_"+n].apply(null,[e].concat(r)):a["dynCall_"+n].call(null,e)}function le(n,e,r){return-1!=n.indexOf("j")?se(n,e,r):J.get(e).apply(null,r)}function pe(n,e){E(n.indexOf("j")>=0,"getDynCaller should only be called with i64 sigs");var r=[];return function(){r.length=arguments.length;for(var t=0;t<arguments.length;t++)r[t]=arguments[t];return le(n,e,r)}}function de(n,e){var r=-1!=(n=kn(n)).indexOf("j")?pe(n,e):J.get(e);return"function"!=typeof r&&Bn("unknown function pointer with signature "+n+": "+e),r}var he=void 0;function ve(n){var e=Me(n),r=kn(e);return Ue(e),r}function ye(n,e){var r=[],t={};throw e.forEach((function n(e){t[e]||Wn[e]||(Fn[e]?Fn[e].forEach(n):(r.push(e),t[e]=!0))})),new he(n+": "+r.map(ve).join([", "]))}function me(n,e,r,t,o,i){var a=fe(e,r);n=kn(n),o=de(t,o),ue(n,(function(){ye("Cannot call "+n+" due to unbound types",a)}),e-1),Ln([],a,(function(r){var t=[r[0],null].concat(r.slice(1));return ce(n,ie(n,t,null,o,i),e-1),[]}))}function ge(n,e,r){switch(e){case 0:return r?function(n){return O[n]}:function(n){return U[n]};case 1:return r?function(n){return j[n>>1]}:function(n){return M[n>>1]};case 2:return r?function(n){return D[n>>2]}:function(n){return B[n>>2]};default:throw new TypeError("Unknown integer type: "+n)}}function we(n,e,r,t,o){e=kn(e),-1===o&&(o=4294967295);var i=En(r),a=function(n){return n};if(0===t){var u=32-8*r;a=function(n){return n<<u>>>u}}var f=-1!=e.indexOf("unsigned");qn(n,{name:e,fromWireType:a,toWireType:function(n,r){if("number"!=typeof r&&"boolean"!=typeof r)throw new TypeError('Cannot convert "'+ne(r)+'" to '+this.name);if(r<t||r>o)throw new TypeError('Passing a number "'+ne(r)+'" from JS side to C/C++ side to an argument of type "'+e+'", which is outside the valid range ['+t+", "+o+"]!");return f?r>>>0:0|r},argPackAdvance:8,readValueFromPointer:ge(e,i,0!==t),destructorFunction:null})}function be(n,e,r){var t=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][e];function o(n){var e=B,r=e[n>>=2],o=e[n+1];return new t(I,o,r)}qn(n,{name:r=kn(r),fromWireType:o,argPackAdvance:8,readValueFromPointer:o},{ignoreDuplicateRegistrations:!0})}function Ae(n,e){var r="std::string"===(e=kn(e));qn(n,{name:e,fromWireType:function(n){var e,t=B[n>>2];if(r)for(var o=n+4,i=0;i<=t;++i){var a=n+4+i;if(i==t||0==U[a]){var u=k(o,a-o);void 0===e?e=u:(e+=String.fromCharCode(0),e+=u),o=a+1}}else{var f=new Array(t);for(i=0;i<t;++i)f[i]=String.fromCharCode(U[n+4+i]);e=f.join("")}return Ue(n),e},toWireType:function(n,e){e instanceof ArrayBuffer&&(e=new Uint8Array(e));var t="string"==typeof e;t||e instanceof Uint8Array||e instanceof Uint8ClampedArray||e instanceof Int8Array||Bn("Cannot pass non-string to std::string");var o=(r&&t?function(){return F(e)}:function(){return e.length})(),i=je(4+o+1);if(B[i>>2]=o,r&&t)W(e,i+4,o+1);else if(t)for(var a=0;a<o;++a){var u=e.charCodeAt(a);u>255&&(Ue(i),Bn("String has UTF-16 code units that do not fit in 8 bits")),U[i+4+a]=u}else for(a=0;a<o;++a)U[i+4+a]=e[a];return null!==n&&n.push(Ue,i),i},argPackAdvance:8,readValueFromPointer:$n,destructorFunction:function(n){Ue(n)}})}function _e(n,e,r){var t,o,i,a,u;r=kn(r),2===e?(t=q,o=V,a=z,i=function(){return M},u=1):4===e&&(t=Y,o=Q,a=G,i=function(){return B},u=2),qn(n,{name:r,fromWireType:function(n){for(var r,o=B[n>>2],a=i(),f=n+4,c=0;c<=o;++c){var s=n+4+c*e;if(c==o||0==a[s>>u]){var l=t(f,s-f);void 0===r?r=l:(r+=String.fromCharCode(0),r+=l),f=s+e}}return Ue(n),r},toWireType:function(n,t){"string"!=typeof t&&Bn("Cannot pass non-string to C++ string type "+r);var i=a(t),f=je(4+i+e);return B[f>>2]=i>>u,o(t,f+4,i+e),null!==n&&n.push(Ue,f),f},argPackAdvance:8,readValueFromPointer:$n,destructorFunction:function(n){Ue(n)}})}function Te(n,e){qn(n,{isVoid:!0,name:e=kn(e),argPackAdvance:0,fromWireType:function(){},toWireType:function(n,e){}})}function Se(n){n>4&&(Yn[n].refcount+=1)}function Ce(n,e){var r=Wn[n];return void 0===r&&Bn(e+" has unknown type "+ve(n)),r}function Ee(n,e){return Jn((n=Ce(n,"_emval_take_value")).readValueFromPointer(e))}function Re(){hn()}function Pe(n,e,r){U.copyWithin(n,e,e+r)}function ke(){return U.length}function xe(n){try{return T.grow(n-I.byteLength+65535>>>16),Z(T.buffer),1}catch(n){}}function We(n){n>>>=0;var e=ke(),r=2147483648;if(n>r)return!1;for(var t=1;t<=4;t*=2){var o=e*(1+.2/t);if(o=Math.min(o,n+100663296),xe(Math.min(r,X(Math.max(16777216,n,o),65536))))return!0}return!1}Rn(),Dn=a.BindingError=Mn(Error,"BindingError"),Nn=a.InternalError=Mn(Error,"InternalError"),Zn(),he=a.UnboundTypeError=Mn(Error,"UnboundTypeError"),K.push({func:function(){Oe()}});var Fe,Ie={a:Cn,k:Vn,j:Kn,h:re,d:me,c:we,b:be,f:Ae,e:_e,l:Te,m:Qn,n:Se,i:Ee,g:Re,o:Pe,p:We},Oe=(Tn(),a.___wasm_call_ctors=function(){return(Oe=a.___wasm_call_ctors=a.asm.s).apply(null,arguments)}),Ue=(a._main=function(){return(a._main=a.asm.t).apply(null,arguments)},a._free=function(){return(Ue=a._free=a.asm.u).apply(null,arguments)}),je=a._malloc=function(){return(je=a._malloc=a.asm.v).apply(null,arguments)},Me=a.___getTypeName=function(){return(Me=a.___getTypeName=a.asm.w).apply(null,arguments)};function De(n){this.name="ExitStatus",this.message="Program terminated with exit("+n+")",this.status=n}function Be(n){var e=a._main;try{He(e(0,0),!0)}catch(n){if(n instanceof De)return;if("unwind"==n)return void(_=!0);var r=n;n&&"object"===o(n)&&n.stack&&(r=[n,n.stack]),S("exception thrown: "+r),s(1,n)}}function Ne(n){function r(){Fe||(Fe=!0,a.calledRun=!0,C||(tn(),on(),e(a),a.onRuntimeInitialized&&a.onRuntimeInitialized(),Le&&Be(),an()))}n=n||c,cn>0||(rn(),cn>0||(a.setStatus?(a.setStatus("Running..."),setTimeout((function(){setTimeout((function(){a.setStatus("")}),1),r()}),1)):r()))}function He(n,e){e&&_&&0===n||(_||(a.onExit&&a.onExit(n),C=!0),s(n,new De(n)))}if(a.___embind_register_native_and_builtin_types=function(){return(a.___embind_register_native_and_builtin_types=a.asm.x).apply(null,arguments)},ln=function n(){Fe||Ne(),Fe||(ln=n)},a.run=Ne,a.preInit)for("function"==typeof a.preInit&&(a.preInit=[a.preInit]);a.preInit.length>0;)a.preInit.pop()();var Le=!0;return a.noInitialRun&&(Le=!1),_=!0,Ne(),n.ready});"object"===o(e)&&"object"===o(n)?n.exports=a:void 0===(t=function(){return a}.apply(e,[]))||(n.exports=t)},498:(n,e,r)=>{"use strict";r.r(e),r.d(e,{ConverterType:()=>f,create:()=>c});var t=r(17),o=r.n(t);function i(n,e){for(var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,t=null===r?new Float32Array(n):r,o=0;o<n;o++)t[o]=e[o];return t}var a=1008e3,u=function(){function n(e,r,t,o,i){!function(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),this.module=e,this.converterType=r,this.nChannels=t,this.inputSampleRate=o,this.outputSampleRate=i,this.ratio=i/o,this.isDestroyed=!1,e.init(t,r,o,i),this.sourceArray=e.sourceArray(a),this.targetArray=e.targetArray(a)}var e;return(e=[{key:"simple",value:function(n){return this._resample(this.module.simple,n)}},{key:"full",value:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return this._resample(this.module.full,n,e)}},{key:"destroy",value:function(){!0===this.isDestroyed?console.warn("destroy() has already been called on this instance"):(this.module.destroy(),this.isDestroyed=!0)}},{key:"_chunkAndResample",value:function(n){for(var e=0,r=[],t=function(n,e,r){for(var t=0,o=[],i=0;i<n.length;i+=e){var a=Math.min(e,n.length-t),u=new r(n.buffer,t*n.BYTES_PER_ELEMENT,a);t+=e,o.push(u)}return o}(n,this.inputSampleRate/10*this.nChannels,Float32Array),o=0;o<t.length;o++){var i=this._resample(this.module.full,t[o]);e+=i.length,r.push(i)}for(var a=new Float32Array(e),u=0,f=0;f<r.length;f++)for(var c=0;c<r[f].length;c++)a[u++]=r[f][c];return a}},{key:"_resample",value:function(n,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(this.inputSampleRate===this.outputSampleRate)return e;if(null!==r&&r.length<this.ratio*e.length)throw"dataOut must be at least ceil(srcRatio * dataIn.length) samples long";return Math.ceil(e.length*this.ratio)>a?this._chunkAndResample(e):(this.sourceArray.set(e),i(n(e.length,this.nChannels,this.converterType,this.inputSampleRate,this.outputSampleRate)*this.nChannels,this.targetArray,r))}}])&&function(n,e){for(var r=0;r<e.length;r++){var t=e[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}(n.prototype,e),n}(),f={SRC_SINC_BEST_QUALITY:0,SRC_SINC_MEDIUM_QUALITY:1,SRC_SINC_FASTEST:2,SRC_ZERO_ORDER_HOLD:3,SRC_LINEAR:4};function c(n,e,r){var t=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},i=void 0===t.converterType?f.SRC_SINC_FASTEST:t.converterType,a=t.wasmPath||"/libsamplerate.wasm";s(n,e,r,i);var c={locateFile:function(){return a}};return new Promise((function(t,a){o()(c).then((function(o){var a=new u(o,i,n,e,r);t(a)})).catch((function(n){a(n)}))}))}function s(n,e,r,t){if(void 0===n)throw"nChannels is undefined";if(void 0===e)throw"inputSampleRate is undefined";if(void 0===r)throw"outputSampleRate is undefined";if(n<1||n>128)throw"invalid nChannels submitted";if(e<1||e>192e3)throw"invalid inputSampleRate";if(r<1||r>192e3)throw"invalid outputSampleRate";if(t<f.SRC_SINC_BEST_QUALITY||t>f.SRC_LINEAR)throw"invalid converterType"}},747:n=>{"use strict";n.exports=r(147)},622:n=>{"use strict";n.exports=r(17)}},e={};function t(r){if(e[r])return e[r].exports;var o=e[r]={id:r,loaded:!1,exports:{}};return n[r](o,o.exports,t),o.loaded=!0,o.exports}return t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var r in e)t.o(e,r)&&!t.o(n,r)&&Object.defineProperty(n,r,{enumerable:!0,get:e[r]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.r=n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.nmd=n=>(n.paths=[],n.children||(n.children=[]),n),t(498)})()},147:n=>{"use strict";n.exports=require("fs")},17:n=>{"use strict";n.exports=require("path")}},e={};function r(t){var o=e[t];if(void 0!==o)return o.exports;var i=e[t]={exports:{}};return n[t].call(i.exports,i,i.exports,r),i.exports}r.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return r.d(e,{a:e}),e},r.d=(n,e)=>{for(var t in e)r.o(e,t)&&!r.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:e[t]})},r.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),(()=>{"use strict";var n=r(756);let e,t;self.onmessage=async function(r){if("feed"==r.data.command)!function(n){let r=new Float32Array(n),o=t.full(r);null==e?postMessage(o,[o.buffer]):e.postMessage({command:"feed",data:o},[o.buffer])}(r.data.data);else if("connect"===r.data.command)e=r.ports[0];else{if("init"!==r.data.command)throw"received unrecognized command";{let e=r.data.converterType,o=r.data.nChannels,i=r.data.inputSampleRate,a=r.data.outputSampleRate,u=r.data.pathToWasm;await async function(e,r,o,i,a){t=await(0,n.create)(r,o,i,{converterType:e,wasmPath:a})}(e,o,i,a,u),postMessage({command:"postInit"})}}}})()})();