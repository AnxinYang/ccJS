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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/analyser.js":
/*!*************************!*\
  !*** ./src/analyser.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function analyser(Container) {
    // Establish all variables that your Analyser will use
    var canvas = void 0,
        ctx = void 0,
        source = void 0,
        context = void 0,
        analyser = void 0,
        fbc_array = void 0,
        bars = void 0,
        bar_x = void 0,
        bar_width = void 0,
        bar_height = void 0;
    canvas = Container.add('canvas').css({
        width: '100%',
        height: '100px'
    });
    ctx = canvas.getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, "rgba(255,0,80,0.1)");
    gradient.addColorStop(1, "rgba(255,0,80,0.5)");

    // Create a new instance of an audio object and adjust some of its properties
    var audio = new Audio();
    audio.src = 'gokuraku.mp3';
    audio.controls = true;
    audio.loop = true;
    audio.autoplay = true;

    // Initialize the MP3 player after the page loads all of its HTML into the window
    window.addEventListener("load", initMp3Player, false);

    function initMp3Player() {
        //document.getElementById('audio_box').appendChild(audio);
        context = new AudioContext(); // AudioContext object instance
        analyser = context.createAnalyser(); // AnalyserNode method
        ctx = canvas.getContext('2d');
        // Re-route audio playback into the processing graph of the AudioContext
        source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
        frameLooper();
    }

    function frameLooper() {
        window.requestAnimationFrame(frameLooper);
        fbc_array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbc_array);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        //bars = 1000;
        bar_width = canvas.getBoundingClientRect().width / (fbc_array.length * 3);
        for (var i = 0; i < fbc_array.length; i++) {
            bar_x = i;
            bar_height = -(fbc_array[i] / 2);
            ctx.fillStyle = gradient;
            ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
            if (bar_height < -100) {
                var gradientHit = ctx.createLinearGradient(bar_x - 5, 0, bar_x + 5, 0);
                gradientHit.addColorStop(0, "rgba(255,0,80,0)");
                gradientHit.addColorStop(0.25, "rgba(255,0,80,0)");
                gradientHit.addColorStop(0.5, "rgba(255,0,80,0.8)");
                gradientHit.addColorStop(0.75, "rgba(255,0,80,0)");
                gradientHit.addColorStop(1, "rgba(255,0,80,0)");
                ctx.fillStyle = gradientHit;
                ctx.fillRect(bar_x - 5, 1, 10, 1);
            }
        }
    }
}

exports.default = analyser;

/***/ }),

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
    tools: _common2.default,
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
            case '.':
                doms = document.getElementsByClassName(name) || [];
                break;
            default:
                doms = document.getElementsByTagName(selector) || [];
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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _cc = __webpack_require__(/*! ./ccjs/cc */ "./src/ccjs/cc.js");

var _cc2 = _interopRequireDefault(_cc);

var _analyser = __webpack_require__(/*! ./analyser */ "./src/analyser.js");

var _analyser2 = _interopRequireDefault(_analyser);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var WHITE = 'rgba(255,255,255, 0.7)';
var BLACK = 'rgba(0,0,0, 0.9)';
var RED = '#d63031';

_cc2.default.setValue('viewport', { width: window.innerWidth, height: window.innerHeight });
window.addEventListener('resize', function () {
    _cc2.default.updateValue('viewport', { width: window.innerWidth, height: window.innerHeight });
});
function index() {
    var root = _cc2.default.select('#body');
    var mainContainer = _cc2.default.createElement('div', 'test').addClass('main-container');

    root.appendChild(mainContainer);
    var container = mainContainer.add('div');

    var header = container.add('div', 'header').addClass('header');
    var headerLeft = header.add('div').css({
        display: 'inline-block',
        minWidth: '256px'
    });
    var logo = headerLeft.add('div').content('A').addClass('background-red').addClass('font-black').css({
        fontSize: '64px',
        padding: '0 16px',
        lineHeight: '54px',
        marginRight: '4px',
        display: 'inline-block',
        boxShadow: RED + ' 0 0 10px'
    });

    var nameContainer = headerLeft.add('div').css({
        display: 'inline-block'
    });
    nameContainer.add('span').content('NXIN YANG').css({
        fontSize: '32px',
        display: 'block'
    });
    nameContainer.add('span').content('Front-End Developer').css({
        fontSize: '16px',
        display: 'block'
    });
    var menu = header.add('div').css({
        display: 'flex',
        fontSize: '16px'
    });
    var menuList = ['fa-linkedin', 'fa-github'];
    var links = ['https://www.linkedin.com/in/anxin-yang-707029125/', 'https://github.com/AnxinYang'];
    var hoverColors = ['#0077B5', 'rgba(255,0,80, 0.8)'];
    menuList.forEach(function (tag, idx) {
        menu.add('i').addClass('fab').addClass(menuList[idx]).css({
            cursor: 'pointer',
            lineHeight: '54px',
            textAlign: 'center',
            fontSize: '32px',
            textShadow: ' 0 0 5px',
            transition: '0.3s',
            marginRight: '16px'
        }).on('click', function () {
            window.open(links[idx], '_blank');
        }).on('mouseenter', function () {
            this.css({
                color: hoverColors[idx]
            });
        }, 'style').on('mouseleave', function () {
            this.css({
                color: ''
            });
        }, 'style');
    });

    var mainContentContainer = _cc2.default.createElement('div', 'main_content').css({
        height: 'calc(100vh - 104px)',
        padding: '0 12.5%',
        color: WHITE,
        overflowY: 'auto',
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column'
    }).on('mousemove', function (e) {
        var centerX = window.innerWidth / 2;
        var centerY = window.innerHeight / 2;
        var mouseX = e.clientX;
        var mouseY = e.clientY;
        this.css({
            transform: 'translate(' + -(mouseX - centerX) / 100 + 'px,' + -(mouseY - centerY) / 100 + 'px)'
        });
    }).bind('frame', function () {
        var doms = _cc2.default.select('.fade');
        if (doms.length === 0) {
            this.unbind('frame');
        }
        for (var i = 0; i < doms.length; i++) {
            var dom = doms[i];
            var isInViewPort = dom.isInViewport({ offsetY: 150 });
            var opacity = +dom.style.opacity;
            if (isInViewPort) {
                dom.addClass('slide-in-bottom');
                dom.removeClass('fade-out');
            } else {
                dom.removeClass('slide-in-bottom');
                dom.addClass('fade-out');
            }
        }
    });
    var landingContainer = mainContentContainer.add('div').css({
        height: 'calc(100vh - 104px)'
    });
    var highLight = landingContainer.add('div').content("Let's make data alive").addClass('fade').css({
        color: WHITE,
        fontWeight: 'bold',
        fontSize: '48px',
        textAlign: 'center',
        marginTop: 'calc(50vh - 152px)'
    });
    var intro = landingContainer.add('p').addClass('fade').content("I'm a front-end developer from Bay Area, California, and currently living in San Jose. I enjoy building rich " + "interactive websites and web apps from small to large. ").css({
        fontSize: '20px'
    });

    var skillContainer = mainContentContainer.add('div');
    var skillTitle = skillContainer.add('div').content("Skills").css({
        color: WHITE,
        fontWeight: 'bold',
        fontSize: '48px',
        textAlign: 'center',
        marginTop: '256px'
    });

    var skillCardContainer = skillContainer.add('div').css({
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '128px',
        flexWrap: 'wrap'
    });

    var skills = ['fa-html5', 'fa-js', 'fa-css3-alt', 'fa-react', 'fa-node-js', 'fa-sass'];
    var skillNames = ['HTML5', 'Javascript', 'CSS3', 'React', 'NodeJS', 'SASS'];
    var skillColors = ['#e44d26', '#eeaf4b', '#0070ba', '#61dafb', '#7cb700', '#c69'];
    skills.forEach(function (icon, idx) {
        var card = skillCardContainer.add('div').addClass('fade').css({
            minWidth: '300px',
            textAlign: 'center',
            flexGrow: 1
        });
        var logo = card.add('i').addClass('fab').addClass(icon).css({
            fontSize: '256px',
            display: 'block',
            color: skillColors[idx],
            textShadow: skillColors[idx] + ' 0 0 10px'
        });
        var name = card.add('p').content(skillNames[idx]).css({
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: skillColors[idx],
            textShadow: skillColors[idx] + ' 0 0 10px'
        });
    });

    var careerContainer = mainContentContainer.add('div');
    var careerTitle = skillContainer.add('div').content("Career").css({
        color: WHITE,
        fontWeight: 'bold',
        fontSize: '48px',
        textAlign: 'center',
        marginTop: '128px',
        marginBottom: '64px'
    });

    var companies = ['netElastic Systems, Inc.', 'San Francisco State University', 'Shanghai University'];
    var titles = ['Software Engineer', 'BS - Computer Engineering Student', 'AS - Computer Application Technology Student'];
    var timeLines = ['2017 - Current', '2013 - 2017', '2009 - 2013'];
    var projects = {
        'netElastic Systems, Inc.': ['vBNG Management System (UI Lead)', 'SD-WAN Management System (UI Team Member)']
    };

    companies.forEach(function (companyName, idx) {
        var card = careerContainer.add('div').addClass('fade').css({
            textAlign: 'center',
            marginBottom: '64px'
        });
        var company = card.add('div').content(companyName).css({
            fontSize: '32px',
            fontWeight: 'bold'
        });

        var fontSize = '20px';
        var title = card.add('div').content(titles[idx]).css({
            fontSize: fontSize
        });

        var timeLine = card.add('div').content(timeLines[idx]).css({
            fontSize: fontSize
        });
        (projects[companyName] || []).forEach(function (project) {
            card.add('div').content(project).css({
                fontSize: fontSize
            });
        });
    });

    var footer = mainContentContainer.add('p').content('Powered by ccJS, a self-implemented Javascript Library.').css({
        textAlign: 'center',
        marginTop: '128px'
    });

    var footShadow = container.add('div').addClass('background-solid-black').css({
        position: 'fixed',
        bottom: '0',
        left: 0,
        width: '100%',
        zIndex: 12
        //boxShadow: 'rgba(255, 0, 80, 0.8) 0px 0px 50px 2px'
    });
    (0, _analyser2.default)(footShadow);
    var codeBackgroundText = index.toString();
    var columnWidth = Math.min(400, window.innerWidth - 128);
    var columnCount = Math.min(2, Math.floor(window.innerWidth / columnWidth));
    var codeBackground = container.add('pre').addClass('crtText').css({
        textAlign: 'left',
        top: '128px',
        left: '64px',
        position: 'fixed',
        color: 'rgba(255,255,255, 0.06)',
        zIndex: 0,
        columnCount: columnCount,
        columnWidth: columnWidth + 'px',
        width: 'calc(100vw - 128px)'
    }).data({
        counter: 0
    }).bind('frame', function () {
        var _getData = this.getData(),
            counter = _getData.counter,
            str = _getData.str;

        this.css({
            transform: 'translateY(' + -mainContentContainer.scrollTop / 6 + 'px)'
        });
        counter += 4;
        if (counter >= codeBackgroundText.length) {
            //counter = codeBackgroundText.length - 1;
            return false;
        } else {
            this.innerText = codeBackgroundText.substring(0, counter) + '_';
        }
        this.data({ counter: counter });
    }).bind('viewport', function (d) {
        var height = d.height,
            width = d.width;

        var columnWidth = Math.min(400, width - 128);
        var columnCount = Math.min(2, Math.floor(width / columnWidth));
        this.css({
            columnCount: columnCount,
            columnWidth: columnWidth + 'px'
        });
    });

    mainContainer.addElement(container);
    container.addElement(header);
    container.addElement(mainContentContainer);
}
index();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuYWx5c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2NjLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2NvbW1vbi9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY29tbW9uL3JhZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy9kb20vZG9tLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy94aHIveGhyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjYW52YXMiLCJjdHgiLCJzb3VyY2UiLCJjb250ZXh0IiwiYW5hbHlzZXIiLCJmYmNfYXJyYXkiLCJiYXJzIiwiYmFyX3giLCJiYXJfd2lkdGgiLCJiYXJfaGVpZ2h0Iiwid2lkdGgiLCJoZWlnaHQiLCJncmFkaWVudCIsImF1ZGlvIiwid2luZG93IiwiZnJhbWVMb29wZXIiLCJpIiwiZ3JhZGllbnRIaXQiLCJJU19XT1JLRVIiLCJzZWxmIiwiQ09OVEVYVCIsImNjIiwidG9vbHMiLCJjb21tb24iLCJsb2FkIiwiYWRkT25zIiwib3B0aW9ucyIsInNlbGVjdCIsImRvbSIsImNyZWF0ZUVsZW1lbnQiLCJjcmVhdGVFbGVtZW50TlMiLCJzZXRWYWx1ZSIsInN0b3JhZ2UiLCJzYXZlQXJyYXkiLCJhcnIiLCJpZGtleSIsImtleSIsIml0ZW0iLCJ1cGRhdGVWYWx1ZSIsImdldFZhbHVlIiwic2V0VGltZXIiLCJyYWYiLCJjYW5jZWxUaW1lciIsInJlcXVlc3QiLCJwYXJhbXMiLCJ4aHIiLCJsYXN0IiwiZnJhbWVUaWNrZXIiLCJpbW1lZGlhdGVseSIsIm9iaiIsImZuIiwidGFyZ2V0IiwiTWF0aCIsInM0IiwiT2JqZWN0IiwiaXNJRSIsImlzQ2hyb21lIiwiaXNPcGVyYSIsIm9wciIsIm5hdmlnYXRvciIsInAiLCJzYWZhcmkiLCJkb2N1bWVudCIsIm91dHB1dCIsImFyZ3VtZW50cyIsIkVsZW1lbnQiLCJ2YWx1ZSIsInJlcXVlc3RUaW1lb3V0Iiwic2V0VGltZW91dCIsInN0YXJ0IiwiRGF0ZSIsImhhbmRsZSIsImNsZWFyUmVxdWVzdFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJzZWxlY3RvciIsIl9zZWxlY3RvciIsIm5hbWUiLCJkb21zIiwiaWQiLCJlbGVtZW50IiwiZWxlbWVudElkIiwidGFnIiwic2V0dXBFbGVtZW50TWV0aG9kcyIsImNoaWxkIiwiZXZlbnRUYWciLCJldmVudE5hbWUiLCJldmVudEhhbmRsZXIiLCJ2Iiwib2Zmc2V0WCIsIm9mZnNldFkiLCJ4MiIsIngiLCJ5MiIsInkiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJkYXRhTWFwIiwidGltZXJNYXAiLCJzaG91bGRSZWFjdCIsIm9sZFZhbHVlIiwicmVzZXQiLCJuZXdWYWx1ZSIsImJyb2FkY2FzdCIsInRpbWVyIiwiYWpheCIsInByb21pc2UiLCJtZXRob2QiLCJhc3luYyIsImhlYWRlciIsImRvbmUiLCJwYXJzZURhdGEiLCJyZXNvbHZlIiwiZmFpbCIsInJlamVjdCIsImUiLCJvblByb2dyZXNzIiwiX2RhdGEiLCJjb250ZW50VHlwZSIsIkpTT04iLCJiZWZvcmVTZW5kIiwiZGF0YSIsIldISVRFIiwiQkxBQ0siLCJSRUQiLCJyb290IiwibWFpbkNvbnRhaW5lciIsImNvbnRhaW5lciIsImhlYWRlckxlZnQiLCJkaXNwbGF5IiwibWluV2lkdGgiLCJsb2dvIiwiZm9udFNpemUiLCJwYWRkaW5nIiwibGluZUhlaWdodCIsIm1hcmdpblJpZ2h0IiwiYm94U2hhZG93IiwibmFtZUNvbnRhaW5lciIsIm1lbnUiLCJtZW51TGlzdCIsImxpbmtzIiwiaG92ZXJDb2xvcnMiLCJjdXJzb3IiLCJ0ZXh0QWxpZ24iLCJ0ZXh0U2hhZG93IiwidHJhbnNpdGlvbiIsImNvbG9yIiwibWFpbkNvbnRlbnRDb250YWluZXIiLCJvdmVyZmxvd1kiLCJwb3NpdGlvbiIsInpJbmRleCIsImZsZXhEaXJlY3Rpb24iLCJjZW50ZXJYIiwiY2VudGVyWSIsIm1vdXNlWCIsIm1vdXNlWSIsInRyYW5zZm9ybSIsImlzSW5WaWV3UG9ydCIsIm9wYWNpdHkiLCJsYW5kaW5nQ29udGFpbmVyIiwiaGlnaExpZ2h0IiwiZm9udFdlaWdodCIsIm1hcmdpblRvcCIsImludHJvIiwic2tpbGxDb250YWluZXIiLCJza2lsbFRpdGxlIiwic2tpbGxDYXJkQ29udGFpbmVyIiwianVzdGlmeUNvbnRlbnQiLCJmbGV4V3JhcCIsInNraWxscyIsInNraWxsTmFtZXMiLCJza2lsbENvbG9ycyIsImNhcmQiLCJmbGV4R3JvdyIsImNhcmVlckNvbnRhaW5lciIsImNhcmVlclRpdGxlIiwibWFyZ2luQm90dG9tIiwiY29tcGFuaWVzIiwidGl0bGVzIiwidGltZUxpbmVzIiwicHJvamVjdHMiLCJjb21wYW55IiwidGl0bGUiLCJ0aW1lTGluZSIsImZvb3RlciIsImZvb3RTaGFkb3ciLCJib3R0b20iLCJsZWZ0IiwiY29kZUJhY2tncm91bmRUZXh0IiwiaW5kZXgiLCJjb2x1bW5XaWR0aCIsImNvbHVtbkNvdW50IiwiY29kZUJhY2tncm91bmQiLCJ0b3AiLCJjb3VudGVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlD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QUFBQTs7QUFFdkIsaUJBQVM7QUFDTHRDLHVCQUFXLGdCQUFpQixDQUFDVCxxQkFBRCxZQUFqQixJQUFzRDtBQUQ1RCxTQUFUO0FBR0ErQztBQUNBLFlBQUdBLFdBQVdOLG1CQUFkLFFBQXdDO0FBQ3BDO0FBQ0E7QUFGSixlQUdLO0FBQ0QsNkJBQWlCQSwyQ0FBakI7QUFDSDtBQUNELGtCQUFVLEVBQUNNLFNBQVgsT0FBVSxFQUFWO0FBNUJhLHdCQThCQyxhQUFhO0FBQUE7QUFBQTs7QUFFM0IsWUFBSUosY0FBY3pJLGNBQWUxQyxRQUFqQyxHQUFrQjBDLENBQWxCO0FBQ0EsWUFBSTBJLGNBQWMxSSxZQUFZQSxXQUFXMUMsUUFBekMsV0FBOEIwQyxDQUFaQSxDQUFsQjtBQUNBLGlCQUFTO0FBQ0wwSSx5QkFESztBQUVMRCx5QkFBYUEsY0FBYztBQUZ0QixTQUFUO0FBbENSLEtBQXFCLENBQXJCOztBQXlDQWhFO0FBQ0FDO0FBQ0FBO0FBQ0g7QUFDRDhELFEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiZnVuY3Rpb24gYW5hbHlzZXIoQ29udGFpbmVyKSB7XHJcbiAgICAvLyBFc3RhYmxpc2ggYWxsIHZhcmlhYmxlcyB0aGF0IHlvdXIgQW5hbHlzZXIgd2lsbCB1c2VcclxuICAgIGxldCBjYW52YXMsIGN0eCwgc291cmNlLCBjb250ZXh0LCBhbmFseXNlciwgZmJjX2FycmF5LCBiYXJzLCBiYXJfeCwgYmFyX3dpZHRoLCBiYXJfaGVpZ2h0O1xyXG4gICAgY2FudmFzID0gQ29udGFpbmVyLmFkZCgnY2FudmFzJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwcHgnXHJcbiAgICAgICAgfSk7XHJcbiAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGxldCBncmFkaWVudCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCAxMDApO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIFwicmdiYSgyNTUsMCw4MCwwLjEpXCIpO1xyXG4gICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsIFwicmdiYSgyNTUsMCw4MCwwLjUpXCIpO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBhbiBhdWRpbyBvYmplY3QgYW5kIGFkanVzdCBzb21lIG9mIGl0cyBwcm9wZXJ0aWVzXHJcbiAgICBsZXQgYXVkaW8gPSBuZXcgQXVkaW8oKTtcclxuICAgIGF1ZGlvLnNyYyA9ICdnb2t1cmFrdS5tcDMnO1xyXG4gICAgYXVkaW8uY29udHJvbHMgPSB0cnVlO1xyXG4gICAgYXVkaW8ubG9vcCA9IHRydWU7XHJcbiAgICBhdWRpby5hdXRvcGxheSA9IHRydWU7XHJcblxyXG4vLyBJbml0aWFsaXplIHRoZSBNUDMgcGxheWVyIGFmdGVyIHRoZSBwYWdlIGxvYWRzIGFsbCBvZiBpdHMgSFRNTCBpbnRvIHRoZSB3aW5kb3dcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBpbml0TXAzUGxheWVyLCBmYWxzZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdE1wM1BsYXllcigpIHtcclxuICAgICAgICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdWRpb19ib3gnKS5hcHBlbmRDaGlsZChhdWRpbyk7XHJcbiAgICAgICAgY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTsgLy8gQXVkaW9Db250ZXh0IG9iamVjdCBpbnN0YW5jZVxyXG4gICAgICAgIGFuYWx5c2VyID0gY29udGV4dC5jcmVhdGVBbmFseXNlcigpOyAvLyBBbmFseXNlck5vZGUgbWV0aG9kXHJcbiAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgLy8gUmUtcm91dGUgYXVkaW8gcGxheWJhY2sgaW50byB0aGUgcHJvY2Vzc2luZyBncmFwaCBvZiB0aGUgQXVkaW9Db250ZXh0XHJcbiAgICAgICAgc291cmNlID0gY29udGV4dC5jcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UoYXVkaW8pO1xyXG4gICAgICAgIHNvdXJjZS5jb25uZWN0KGFuYWx5c2VyKTtcclxuICAgICAgICBhbmFseXNlci5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgICAgIGZyYW1lTG9vcGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZnJhbWVMb29wZXIoKSB7XHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZUxvb3Blcik7XHJcbiAgICAgICAgZmJjX2FycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQpO1xyXG4gICAgICAgIGFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKGZiY19hcnJheSk7XHJcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpOyAvLyBDbGVhciB0aGUgY2FudmFzXHJcbiAgICAgICAgLy9iYXJzID0gMTAwMDtcclxuICAgICAgICBiYXJfd2lkdGggPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLyAoZmJjX2FycmF5Lmxlbmd0aCAqIDMpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmJjX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJhcl94ID0gaTtcclxuICAgICAgICAgICAgYmFyX2hlaWdodCA9IC0oZmJjX2FycmF5W2ldIC8gMik7XHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudDtcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGJhcl94LCBjYW52YXMuaGVpZ2h0LCBiYXJfd2lkdGgsIGJhcl9oZWlnaHQpO1xyXG4gICAgICAgICAgICBpZihiYXJfaGVpZ2h0PC0xMDApe1xyXG4gICAgICAgICAgICAgICAgbGV0IGdyYWRpZW50SGl0ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KGJhcl94LTUsIDAsIGJhcl94KzUsIDApO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRIaXQuYWRkQ29sb3JTdG9wKDAsIFwicmdiYSgyNTUsMCw4MCwwKVwiKTtcclxuICAgICAgICAgICAgICAgIGdyYWRpZW50SGl0LmFkZENvbG9yU3RvcCgwLjI1LCBcInJnYmEoMjU1LDAsODAsMClcIik7XHJcbiAgICAgICAgICAgICAgICBncmFkaWVudEhpdC5hZGRDb2xvclN0b3AoMC41LCBcInJnYmEoMjU1LDAsODAsMC44KVwiKTtcclxuICAgICAgICAgICAgICAgIGdyYWRpZW50SGl0LmFkZENvbG9yU3RvcCgwLjc1LCBcInJnYmEoMjU1LDAsODAsMClcIik7XHJcbiAgICAgICAgICAgICAgICBncmFkaWVudEhpdC5hZGRDb2xvclN0b3AoMSwgXCJyZ2JhKDI1NSwwLDgwLDApXCIpO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50SGl0O1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGJhcl94LTUsIDEsIDEwLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYW5hbHlzZXI7IiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbS9kb20nO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZSc7XHJcbmltcG9ydCByYWYgZnJvbSAnLi9jb21tb24vcmFmJztcclxuaW1wb3J0IGNvbW1vbiBmcm9tICcuL2NvbW1vbi9jb21tb24nO1xyXG5pbXBvcnQgeGhyIGZyb20gJy4veGhyL3hocic7XHJcblxyXG5jb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxuXHJcbnZhciBjYztcclxud2luZG93LmNjID0gY2MgPSB7XHJcbiAgICB0b29sczogY29tbW9uLFxyXG4gICAgbG9hZDogZnVuY3Rpb24oYWRkT25zID0gW10sIG9wdGlvbnMgPSB7fSl7XHJcblxyXG4gICAgfSxcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIHJldHVybiBkb20uc2VsZWN0KHNlbGVjdG9yKVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBkb20uY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBpZCwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50TlM6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5OUyA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGRvbS5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIGlkLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5yZXNldCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBzYXZlQXJyYXk6IGZ1bmN0aW9uKGtleSwgYXJyID0gW10sIGlka2V5KXtcclxuICAgICAgICBpZihpZGtleSAhPT0gdW5kZWZpbmVkICYmIGlka2V5ICE9PSAnJyAmJiBrZXkgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBjYy51cGRhdGVWYWx1ZShpdGVtW2lka2V5XSwgaXRlbSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5zZXRWYWx1ZShrZXksIGFycik7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlVmFsdWU6IGZ1bmN0aW9uKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gc3RvcmFnZS5nZXRWYWx1ZShrZXkpO1xyXG4gICAgfSxcclxuICAgIHNldFRpbWVyOiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgcmV0dXJuIHJhZi5yZXF1ZXN0VGltZW91dChmbiwgZGVsYXkpXHJcbiAgICB9LFxyXG4gICAgY2FuY2VsVGltZXI6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICByYWYuY2xlYXJSZXF1ZXN0VGltZW91dChoYW5kbGUpO1xyXG4gICAgfSxcclxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xyXG4gICAgICAgIHJldHVybiB4aHIuYWpheChwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmlmKElTX1dPUktFUil7XHJcbiAgICBkZWxldGUgY2Muc2VsZWN0O1xyXG4gICAgZGVsZXRlIGNjLmNyZWF0ZUVsZW1lbnQ7XHJcbiAgICBkZWxldGUgY2MuY3JlYXRlRWxlbWVudE5TO1xyXG59ZWxzZXtcclxuICAgIGxldCBsYXN0ID0gMFxyXG4gICAgbGV0IGZyYW1lVGlja2VyID0gZnVuY3Rpb24gKHRpbWVzdGFtcCkge1xyXG4gICAgICAgIGNjLnNldFZhbHVlKCdmcmFtZScsIHRpbWVzdGFtcCwge2ltbWVkaWF0ZWx5OiB0cnVlfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aW1lc3RhbXAgLSBsYXN0KTtcclxuICAgICAgICBsYXN0ID0gdGltZXN0YW1wO1xyXG4gICAgICAgIHJhZi5yZXF1ZXN0VGltZW91dChmcmFtZVRpY2tlciwgMTYpXHJcbiAgICB9O1xyXG4gICAgZnJhbWVUaWNrZXIoMCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYzsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxuY29uc3QgY29tbW9uID0ge307XHJcblxyXG5jb21tb24ub2JqZWN0Zm9yRWFjaCA9IGZ1bmN0aW9uKG9iaixmbil7XHJcbiAgICBmb3IodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgZm4ob2JqW2tleV0sIGtleSwgb2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb21tb24ub2JqZWN0QXNzaWduID0gZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2Upe1xyXG4gICAgZm9yKGxldCBrZXkgaW4gc291cmNlKSB7XHJcbiAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59O1xyXG5cclxuY29tbW9uLmNyZWF0ZUlkID0gZnVuY3Rpb24oKXtcclxuICAgIGZ1bmN0aW9uIHM0KCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxyXG4gICAgICAgICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcbn07XHJcblxyXG5jb21tb24uaXNPYmplY3QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIChpdGVtIT09dW5kZWZpbmVkICYmIGl0ZW0gPT09IE9iamVjdChpdGVtKSAmJiAhKGl0ZW0gaW5zdGFuY2VvZiBBcnJheSkpXHJcbn07XHJcblxyXG5jb21tb24uZ2V0QnJvd3NlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGlzSUUgPSBmYWxzZTtcclxuICAgIGxldCBpc0Nocm9tZSA9IGZhbHNlO1xyXG4gICAgbGV0IGlzT3BlcmEgPSBmYWxzZTtcclxuICAgIGlmICgoISFDT05URVhULm9wciAmJiAhIW9wci5hZGRvbnMpIHx8ICEhQ09OVEVYVC5vcGVyYSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBPUFIvJykgPj0gMCkge1xyXG4gICAgICAgIGlzT3BlcmEgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiAnb3BlcmEnO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBJbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xyXG4gICAgfVxyXG4gICAgaWYgKC9jb25zdHJ1Y3Rvci9pLnRlc3QoQ09OVEVYVC5IVE1MRWxlbWVudCkgfHwgKGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgcmV0dXJuIHAudG9TdHJpbmcoKSA9PT0gXCJbb2JqZWN0IFNhZmFyaVJlbW90ZU5vdGlmaWNhdGlvbl1cIjtcclxuICAgIH0pKCFDT05URVhUWydzYWZhcmknXSB8fCBzYWZhcmkucHVzaE5vdGlmaWNhdGlvbikpIHtcclxuICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XHJcbiAgICB9XHJcbiAgICBpZiAoZmFsc2UgfHwgISFkb2N1bWVudC5kb2N1bWVudE1vZGUpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50c1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoISgncmVtb3ZlJyBpbiBFbGVtZW50LnByb3RvdHlwZSkpIHtcclxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXNJRSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuICdpZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoIWlzSUUgJiYgISFDT05URVhULlN0eWxlTWVkaWEpIHtcclxuICAgICAgICByZXR1cm4gJ2VkZ2UnO1xyXG4gICAgfVxyXG4gICAgaWYgKCEhQ09OVEVYVC5jaHJvbWUgJiYgISFDT05URVhULmNocm9tZS53ZWJzdG9yZSkge1xyXG4gICAgICAgIGlzQ2hyb21lID0gdHJ1ZVxyXG4gICAgICAgIHJldHVybiAnY2hyb21lJztcclxuICAgIH1cclxuICAgIGlmICgoaXNDaHJvbWUgfHwgaXNPcGVyYSkgJiYgISFDT05URVhULkNTUykge1xyXG4gICAgICAgIHJldHVybiAnYmxpbmsnO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29tbW9uLnJlYWRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgaWYodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpe1xyXG4gICAgICAgIHJldHVybiB2YWx1ZShvcHRpb25zKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1vbjsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxudmFyIHJhZiA9IHtcclxuICAgIHJlcXVlc3RUaW1lb3V0OiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgaWYgKCFDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZSlcclxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZm4sIGRlbGF5KTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgaGFuZGxlID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb29wKHRpbWVzdGFtcCkge1xyXG4gICAgICAgICAgICAoRGF0ZS5ub3coKSAtIHN0YXJ0KSA+PSBkZWxheSA/IGZuKHRpbWVzdGFtcCkgOiBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICByZXR1cm4gaGFuZGxlO1xyXG4gICAgfSxcclxuICAgIGNsZWFyUmVxdWVzdFRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICBDT05URVhULmNhbmNlbEFuaW1hdGlvbkZyYW1lID8gQ09OVEVYVC5jYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpOmNsZWFyVGltZW91dChoYW5kbGUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmFmOyIsImltcG9ydCBjb21tb24gZnJvbSAnLi4vY29tbW9uL2NvbW1vbidcclxudmFyIGRvbSA9IHtcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIGlmKHNlbGVjdG9yPT09dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IF9zZWxlY3RvciA9IHNlbGVjdG9yLmNoYXJBdCgwKTtcclxuICAgICAgICBsZXQgbmFtZSA9IHNlbGVjdG9yLnN1YnN0cmluZygxKTtcclxuICAgICAgICBsZXQgZG9tcyA9IFtdO1xyXG4gICAgICAgIHN3aXRjaCAoX3NlbGVjdG9yKXtcclxuICAgICAgICAgICAgY2FzZSAnIyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZSk7XHJcbiAgICAgICAgICAgIGNhc2UgJy4nOlxyXG4gICAgICAgICAgICAgICAgZG9tcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobmFtZSkgfHwgW107XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGRvbXMgPSAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoc2VsZWN0b3IpIHx8IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRvbXM7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHRhZywgaWQgPSAnJywgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgICAgIGxldCBlbGVtZW50SWQgPSBpZCB8fCAodGFnICsgJ18nICsgY29tbW9uLmNyZWF0ZUlkKCkpO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIGVsZW1lbnRJZCk7XHJcblxyXG4gICAgICAgIHNldHVwRWxlbWVudE1ldGhvZHMoZWxlbWVudCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldHVwRWxlbWVudE1ldGhvZHMoZWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMgPSBuZXcgTWFwKCk7XHJcbiAgICBlbGVtZW50Ll9ib3VuZCA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBlbGVtZW50LmFkZCA9IGZ1bmN0aW9uICh0YWcsIGlkLCBvcHRpb25zKSB7XHJcbiAgICAgICAgbGV0IGNoaWxkID0gZG9tLmNyZWF0ZUVsZW1lbnQodGFnLCBpZCwgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRWxlbWVudChjaGlsZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYWRkRWxlbWVudCA9IGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgIHJldHVybiBjaGlsZFxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmFkZENsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LnJlbW92ZUNsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmdldEF0dHIgPSBmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShrZXkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmF0dHIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnQoJ2F0dHInLCBrZXksIHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5nZXREYXRhID0gZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmRhdGEgPSBmdW5jdGlvbihhbnkpe1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBhbnk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuZ2V0UHJvcCA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRba2V5XTtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5wcm9wID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zZXRFbGVtZW50KCdwcm9wJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuY3NzID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudCgnY3NzJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYmluZCA9IGZ1bmN0aW9uKGtleSwgZm4pe1xyXG4gICAgICAgIGlmKGtleSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvdW5kLnNldChrZXksIGZuKTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdzdG9yYWdlXycgKyBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBlbGVtZW50LnVuYmluZCA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnc3RvcmFnZV8nICsga2V5KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5fcmVhY3QgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcclxuICAgICAgICBsZXQgZm4gPSB0aGlzLl9ib3VuZC5nZXQoa2V5KTtcclxuICAgICAgICBpZihmbil7XHJcbiAgICAgICAgICAgIGlmKGZuLmNhbGwodGhpcywgdmFsdWUsIHRoaXMuX2RhdGEpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZChrZXkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQub24gID0gZnVuY3Rpb24oZXZlbnROYW1lLCBmbiwgdGFnID0gJycpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZXZlbnRUYWcgPSBldmVudE5hbWUgKyB0YWc7XHJcbiAgICAgICAgbGV0IGV2ZW50SGFuZGxlciA9IGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzLmdldChldmVudFRhZyk7XHJcbiAgICAgICAgaWYoZXZlbnRIYW5kbGVyKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuZGVsZXRlKGV2ZW50VGFnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZm4pIHtcclxuICAgICAgICAgICAgZXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmKGZuLmNhbGwoc2VsZiwgZSwgc2VsZi5fZGF0YSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBlbGVtZW50Ll9ldmVudExpc3RlbmVycy5zZXQoZXZlbnRUYWcsIGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50SGFuZGxlciwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5jb250ZW50ID0gZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gc3RyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LnJlbW92ZVNlbGYgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBpZih0aGlzLnJlbW92ZSl7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKClcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5yZW1vdmVBbGxDaGlsZHJlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50Ll9zZXRFbGVtZW50ID0gZnVuY3Rpb24odHlwZSwga2V5ICwgdmFsdWUpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBjb21tb24ub2JqZWN0Zm9yRWFjaChrZXkgLGZ1bmN0aW9uIChpdGVtLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGZbdHlwZV0oa2V5LCBpdGVtKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdiA9IGNvbW1vbi5yZWFkVmFsdWUodmFsdWUpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncHJvcCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYXR0cic6XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoa2V5KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Nzcyc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlW2tleV0gPSAgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5pc0luVmlld3BvcnQgPSBmdW5jdGlvbiAob3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IG9mZnNldFggPSBvcHRpb25zLm9mZnNldFggfHwgMDtcclxuICAgICAgICBsZXQgb2Zmc2V0WSA9IG9wdGlvbnMub2Zmc2V0WSB8fCAwO1xyXG4gICAgICAgIGxldCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOyAvL0lFIG5vdCBzdXBwb3J0IGJvdHRvbSByaWdodFxyXG4gICAgICAgIGxldCB4MiA9IHggKyB3aWR0aDtcclxuICAgICAgICBsZXQgeTIgPSB5ICsgaGVpZ2h0O1xyXG4gICAgICAgIGxldCBpbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgbGV0IGlubmVySGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiAhKHgyIDw9ICgwICsgb2Zmc2V0WCl8fCB4ID49IChpbm5lcldpZHRoIC0gb2Zmc2V0WCkgfHwgeTIgPD0gKDAgKyBvZmZzZXRZKSB8fCB5ID49IChpbm5lckhlaWdodCAtIG9mZnNldFkpKVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZG9tOyIsImltcG9ydCBjb21tb24gZnJvbSAnLi4vY29tbW9uL2NvbW1vbic7XHJcblxyXG52YXIgc3RvcmFnZSA9IHtcclxuICAgIGRhdGFNYXA6IG5ldyBNYXAoKSxcclxuICAgIHRpbWVyTWFwOiAgbmV3IE1hcCgpLFxyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGRhdGFNYXAgPSB0aGlzLmRhdGFNYXA7XHJcbiAgICAgICAgbGV0IHtyZXNldH0gPSBvcHRpb25zO1xyXG4gICAgICAgIGxldCBzaG91bGRSZWFjdCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IGRhdGFNYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYoY29tbW9uLmlzT2JqZWN0KHZhbHVlKSAmJiBjb21tb24uaXNPYmplY3Qob2xkVmFsdWUpICYmIHJlc2V0ICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi5vYmplY3Rmb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiAoaXRlbSwga2V5LCBvYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFJlYWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9ialtrZXldID0gdmFsdWVba2V5XVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHNob3VsZFJlYWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgZGF0YU1hcC5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV3VmFsdWUgPSBkYXRhTWFwLmdldChrZXkpO1xyXG5cclxuICAgICAgICBpZihzaG91bGRSZWFjdCkge1xyXG4gICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KGtleSwgbmV3VmFsdWUsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgfSxcclxuICAgIGJyb2FkY2FzdDogZnVuY3Rpb24oa2V5LCBuZXdWYWx1ZSwgb3B0aW9ucyA9IHt9KXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHRpbWVyID0gdGhpcy50aW1lck1hcC5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgaWYgKHRpbWVyKSB7XHJcbiAgICAgICAgICAgIGNjLmNhbmNlbFRpbWVyKHRpbWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRpbWVyID0gY2Muc2V0VGltZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgZG9tcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N0b3JhZ2VfJyArIGtleSkgfHwgW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9tcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRvbSA9IGRvbXNbaV07XHJcbiAgICAgICAgICAgICAgICBkb20uX3JlYWN0ICYmIGRvbS5fcmVhY3Qoa2V5LCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi50aW1lck1hcC5kZWxldGUoa2V5KTtcclxuICAgICAgICB9LCBvcHRpb25zLmltbWVkaWF0ZWx5PyAwOiAxMCk7XHJcblxyXG4gICAgICAgIHRoaXMudGltZXJNYXAuc2V0KGtleSwgdGltZXIpO1xyXG4gICAgfSxcclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YU1hcC5nZXQoa2V5KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN0b3JhZ2U7IiwiY29uc3QgeGhyID0ge1xyXG4gICAgYWpheDogZnVuY3Rpb24gKHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIGxldCB7dXJsLCBtZXRob2QsIGRhdGEsIGFzeW5jLCB4aHIsIGNvbnRlbnRUeXBlLCBkYXRhVHlwZSwgZG9uZSwgZmFpbH0gPSBwYXJhbXMgfHwge307XHJcbiAgICAgICAgICAgIGxldCB7aGVhZGVyLCBvblByb2dyZXNzLCBiZWZvcmVTZW5kfSA9IHBhcmFtcztcclxuICAgICAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgcmVxdWVzdC5vcGVuKChtZXRob2QgfHwgJ0dFVCcpLCB1cmwsIGFzeW5jID09PSB1bmRlZmluZWQgPyB0cnVlIDogYXN5bmMpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIChoZWFkZXIgfHwge30pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGhlYWRlciB8fCB7fSkuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcltrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjYy5nZXRWYWx1ZSgnQXV0aG9yaXphdGlvbicpKXtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIGNjLmdldFZhbHVlKCdBdXRob3JpemF0aW9uJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbmUgJiYgZG9uZShwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCksIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmYWlsICYmIGZhaWwocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZmFpbCAmJiBmYWlsKHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCksIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdC51cGxvYWQub25wcm9ncmVzcyA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcCA9IE1hdGguZmxvb3IoZS5sb2FkZWQgLyBlLnRvdGFsICogMTAwKTtcclxuICAgICAgICAgICAgICAgIG9uUHJvZ3Jlc3MgJiYgb25Qcm9ncmVzcyhwLCBlKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCBfZGF0YTtcclxuICAgICAgICAgICAgc3dpdGNoIChkYXRhVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZmlsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnanNvbic6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgY29udGVudFR5cGUgPT09IHVuZGVmaW5lZCA/IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIDogY29udGVudFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9kYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJlZm9yZVNlbmQgJiYgYmVmb3JlU2VuZChyZXF1ZXN0KTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3Quc2VuZChfZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIHBhcnNlRGF0YShkYXRhKSB7XHJcbiAgICB0cnl7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSB8fCAnJylcclxuICAgIH1jYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeGhyO1xyXG4iLCJpbXBvcnQgY2MgZnJvbSAnLi9jY2pzL2NjJztcclxuaW1wb3J0IGFuYWx5c2VyIGZyb20gJy4vYW5hbHlzZXInO1xyXG5jb25zdCBXSElURSA9ICdyZ2JhKDI1NSwyNTUsMjU1LCAwLjcpJztcclxuY29uc3QgQkxBQ0sgPSAncmdiYSgwLDAsMCwgMC45KSc7XHJcbmNvbnN0IFJFRCA9ICcjZDYzMDMxJztcclxuXHJcbmNjLnNldFZhbHVlKCd2aWV3cG9ydCcsIHt3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0fSk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYy51cGRhdGVWYWx1ZSgndmlld3BvcnQnLCB7d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodH0pO1xyXG59KTtcclxuZnVuY3Rpb24gaW5kZXgoKSB7XHJcbiAgICBsZXQgcm9vdCA9IGNjLnNlbGVjdCgnI2JvZHknKTtcclxuICAgIGxldCBtYWluQ29udGFpbmVyID0gY2MuY3JlYXRlRWxlbWVudCgnZGl2JywgJ3Rlc3QnKVxyXG4gICAgICAgIC5hZGRDbGFzcygnbWFpbi1jb250YWluZXInKTtcclxuXHJcbiAgICByb290LmFwcGVuZENoaWxkKG1haW5Db250YWluZXIpO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IG1haW5Db250YWluZXIuYWRkKCdkaXYnKVxyXG5cclxuICAgIGxldCBoZWFkZXIgPSBjb250YWluZXIuYWRkKCdkaXYnLCAnaGVhZGVyJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2hlYWRlcicpO1xyXG4gICAgbGV0IGhlYWRlckxlZnQgPSBoZWFkZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgbWluV2lkdGg6ICcyNTZweCdcclxuICAgICAgICB9KTtcclxuICAgIGxldCBsb2dvID0gaGVhZGVyTGVmdC5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNvbnRlbnQoJ0EnKVxyXG4gICAgICAgIC5hZGRDbGFzcygnYmFja2dyb3VuZC1yZWQnKVxyXG4gICAgICAgIC5hZGRDbGFzcygnZm9udC1ibGFjaycpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnNjRweCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwIDE2cHgnLFxyXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAnNTRweCcsXHJcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnNHB4JyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogUkVEICsgJyAwIDAgMTBweCcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IG5hbWVDb250YWluZXIgPSBoZWFkZXJMZWZ0LmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcclxuICAgICAgICB9KTtcclxuICAgIG5hbWVDb250YWluZXIuYWRkKCdzcGFuJylcclxuICAgICAgICAuY29udGVudCgnTlhJTiBZQU5HJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICB9KTtcclxuICAgIG5hbWVDb250YWluZXIuYWRkKCdzcGFuJylcclxuICAgICAgICAuY29udGVudCgnRnJvbnQtRW5kIERldmVsb3BlcicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaydcclxuICAgICAgICB9KTtcclxuICAgIGxldCBtZW51ID0gaGVhZGVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IG1lbnVMaXN0ID0gWydmYS1saW5rZWRpbicsICdmYS1naXRodWInXTtcclxuICAgIGxldCBsaW5rcyA9IFsnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2FueGluLXlhbmctNzA3MDI5MTI1LycsICdodHRwczovL2dpdGh1Yi5jb20vQW54aW5ZYW5nJ107XHJcbiAgICBsZXQgaG92ZXJDb2xvcnMgPSBbJyMwMDc3QjUnLCAncmdiYSgyNTUsMCw4MCwgMC44KSddO1xyXG4gICAgbWVudUxpc3QuZm9yRWFjaChmdW5jdGlvbiAodGFnLCBpZHgpIHtcclxuICAgICAgICBtZW51LmFkZCgnaScpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFiJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKG1lbnVMaXN0W2lkeF0pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnNTRweCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICAgICAgIHRleHRTaGFkb3c6ICcgMCAwIDVweCcsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnMC4zcycsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogJzE2cHgnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihsaW5rc1tpZHhdLCAnX2JsYW5rJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBob3ZlckNvbG9yc1tpZHhdLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSwgJ3N0eWxlJylcclxuICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnJyxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sICdzdHlsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IG1haW5Db250ZW50Q29udGFpbmVyID0gY2MuY3JlYXRlRWxlbWVudCgnZGl2JywgJ21haW5fY29udGVudCcpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGhlaWdodDogJ2NhbGMoMTAwdmggLSAxMDRweCknLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAnMCAxMi41JScsXHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICB6SW5kZXg6IDUsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbidcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgbGV0IGNlbnRlclggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJZID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgbGV0IG1vdXNlWCA9IGUuY2xpZW50WDtcclxuICAgICAgICAgICAgbGV0IG1vdXNlWSA9IGUuY2xpZW50WTtcclxuICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKCcgKyAoLShtb3VzZVggLSBjZW50ZXJYKSAvIDEwMCkgKyAncHgsJyArICgtKG1vdXNlWSAtIGNlbnRlclkpIC8gMTAwKSArICdweCknXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ2ZyYW1lJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgZG9tcyA9IGNjLnNlbGVjdCgnLmZhZGUnKTtcclxuICAgICAgICAgICAgaWYoZG9tcy5sZW5ndGg9PT0wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kKCdmcmFtZScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb21zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG9tID0gZG9tc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBpc0luVmlld1BvcnQgPSBkb20uaXNJblZpZXdwb3J0KHtvZmZzZXRZOiAxNTB9KTtcclxuICAgICAgICAgICAgICAgIGxldCBvcGFjaXR5ID0gK2RvbS5zdHlsZS5vcGFjaXR5O1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzSW5WaWV3UG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5hZGRDbGFzcygnc2xpZGUtaW4tYm90dG9tJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLnJlbW92ZUNsYXNzKCdmYWRlLW91dCcpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcygnc2xpZGUtaW4tYm90dG9tJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLmFkZENsYXNzKCdmYWRlLW91dCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgbGFuZGluZ0NvbnRhaW5lciA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAnY2FsYygxMDB2aCAtIDEwNHB4KSdcclxuICAgICAgICB9KTtcclxuICAgIGxldCBoaWdoTGlnaHQgPSBsYW5kaW5nQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY29udGVudChcIkxldCdzIG1ha2UgZGF0YSBhbGl2ZVwiKVxyXG4gICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzQ4cHgnLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICdjYWxjKDUwdmggLSAxNTJweCknXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgaW50cm8gPSBsYW5kaW5nQ29udGFpbmVyLmFkZCgncCcpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmYWRlJylcclxuICAgICAgICAuY29udGVudChcIkknbSBhIGZyb250LWVuZCBkZXZlbG9wZXIgZnJvbSBCYXkgQXJlYSwgQ2FsaWZvcm5pYSwgYW5kIGN1cnJlbnRseSBsaXZpbmcgaW4gU2FuIEpvc2UuIEkgZW5qb3kgYnVpbGRpbmcgcmljaCBcIiArXHJcbiAgICAgICAgICAgIFwiaW50ZXJhY3RpdmUgd2Vic2l0ZXMgYW5kIHdlYiBhcHBzIGZyb20gc21hbGwgdG8gbGFyZ2UuIFwiKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzIwcHgnLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBza2lsbENvbnRhaW5lciA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgnZGl2Jyk7XHJcbiAgICBsZXQgc2tpbGxUaXRsZSA9IHNraWxsQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY29udGVudChcIlNraWxsc1wiKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBjb2xvcjogV0hJVEUsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgZm9udFNpemU6ICc0OHB4JyxcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnMjU2cHgnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IHNraWxsQ2FyZENvbnRhaW5lciA9IHNraWxsQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxyXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICcxMjhweCcsXHJcbiAgICAgICAgICAgIGZsZXhXcmFwOiAnd3JhcCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgc2tpbGxzID0gWydmYS1odG1sNScsICdmYS1qcycsICdmYS1jc3MzLWFsdCcsICdmYS1yZWFjdCcsICdmYS1ub2RlLWpzJywnZmEtc2FzcyddO1xyXG4gICAgbGV0IHNraWxsTmFtZXMgPSBbJ0hUTUw1JywgJ0phdmFzY3JpcHQnLCAnQ1NTMycsICdSZWFjdCcsICdOb2RlSlMnLCAnU0FTUyddO1xyXG4gICAgbGV0IHNraWxsQ29sb3JzID0gWycjZTQ0ZDI2JywgJyNlZWFmNGInLCAnIzAwNzBiYScsICcjNjFkYWZiJywgJyM3Y2I3MDAnLCcjYzY5J107XHJcbiAgICBza2lsbHMuZm9yRWFjaChmdW5jdGlvbiAoaWNvbiwgaWR4KSB7XHJcbiAgICAgICAgbGV0IGNhcmQgPSBza2lsbENhcmRDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhZGUnKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIG1pbldpZHRoOiAnMzAwcHgnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGZsZXhHcm93OiAxLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbG9nbyA9IGNhcmQuYWRkKCdpJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYWInKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoaWNvbilcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzI1NnB4JyxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogc2tpbGxDb2xvcnNbaWR4XSxcclxuICAgICAgICAgICAgICAgIHRleHRTaGFkb3c6IHNraWxsQ29sb3JzW2lkeF0gKyAnIDAgMCAxMHB4J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbmFtZSA9IGNhcmQuYWRkKCdwJylcclxuICAgICAgICAgICAgLmNvbnRlbnQoc2tpbGxOYW1lc1tpZHhdKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHNraWxsQ29sb3JzW2lkeF0sXHJcbiAgICAgICAgICAgICAgICB0ZXh0U2hhZG93OiBza2lsbENvbG9yc1tpZHhdICsgJyAwIDAgMTBweCdcclxuICAgICAgICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBjYXJlZXJDb250YWluZXIgPSBtYWluQ29udGVudENvbnRhaW5lci5hZGQoJ2RpdicpO1xyXG4gICAgbGV0IGNhcmVlclRpdGxlID0gc2tpbGxDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jb250ZW50KFwiQ2FyZWVyXCIpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzQ4cHgnLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICcxMjhweCcsXHJcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzY0cHgnLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBjb21wYW5pZXMgPSBbJ25ldEVsYXN0aWMgU3lzdGVtcywgSW5jLicsICdTYW4gRnJhbmNpc2NvIFN0YXRlIFVuaXZlcnNpdHknLCAnU2hhbmdoYWkgVW5pdmVyc2l0eSddO1xyXG4gICAgbGV0IHRpdGxlcyA9IFsnU29mdHdhcmUgRW5naW5lZXInLCAnQlMgLSBDb21wdXRlciBFbmdpbmVlcmluZyBTdHVkZW50JywgJ0FTIC0gQ29tcHV0ZXIgQXBwbGljYXRpb24gVGVjaG5vbG9neSBTdHVkZW50J107XHJcbiAgICBsZXQgdGltZUxpbmVzID0gWycyMDE3IC0gQ3VycmVudCcsICcyMDEzIC0gMjAxNycsICcyMDA5IC0gMjAxMyddO1xyXG4gICAgbGV0IHByb2plY3RzID0ge1xyXG4gICAgICAgICduZXRFbGFzdGljIFN5c3RlbXMsIEluYy4nOiBbJ3ZCTkcgTWFuYWdlbWVudCBTeXN0ZW0gKFVJIExlYWQpJywgJ1NELVdBTiBNYW5hZ2VtZW50IFN5c3RlbSAoVUkgVGVhbSBNZW1iZXIpJyxdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXBhbmllcy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wYW55TmFtZSwgaWR4KSB7XHJcbiAgICAgICAgbGV0IGNhcmQgPSBjYXJlZXJDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhZGUnKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc2NHB4J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBsZXQgY29tcGFueSA9IGNhcmQuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAuY29udGVudChjb21wYW55TmFtZSlcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgZm9udFNpemUgPSAnMjBweCc7XHJcbiAgICAgICAgbGV0IHRpdGxlID0gY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5jb250ZW50KHRpdGxlc1tpZHhdKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB0aW1lTGluZSA9IGNhcmQuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAuY29udGVudCh0aW1lTGluZXNbaWR4XSlcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIChwcm9qZWN0c1tjb21wYW55TmFtZV0gfHwgW10pLmZvckVhY2goZnVuY3Rpb24gKHByb2plY3QpIHtcclxuICAgICAgICAgICAgY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgICAgICAuY29udGVudChwcm9qZWN0KVxyXG4gICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGZvb3RlciA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgncCcpXHJcbiAgICAgICAgLmNvbnRlbnQoJ1Bvd2VyZWQgYnkgY2NKUywgYSBzZWxmLWltcGxlbWVudGVkIEphdmFzY3JpcHQgTGlicmFyeS4nKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICcxMjhweCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgZm9vdFNoYWRvdyA9IGNvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmFkZENsYXNzKCdiYWNrZ3JvdW5kLXNvbGlkLWJsYWNrJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgIGJvdHRvbTogJzAnLFxyXG4gICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICB6SW5kZXg6IDEyLFxyXG4gICAgICAgICAgICAvL2JveFNoYWRvdzogJ3JnYmEoMjU1LCAwLCA4MCwgMC44KSAwcHggMHB4IDUwcHggMnB4J1xyXG4gICAgICAgIH0pO1xyXG4gICAgYW5hbHlzZXIoZm9vdFNoYWRvdyk7XHJcbiAgICBsZXQgY29kZUJhY2tncm91bmRUZXh0ID0gaW5kZXgudG9TdHJpbmcoKTtcclxuICAgIGxldCBjb2x1bW5XaWR0aCA9IE1hdGgubWluKDQwMCAsIHdpbmRvdy5pbm5lcldpZHRoIC0gMTI4KTtcclxuICAgIGxldCBjb2x1bW5Db3VudCA9IE1hdGgubWluKDIsIE1hdGguZmxvb3Iod2luZG93LmlubmVyV2lkdGgvKGNvbHVtbldpZHRoKSkpO1xyXG4gICAgbGV0IGNvZGVCYWNrZ3JvdW5kID0gY29udGFpbmVyLmFkZCgncHJlJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2NydFRleHQnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgdG9wOiAnMTI4cHgnLFxyXG4gICAgICAgICAgICBsZWZ0OiAnNjRweCcsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICBjb2xvcjogJ3JnYmEoMjU1LDI1NSwyNTUsIDAuMDYpJyxcclxuICAgICAgICAgICAgekluZGV4OiAwLFxyXG4gICAgICAgICAgICBjb2x1bW5Db3VudDogY29sdW1uQ291bnQsXHJcbiAgICAgICAgICAgIGNvbHVtbldpZHRoOiBjb2x1bW5XaWR0aCArICdweCcsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnY2FsYygxMDB2dyAtIDEyOHB4KScsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZGF0YSh7XHJcbiAgICAgICAgICAgIGNvdW50ZXI6IDAsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYmluZCgnZnJhbWUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCB7Y291bnRlciwgc3RyfSA9IHRoaXMuZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKCcgKyAoLW1haW5Db250ZW50Q29udGFpbmVyLnNjcm9sbFRvcC82KSArICdweCknXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb3VudGVyKz00O1xyXG4gICAgICAgICAgICBpZihjb3VudGVyID49IGNvZGVCYWNrZ3JvdW5kVGV4dC5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgLy9jb3VudGVyID0gY29kZUJhY2tncm91bmRUZXh0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclRleHQgPSBjb2RlQmFja2dyb3VuZFRleHQuc3Vic3RyaW5nKDAsIGNvdW50ZXIpICsgJ18nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSh7Y291bnRlcjogY291bnRlcn0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYmluZCgndmlld3BvcnQnLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICBsZXQge2hlaWdodCwgd2lkdGh9ID0gZDtcclxuICAgICAgICAgICAgbGV0IGNvbHVtbldpZHRoID0gTWF0aC5taW4oNDAwICwgd2lkdGggLSAxMjgpO1xyXG4gICAgICAgICAgICBsZXQgY29sdW1uQ291bnQgPSBNYXRoLm1pbigyLCBNYXRoLmZsb29yKHdpZHRoLyhjb2x1bW5XaWR0aCkpKTtcclxuICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uQ291bnQ6IGNvbHVtbkNvdW50LFxyXG4gICAgICAgICAgICAgICAgY29sdW1uV2lkdGg6IGNvbHVtbldpZHRoICsgJ3B4JyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgbWFpbkNvbnRhaW5lci5hZGRFbGVtZW50KGNvbnRhaW5lcik7XHJcbiAgICBjb250YWluZXIuYWRkRWxlbWVudChoZWFkZXIpO1xyXG4gICAgY29udGFpbmVyLmFkZEVsZW1lbnQobWFpbkNvbnRlbnRDb250YWluZXIpO1xyXG59XHJcbmluZGV4KCk7Il0sInNvdXJjZVJvb3QiOiIifQ==