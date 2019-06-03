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
        bar_x2 = void 0,
        bar_width = void 0,
        bar_height = void 0,
        isInit = void 0;
    canvas = Container.add('canvas').attr({
        height: 100,
        width: Container.getBoundingClientRect().width
    }).css({
        width: '100%',
        height: '100px',
        pointerEvents: 'none'
    }).bind('play', function (d) {
        if (d) {
            isInit = isInit ? true : initMp3Player();
            audio.play();
        } else {
            audio.pause();
        }
    });
    ctx = canvas.getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, "rgba(255,0,80,0.1)");
    gradient.addColorStop(1, "rgba(255,0,80,0.5)");

    // Create a new instance of an audio object and adjust some of its properties
    var audio = new Audio();
    audio.src = './res/' + cc.utils.getUrlVar('music', 'Bohemian Rhapsody') + '.' + cc.utils.getUrlVar('format', 'aac');
    audio.controls = true;
    audio.loop = true;
    audio.autoplay = false;

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
        return true;
    }

    function frameLooper() {
        window.requestAnimationFrame(frameLooper);
        fbc_array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbc_array);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        bars = 700;
        bar_width = canvas.width / (bars * 2);
        for (var i = 0; i < bars; i++) {
            bar_x = i * bar_width;
            bar_x2 = canvas.width - i * bar_width;
            bar_height = -(fbc_array[i] * canvas.height / 255);
            ctx.fillStyle = gradient;
            ctx.fillRect(bar_x, canvas.height, bar_width, bar_height < -70 ? bar_height : bar_height * 0.9);
            ctx.fillRect(bar_x2, canvas.height, bar_width, bar_height < -70 ? bar_height : bar_height * 0.9);
            if (bar_height < -70) {
                var gradientHit = ctx.createLinearGradient(bar_x - 5, 0, bar_x + 5, 0);
                gradientHit.addColorStop(0, "rgba(255,0,80,0)");
                gradientHit.addColorStop(0.25, "rgba(255,0,80,0)");
                gradientHit.addColorStop(0.5, "rgba(255,0,80,0.8)");
                gradientHit.addColorStop(0.75, "rgba(255,0,80,0)");
                gradientHit.addColorStop(1, "rgba(255,0,80,0)");
                ctx.fillStyle = gradientHit;
                ctx.fillRect(bar_x - 5, 1, 10, 1);
                var gradientHit2 = ctx.createLinearGradient(bar_x2 - 5, 0, bar_x2 + 5, 0);
                gradientHit2.addColorStop(0, "rgba(255,0,80,0)");
                gradientHit2.addColorStop(0.25, "rgba(255,0,80,0)");
                gradientHit2.addColorStop(0.5, "rgba(255,0,80,0.8)");
                gradientHit2.addColorStop(0.75, "rgba(255,0,80,0)");
                gradientHit2.addColorStop(1, "rgba(255,0,80,0)");
                ctx.fillStyle = gradientHit2;
                ctx.fillRect(bar_x2 - 5, 1, 10, 1);
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
    var player = landingContainer.add('div').css({
        fontSize: '64px',
        width: '100%',
        textAlign: 'center'
    }).add('i').addClass('far').addClass('fa-play-circle').css({
        cursor: 'pointer'
    }).on('mouseover', function () {
        this.css({
            color: 'rgba(255,0,80, 0.8)'
        });
        playerWarn.css({
            display: ''
        });
    }).on('mouseleave', function () {
        this.css({
            color: ''
        });
        playerWarn.css({
            display: 'none'
        });
    }).on('click', function () {
        if (_cc2.default.getValue('play')) {
            _cc2.default.setValue('play', false);
            this.removeClass('fa-pause-circle');
            this.addClass('fa-play-circle');
        } else {
            _cc2.default.setValue('play', true);
            this.addClass('fa-pause-circle');
            this.removeClass('fa-play-circle');
        }
    });
    var playerWarn = landingContainer.add('p').content('Watch you volume :)').css({
        textAlign: 'center',
        display: 'none',
        color: 'rgba(255,0,80, 0.8)'
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

    var footShadow = container.add('div').css({
        position: 'fixed',
        bottom: '-3px',
        left: 0,
        width: '100%',
        zIndex: 10,
        pointerEvents: 'none'
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
        width: 'calc(100vw - 128px)',
        opacity: 0.3
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuYWx5c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2NjLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2NvbW1vbi9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY29tbW9uL3JhZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy9kb20vZG9tLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy94aHIveGhyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjYW52YXMiLCJjdHgiLCJzb3VyY2UiLCJjb250ZXh0IiwiYW5hbHlzZXIiLCJmYmNfYXJyYXkiLCJiYXJzIiwiYmFyX3giLCJiYXJfeDIiLCJiYXJfd2lkdGgiLCJiYXJfaGVpZ2h0IiwiaXNJbml0IiwiaGVpZ2h0Iiwid2lkdGgiLCJDb250YWluZXIiLCJwb2ludGVyRXZlbnRzIiwiYXVkaW8iLCJncmFkaWVudCIsImNjIiwiZnJhbWVMb29wZXIiLCJ3aW5kb3ciLCJpIiwiZ3JhZGllbnRIaXQiLCJncmFkaWVudEhpdDIiLCJJU19XT1JLRVIiLCJzZWxmIiwiQ09OVEVYVCIsInV0aWxzIiwiY29tbW9uIiwibG9hZCIsImFkZE9ucyIsIm9wdGlvbnMiLCJzZWxlY3QiLCJkb20iLCJjcmVhdGVFbGVtZW50IiwiY3JlYXRlRWxlbWVudE5TIiwic2V0VmFsdWUiLCJzdG9yYWdlIiwic2F2ZUFycmF5IiwiYXJyIiwiaWRrZXkiLCJrZXkiLCJpdGVtIiwidXBkYXRlVmFsdWUiLCJnZXRWYWx1ZSIsInNldFRpbWVyIiwicmFmIiwiY2FuY2VsVGltZXIiLCJyZXF1ZXN0IiwicGFyYW1zIiwieGhyIiwibGFzdCIsImZyYW1lVGlja2VyIiwiaW1tZWRpYXRlbHkiLCJvYmoiLCJmbiIsInRhcmdldCIsIk1hdGgiLCJzNCIsIk9iamVjdCIsImlzSUUiLCJpc0Nocm9tZSIsImlzT3BlcmEiLCJvcHIiLCJuYXZpZ2F0b3IiLCJwIiwic2FmYXJpIiwiZG9jdW1lbnQiLCJvdXRwdXQiLCJhcmd1bWVudHMiLCJFbGVtZW50IiwidmFsdWUiLCJ2YXJzIiwicGFydHMiLCJyZXF1ZXN0VGltZW91dCIsInNldFRpbWVvdXQiLCJzdGFydCIsIkRhdGUiLCJoYW5kbGUiLCJjbGVhclJlcXVlc3RUaW1lb3V0IiwiY2xlYXJUaW1lb3V0Iiwic2VsZWN0b3IiLCJfc2VsZWN0b3IiLCJuYW1lIiwiZG9tcyIsImlkIiwiZWxlbWVudCIsImVsZW1lbnRJZCIsInRhZyIsInNldHVwRWxlbWVudE1ldGhvZHMiLCJjaGlsZCIsImV2ZW50VGFnIiwiZXZlbnROYW1lIiwiZXZlbnRIYW5kbGVyIiwidiIsIm9mZnNldFgiLCJvZmZzZXRZIiwieDIiLCJ4IiwieTIiLCJ5IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiZGF0YU1hcCIsInRpbWVyTWFwIiwic2hvdWxkUmVhY3QiLCJvbGRWYWx1ZSIsInJlc2V0IiwibmV3VmFsdWUiLCJicm9hZGNhc3QiLCJ0aW1lciIsImFqYXgiLCJwcm9taXNlIiwibWV0aG9kIiwiYXN5bmMiLCJoZWFkZXIiLCJkb25lIiwicGFyc2VEYXRhIiwicmVzb2x2ZSIsImZhaWwiLCJyZWplY3QiLCJlIiwib25Qcm9ncmVzcyIsIl9kYXRhIiwiY29udGVudFR5cGUiLCJKU09OIiwiYmVmb3JlU2VuZCIsImRhdGEiLCJXSElURSIsIkJMQUNLIiwiUkVEIiwicm9vdCIsIm1haW5Db250YWluZXIiLCJjb250YWluZXIiLCJoZWFkZXJMZWZ0IiwiZGlzcGxheSIsIm1pbldpZHRoIiwibG9nbyIsImZvbnRTaXplIiwicGFkZGluZyIsImxpbmVIZWlnaHQiLCJtYXJnaW5SaWdodCIsImJveFNoYWRvdyIsIm5hbWVDb250YWluZXIiLCJtZW51IiwibWVudUxpc3QiLCJsaW5rcyIsImhvdmVyQ29sb3JzIiwiY3Vyc29yIiwidGV4dEFsaWduIiwidGV4dFNoYWRvdyIsInRyYW5zaXRpb24iLCJjb2xvciIsIm1haW5Db250ZW50Q29udGFpbmVyIiwib3ZlcmZsb3dZIiwicG9zaXRpb24iLCJ6SW5kZXgiLCJmbGV4RGlyZWN0aW9uIiwiY2VudGVyWCIsImNlbnRlclkiLCJtb3VzZVgiLCJtb3VzZVkiLCJ0cmFuc2Zvcm0iLCJpc0luVmlld1BvcnQiLCJvcGFjaXR5IiwibGFuZGluZ0NvbnRhaW5lciIsImhpZ2hMaWdodCIsImZvbnRXZWlnaHQiLCJtYXJnaW5Ub3AiLCJpbnRybyIsInBsYXllciIsInBsYXllcldhcm4iLCJza2lsbENvbnRhaW5lciIsInNraWxsVGl0bGUiLCJza2lsbENhcmRDb250YWluZXIiLCJqdXN0aWZ5Q29udGVudCIsImZsZXhXcmFwIiwic2tpbGxzIiwic2tpbGxOYW1lcyIsInNraWxsQ29sb3JzIiwiY2FyZCIsImZsZXhHcm93IiwiY2FyZWVyQ29udGFpbmVyIiwiY2FyZWVyVGl0bGUiLCJtYXJnaW5Cb3R0b20iLCJjb21wYW5pZXMiLCJ0aXRsZXMiLCJ0aW1lTGluZXMiLCJwcm9qZWN0cyIsImNvbXBhbnkiLCJ0aXRsZSIsInRpbWVMaW5lIiwiZm9vdGVyIiwiZm9vdFNoYWRvdyIsImJvdHRvbSIsImxlZnQiLCJjb2RlQmFja2dyb3VuZFRleHQiLCJpbmRleCIsImNvbHVtbldpZHRoIiwiY29sdW1uQ291bnQiLCJjb2RlQmFja2dyb3VuZCIsInRvcCIsImNvdW50ZXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFF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QXlCQSxFQUF6QjtBQUNBLFFBQUlDLGNBQWM3SSxjQUFlckMsb0JBQWpDLEdBQWtCcUMsQ0FBbEI7QUFDQSxRQUFJOEksY0FBYzlJLFlBQVlBLFdBQVdyQyxvQkFBekMsV0FBOEJxQyxDQUFaQSxDQUFsQjtBQUNBLFFBQUkrSSxpQkFBaUIsNkNBRVo7QUFDRG5ELG1CQURDO0FBRURvRCxhQUZDO0FBR0ROLGNBSEM7QUFJRHhDLGtCQUpDO0FBS0RILGVBTEM7QUFNREksZ0JBTkM7QUFPRDJDLHFCQVBDO0FBUURELHFCQUFhQSxjQVJaO0FBU0R6TCxlQVRDO0FBVUR1SixpQkFBUztBQVZSLEtBRlksT0FjWDtBQUNGc0MsaUJBQVM7QUFEUCxLQWRXLGdCQWlCRixZQUFZO0FBQUEsdUJBQ0YsS0FERSxPQUNGLEVBREU7QUFBQTtBQUFBOztBQUV2QixpQkFBUztBQUNMeEMsdUJBQVcsZ0JBQWlCLENBQUNULHFCQUFELFlBQWpCLElBQXNEO0FBRDVELFNBQVQ7QUFHQWlEO0FBQ0EsWUFBR0EsV0FBV04sbUJBQWQsUUFBd0M7QUFDcEM7QUFDQTtBQUZKLGVBR0s7QUFDRCw2QkFBaUJBLDJDQUFqQjtBQUNIO0FBQ0Qsa0JBQVUsRUFBQ00sU0FBWCxPQUFVLEVBQVY7QUE3QmEsd0JBK0JDLGFBQWE7QUFBQTtBQUFBOztBQUUzQixZQUFJSixjQUFjN0ksY0FBZTVDLFFBQWpDLEdBQWtCNEMsQ0FBbEI7QUFDQSxZQUFJOEksY0FBYzlJLFlBQVlBLFdBQVc1QyxRQUF6QyxXQUE4QjRDLENBQVpBLENBQWxCO0FBQ0EsaUJBQVM7QUFDTDhJLHlCQURLO0FBRUxELHlCQUFhQSxjQUFjO0FBRnRCLFNBQVQ7QUFuQ1IsS0FBcUIsQ0FBckI7O0FBMENBbEU7QUFDQUM7QUFDQUE7QUFDSDtBQUNEZ0UsUSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJmdW5jdGlvbiBhbmFseXNlcihDb250YWluZXIpIHtcclxuICAgIC8vIEVzdGFibGlzaCBhbGwgdmFyaWFibGVzIHRoYXQgeW91ciBBbmFseXNlciB3aWxsIHVzZVxyXG4gICAgbGV0IGNhbnZhcywgY3R4LCBzb3VyY2UsIGNvbnRleHQsIGFuYWx5c2VyLCBmYmNfYXJyYXksIGJhcnMsIGJhcl94LCBiYXJfeDIsYmFyX3dpZHRoLCBiYXJfaGVpZ2h0LCBpc0luaXQ7XHJcbiAgICBjYW52YXMgPSBDb250YWluZXIuYWRkKCdjYW52YXMnKVxyXG4gICAgICAgIC5hdHRyKHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiBDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDBweCcsXHJcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICAgJ25vbmUnLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ3BsYXknLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICBpZihkKXtcclxuICAgICAgICAgICAgICAgIGlzSW5pdCA9IGlzSW5pdD90cnVlOmluaXRNcDNQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXVkaW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICBsZXQgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgMTAwKTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcInJnYmEoMjU1LDAsODAsMC4xKVwiKTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBcInJnYmEoMjU1LDAsODAsMC41KVwiKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgYW4gYXVkaW8gb2JqZWN0IGFuZCBhZGp1c3Qgc29tZSBvZiBpdHMgcHJvcGVydGllc1xyXG4gICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCk7XHJcbiAgICBhdWRpby5zcmMgPSBgLi9yZXMvJHtjYy51dGlscy5nZXRVcmxWYXIoJ211c2ljJywgJ0JvaGVtaWFuIFJoYXBzb2R5Jyl9LiR7Y2MudXRpbHMuZ2V0VXJsVmFyKCdmb3JtYXQnLCAnYWFjJyl9YDtcclxuICAgIGF1ZGlvLmNvbnRyb2xzID0gdHJ1ZTtcclxuICAgIGF1ZGlvLmxvb3AgPSB0cnVlO1xyXG4gICAgYXVkaW8uYXV0b3BsYXkgPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0TXAzUGxheWVyKCkge1xyXG4gICAgICAgIC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1ZGlvX2JveCcpLmFwcGVuZENoaWxkKGF1ZGlvKTtcclxuICAgICAgICBjb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpOyAvLyBBdWRpb0NvbnRleHQgb2JqZWN0IGluc3RhbmNlXHJcbiAgICAgICAgYW5hbHlzZXIgPSBjb250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7IC8vIEFuYWx5c2VyTm9kZSBtZXRob2RcclxuICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAvLyBSZS1yb3V0ZSBhdWRpbyBwbGF5YmFjayBpbnRvIHRoZSBwcm9jZXNzaW5nIGdyYXBoIG9mIHRoZSBBdWRpb0NvbnRleHRcclxuICAgICAgICBzb3VyY2UgPSBjb250ZXh0LmNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZShhdWRpbyk7XHJcbiAgICAgICAgc291cmNlLmNvbm5lY3QoYW5hbHlzZXIpO1xyXG4gICAgICAgIGFuYWx5c2VyLmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICAgICAgZnJhbWVMb29wZXIoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmcmFtZUxvb3BlcigpIHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZyYW1lTG9vcGVyKTtcclxuICAgICAgICBmYmNfYXJyYXkgPSBuZXcgVWludDhBcnJheShhbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudCk7XHJcbiAgICAgICAgYW5hbHlzZXIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEoZmJjX2FycmF5KTtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7IC8vIENsZWFyIHRoZSBjYW52YXNcclxuICAgICAgICBiYXJzID0gNzAwO1xyXG4gICAgICAgIGJhcl93aWR0aCA9IGNhbnZhcy53aWR0aCAvIChiYXJzICogMik7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiYXJzOyBpKyspIHtcclxuICAgICAgICAgICAgYmFyX3ggPSBpICogYmFyX3dpZHRoO1xyXG4gICAgICAgICAgICBiYXJfeDIgPSAoY2FudmFzLndpZHRoKSAtIGkgKiBiYXJfd2lkdGg7XHJcbiAgICAgICAgICAgIGJhcl9oZWlnaHQgPSAtKGZiY19hcnJheVtpXSpjYW52YXMuaGVpZ2h0LzI1NSk7XHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudDtcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGJhcl94LCBjYW52YXMuaGVpZ2h0LCBiYXJfd2lkdGgsIGJhcl9oZWlnaHQ8LTcwP2Jhcl9oZWlnaHQ6IGJhcl9oZWlnaHQqMC45KTtcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGJhcl94MiwgY2FudmFzLmhlaWdodCwgYmFyX3dpZHRoLCBiYXJfaGVpZ2h0PC03MD9iYXJfaGVpZ2h0OiBiYXJfaGVpZ2h0KjAuOSk7XHJcbiAgICAgICAgICAgIGlmKGJhcl9oZWlnaHQ8LTcwKXtcclxuICAgICAgICAgICAgICAgIGxldCBncmFkaWVudEhpdCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudChiYXJfeC01LCAwLCBiYXJfeCs1LCAwKTtcclxuICAgICAgICAgICAgICAgIGdyYWRpZW50SGl0LmFkZENvbG9yU3RvcCgwLCBcInJnYmEoMjU1LDAsODAsMClcIik7XHJcbiAgICAgICAgICAgICAgICBncmFkaWVudEhpdC5hZGRDb2xvclN0b3AoMC4yNSwgXCJyZ2JhKDI1NSwwLDgwLDApXCIpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRIaXQuYWRkQ29sb3JTdG9wKDAuNSwgXCJyZ2JhKDI1NSwwLDgwLDAuOClcIik7XHJcbiAgICAgICAgICAgICAgICBncmFkaWVudEhpdC5hZGRDb2xvclN0b3AoMC43NSwgXCJyZ2JhKDI1NSwwLDgwLDApXCIpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRIaXQuYWRkQ29sb3JTdG9wKDEsIFwicmdiYSgyNTUsMCw4MCwwKVwiKTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudEhpdDtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdChiYXJfeC01LCAxLCAxMCwgMSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ3JhZGllbnRIaXQyID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KGJhcl94Mi01LCAwLCBiYXJfeDIrNSwgMCk7XHJcbiAgICAgICAgICAgICAgICBncmFkaWVudEhpdDIuYWRkQ29sb3JTdG9wKDAsIFwicmdiYSgyNTUsMCw4MCwwKVwiKTtcclxuICAgICAgICAgICAgICAgIGdyYWRpZW50SGl0Mi5hZGRDb2xvclN0b3AoMC4yNSwgXCJyZ2JhKDI1NSwwLDgwLDApXCIpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRIaXQyLmFkZENvbG9yU3RvcCgwLjUsIFwicmdiYSgyNTUsMCw4MCwwLjgpXCIpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRIaXQyLmFkZENvbG9yU3RvcCgwLjc1LCBcInJnYmEoMjU1LDAsODAsMClcIik7XHJcbiAgICAgICAgICAgICAgICBncmFkaWVudEhpdDIuYWRkQ29sb3JTdG9wKDEsIFwicmdiYSgyNTUsMCw4MCwwKVwiKTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudEhpdDI7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoYmFyX3gyLTUsIDEsIDEwLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYW5hbHlzZXI7IiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbS9kb20nO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZSc7XHJcbmltcG9ydCByYWYgZnJvbSAnLi9jb21tb24vcmFmJztcclxuaW1wb3J0IGNvbW1vbiBmcm9tICcuL2NvbW1vbi9jb21tb24nO1xyXG5pbXBvcnQgeGhyIGZyb20gJy4veGhyL3hocic7XHJcblxyXG5jb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxuXHJcbnZhciBjYztcclxud2luZG93LmNjID0gY2MgPSB7XHJcbiAgICB1dGlsczogY29tbW9uLFxyXG4gICAgbG9hZDogZnVuY3Rpb24oYWRkT25zID0gW10sIG9wdGlvbnMgPSB7fSl7XHJcblxyXG4gICAgfSxcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIHJldHVybiBkb20uc2VsZWN0KHNlbGVjdG9yKVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBkb20uY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBpZCwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50TlM6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5OUyA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGRvbS5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIGlkLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5yZXNldCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBzYXZlQXJyYXk6IGZ1bmN0aW9uKGtleSwgYXJyID0gW10sIGlka2V5KXtcclxuICAgICAgICBpZihpZGtleSAhPT0gdW5kZWZpbmVkICYmIGlka2V5ICE9PSAnJyAmJiBrZXkgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBjYy51cGRhdGVWYWx1ZShpdGVtW2lka2V5XSwgaXRlbSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5zZXRWYWx1ZShrZXksIGFycik7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlVmFsdWU6IGZ1bmN0aW9uKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gc3RvcmFnZS5nZXRWYWx1ZShrZXkpO1xyXG4gICAgfSxcclxuICAgIHNldFRpbWVyOiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgcmV0dXJuIHJhZi5yZXF1ZXN0VGltZW91dChmbiwgZGVsYXkpXHJcbiAgICB9LFxyXG4gICAgY2FuY2VsVGltZXI6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICByYWYuY2xlYXJSZXF1ZXN0VGltZW91dChoYW5kbGUpO1xyXG4gICAgfSxcclxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xyXG4gICAgICAgIHJldHVybiB4aHIuYWpheChwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmlmKElTX1dPUktFUil7XHJcbiAgICBkZWxldGUgY2Muc2VsZWN0O1xyXG4gICAgZGVsZXRlIGNjLmNyZWF0ZUVsZW1lbnQ7XHJcbiAgICBkZWxldGUgY2MuY3JlYXRlRWxlbWVudE5TO1xyXG59ZWxzZXtcclxuICAgIGxldCBsYXN0ID0gMFxyXG4gICAgbGV0IGZyYW1lVGlja2VyID0gZnVuY3Rpb24gKHRpbWVzdGFtcCkge1xyXG4gICAgICAgIGNjLnNldFZhbHVlKCdmcmFtZScsIHRpbWVzdGFtcCwge2ltbWVkaWF0ZWx5OiB0cnVlfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aW1lc3RhbXAgLSBsYXN0KTtcclxuICAgICAgICBsYXN0ID0gdGltZXN0YW1wO1xyXG4gICAgICAgIHJhZi5yZXF1ZXN0VGltZW91dChmcmFtZVRpY2tlciwgMTYpXHJcbiAgICB9O1xyXG4gICAgZnJhbWVUaWNrZXIoMCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYzsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxuY29uc3QgY29tbW9uID0ge307XHJcblxyXG5jb21tb24ub2JqZWN0Zm9yRWFjaCA9IGZ1bmN0aW9uKG9iaixmbil7XHJcbiAgICBmb3IodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgZm4ob2JqW2tleV0sIGtleSwgb2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb21tb24ub2JqZWN0QXNzaWduID0gZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2Upe1xyXG4gICAgZm9yKGxldCBrZXkgaW4gc291cmNlKSB7XHJcbiAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59O1xyXG5cclxuY29tbW9uLmNyZWF0ZUlkID0gZnVuY3Rpb24oKXtcclxuICAgIGZ1bmN0aW9uIHM0KCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxyXG4gICAgICAgICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcbn07XHJcblxyXG5jb21tb24uaXNPYmplY3QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIChpdGVtIT09dW5kZWZpbmVkICYmIGl0ZW0gPT09IE9iamVjdChpdGVtKSAmJiAhKGl0ZW0gaW5zdGFuY2VvZiBBcnJheSkpXHJcbn07XHJcblxyXG5jb21tb24uZ2V0QnJvd3NlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGlzSUUgPSBmYWxzZTtcclxuICAgIGxldCBpc0Nocm9tZSA9IGZhbHNlO1xyXG4gICAgbGV0IGlzT3BlcmEgPSBmYWxzZTtcclxuICAgIGlmICgoISFDT05URVhULm9wciAmJiAhIW9wci5hZGRvbnMpIHx8ICEhQ09OVEVYVC5vcGVyYSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBPUFIvJykgPj0gMCkge1xyXG4gICAgICAgIGlzT3BlcmEgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiAnb3BlcmEnO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBJbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xyXG4gICAgfVxyXG4gICAgaWYgKC9jb25zdHJ1Y3Rvci9pLnRlc3QoQ09OVEVYVC5IVE1MRWxlbWVudCkgfHwgKGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgcmV0dXJuIHAudG9TdHJpbmcoKSA9PT0gXCJbb2JqZWN0IFNhZmFyaVJlbW90ZU5vdGlmaWNhdGlvbl1cIjtcclxuICAgIH0pKCFDT05URVhUWydzYWZhcmknXSB8fCBzYWZhcmkucHVzaE5vdGlmaWNhdGlvbikpIHtcclxuICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XHJcbiAgICB9XHJcbiAgICBpZiAoZmFsc2UgfHwgISFkb2N1bWVudC5kb2N1bWVudE1vZGUpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50c1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoISgncmVtb3ZlJyBpbiBFbGVtZW50LnByb3RvdHlwZSkpIHtcclxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXNJRSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuICdpZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoIWlzSUUgJiYgISFDT05URVhULlN0eWxlTWVkaWEpIHtcclxuICAgICAgICByZXR1cm4gJ2VkZ2UnO1xyXG4gICAgfVxyXG4gICAgaWYgKCEhQ09OVEVYVC5jaHJvbWUgJiYgISFDT05URVhULmNocm9tZS53ZWJzdG9yZSkge1xyXG4gICAgICAgIGlzQ2hyb21lID0gdHJ1ZVxyXG4gICAgICAgIHJldHVybiAnY2hyb21lJztcclxuICAgIH1cclxuICAgIGlmICgoaXNDaHJvbWUgfHwgaXNPcGVyYSkgJiYgISFDT05URVhULkNTUykge1xyXG4gICAgICAgIHJldHVybiAnYmxpbmsnO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29tbW9uLnJlYWRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgaWYodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpe1xyXG4gICAgICAgIHJldHVybiB2YWx1ZShvcHRpb25zKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbW1vbi5nZXRVcmxWYXIgPSBmdW5jdGlvbiAoa2V5LCBkZWZhdWx0VmFsdWUpIHtcclxuICAgIHZhciB2YXJzID0ge307XHJcbiAgICB2YXIgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIGZ1bmN0aW9uIChtLCBrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyc1trZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiAodmFyc1trZXldID09PSB1bmRlZmluZWQ/IGRlZmF1bHRWYWx1ZTogdmFyc1trZXldKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1vbjsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxudmFyIHJhZiA9IHtcclxuICAgIHJlcXVlc3RUaW1lb3V0OiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgaWYgKCFDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZSlcclxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZm4sIGRlbGF5KTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgaGFuZGxlID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb29wKHRpbWVzdGFtcCkge1xyXG4gICAgICAgICAgICAoRGF0ZS5ub3coKSAtIHN0YXJ0KSA+PSBkZWxheSA/IGZuKHRpbWVzdGFtcCkgOiBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICByZXR1cm4gaGFuZGxlO1xyXG4gICAgfSxcclxuICAgIGNsZWFyUmVxdWVzdFRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICBDT05URVhULmNhbmNlbEFuaW1hdGlvbkZyYW1lID8gQ09OVEVYVC5jYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpOmNsZWFyVGltZW91dChoYW5kbGUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmFmOyIsImltcG9ydCBjb21tb24gZnJvbSAnLi4vY29tbW9uL2NvbW1vbidcclxudmFyIGRvbSA9IHtcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIGlmKHNlbGVjdG9yPT09dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IF9zZWxlY3RvciA9IHNlbGVjdG9yLmNoYXJBdCgwKTtcclxuICAgICAgICBsZXQgbmFtZSA9IHNlbGVjdG9yLnN1YnN0cmluZygxKTtcclxuICAgICAgICBsZXQgZG9tcyA9IFtdO1xyXG4gICAgICAgIHN3aXRjaCAoX3NlbGVjdG9yKXtcclxuICAgICAgICAgICAgY2FzZSAnIyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZSk7XHJcbiAgICAgICAgICAgIGNhc2UgJy4nOlxyXG4gICAgICAgICAgICAgICAgZG9tcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobmFtZSkgfHwgW107XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGRvbXMgPSAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoc2VsZWN0b3IpIHx8IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRvbXM7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHRhZywgaWQgPSAnJywgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgICAgIGxldCBlbGVtZW50SWQgPSBpZCB8fCAodGFnICsgJ18nICsgY29tbW9uLmNyZWF0ZUlkKCkpO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIGVsZW1lbnRJZCk7XHJcblxyXG4gICAgICAgIHNldHVwRWxlbWVudE1ldGhvZHMoZWxlbWVudCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldHVwRWxlbWVudE1ldGhvZHMoZWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMgPSBuZXcgTWFwKCk7XHJcbiAgICBlbGVtZW50Ll9ib3VuZCA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBlbGVtZW50LmFkZCA9IGZ1bmN0aW9uICh0YWcsIGlkLCBvcHRpb25zKSB7XHJcbiAgICAgICAgbGV0IGNoaWxkID0gZG9tLmNyZWF0ZUVsZW1lbnQodGFnLCBpZCwgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRWxlbWVudChjaGlsZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYWRkRWxlbWVudCA9IGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgIHJldHVybiBjaGlsZFxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmFkZENsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LnJlbW92ZUNsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmdldEF0dHIgPSBmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShrZXkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmF0dHIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnQoJ2F0dHInLCBrZXksIHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5nZXREYXRhID0gZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmRhdGEgPSBmdW5jdGlvbihhbnkpe1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBhbnk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuZ2V0UHJvcCA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRba2V5XTtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5wcm9wID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zZXRFbGVtZW50KCdwcm9wJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuY3NzID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudCgnY3NzJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYmluZCA9IGZ1bmN0aW9uKGtleSwgZm4pe1xyXG4gICAgICAgIGlmKGtleSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvdW5kLnNldChrZXksIGZuKTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdzdG9yYWdlXycgKyBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBlbGVtZW50LnVuYmluZCA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnc3RvcmFnZV8nICsga2V5KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5fcmVhY3QgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcclxuICAgICAgICBsZXQgZm4gPSB0aGlzLl9ib3VuZC5nZXQoa2V5KTtcclxuICAgICAgICBpZihmbil7XHJcbiAgICAgICAgICAgIGlmKGZuLmNhbGwodGhpcywgdmFsdWUsIHRoaXMuX2RhdGEpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZChrZXkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQub24gID0gZnVuY3Rpb24oZXZlbnROYW1lLCBmbiwgdGFnID0gJycpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZXZlbnRUYWcgPSBldmVudE5hbWUgKyB0YWc7XHJcbiAgICAgICAgbGV0IGV2ZW50SGFuZGxlciA9IGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzLmdldChldmVudFRhZyk7XHJcbiAgICAgICAgaWYoZXZlbnRIYW5kbGVyKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuZGVsZXRlKGV2ZW50VGFnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZm4pIHtcclxuICAgICAgICAgICAgZXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmKGZuLmNhbGwoc2VsZiwgZSwgc2VsZi5fZGF0YSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBlbGVtZW50Ll9ldmVudExpc3RlbmVycy5zZXQoZXZlbnRUYWcsIGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50SGFuZGxlciwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5jb250ZW50ID0gZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gc3RyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LnJlbW92ZVNlbGYgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBpZih0aGlzLnJlbW92ZSl7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKClcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5yZW1vdmVBbGxDaGlsZHJlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50Ll9zZXRFbGVtZW50ID0gZnVuY3Rpb24odHlwZSwga2V5ICwgdmFsdWUpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBjb21tb24ub2JqZWN0Zm9yRWFjaChrZXkgLGZ1bmN0aW9uIChpdGVtLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGZbdHlwZV0oa2V5LCBpdGVtKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdiA9IGNvbW1vbi5yZWFkVmFsdWUodmFsdWUpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncHJvcCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYXR0cic6XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoa2V5KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Nzcyc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlW2tleV0gPSAgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5pc0luVmlld3BvcnQgPSBmdW5jdGlvbiAob3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IG9mZnNldFggPSBvcHRpb25zLm9mZnNldFggfHwgMDtcclxuICAgICAgICBsZXQgb2Zmc2V0WSA9IG9wdGlvbnMub2Zmc2V0WSB8fCAwO1xyXG4gICAgICAgIGxldCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOyAvL0lFIG5vdCBzdXBwb3J0IGJvdHRvbSByaWdodFxyXG4gICAgICAgIGxldCB4MiA9IHggKyB3aWR0aDtcclxuICAgICAgICBsZXQgeTIgPSB5ICsgaGVpZ2h0O1xyXG4gICAgICAgIGxldCBpbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgbGV0IGlubmVySGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiAhKHgyIDw9ICgwICsgb2Zmc2V0WCl8fCB4ID49IChpbm5lcldpZHRoIC0gb2Zmc2V0WCkgfHwgeTIgPD0gKDAgKyBvZmZzZXRZKSB8fCB5ID49IChpbm5lckhlaWdodCAtIG9mZnNldFkpKVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZG9tOyIsImltcG9ydCBjb21tb24gZnJvbSAnLi4vY29tbW9uL2NvbW1vbic7XHJcblxyXG52YXIgc3RvcmFnZSA9IHtcclxuICAgIGRhdGFNYXA6IG5ldyBNYXAoKSxcclxuICAgIHRpbWVyTWFwOiAgbmV3IE1hcCgpLFxyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGRhdGFNYXAgPSB0aGlzLmRhdGFNYXA7XHJcbiAgICAgICAgbGV0IHtyZXNldH0gPSBvcHRpb25zO1xyXG4gICAgICAgIGxldCBzaG91bGRSZWFjdCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IGRhdGFNYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYoY29tbW9uLmlzT2JqZWN0KHZhbHVlKSAmJiBjb21tb24uaXNPYmplY3Qob2xkVmFsdWUpICYmIHJlc2V0ICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi5vYmplY3Rmb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiAoaXRlbSwga2V5LCBvYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFJlYWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9ialtrZXldID0gdmFsdWVba2V5XVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHNob3VsZFJlYWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgZGF0YU1hcC5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV3VmFsdWUgPSBkYXRhTWFwLmdldChrZXkpO1xyXG5cclxuICAgICAgICBpZihzaG91bGRSZWFjdCkge1xyXG4gICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KGtleSwgbmV3VmFsdWUsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgfSxcclxuICAgIGJyb2FkY2FzdDogZnVuY3Rpb24oa2V5LCBuZXdWYWx1ZSwgb3B0aW9ucyA9IHt9KXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHRpbWVyID0gdGhpcy50aW1lck1hcC5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgaWYgKHRpbWVyKSB7XHJcbiAgICAgICAgICAgIGNjLmNhbmNlbFRpbWVyKHRpbWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRpbWVyID0gY2Muc2V0VGltZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgZG9tcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N0b3JhZ2VfJyArIGtleSkgfHwgW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9tcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRvbSA9IGRvbXNbaV07XHJcbiAgICAgICAgICAgICAgICBkb20uX3JlYWN0ICYmIGRvbS5fcmVhY3Qoa2V5LCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi50aW1lck1hcC5kZWxldGUoa2V5KTtcclxuICAgICAgICB9LCBvcHRpb25zLmltbWVkaWF0ZWx5PyAwOiAxMCk7XHJcblxyXG4gICAgICAgIHRoaXMudGltZXJNYXAuc2V0KGtleSwgdGltZXIpO1xyXG4gICAgfSxcclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YU1hcC5nZXQoa2V5KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN0b3JhZ2U7IiwiY29uc3QgeGhyID0ge1xyXG4gICAgYWpheDogZnVuY3Rpb24gKHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIGxldCB7dXJsLCBtZXRob2QsIGRhdGEsIGFzeW5jLCB4aHIsIGNvbnRlbnRUeXBlLCBkYXRhVHlwZSwgZG9uZSwgZmFpbH0gPSBwYXJhbXMgfHwge307XHJcbiAgICAgICAgICAgIGxldCB7aGVhZGVyLCBvblByb2dyZXNzLCBiZWZvcmVTZW5kfSA9IHBhcmFtcztcclxuICAgICAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgcmVxdWVzdC5vcGVuKChtZXRob2QgfHwgJ0dFVCcpLCB1cmwsIGFzeW5jID09PSB1bmRlZmluZWQgPyB0cnVlIDogYXN5bmMpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIChoZWFkZXIgfHwge30pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGhlYWRlciB8fCB7fSkuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcltrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjYy5nZXRWYWx1ZSgnQXV0aG9yaXphdGlvbicpKXtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIGNjLmdldFZhbHVlKCdBdXRob3JpemF0aW9uJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbmUgJiYgZG9uZShwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCksIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmYWlsICYmIGZhaWwocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZmFpbCAmJiBmYWlsKHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCksIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdC51cGxvYWQub25wcm9ncmVzcyA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcCA9IE1hdGguZmxvb3IoZS5sb2FkZWQgLyBlLnRvdGFsICogMTAwKTtcclxuICAgICAgICAgICAgICAgIG9uUHJvZ3Jlc3MgJiYgb25Qcm9ncmVzcyhwLCBlKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCBfZGF0YTtcclxuICAgICAgICAgICAgc3dpdGNoIChkYXRhVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZmlsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnanNvbic6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgY29udGVudFR5cGUgPT09IHVuZGVmaW5lZCA/IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIDogY29udGVudFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9kYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJlZm9yZVNlbmQgJiYgYmVmb3JlU2VuZChyZXF1ZXN0KTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3Quc2VuZChfZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIHBhcnNlRGF0YShkYXRhKSB7XHJcbiAgICB0cnl7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSB8fCAnJylcclxuICAgIH1jYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeGhyO1xyXG4iLCJpbXBvcnQgY2MgZnJvbSAnLi9jY2pzL2NjJztcclxuaW1wb3J0IGFuYWx5c2VyIGZyb20gJy4vYW5hbHlzZXInO1xyXG5jb25zdCBXSElURSA9ICdyZ2JhKDI1NSwyNTUsMjU1LCAwLjcpJztcclxuY29uc3QgQkxBQ0sgPSAncmdiYSgwLDAsMCwgMC45KSc7XHJcbmNvbnN0IFJFRCA9ICcjZDYzMDMxJztcclxuXHJcbmNjLnNldFZhbHVlKCd2aWV3cG9ydCcsIHt3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0fSk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYy51cGRhdGVWYWx1ZSgndmlld3BvcnQnLCB7d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodH0pO1xyXG59KTtcclxuZnVuY3Rpb24gaW5kZXgoKSB7XHJcbiAgICBsZXQgcm9vdCA9IGNjLnNlbGVjdCgnI2JvZHknKTtcclxuICAgIGxldCBtYWluQ29udGFpbmVyID0gY2MuY3JlYXRlRWxlbWVudCgnZGl2JywgJ3Rlc3QnKVxyXG4gICAgICAgIC5hZGRDbGFzcygnbWFpbi1jb250YWluZXInKTtcclxuXHJcbiAgICByb290LmFwcGVuZENoaWxkKG1haW5Db250YWluZXIpO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IG1haW5Db250YWluZXIuYWRkKCdkaXYnKVxyXG5cclxuICAgIGxldCBoZWFkZXIgPSBjb250YWluZXIuYWRkKCdkaXYnLCAnaGVhZGVyJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2hlYWRlcicpO1xyXG4gICAgbGV0IGhlYWRlckxlZnQgPSBoZWFkZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgbWluV2lkdGg6ICcyNTZweCdcclxuICAgICAgICB9KTtcclxuICAgIGxldCBsb2dvID0gaGVhZGVyTGVmdC5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNvbnRlbnQoJ0EnKVxyXG4gICAgICAgIC5hZGRDbGFzcygnYmFja2dyb3VuZC1yZWQnKVxyXG4gICAgICAgIC5hZGRDbGFzcygnZm9udC1ibGFjaycpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnNjRweCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwIDE2cHgnLFxyXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAnNTRweCcsXHJcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnNHB4JyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogUkVEICsgJyAwIDAgMTBweCcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IG5hbWVDb250YWluZXIgPSBoZWFkZXJMZWZ0LmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcclxuICAgICAgICB9KTtcclxuICAgIG5hbWVDb250YWluZXIuYWRkKCdzcGFuJylcclxuICAgICAgICAuY29udGVudCgnTlhJTiBZQU5HJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICB9KTtcclxuICAgIG5hbWVDb250YWluZXIuYWRkKCdzcGFuJylcclxuICAgICAgICAuY29udGVudCgnRnJvbnQtRW5kIERldmVsb3BlcicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaydcclxuICAgICAgICB9KTtcclxuICAgIGxldCBtZW51ID0gaGVhZGVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IG1lbnVMaXN0ID0gWydmYS1saW5rZWRpbicsICdmYS1naXRodWInXTtcclxuICAgIGxldCBsaW5rcyA9IFsnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL2luL2FueGluLXlhbmctNzA3MDI5MTI1LycsICdodHRwczovL2dpdGh1Yi5jb20vQW54aW5ZYW5nJ107XHJcbiAgICBsZXQgaG92ZXJDb2xvcnMgPSBbJyMwMDc3QjUnLCAncmdiYSgyNTUsMCw4MCwgMC44KSddO1xyXG4gICAgbWVudUxpc3QuZm9yRWFjaChmdW5jdGlvbiAodGFnLCBpZHgpIHtcclxuICAgICAgICBtZW51LmFkZCgnaScpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFiJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKG1lbnVMaXN0W2lkeF0pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnNTRweCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICAgICAgIHRleHRTaGFkb3c6ICcgMCAwIDVweCcsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnMC4zcycsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW5SaWdodDogJzE2cHgnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihsaW5rc1tpZHhdLCAnX2JsYW5rJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBob3ZlckNvbG9yc1tpZHhdLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSwgJ3N0eWxlJylcclxuICAgICAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnJyxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sICdzdHlsZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IG1haW5Db250ZW50Q29udGFpbmVyID0gY2MuY3JlYXRlRWxlbWVudCgnZGl2JywgJ21haW5fY29udGVudCcpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGhlaWdodDogJ2NhbGMoMTAwdmggLSAxMDRweCknLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAnMCAxMi41JScsXHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICB6SW5kZXg6IDUsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbidcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgbGV0IGNlbnRlclggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJZID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgbGV0IG1vdXNlWCA9IGUuY2xpZW50WDtcclxuICAgICAgICAgICAgbGV0IG1vdXNlWSA9IGUuY2xpZW50WTtcclxuICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKCcgKyAoLShtb3VzZVggLSBjZW50ZXJYKSAvIDEwMCkgKyAncHgsJyArICgtKG1vdXNlWSAtIGNlbnRlclkpIC8gMTAwKSArICdweCknXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ2ZyYW1lJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgZG9tcyA9IGNjLnNlbGVjdCgnLmZhZGUnKTtcclxuICAgICAgICAgICAgaWYoZG9tcy5sZW5ndGg9PT0wKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kKCdmcmFtZScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb21zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG9tID0gZG9tc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBpc0luVmlld1BvcnQgPSBkb20uaXNJblZpZXdwb3J0KHtvZmZzZXRZOiAxNTB9KTtcclxuICAgICAgICAgICAgICAgIGxldCBvcGFjaXR5ID0gK2RvbS5zdHlsZS5vcGFjaXR5O1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzSW5WaWV3UG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5hZGRDbGFzcygnc2xpZGUtaW4tYm90dG9tJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLnJlbW92ZUNsYXNzKCdmYWRlLW91dCcpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcygnc2xpZGUtaW4tYm90dG9tJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLmFkZENsYXNzKCdmYWRlLW91dCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgbGFuZGluZ0NvbnRhaW5lciA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAnY2FsYygxMDB2aCAtIDEwNHB4KSdcclxuICAgICAgICB9KTtcclxuICAgIGxldCBoaWdoTGlnaHQgPSBsYW5kaW5nQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY29udGVudChcIkxldCdzIG1ha2UgZGF0YSBhbGl2ZVwiKVxyXG4gICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzQ4cHgnLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICdjYWxjKDUwdmggLSAxNTJweCknXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgaW50cm8gPSBsYW5kaW5nQ29udGFpbmVyLmFkZCgncCcpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmYWRlJylcclxuICAgICAgICAuY29udGVudChcIkknbSBhIGZyb250LWVuZCBkZXZlbG9wZXIgZnJvbSBCYXkgQXJlYSwgQ2FsaWZvcm5pYSwgYW5kIGN1cnJlbnRseSBsaXZpbmcgaW4gU2FuIEpvc2UuIEkgZW5qb3kgYnVpbGRpbmcgcmljaCBcIiArXHJcbiAgICAgICAgICAgIFwiaW50ZXJhY3RpdmUgd2Vic2l0ZXMgYW5kIHdlYiBhcHBzIGZyb20gc21hbGwgdG8gbGFyZ2UuIFwiKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzIwcHgnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IHBsYXllciA9IGxhbmRpbmdDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnNjRweCcsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIC5hZGQoJ2knKVxyXG4gICAgICAgIC5hZGRDbGFzcygnZmFyJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2ZhLXBsYXktY2lyY2xlJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3JnYmEoMjU1LDAsODAsIDAuOCknXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwbGF5ZXJXYXJuLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICcnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwbGF5ZXJXYXJuLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZihjYy5nZXRWYWx1ZSgncGxheScpKXtcclxuICAgICAgICAgICAgICAgIGNjLnNldFZhbHVlKCdwbGF5JywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnZmEtcGF1c2UtY2lyY2xlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENsYXNzKCdmYS1wbGF5LWNpcmNsZScpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGNjLnNldFZhbHVlKCdwbGF5JywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENsYXNzKCdmYS1wYXVzZS1jaXJjbGUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2ZhLXBsYXktY2lyY2xlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIGxldCBwbGF5ZXJXYXJuID0gbGFuZGluZ0NvbnRhaW5lci5hZGQoJ3AnKVxyXG4gICAgICAgIC5jb250ZW50KCdXYXRjaCB5b3Ugdm9sdW1lIDopJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgdGV4dEFsaWduOidjZW50ZXInLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnbm9uZScsXHJcbiAgICAgICAgICAgIGNvbG9yOidyZ2JhKDI1NSwwLDgwLCAwLjgpJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBza2lsbENvbnRhaW5lciA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgnZGl2Jyk7XHJcbiAgICBsZXQgc2tpbGxUaXRsZSA9IHNraWxsQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY29udGVudChcIlNraWxsc1wiKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBjb2xvcjogV0hJVEUsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgZm9udFNpemU6ICc0OHB4JyxcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnMjU2cHgnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IHNraWxsQ2FyZENvbnRhaW5lciA9IHNraWxsQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxyXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICcxMjhweCcsXHJcbiAgICAgICAgICAgIGZsZXhXcmFwOiAnd3JhcCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgc2tpbGxzID0gWydmYS1odG1sNScsICdmYS1qcycsICdmYS1jc3MzLWFsdCcsICdmYS1yZWFjdCcsICdmYS1ub2RlLWpzJywnZmEtc2FzcyddO1xyXG4gICAgbGV0IHNraWxsTmFtZXMgPSBbJ0hUTUw1JywgJ0phdmFzY3JpcHQnLCAnQ1NTMycsICdSZWFjdCcsICdOb2RlSlMnLCAnU0FTUyddO1xyXG4gICAgbGV0IHNraWxsQ29sb3JzID0gWycjZTQ0ZDI2JywgJyNlZWFmNGInLCAnIzAwNzBiYScsICcjNjFkYWZiJywgJyM3Y2I3MDAnLCcjYzY5J107XHJcbiAgICBza2lsbHMuZm9yRWFjaChmdW5jdGlvbiAoaWNvbiwgaWR4KSB7XHJcbiAgICAgICAgbGV0IGNhcmQgPSBza2lsbENhcmRDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhZGUnKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIG1pbldpZHRoOiAnMzAwcHgnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGZsZXhHcm93OiAxLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbG9nbyA9IGNhcmQuYWRkKCdpJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYWInKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoaWNvbilcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzI1NnB4JyxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogc2tpbGxDb2xvcnNbaWR4XSxcclxuICAgICAgICAgICAgICAgIHRleHRTaGFkb3c6IHNraWxsQ29sb3JzW2lkeF0gKyAnIDAgMCAxMHB4J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbmFtZSA9IGNhcmQuYWRkKCdwJylcclxuICAgICAgICAgICAgLmNvbnRlbnQoc2tpbGxOYW1lc1tpZHhdKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHNraWxsQ29sb3JzW2lkeF0sXHJcbiAgICAgICAgICAgICAgICB0ZXh0U2hhZG93OiBza2lsbENvbG9yc1tpZHhdICsgJyAwIDAgMTBweCdcclxuICAgICAgICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBjYXJlZXJDb250YWluZXIgPSBtYWluQ29udGVudENvbnRhaW5lci5hZGQoJ2RpdicpO1xyXG4gICAgbGV0IGNhcmVlclRpdGxlID0gc2tpbGxDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jb250ZW50KFwiQ2FyZWVyXCIpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzQ4cHgnLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICcxMjhweCcsXHJcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzY0cHgnLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBjb21wYW5pZXMgPSBbJ25ldEVsYXN0aWMgU3lzdGVtcywgSW5jLicsICdTYW4gRnJhbmNpc2NvIFN0YXRlIFVuaXZlcnNpdHknLCAnU2hhbmdoYWkgVW5pdmVyc2l0eSddO1xyXG4gICAgbGV0IHRpdGxlcyA9IFsnU29mdHdhcmUgRW5naW5lZXInLCAnQlMgLSBDb21wdXRlciBFbmdpbmVlcmluZyBTdHVkZW50JywgJ0FTIC0gQ29tcHV0ZXIgQXBwbGljYXRpb24gVGVjaG5vbG9neSBTdHVkZW50J107XHJcbiAgICBsZXQgdGltZUxpbmVzID0gWycyMDE3IC0gQ3VycmVudCcsICcyMDEzIC0gMjAxNycsICcyMDA5IC0gMjAxMyddO1xyXG4gICAgbGV0IHByb2plY3RzID0ge1xyXG4gICAgICAgICduZXRFbGFzdGljIFN5c3RlbXMsIEluYy4nOiBbJ3ZCTkcgTWFuYWdlbWVudCBTeXN0ZW0gKFVJIExlYWQpJywgJ1NELVdBTiBNYW5hZ2VtZW50IFN5c3RlbSAoVUkgVGVhbSBNZW1iZXIpJyxdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbXBhbmllcy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wYW55TmFtZSwgaWR4KSB7XHJcbiAgICAgICAgbGV0IGNhcmQgPSBjYXJlZXJDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhZGUnKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc2NHB4J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBsZXQgY29tcGFueSA9IGNhcmQuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAuY29udGVudChjb21wYW55TmFtZSlcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgZm9udFNpemUgPSAnMjBweCc7XHJcbiAgICAgICAgbGV0IHRpdGxlID0gY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5jb250ZW50KHRpdGxlc1tpZHhdKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCB0aW1lTGluZSA9IGNhcmQuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAuY29udGVudCh0aW1lTGluZXNbaWR4XSlcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemUsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIChwcm9qZWN0c1tjb21wYW55TmFtZV0gfHwgW10pLmZvckVhY2goZnVuY3Rpb24gKHByb2plY3QpIHtcclxuICAgICAgICAgICAgY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgICAgICAuY29udGVudChwcm9qZWN0KVxyXG4gICAgICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGZvb3RlciA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgncCcpXHJcbiAgICAgICAgLmNvbnRlbnQoJ1Bvd2VyZWQgYnkgY2NKUywgYSBzZWxmLWltcGxlbWVudGVkIEphdmFzY3JpcHQgTGlicmFyeS4nKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICcxMjhweCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgZm9vdFNoYWRvdyA9IGNvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICBib3R0b206ICctM3B4JyxcclxuICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgekluZGV4OiAxMCxcclxuICAgICAgICAgICAgcG9pbnRlckV2ZW50czogICAnbm9uZSdcclxuICAgICAgICAgICAgLy9ib3hTaGFkb3c6ICdyZ2JhKDI1NSwgMCwgODAsIDAuOCkgMHB4IDBweCA1MHB4IDJweCdcclxuICAgICAgICB9KTtcclxuICAgIGFuYWx5c2VyKGZvb3RTaGFkb3cpO1xyXG4gICAgbGV0IGNvZGVCYWNrZ3JvdW5kVGV4dCA9IGluZGV4LnRvU3RyaW5nKCk7XHJcbiAgICBsZXQgY29sdW1uV2lkdGggPSBNYXRoLm1pbig0MDAgLCB3aW5kb3cuaW5uZXJXaWR0aCAtIDEyOCk7XHJcbiAgICBsZXQgY29sdW1uQ291bnQgPSBNYXRoLm1pbigyLCBNYXRoLmZsb29yKHdpbmRvdy5pbm5lcldpZHRoLyhjb2x1bW5XaWR0aCkpKTtcclxuICAgIGxldCBjb2RlQmFja2dyb3VuZCA9IGNvbnRhaW5lci5hZGQoJ3ByZScpXHJcbiAgICAgICAgLmFkZENsYXNzKCdjcnRUZXh0JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnbGVmdCcsXHJcbiAgICAgICAgICAgIHRvcDogJzEyOHB4JyxcclxuICAgICAgICAgICAgbGVmdDogJzY0cHgnLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgY29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LCAwLjA2KScsXHJcbiAgICAgICAgICAgIHpJbmRleDogMCxcclxuICAgICAgICAgICAgY29sdW1uQ291bnQ6IGNvbHVtbkNvdW50LFxyXG4gICAgICAgICAgICBjb2x1bW5XaWR0aDogY29sdW1uV2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICB3aWR0aDogJ2NhbGMoMTAwdncgLSAxMjhweCknLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjNcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kYXRhKHtcclxuICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5iaW5kKCdmcmFtZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHtjb3VudGVyLCBzdHJ9ID0gdGhpcy5nZXREYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoJyArICgtbWFpbkNvbnRlbnRDb250YWluZXIuc2Nyb2xsVG9wLzYpICsgJ3B4KSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvdW50ZXIrPTQ7XHJcbiAgICAgICAgICAgIGlmKGNvdW50ZXIgPj0gY29kZUJhY2tncm91bmRUZXh0Lmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAvL2NvdW50ZXIgPSBjb2RlQmFja2dyb3VuZFRleHQubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyVGV4dCA9IGNvZGVCYWNrZ3JvdW5kVGV4dC5zdWJzdHJpbmcoMCwgY291bnRlcikgKyAnXyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5kYXRhKHtjb3VudGVyOiBjb3VudGVyfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5iaW5kKCd2aWV3cG9ydCcsIGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIGxldCB7aGVpZ2h0LCB3aWR0aH0gPSBkO1xyXG4gICAgICAgICAgICBsZXQgY29sdW1uV2lkdGggPSBNYXRoLm1pbig0MDAgLCB3aWR0aCAtIDEyOCk7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5Db3VudCA9IE1hdGgubWluKDIsIE1hdGguZmxvb3Iod2lkdGgvKGNvbHVtbldpZHRoKSkpO1xyXG4gICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Db3VudDogY29sdW1uQ291bnQsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5XaWR0aDogY29sdW1uV2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICBtYWluQ29udGFpbmVyLmFkZEVsZW1lbnQoY29udGFpbmVyKTtcclxuICAgIGNvbnRhaW5lci5hZGRFbGVtZW50KGhlYWRlcik7XHJcbiAgICBjb250YWluZXIuYWRkRWxlbWVudChtYWluQ29udGVudENvbnRhaW5lcik7XHJcbn1cclxuaW5kZXgoKTsiXSwic291cmNlUm9vdCI6IiJ9