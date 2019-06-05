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

        options.NS = true;
        return _dom2.default.createElement(tagName, id, options);
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

common.objectAssign = function (target, source) {
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
    createElement: function createElement(tag) {
        var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var element = document.createElement(tag);

        var elementId = id || tag + '_' + _common2.default.createId();
        element.setAttribute('id', elementId);

        setupElementMethods(element, options);

        return element;
    }
};

function setupElementMethods(element, options) {
    element._eventListeners = new Map();
    element._bound = new Map();

    element.add = function (tag, id, options) {
        var child = dom.createElement(tag, id, options);
        return this.addElement(child);
    };

    element.addElement = function (child) {
        this.appendChild(child);
        return child;
    };

    element.addClass = function (className) {
        this.classList.add(className);
        return this;
    };

    element.removeClass = function (className) {
        this.classList.remove(className);
        return this;
    };

    element.getAttr = function (key) {
        return element.getAttribute(key);
    };

    element.attr = function (key, value) {
        this._setElement('attr', key, value);
        return this;
    };

    element.getData = function () {
        return this._data;
    };

    element.data = function (any) {
        this._data = any;
        return this;
    };

    element.getProp = function (key) {
        return element[key];
    };

    element.prop = function (key, value) {
        this._setElement('prop', key, value);
        return this;
    };

    element.css = function (key, value) {
        this._setElement('css', key, value);
        return this;
    };

    element.bind = function (key, fn) {
        if (key) {
            var self = this;
            this._bound.set(key, fn);
            this.classList.add('storage_' + key);
        }
        return this;
    };
    element.unbind = function (key) {
        var self = this;
        this._bound.delete(key);
        this.classList.remove('storage_' + key);
        return this;
    };

    element._react = function (key, value) {
        var fn = this._bound.get(key);
        if (fn) {
            if (fn.call(this, value, this._data) === false) {
                this.unbind(key);
            }
        }
    };

    element.on = function (eventName, fn) {
        var tag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        var self = this;
        var eventTag = eventName + tag;
        var _eventHandler = element._eventListeners.get(eventTag);
        if (_eventHandler) {
            this.removeEventListener(eventName, _eventHandler);
            element._eventListeners.delete(eventTag);
        }
        if (fn) {
            _eventHandler = function eventHandler(e) {
                if (fn.call(self, e, self._data) === false) {
                    self.removeEventListener(eventName, _eventHandler);
                }
            };
            element._eventListeners.set(eventTag, _eventHandler);
            this.addEventListener(eventName, _eventHandler, false);
        }
        return self;
    };

    element.content = function (str) {
        this.innerText = str;
        return this;
    };

    element.removeSelf = function () {
        this.removeAllChildren();
        if (this.remove) {
            this.remove();
        } else {
            this.parentNode.removeChild(this);
        }
    };

    element.removeAllChildren = function () {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
    };

    element._setElement = function (type, key, value) {
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
                    this.setAttribute(key, value);
                }
                break;
            case 'css':
                this.style[key] = value;
                break;
        }
        return this;
    };

    element.isInViewport = function () {
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
        return !(x2 <= 0 + offsetX || x >= innerWidth - offsetX || y2 <= 0 + offsetY || y >= innerHeight - offsetY);
    };
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY29tbW9uL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy9jb21tb24vcmFmLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvc3RvcmFnZS9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL3hoci94aHIuanMiXSwibmFtZXMiOlsiSVNfV09SS0VSIiwic2VsZiIsIkNPTlRFWFQiLCJ3aW5kb3ciLCJjYyIsInV0aWxzIiwiY29tbW9uIiwibG9hZCIsImFkZE9ucyIsIm9wdGlvbnMiLCJzZWxlY3QiLCJkb20iLCJjcmVhdGVFbGVtZW50IiwiY3JlYXRlRWxlbWVudE5TIiwic2V0VmFsdWUiLCJzdG9yYWdlIiwic2F2ZUFycmF5IiwiYXJyIiwiaWRrZXkiLCJrZXkiLCJpdGVtIiwidXBkYXRlVmFsdWUiLCJnZXRWYWx1ZSIsInNldFRpbWVyIiwicmFmIiwiY2FuY2VsVGltZXIiLCJyZXF1ZXN0IiwicGFyYW1zIiwieGhyIiwibGFzdCIsImZyYW1lVGlja2VyIiwiaW1tZWRpYXRlbHkiLCJvYmoiLCJmbiIsInNvdXJjZSIsInRhcmdldCIsIk1hdGgiLCJzNCIsIk9iamVjdCIsImlzSUUiLCJpc0Nocm9tZSIsImlzT3BlcmEiLCJvcHIiLCJuYXZpZ2F0b3IiLCJwIiwic2FmYXJpIiwiZG9jdW1lbnQiLCJvdXRwdXQiLCJhcmd1bWVudHMiLCJpIiwiRWxlbWVudCIsInZhbHVlIiwidmFycyIsInBhcnRzIiwicmVxdWVzdFRpbWVvdXQiLCJzZXRUaW1lb3V0Iiwic3RhcnQiLCJEYXRlIiwiaGFuZGxlIiwiY2xlYXJSZXF1ZXN0VGltZW91dCIsImNsZWFyVGltZW91dCIsInNlbGVjdG9yIiwiX3NlbGVjdG9yIiwibmFtZSIsImRvbXMiLCJpZCIsImVsZW1lbnQiLCJlbGVtZW50SWQiLCJ0YWciLCJzZXR1cEVsZW1lbnRNZXRob2RzIiwiY2hpbGQiLCJldmVudFRhZyIsImV2ZW50TmFtZSIsImV2ZW50SGFuZGxlciIsInYiLCJvZmZzZXRYIiwib2Zmc2V0WSIsIngyIiwieCIsInkyIiwieSIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImRhdGFNYXAiLCJ0aW1lck1hcCIsInNob3VsZFJlYWN0Iiwib2xkVmFsdWUiLCJyZXNldCIsIm5ld1ZhbHVlIiwiYnJvYWRjYXN0IiwidGltZXIiLCJhamF4IiwicHJvbWlzZSIsIm1ldGhvZCIsImFzeW5jIiwiaGVhZGVyIiwiZG9uZSIsInBhcnNlRGF0YSIsInJlc29sdmUiLCJmYWlsIiwicmVqZWN0IiwiZSIsIm9uUHJvZ3Jlc3MiLCJfZGF0YSIsImNvbnRlbnRUeXBlIiwiSlNPTiIsImJlZm9yZVNlbmQiLCJkYXRhIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtB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QUFRRSxlQUFSRixJQUFRRSxDQUFSRjtBQVBSOztBQVVBRywwQkFBY0EsV0FBZEEsT0FBY0EsQ0FBZEE7O0FBRUFoRjtBQS9DSixTQUFjLENBQWQ7O0FBa0RBO0FBQ0g7QUFyRE8sQ0FBWjs7QUF3REEseUJBQXlCO0FBQ3JCLFFBQUc7QUFDQyxlQUFPK0UsV0FBV0UsUUFBbEIsRUFBT0YsQ0FBUDtBQURKLE1BRUMsVUFBVTtBQUNQO0FBQ0g7QUFDSjs7a0JBRWM3RSxHIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY2Nqcy9jYy5qc1wiKTtcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20vZG9tJztcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2UnO1xyXG5pbXBvcnQgcmFmIGZyb20gJy4vY29tbW9uL3JhZic7XHJcbmltcG9ydCBjb21tb24gZnJvbSAnLi9jb21tb24vY29tbW9uJztcclxuaW1wb3J0IHhociBmcm9tICcuL3hoci94aHInO1xyXG5cclxuY29uc3QgSVNfV09SS0VSID0gc2VsZi53aW5kb3cgPT09IHVuZGVmaW5lZDtcclxuY29uc3QgQ09OVEVYVCA9IElTX1dPUktFUiA/IHNlbGYgOiB3aW5kb3c7XHJcblxyXG52YXIgY2M7XHJcbndpbmRvdy5jYyA9IGNjID0ge1xyXG4gICAgdXRpbHM6IGNvbW1vbixcclxuICAgIGxvYWQ6IGZ1bmN0aW9uKGFkZE9ucyA9IFtdLCBvcHRpb25zID0ge30pe1xyXG5cclxuICAgIH0sXHJcbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcclxuICAgICAgICByZXR1cm4gZG9tLnNlbGVjdChzZWxlY3RvcilcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbiAodGFnTmFtZSwgaWQsIG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gZG9tLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgaWQsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudE5TOiBmdW5jdGlvbiAodGFnTmFtZSwgaWQsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMuTlMgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBkb20uY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBpZCwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMucmVzZXQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlLnNldFZhbHVlKGtleSwgdmFsdWUsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgc2F2ZUFycmF5OiBmdW5jdGlvbihrZXksIGFyciA9IFtdLCBpZGtleSl7XHJcbiAgICAgICAgaWYoaWRrZXkgIT09IHVuZGVmaW5lZCAmJiBpZGtleSAhPT0gJycgJiYga2V5ICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgY2MudXBkYXRlVmFsdWUoaXRlbVtpZGtleV0sIGl0ZW0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2Muc2V0VmFsdWUoa2V5LCBhcnIpO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZVZhbHVlOiBmdW5jdGlvbihrZXksIHZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlLnNldFZhbHVlKGtleSwgdmFsdWUsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgZ2V0VmFsdWU6ICBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2UuZ2V0VmFsdWUoa2V5KTtcclxuICAgIH0sXHJcbiAgICBzZXRUaW1lcjogZnVuY3Rpb24gKGZuLCBkZWxheSkge1xyXG4gICAgICAgIHJldHVybiByYWYucmVxdWVzdFRpbWVvdXQoZm4sIGRlbGF5KVxyXG4gICAgfSxcclxuICAgIGNhbmNlbFRpbWVyOiBmdW5jdGlvbiAoaGFuZGxlKSB7XHJcbiAgICAgICAgcmFmLmNsZWFyUmVxdWVzdFRpbWVvdXQoaGFuZGxlKTtcclxuICAgIH0sXHJcbiAgICByZXF1ZXN0OiBmdW5jdGlvbiAocGFyYW1zID0ge30pIHtcclxuICAgICAgICByZXR1cm4geGhyLmFqYXgocGFyYW1zKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5pZihJU19XT1JLRVIpe1xyXG4gICAgZGVsZXRlIGNjLnNlbGVjdDtcclxuICAgIGRlbGV0ZSBjYy5jcmVhdGVFbGVtZW50O1xyXG4gICAgZGVsZXRlIGNjLmNyZWF0ZUVsZW1lbnROUztcclxufWVsc2V7XHJcbiAgICBsZXQgbGFzdCA9IDBcclxuICAgIGxldCBmcmFtZVRpY2tlciA9IGZ1bmN0aW9uICh0aW1lc3RhbXApIHtcclxuICAgICAgICBjYy5zZXRWYWx1ZSgnZnJhbWUnLCB0aW1lc3RhbXAsIHtpbW1lZGlhdGVseTogdHJ1ZX0pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGltZXN0YW1wIC0gbGFzdCk7XHJcbiAgICAgICAgbGFzdCA9IHRpbWVzdGFtcDtcclxuICAgICAgICByYWYucmVxdWVzdFRpbWVvdXQoZnJhbWVUaWNrZXIsIDE2KVxyXG4gICAgfTtcclxuICAgIGZyYW1lVGlja2VyKDApO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2M7IiwiY29uc3QgSVNfV09SS0VSID0gc2VsZi53aW5kb3cgPT09IHVuZGVmaW5lZDtcclxuY29uc3QgQ09OVEVYVCA9IElTX1dPUktFUiA/IHNlbGYgOiB3aW5kb3c7XHJcbmNvbnN0IGNvbW1vbiA9IHt9O1xyXG5cclxuY29tbW9uLm9iamVjdGZvckVhY2ggPSBmdW5jdGlvbihvYmosZm4pe1xyXG4gICAgZm9yKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIGZuKG9ialtrZXldLCBrZXksIG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29tbW9uLm9iamVjdEFzc2lnbiA9IGZ1bmN0aW9uKHRhcmdldCwgc291cmNlKXtcclxuICAgIGZvcihsZXQga2V5IGluIHNvdXJjZSkge1xyXG4gICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufTtcclxuXHJcbmNvbW1vbi5jcmVhdGVJZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBmdW5jdGlvbiBzNCgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcclxuICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxyXG4gICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xyXG59O1xyXG5cclxuY29tbW9uLmlzT2JqZWN0ID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHJldHVybiAoaXRlbSE9PXVuZGVmaW5lZCAmJiBpdGVtID09PSBPYmplY3QoaXRlbSkgJiYgIShpdGVtIGluc3RhbmNlb2YgQXJyYXkpKVxyXG59O1xyXG5cclxuY29tbW9uLmdldEJyb3dzZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCBpc0lFID0gZmFsc2U7XHJcbiAgICBsZXQgaXNDaHJvbWUgPSBmYWxzZTtcclxuICAgIGxldCBpc09wZXJhID0gZmFsc2U7XHJcbiAgICBpZiAoKCEhQ09OVEVYVC5vcHIgJiYgISFvcHIuYWRkb25zKSB8fCAhIUNPTlRFWFQub3BlcmEgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCcgT1BSLycpID49IDApIHtcclxuICAgICAgICBpc09wZXJhID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gJ29wZXJhJztcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgSW5zdGFsbFRyaWdnZXIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuICdmaXJlZm94JztcclxuICAgIH1cclxuICAgIGlmICgvY29uc3RydWN0b3IvaS50ZXN0KENPTlRFWFQuSFRNTEVsZW1lbnQpIHx8IChmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIHJldHVybiBwLnRvU3RyaW5nKCkgPT09IFwiW29iamVjdCBTYWZhcmlSZW1vdGVOb3RpZmljYXRpb25dXCI7XHJcbiAgICB9KSghQ09OVEVYVFsnc2FmYXJpJ10gfHwgc2FmYXJpLnB1c2hOb3RpZmljYXRpb24pKSB7XHJcbiAgICAgICAgcmV0dXJuICdzYWZhcmknO1xyXG4gICAgfVxyXG4gICAgaWYgKGZhbHNlIHx8ICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlKSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBhcmd1bWVudHNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKCEoJ3JlbW92ZScgaW4gRWxlbWVudC5wcm90b3R5cGUpKSB7XHJcbiAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlzSUUgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiAnaWUnO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpc0lFICYmICEhQ09OVEVYVC5TdHlsZU1lZGlhKSB7XHJcbiAgICAgICAgcmV0dXJuICdlZGdlJztcclxuICAgIH1cclxuICAgIGlmICghIUNPTlRFWFQuY2hyb21lICYmICEhQ09OVEVYVC5jaHJvbWUud2Vic3RvcmUpIHtcclxuICAgICAgICBpc0Nocm9tZSA9IHRydWVcclxuICAgICAgICByZXR1cm4gJ2Nocm9tZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoKGlzQ2hyb21lIHx8IGlzT3BlcmEpICYmICEhQ09OVEVYVC5DU1MpIHtcclxuICAgICAgICByZXR1cm4gJ2JsaW5rJztcclxuICAgIH1cclxufTtcclxuXHJcbmNvbW1vbi5yZWFkVmFsdWUgPSBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucyA9IHt9KXtcclxuICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKXtcclxuICAgICAgICByZXR1cm4gdmFsdWUob3B0aW9ucyk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb21tb24uZ2V0VXJsVmFyID0gZnVuY3Rpb24gKGtleSwgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICB2YXIgdmFycyA9IHt9O1xyXG4gICAgdmFyIHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLCBmdW5jdGlvbiAobSwga2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHZhcnNba2V5XSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKHZhcnNba2V5XSA9PT0gdW5kZWZpbmVkPyBkZWZhdWx0VmFsdWU6IHZhcnNba2V5XSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tb247IiwiY29uc3QgSVNfV09SS0VSID0gc2VsZi53aW5kb3cgPT09IHVuZGVmaW5lZDtcclxuY29uc3QgQ09OVEVYVCA9IElTX1dPUktFUiA/IHNlbGYgOiB3aW5kb3c7XHJcbnZhciByYWYgPSB7XHJcbiAgICByZXF1ZXN0VGltZW91dDogZnVuY3Rpb24gKGZuLCBkZWxheSkge1xyXG4gICAgICAgIGlmICghQ09OVEVYVC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpXHJcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZuLCBkZWxheSk7XHJcblxyXG4gICAgICAgIHZhciBzdGFydCA9IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIGhhbmRsZSA9IG5ldyBPYmplY3QoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9vcCh0aW1lc3RhbXApIHtcclxuICAgICAgICAgICAgKERhdGUubm93KCkgLSBzdGFydCkgPj0gZGVsYXkgPyBmbih0aW1lc3RhbXApIDogaGFuZGxlLnZhbHVlID0gQ09OVEVYVC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaGFuZGxlLnZhbHVlID0gQ09OVEVYVC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZTtcclxuICAgIH0sXHJcbiAgICBjbGVhclJlcXVlc3RUaW1lb3V0OiBmdW5jdGlvbiAoaGFuZGxlKSB7XHJcbiAgICAgICAgQ09OVEVYVC5jYW5jZWxBbmltYXRpb25GcmFtZSA/IENPTlRFWFQuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKTpjbGVhclRpbWVvdXQoaGFuZGxlKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJhZjsiLCJpbXBvcnQgY29tbW9uIGZyb20gJy4uL2NvbW1vbi9jb21tb24nXHJcbnZhciBkb20gPSB7XHJcbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcclxuICAgICAgICBpZihzZWxlY3Rvcj09PXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBfc2VsZWN0b3IgPSBzZWxlY3Rvci5jaGFyQXQoMCk7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBzZWxlY3Rvci5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgbGV0IGRvbXMgPSBbXTtcclxuICAgICAgICBzd2l0Y2ggKF9zZWxlY3Rvcil7XHJcbiAgICAgICAgICAgIGNhc2UgJyMnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5hbWUpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgZG9tcyA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSB8fCBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkb21zO1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0YWcsIGlkID0gJycsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuICAgICAgICBsZXQgZWxlbWVudElkID0gaWQgfHwgKHRhZyArICdfJyArIGNvbW1vbi5jcmVhdGVJZCgpKTtcclxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBlbGVtZW50SWQpO1xyXG5cclxuICAgICAgICBzZXR1cEVsZW1lbnRNZXRob2RzKGVsZW1lbnQsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH0sXHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZXR1cEVsZW1lbnRNZXRob2RzKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuICAgIGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzID0gbmV3IE1hcCgpO1xyXG4gICAgZWxlbWVudC5fYm91bmQgPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgZWxlbWVudC5hZGQgPSBmdW5jdGlvbiAodGFnLCBpZCwgb3B0aW9ucykge1xyXG4gICAgICAgIGxldCBjaGlsZCA9IGRvbS5jcmVhdGVFbGVtZW50KHRhZywgaWQsIG9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZEVsZW1lbnQoY2hpbGQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmFkZEVsZW1lbnQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICAgICAgICByZXR1cm4gY2hpbGRcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5hZGRDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5nZXRBdHRyID0gZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KTtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5hdHRyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zZXRFbGVtZW50KCdhdHRyJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuZ2V0RGF0YSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5kYXRhID0gZnVuY3Rpb24oYW55KXtcclxuICAgICAgICB0aGlzLl9kYXRhID0gYW55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmdldFByb3AgPSBmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50W2tleV07XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQucHJvcCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudCgncHJvcCcsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmNzcyA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xyXG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnQoJ2NzcycsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmJpbmQgPSBmdW5jdGlvbihrZXksIGZuKXtcclxuICAgICAgICBpZihrZXkpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLl9ib3VuZC5zZXQoa2V5LCBmbik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnc3RvcmFnZV8nICsga2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgZWxlbWVudC51bmJpbmQgPSBmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9ib3VuZC5kZWxldGUoa2V5KTtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ3N0b3JhZ2VfJyArIGtleSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuX3JlYWN0ID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XHJcbiAgICAgICAgbGV0IGZuID0gdGhpcy5fYm91bmQuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYoZm4pe1xyXG4gICAgICAgICAgICBpZihmbi5jYWxsKHRoaXMsIHZhbHVlLCB0aGlzLl9kYXRhKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmQoa2V5KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50Lm9uICA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZm4sIHRhZyA9ICcnKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGV2ZW50VGFnID0gZXZlbnROYW1lICsgdGFnO1xyXG4gICAgICAgIGxldCBldmVudEhhbmRsZXIgPSBlbGVtZW50Ll9ldmVudExpc3RlbmVycy5nZXQoZXZlbnRUYWcpO1xyXG4gICAgICAgIGlmKGV2ZW50SGFuZGxlcil7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzLmRlbGV0ZShldmVudFRhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGZuKSB7XHJcbiAgICAgICAgICAgIGV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihmbi5jYWxsKHNlbGYsIGUsIHNlbGYuX2RhdGEpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuc2V0KGV2ZW50VGFnLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuY29udGVudCA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICB0aGlzLmlubmVyVGV4dCA9IHN0cjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5yZW1vdmVTZWxmID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgaWYodGhpcy5yZW1vdmUpe1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQucmVtb3ZlQWxsQ2hpbGRyZW4gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5fc2V0RWxlbWVudCA9IGZ1bmN0aW9uKHR5cGUsIGtleSAsIHZhbHVlKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgY29tbW9uLm9iamVjdGZvckVhY2goa2V5ICxmdW5jdGlvbiAoaXRlbSwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmW3R5cGVdKGtleSwgaXRlbSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHYgPSBjb21tb24ucmVhZFZhbHVlKHZhbHVlKTtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3AnOlxyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dHInOlxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKGtleSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjc3MnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZVtrZXldID0gIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnQuaXNJblZpZXdwb3J0ID0gZnVuY3Rpb24gKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGxldCBvZmZzZXRYID0gb3B0aW9ucy5vZmZzZXRYIHx8IDA7XHJcbiAgICAgICAgbGV0IG9mZnNldFkgPSBvcHRpb25zLm9mZnNldFkgfHwgMDtcclxuICAgICAgICBsZXQge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgLy9JRSBub3Qgc3VwcG9ydCBib3R0b20gcmlnaHRcclxuICAgICAgICBsZXQgeDIgPSB4ICsgd2lkdGg7XHJcbiAgICAgICAgbGV0IHkyID0geSArIGhlaWdodDtcclxuICAgICAgICBsZXQgaW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGxldCBpbm5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICByZXR1cm4gISh4MiA8PSAoMCArIG9mZnNldFgpfHwgeCA+PSAoaW5uZXJXaWR0aCAtIG9mZnNldFgpIHx8IHkyIDw9ICgwICsgb2Zmc2V0WSkgfHwgeSA+PSAoaW5uZXJIZWlnaHQgLSBvZmZzZXRZKSlcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRvbTsiLCJpbXBvcnQgY29tbW9uIGZyb20gJy4uL2NvbW1vbi9jb21tb24nO1xyXG5cclxudmFyIHN0b3JhZ2UgPSB7XHJcbiAgICBkYXRhTWFwOiBuZXcgTWFwKCksXHJcbiAgICB0aW1lck1hcDogIG5ldyBNYXAoKSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBkYXRhTWFwID0gdGhpcy5kYXRhTWFwO1xyXG4gICAgICAgIGxldCB7cmVzZXR9ID0gb3B0aW9ucztcclxuICAgICAgICBsZXQgc2hvdWxkUmVhY3QgPSBmYWxzZTtcclxuICAgICAgICBsZXQgb2xkVmFsdWUgPSBkYXRhTWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmKGNvbW1vbi5pc09iamVjdCh2YWx1ZSkgJiYgY29tbW9uLmlzT2JqZWN0KG9sZFZhbHVlKSAmJiByZXNldCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjb21tb24ub2JqZWN0Zm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gKGl0ZW0sIGtleSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG91bGRSZWFjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHZhbHVlW2tleV1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBzaG91bGRSZWFjdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGRhdGFNYXAuc2V0KGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gZGF0YU1hcC5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgaWYoc2hvdWxkUmVhY3QpIHtcclxuICAgICAgICAgICB0aGlzLmJyb2FkY2FzdChrZXksIG5ld1ZhbHVlLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdWYWx1ZTtcclxuICAgIH0sXHJcbiAgICBicm9hZGNhc3Q6IGZ1bmN0aW9uKGtleSwgbmV3VmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB0aW1lciA9IHRoaXMudGltZXJNYXAuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIGlmICh0aW1lcikge1xyXG4gICAgICAgICAgICBjYy5jYW5jZWxUaW1lcih0aW1lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aW1lciA9IGNjLnNldFRpbWVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGRvbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzdG9yYWdlXycgKyBrZXkpIHx8IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkb20gPSBkb21zW2ldO1xyXG4gICAgICAgICAgICAgICAgZG9tLl9yZWFjdCAmJiBkb20uX3JlYWN0KGtleSwgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYudGltZXJNYXAuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgfSwgb3B0aW9ucy5pbW1lZGlhdGVseT8gMDogMTApO1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVyTWFwLnNldChrZXksIHRpbWVyKTtcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFNYXAuZ2V0KGtleSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdG9yYWdlOyIsImNvbnN0IHhociA9IHtcclxuICAgIGFqYXg6IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xyXG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBsZXQge3VybCwgbWV0aG9kLCBkYXRhLCBhc3luYywgeGhyLCBjb250ZW50VHlwZSwgZGF0YVR5cGUsIGRvbmUsIGZhaWx9ID0gcGFyYW1zIHx8IHt9O1xyXG4gICAgICAgICAgICBsZXQge2hlYWRlciwgb25Qcm9ncmVzcywgYmVmb3JlU2VuZH0gPSBwYXJhbXM7XHJcbiAgICAgICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub3BlbigobWV0aG9kIHx8ICdHRVQnKSwgdXJsLCBhc3luYyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFzeW5jKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiAoaGVhZGVyIHx8IHt9KSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKChoZWFkZXIgfHwge30pLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY2MuZ2V0VmFsdWUoJ0F1dGhvcml6YXRpb24nKSl7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBjYy5nZXRWYWx1ZSgnQXV0aG9yaXphdGlvbicpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkb25lICYmIGRvbmUocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbCAmJiBmYWlsKHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCksIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwgJiYgZmFpbChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3QudXBsb2FkLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHAgPSBNYXRoLmZsb29yKGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBvblByb2dyZXNzICYmIG9uUHJvZ3Jlc3MocCwgZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgX2RhdGE7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIF9kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2pzb24nOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlID09PSB1bmRlZmluZWQgPyBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiA6IGNvbnRlbnRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kICYmIGJlZm9yZVNlbmQocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0LnNlbmQoX2RhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5mdW5jdGlvbiBwYXJzZURhdGEoZGF0YSkge1xyXG4gICAgdHJ5e1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEgfHwgJycpXHJcbiAgICB9Y2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHhocjtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==