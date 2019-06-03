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
        bars = canvas.width / 3;
        bar_width = canvas.width / bars;
        for (var i = 0; i < bars; i++) {
            bar_x = i * bar_width;
            //bar_x2 = (canvas.width) - i * bar_width;
            bar_height = -(fbc_array[i] * canvas.height / 255);
            ctx.fillStyle = gradient;
            ctx.fillRect(bar_x, canvas.height, bar_width, bar_height < -70 ? bar_height : bar_height * 0.9);
            //ctx.fillRect(bar_x2, canvas.height, bar_width, bar_height<-70?bar_height: bar_height*0.9);
            if (bar_height < -70) {
                var gradientHit = ctx.createLinearGradient(bar_x - 10, 0, bar_x + 10, 0);
                gradientHit.addColorStop(0, "rgba(255,0,80,0)");
                gradientHit.addColorStop(0.25, "rgba(255,0,80,0)");
                gradientHit.addColorStop(0.5, "rgba(255,0,80,0.8)");
                gradientHit.addColorStop(0.75, "rgba(255,0,80,0)");
                gradientHit.addColorStop(1, "rgba(255,0,80,0)");
                ctx.fillStyle = gradientHit;
                ctx.fillRect(bar_x - 10, 1, 20, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuYWx5c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2NjLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2NvbW1vbi9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY29tbW9uL3JhZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy9kb20vZG9tLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy94aHIveGhyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjYW52YXMiLCJjdHgiLCJzb3VyY2UiLCJjb250ZXh0IiwiYW5hbHlzZXIiLCJmYmNfYXJyYXkiLCJiYXJzIiwiYmFyX3giLCJiYXJfeDIiLCJiYXJfd2lkdGgiLCJiYXJfaGVpZ2h0IiwiaXNJbml0IiwiaGVpZ2h0Iiwid2lkdGgiLCJDb250YWluZXIiLCJwb2ludGVyRXZlbnRzIiwiYXVkaW8iLCJncmFkaWVudCIsImNjIiwiZnJhbWVMb29wZXIiLCJ3aW5kb3ciLCJpIiwiZ3JhZGllbnRIaXQiLCJJU19XT1JLRVIiLCJzZWxmIiwiQ09OVEVYVCIsInV0aWxzIiwiY29tbW9uIiwibG9hZCIsImFkZE9ucyIsIm9wdGlvbnMiLCJzZWxlY3QiLCJkb20iLCJjcmVhdGVFbGVtZW50IiwiY3JlYXRlRWxlbWVudE5TIiwic2V0VmFsdWUiLCJzdG9yYWdlIiwic2F2ZUFycmF5IiwiYXJyIiwiaWRrZXkiLCJrZXkiLCJpdGVtIiwidXBkYXRlVmFsdWUiLCJnZXRWYWx1ZSIsInNldFRpbWVyIiwicmFmIiwiY2FuY2VsVGltZXIiLCJyZXF1ZXN0IiwicGFyYW1zIiwieGhyIiwibGFzdCIsImZyYW1lVGlja2VyIiwiaW1tZWRpYXRlbHkiLCJvYmoiLCJmbiIsInRhcmdldCIsIk1hdGgiLCJzNCIsIk9iamVjdCIsImlzSUUiLCJpc0Nocm9tZSIsImlzT3BlcmEiLCJvcHIiLCJuYXZpZ2F0b3IiLCJwIiwic2FmYXJpIiwiZG9jdW1lbnQiLCJvdXRwdXQiLCJhcmd1bWVudHMiLCJFbGVtZW50IiwidmFsdWUiLCJ2YXJzIiwicGFydHMiLCJyZXF1ZXN0VGltZW91dCIsInNldFRpbWVvdXQiLCJzdGFydCIsIkRhdGUiLCJoYW5kbGUiLCJjbGVhclJlcXVlc3RUaW1lb3V0IiwiY2xlYXJUaW1lb3V0Iiwic2VsZWN0b3IiLCJfc2VsZWN0b3IiLCJuYW1lIiwiZG9tcyIsImlkIiwiZWxlbWVudCIsImVsZW1lbnRJZCIsInRhZyIsInNldHVwRWxlbWVudE1ldGhvZHMiLCJjaGlsZCIsImV2ZW50VGFnIiwiZXZlbnROYW1lIiwiZXZlbnRIYW5kbGVyIiwidiIsIm9mZnNldFgiLCJvZmZzZXRZIiwieDIiLCJ4IiwieTIiLCJ5IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiZGF0YU1hcCIsInRpbWVyTWFwIiwic2hvdWxkUmVhY3QiLCJvbGRWYWx1ZSIsInJlc2V0IiwibmV3VmFsdWUiLCJicm9hZGNhc3QiLCJ0aW1lciIsImFqYXgiLCJwcm9taXNlIiwibWV0aG9kIiwiYXN5bmMiLCJoZWFkZXIiLCJkb25lIiwicGFyc2VEYXRhIiwicmVzb2x2ZSIsImZhaWwiLCJyZWplY3QiLCJlIiwib25Qcm9ncmVzcyIsIl9kYXRhIiwiY29udGVudFR5cGUiLCJKU09OIiwiYmVmb3JlU2VuZCIsImRhdGEiLCJXSElURSIsIkJMQUNLIiwiUkVEIiwicm9vdCIsIm1haW5Db250YWluZXIiLCJjb250YWluZXIiLCJoZWFkZXJMZWZ0IiwiZGlzcGxheSIsIm1pbldpZHRoIiwibG9nbyIsImZvbnRTaXplIiwicGFkZGluZyIsImxpbmVIZWlnaHQiLCJtYXJnaW5SaWdodCIsImJveFNoYWRvdyIsIm5hbWVDb250YWluZXIiLCJtZW51IiwibWVudUxpc3QiLCJsaW5rcyIsImhvdmVyQ29sb3JzIiwiY3Vyc29yIiwidGV4dEFsaWduIiwidGV4dFNoYWRvdyIsInRyYW5zaXRpb24iLCJjb2xvciIsIm1haW5Db250ZW50Q29udGFpbmVyIiwib3ZlcmZsb3dZIiwicG9zaXRpb24iLCJ6SW5kZXgiLCJmbGV4RGlyZWN0aW9uIiwiY2VudGVyWCIsImNlbnRlclkiLCJtb3VzZVgiLCJtb3VzZVkiLCJ0cmFuc2Zvcm0iLCJpc0luVmlld1BvcnQiLCJvcGFjaXR5IiwibGFuZGluZ0NvbnRhaW5lciIsImhpZ2hMaWdodCIsImZvbnRXZWlnaHQiLCJtYXJnaW5Ub3AiLCJpbnRybyIsInBsYXllciIsInBsYXllcldhcm4iLCJza2lsbENvbnRhaW5lciIsInNraWxsVGl0bGUiLCJza2lsbENhcmRDb250YWluZXIiLCJqdXN0aWZ5Q29udGVudCIsImZsZXhXcmFwIiwic2tpbGxzIiwic2tpbGxOYW1lcyIsInNraWxsQ29sb3JzIiwiY2FyZCIsImZsZXhHcm93IiwiY2FyZWVyQ29udGFpbmVyIiwiY2FyZWVyVGl0bGUiLCJtYXJnaW5Cb3R0b20iLCJjb21wYW5pZXMiLCJ0aXRsZXMiLCJ0aW1lTGluZXMiLCJwcm9qZWN0cyIsImNvbXBhbnkiLCJ0aXRsZSIsInRpbWVMaW5lIiwiZm9vdGVyIiwiZm9vdFNoYWRvdyIsImJvdHRvbSIsImxlZnQiLCJjb2RlQmFja2dyb3VuZFRleHQiLCJpbmRleCIsImNvbHVtbldpZHRoIiwiY29sdW1uQ291bnQiLCJjb2RlQmFja2dyb3VuZCIsInRvcCIsImNvdW50ZXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNB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aUIsNkNBRVo7QUFDRG5ELG1CQURDO0FBRURvRCxhQUZDO0FBR0ROLGNBSEM7QUFJRHhDLGtCQUpDO0FBS0RILGVBTEM7QUFNREksZ0JBTkM7QUFPRDJDLHFCQVBDO0FBUURELHFCQUFhQSxjQVJaO0FBU0R4TCxlQVRDO0FBVURzSixpQkFBUztBQVZSLEtBRlksT0FjWDtBQUNGc0MsaUJBQVM7QUFEUCxLQWRXLGdCQWlCRixZQUFZO0FBQUEsdUJBQ0YsS0FERSxPQUNGLEVBREU7QUFBQTtBQUFBOztBQUV2QixpQkFBUztBQUNMeEMsdUJBQVcsZ0JBQWlCLENBQUNULHFCQUFELFlBQWpCLElBQXNEO0FBRDVELFNBQVQ7QUFHQWlEO0FBQ0EsWUFBR0EsV0FBV04sbUJBQWQsUUFBd0M7QUFDcEM7QUFDQTtBQUZKLGVBR0s7QUFDRCw2QkFBaUJBLDJDQUFqQjtBQUNIO0FBQ0Qsa0JBQVUsRUFBQ00sU0FBWCxPQUFVLEVBQVY7QUE3QmEsd0JBK0JDLGFBQWE7QUFBQTtBQUFBOztBQUUzQixZQUFJSixjQUFjN0ksY0FBZTNDLFFBQWpDLEdBQWtCMkMsQ0FBbEI7QUFDQSxZQUFJOEksY0FBYzlJLFlBQVlBLFdBQVczQyxRQUF6QyxXQUE4QjJDLENBQVpBLENBQWxCO0FBQ0EsaUJBQVM7QUFDTDhJLHlCQURLO0FBRUxELHlCQUFhQSxjQUFjO0FBRnRCLFNBQVQ7QUFuQ1IsS0FBcUIsQ0FBckI7O0FBMENBbEU7QUFDQUM7QUFDQUE7QUFDSDtBQUNEZ0UsUSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJmdW5jdGlvbiBhbmFseXNlcihDb250YWluZXIpIHtcclxuICAgIC8vIEVzdGFibGlzaCBhbGwgdmFyaWFibGVzIHRoYXQgeW91ciBBbmFseXNlciB3aWxsIHVzZVxyXG4gICAgbGV0IGNhbnZhcywgY3R4LCBzb3VyY2UsIGNvbnRleHQsIGFuYWx5c2VyLCBmYmNfYXJyYXksIGJhcnMsIGJhcl94LCBiYXJfeDIsYmFyX3dpZHRoLCBiYXJfaGVpZ2h0LCBpc0luaXQ7XHJcbiAgICBjYW52YXMgPSBDb250YWluZXIuYWRkKCdjYW52YXMnKVxyXG4gICAgICAgIC5hdHRyKHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiBDb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDBweCcsXHJcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICAgJ25vbmUnLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ3BsYXknLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICBpZihkKXtcclxuICAgICAgICAgICAgICAgIGlzSW5pdCA9IGlzSW5pdD90cnVlOmluaXRNcDNQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXVkaW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ3ZpZXdwb3J0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmF0dHIoe1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IENvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICBsZXQgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgMTAwKTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcInJnYmEoMjU1LDAsODAsMC4xKVwiKTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBcInJnYmEoMjU1LDAsODAsMC41KVwiKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgYW4gYXVkaW8gb2JqZWN0IGFuZCBhZGp1c3Qgc29tZSBvZiBpdHMgcHJvcGVydGllc1xyXG4gICAgbGV0IGF1ZGlvID0gbmV3IEF1ZGlvKCk7XHJcbiAgICBhdWRpby5zcmMgPSBgLi9yZXMvJHtjYy51dGlscy5nZXRVcmxWYXIoJ211c2ljJywgJ0JvaGVtaWFuIFJoYXBzb2R5Jyl9LiR7Y2MudXRpbHMuZ2V0VXJsVmFyKCdmb3JtYXQnLCAnYWFjJyl9YDtcclxuICAgIGF1ZGlvLmNvbnRyb2xzID0gdHJ1ZTtcclxuICAgIGF1ZGlvLmxvb3AgPSB0cnVlO1xyXG4gICAgYXVkaW8uYXV0b3BsYXkgPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0TXAzUGxheWVyKCkge1xyXG4gICAgICAgIC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1ZGlvX2JveCcpLmFwcGVuZENoaWxkKGF1ZGlvKTtcclxuICAgICAgICBjb250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpOyAvLyBBdWRpb0NvbnRleHQgb2JqZWN0IGluc3RhbmNlXHJcbiAgICAgICAgYW5hbHlzZXIgPSBjb250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7IC8vIEFuYWx5c2VyTm9kZSBtZXRob2RcclxuICAgICAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAvLyBSZS1yb3V0ZSBhdWRpbyBwbGF5YmFjayBpbnRvIHRoZSBwcm9jZXNzaW5nIGdyYXBoIG9mIHRoZSBBdWRpb0NvbnRleHRcclxuICAgICAgICBzb3VyY2UgPSBjb250ZXh0LmNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZShhdWRpbyk7XHJcbiAgICAgICAgc291cmNlLmNvbm5lY3QoYW5hbHlzZXIpO1xyXG4gICAgICAgIGFuYWx5c2VyLmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICAgICAgZnJhbWVMb29wZXIoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmcmFtZUxvb3BlcigpIHtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZyYW1lTG9vcGVyKTtcclxuICAgICAgICBmYmNfYXJyYXkgPSBuZXcgVWludDhBcnJheShhbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudCk7XHJcbiAgICAgICAgYW5hbHlzZXIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEoZmJjX2FycmF5KTtcclxuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7IC8vIENsZWFyIHRoZSBjYW52YXNcclxuICAgICAgICBiYXJzID0gY2FudmFzLndpZHRoLzM7XHJcbiAgICAgICAgYmFyX3dpZHRoID0gY2FudmFzLndpZHRoIC8gKGJhcnMpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmFyczsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJhcl94ID0gaSAqIGJhcl93aWR0aDtcclxuICAgICAgICAgICAgLy9iYXJfeDIgPSAoY2FudmFzLndpZHRoKSAtIGkgKiBiYXJfd2lkdGg7XHJcbiAgICAgICAgICAgIGJhcl9oZWlnaHQgPSAtKGZiY19hcnJheVtpXSpjYW52YXMuaGVpZ2h0LzI1NSk7XHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudDtcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGJhcl94LCBjYW52YXMuaGVpZ2h0LCBiYXJfd2lkdGgsIGJhcl9oZWlnaHQ8LTcwP2Jhcl9oZWlnaHQ6IGJhcl9oZWlnaHQqMC45KTtcclxuICAgICAgICAgICAgLy9jdHguZmlsbFJlY3QoYmFyX3gyLCBjYW52YXMuaGVpZ2h0LCBiYXJfd2lkdGgsIGJhcl9oZWlnaHQ8LTcwP2Jhcl9oZWlnaHQ6IGJhcl9oZWlnaHQqMC45KTtcclxuICAgICAgICAgICAgaWYoYmFyX2hlaWdodDwtNzApe1xyXG4gICAgICAgICAgICAgICAgbGV0IGdyYWRpZW50SGl0ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KGJhcl94LTEwLCAwLCBiYXJfeCsxMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBncmFkaWVudEhpdC5hZGRDb2xvclN0b3AoMCwgXCJyZ2JhKDI1NSwwLDgwLDApXCIpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRIaXQuYWRkQ29sb3JTdG9wKDAuMjUsIFwicmdiYSgyNTUsMCw4MCwwKVwiKTtcclxuICAgICAgICAgICAgICAgIGdyYWRpZW50SGl0LmFkZENvbG9yU3RvcCgwLjUsIFwicmdiYSgyNTUsMCw4MCwwLjgpXCIpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRIaXQuYWRkQ29sb3JTdG9wKDAuNzUsIFwicmdiYSgyNTUsMCw4MCwwKVwiKTtcclxuICAgICAgICAgICAgICAgIGdyYWRpZW50SGl0LmFkZENvbG9yU3RvcCgxLCBcInJnYmEoMjU1LDAsODAsMClcIik7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnRIaXQ7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoYmFyX3gtMTAsIDEsIDIwLCAxKTtcclxuICAgICAgICAgICAgICAgLy8gIGxldCBncmFkaWVudEhpdDIgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoYmFyX3gyLTUsIDAsIGJhcl94Mis1LCAwKTtcclxuICAgICAgICAgICAgICAgLy8gIGdyYWRpZW50SGl0Mi5hZGRDb2xvclN0b3AoMCwgXCJyZ2JhKDI1NSwwLDgwLDApXCIpO1xyXG4gICAgICAgICAgICAgICAvLyAgZ3JhZGllbnRIaXQyLmFkZENvbG9yU3RvcCgwLjI1LCBcInJnYmEoMjU1LDAsODAsMClcIik7XHJcbiAgICAgICAgICAgICAgIC8vICBncmFkaWVudEhpdDIuYWRkQ29sb3JTdG9wKDAuNSwgXCJyZ2JhKDI1NSwwLDgwLDAuOClcIik7XHJcbiAgICAgICAgICAgICAgIC8vICBncmFkaWVudEhpdDIuYWRkQ29sb3JTdG9wKDAuNzUsIFwicmdiYSgyNTUsMCw4MCwwKVwiKTtcclxuICAgICAgICAgICAgICAgLy8gIGdyYWRpZW50SGl0Mi5hZGRDb2xvclN0b3AoMSwgXCJyZ2JhKDI1NSwwLDgwLDApXCIpO1xyXG4gICAgICAgICAgICAgICAvLyAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50SGl0MjtcclxuICAgICAgICAgICAgICAgLy8gY3R4LmZpbGxSZWN0KGJhcl94Mi01LCAxLCAxMCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFuYWx5c2VyOyIsImltcG9ydCBkb20gZnJvbSAnLi9kb20vZG9tJztcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2UnO1xyXG5pbXBvcnQgcmFmIGZyb20gJy4vY29tbW9uL3JhZic7XHJcbmltcG9ydCBjb21tb24gZnJvbSAnLi9jb21tb24vY29tbW9uJztcclxuaW1wb3J0IHhociBmcm9tICcuL3hoci94aHInO1xyXG5cclxuY29uc3QgSVNfV09SS0VSID0gc2VsZi53aW5kb3cgPT09IHVuZGVmaW5lZDtcclxuY29uc3QgQ09OVEVYVCA9IElTX1dPUktFUiA/IHNlbGYgOiB3aW5kb3c7XHJcblxyXG52YXIgY2M7XHJcbndpbmRvdy5jYyA9IGNjID0ge1xyXG4gICAgdXRpbHM6IGNvbW1vbixcclxuICAgIGxvYWQ6IGZ1bmN0aW9uKGFkZE9ucyA9IFtdLCBvcHRpb25zID0ge30pe1xyXG5cclxuICAgIH0sXHJcbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcclxuICAgICAgICByZXR1cm4gZG9tLnNlbGVjdChzZWxlY3RvcilcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbiAodGFnTmFtZSwgaWQsIG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gZG9tLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgaWQsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudE5TOiBmdW5jdGlvbiAodGFnTmFtZSwgaWQsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMuTlMgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBkb20uY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBpZCwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMucmVzZXQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlLnNldFZhbHVlKGtleSwgdmFsdWUsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgc2F2ZUFycmF5OiBmdW5jdGlvbihrZXksIGFyciA9IFtdLCBpZGtleSl7XHJcbiAgICAgICAgaWYoaWRrZXkgIT09IHVuZGVmaW5lZCAmJiBpZGtleSAhPT0gJycgJiYga2V5ICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgY2MudXBkYXRlVmFsdWUoaXRlbVtpZGtleV0sIGl0ZW0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2Muc2V0VmFsdWUoa2V5LCBhcnIpO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZVZhbHVlOiBmdW5jdGlvbihrZXksIHZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlLnNldFZhbHVlKGtleSwgdmFsdWUsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgZ2V0VmFsdWU6ICBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2UuZ2V0VmFsdWUoa2V5KTtcclxuICAgIH0sXHJcbiAgICBzZXRUaW1lcjogZnVuY3Rpb24gKGZuLCBkZWxheSkge1xyXG4gICAgICAgIHJldHVybiByYWYucmVxdWVzdFRpbWVvdXQoZm4sIGRlbGF5KVxyXG4gICAgfSxcclxuICAgIGNhbmNlbFRpbWVyOiBmdW5jdGlvbiAoaGFuZGxlKSB7XHJcbiAgICAgICAgcmFmLmNsZWFyUmVxdWVzdFRpbWVvdXQoaGFuZGxlKTtcclxuICAgIH0sXHJcbiAgICByZXF1ZXN0OiBmdW5jdGlvbiAocGFyYW1zID0ge30pIHtcclxuICAgICAgICByZXR1cm4geGhyLmFqYXgocGFyYW1zKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5pZihJU19XT1JLRVIpe1xyXG4gICAgZGVsZXRlIGNjLnNlbGVjdDtcclxuICAgIGRlbGV0ZSBjYy5jcmVhdGVFbGVtZW50O1xyXG4gICAgZGVsZXRlIGNjLmNyZWF0ZUVsZW1lbnROUztcclxufWVsc2V7XHJcbiAgICBsZXQgbGFzdCA9IDBcclxuICAgIGxldCBmcmFtZVRpY2tlciA9IGZ1bmN0aW9uICh0aW1lc3RhbXApIHtcclxuICAgICAgICBjYy5zZXRWYWx1ZSgnZnJhbWUnLCB0aW1lc3RhbXAsIHtpbW1lZGlhdGVseTogdHJ1ZX0pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGltZXN0YW1wIC0gbGFzdCk7XHJcbiAgICAgICAgbGFzdCA9IHRpbWVzdGFtcDtcclxuICAgICAgICByYWYucmVxdWVzdFRpbWVvdXQoZnJhbWVUaWNrZXIsIDE2KVxyXG4gICAgfTtcclxuICAgIGZyYW1lVGlja2VyKDApO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2M7IiwiY29uc3QgSVNfV09SS0VSID0gc2VsZi53aW5kb3cgPT09IHVuZGVmaW5lZDtcclxuY29uc3QgQ09OVEVYVCA9IElTX1dPUktFUiA/IHNlbGYgOiB3aW5kb3c7XHJcbmNvbnN0IGNvbW1vbiA9IHt9O1xyXG5cclxuY29tbW9uLm9iamVjdGZvckVhY2ggPSBmdW5jdGlvbihvYmosZm4pe1xyXG4gICAgZm9yKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIGZuKG9ialtrZXldLCBrZXksIG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29tbW9uLm9iamVjdEFzc2lnbiA9IGZ1bmN0aW9uKHRhcmdldCwgc291cmNlKXtcclxuICAgIGZvcihsZXQga2V5IGluIHNvdXJjZSkge1xyXG4gICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufTtcclxuXHJcbmNvbW1vbi5jcmVhdGVJZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBmdW5jdGlvbiBzNCgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcclxuICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxyXG4gICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xyXG59O1xyXG5cclxuY29tbW9uLmlzT2JqZWN0ID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHJldHVybiAoaXRlbSE9PXVuZGVmaW5lZCAmJiBpdGVtID09PSBPYmplY3QoaXRlbSkgJiYgIShpdGVtIGluc3RhbmNlb2YgQXJyYXkpKVxyXG59O1xyXG5cclxuY29tbW9uLmdldEJyb3dzZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCBpc0lFID0gZmFsc2U7XHJcbiAgICBsZXQgaXNDaHJvbWUgPSBmYWxzZTtcclxuICAgIGxldCBpc09wZXJhID0gZmFsc2U7XHJcbiAgICBpZiAoKCEhQ09OVEVYVC5vcHIgJiYgISFvcHIuYWRkb25zKSB8fCAhIUNPTlRFWFQub3BlcmEgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCcgT1BSLycpID49IDApIHtcclxuICAgICAgICBpc09wZXJhID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gJ29wZXJhJztcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgSW5zdGFsbFRyaWdnZXIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuICdmaXJlZm94JztcclxuICAgIH1cclxuICAgIGlmICgvY29uc3RydWN0b3IvaS50ZXN0KENPTlRFWFQuSFRNTEVsZW1lbnQpIHx8IChmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIHJldHVybiBwLnRvU3RyaW5nKCkgPT09IFwiW29iamVjdCBTYWZhcmlSZW1vdGVOb3RpZmljYXRpb25dXCI7XHJcbiAgICB9KSghQ09OVEVYVFsnc2FmYXJpJ10gfHwgc2FmYXJpLnB1c2hOb3RpZmljYXRpb24pKSB7XHJcbiAgICAgICAgcmV0dXJuICdzYWZhcmknO1xyXG4gICAgfVxyXG4gICAgaWYgKGZhbHNlIHx8ICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlKSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBhcmd1bWVudHNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKCEoJ3JlbW92ZScgaW4gRWxlbWVudC5wcm90b3R5cGUpKSB7XHJcbiAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlzSUUgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiAnaWUnO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpc0lFICYmICEhQ09OVEVYVC5TdHlsZU1lZGlhKSB7XHJcbiAgICAgICAgcmV0dXJuICdlZGdlJztcclxuICAgIH1cclxuICAgIGlmICghIUNPTlRFWFQuY2hyb21lICYmICEhQ09OVEVYVC5jaHJvbWUud2Vic3RvcmUpIHtcclxuICAgICAgICBpc0Nocm9tZSA9IHRydWVcclxuICAgICAgICByZXR1cm4gJ2Nocm9tZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoKGlzQ2hyb21lIHx8IGlzT3BlcmEpICYmICEhQ09OVEVYVC5DU1MpIHtcclxuICAgICAgICByZXR1cm4gJ2JsaW5rJztcclxuICAgIH1cclxufTtcclxuXHJcbmNvbW1vbi5yZWFkVmFsdWUgPSBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucyA9IHt9KXtcclxuICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKXtcclxuICAgICAgICByZXR1cm4gdmFsdWUob3B0aW9ucyk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb21tb24uZ2V0VXJsVmFyID0gZnVuY3Rpb24gKGtleSwgZGVmYXVsdFZhbHVlKSB7XHJcbiAgICB2YXIgdmFycyA9IHt9O1xyXG4gICAgdmFyIHBhcnRzID0gd2luZG93LmxvY2F0aW9uLmhyZWYucmVwbGFjZSgvWz8mXSsoW149Jl0rKT0oW14mXSopL2dpLCBmdW5jdGlvbiAobSwga2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHZhcnNba2V5XSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gKHZhcnNba2V5XSA9PT0gdW5kZWZpbmVkPyBkZWZhdWx0VmFsdWU6IHZhcnNba2V5XSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tb247IiwiY29uc3QgSVNfV09SS0VSID0gc2VsZi53aW5kb3cgPT09IHVuZGVmaW5lZDtcclxuY29uc3QgQ09OVEVYVCA9IElTX1dPUktFUiA/IHNlbGYgOiB3aW5kb3c7XHJcbnZhciByYWYgPSB7XHJcbiAgICByZXF1ZXN0VGltZW91dDogZnVuY3Rpb24gKGZuLCBkZWxheSkge1xyXG4gICAgICAgIGlmICghQ09OVEVYVC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpXHJcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZuLCBkZWxheSk7XHJcblxyXG4gICAgICAgIHZhciBzdGFydCA9IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIGhhbmRsZSA9IG5ldyBPYmplY3QoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9vcCh0aW1lc3RhbXApIHtcclxuICAgICAgICAgICAgKERhdGUubm93KCkgLSBzdGFydCkgPj0gZGVsYXkgPyBmbih0aW1lc3RhbXApIDogaGFuZGxlLnZhbHVlID0gQ09OVEVYVC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaGFuZGxlLnZhbHVlID0gQ09OVEVYVC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZTtcclxuICAgIH0sXHJcbiAgICBjbGVhclJlcXVlc3RUaW1lb3V0OiBmdW5jdGlvbiAoaGFuZGxlKSB7XHJcbiAgICAgICAgQ09OVEVYVC5jYW5jZWxBbmltYXRpb25GcmFtZSA/IENPTlRFWFQuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKTpjbGVhclRpbWVvdXQoaGFuZGxlKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJhZjsiLCJpbXBvcnQgY29tbW9uIGZyb20gJy4uL2NvbW1vbi9jb21tb24nXHJcbnZhciBkb20gPSB7XHJcbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcclxuICAgICAgICBpZihzZWxlY3Rvcj09PXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBfc2VsZWN0b3IgPSBzZWxlY3Rvci5jaGFyQXQoMCk7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBzZWxlY3Rvci5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgbGV0IGRvbXMgPSBbXTtcclxuICAgICAgICBzd2l0Y2ggKF9zZWxlY3Rvcil7XHJcbiAgICAgICAgICAgIGNhc2UgJyMnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5hbWUpO1xyXG4gICAgICAgICAgICBjYXNlICcuJzpcclxuICAgICAgICAgICAgICAgIGRvbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG5hbWUpIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBkb21zID0gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHNlbGVjdG9yKSB8fCBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkb21zO1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0YWcsIGlkID0gJycsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuICAgICAgICBsZXQgZWxlbWVudElkID0gaWQgfHwgKHRhZyArICdfJyArIGNvbW1vbi5jcmVhdGVJZCgpKTtcclxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBlbGVtZW50SWQpO1xyXG5cclxuICAgICAgICBzZXR1cEVsZW1lbnRNZXRob2RzKGVsZW1lbnQsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH0sXHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZXR1cEVsZW1lbnRNZXRob2RzKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuICAgIGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzID0gbmV3IE1hcCgpO1xyXG4gICAgZWxlbWVudC5fYm91bmQgPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgZWxlbWVudC5hZGQgPSBmdW5jdGlvbiAodGFnLCBpZCwgb3B0aW9ucykge1xyXG4gICAgICAgIGxldCBjaGlsZCA9IGRvbS5jcmVhdGVFbGVtZW50KHRhZywgaWQsIG9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZEVsZW1lbnQoY2hpbGQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmFkZEVsZW1lbnQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICAgICAgICByZXR1cm4gY2hpbGRcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5hZGRDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5nZXRBdHRyID0gZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KTtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5hdHRyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zZXRFbGVtZW50KCdhdHRyJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuZ2V0RGF0YSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5kYXRhID0gZnVuY3Rpb24oYW55KXtcclxuICAgICAgICB0aGlzLl9kYXRhID0gYW55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmdldFByb3AgPSBmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50W2tleV07XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQucHJvcCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudCgncHJvcCcsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmNzcyA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xyXG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnQoJ2NzcycsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmJpbmQgPSBmdW5jdGlvbihrZXksIGZuKXtcclxuICAgICAgICBpZihrZXkpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLl9ib3VuZC5zZXQoa2V5LCBmbik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnc3RvcmFnZV8nICsga2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgZWxlbWVudC51bmJpbmQgPSBmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9ib3VuZC5kZWxldGUoa2V5KTtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ3N0b3JhZ2VfJyArIGtleSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuX3JlYWN0ID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XHJcbiAgICAgICAgbGV0IGZuID0gdGhpcy5fYm91bmQuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYoZm4pe1xyXG4gICAgICAgICAgICBpZihmbi5jYWxsKHRoaXMsIHZhbHVlLCB0aGlzLl9kYXRhKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmQoa2V5KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50Lm9uICA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZm4sIHRhZyA9ICcnKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGV2ZW50VGFnID0gZXZlbnROYW1lICsgdGFnO1xyXG4gICAgICAgIGxldCBldmVudEhhbmRsZXIgPSBlbGVtZW50Ll9ldmVudExpc3RlbmVycy5nZXQoZXZlbnRUYWcpO1xyXG4gICAgICAgIGlmKGV2ZW50SGFuZGxlcil7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzLmRlbGV0ZShldmVudFRhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGZuKSB7XHJcbiAgICAgICAgICAgIGV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihmbi5jYWxsKHNlbGYsIGUsIHNlbGYuX2RhdGEpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuc2V0KGV2ZW50VGFnLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuY29udGVudCA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICB0aGlzLmlubmVyVGV4dCA9IHN0cjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5yZW1vdmVTZWxmID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgaWYodGhpcy5yZW1vdmUpe1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQucmVtb3ZlQWxsQ2hpbGRyZW4gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5fc2V0RWxlbWVudCA9IGZ1bmN0aW9uKHR5cGUsIGtleSAsIHZhbHVlKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgY29tbW9uLm9iamVjdGZvckVhY2goa2V5ICxmdW5jdGlvbiAoaXRlbSwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmW3R5cGVdKGtleSwgaXRlbSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHYgPSBjb21tb24ucmVhZFZhbHVlKHZhbHVlKTtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3AnOlxyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dHInOlxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKGtleSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjc3MnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZVtrZXldID0gIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnQuaXNJblZpZXdwb3J0ID0gZnVuY3Rpb24gKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGxldCBvZmZzZXRYID0gb3B0aW9ucy5vZmZzZXRYIHx8IDA7XHJcbiAgICAgICAgbGV0IG9mZnNldFkgPSBvcHRpb25zLm9mZnNldFkgfHwgMDtcclxuICAgICAgICBsZXQge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgLy9JRSBub3Qgc3VwcG9ydCBib3R0b20gcmlnaHRcclxuICAgICAgICBsZXQgeDIgPSB4ICsgd2lkdGg7XHJcbiAgICAgICAgbGV0IHkyID0geSArIGhlaWdodDtcclxuICAgICAgICBsZXQgaW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGxldCBpbm5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICByZXR1cm4gISh4MiA8PSAoMCArIG9mZnNldFgpfHwgeCA+PSAoaW5uZXJXaWR0aCAtIG9mZnNldFgpIHx8IHkyIDw9ICgwICsgb2Zmc2V0WSkgfHwgeSA+PSAoaW5uZXJIZWlnaHQgLSBvZmZzZXRZKSlcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRvbTsiLCJpbXBvcnQgY29tbW9uIGZyb20gJy4uL2NvbW1vbi9jb21tb24nO1xyXG5cclxudmFyIHN0b3JhZ2UgPSB7XHJcbiAgICBkYXRhTWFwOiBuZXcgTWFwKCksXHJcbiAgICB0aW1lck1hcDogIG5ldyBNYXAoKSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBkYXRhTWFwID0gdGhpcy5kYXRhTWFwO1xyXG4gICAgICAgIGxldCB7cmVzZXR9ID0gb3B0aW9ucztcclxuICAgICAgICBsZXQgc2hvdWxkUmVhY3QgPSBmYWxzZTtcclxuICAgICAgICBsZXQgb2xkVmFsdWUgPSBkYXRhTWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmKGNvbW1vbi5pc09iamVjdCh2YWx1ZSkgJiYgY29tbW9uLmlzT2JqZWN0KG9sZFZhbHVlKSAmJiByZXNldCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjb21tb24ub2JqZWN0Zm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gKGl0ZW0sIGtleSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG91bGRSZWFjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHZhbHVlW2tleV1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBzaG91bGRSZWFjdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGRhdGFNYXAuc2V0KGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gZGF0YU1hcC5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgaWYoc2hvdWxkUmVhY3QpIHtcclxuICAgICAgICAgICB0aGlzLmJyb2FkY2FzdChrZXksIG5ld1ZhbHVlLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdWYWx1ZTtcclxuICAgIH0sXHJcbiAgICBicm9hZGNhc3Q6IGZ1bmN0aW9uKGtleSwgbmV3VmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB0aW1lciA9IHRoaXMudGltZXJNYXAuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIGlmICh0aW1lcikge1xyXG4gICAgICAgICAgICBjYy5jYW5jZWxUaW1lcih0aW1lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aW1lciA9IGNjLnNldFRpbWVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGRvbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzdG9yYWdlXycgKyBrZXkpIHx8IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkb20gPSBkb21zW2ldO1xyXG4gICAgICAgICAgICAgICAgZG9tLl9yZWFjdCAmJiBkb20uX3JlYWN0KGtleSwgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYudGltZXJNYXAuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgfSwgb3B0aW9ucy5pbW1lZGlhdGVseT8gMDogMTApO1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVyTWFwLnNldChrZXksIHRpbWVyKTtcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFNYXAuZ2V0KGtleSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdG9yYWdlOyIsImNvbnN0IHhociA9IHtcclxuICAgIGFqYXg6IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xyXG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBsZXQge3VybCwgbWV0aG9kLCBkYXRhLCBhc3luYywgeGhyLCBjb250ZW50VHlwZSwgZGF0YVR5cGUsIGRvbmUsIGZhaWx9ID0gcGFyYW1zIHx8IHt9O1xyXG4gICAgICAgICAgICBsZXQge2hlYWRlciwgb25Qcm9ncmVzcywgYmVmb3JlU2VuZH0gPSBwYXJhbXM7XHJcbiAgICAgICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub3BlbigobWV0aG9kIHx8ICdHRVQnKSwgdXJsLCBhc3luYyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFzeW5jKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiAoaGVhZGVyIHx8IHt9KSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKChoZWFkZXIgfHwge30pLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY2MuZ2V0VmFsdWUoJ0F1dGhvcml6YXRpb24nKSl7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBjYy5nZXRWYWx1ZSgnQXV0aG9yaXphdGlvbicpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkb25lICYmIGRvbmUocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbCAmJiBmYWlsKHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCksIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwgJiYgZmFpbChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3QudXBsb2FkLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHAgPSBNYXRoLmZsb29yKGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBvblByb2dyZXNzICYmIG9uUHJvZ3Jlc3MocCwgZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgX2RhdGE7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIF9kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2pzb24nOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlID09PSB1bmRlZmluZWQgPyBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiA6IGNvbnRlbnRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kICYmIGJlZm9yZVNlbmQocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0LnNlbmQoX2RhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5mdW5jdGlvbiBwYXJzZURhdGEoZGF0YSkge1xyXG4gICAgdHJ5e1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEgfHwgJycpXHJcbiAgICB9Y2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHhocjtcclxuIiwiaW1wb3J0IGNjIGZyb20gJy4vY2Nqcy9jYyc7XHJcbmltcG9ydCBhbmFseXNlciBmcm9tICcuL2FuYWx5c2VyJztcclxuY29uc3QgV0hJVEUgPSAncmdiYSgyNTUsMjU1LDI1NSwgMC43KSc7XHJcbmNvbnN0IEJMQUNLID0gJ3JnYmEoMCwwLDAsIDAuOSknO1xyXG5jb25zdCBSRUQgPSAnI2Q2MzAzMSc7XHJcblxyXG5jYy5zZXRWYWx1ZSgndmlld3BvcnQnLCB7d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodH0pO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY2MudXBkYXRlVmFsdWUoJ3ZpZXdwb3J0Jywge3dpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHR9KTtcclxufSk7XHJcbmZ1bmN0aW9uIGluZGV4KCkge1xyXG4gICAgbGV0IHJvb3QgPSBjYy5zZWxlY3QoJyNib2R5Jyk7XHJcbiAgICBsZXQgbWFpbkNvbnRhaW5lciA9IGNjLmNyZWF0ZUVsZW1lbnQoJ2RpdicsICd0ZXN0JylcclxuICAgICAgICAuYWRkQ2xhc3MoJ21haW4tY29udGFpbmVyJyk7XHJcblxyXG4gICAgcm9vdC5hcHBlbmRDaGlsZChtYWluQ29udGFpbmVyKTtcclxuICAgIGxldCBjb250YWluZXIgPSBtYWluQ29udGFpbmVyLmFkZCgnZGl2JylcclxuXHJcbiAgICBsZXQgaGVhZGVyID0gY29udGFpbmVyLmFkZCgnZGl2JywgJ2hlYWRlcicpXHJcbiAgICAgICAgLmFkZENsYXNzKCdoZWFkZXInKTtcclxuICAgIGxldCBoZWFkZXJMZWZ0ID0gaGVhZGVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgIG1pbldpZHRoOiAnMjU2cHgnXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgbG9nbyA9IGhlYWRlckxlZnQuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jb250ZW50KCdBJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2JhY2tncm91bmQtcmVkJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2ZvbnQtYmxhY2snKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzY0cHgnLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAnMCAxNnB4JyxcclxuICAgICAgICAgICAgbGluZUhlaWdodDogJzU0cHgnLFxyXG4gICAgICAgICAgICBtYXJnaW5SaWdodDogJzRweCcsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICBib3hTaGFkb3c6IFJFRCArICcgMCAwIDEwcHgnLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBuYW1lQ29udGFpbmVyID0gaGVhZGVyTGVmdC5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXHJcbiAgICAgICAgfSk7XHJcbiAgICBuYW1lQ29udGFpbmVyLmFkZCgnc3BhbicpXHJcbiAgICAgICAgLmNvbnRlbnQoJ05YSU4gWUFORycpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXHJcbiAgICAgICAgfSk7XHJcbiAgICBuYW1lQ29udGFpbmVyLmFkZCgnc3BhbicpXHJcbiAgICAgICAgLmNvbnRlbnQoJ0Zyb250LUVuZCBEZXZlbG9wZXInKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgbWVudSA9IGhlYWRlci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICB9KTtcclxuICAgIGxldCBtZW51TGlzdCA9IFsnZmEtbGlua2VkaW4nLCAnZmEtZ2l0aHViJ107XHJcbiAgICBsZXQgbGlua3MgPSBbJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9hbnhpbi15YW5nLTcwNzAyOTEyNS8nLCAnaHR0cHM6Ly9naXRodWIuY29tL0FueGluWWFuZyddO1xyXG4gICAgbGV0IGhvdmVyQ29sb3JzID0gWycjMDA3N0I1JywgJ3JnYmEoMjU1LDAsODAsIDAuOCknXTtcclxuICAgIG1lbnVMaXN0LmZvckVhY2goZnVuY3Rpb24gKHRhZywgaWR4KSB7XHJcbiAgICAgICAgbWVudS5hZGQoJ2knKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhYicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhtZW51TGlzdFtpZHhdKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzU0cHgnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0U2hhZG93OiAnIDAgMCA1cHgnLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJzAuM3MnLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcxNnB4J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4obGlua3NbaWR4XSwgJ19ibGFuaycpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogaG92ZXJDb2xvcnNbaWR4XSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sICdzdHlsZScpXHJcbiAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJycsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LCAnc3R5bGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBtYWluQ29udGVudENvbnRhaW5lciA9IGNjLmNyZWF0ZUVsZW1lbnQoJ2RpdicsICdtYWluX2NvbnRlbnQnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBoZWlnaHQ6ICdjYWxjKDEwMHZoIC0gMTA0cHgpJyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzAgMTIuNSUnLFxyXG4gICAgICAgICAgICBjb2xvcjogV0hJVEUsXHJcbiAgICAgICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgICAgICAgICAgekluZGV4OiA1LFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nXHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJYID0gd2luZG93LmlubmVyV2lkdGggLyAyO1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIGxldCBtb3VzZVggPSBlLmNsaWVudFg7XHJcbiAgICAgICAgICAgIGxldCBtb3VzZVkgPSBlLmNsaWVudFk7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgnICsgKC0obW91c2VYIC0gY2VudGVyWCkgLyAxMDApICsgJ3B4LCcgKyAoLShtb3VzZVkgLSBjZW50ZXJZKSAvIDEwMCkgKyAncHgpJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5iaW5kKCdmcmFtZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGRvbXMgPSBjYy5zZWxlY3QoJy5mYWRlJyk7XHJcbiAgICAgICAgICAgIGlmKGRvbXMubGVuZ3RoPT09MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZCgnZnJhbWUnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9tcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRvbSA9IGRvbXNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgaXNJblZpZXdQb3J0ID0gZG9tLmlzSW5WaWV3cG9ydCh7b2Zmc2V0WTogMTUwfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3BhY2l0eSA9ICtkb20uc3R5bGUub3BhY2l0eTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0luVmlld1BvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb20uYWRkQ2xhc3MoJ3NsaWRlLWluLWJvdHRvbScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcygnZmFkZS1vdXQnKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoJ3NsaWRlLWluLWJvdHRvbScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5hZGRDbGFzcygnZmFkZS1vdXQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGxhbmRpbmdDb250YWluZXIgPSBtYWluQ29udGVudENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGhlaWdodDogJ2NhbGMoMTAwdmggLSAxMDRweCknXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgaGlnaExpZ2h0ID0gbGFuZGluZ0NvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNvbnRlbnQoXCJMZXQncyBtYWtlIGRhdGEgYWxpdmVcIilcclxuICAgICAgICAuYWRkQ2xhc3MoJ2ZhZGUnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBjb2xvcjogV0hJVEUsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgZm9udFNpemU6ICc0OHB4JyxcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnY2FsYyg1MHZoIC0gMTUycHgpJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGludHJvID0gbGFuZGluZ0NvbnRhaW5lci5hZGQoJ3AnKVxyXG4gICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgLmNvbnRlbnQoXCJJJ20gYSBmcm9udC1lbmQgZGV2ZWxvcGVyIGZyb20gQmF5IEFyZWEsIENhbGlmb3JuaWEsIGFuZCBjdXJyZW50bHkgbGl2aW5nIGluIFNhbiBKb3NlLiBJIGVuam95IGJ1aWxkaW5nIHJpY2ggXCIgK1xyXG4gICAgICAgICAgICBcImludGVyYWN0aXZlIHdlYnNpdGVzIGFuZCB3ZWIgYXBwcyBmcm9tIHNtYWxsIHRvIGxhcmdlLiBcIilcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcyMHB4JyxcclxuICAgICAgICB9KTtcclxuICAgIGxldCBwbGF5ZXIgPSBsYW5kaW5nQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzY0cHgnLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAuYWRkKCdpJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2ZhcicpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmYS1wbGF5LWNpcmNsZScpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdyZ2JhKDI1NSwwLDgwLCAwLjgpJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcGxheWVyV2Fybi5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJydcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcGxheWVyV2Fybi5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYoY2MuZ2V0VmFsdWUoJ3BsYXknKSl7XHJcbiAgICAgICAgICAgICAgICBjYy5zZXRWYWx1ZSgncGxheScsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2ZhLXBhdXNlLWNpcmNsZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzcygnZmEtcGxheS1jaXJjbGUnKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjYy5zZXRWYWx1ZSgncGxheScsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzcygnZmEtcGF1c2UtY2lyY2xlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdmYS1wbGF5LWNpcmNsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgcGxheWVyV2FybiA9IGxhbmRpbmdDb250YWluZXIuYWRkKCdwJylcclxuICAgICAgICAuY29udGVudCgnV2F0Y2ggeW91IHZvbHVtZSA6KScpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIHRleHRBbGlnbjonY2VudGVyJyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxyXG4gICAgICAgICAgICBjb2xvcjoncmdiYSgyNTUsMCw4MCwgMC44KSdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgc2tpbGxDb250YWluZXIgPSBtYWluQ29udGVudENvbnRhaW5lci5hZGQoJ2RpdicpO1xyXG4gICAgbGV0IHNraWxsVGl0bGUgPSBza2lsbENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNvbnRlbnQoXCJTa2lsbHNcIilcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnNDhweCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzI1NnB4J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBza2lsbENhcmRDb250YWluZXIgPSBza2lsbENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnMTI4cHgnLFxyXG4gICAgICAgICAgICBmbGV4V3JhcDogJ3dyYXAnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IHNraWxscyA9IFsnZmEtaHRtbDUnLCAnZmEtanMnLCAnZmEtY3NzMy1hbHQnLCAnZmEtcmVhY3QnLCAnZmEtbm9kZS1qcycsJ2ZhLXNhc3MnXTtcclxuICAgIGxldCBza2lsbE5hbWVzID0gWydIVE1MNScsICdKYXZhc2NyaXB0JywgJ0NTUzMnLCAnUmVhY3QnLCAnTm9kZUpTJywgJ1NBU1MnXTtcclxuICAgIGxldCBza2lsbENvbG9ycyA9IFsnI2U0NGQyNicsICcjZWVhZjRiJywgJyMwMDcwYmEnLCAnIzYxZGFmYicsICcjN2NiNzAwJywnI2M2OSddO1xyXG4gICAgc2tpbGxzLmZvckVhY2goZnVuY3Rpb24gKGljb24sIGlkeCkge1xyXG4gICAgICAgIGxldCBjYXJkID0gc2tpbGxDYXJkQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYWRlJylcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBtaW5XaWR0aDogJzMwMHB4JyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBmbGV4R3JvdzogMSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGxvZ28gPSBjYXJkLmFkZCgnaScpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFiJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKGljb24pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcyNTZweCcsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHNraWxsQ29sb3JzW2lkeF0sXHJcbiAgICAgICAgICAgICAgICB0ZXh0U2hhZG93OiBza2lsbENvbG9yc1tpZHhdICsgJyAwIDAgMTBweCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBjYXJkLmFkZCgncCcpXHJcbiAgICAgICAgICAgIC5jb250ZW50KHNraWxsTmFtZXNbaWR4XSlcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBza2lsbENvbG9yc1tpZHhdLFxyXG4gICAgICAgICAgICAgICAgdGV4dFNoYWRvdzogc2tpbGxDb2xvcnNbaWR4XSArICcgMCAwIDEwcHgnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgY2FyZWVyQ29udGFpbmVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdkaXYnKTtcclxuICAgIGxldCBjYXJlZXJUaXRsZSA9IHNraWxsQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY29udGVudChcIkNhcmVlclwiKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBjb2xvcjogV0hJVEUsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgZm9udFNpemU6ICc0OHB4JyxcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnMTI4cHgnLFxyXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc2NHB4JyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgY29tcGFuaWVzID0gWyduZXRFbGFzdGljIFN5c3RlbXMsIEluYy4nLCAnU2FuIEZyYW5jaXNjbyBTdGF0ZSBVbml2ZXJzaXR5JywgJ1NoYW5naGFpIFVuaXZlcnNpdHknXTtcclxuICAgIGxldCB0aXRsZXMgPSBbJ1NvZnR3YXJlIEVuZ2luZWVyJywgJ0JTIC0gQ29tcHV0ZXIgRW5naW5lZXJpbmcgU3R1ZGVudCcsICdBUyAtIENvbXB1dGVyIEFwcGxpY2F0aW9uIFRlY2hub2xvZ3kgU3R1ZGVudCddO1xyXG4gICAgbGV0IHRpbWVMaW5lcyA9IFsnMjAxNyAtIEN1cnJlbnQnLCAnMjAxMyAtIDIwMTcnLCAnMjAwOSAtIDIwMTMnXTtcclxuICAgIGxldCBwcm9qZWN0cyA9IHtcclxuICAgICAgICAnbmV0RWxhc3RpYyBTeXN0ZW1zLCBJbmMuJzogWyd2Qk5HIE1hbmFnZW1lbnQgU3lzdGVtIChVSSBMZWFkKScsICdTRC1XQU4gTWFuYWdlbWVudCBTeXN0ZW0gKFVJIFRlYW0gTWVtYmVyKScsXVxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wYW5pZXMuZm9yRWFjaChmdW5jdGlvbiAoY29tcGFueU5hbWUsIGlkeCkge1xyXG4gICAgICAgIGxldCBjYXJkID0gY2FyZWVyQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYWRlJylcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnNjRweCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGNvbXBhbnkgPSBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmNvbnRlbnQoY29tcGFueU5hbWUpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGZvbnRTaXplID0gJzIwcHgnO1xyXG4gICAgICAgIGxldCB0aXRsZSA9IGNhcmQuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAuY29udGVudCh0aXRsZXNbaWR4XSlcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemUsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdGltZUxpbmUgPSBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmNvbnRlbnQodGltZUxpbmVzW2lkeF0pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAocHJvamVjdHNbY29tcGFueU5hbWVdIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9qZWN0KSB7XHJcbiAgICAgICAgICAgIGNhcmQuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAgICAgLmNvbnRlbnQocHJvamVjdClcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBmb290ZXIgPSBtYWluQ29udGVudENvbnRhaW5lci5hZGQoJ3AnKVxyXG4gICAgICAgIC5jb250ZW50KCdQb3dlcmVkIGJ5IGNjSlMsIGEgc2VsZi1pbXBsZW1lbnRlZCBKYXZhc2NyaXB0IExpYnJhcnkuJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnMTI4cHgnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IGZvb3RTaGFkb3cgPSBjb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgYm90dG9tOiAnLTNweCcsXHJcbiAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgIHpJbmRleDogMTAsXHJcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICAgJ25vbmUnXHJcbiAgICAgICAgICAgIC8vYm94U2hhZG93OiAncmdiYSgyNTUsIDAsIDgwLCAwLjgpIDBweCAwcHggNTBweCAycHgnXHJcbiAgICAgICAgfSk7XHJcbiAgICBhbmFseXNlcihmb290U2hhZG93KTtcclxuICAgIGxldCBjb2RlQmFja2dyb3VuZFRleHQgPSBpbmRleC50b1N0cmluZygpO1xyXG4gICAgbGV0IGNvbHVtbldpZHRoID0gTWF0aC5taW4oNDAwICwgd2luZG93LmlubmVyV2lkdGggLSAxMjgpO1xyXG4gICAgbGV0IGNvbHVtbkNvdW50ID0gTWF0aC5taW4oMiwgTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJXaWR0aC8oY29sdW1uV2lkdGgpKSk7XHJcbiAgICBsZXQgY29kZUJhY2tncm91bmQgPSBjb250YWluZXIuYWRkKCdwcmUnKVxyXG4gICAgICAgIC5hZGRDbGFzcygnY3J0VGV4dCcpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgICB0b3A6ICcxMjhweCcsXHJcbiAgICAgICAgICAgIGxlZnQ6ICc2NHB4JyxcclxuICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAncmdiYSgyNTUsMjU1LDI1NSwgMC4wNiknLFxyXG4gICAgICAgICAgICB6SW5kZXg6IDAsXHJcbiAgICAgICAgICAgIGNvbHVtbkNvdW50OiBjb2x1bW5Db3VudCxcclxuICAgICAgICAgICAgY29sdW1uV2lkdGg6IGNvbHVtbldpZHRoICsgJ3B4JyxcclxuICAgICAgICAgICAgd2lkdGg6ICdjYWxjKDEwMHZ3IC0gMTI4cHgpJyxcclxuICAgICAgICAgICAgb3BhY2l0eTogMC4zXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZGF0YSh7XHJcbiAgICAgICAgICAgIGNvdW50ZXI6IDAsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYmluZCgnZnJhbWUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCB7Y291bnRlciwgc3RyfSA9IHRoaXMuZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKCcgKyAoLW1haW5Db250ZW50Q29udGFpbmVyLnNjcm9sbFRvcC82KSArICdweCknXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb3VudGVyKz00O1xyXG4gICAgICAgICAgICBpZihjb3VudGVyID49IGNvZGVCYWNrZ3JvdW5kVGV4dC5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgLy9jb3VudGVyID0gY29kZUJhY2tncm91bmRUZXh0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclRleHQgPSBjb2RlQmFja2dyb3VuZFRleHQuc3Vic3RyaW5nKDAsIGNvdW50ZXIpICsgJ18nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSh7Y291bnRlcjogY291bnRlcn0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYmluZCgndmlld3BvcnQnLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICBsZXQge2hlaWdodCwgd2lkdGh9ID0gZDtcclxuICAgICAgICAgICAgbGV0IGNvbHVtbldpZHRoID0gTWF0aC5taW4oNDAwICwgd2lkdGggLSAxMjgpO1xyXG4gICAgICAgICAgICBsZXQgY29sdW1uQ291bnQgPSBNYXRoLm1pbigyLCBNYXRoLmZsb29yKHdpZHRoLyhjb2x1bW5XaWR0aCkpKTtcclxuICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uQ291bnQ6IGNvbHVtbkNvdW50LFxyXG4gICAgICAgICAgICAgICAgY29sdW1uV2lkdGg6IGNvbHVtbldpZHRoICsgJ3B4JyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgbWFpbkNvbnRhaW5lci5hZGRFbGVtZW50KGNvbnRhaW5lcik7XHJcbiAgICBjb250YWluZXIuYWRkRWxlbWVudChoZWFkZXIpO1xyXG4gICAgY29udGFpbmVyLmFkZEVsZW1lbnQobWFpbkNvbnRlbnRDb250YWluZXIpO1xyXG59XHJcbmluZGV4KCk7Il0sInNvdXJjZVJvb3QiOiIifQ==