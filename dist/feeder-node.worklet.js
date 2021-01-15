/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/***/ ((module) => {

eval("function _arrayLikeToArray(arr, len) {\n  if (len == null || len > arr.length) len = arr.length;\n\n  for (var i = 0, arr2 = new Array(len); i < len; i++) {\n    arr2[i] = arr[i];\n  }\n\n  return arr2;\n}\n\nmodule.exports = _arrayLikeToArray;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/arrayLikeToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("function _arrayWithHoles(arr) {\n  if (Array.isArray(arr)) return arr;\n}\n\nmodule.exports = _arrayWithHoles;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/arrayWithHoles.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("function _assertThisInitialized(self) {\n  if (self === void 0) {\n    throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\");\n  }\n\n  return self;\n}\n\nmodule.exports = _assertThisInitialized;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/assertThisInitialized.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("function _classCallCheck(instance, Constructor) {\n  if (!(instance instanceof Constructor)) {\n    throw new TypeError(\"Cannot call a class as a function\");\n  }\n}\n\nmodule.exports = _classCallCheck;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/classCallCheck.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/construct.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nvar isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct */ \"./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js\");\n\nfunction _construct(Parent, args, Class) {\n  if (isNativeReflectConstruct()) {\n    module.exports = _construct = Reflect.construct;\n  } else {\n    module.exports = _construct = function _construct(Parent, args, Class) {\n      var a = [null];\n      a.push.apply(a, args);\n      var Constructor = Function.bind.apply(Parent, a);\n      var instance = new Constructor();\n      if (Class) setPrototypeOf(instance, Class.prototype);\n      return instance;\n    };\n  }\n\n  return _construct.apply(null, arguments);\n}\n\nmodule.exports = _construct;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/construct.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/***/ ((module) => {

eval("function _defineProperties(target, props) {\n  for (var i = 0; i < props.length; i++) {\n    var descriptor = props[i];\n    descriptor.enumerable = descriptor.enumerable || false;\n    descriptor.configurable = true;\n    if (\"value\" in descriptor) descriptor.writable = true;\n    Object.defineProperty(target, descriptor.key, descriptor);\n  }\n}\n\nfunction _createClass(Constructor, protoProps, staticProps) {\n  if (protoProps) _defineProperties(Constructor.prototype, protoProps);\n  if (staticProps) _defineProperties(Constructor, staticProps);\n  return Constructor;\n}\n\nmodule.exports = _createClass;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/createClass.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("function _getPrototypeOf(o) {\n  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {\n    return o.__proto__ || Object.getPrototypeOf(o);\n  };\n  return _getPrototypeOf(o);\n}\n\nmodule.exports = _getPrototypeOf;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/getPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nfunction _inherits(subClass, superClass) {\n  if (typeof superClass !== \"function\" && superClass !== null) {\n    throw new TypeError(\"Super expression must either be null or a function\");\n  }\n\n  subClass.prototype = Object.create(superClass && superClass.prototype, {\n    constructor: {\n      value: subClass,\n      writable: true,\n      configurable: true\n    }\n  });\n  if (superClass) setPrototypeOf(subClass, superClass);\n}\n\nmodule.exports = _inherits;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/inherits.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/isNativeFunction.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeFunction.js ***!
  \*****************************************************************/
/***/ ((module) => {

eval("function _isNativeFunction(fn) {\n  return Function.toString.call(fn).indexOf(\"[native code]\") !== -1;\n}\n\nmodule.exports = _isNativeFunction;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/isNativeFunction.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/***/ ((module) => {

eval("function _isNativeReflectConstruct() {\n  if (typeof Reflect === \"undefined\" || !Reflect.construct) return false;\n  if (Reflect.construct.sham) return false;\n  if (typeof Proxy === \"function\") return true;\n\n  try {\n    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));\n    return true;\n  } catch (e) {\n    return false;\n  }\n}\n\nmodule.exports = _isNativeReflectConstruct;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("function _iterableToArrayLimit(arr, i) {\n  if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return;\n  var _arr = [];\n  var _n = true;\n  var _d = false;\n  var _e = undefined;\n\n  try {\n    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {\n      _arr.push(_s.value);\n\n      if (i && _arr.length === i) break;\n    }\n  } catch (err) {\n    _d = true;\n    _e = err;\n  } finally {\n    try {\n      if (!_n && _i[\"return\"] != null) _i[\"return\"]();\n    } finally {\n      if (_d) throw _e;\n    }\n  }\n\n  return _arr;\n}\n\nmodule.exports = _iterableToArrayLimit;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/***/ ((module) => {

eval("function _nonIterableRest() {\n  throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\n\nmodule.exports = _nonIterableRest;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/nonIterableRest.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ \"./node_modules/@babel/runtime/helpers/typeof.js\");\n\nvar assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n\nfunction _possibleConstructorReturn(self, call) {\n  if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) {\n    return call;\n  }\n\n  return assertThisInitialized(self);\n}\n\nmodule.exports = _possibleConstructorReturn;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("function _setPrototypeOf(o, p) {\n  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {\n    o.__proto__ = p;\n    return o;\n  };\n\n  return _setPrototypeOf(o, p);\n}\n\nmodule.exports = _setPrototypeOf;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/setPrototypeOf.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ \"./node_modules/@babel/runtime/helpers/arrayWithHoles.js\");\n\nvar iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ \"./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js\");\n\nvar unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ \"./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js\");\n\nvar nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ \"./node_modules/@babel/runtime/helpers/nonIterableRest.js\");\n\nfunction _slicedToArray(arr, i) {\n  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();\n}\n\nmodule.exports = _slicedToArray;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/slicedToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/***/ ((module) => {

eval("function _typeof(obj) {\n  \"@babel/helpers - typeof\";\n\n  if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") {\n    module.exports = _typeof = function _typeof(obj) {\n      return typeof obj;\n    };\n  } else {\n    module.exports = _typeof = function _typeof(obj) {\n      return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj;\n    };\n  }\n\n  return _typeof(obj);\n}\n\nmodule.exports = _typeof;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/typeof.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ \"./node_modules/@babel/runtime/helpers/arrayLikeToArray.js\");\n\nfunction _unsupportedIterableToArray(o, minLen) {\n  if (!o) return;\n  if (typeof o === \"string\") return arrayLikeToArray(o, minLen);\n  var n = Object.prototype.toString.call(o).slice(8, -1);\n  if (n === \"Object\" && o.constructor) n = o.constructor.name;\n  if (n === \"Map\" || n === \"Set\") return Array.from(o);\n  if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);\n}\n\nmodule.exports = _unsupportedIterableToArray;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/wrapNativeSuper.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/wrapNativeSuper.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n\nvar setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ \"./node_modules/@babel/runtime/helpers/setPrototypeOf.js\");\n\nvar isNativeFunction = __webpack_require__(/*! ./isNativeFunction */ \"./node_modules/@babel/runtime/helpers/isNativeFunction.js\");\n\nvar construct = __webpack_require__(/*! ./construct */ \"./node_modules/@babel/runtime/helpers/construct.js\");\n\nfunction _wrapNativeSuper(Class) {\n  var _cache = typeof Map === \"function\" ? new Map() : undefined;\n\n  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {\n    if (Class === null || !isNativeFunction(Class)) return Class;\n\n    if (typeof Class !== \"function\") {\n      throw new TypeError(\"Super expression must either be null or a function\");\n    }\n\n    if (typeof _cache !== \"undefined\") {\n      if (_cache.has(Class)) return _cache.get(Class);\n\n      _cache.set(Class, Wrapper);\n    }\n\n    function Wrapper() {\n      return construct(Class, arguments, getPrototypeOf(this).constructor);\n    }\n\n    Wrapper.prototype = Object.create(Class.prototype, {\n      constructor: {\n        value: Wrapper,\n        enumerable: false,\n        writable: true,\n        configurable: true\n      }\n    });\n    return setPrototypeOf(Wrapper, Class);\n  };\n\n  return _wrapNativeSuper(Class);\n}\n\nmodule.exports = _wrapNativeSuper;\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./node_modules/@babel/runtime/helpers/wrapNativeSuper.js?");

/***/ }),

/***/ "./src/abstract-backend.js":
/*!*********************************!*\
  !*** ./src/abstract-backend.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BackendState\": () => /* binding */ BackendState,\n/* harmony export */   \"AbstractBackend\": () => /* binding */ AbstractBackend\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar BackendState = {\n  UNINITIALIZED: 1,\n  READY: 2,\n  PLAYING: 3,\n  STARVED: 4\n};\nObject.freeze(BackendState);\n/** Abstract class representing an Audio Backend */\n\nvar AbstractBackend = /*#__PURE__*/function () {\n  function AbstractBackend() {\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, AbstractBackend);\n  }\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(AbstractBackend, [{\n    key: \"feed\",\n\n    /**\n     * Queues audio data for propagation to the next AudioNode in the graph\n     *\n     * @param { Float32Array } float32Array Mono or interleaved audio data\n     */\n    value: function feed(float32Array) {\n      throw 'feed() must be implemented';\n    }\n    /**\n     * Connect to the given destination. Destination should be an AudioNode.\n     *\n     * @param { AudioNode } destination The AudioNode to which audio is propagated\n     */\n\n  }, {\n    key: \"connect\",\n    value: function connect(destination) {\n      throw 'connect() must be implemented';\n    }\n    /** Disconnect from the currently-connected destination. */\n\n  }, {\n    key: \"disconnect\",\n    value: function disconnect() {\n      throw 'disconnect() must be implemented';\n    }\n    /**\n     * Sets a MessageChannel Port to receive processed data from. Should be, but doesn't *have* to be\n     * implemented by subclasses.\n     * \n     * @param { MessagePort } port port1 or port2 from a MessageChannel\n     */\n\n  }, {\n    key: \"setPort\",\n    value: function setPort(port) {}\n    /**\n     * Called whenever the state changes (playing, silent, etc.) Override me.\n     *\n     * @param {BackendState} state One of BackendState\n     */\n\n  }, {\n    key: \"onStateChange\",\n    value: function onStateChange(state) {}\n  }]);\n\n  return AbstractBackend;\n}();\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./src/abstract-backend.js?");

/***/ }),

/***/ "./src/feeder-node.worklet.js":
/*!************************************!*\
  !*** ./src/feeder-node.worklet.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ WorkletProcessor\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ \"./node_modules/@babel/runtime/helpers/assertThisInitialized.js\");\n/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ \"./node_modules/@babel/runtime/helpers/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/getPrototypeOf.js\");\n/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ \"./node_modules/@babel/runtime/helpers/wrapNativeSuper.js\");\n/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _ring_buffer_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ring-buffer.js */ \"./src/ring-buffer.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n/* harmony import */ var _abstract_backend__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./abstract-backend */ \"./src/abstract-backend.js\");\n\n\n\n\n\n\n\n\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\n\n\n\nvar BATCH_SIZE = 128; // non-negotiable (thanks AudioWorklet)\n\n/** AudioWorkletProcessor loaded by audio-worklet-backend to do the audio-thread processing */\n\nvar WorkletProcessor = /*#__PURE__*/function (_AudioWorkletProcesso) {\n  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(WorkletProcessor, _AudioWorkletProcesso);\n\n  var _super = _createSuper(WorkletProcessor);\n\n  function WorkletProcessor(options) {\n    var _this;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, WorkletProcessor);\n\n    _this = _super.call(this);\n    _this.port.onmessage = _this._onMessage.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));\n    _this.bufferThreshold;\n    _this.state = _abstract_backend__WEBPACK_IMPORTED_MODULE_10__.BackendState.UNINITIALIZED;\n    return _this;\n  }\n  /**\n   * Called whenever the AudioWorkletProcessor has data to process/playback\n   *\n   * @param {Array} inputs      An array containing 0 Float32Arrays. unused\n   * @param {Array} outputs     An array containing this.nChannels Float32Arrays\n   * @param {Object} parameters Object containing audio parameters. unused\n   */\n\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(WorkletProcessor, [{\n    key: \"process\",\n    value: function process(inputs, outputs, parameters) {\n      this._updateState();\n\n      if (this.state === _abstract_backend__WEBPACK_IMPORTED_MODULE_10__.BackendState.PLAYING) {\n        this._buffer.readInto(outputs[0], BATCH_SIZE);\n      } else {\n        (0,_util_js__WEBPACK_IMPORTED_MODULE_9__.writeSilence)(outputs[0]);\n      }\n\n      return true;\n    }\n    /**\n     * Changes state depending on how much data is available to read into AudioNode chain. If\n     * WorkletProcess runs out of data, switches to STARVED; once it buffers enough data, switch\n     * back to PLAYING\n     */\n\n  }, {\n    key: \"_updateState\",\n    value: function _updateState() {\n      var staleState = this.state;\n\n      switch (this.state) {\n        case _abstract_backend__WEBPACK_IMPORTED_MODULE_10__.BackendState.UNINITIALIZED:\n          return;\n\n        case _abstract_backend__WEBPACK_IMPORTED_MODULE_10__.BackendState.PLAYING:\n          if (this._buffer.getNReadableSamples() === 0) this.state = _abstract_backend__WEBPACK_IMPORTED_MODULE_10__.BackendState.STARVED;\n          break;\n\n        case _abstract_backend__WEBPACK_IMPORTED_MODULE_10__.BackendState.READY:\n        case _abstract_backend__WEBPACK_IMPORTED_MODULE_10__.BackendState.STARVED:\n          if (this._buffer.getNReadableSamples() >= this.bufferThreshold) this.state = _abstract_backend__WEBPACK_IMPORTED_MODULE_10__.BackendState.PLAYING;\n          break;\n\n        default:\n      }\n\n      if (staleState != this.state) this._notifyStateChange();\n    }\n    /**\n     * Notifies the parent FeederNode of the state change\n     */\n\n  }, {\n    key: \"_notifyStateChange\",\n    value: function _notifyStateChange() {\n      this.port.postMessage({\n        command: 'stateChange',\n        state: this.state\n      });\n    }\n    /**\n     * Called whenever the AudioWorkletProcessor received a message from the main thread. Use to initialize\n     * values and receive audio data.\n     *\n     * @param {Event} e https://developer.mozilla.org/en-US/docs/Web/API/MessagePort\n     */\n\n  }, {\n    key: \"_onMessage\",\n    value: function _onMessage(e) {\n      switch (e.data.command) {\n        case 'init':\n          this.nChannels = e.data.nChannels;\n\n          this._init(e.data.bufferLength, e.data.nChannels, e.data.bufferThreshold);\n\n          break;\n\n        case 'feed':\n          this._feed(e.data.data);\n\n          break;\n\n        case 'connect':\n          e.ports[0].onmessage = this._onMessage.bind(this);\n          break;\n\n        default:\n          throw Error('command not specified');\n      }\n    }\n    /**\n     * Queues audio data to be played back\n     *\n     * @param {Float32Array} float32Array interleaved (if channels > 0) audio data\n     */\n\n  }, {\n    key: \"_feed\",\n    value: function _feed(float32Array) {\n      var _this$_buffer$write = this._buffer.write(float32Array, this.nChannels > 1),\n          _this$_buffer$write2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_this$_buffer$write, 2),\n          didResize = _this$_buffer$write2[0],\n          bufferLength = _this$_buffer$write2[1];\n\n      if (didResize) {\n        this.port.postMessage({\n          command: 'bufferLengthChange',\n          bufferLength: bufferLength\n        });\n      }\n    }\n    /**\n     * Initializes with the given values. This should be called immediately after loading the processor.\n     *\n     * @param {Number} bufferLength    the length of the RingBuffer (this._buffer)\n     * @param {Number} nChannels       the number of outputs channels \n     * @param {Number} bufferThreshold # of samples (per channel) to queue before transmission to output begins\n     */\n\n  }, {\n    key: \"_init\",\n    value: function _init(bufferLength, nChannels, bufferThreshold) {\n      this._buffer = new _ring_buffer_js__WEBPACK_IMPORTED_MODULE_8__.default(bufferLength, nChannels);\n      this.bufferThreshold = bufferThreshold;\n      this.state = _abstract_backend__WEBPACK_IMPORTED_MODULE_10__.BackendState.READY;\n\n      this._notifyStateChange();\n    }\n  }]);\n\n  return WorkletProcessor;\n}( /*#__PURE__*/_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_7___default()(AudioWorkletProcessor));\n\n\nregisterProcessor('FeederNode', WorkletProcessor);\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./src/feeder-node.worklet.js?");

/***/ }),

/***/ "./src/ring-buffer.js":
/*!****************************!*\
  !*** ./src/ring-buffer.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ \"./node_modules/@babel/runtime/helpers/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ \"./node_modules/@babel/runtime/helpers/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n// TODO: This should support more than 2 channels. no reason not to\nvar RingBuffer = /*#__PURE__*/function () {\n  function RingBuffer() {\n    var bufferLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32768;\n    var nChannels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;\n\n    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RingBuffer);\n\n    this._data = [];\n    this._writePos = 0;\n    this._readPos = 0;\n    if (bufferLength <= 0) throw 'bufferLength must be >= 1';\n    if (!(0 < nChannels) || !(nChannels <= 2)) throw 'nChannels must be 0 < nChannels <=2';\n\n    for (var i = 0; i < nChannels; i++) {\n      this._data.push(new Float32Array(bufferLength));\n    }\n\n    this.bufferLength = bufferLength;\n    this._nChannels = nChannels;\n  }\n  /**\n   * Returns whether or not there's any data available to be read\n   *\n   * @return {boolean} is there any available data?\n   */\n\n\n  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RingBuffer, [{\n    key: \"hasDataAvailable\",\n    value: function hasDataAvailable() {\n      return this._writePos != this._readPos;\n    }\n    /**\n     * Resets the read position, sucj that hasAvailableData() === false\n     */\n\n  }, {\n    key: \"resetReadPosition\",\n    value: function resetReadPosition() {\n      this._readPos = this._writePos;\n    }\n    /**\n     * Returns the number of samples available. This number is per channel, not summed over the channels\n     *\n     * @return {Number} the number of samples to be read\n     */\n\n  }, {\n    key: \"getNReadableSamples\",\n    value: function getNReadableSamples() {\n      if (this._readPos == this._writePos) return 0;\n      return this._readPos < this._writePos ? this._writePos - this._readPos : this.bufferLength - this._readPos + this._writePos;\n    }\n    /**\n     * Increases the read position by nSamples, effectively trimming nReadableSamples by nSamples\n     *\n     * @param {Number} nSamples The number of samples to advance the read position\n     */\n\n  }, {\n    key: \"advanceReadPosition\",\n    value: function advanceReadPosition(nSamples) {\n      var newPos = this._readPos;\n\n      for (var i = 0; i < nSamples; i++) {\n        if (newPos == this.bufferLength) newPos = 0;\n        newPos++;\n        if (newPos == this._writePos) break;\n      }\n\n      this._readPos = newPos;\n    }\n    /**\n     * Reads the specified number of samples (per channel) from the buffer into a new array\n     *\n     * @param  {Number} nSamples The number of samples (per channel) to read\n     * @return {Array}           An mxn array of m Float32Arrays with length n\n     */\n\n  }, {\n    key: \"read\",\n    value: function read(nSamples) {\n      var channels = Array.apply(null, Array(this._nChannels)).map(function (x, i) {\n        return new Float32Array(nSamples);\n      });\n      var readableSamples = Math.min(nSamples, this.getNReadableSamples());\n      var readChannelPos;\n\n      for (var channelNum = 0; channelNum < channels.length; channelNum++) {\n        var writeChannel = channels[channelNum];\n        readChannelPos = this._readPos;\n\n        for (var samplePos = 0; samplePos < readableSamples; samplePos++) {\n          if (readChannelPos == this.bufferLength) readChannelPos = 0;\n          writeChannel[samplePos] = this._data[channelNum][readChannelPos++];\n        }\n      }\n\n      this._readPos = readChannelPos;\n      return channels;\n    }\n    /**\n     * Reads the specified number of samples (nSamples) into a Float32Array. Useful if one\n     * wants to resuse buffers between reads.\n     *\n     * @param {Array}  channels An mxn Array of Float32Arrays with length n\n     * @param {Number} nSamples The number of samples (per channel) to read into the given arrays\n     */\n\n  }, {\n    key: \"readInto\",\n    value: function readInto(channels, nSamples) {\n      var readableSamples = Math.min(nSamples, this.getNReadableSamples());\n      var readChannelPos;\n\n      for (var channelNum = 0; channelNum < channels.length; channelNum++) {\n        readChannelPos = this._readPos;\n\n        for (var samplePos = 0; samplePos < readableSamples; samplePos++) {\n          if (readChannelPos == this.bufferLength) readChannelPos = 0;\n          channels[channelNum][samplePos] = this._data[channelNum][readChannelPos++];\n        }\n      }\n\n      this._readPos = readChannelPos;\n    }\n    /**\n     * Resizes the Float32Arrays in this._data. This will probably called when trying to put\n     * large chunks into the RingBuffer.\n     *\n     * @param {Number} newSize The new size, should be > this._data[0].length\n     */\n\n  }, {\n    key: \"_resize\",\n    value: function _resize(newSize) {\n      var newChannels = [];\n      var readableSamples = this.getNReadableSamples();\n\n      for (var i = 0; i < this._nChannels; i++) {\n        newChannels.push(new Float32Array(newSize));\n      }\n\n      this.readInto(newChannels, readableSamples);\n      this._writePos = readableSamples;\n      this._readPos = 0;\n      this._data = newChannels;\n      this.bufferLength = newChannels[0].length;\n    }\n    /**\n     * Writes the provided data to this._data. readChannels can be an Array of Float32Arrays or just\n     * a single Float32Array. If this.nChannels > 1, it will be assumed that any submission of a single\n     * Float32Array is interleaved.\n     *\n     * @param {Array || Float32Array} readChannels Float32Array of mono/interleaved data, or Array of Float32Arrays\n     */\n\n  }, {\n    key: \"write\",\n    value: function write(readChannels) {\n      var interleaved = false;\n      var didResize = false;\n\n      var _readChannels;\n\n      if (ArrayBuffer.isView(readChannels) && this._nChannels === 1) {\n        // prepare for reading mono data\n        _readChannels = [readChannels];\n      } else if (ArrayBuffer.isView(readChannels)) {\n        // one channel submitted & not in mono. assume interleaved.\n        _readChannels = [readChannels];\n        interleaved = true;\n      } else {\n        // received an array of Float32Arrays, validate as such\n        if (readChannels.length != this._nChannels) throw 'readChannels.length must equal this._nChannels!';\n        var channelLen = readChannels[0].length;\n\n        for (var i = 0; i < readChannels.length; i++) {\n          if (readChannels[i].length != channelLen) throw 'channel lengths differ in write()';\n        }\n\n        _readChannels = readChannels;\n      } // resize the RingBuffer if necessary\n\n\n      var lengthPerChannel = interleaved ? _readChannels[0].length / this._data.length : _readChannels[0].length;\n\n      if (lengthPerChannel > this.bufferLength) {\n        this._resize(_readChannels[0].length + this.getNReadableSamples());\n\n        didResize = true;\n      } // copy [readChannels] into this._data\n\n\n      var newWritePos;\n\n      for (var channelNum = 0; channelNum < _readChannels.length; channelNum++) {\n        var chan = _readChannels[channelNum];\n        newWritePos = this._writePos;\n\n        if (interleaved === true) {\n          // if interleaved, copy each value in chan to each array in this._data\n          for (var _i = 0; _i < chan.length; _i += this._data.length) {\n            if (newWritePos == this.bufferLength) newWritePos = 0;\n\n            for (var j = 0; j < this._data.length; j++) {\n              this._data[j][newWritePos] = chan[_i + j];\n            }\n\n            newWritePos++;\n          }\n        } else {\n          // non interleaved, copy every in channels [readChannels] to this.data. simple\n          for (var samplePos = 0; samplePos < chan.length; samplePos++) {\n            if (newWritePos == this.bufferLength) newWritePos = 0;\n            this._data[channelNum][newWritePos++] = chan[samplePos];\n          }\n        }\n      } // update write position\n\n\n      this._writePos = newWritePos;\n      return [didResize, this.bufferLength];\n    }\n  }]);\n\n  return RingBuffer;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RingBuffer);\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./src/ring-buffer.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"writeSilence\": () => /* binding */ writeSilence,\n/* harmony export */   \"writeInterleavedToChannels\": () => /* binding */ writeInterleavedToChannels,\n/* harmony export */   \"copyInterleavedToChannels\": () => /* binding */ copyInterleavedToChannels,\n/* harmony export */   \"writeChannelsToInterleaved\": () => /* binding */ writeChannelsToInterleaved,\n/* harmony export */   \"copyChannelsToInterleaved\": () => /* binding */ copyChannelsToInterleaved,\n/* harmony export */   \"toFloat32\": () => /* binding */ toFloat32\n/* harmony export */ });\n/**\n * Writes 0 at every index in every channel\n * @param {Array} targetChannels An array of TypedArrays\n */\nfunction writeSilence(targetChannels) {\n  for (var i = 0; i < targetChannels.length; i++) {\n    var channel = targetChannels[i];\n\n    for (var j = 0; j < channel.length; j++) {\n      channel[j] = 0;\n    }\n  }\n}\n/**\n * Copies data from an interleaved data array to an mxn array of TypedArrays\n * @param  {TypedArray} interleavedData A TypedArray containing interleaved audio data.\n * @param  {Number}     nChannels       The number of channels to write interleavedData to\n * @return {Array}                      A multi-channel representation of the interleaved data\n */\n\nfunction writeInterleavedToChannels(interleavedData, nChannels) {\n  if (!Number.isInteger(nChannels)) throw 'nChannels must be an integer';\n  var dataPerChannel = interleavedData.length / nChannels;\n  var channels = Array.apply(null, Array(nChannels)).map(function (x, i) {\n    return new Float32Array(dataPerChannel);\n  });\n  copyInterleavedToChannels(interleavedData, channels);\n  return channels;\n}\n/**\n * Copies data from an interleaved data array to an mxn array of TypedArrays\n * @param {TypedArray} interleavedData A TypedArray containing interleaved audio data.\n * @param {Array}      targetChannels  An mxn array of m TypedArrays with length n. interleaved data is copied into these arrays\n */\n\nfunction copyInterleavedToChannels(interleavedData, targetChannels) {\n  if (interleavedData.length > targetChannels[0].length * targetChannels.length) throw 'incorrect channel lengths';\n\n  for (var channelNum = 0; channelNum < targetChannels.length; channelNum++) {\n    var dataPos = channelNum;\n\n    for (var channelPos = 0; channelPos < targetChannels[channelNum].length; channelPos++) {\n      targetChannels[channelNum][channelPos] = interleavedData[dataPos];\n      dataPos += targetChannels.length;\n    }\n  }\n}\n/**\n * Writes channel data to a new interleaved array. Basically just wraps copyChannelsToInterleaved\n * @param  {Array}      channels An mxn array containing m TypedArrays with length n\n * @return {TypedArray} an interleaved representation of channels\n */\n\nfunction writeChannelsToInterleaved(channels) {\n  var interleavedLength = channels[0].length * channels.length;\n  var interleaved = new Float32Array(interleavedLength);\n  copyChannelsToInterleaved(channels, interleaved);\n  return interleaved;\n}\n/**\n * Copies data from an mxn array to interleaved data array of size n*m\n * @param {Array}      channels An mxn array containing m TypedArrays with length n\n * @param {TypedArray} targetInterleaved A TypedArray to write interleaved data to\n */\n\nfunction copyChannelsToInterleaved(channels, targetInterleaved) {\n  if (targetInterleaved.length < channels[0].length * channels.length) throw Error('incorrect channel lengths');\n  var interleavedPos = 0;\n\n  for (var i = 0; i < channels[0].length; i++) {\n    for (var j = 0; j < channels.length; j++) {\n      targetInterleaved[interleavedPos++] = channels[j][i];\n    }\n  }\n}\n/**\n * converts and *scales* TypedArray to Float32 where samples are scaled from \n * TypedArray.minValue < n < TypedArray.maxValue to -1 < n < 1\n *\n * @param  {TypedArray} data A TypedArray containing audio samples\n * @return {TypedArray}      The float32 representations scaled to -1 < n < 1\n */\n\nfunction toFloat32(data) {\n  var divisor = maxValueForTypedArray(data);\n  var float32 = new Float32Array(data.length);\n\n  switch (data.constructor) {\n    case Float32Array:\n      return data;\n\n    case Int8Array:\n    case Int16Array:\n    case Int32Array:\n      for (var i = 0; i < data.length; i++) {\n        float32[i] = data[i] / divisor;\n      }\n\n      break;\n\n    case Uint8Array:\n    case Uint16Array:\n    case Uint32Array:\n      for (var _i = 0; _i < data.length; _i++) {\n        float32[_i] = (data[_i] - divisor) / divisor;\n      }\n\n  }\n\n  return float32;\n}\n/**\n * Get the maximum value which can be stored in the given TypedArray\n *\n * @param  {TypedArray} data A TypedArray containing audio samples\n * @return {Number}          The max value which can be stored in array\n */\n\nfunction maxValueForTypedArray(array) {\n  switch (array.constructor) {\n    case Float32Array:\n      return 1;\n\n    case Int8Array:\n    case Uint8Array:\n      return 127;\n\n    case Int16Array:\n    case Uint16Array:\n      return 32767;\n\n    case Int32Array:\n    case Uint32Array:\n      return 2147483647;\n\n    default:\n      throw \"Unsupport data type \".concat(array.constructor);\n  }\n}\n\n//# sourceURL=webpack://@alexanderolsen/feeder-node/./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/feeder-node.worklet.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;