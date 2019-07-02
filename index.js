/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ccjs/cc.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ccjs/cc.js":
/*!************************!*\
  !*** ./src/ccjs/cc.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dom = __webpack_require__(/*! ./dom/dom */ "./src/ccjs/dom/dom.js");

var _dom2 = _interopRequireDefault(_dom);

var _storage = __webpack_require__(/*! ./storage/storage */ "./src/ccjs/storage/storage.js");

var _storage2 = _interopRequireDefault(_storage);

var _raf = __webpack_require__(/*! ./common/raf */ "./src/ccjs/common/raf.js");

var _raf2 = _interopRequireDefault(_raf);

var _common = __webpack_require__(/*! ./common/common */ "./src/ccjs/common/common.js");

var _common2 = _interopRequireDefault(_common);

var _xhr = __webpack_require__(/*! ./xhr/xhr */ "./src/ccjs/xhr/xhr.js");

var _xhr2 = _interopRequireDefault(_xhr);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var IS_WORKER = self.window === undefined;
var CONTEXT = IS_WORKER ? self : window;

var cc;
window.cc = cc = {
    utils: _common2.default,
    load: function load() {
        var addOns = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    },
    select: function select(selector) {
        return _dom2.default.select(selector);
    },
    createElement: function createElement(tagName, id, options) {
        return _dom2.default.createElement(tagName, id, options);
    },
    createElementNS: function createElementNS(tagName, id) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return _dom2.default.createElementNS(tagName, id, options);
    },
    setValue: function setValue(key, value) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        options.reset = true;
        return _storage2.default.setValue(key, value, options);
    },
    saveArray: function saveArray(key) {
        var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var idkey = arguments[2];

        if (idkey !== undefined && idkey !== '' && key !== undefined) {
            arr.forEach(function (item) {
                cc.updateValue(item[idkey], item);
            });
        }
        return cc.setValue(key, arr);
    },
    updateValue: function updateValue(key, value) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        return _storage2.default.setValue(key, value, options);
    },
    getValue: function getValue(key) {
        return _storage2.default.getValue(key);
    },
    setTimer: function setTimer(fn, delay) {
        return _raf2.default.requestTimeout(fn, delay);
    },
    cancelTimer: function cancelTimer(handle) {
        _raf2.default.clearRequestTimeout(handle);
    },
    request: function request() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        return _xhr2.default.ajax(params);
    }

};

if (IS_WORKER) {
    delete cc.select;
    delete cc.createElement;
    delete cc.createElementNS;
} else {
    var last = 0;
    var frameTicker = function frameTicker(timestamp) {
        cc.setValue('frame', timestamp, { immediately: true });
        //console.log(timestamp - last);
        last = timestamp;
        _raf2.default.requestTimeout(frameTicker, 16);
    };
    frameTicker(0);
}

exports.default = cc;

/***/ }),

/***/ "./src/ccjs/common/common.js":
/*!***********************************!*\
  !*** ./src/ccjs/common/common.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var IS_WORKER = self.window === undefined;
var CONTEXT = IS_WORKER ? self : window;
var common = {};

common.objectforEach = function (obj, fn) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            fn(obj[key], key, obj);
        }
    }
};

common.objectAssign = function () {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var source = arguments[1];

    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }
    return target;
};

common.createId = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

common.isObject = function (item) {
    return item !== undefined && item === Object(item) && !(item instanceof Array);
};

common.getBrowser = function () {
    var isIE = false;
    var isChrome = false;
    var isOpera = false;
    if (!!CONTEXT.opr && !!opr.addons || !!CONTEXT.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
        isOpera = true;
        return 'opera';
    }
    if (typeof InstallTrigger !== 'undefined') {
        return 'firefox';
    }
    if (/constructor/i.test(CONTEXT.HTMLElement) || function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
    }(!CONTEXT['safari'] || safari.pushNotification)) {
        return 'safari';
    }
    if ( false || !!document.documentMode) {
        Object.assign = function () {
            var output = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                for (var key in arguments[i]) {
                    var obj = arguments[i];
                    if (obj.hasOwnProperty(key)) output[key] = obj[key];
                }
            }
            return output;
        };
        if (!('remove' in Element.prototype)) {
            Element.prototype.remove = function () {
                if (this.parentNode) {
                    this.parentNode.removeChild(this);
                }
            };
        }
        isIE = true;
        return 'ie';
    }
    if (!isIE && !!CONTEXT.StyleMedia) {
        return 'edge';
    }
    if (!!CONTEXT.chrome && !!CONTEXT.chrome.webstore) {
        isChrome = true;
        return 'chrome';
    }
    if ((isChrome || isOpera) && !!CONTEXT.CSS) {
        return 'blink';
    }
};

common.readValue = function (value) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (typeof value === "function") {
        return value(options);
    } else {
        return value;
    }
};

common.getUrlVar = function (key, defaultValue) {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars[key] === undefined ? defaultValue : vars[key];
};

exports.default = common;

/***/ }),

/***/ "./src/ccjs/common/raf.js":
/*!********************************!*\
  !*** ./src/ccjs/common/raf.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var IS_WORKER = self.window === undefined;
var CONTEXT = IS_WORKER ? self : window;
var raf = {
    requestTimeout: function requestTimeout(fn, delay) {
        if (!CONTEXT.requestAnimationFrame) return setTimeout(fn, delay);

        var start = Date.now(),
            handle = new Object();

        function loop(timestamp) {
            Date.now() - start >= delay ? fn(timestamp) : handle.value = CONTEXT.requestAnimationFrame(loop);
        };

        handle.value = CONTEXT.requestAnimationFrame(loop);
        return handle;
    },
    clearRequestTimeout: function clearRequestTimeout(handle) {
        CONTEXT.cancelAnimationFrame ? CONTEXT.cancelAnimationFrame(handle.value) : clearTimeout(handle);
    }
};

exports.default = raf;

/***/ }),

/***/ "./src/ccjs/dom/dom.js":
/*!*****************************!*\
  !*** ./src/ccjs/dom/dom.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _common = __webpack_require__(/*! ../common/common */ "./src/ccjs/common/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var dom = {
    select: function select(selector) {
        if (selector === undefined) {
            return;
        }

        var _selector = selector.charAt(0);
        var name = selector.substring(1);
        var doms = [];
        switch (_selector) {
            case '#':
                return document.getElementById(name);
            default:
                doms = document.querySelectorAll(selector) || [];
        }

        return doms;
    },
    create: function create(tag) {
        var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var ns = arguments[3];

        return ns ? dom.createElementNS(tag, id, options) : dom.createElement(tag, id, options);
    },
    createElement: function createElement(tag) {
        var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var element = document.createElement(tag);

        var elementId = id || tag + '_' + _common2.default.createId();
        element.setAttribute('id', elementId);
        return element;
    },
    createElementNS: function createElementNS(tag) {
        var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var element = document.createElementNS("http://www.w3.org/2000/svg", tag);
        var elementId = id || tag + '_' + _common2.default.createId();
        element._isNS = true;
        element.setAttributeNS(null, 'id', elementId);

        return element;
    }
};

Element.prototype._eventListeners = new Map();
Element.prototype._bound = new Map();
Element.prototype._memory = {};
Element.prototype._isNS = false;
Element.prototype._options = {};

Element.prototype.add = function (tag, id, options) {
    var child = dom.create(tag, id, options);
    return this.addElement(child);
};

Element.prototype.addNS = function (tag, id, options) {
    var child = dom.create(tag, id, options);
    return this.addElement(child);
};

Element.prototype.addElement = function (child) {
    this.appendChild(child);
    return child;
};

Element.prototype.addClass = function (className) {
    this.classList.add(className);
    return this;
};

Element.prototype.removeClass = function (className) {
    this.classList.remove(className);
    return this;
};

Element.prototype.getAttr = function (key) {
    return this.getAttribute(key);
};

Element.prototype.attr = function (key, value) {
    this._setElement('attr', key, value);
    return this;
};

Element.prototype.getMemory = function () {
    return this._memory;
};

Element.prototype.memory = function (obj) {
    this._memory = obj;
    return this;
};

Element.prototype.getProp = function (key) {
    return this[key];
};

Element.prototype.prop = function (key, value) {
    this._setElement('prop', key, value);
    return this;
};

Element.prototype.css = function (key, value) {
    this._setElement('css', key, value);
    return this;
};

Element.prototype.bind = function (key, fn) {
    if (key) {
        var self = this;
        this._bound.set(key, fn);
        this.classList.add('storage_' + key);
        setTimeout(function () {
            self._react(key, cc.getValue('key'));
        });
    }
    return this;
};
Element.prototype.unbind = function (key) {
    var self = this;
    this._bound.delete(key);
    this.classList.remove('storage_' + key);
    return this;
};

Element.prototype._react = function (key, value) {
    var fn = this._bound.get(key);
    if (fn) {
        if (fn.call(this, value, this._data) === false) {
            this.unbind(key);
        }
    }
};

Element.prototype.on = function (eventName, fn) {
    var tag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var self = this;
    var eventTag = eventName + tag;
    var _eventHandler = this._eventListeners.get(eventTag);
    if (_eventHandler) {
        this.removeEventListener(eventName, _eventHandler);
        this._eventListeners.delete(eventTag);
    }
    if (fn) {
        _eventHandler = function eventHandler(e) {
            if (fn.call(self, e, self._data) === false) {
                self.removeEventListener(eventName, _eventHandler);
            }
        };
        this._eventListeners.set(eventTag, _eventHandler);
        this.addEventListener(eventName, _eventHandler, false);
    }
    return self;
};

Element.prototype.content = function (str) {
    this.innerText = str;
    return this;
};

Element.prototype.removeSelf = function () {
    this.removeAllChildren();
    if (this.remove) {
        this.remove();
    } else {
        this.parentNode.removeChild(this);
    }
};

Element.prototype.removeAllChildren = function () {
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }
};

Element.prototype._setElement = function (type, key, value) {
    var self = this;
    if (key === undefined) {
        return this;
    }
    if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
        _common2.default.objectforEach(key, function (item, key) {
            self[type](key, item);
        });
        return this;
    }

    var v = _common2.default.readValue(value);

    switch (type) {
        case 'prop':
            this[key] = value;
            break;
        case 'attr':
            if (value === false) {
                this.removeAttribute(key);
            } else {
                this._isNS ? this.setAttributeNS(null, key, value) : this.setAttribute(key, value);
            }
            break;
        case 'css':
            this.style[key] = value;
            break;
    }
    return this;
};

Element.prototype.isInViewport = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var offsetX = options.offsetX || 0;
    var offsetY = options.offsetY || 0;

    var _getBoundingClientRec = this.getBoundingClientRect(),
        x = _getBoundingClientRec.x,
        y = _getBoundingClientRec.y,
        width = _getBoundingClientRec.width,
        height = _getBoundingClientRec.height; //IE not support bottom right


    var x2 = x + width;
    var y2 = y + height;
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;
    return !(x2 <= offsetX || x >= innerWidth - offsetX || y2 <= offsetY || y >= innerHeight - offsetY);
};

exports.default = dom;

/***/ }),

/***/ "./src/ccjs/storage/storage.js":
/*!*************************************!*\
  !*** ./src/ccjs/storage/storage.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _common = __webpack_require__(/*! ../common/common */ "./src/ccjs/common/common.js");

var _common2 = _interopRequireDefault(_common);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var storage = {
    dataMap: new Map(),
    timerMap: new Map(),
    setValue: function setValue(key, value) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var self = this;
        var dataMap = this.dataMap;
        var reset = options.reset;

        var shouldReact = false;
        var oldValue = dataMap.get(key);
        if (_common2.default.isObject(value) && _common2.default.isObject(oldValue) && reset !== true) {
            _common2.default.objectforEach(value, function (item, key, obj) {
                if (item !== value) {
                    shouldReact = true;
                }
                obj[key] = value[key];
            });
        } else {
            shouldReact = true;
            dataMap.set(key, value);
        }

        var newValue = dataMap.get(key);

        if (shouldReact) {
            this.broadcast(key, newValue, options);
        }

        return newValue;
    },
    broadcast: function broadcast(key, newValue) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var self = this;
        var timer = this.timerMap.get(key);

        if (timer) {
            cc.cancelTimer(timer);
        }

        timer = cc.setTimer(function () {
            var doms = document.getElementsByClassName('storage_' + key) || [];
            for (var i = 0; i < doms.length; i++) {
                var dom = doms[i];
                dom._react && dom._react(key, newValue);
            }
            self.timerMap.delete(key);
        }, options.immediately ? 0 : 10);

        this.timerMap.set(key, timer);
    },
    getValue: function getValue(key) {
        return this.dataMap.get(key);
    }
};

exports.default = storage;

/***/ }),

/***/ "./src/ccjs/xhr/xhr.js":
/*!*****************************!*\
  !*** ./src/ccjs/xhr/xhr.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var xhr = {
    ajax: function ajax() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var promise = new Promise(function (resolve, reject) {
            var _ref = params || {},
                url = _ref.url,
                method = _ref.method,
                data = _ref.data,
                async = _ref.async,
                xhr = _ref.xhr,
                contentType = _ref.contentType,
                dataType = _ref.dataType,
                done = _ref.done,
                fail = _ref.fail;

            var header = params.header,
                onProgress = params.onProgress,
                beforeSend = params.beforeSend;

            var request = new XMLHttpRequest();
            request.open(method || 'GET', url, async === undefined ? true : async);

            for (var key in header || {}) {
                if ((header || {}).hasOwnProperty(key)) {
                    request.setRequestHeader(key, header[key]);
                }
            }
            if (cc.getValue('Authorization')) {
                request.setRequestHeader('Authorization', cc.getValue('Authorization'));
            }
            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    done && done(parseData(request.responseText), request);
                    resolve(parseData(request.responseText), request);
                } else {
                    fail && fail(parseData(request.responseText), request);
                    reject(parseData(request.responseText));
                }
            };

            request.onerror = function () {
                fail && fail(parseData(request.responseText), request);
                reject(parseData(request.responseText));
            };

            request.upload.onprogress = function (e) {
                var p = Math.floor(e.loaded / e.total * 100);
                onProgress && onProgress(p, e);
            };

            var _data = void 0;
            switch (dataType) {
                case 'file':
                    _data = data;
                    break;
                case 'json':
                default:
                    request.setRequestHeader('Content-Type', contentType === undefined ? "application/json; charset=utf-8" : contentType);
                    _data = JSON.stringify(data);
            }

            beforeSend && beforeSend(request);

            request.send(_data);
        });

        return promise;
    }
};

function parseData(data) {
    try {
        return JSON.parse(data || '');
    } catch (e) {
        return undefined;
    }
}

exports.default = xhr;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY29tbW9uL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy9jb21tb24vcmFmLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvc3RvcmFnZS9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL3hoci94aHIuanMiXSwibmFtZXMiOlsiSVNfV09SS0VSIiwic2VsZiIsIkNPTlRFWFQiLCJ3aW5kb3ciLCJjYyIsInV0aWxzIiwiY29tbW9uIiwibG9hZCIsImFkZE9ucyIsIm9wdGlvbnMiLCJzZWxlY3QiLCJkb20iLCJjcmVhdGVFbGVtZW50IiwiY3JlYXRlRWxlbWVudE5TIiwic2V0VmFsdWUiLCJzdG9yYWdlIiwic2F2ZUFycmF5IiwiYXJyIiwiaWRrZXkiLCJrZXkiLCJpdGVtIiwidXBkYXRlVmFsdWUiLCJnZXRWYWx1ZSIsInNldFRpbWVyIiwicmFmIiwiY2FuY2VsVGltZXIiLCJyZXF1ZXN0IiwicGFyYW1zIiwieGhyIiwibGFzdCIsImZyYW1lVGlja2VyIiwiaW1tZWRpYXRlbHkiLCJvYmoiLCJmbiIsInRhcmdldCIsInNvdXJjZSIsIk1hdGgiLCJzNCIsIk9iamVjdCIsImlzSUUiLCJpc0Nocm9tZSIsImlzT3BlcmEiLCJvcHIiLCJuYXZpZ2F0b3IiLCJwIiwic2FmYXJpIiwiZG9jdW1lbnQiLCJvdXRwdXQiLCJhcmd1bWVudHMiLCJpIiwiRWxlbWVudCIsInZhbHVlIiwidmFycyIsInBhcnRzIiwicmVxdWVzdFRpbWVvdXQiLCJzZXRUaW1lb3V0Iiwic3RhcnQiLCJEYXRlIiwiaGFuZGxlIiwiY2xlYXJSZXF1ZXN0VGltZW91dCIsImNsZWFyVGltZW91dCIsInNlbGVjdG9yIiwiX3NlbGVjdG9yIiwibmFtZSIsImRvbXMiLCJjcmVhdGUiLCJpZCIsIm5zIiwiZWxlbWVudCIsImVsZW1lbnRJZCIsInRhZyIsImNoaWxkIiwiZXZlbnRUYWciLCJldmVudE5hbWUiLCJldmVudEhhbmRsZXIiLCJ2Iiwib2Zmc2V0WCIsIm9mZnNldFkiLCJ4MiIsIngiLCJ5MiIsInkiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJkYXRhTWFwIiwidGltZXJNYXAiLCJzaG91bGRSZWFjdCIsIm9sZFZhbHVlIiwicmVzZXQiLCJuZXdWYWx1ZSIsImJyb2FkY2FzdCIsInRpbWVyIiwiYWpheCIsInByb21pc2UiLCJtZXRob2QiLCJhc3luYyIsImhlYWRlciIsImRvbmUiLCJwYXJzZURhdGEiLCJyZXNvbHZlIiwiZmFpbCIsInJlamVjdCIsImUiLCJvblByb2dyZXNzIiwiX2RhdGEiLCJjb250ZW50VHlwZSIsIkpTT04iLCJiZWZvcmVTZW5kIiwiZGF0YSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7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QkEsaUJBQTdCLEtBQW1EO0FBQy9DdUUsNEJBQVFBLEtBQUtDLFVBQVV4RSxRQUFmdUUsWUFBS0MsQ0FBTEQsRUFBUkEsT0FBUUEsQ0FBUkE7QUFDQUUsNEJBQVFELFVBQVV4RSxRQUFsQnlFLFlBQVFELENBQVJDO0FBRkosdUJBR087QUFDSEMsNEJBQVFBLEtBQUtGLFVBQVV4RSxRQUFmMEUsWUFBS0YsQ0FBTEUsRUFBUkEsT0FBUUEsQ0FBUkE7QUFDQUMsMkJBQU9ILFVBQVV4RSxRQUFqQjJFLFlBQU9ILENBQVBHO0FBQ0g7QUFQTDNFOztBQVVBQSw4QkFBa0IsWUFBWTtBQUMxQjBFLHdCQUFRQSxLQUFLRixVQUFVeEUsUUFBZjBFLFlBQUtGLENBQUxFLEVBQVJBLE9BQVFBLENBQVJBO0FBQ0FDLHVCQUFPSCxVQUFVeEUsUUFBakIyRSxZQUFPSCxDQUFQRztBQUZKM0U7O0FBS0FBLHdDQUE0QixhQUFhO0FBQ3JDLG9CQUFJa0IsSUFBSVIsV0FBV2tFLFdBQVdBLEVBQVhBLFFBQW5CLEdBQVFsRSxDQUFSO0FBQ0FtRSw4QkFBY0EsY0FBZEEsQ0FBY0EsQ0FBZEE7QUFGSjdFOztBQUtBLGdCQUFJOEUsYUFBSjtBQUNBO0FBQ0k7QUFDSUE7QUFDQTtBQUNKO0FBQ0E7QUFDSTlFLDZEQUF5QytFLGdFQUF6Qy9FO0FBQ0E4RSw0QkFBUUUsZUFBUkYsSUFBUUUsQ0FBUkY7QUFQUjs7QUFVQUcsMEJBQWNBLFdBQWRBLE9BQWNBLENBQWRBOztBQUVBakY7QUEvQ0osU0FBYyxDQUFkOztBQWtEQTtBQUNIO0FBckRPLENBQVo7O0FBd0RBLHlCQUF5QjtBQUNyQixRQUFHO0FBQ0MsZUFBT2dGLFdBQVdFLFFBQWxCLEVBQU9GLENBQVA7QUFESixNQUVDLFVBQVU7QUFDUDtBQUNIO0FBQ0o7O2tCQUVjOUUsRyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NjanMvY2MuanNcIik7XG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tL2RvbSc7XHJcbmltcG9ydCBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlJztcclxuaW1wb3J0IHJhZiBmcm9tICcuL2NvbW1vbi9yYWYnO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gJy4vY29tbW9uL2NvbW1vbic7XHJcbmltcG9ydCB4aHIgZnJvbSAnLi94aHIveGhyJztcclxuXHJcbmNvbnN0IElTX1dPUktFUiA9IHNlbGYud2luZG93ID09PSB1bmRlZmluZWQ7XHJcbmNvbnN0IENPTlRFWFQgPSBJU19XT1JLRVIgPyBzZWxmIDogd2luZG93O1xyXG5cclxudmFyIGNjO1xyXG53aW5kb3cuY2MgPSBjYyA9IHtcclxuICAgIHV0aWxzOiBjb21tb24sXHJcbiAgICBsb2FkOiBmdW5jdGlvbihhZGRPbnMgPSBbXSwgb3B0aW9ucyA9IHt9KXtcclxuXHJcbiAgICB9LFxyXG4gICAgc2VsZWN0OiBmdW5jdGlvbihzZWxlY3Rvcil7XHJcbiAgICAgICAgcmV0dXJuIGRvbS5zZWxlY3Qoc2VsZWN0b3IpXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHRhZ05hbWUsIGlkLCBvcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvbS5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIGlkLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZUVsZW1lbnROUzogZnVuY3Rpb24gKHRhZ05hbWUsIGlkLCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICByZXR1cm4gZG9tLmNyZWF0ZUVsZW1lbnROUyh0YWdOYW1lLCBpZCwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMucmVzZXQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlLnNldFZhbHVlKGtleSwgdmFsdWUsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgc2F2ZUFycmF5OiBmdW5jdGlvbihrZXksIGFyciA9IFtdLCBpZGtleSl7XHJcbiAgICAgICAgaWYoaWRrZXkgIT09IHVuZGVmaW5lZCAmJiBpZGtleSAhPT0gJycgJiYga2V5ICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgY2MudXBkYXRlVmFsdWUoaXRlbVtpZGtleV0sIGl0ZW0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2Muc2V0VmFsdWUoa2V5LCBhcnIpO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZVZhbHVlOiBmdW5jdGlvbihrZXksIHZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlLnNldFZhbHVlKGtleSwgdmFsdWUsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgZ2V0VmFsdWU6ICBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2UuZ2V0VmFsdWUoa2V5KTtcclxuICAgIH0sXHJcbiAgICBzZXRUaW1lcjogZnVuY3Rpb24gKGZuLCBkZWxheSkge1xyXG4gICAgICAgIHJldHVybiByYWYucmVxdWVzdFRpbWVvdXQoZm4sIGRlbGF5KVxyXG4gICAgfSxcclxuICAgIGNhbmNlbFRpbWVyOiBmdW5jdGlvbiAoaGFuZGxlKSB7XHJcbiAgICAgICAgcmFmLmNsZWFyUmVxdWVzdFRpbWVvdXQoaGFuZGxlKTtcclxuICAgIH0sXHJcbiAgICByZXF1ZXN0OiBmdW5jdGlvbiAocGFyYW1zID0ge30pIHtcclxuICAgICAgICByZXR1cm4geGhyLmFqYXgocGFyYW1zKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5pZihJU19XT1JLRVIpe1xyXG4gICAgZGVsZXRlIGNjLnNlbGVjdDtcclxuICAgIGRlbGV0ZSBjYy5jcmVhdGVFbGVtZW50O1xyXG4gICAgZGVsZXRlIGNjLmNyZWF0ZUVsZW1lbnROUztcclxufWVsc2V7XHJcbiAgICBsZXQgbGFzdCA9IDBcclxuICAgIGxldCBmcmFtZVRpY2tlciA9IGZ1bmN0aW9uICh0aW1lc3RhbXApIHtcclxuICAgICAgICBjYy5zZXRWYWx1ZSgnZnJhbWUnLCB0aW1lc3RhbXAsIHtpbW1lZGlhdGVseTogdHJ1ZX0pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGltZXN0YW1wIC0gbGFzdCk7XHJcbiAgICAgICAgbGFzdCA9IHRpbWVzdGFtcDtcclxuICAgICAgICByYWYucmVxdWVzdFRpbWVvdXQoZnJhbWVUaWNrZXIsIDE2KVxyXG4gICAgfTtcclxuICAgIGZyYW1lVGlja2VyKDApO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2M7IiwiY29uc3QgSVNfV09SS0VSID0gc2VsZi53aW5kb3cgPT09IHVuZGVmaW5lZDtcclxuY29uc3QgQ09OVEVYVCA9IElTX1dPUktFUiA/IHNlbGYgOiB3aW5kb3c7XHJcbmNvbnN0IGNvbW1vbiA9IHt9O1xyXG5cclxuY29tbW9uLm9iamVjdGZvckVhY2ggPSBmdW5jdGlvbihvYmosZm4pe1xyXG4gICAgZm9yKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIGZuKG9ialtrZXldLCBrZXksIG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29tbW9uLm9iamVjdEFzc2lnbiA9IGZ1bmN0aW9uKHRhcmdldCA9IHt9LCBzb3VyY2Upe1xyXG4gICAgZm9yKGxldCBrZXkgaW4gc291cmNlKSB7XHJcbiAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59O1xyXG5cclxuY29tbW9uLmNyZWF0ZUlkID0gZnVuY3Rpb24oKXtcclxuICAgIGZ1bmN0aW9uIHM0KCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxyXG4gICAgICAgICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcbn07XHJcblxyXG5jb21tb24uaXNPYmplY3QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIChpdGVtIT09dW5kZWZpbmVkICYmIGl0ZW0gPT09IE9iamVjdChpdGVtKSAmJiAhKGl0ZW0gaW5zdGFuY2VvZiBBcnJheSkpXHJcbn07XHJcblxyXG5jb21tb24uZ2V0QnJvd3NlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGlzSUUgPSBmYWxzZTtcclxuICAgIGxldCBpc0Nocm9tZSA9IGZhbHNlO1xyXG4gICAgbGV0IGlzT3BlcmEgPSBmYWxzZTtcclxuICAgIGlmICgoISFDT05URVhULm9wciAmJiAhIW9wci5hZGRvbnMpIHx8ICEhQ09OVEVYVC5vcGVyYSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBPUFIvJykgPj0gMCkge1xyXG4gICAgICAgIGlzT3BlcmEgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiAnb3BlcmEnO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBJbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xyXG4gICAgfVxyXG4gICAgaWYgKC9jb25zdHJ1Y3Rvci9pLnRlc3QoQ09OVEVYVC5IVE1MRWxlbWVudCkgfHwgKGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgcmV0dXJuIHAudG9TdHJpbmcoKSA9PT0gXCJbb2JqZWN0IFNhZmFyaVJlbW90ZU5vdGlmaWNhdGlvbl1cIjtcclxuICAgIH0pKCFDT05URVhUWydzYWZhcmknXSB8fCBzYWZhcmkucHVzaE5vdGlmaWNhdGlvbikpIHtcclxuICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XHJcbiAgICB9XHJcbiAgICBpZiAoZmFsc2UgfHwgISFkb2N1bWVudC5kb2N1bWVudE1vZGUpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50c1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoISgncmVtb3ZlJyBpbiBFbGVtZW50LnByb3RvdHlwZSkpIHtcclxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXNJRSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuICdpZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoIWlzSUUgJiYgISFDT05URVhULlN0eWxlTWVkaWEpIHtcclxuICAgICAgICByZXR1cm4gJ2VkZ2UnO1xyXG4gICAgfVxyXG4gICAgaWYgKCEhQ09OVEVYVC5jaHJvbWUgJiYgISFDT05URVhULmNocm9tZS53ZWJzdG9yZSkge1xyXG4gICAgICAgIGlzQ2hyb21lID0gdHJ1ZVxyXG4gICAgICAgIHJldHVybiAnY2hyb21lJztcclxuICAgIH1cclxuICAgIGlmICgoaXNDaHJvbWUgfHwgaXNPcGVyYSkgJiYgISFDT05URVhULkNTUykge1xyXG4gICAgICAgIHJldHVybiAnYmxpbmsnO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29tbW9uLnJlYWRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgaWYodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpe1xyXG4gICAgICAgIHJldHVybiB2YWx1ZShvcHRpb25zKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbW1vbi5nZXRVcmxWYXIgPSBmdW5jdGlvbiAoa2V5LCBkZWZhdWx0VmFsdWUpIHtcclxuICAgIHZhciB2YXJzID0ge307XHJcbiAgICB2YXIgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIGZ1bmN0aW9uIChtLCBrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyc1trZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiAodmFyc1trZXldID09PSB1bmRlZmluZWQ/IGRlZmF1bHRWYWx1ZTogdmFyc1trZXldKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1vbjsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxudmFyIHJhZiA9IHtcclxuICAgIHJlcXVlc3RUaW1lb3V0OiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgaWYgKCFDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZSlcclxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZm4sIGRlbGF5KTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgaGFuZGxlID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb29wKHRpbWVzdGFtcCkge1xyXG4gICAgICAgICAgICAoRGF0ZS5ub3coKSAtIHN0YXJ0KSA+PSBkZWxheSA/IGZuKHRpbWVzdGFtcCkgOiBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICByZXR1cm4gaGFuZGxlO1xyXG4gICAgfSxcclxuICAgIGNsZWFyUmVxdWVzdFRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICBDT05URVhULmNhbmNlbEFuaW1hdGlvbkZyYW1lID8gQ09OVEVYVC5jYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpOmNsZWFyVGltZW91dChoYW5kbGUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmFmOyIsImltcG9ydCBjb21tb24gZnJvbSAnLi4vY29tbW9uL2NvbW1vbidcclxudmFyIGRvbSA9IHtcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIGlmKHNlbGVjdG9yPT09dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IF9zZWxlY3RvciA9IHNlbGVjdG9yLmNoYXJBdCgwKTtcclxuICAgICAgICBsZXQgbmFtZSA9IHNlbGVjdG9yLnN1YnN0cmluZygxKTtcclxuICAgICAgICBsZXQgZG9tcyA9IFtdO1xyXG4gICAgICAgIHN3aXRjaCAoX3NlbGVjdG9yKXtcclxuICAgICAgICAgICAgY2FzZSAnIyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZSk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBkb21zID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpIHx8IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRvbXM7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlOiBmdW5jdGlvbiAodGFnLCBpZCA9ICcnLCBvcHRpb25zID0ge30sIG5zKSB7XHJcbiAgICAgICAgcmV0dXJuIG5zP2RvbS5jcmVhdGVFbGVtZW50TlModGFnLCBpZCwgb3B0aW9ucyk6ZG9tLmNyZWF0ZUVsZW1lbnQodGFnLCBpZCwgb3B0aW9ucyk7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHRhZywgaWQgPSAnJywgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgICAgIGxldCBlbGVtZW50SWQgPSBpZCB8fCAodGFnICsgJ18nICsgY29tbW9uLmNyZWF0ZUlkKCkpO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIGVsZW1lbnRJZCk7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudE5TOiBmdW5jdGlvbiAodGFnLCBpZCA9ICcnLCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIHRhZyk7XHJcbiAgICAgICAgbGV0IGVsZW1lbnRJZCA9IGlkIHx8ICh0YWcgKyAnXycgKyBjb21tb24uY3JlYXRlSWQoKSk7XHJcbiAgICAgICAgZWxlbWVudC5faXNOUyA9IHRydWU7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGVOUyhudWxsLCdpZCcsIGVsZW1lbnRJZCk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfSxcclxufTtcclxuXHJcbkVsZW1lbnQucHJvdG90eXBlLl9ldmVudExpc3RlbmVycyA9IG5ldyBNYXAoKTtcclxuRWxlbWVudC5wcm90b3R5cGUuX2JvdW5kID0gbmV3IE1hcCgpO1xyXG5FbGVtZW50LnByb3RvdHlwZS5fbWVtb3J5ID0ge307XHJcbkVsZW1lbnQucHJvdG90eXBlLl9pc05TID0gZmFsc2U7XHJcbkVsZW1lbnQucHJvdG90eXBlLl9vcHRpb25zID0ge307XHJcblxyXG5FbGVtZW50LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodGFnLCBpZCwgb3B0aW9ucykge1xyXG4gICAgbGV0IGNoaWxkID0gZG9tLmNyZWF0ZSh0YWcsIGlkLCBvcHRpb25zKTtcclxuICAgIHJldHVybiB0aGlzLmFkZEVsZW1lbnQoY2hpbGQpO1xyXG59O1xyXG5cclxuRWxlbWVudC5wcm90b3R5cGUuYWRkTlMgPSBmdW5jdGlvbiAodGFnLCBpZCwgb3B0aW9ucykge1xyXG4gICAgbGV0IGNoaWxkID0gZG9tLmNyZWF0ZSh0YWcsIGlkLCBvcHRpb25zKTtcclxuICAgIHJldHVybiB0aGlzLmFkZEVsZW1lbnQoY2hpbGQpO1xyXG59O1xyXG5cclxuRWxlbWVudC5wcm90b3R5cGUuYWRkRWxlbWVudCA9IGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgdGhpcy5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgICByZXR1cm4gY2hpbGRcclxufTtcclxuXHJcbkVsZW1lbnQucHJvdG90eXBlLmFkZENsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgdGhpcy5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbkVsZW1lbnQucHJvdG90eXBlLmdldEF0dHIgPSBmdW5jdGlvbihrZXkpe1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKGtleSk7XHJcbn07XHJcblxyXG5FbGVtZW50LnByb3RvdHlwZS5hdHRyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgIHRoaXMuX3NldEVsZW1lbnQoJ2F0dHInLCBrZXksIHZhbHVlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuRWxlbWVudC5wcm90b3R5cGUuZ2V0TWVtb3J5ID0gZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiB0aGlzLl9tZW1vcnk7XHJcbn07XHJcblxyXG5FbGVtZW50LnByb3RvdHlwZS5tZW1vcnkgPSBmdW5jdGlvbihvYmope1xyXG4gICAgdGhpcy5fbWVtb3J5ID0gb2JqO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5FbGVtZW50LnByb3RvdHlwZS5nZXRQcm9wID0gZnVuY3Rpb24oa2V5KXtcclxuICAgIHJldHVybiB0aGlzW2tleV07XHJcbn07XHJcblxyXG5FbGVtZW50LnByb3RvdHlwZS5wcm9wID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgIHRoaXMuX3NldEVsZW1lbnQoJ3Byb3AnLCBrZXksIHZhbHVlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuRWxlbWVudC5wcm90b3R5cGUuY3NzID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XHJcbiAgICB0aGlzLl9zZXRFbGVtZW50KCdjc3MnLCBrZXksIHZhbHVlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuRWxlbWVudC5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKGtleSwgZm4pe1xyXG4gICAgaWYoa2V5KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kLnNldChrZXksIGZuKTtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ3N0b3JhZ2VfJyArIGtleSk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuX3JlYWN0KGtleSwgY2MuZ2V0VmFsdWUoJ2tleScpKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5FbGVtZW50LnByb3RvdHlwZS51bmJpbmQgPSBmdW5jdGlvbihrZXkpe1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5fYm91bmQuZGVsZXRlKGtleSk7XHJcbiAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ3N0b3JhZ2VfJyArIGtleSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbkVsZW1lbnQucHJvdG90eXBlLl9yZWFjdCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xyXG4gICAgbGV0IGZuID0gdGhpcy5fYm91bmQuZ2V0KGtleSk7XHJcbiAgICBpZihmbil7XHJcbiAgICAgICAgaWYoZm4uY2FsbCh0aGlzLCB2YWx1ZSwgdGhpcy5fZGF0YSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgdGhpcy51bmJpbmQoa2V5KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbkVsZW1lbnQucHJvdG90eXBlLm9uICA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZm4sIHRhZyA9ICcnKXtcclxuICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgIGxldCBldmVudFRhZyA9IGV2ZW50TmFtZSArIHRhZztcclxuICAgIGxldCBldmVudEhhbmRsZXIgPSB0aGlzLl9ldmVudExpc3RlbmVycy5nZXQoZXZlbnRUYWcpO1xyXG4gICAgaWYoZXZlbnRIYW5kbGVyKXtcclxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJzLmRlbGV0ZShldmVudFRhZyk7XHJcbiAgICB9XHJcbiAgICBpZihmbikge1xyXG4gICAgICAgIGV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmKGZuLmNhbGwoc2VsZiwgZSwgc2VsZi5fZGF0YSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2V2ZW50TGlzdGVuZXJzLnNldChldmVudFRhZywgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzZWxmO1xyXG59O1xyXG5cclxuRWxlbWVudC5wcm90b3R5cGUuY29udGVudCA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgIHRoaXMuaW5uZXJUZXh0ID0gc3RyO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVTZWxmID0gZnVuY3Rpb24oKXtcclxuICAgIHRoaXMucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgIGlmKHRoaXMucmVtb3ZlKXtcclxuICAgICAgICB0aGlzLnJlbW92ZSgpXHJcbiAgICB9ZWxzZXtcclxuICAgICAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVBbGxDaGlsZHJlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICB3aGlsZSAodGhpcy5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmZpcnN0Q2hpbGQpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuRWxlbWVudC5wcm90b3R5cGUuX3NldEVsZW1lbnQgPSBmdW5jdGlvbih0eXBlLCBrZXkgLCB2YWx1ZSl7XHJcbiAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIGNvbW1vbi5vYmplY3Rmb3JFYWNoKGtleSAsZnVuY3Rpb24gKGl0ZW0sIGtleSkge1xyXG4gICAgICAgICAgICBzZWxmW3R5cGVdKGtleSwgaXRlbSlcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdiA9IGNvbW1vbi5yZWFkVmFsdWUodmFsdWUpO1xyXG5cclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ3Byb3AnOlxyXG4gICAgICAgICAgICB0aGlzW2tleV0gPSAgdmFsdWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2F0dHInOlxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShrZXkpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9pc05TP3RoaXMuc2V0QXR0cmlidXRlTlMobnVsbCwga2V5LCB2YWx1ZSk6dGhpcy5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdjc3MnOlxyXG4gICAgICAgICAgICB0aGlzLnN0eWxlW2tleV0gPSAgdmFsdWU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbkVsZW1lbnQucHJvdG90eXBlLmlzSW5WaWV3cG9ydCA9IGZ1bmN0aW9uIChvcHRpb25zID0ge30pIHtcclxuICAgIGxldCBvZmZzZXRYID0gb3B0aW9ucy5vZmZzZXRYIHx8IDA7XHJcbiAgICBsZXQgb2Zmc2V0WSA9IG9wdGlvbnMub2Zmc2V0WSB8fCAwO1xyXG4gICAgbGV0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7IC8vSUUgbm90IHN1cHBvcnQgYm90dG9tIHJpZ2h0XHJcbiAgICBsZXQgeDIgPSB4ICsgd2lkdGg7XHJcbiAgICBsZXQgeTIgPSB5ICsgaGVpZ2h0O1xyXG4gICAgbGV0IGlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIGxldCBpbm5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgIHJldHVybiAhKHgyIDw9IChvZmZzZXRYKXx8IHggPj0gKGlubmVyV2lkdGggLSBvZmZzZXRYKSB8fCB5MiA8PSAob2Zmc2V0WSkgfHwgeSA+PSAoaW5uZXJIZWlnaHQgLSBvZmZzZXRZKSlcclxufTtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkb207IiwiaW1wb3J0IGNvbW1vbiBmcm9tICcuLi9jb21tb24vY29tbW9uJztcclxuXHJcbnZhciBzdG9yYWdlID0ge1xyXG4gICAgZGF0YU1hcDogbmV3IE1hcCgpLFxyXG4gICAgdGltZXJNYXA6ICBuZXcgTWFwKCksXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZGF0YU1hcCA9IHRoaXMuZGF0YU1hcDtcclxuICAgICAgICBsZXQge3Jlc2V0fSA9IG9wdGlvbnM7XHJcbiAgICAgICAgbGV0IHNob3VsZFJlYWN0ID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG9sZFZhbHVlID0gZGF0YU1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZihjb21tb24uaXNPYmplY3QodmFsdWUpICYmIGNvbW1vbi5pc09iamVjdChvbGRWYWx1ZSkgJiYgcmVzZXQgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgY29tbW9uLm9iamVjdGZvckVhY2godmFsdWUsIGZ1bmN0aW9uIChpdGVtLCBrZXksIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkUmVhY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZVtrZXldXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgc2hvdWxkUmVhY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBkYXRhTWFwLnNldChrZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IGRhdGFNYXAuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIGlmKHNob3VsZFJlYWN0KSB7XHJcbiAgICAgICAgICAgdGhpcy5icm9hZGNhc3Qoa2V5LCBuZXdWYWx1ZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICB9LFxyXG4gICAgYnJvYWRjYXN0OiBmdW5jdGlvbihrZXksIG5ld1ZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgdGltZXIgPSB0aGlzLnRpbWVyTWFwLmdldChrZXkpO1xyXG5cclxuICAgICAgICBpZiAodGltZXIpIHtcclxuICAgICAgICAgICAgY2MuY2FuY2VsVGltZXIodGltZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGltZXIgPSBjYy5zZXRUaW1lcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBkb21zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3RvcmFnZV8nICsga2V5KSB8fCBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb21zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG9tID0gZG9tc1tpXTtcclxuICAgICAgICAgICAgICAgIGRvbS5fcmVhY3QgJiYgZG9tLl9yZWFjdChrZXksIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnRpbWVyTWFwLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIH0sIG9wdGlvbnMuaW1tZWRpYXRlbHk/IDA6IDEwKTtcclxuXHJcbiAgICAgICAgdGhpcy50aW1lck1hcC5zZXQoa2V5LCB0aW1lcik7XHJcbiAgICB9LFxyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhTWFwLmdldChrZXkpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3RvcmFnZTsiLCJjb25zdCB4aHIgPSB7XHJcbiAgICBhamF4OiBmdW5jdGlvbiAocGFyYW1zID0ge30pIHtcclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgbGV0IHt1cmwsIG1ldGhvZCwgZGF0YSwgYXN5bmMsIHhociwgY29udGVudFR5cGUsIGRhdGFUeXBlLCBkb25lLCBmYWlsfSA9IHBhcmFtcyB8fCB7fTtcclxuICAgICAgICAgICAgbGV0IHtoZWFkZXIsIG9uUHJvZ3Jlc3MsIGJlZm9yZVNlbmR9ID0gcGFyYW1zO1xyXG4gICAgICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICByZXF1ZXN0Lm9wZW4oKG1ldGhvZCB8fCAnR0VUJyksIHVybCwgYXN5bmMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhc3luYyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gKGhlYWRlciB8fCB7fSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoaGVhZGVyIHx8IHt9KS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNjLmdldFZhbHVlKCdBdXRob3JpemF0aW9uJykpe1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgY2MuZ2V0VmFsdWUoJ0F1dGhvcml6YXRpb24nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9uZSAmJiBkb25lKHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCksIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhaWwgJiYgZmFpbChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmYWlsICYmIGZhaWwocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0LnVwbG9hZC5vbnByb2dyZXNzID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwID0gTWF0aC5mbG9vcihlLmxvYWRlZCAvIGUudG90YWwgKiAxMDApO1xyXG4gICAgICAgICAgICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKHAsIGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IF9kYXRhO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGFUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdmaWxlJzpcclxuICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdqc29uJzpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSA9PT0gdW5kZWZpbmVkID8gXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIgOiBjb250ZW50VHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmVmb3JlU2VuZCAmJiBiZWZvcmVTZW5kKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdC5zZW5kKF9kYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZnVuY3Rpb24gcGFyc2VEYXRhKGRhdGEpIHtcclxuICAgIHRyeXtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhIHx8ICcnKVxyXG4gICAgfWNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB4aHI7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=