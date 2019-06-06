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
    }).bind('viewport', function () {
        this.attr({
            width: Container.getBoundingClientRect().width
        });
    });
    ctx = canvas.getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, "rgba(249, 202, 36,1.0)");
    gradient.addColorStop(0.5, "rgba(255,0,80,0.5)");
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
        bar_width = 5;
        bars = canvas.width / bar_width;
        //bar_width = canvas.width / (bars);
        for (var i = 0; i < bars; i++) {
            bar_x = i * bar_width;
            //bar_x2 = (canvas.width) - i * bar_width;
            bar_height = -(fbc_array[i] * canvas.height / 255) - 2;
            ctx.fillStyle = gradient;
            ctx.fillRect(bar_x, canvas.height, bar_width - 1, bar_height < -70 ? bar_height : bar_height * 0.9);
            //ctx.fillRect(bar_x2, canvas.height, bar_width, bar_height<-70?bar_height: bar_height*0.9);
            if (bar_height < -70) {
                var gradientHit = ctx.createLinearGradient(bar_x - 10, 0, bar_x + 10, 0);
                gradientHit.addColorStop(0, "rgba(255,0,80,0)");
                gradientHit.addColorStop(0.25, "rgba(255,0,80,0.1)");
                gradientHit.addColorStop(0.5, "rgba(249, 202, 36,1.0)");
                gradientHit.addColorStop(0.75, "rgba(255,0,80,0.1)");
                gradientHit.addColorStop(1, "rgba(255,0,80,0)");
                ctx.fillStyle = gradientHit;
                ctx.fillRect(bar_x - 10, 0, 20, 1);
                //  let gradientHit2 = ctx.createLinearGradient(bar_x2-5, 0, bar_x2+5, 0);
                //  gradientHit2.addColorStop(0, "rgba(255,0,80,0)");
                //  gradientHit2.addColorStop(0.25, "rgba(255,0,80,0)");
                //  gradientHit2.addColorStop(0.5, "rgba(255,0,80,0.8)");
                //  gradientHit2.addColorStop(0.75, "rgba(255,0,80,0)");
                //  gradientHit2.addColorStop(1, "rgba(255,0,80,0)");
                //  ctx.fillStyle = gradientHit2;
                // ctx.fillRect(bar_x2-5, 1, 10, 1);
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
    element._memory = {};

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

    element.getMemory = function () {
        return this._memory;
    };

    element.memory = function (obj) {
        this._memory = obj;
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
    }).memory({
        counter: 0,
        isPrinting: true,
        transform: function transform() {
            this.css({
                transform: 'translateY(' + -mainContentContainer.scrollTop / 6 + 'px)'
            });
        },
        printCode: function printCode() {
            var mem = this.getMemory();
            mem.counter += 4;
            if (mem.counter >= codeBackgroundText.length) {
                //counter = codeBackgroundText.length - 1;
                mem.isPrinting = false;
            } else {
                this.innerText = codeBackgroundText.substring(0, mem.counter) + '_';
            }
        }
    }).bind('frame', function () {
        var _getMemory = this.getMemory(),
            transform = _getMemory.transform,
            printCode = _getMemory.printCode,
            isPrinting = _getMemory.isPrinting;

        transform.call(this);
        isPrinting && printCode.call(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuYWx5c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2NjLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2NvbW1vbi9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY29tbW9uL3JhZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy9kb20vZG9tLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy94aHIveGhyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjYW52YXMiLCJjdHgiLCJzb3VyY2UiLCJjb250ZXh0IiwiYW5hbHlzZXIiLCJmYmNfYXJyYXkiLCJiYXJzIiwiYmFyX3giLCJiYXJfeDIiLCJiYXJfd2lkdGgiLCJiYXJfaGVpZ2h0IiwiaXNJbml0IiwiaGVpZ2h0Iiwid2lkdGgiLCJDb250YWluZXIiLCJwb2ludGVyRXZlbnRzIiwiYXVkaW8iLCJncmFkaWVudCIsImNjIiwiZnJhbWVMb29wZXIiLCJ3aW5kb3ciLCJpIiwiZ3JhZGllbnRIaXQiLCJJU19XT1JLRVIiLCJzZWxmIiwiQ09OVEVYVCIsInV0aWxzIiwiY29tbW9uIiwibG9hZCIsImFkZE9ucyIsIm9wdGlvbnMiLCJzZWxlY3QiLCJkb20iLCJjcmVhdGVFbGVtZW50IiwiY3JlYXRlRWxlbWVudE5TIiwic2V0VmFsdWUiLCJzdG9yYWdlIiwic2F2ZUFycmF5IiwiYXJyIiwiaWRrZXkiLCJrZXkiLCJpdGVtIiwidXBkYXRlVmFsdWUiLCJnZXRWYWx1ZSIsInNldFRpbWVyIiwicmFmIiwiY2FuY2VsVGltZXIiLCJyZXF1ZXN0IiwicGFyYW1zIiwieGhyIiwibGFzdCIsImZyYW1lVGlja2VyIiwiaW1tZWRpYXRlbHkiLCJvYmoiLCJmbiIsInRhcmdldCIsIk1hdGgiLCJzNCIsIk9iamVjdCIsImlzSUUiLCJpc0Nocm9tZSIsImlzT3BlcmEiLCJvcHIiLCJuYXZpZ2F0b3IiLCJwIiwic2FmYXJpIiwiZG9jdW1lbnQiLCJvdXRwdXQiLCJhcmd1bWVudHMiLCJFbGVtZW50IiwidmFsdWUiLCJ2YXJzIiwicGFydHMiLCJyZXF1ZXN0VGltZW91dCIsInNldFRpbWVvdXQiLCJzdGFydCIsIkRhdGUiLCJoYW5kbGUiLCJjbGVhclJlcXVlc3RUaW1lb3V0IiwiY2xlYXJUaW1lb3V0Iiwic2VsZWN0b3IiLCJfc2VsZWN0b3IiLCJuYW1lIiwiZG9tcyIsImlkIiwiZWxlbWVudCIsImVsZW1lbnRJZCIsInRhZyIsInNldHVwRWxlbWVudE1ldGhvZHMiLCJjaGlsZCIsImV2ZW50VGFnIiwiZXZlbnROYW1lIiwiZXZlbnRIYW5kbGVyIiwidiIsIm9mZnNldFgiLCJvZmZzZXRZIiwieDIiLCJ4IiwieTIiLCJ5IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiZGF0YU1hcCIsInRpbWVyTWFwIiwic2hvdWxkUmVhY3QiLCJvbGRWYWx1ZSIsInJlc2V0IiwibmV3VmFsdWUiLCJicm9hZGNhc3QiLCJ0aW1lciIsImFqYXgiLCJwcm9taXNlIiwibWV0aG9kIiwiYXN5bmMiLCJoZWFkZXIiLCJkb25lIiwicGFyc2VEYXRhIiwicmVzb2x2ZSIsImZhaWwiLCJyZWplY3QiLCJlIiwib25Qcm9ncmVzcyIsIl9kYXRhIiwiY29udGVudFR5cGUiLCJKU09OIiwiYmVmb3JlU2VuZCIsImRhdGEiLCJXSElURSIsIkJMQUNLIiwiUkVEIiwicm9vdCIsIm1haW5Db250YWluZXIiLCJjb250YWluZXIiLCJoZWFkZXJMZWZ0IiwiZGlzcGxheSIsIm1pbldpZHRoIiwibG9nbyIsImZvbnRTaXplIiwicGFkZGluZyIsImxpbmVIZWlnaHQiLCJtYXJnaW5SaWdodCIsImJveFNoYWRvdyIsIm5hbWVDb250YWluZXIiLCJtZW51IiwibWVudUxpc3QiLCJsaW5rcyIsImhvdmVyQ29sb3JzIiwiY3Vyc29yIiwidGV4dEFsaWduIiwidGV4dFNoYWRvdyIsInRyYW5zaXRpb24iLCJjb2xvciIsIm1haW5Db250ZW50Q29udGFpbmVyIiwib3ZlcmZsb3dZIiwicG9zaXRpb24iLCJ6SW5kZXgiLCJmbGV4RGlyZWN0aW9uIiwiY2VudGVyWCIsImNlbnRlclkiLCJtb3VzZVgiLCJtb3VzZVkiLCJ0cmFuc2Zvcm0iLCJpc0luVmlld1BvcnQiLCJvcGFjaXR5IiwibGFuZGluZ0NvbnRhaW5lciIsImhpZ2hMaWdodCIsImZvbnRXZWlnaHQiLCJtYXJnaW5Ub3AiLCJpbnRybyIsInBsYXllciIsInBsYXllcldhcm4iLCJza2lsbENvbnRhaW5lciIsInNraWxsVGl0bGUiLCJza2lsbENhcmRDb250YWluZXIiLCJqdXN0aWZ5Q29udGVudCIsImZsZXhXcmFwIiwic2tpbGxzIiwic2tpbGxOYW1lcyIsInNraWxsQ29sb3JzIiwiY2FyZCIsImZsZXhHcm93IiwiY2FyZWVyQ29udGFpbmVyIiwiY2FyZWVyVGl0bGUiLCJtYXJnaW5Cb3R0b20iLCJjb21wYW5pZXMiLCJ0aXRsZXMiLCJ0aW1lTGluZXMiLCJwcm9qZWN0cyIsImNvbXBhbnkiLCJ0aXRsZSIsInRpbWVMaW5lIiwiZm9vdGVyIiwiZm9vdFNoYWRvdyIsImJvdHRvbSIsImxlZnQiLCJjb2RlQmFja2dyb3VuZFRleHQiLCJpbmRleCIsImNvbHVtbldpZHRoIiwiY29sdW1uQ291bnQiLCJjb2RlQmFja2dyb3VuZCIsInRvcCIsImNvdW50ZXIiLCJpc1ByaW50aW5nIiwicHJpbnRDb2RlIiwibWVtIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VB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UUFBSStJLGlCQUFpQiw2Q0FFWjtBQUNEbkQsbUJBREM7QUFFRG9ELGFBRkM7QUFHRE4sY0FIQztBQUlEeEMsa0JBSkM7QUFLREgsZUFMQztBQU1ESSxnQkFOQztBQU9EMkMscUJBUEM7QUFRREQscUJBQWFBLGNBUlo7QUFTRHhMLGVBVEM7QUFVRHNKLGlCQUFTO0FBVlIsS0FGWSxTQWNUO0FBQ0pzQyxpQkFESTtBQUVKQyxvQkFGSTtBQUdKekMsbUJBQVcscUJBQVk7QUFDbkIscUJBQVM7QUFDTEEsMkJBQVcsZ0JBQWlCLENBQUNULHFCQUFELFlBQWpCLElBQXNEO0FBRDVELGFBQVQ7QUFKQTtBQVFKbUQsbUJBQVkscUJBQVk7QUFDcEIsZ0JBQUlDLE1BQU0sS0FBVixTQUFVLEVBQVY7QUFDQUE7QUFDQSxnQkFBR0EsZUFBZVQsbUJBQWxCLFFBQTRDO0FBQ3hDO0FBQ0FTO0FBRkosbUJBR0s7QUFDRCxpQ0FBaUJULGdDQUErQlMsSUFBL0JULFdBQWpCO0FBQ0g7QUFDSjtBQWpCRyxLQWRTLGdCQWlDRixZQUFZO0FBQUEseUJBQ2tCLEtBRGxCLFNBQ2tCLEVBRGxCO0FBQUE7QUFBQTtBQUFBOztBQUV2QmxDO0FBQ0F5QyxzQkFBY0MsZUFBZEQsSUFBY0MsQ0FBZEQ7QUFwQ2Esd0JBc0NDLGFBQWE7QUFBQTtBQUFBOztBQUUzQixZQUFJTCxjQUFjN0ksY0FBZTNDLFFBQWpDLEdBQWtCMkMsQ0FBbEI7QUFDQSxZQUFJOEksY0FBYzlJLFlBQVlBLFdBQVczQyxRQUF6QyxXQUE4QjJDLENBQVpBLENBQWxCO0FBQ0EsaUJBQVM7QUFDTDhJLHlCQURLO0FBRUxELHlCQUFhQSxjQUFjO0FBRnRCLFNBQVQ7QUExQ1IsS0FBcUIsQ0FBckI7O0FBaURBbEU7QUFDQUM7QUFDQUE7QUFDSDtBQUNEZ0UsUSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJmdW5jdGlvbiBhbmFseXNlcihDb250YWluZXIpIHtcclxuICAgIC8vIEVzdGFibGlzaCBhbGwgdmFyaWFibGVzIHRoYXQgeW91ciBBbmFseXNlciB3aWxsIHVzZVxyXG4gICAgbGV0IGNhbnZhcywgY3R4LCBzb3VyY2UsIGNvbnRleHQsIGFuYWx5c2VyLCBmYmNfYXJyYXksIGJhcnMsIGJhcl94LCBiYXJfeDIsYmFyX3dpZHRoLCBiYXJfaGVpZ2h0LCBpc0luaXQ7XHJcbiAgICBjYW52YXMgPSBDb250YWluZXIuYWRkKCdjYW52YXMnKVxyXG4gICAgICAgIC5hdHRyKHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiBDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDBweCcsXHJcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICAgJ25vbmUnLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ3BsYXknLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICBpZihkKXtcclxuICAgICAgICAgICAgICAgIGlzSW5pdCA9IGlzSW5pdD90cnVlOmluaXRNcDNQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXVkaW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ3ZpZXdwb3J0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICBsZXQgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgMTAwKTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcInJnYmEoMjQ5LCAyMDIsIDM2LDEuMClcIik7XHJcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMC41LCBcInJnYmEoMjU1LDAsODAsMC41KVwiKTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBcInJnYmEoMjU1LDAsODAsMC41KVwiKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgYW4gYXVkaW8gb2JqZWN0IGFuZCBhZGp1c3Qgc29tZSBvZiBpdHMgcHJvcGVydGllc1xyXG4gICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCk7XHJcbiAgICBhdWRpby5zcmMgPSBgLi9yZXMvJHtjYy51dGlscy5nZXRVcmxWYXIoJ211c2ljJywgJ0JvaGVtaWFuIFJoYXBzb2R5Jyl9LiR7Y2MudXRpbHMuZ2V0VXJsVmFyKCdmb3JtYXQnLCAnYWFjJyl9YDtcclxuICAgIGF1ZGlvLmNvbnRyb2xzID0gdHJ1ZTtcclxuICAgIGF1ZGlvLmxvb3AgPSB0cnVlO1xyXG4gICAgYXVkaW8uYXV0b3BsYXkgPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0TXAzUGxheWVyKCkge1xyXG4gICAgICAgIC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1ZGlvX2JveCcpLmFwcGVuZENoaWxkKGF1ZGlvKTtcclxuICAgICAgICBjb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpOyAvLyBBdWRpb0NvbnRleHQgb2JqZWN0IGluc3RhbmNlXHJcbiAgICAgICAgYW5hbHlzZXIgPSBjb250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7IC8vIEFuYWx5c2VyTm9kZSBtZXRob2RcclxuICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAvLyBSZS1yb3V0ZSBhdWRpbyBwbGF5YmFjayBpbnRvIHRoZSBwcm9jZXNzaW5nIGdyYXBoIG9mIHRoZSBBdWRpb0NvbnRleHRcclxuICAgICAgICBzb3VyY2UgPSBjb250ZXh0LmNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZShhdWRpbyk7XHJcbiAgICAgICAgc291cmNlLmNvbm5lY3QoYW5hbHlzZXIpO1xyXG4gICAgICAgIGFuYWx5c2VyLmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICAgICAgZnJhbWVMb29wZXIoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmcmFtZUxvb3BlcigpIHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZyYW1lTG9vcGVyKTtcclxuICAgICAgICBmYmNfYXJyYXkgPSBuZXcgVWludDhBcnJheShhbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudCk7XHJcbiAgICAgICAgYW5hbHlzZXIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEoZmJjX2FycmF5KTtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7IC8vIENsZWFyIHRoZSBjYW52YXNcclxuICAgICAgICBiYXJfd2lkdGggPSA1O1xyXG4gICAgICAgIGJhcnMgPSBjYW52YXMud2lkdGgvYmFyX3dpZHRoO1xyXG4gICAgICAgIC8vYmFyX3dpZHRoID0gY2FudmFzLndpZHRoIC8gKGJhcnMpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmFyczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJhcl94ID0gaSAqIGJhcl93aWR0aDtcclxuICAgICAgICAgICAgLy9iYXJfeDIgPSAoY2FudmFzLndpZHRoKSAtIGkgKiBiYXJfd2lkdGg7XHJcbiAgICAgICAgICAgIGJhcl9oZWlnaHQgPSAtKGZiY19hcnJheVtpXSpjYW52YXMuaGVpZ2h0LzI1NSkgLSAyO1xyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XHJcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChiYXJfeCwgY2FudmFzLmhlaWdodCwgYmFyX3dpZHRoLTEsIGJhcl9oZWlnaHQ8LTcwP2Jhcl9oZWlnaHQ6IGJhcl9oZWlnaHQqMC45KTtcclxuICAgICAgICAgICAgLy9jdHguZmlsbFJlY3QoYmFyX3gyLCBjYW52YXMuaGVpZ2h0LCBiYXJfd2lkdGgsIGJhcl9oZWlnaHQ8LTcwP2Jhcl9oZWlnaHQ6IGJhcl9oZWlnaHQqMC45KTtcclxuICAgICAgICAgICAgaWYoYmFyX2hlaWdodDwtNzApe1xyXG4gICAgICAgICAgICAgICAgbGV0IGdyYWRpZW50SGl0ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KGJhcl94LTEwLCAwLCBiYXJfeCsxMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBncmFkaWVudEhpdC5hZGRDb2xvclN0b3AoMCwgXCJyZ2JhKDI1NSwwLDgwLDApXCIpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRIaXQuYWRkQ29sb3JTdG9wKDAuMjUsIFwicmdiYSgyNTUsMCw4MCwwLjEpXCIpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRIaXQuYWRkQ29sb3JTdG9wKDAuNSwgXCJyZ2JhKDI0OSwgMjAyLCAzNiwxLjApXCIpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRIaXQuYWRkQ29sb3JTdG9wKDAuNzUsIFwicmdiYSgyNTUsMCw4MCwwLjEpXCIpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRIaXQuYWRkQ29sb3JTdG9wKDEsIFwicmdiYSgyNTUsMCw4MCwwKVwiKTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudEhpdDtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdChiYXJfeC0xMCwgMCwgMjAsIDEpO1xyXG4gICAgICAgICAgICAgICAvLyAgbGV0IGdyYWRpZW50SGl0MiA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudChiYXJfeDItNSwgMCwgYmFyX3gyKzUsIDApO1xyXG4gICAgICAgICAgICAgICAvLyAgZ3JhZGllbnRIaXQyLmFkZENvbG9yU3RvcCgwLCBcInJnYmEoMjU1LDAsODAsMClcIik7XHJcbiAgICAgICAgICAgICAgIC8vICBncmFkaWVudEhpdDIuYWRkQ29sb3JTdG9wKDAuMjUsIFwicmdiYSgyNTUsMCw4MCwwKVwiKTtcclxuICAgICAgICAgICAgICAgLy8gIGdyYWRpZW50SGl0Mi5hZGRDb2xvclN0b3AoMC41LCBcInJnYmEoMjU1LDAsODAsMC44KVwiKTtcclxuICAgICAgICAgICAgICAgLy8gIGdyYWRpZW50SGl0Mi5hZGRDb2xvclN0b3AoMC43NSwgXCJyZ2JhKDI1NSwwLDgwLDApXCIpO1xyXG4gICAgICAgICAgICAgICAvLyAgZ3JhZGllbnRIaXQyLmFkZENvbG9yU3RvcCgxLCBcInJnYmEoMjU1LDAsODAsMClcIik7XHJcbiAgICAgICAgICAgICAgIC8vICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnRIaXQyO1xyXG4gICAgICAgICAgICAgICAvLyBjdHguZmlsbFJlY3QoYmFyX3gyLTUsIDEsIDEwLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYW5hbHlzZXI7IiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbS9kb20nO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZSc7XHJcbmltcG9ydCByYWYgZnJvbSAnLi9jb21tb24vcmFmJztcclxuaW1wb3J0IGNvbW1vbiBmcm9tICcuL2NvbW1vbi9jb21tb24nO1xyXG5pbXBvcnQgeGhyIGZyb20gJy4veGhyL3hocic7XHJcblxyXG5jb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxuXHJcbnZhciBjYztcclxud2luZG93LmNjID0gY2MgPSB7XHJcbiAgICB1dGlsczogY29tbW9uLFxyXG4gICAgbG9hZDogZnVuY3Rpb24oYWRkT25zID0gW10sIG9wdGlvbnMgPSB7fSl7XHJcblxyXG4gICAgfSxcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIHJldHVybiBkb20uc2VsZWN0KHNlbGVjdG9yKVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBkb20uY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBpZCwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50TlM6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5OUyA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGRvbS5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIGlkLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5yZXNldCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBzYXZlQXJyYXk6IGZ1bmN0aW9uKGtleSwgYXJyID0gW10sIGlka2V5KXtcclxuICAgICAgICBpZihpZGtleSAhPT0gdW5kZWZpbmVkICYmIGlka2V5ICE9PSAnJyAmJiBrZXkgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBjYy51cGRhdGVWYWx1ZShpdGVtW2lka2V5XSwgaXRlbSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5zZXRWYWx1ZShrZXksIGFycik7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlVmFsdWU6IGZ1bmN0aW9uKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gc3RvcmFnZS5nZXRWYWx1ZShrZXkpO1xyXG4gICAgfSxcclxuICAgIHNldFRpbWVyOiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgcmV0dXJuIHJhZi5yZXF1ZXN0VGltZW91dChmbiwgZGVsYXkpXHJcbiAgICB9LFxyXG4gICAgY2FuY2VsVGltZXI6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICByYWYuY2xlYXJSZXF1ZXN0VGltZW91dChoYW5kbGUpO1xyXG4gICAgfSxcclxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xyXG4gICAgICAgIHJldHVybiB4aHIuYWpheChwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmlmKElTX1dPUktFUil7XHJcbiAgICBkZWxldGUgY2Muc2VsZWN0O1xyXG4gICAgZGVsZXRlIGNjLmNyZWF0ZUVsZW1lbnQ7XHJcbiAgICBkZWxldGUgY2MuY3JlYXRlRWxlbWVudE5TO1xyXG59ZWxzZXtcclxuICAgIGxldCBsYXN0ID0gMFxyXG4gICAgbGV0IGZyYW1lVGlja2VyID0gZnVuY3Rpb24gKHRpbWVzdGFtcCkge1xyXG4gICAgICAgIGNjLnNldFZhbHVlKCdmcmFtZScsIHRpbWVzdGFtcCwge2ltbWVkaWF0ZWx5OiB0cnVlfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aW1lc3RhbXAgLSBsYXN0KTtcclxuICAgICAgICBsYXN0ID0gdGltZXN0YW1wO1xyXG4gICAgICAgIHJhZi5yZXF1ZXN0VGltZW91dChmcmFtZVRpY2tlciwgMTYpXHJcbiAgICB9O1xyXG4gICAgZnJhbWVUaWNrZXIoMCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYzsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxuY29uc3QgY29tbW9uID0ge307XHJcblxyXG5jb21tb24ub2JqZWN0Zm9yRWFjaCA9IGZ1bmN0aW9uKG9iaixmbil7XHJcbiAgICBmb3IodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgZm4ob2JqW2tleV0sIGtleSwgb2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb21tb24ub2JqZWN0QXNzaWduID0gZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2Upe1xyXG4gICAgZm9yKGxldCBrZXkgaW4gc291cmNlKSB7XHJcbiAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59O1xyXG5cclxuY29tbW9uLmNyZWF0ZUlkID0gZnVuY3Rpb24oKXtcclxuICAgIGZ1bmN0aW9uIHM0KCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxyXG4gICAgICAgICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcbn07XHJcblxyXG5jb21tb24uaXNPYmplY3QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIChpdGVtIT09dW5kZWZpbmVkICYmIGl0ZW0gPT09IE9iamVjdChpdGVtKSAmJiAhKGl0ZW0gaW5zdGFuY2VvZiBBcnJheSkpXHJcbn07XHJcblxyXG5jb21tb24uZ2V0QnJvd3NlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGlzSUUgPSBmYWxzZTtcclxuICAgIGxldCBpc0Nocm9tZSA9IGZhbHNlO1xyXG4gICAgbGV0IGlzT3BlcmEgPSBmYWxzZTtcclxuICAgIGlmICgoISFDT05URVhULm9wciAmJiAhIW9wci5hZGRvbnMpIHx8ICEhQ09OVEVYVC5vcGVyYSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBPUFIvJykgPj0gMCkge1xyXG4gICAgICAgIGlzT3BlcmEgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiAnb3BlcmEnO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBJbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xyXG4gICAgfVxyXG4gICAgaWYgKC9jb25zdHJ1Y3Rvci9pLnRlc3QoQ09OVEVYVC5IVE1MRWxlbWVudCkgfHwgKGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgcmV0dXJuIHAudG9TdHJpbmcoKSA9PT0gXCJbb2JqZWN0IFNhZmFyaVJlbW90ZU5vdGlmaWNhdGlvbl1cIjtcclxuICAgIH0pKCFDT05URVhUWydzYWZhcmknXSB8fCBzYWZhcmkucHVzaE5vdGlmaWNhdGlvbikpIHtcclxuICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XHJcbiAgICB9XHJcbiAgICBpZiAoZmFsc2UgfHwgISFkb2N1bWVudC5kb2N1bWVudE1vZGUpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50c1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoISgncmVtb3ZlJyBpbiBFbGVtZW50LnByb3RvdHlwZSkpIHtcclxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXNJRSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuICdpZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoIWlzSUUgJiYgISFDT05URVhULlN0eWxlTWVkaWEpIHtcclxuICAgICAgICByZXR1cm4gJ2VkZ2UnO1xyXG4gICAgfVxyXG4gICAgaWYgKCEhQ09OVEVYVC5jaHJvbWUgJiYgISFDT05URVhULmNocm9tZS53ZWJzdG9yZSkge1xyXG4gICAgICAgIGlzQ2hyb21lID0gdHJ1ZVxyXG4gICAgICAgIHJldHVybiAnY2hyb21lJztcclxuICAgIH1cclxuICAgIGlmICgoaXNDaHJvbWUgfHwgaXNPcGVyYSkgJiYgISFDT05URVhULkNTUykge1xyXG4gICAgICAgIHJldHVybiAnYmxpbmsnO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29tbW9uLnJlYWRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgaWYodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpe1xyXG4gICAgICAgIHJldHVybiB2YWx1ZShvcHRpb25zKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbW1vbi5nZXRVcmxWYXIgPSBmdW5jdGlvbiAoa2V5LCBkZWZhdWx0VmFsdWUpIHtcclxuICAgIHZhciB2YXJzID0ge307XHJcbiAgICB2YXIgcGFydHMgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC9bPyZdKyhbXj0mXSspPShbXiZdKikvZ2ksIGZ1bmN0aW9uIChtLCBrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdmFyc1trZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiAodmFyc1trZXldID09PSB1bmRlZmluZWQ/IGRlZmF1bHRWYWx1ZTogdmFyc1trZXldKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1vbjsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxudmFyIHJhZiA9IHtcclxuICAgIHJlcXVlc3RUaW1lb3V0OiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgaWYgKCFDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZSlcclxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZm4sIGRlbGF5KTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgaGFuZGxlID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb29wKHRpbWVzdGFtcCkge1xyXG4gICAgICAgICAgICAoRGF0ZS5ub3coKSAtIHN0YXJ0KSA+PSBkZWxheSA/IGZuKHRpbWVzdGFtcCkgOiBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICByZXR1cm4gaGFuZGxlO1xyXG4gICAgfSxcclxuICAgIGNsZWFyUmVxdWVzdFRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICBDT05URVhULmNhbmNlbEFuaW1hdGlvbkZyYW1lID8gQ09OVEVYVC5jYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpOmNsZWFyVGltZW91dChoYW5kbGUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmFmOyIsImltcG9ydCBjb21tb24gZnJvbSAnLi4vY29tbW9uL2NvbW1vbidcclxudmFyIGRvbSA9IHtcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIGlmKHNlbGVjdG9yPT09dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IF9zZWxlY3RvciA9IHNlbGVjdG9yLmNoYXJBdCgwKTtcclxuICAgICAgICBsZXQgbmFtZSA9IHNlbGVjdG9yLnN1YnN0cmluZygxKTtcclxuICAgICAgICBsZXQgZG9tcyA9IFtdO1xyXG4gICAgICAgIHN3aXRjaCAoX3NlbGVjdG9yKXtcclxuICAgICAgICAgICAgY2FzZSAnIyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZSk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBkb21zID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpIHx8IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRvbXM7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHRhZywgaWQgPSAnJywgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgICAgIGxldCBlbGVtZW50SWQgPSBpZCB8fCAodGFnICsgJ18nICsgY29tbW9uLmNyZWF0ZUlkKCkpO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIGVsZW1lbnRJZCk7XHJcblxyXG4gICAgICAgIHNldHVwRWxlbWVudE1ldGhvZHMoZWxlbWVudCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldHVwRWxlbWVudE1ldGhvZHMoZWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMgPSBuZXcgTWFwKCk7XHJcbiAgICBlbGVtZW50Ll9ib3VuZCA9IG5ldyBNYXAoKTtcclxuICAgIGVsZW1lbnQuX21lbW9yeSA9IHt9O1xyXG5cclxuICAgIGVsZW1lbnQuYWRkID0gZnVuY3Rpb24gKHRhZywgaWQsIG9wdGlvbnMpIHtcclxuICAgICAgICBsZXQgY2hpbGQgPSBkb20uY3JlYXRlRWxlbWVudCh0YWcsIGlkLCBvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRFbGVtZW50KGNoaWxkKTtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5hZGRFbGVtZW50ID0gZnVuY3Rpb24gKGNoaWxkKSB7XHJcbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkXHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYWRkQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuZ2V0QXR0ciA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKGtleSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYXR0ciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudCgnYXR0cicsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmdldE1lbW9yeSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lbW9yeTtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5tZW1vcnkgPSBmdW5jdGlvbihvYmope1xyXG4gICAgICAgIHRoaXMuX21lbW9yeSA9IG9iajtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5nZXRQcm9wID0gZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudFtrZXldO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LnByb3AgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnQoJ3Byb3AnLCBrZXksIHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5jc3MgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcclxuICAgICAgICB0aGlzLl9zZXRFbGVtZW50KCdjc3MnLCBrZXksIHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5iaW5kID0gZnVuY3Rpb24oa2V5LCBmbil7XHJcbiAgICAgICAgaWYoa2V5KSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5fYm91bmQuc2V0KGtleSwgZm4pO1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ3N0b3JhZ2VfJyArIGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIGVsZW1lbnQudW5iaW5kID0gZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fYm91bmQuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdzdG9yYWdlXycgKyBrZXkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50Ll9yZWFjdCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xyXG4gICAgICAgIGxldCBmbiA9IHRoaXMuX2JvdW5kLmdldChrZXkpO1xyXG4gICAgICAgIGlmKGZuKXtcclxuICAgICAgICAgICAgaWYoZm4uY2FsbCh0aGlzLCB2YWx1ZSwgdGhpcy5fZGF0YSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kKGtleSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5vbiAgPSBmdW5jdGlvbihldmVudE5hbWUsIGZuLCB0YWcgPSAnJyl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBldmVudFRhZyA9IGV2ZW50TmFtZSArIHRhZztcclxuICAgICAgICBsZXQgZXZlbnRIYW5kbGVyID0gZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuZ2V0KGV2ZW50VGFnKTtcclxuICAgICAgICBpZihldmVudEhhbmRsZXIpe1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICBlbGVtZW50Ll9ldmVudExpc3RlbmVycy5kZWxldGUoZXZlbnRUYWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmbikge1xyXG4gICAgICAgICAgICBldmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYoZm4uY2FsbChzZWxmLCBlLCBzZWxmLl9kYXRhKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzLnNldChldmVudFRhZywgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmNvbnRlbnQgPSBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgdGhpcy5pbm5lclRleHQgPSBzdHI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQucmVtb3ZlU2VsZiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGlmKHRoaXMucmVtb3ZlKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LnJlbW92ZUFsbENoaWxkcmVuID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB3aGlsZSAodGhpcy5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuX3NldEVsZW1lbnQgPSBmdW5jdGlvbih0eXBlLCBrZXkgLCB2YWx1ZSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi5vYmplY3Rmb3JFYWNoKGtleSAsZnVuY3Rpb24gKGl0ZW0sIGtleSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZlt0eXBlXShrZXksIGl0ZW0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2ID0gY29tbW9uLnJlYWRWYWx1ZSh2YWx1ZSk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdwcm9wJzpcclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9ICB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhdHRyJzpcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShrZXkpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnY3NzJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVba2V5XSA9ICB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LmlzSW5WaWV3cG9ydCA9IGZ1bmN0aW9uIChvcHRpb25zID0ge30pIHtcclxuICAgICAgICBsZXQgb2Zmc2V0WCA9IG9wdGlvbnMub2Zmc2V0WCB8fCAwO1xyXG4gICAgICAgIGxldCBvZmZzZXRZID0gb3B0aW9ucy5vZmZzZXRZIHx8IDA7XHJcbiAgICAgICAgbGV0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7IC8vSUUgbm90IHN1cHBvcnQgYm90dG9tIHJpZ2h0XHJcbiAgICAgICAgbGV0IHgyID0geCArIHdpZHRoO1xyXG4gICAgICAgIGxldCB5MiA9IHkgKyBoZWlnaHQ7XHJcbiAgICAgICAgbGV0IGlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBsZXQgaW5uZXJIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuICEoeDIgPD0gKDAgKyBvZmZzZXRYKXx8IHggPj0gKGlubmVyV2lkdGggLSBvZmZzZXRYKSB8fCB5MiA8PSAoMCArIG9mZnNldFkpIHx8IHkgPj0gKGlubmVySGVpZ2h0IC0gb2Zmc2V0WSkpXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkb207IiwiaW1wb3J0IGNvbW1vbiBmcm9tICcuLi9jb21tb24vY29tbW9uJztcclxuXHJcbnZhciBzdG9yYWdlID0ge1xyXG4gICAgZGF0YU1hcDogbmV3IE1hcCgpLFxyXG4gICAgdGltZXJNYXA6ICBuZXcgTWFwKCksXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZGF0YU1hcCA9IHRoaXMuZGF0YU1hcDtcclxuICAgICAgICBsZXQge3Jlc2V0fSA9IG9wdGlvbnM7XHJcbiAgICAgICAgbGV0IHNob3VsZFJlYWN0ID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG9sZFZhbHVlID0gZGF0YU1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZihjb21tb24uaXNPYmplY3QodmFsdWUpICYmIGNvbW1vbi5pc09iamVjdChvbGRWYWx1ZSkgJiYgcmVzZXQgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgY29tbW9uLm9iamVjdGZvckVhY2godmFsdWUsIGZ1bmN0aW9uIChpdGVtLCBrZXksIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkUmVhY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZVtrZXldXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgc2hvdWxkUmVhY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBkYXRhTWFwLnNldChrZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IGRhdGFNYXAuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIGlmKHNob3VsZFJlYWN0KSB7XHJcbiAgICAgICAgICAgdGhpcy5icm9hZGNhc3Qoa2V5LCBuZXdWYWx1ZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICB9LFxyXG4gICAgYnJvYWRjYXN0OiBmdW5jdGlvbihrZXksIG5ld1ZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgdGltZXIgPSB0aGlzLnRpbWVyTWFwLmdldChrZXkpO1xyXG5cclxuICAgICAgICBpZiAodGltZXIpIHtcclxuICAgICAgICAgICAgY2MuY2FuY2VsVGltZXIodGltZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGltZXIgPSBjYy5zZXRUaW1lcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBkb21zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3RvcmFnZV8nICsga2V5KSB8fCBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb21zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG9tID0gZG9tc1tpXTtcclxuICAgICAgICAgICAgICAgIGRvbS5fcmVhY3QgJiYgZG9tLl9yZWFjdChrZXksIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnRpbWVyTWFwLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIH0sIG9wdGlvbnMuaW1tZWRpYXRlbHk/IDA6IDEwKTtcclxuXHJcbiAgICAgICAgdGhpcy50aW1lck1hcC5zZXQoa2V5LCB0aW1lcik7XHJcbiAgICB9LFxyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhTWFwLmdldChrZXkpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3RvcmFnZTsiLCJjb25zdCB4aHIgPSB7XHJcbiAgICBhamF4OiBmdW5jdGlvbiAocGFyYW1zID0ge30pIHtcclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgbGV0IHt1cmwsIG1ldGhvZCwgZGF0YSwgYXN5bmMsIHhociwgY29udGVudFR5cGUsIGRhdGFUeXBlLCBkb25lLCBmYWlsfSA9IHBhcmFtcyB8fCB7fTtcclxuICAgICAgICAgICAgbGV0IHtoZWFkZXIsIG9uUHJvZ3Jlc3MsIGJlZm9yZVNlbmR9ID0gcGFyYW1zO1xyXG4gICAgICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICByZXF1ZXN0Lm9wZW4oKG1ldGhvZCB8fCAnR0VUJyksIHVybCwgYXN5bmMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhc3luYyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gKGhlYWRlciB8fCB7fSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoaGVhZGVyIHx8IHt9KS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNjLmdldFZhbHVlKCdBdXRob3JpemF0aW9uJykpe1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgY2MuZ2V0VmFsdWUoJ0F1dGhvcml6YXRpb24nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9uZSAmJiBkb25lKHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCksIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhaWwgJiYgZmFpbChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmYWlsICYmIGZhaWwocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0LnVwbG9hZC5vbnByb2dyZXNzID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwID0gTWF0aC5mbG9vcihlLmxvYWRlZCAvIGUudG90YWwgKiAxMDApO1xyXG4gICAgICAgICAgICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKHAsIGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IF9kYXRhO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGFUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdmaWxlJzpcclxuICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdqc29uJzpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSA9PT0gdW5kZWZpbmVkID8gXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIgOiBjb250ZW50VHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmVmb3JlU2VuZCAmJiBiZWZvcmVTZW5kKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdC5zZW5kKF9kYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZnVuY3Rpb24gcGFyc2VEYXRhKGRhdGEpIHtcclxuICAgIHRyeXtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhIHx8ICcnKVxyXG4gICAgfWNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB4aHI7XHJcbiIsImltcG9ydCBjYyBmcm9tICcuL2NjanMvY2MnO1xyXG5pbXBvcnQgYW5hbHlzZXIgZnJvbSAnLi9hbmFseXNlcic7XHJcbmNvbnN0IFdISVRFID0gJ3JnYmEoMjU1LDI1NSwyNTUsIDAuNyknO1xyXG5jb25zdCBCTEFDSyA9ICdyZ2JhKDAsMCwwLCAwLjkpJztcclxuY29uc3QgUkVEID0gJyNkNjMwMzEnO1xyXG5cclxuY2Muc2V0VmFsdWUoJ3ZpZXdwb3J0Jywge3dpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHR9KTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnVwZGF0ZVZhbHVlKCd2aWV3cG9ydCcsIHt3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0fSk7XHJcbn0pO1xyXG5mdW5jdGlvbiBpbmRleCgpIHtcclxuICAgIGxldCByb290ID0gY2Muc2VsZWN0KCcjYm9keScpO1xyXG4gICAgbGV0IG1haW5Db250YWluZXIgPSBjYy5jcmVhdGVFbGVtZW50KCdkaXYnLCAndGVzdCcpXHJcbiAgICAgICAgLmFkZENsYXNzKCdtYWluLWNvbnRhaW5lcicpO1xyXG5cclxuICAgIHJvb3QuYXBwZW5kQ2hpbGQobWFpbkNvbnRhaW5lcik7XHJcbiAgICBsZXQgY29udGFpbmVyID0gbWFpbkNvbnRhaW5lci5hZGQoJ2RpdicpXHJcblxyXG4gICAgbGV0IGhlYWRlciA9IGNvbnRhaW5lci5hZGQoJ2RpdicsICdoZWFkZXInKVxyXG4gICAgICAgIC5hZGRDbGFzcygnaGVhZGVyJyk7XHJcbiAgICBsZXQgaGVhZGVyTGVmdCA9IGhlYWRlci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICBtaW5XaWR0aDogJzI1NnB4J1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGxvZ28gPSBoZWFkZXJMZWZ0LmFkZCgnZGl2JylcclxuICAgICAgICAuY29udGVudCgnQScpXHJcbiAgICAgICAgLmFkZENsYXNzKCdiYWNrZ3JvdW5kLXJlZCcpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmb250LWJsYWNrJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICc2NHB4JyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzAgMTZweCcsXHJcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICc1NHB4JyxcclxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICc0cHgnLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiBSRUQgKyAnIDAgMCAxMHB4JyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgbmFtZUNvbnRhaW5lciA9IGhlYWRlckxlZnQuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgbmFtZUNvbnRhaW5lci5hZGQoJ3NwYW4nKVxyXG4gICAgICAgIC5jb250ZW50KCdOWElOIFlBTkcnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxyXG4gICAgICAgIH0pO1xyXG4gICAgbmFtZUNvbnRhaW5lci5hZGQoJ3NwYW4nKVxyXG4gICAgICAgIC5jb250ZW50KCdGcm9udC1FbmQgRGV2ZWxvcGVyJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IG1lbnUgPSBoZWFkZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgbWVudUxpc3QgPSBbJ2ZhLWxpbmtlZGluJywgJ2ZhLWdpdGh1YiddO1xyXG4gICAgbGV0IGxpbmtzID0gWydodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vYW54aW4teWFuZy03MDcwMjkxMjUvJywgJ2h0dHBzOi8vZ2l0aHViLmNvbS9BbnhpbllhbmcnXTtcclxuICAgIGxldCBob3ZlckNvbG9ycyA9IFsnIzAwNzdCNScsICdyZ2JhKDI1NSwwLDgwLCAwLjgpJ107XHJcbiAgICBtZW51TGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh0YWcsIGlkeCkge1xyXG4gICAgICAgIG1lbnUuYWRkKCdpJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYWInKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MobWVudUxpc3RbaWR4XSlcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICc1NHB4JyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgICAgICAgICAgdGV4dFNoYWRvdzogJyAwIDAgNXB4JyxcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICcwLjNzJyxcclxuICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnMTZweCdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKGxpbmtzW2lkeF0sICdfYmxhbmsnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IGhvdmVyQ29sb3JzW2lkeF0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LCAnc3R5bGUnKVxyXG4gICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcnLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSwgJ3N0eWxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgbWFpbkNvbnRlbnRDb250YWluZXIgPSBjYy5jcmVhdGVFbGVtZW50KCdkaXYnLCAnbWFpbl9jb250ZW50JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAnY2FsYygxMDB2aCAtIDEwNHB4KScsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwIDEyLjUlJyxcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcclxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgIHpJbmRleDogNSxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMjtcclxuICAgICAgICAgICAgbGV0IGNlbnRlclkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBsZXQgbW91c2VYID0gZS5jbGllbnRYO1xyXG4gICAgICAgICAgICBsZXQgbW91c2VZID0gZS5jbGllbnRZO1xyXG4gICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoJyArICgtKG1vdXNlWCAtIGNlbnRlclgpIC8gMTAwKSArICdweCwnICsgKC0obW91c2VZIC0gY2VudGVyWSkgLyAxMDApICsgJ3B4KSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYmluZCgnZnJhbWUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBkb21zID0gY2Muc2VsZWN0KCcuZmFkZScpO1xyXG4gICAgICAgICAgICBpZihkb21zLmxlbmd0aD09PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmQoJ2ZyYW1lJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkb20gPSBkb21zW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzSW5WaWV3UG9ydCA9IGRvbS5pc0luVmlld3BvcnQoe29mZnNldFk6IDE1MH0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wYWNpdHkgPSArZG9tLnN0eWxlLm9wYWNpdHk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNJblZpZXdQb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLmFkZENsYXNzKCdzbGlkZS1pbi1ib3R0b20nKTtcclxuICAgICAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoJ2ZhZGUtb3V0Jyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLnJlbW92ZUNsYXNzKCdzbGlkZS1pbi1ib3R0b20nKTtcclxuICAgICAgICAgICAgICAgICAgICBkb20uYWRkQ2xhc3MoJ2ZhZGUtb3V0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIGxldCBsYW5kaW5nQ29udGFpbmVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBoZWlnaHQ6ICdjYWxjKDEwMHZoIC0gMTA0cHgpJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGhpZ2hMaWdodCA9IGxhbmRpbmdDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jb250ZW50KFwiTGV0J3MgbWFrZSBkYXRhIGFsaXZlXCIpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmYWRlJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnNDhweCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJ2NhbGMoNTB2aCAtIDE1MnB4KSdcclxuICAgICAgICB9KTtcclxuICAgIGxldCBpbnRybyA9IGxhbmRpbmdDb250YWluZXIuYWRkKCdwJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2ZhZGUnKVxyXG4gICAgICAgIC5jb250ZW50KFwiSSdtIGEgZnJvbnQtZW5kIGRldmVsb3BlciBmcm9tIEJheSBBcmVhLCBDYWxpZm9ybmlhLCBhbmQgY3VycmVudGx5IGxpdmluZyBpbiBTYW4gSm9zZS4gSSBlbmpveSBidWlsZGluZyByaWNoIFwiICtcclxuICAgICAgICAgICAgXCJpbnRlcmFjdGl2ZSB3ZWJzaXRlcyBhbmQgd2ViIGFwcHMgZnJvbSBzbWFsbCB0byBsYXJnZS4gXCIpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjBweCcsXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgcGxheWVyID0gbGFuZGluZ0NvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICc2NHB4JyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLmFkZCgnaScpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmYXInKVxyXG4gICAgICAgIC5hZGRDbGFzcygnZmEtcGxheS1jaXJjbGUnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAncmdiYSgyNTUsMCw4MCwgMC44KSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHBsYXllcldhcm4uY3NzKHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICcnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJydcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHBsYXllcldhcm4uY3NzKHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmKGNjLmdldFZhbHVlKCdwbGF5Jykpe1xyXG4gICAgICAgICAgICAgICAgY2Muc2V0VmFsdWUoJ3BsYXknLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdmYS1wYXVzZS1jaXJjbGUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2ZhLXBsYXktY2lyY2xlJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY2Muc2V0VmFsdWUoJ3BsYXknLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2ZhLXBhdXNlLWNpcmNsZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnZmEtcGxheS1jaXJjbGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IHBsYXllcldhcm4gPSBsYW5kaW5nQ29udGFpbmVyLmFkZCgncCcpXHJcbiAgICAgICAgLmNvbnRlbnQoJ1dhdGNoIHlvdSB2b2x1bWUgOiknKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICB0ZXh0QWxpZ246J2NlbnRlcicsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJyxcclxuICAgICAgICAgICAgY29sb3I6J3JnYmEoMjU1LDAsODAsIDAuOCknXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IHNraWxsQ29udGFpbmVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdkaXYnKTtcclxuICAgIGxldCBza2lsbFRpdGxlID0gc2tpbGxDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jb250ZW50KFwiU2tpbGxzXCIpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzQ4cHgnLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICcyNTZweCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgc2tpbGxDYXJkQ29udGFpbmVyID0gc2tpbGxDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzEyOHB4JyxcclxuICAgICAgICAgICAgZmxleFdyYXA6ICd3cmFwJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBza2lsbHMgPSBbJ2ZhLWh0bWw1JywgJ2ZhLWpzJywgJ2ZhLWNzczMtYWx0JywgJ2ZhLXJlYWN0JywgJ2ZhLW5vZGUtanMnLCdmYS1zYXNzJ107XHJcbiAgICBsZXQgc2tpbGxOYW1lcyA9IFsnSFRNTDUnLCAnSmF2YXNjcmlwdCcsICdDU1MzJywgJ1JlYWN0JywgJ05vZGVKUycsICdTQVNTJ107XHJcbiAgICBsZXQgc2tpbGxDb2xvcnMgPSBbJyNlNDRkMjYnLCAnI2VlYWY0YicsICcjMDA3MGJhJywgJyM2MWRhZmInLCAnIzdjYjcwMCcsJyNjNjknXTtcclxuICAgIHNraWxscy5mb3JFYWNoKGZ1bmN0aW9uIChpY29uLCBpZHgpIHtcclxuICAgICAgICBsZXQgY2FyZCA9IHNraWxsQ2FyZENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgbWluV2lkdGg6ICczMDBweCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgZmxleEdyb3c6IDEsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBsb2dvID0gY2FyZC5hZGQoJ2knKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhYicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhpY29uKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMjU2cHgnLFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBza2lsbENvbG9yc1tpZHhdLFxyXG4gICAgICAgICAgICAgICAgdGV4dFNoYWRvdzogc2tpbGxDb2xvcnNbaWR4XSArICcgMCAwIDEwcHgnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBuYW1lID0gY2FyZC5hZGQoJ3AnKVxyXG4gICAgICAgICAgICAuY29udGVudChza2lsbE5hbWVzW2lkeF0pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogc2tpbGxDb2xvcnNbaWR4XSxcclxuICAgICAgICAgICAgICAgIHRleHRTaGFkb3c6IHNraWxsQ29sb3JzW2lkeF0gKyAnIDAgMCAxMHB4J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGNhcmVlckNvbnRhaW5lciA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgnZGl2Jyk7XHJcbiAgICBsZXQgY2FyZWVyVGl0bGUgPSBza2lsbENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNvbnRlbnQoXCJDYXJlZXJcIilcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnNDhweCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzEyOHB4JyxcclxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnNjRweCcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IGNvbXBhbmllcyA9IFsnbmV0RWxhc3RpYyBTeXN0ZW1zLCBJbmMuJywgJ1NhbiBGcmFuY2lzY28gU3RhdGUgVW5pdmVyc2l0eScsICdTaGFuZ2hhaSBVbml2ZXJzaXR5J107XHJcbiAgICBsZXQgdGl0bGVzID0gWydTb2Z0d2FyZSBFbmdpbmVlcicsICdCUyAtIENvbXB1dGVyIEVuZ2luZWVyaW5nIFN0dWRlbnQnLCAnQVMgLSBDb21wdXRlciBBcHBsaWNhdGlvbiBUZWNobm9sb2d5IFN0dWRlbnQnXTtcclxuICAgIGxldCB0aW1lTGluZXMgPSBbJzIwMTcgLSBDdXJyZW50JywgJzIwMTMgLSAyMDE3JywgJzIwMDkgLSAyMDEzJ107XHJcbiAgICBsZXQgcHJvamVjdHMgPSB7XHJcbiAgICAgICAgJ25ldEVsYXN0aWMgU3lzdGVtcywgSW5jLic6IFsndkJORyBNYW5hZ2VtZW50IFN5c3RlbSAoVUkgTGVhZCknLCAnU0QtV0FOIE1hbmFnZW1lbnQgU3lzdGVtIChVSSBUZWFtIE1lbWJlciknLF1cclxuICAgIH07XHJcblxyXG4gICAgY29tcGFuaWVzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBhbnlOYW1lLCBpZHgpIHtcclxuICAgICAgICBsZXQgY2FyZCA9IGNhcmVlckNvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzY0cHgnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBjb21wYW55ID0gY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5jb250ZW50KGNvbXBhbnlOYW1lKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCdcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBmb250U2l6ZSA9ICcyMHB4JztcclxuICAgICAgICBsZXQgdGl0bGUgPSBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmNvbnRlbnQodGl0bGVzW2lkeF0pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHRpbWVMaW5lID0gY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5jb250ZW50KHRpbWVMaW5lc1tpZHhdKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgKHByb2plY3RzW2NvbXBhbnlOYW1lXSB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAocHJvamVjdCkge1xyXG4gICAgICAgICAgICBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgICAgIC5jb250ZW50KHByb2plY3QpXHJcbiAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgZm9vdGVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdwJylcclxuICAgICAgICAuY29udGVudCgnUG93ZXJlZCBieSBjY0pTLCBhIHNlbGYtaW1wbGVtZW50ZWQgSmF2YXNjcmlwdCBMaWJyYXJ5LicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzEyOHB4J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBmb290U2hhZG93ID0gY29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgIGJvdHRvbTogJy0zcHgnLFxyXG4gICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICB6SW5kZXg6IDEwLFxyXG4gICAgICAgICAgICBwb2ludGVyRXZlbnRzOiAgICdub25lJ1xyXG4gICAgICAgICAgICAvL2JveFNoYWRvdzogJ3JnYmEoMjU1LCAwLCA4MCwgMC44KSAwcHggMHB4IDUwcHggMnB4J1xyXG4gICAgICAgIH0pO1xyXG4gICAgYW5hbHlzZXIoZm9vdFNoYWRvdyk7XHJcbiAgICBsZXQgY29kZUJhY2tncm91bmRUZXh0ID0gaW5kZXgudG9TdHJpbmcoKTtcclxuICAgIGxldCBjb2x1bW5XaWR0aCA9IE1hdGgubWluKDQwMCAsIHdpbmRvdy5pbm5lcldpZHRoIC0gMTI4KTtcclxuICAgIGxldCBjb2x1bW5Db3VudCA9IE1hdGgubWluKDIsIE1hdGguZmxvb3Iod2luZG93LmlubmVyV2lkdGgvKGNvbHVtbldpZHRoKSkpO1xyXG4gICAgbGV0IGNvZGVCYWNrZ3JvdW5kID0gY29udGFpbmVyLmFkZCgncHJlJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2NydFRleHQnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgdG9wOiAnMTI4cHgnLFxyXG4gICAgICAgICAgICBsZWZ0OiAnNjRweCcsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICBjb2xvcjogJ3JnYmEoMjU1LDI1NSwyNTUsIDAuMDYpJyxcclxuICAgICAgICAgICAgekluZGV4OiAwLFxyXG4gICAgICAgICAgICBjb2x1bW5Db3VudDogY29sdW1uQ291bnQsXHJcbiAgICAgICAgICAgIGNvbHVtbldpZHRoOiBjb2x1bW5XaWR0aCArICdweCcsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnY2FsYygxMDB2dyAtIDEyOHB4KScsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuM1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm1lbW9yeSh7XHJcbiAgICAgICAgICAgIGNvdW50ZXI6IDAsXHJcbiAgICAgICAgICAgIGlzUHJpbnRpbmc6IHRydWUsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoJyArICgtbWFpbkNvbnRlbnRDb250YWluZXIuc2Nyb2xsVG9wLzYpICsgJ3B4KSdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwcmludENvZGU6ICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWVtID0gdGhpcy5nZXRNZW1vcnkoKTtcclxuICAgICAgICAgICAgICAgIG1lbS5jb3VudGVyKz00O1xyXG4gICAgICAgICAgICAgICAgaWYobWVtLmNvdW50ZXIgPj0gY29kZUJhY2tncm91bmRUZXh0Lmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb3VudGVyID0gY29kZUJhY2tncm91bmRUZXh0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVtLmlzUHJpbnRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gY29kZUJhY2tncm91bmRUZXh0LnN1YnN0cmluZygwLG1lbS5jb3VudGVyKSArICdfJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ2ZyYW1lJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQge3RyYW5zZm9ybSwgcHJpbnRDb2RlLCBpc1ByaW50aW5nfSA9IHRoaXMuZ2V0TWVtb3J5KCk7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybS5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICBpc1ByaW50aW5nICYmIHByaW50Q29kZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ3ZpZXdwb3J0JywgZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgbGV0IHtoZWlnaHQsIHdpZHRofSA9IGQ7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5XaWR0aCA9IE1hdGgubWluKDQwMCAsIHdpZHRoIC0gMTI4KTtcclxuICAgICAgICAgICAgbGV0IGNvbHVtbkNvdW50ID0gTWF0aC5taW4oMiwgTWF0aC5mbG9vcih3aWR0aC8oY29sdW1uV2lkdGgpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkNvdW50OiBjb2x1bW5Db3VudCxcclxuICAgICAgICAgICAgICAgIGNvbHVtbldpZHRoOiBjb2x1bW5XaWR0aCArICdweCcsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIG1haW5Db250YWluZXIuYWRkRWxlbWVudChjb250YWluZXIpO1xyXG4gICAgY29udGFpbmVyLmFkZEVsZW1lbnQoaGVhZGVyKTtcclxuICAgIGNvbnRhaW5lci5hZGRFbGVtZW50KG1haW5Db250ZW50Q29udGFpbmVyKTtcclxufVxyXG5pbmRleCgpOyJdLCJzb3VyY2VSb290IjoiIn0=