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
        bar_height = void 0,
        isInit = void 0;
    canvas = Container.add('canvas').attr({
        height: 100
    }).css({
        width: '100%',
        height: '100px'
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
    audio.src = 'gokuraku.mp3';
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
        //bars = 1000;
        bar_width = canvas.getBoundingClientRect().width / (fbc_array.length * 3);
        for (var i = 0; i < fbc_array.length; i++) {
            bar_x = i;
            bar_height = -(fbc_array[i] * canvas.height / 255);
            ctx.fillStyle = gradient;
            ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
            if (bar_height < -80) {
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
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 10
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuYWx5c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2NjLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2NvbW1vbi9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY29tbW9uL3JhZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy9kb20vZG9tLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy94aHIveGhyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjYW52YXMiLCJjdHgiLCJzb3VyY2UiLCJjb250ZXh0IiwiYW5hbHlzZXIiLCJmYmNfYXJyYXkiLCJiYXJzIiwiYmFyX3giLCJiYXJfd2lkdGgiLCJiYXJfaGVpZ2h0IiwiaXNJbml0IiwiaGVpZ2h0Iiwid2lkdGgiLCJhdWRpbyIsImdyYWRpZW50IiwiZnJhbWVMb29wZXIiLCJ3aW5kb3ciLCJpIiwiZ3JhZGllbnRIaXQiLCJJU19XT1JLRVIiLCJzZWxmIiwiQ09OVEVYVCIsImNjIiwidG9vbHMiLCJjb21tb24iLCJsb2FkIiwiYWRkT25zIiwib3B0aW9ucyIsInNlbGVjdCIsImRvbSIsImNyZWF0ZUVsZW1lbnQiLCJjcmVhdGVFbGVtZW50TlMiLCJzZXRWYWx1ZSIsInN0b3JhZ2UiLCJzYXZlQXJyYXkiLCJhcnIiLCJpZGtleSIsImtleSIsIml0ZW0iLCJ1cGRhdGVWYWx1ZSIsImdldFZhbHVlIiwic2V0VGltZXIiLCJyYWYiLCJjYW5jZWxUaW1lciIsInJlcXVlc3QiLCJwYXJhbXMiLCJ4aHIiLCJsYXN0IiwiZnJhbWVUaWNrZXIiLCJpbW1lZGlhdGVseSIsIm9iaiIsImZuIiwidGFyZ2V0IiwiTWF0aCIsInM0IiwiT2JqZWN0IiwiaXNJRSIsImlzQ2hyb21lIiwiaXNPcGVyYSIsIm9wciIsIm5hdmlnYXRvciIsInAiLCJzYWZhcmkiLCJkb2N1bWVudCIsIm91dHB1dCIsImFyZ3VtZW50cyIsIkVsZW1lbnQiLCJ2YWx1ZSIsInJlcXVlc3RUaW1lb3V0Iiwic2V0VGltZW91dCIsInN0YXJ0IiwiRGF0ZSIsImhhbmRsZSIsImNsZWFyUmVxdWVzdFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJzZWxlY3RvciIsIl9zZWxlY3RvciIsIm5hbWUiLCJkb21zIiwiaWQiLCJlbGVtZW50IiwiZWxlbWVudElkIiwidGFnIiwic2V0dXBFbGVtZW50TWV0aG9kcyIsImNoaWxkIiwiZXZlbnRUYWciLCJldmVudE5hbWUiLCJldmVudEhhbmRsZXIiLCJ2Iiwib2Zmc2V0WCIsIm9mZnNldFkiLCJ4MiIsIngiLCJ5MiIsInkiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJkYXRhTWFwIiwidGltZXJNYXAiLCJzaG91bGRSZWFjdCIsIm9sZFZhbHVlIiwicmVzZXQiLCJuZXdWYWx1ZSIsImJyb2FkY2FzdCIsInRpbWVyIiwiYWpheCIsInByb21pc2UiLCJtZXRob2QiLCJhc3luYyIsImhlYWRlciIsImRvbmUiLCJwYXJzZURhdGEiLCJyZXNvbHZlIiwiZmFpbCIsInJlamVjdCIsImUiLCJvblByb2dyZXNzIiwiX2RhdGEiLCJjb250ZW50VHlwZSIsIkpTT04iLCJiZWZvcmVTZW5kIiwiZGF0YSIsIldISVRFIiwiQkxBQ0siLCJSRUQiLCJyb290IiwibWFpbkNvbnRhaW5lciIsImNvbnRhaW5lciIsImhlYWRlckxlZnQiLCJkaXNwbGF5IiwibWluV2lkdGgiLCJsb2dvIiwiZm9udFNpemUiLCJwYWRkaW5nIiwibGluZUhlaWdodCIsIm1hcmdpblJpZ2h0IiwiYm94U2hhZG93IiwibmFtZUNvbnRhaW5lciIsIm1lbnUiLCJtZW51TGlzdCIsImxpbmtzIiwiaG92ZXJDb2xvcnMiLCJjdXJzb3IiLCJ0ZXh0QWxpZ24iLCJ0ZXh0U2hhZG93IiwidHJhbnNpdGlvbiIsImNvbG9yIiwibWFpbkNvbnRlbnRDb250YWluZXIiLCJvdmVyZmxvd1kiLCJwb3NpdGlvbiIsInpJbmRleCIsImZsZXhEaXJlY3Rpb24iLCJjZW50ZXJYIiwiY2VudGVyWSIsIm1vdXNlWCIsIm1vdXNlWSIsInRyYW5zZm9ybSIsImlzSW5WaWV3UG9ydCIsIm9wYWNpdHkiLCJsYW5kaW5nQ29udGFpbmVyIiwiaGlnaExpZ2h0IiwiZm9udFdlaWdodCIsIm1hcmdpblRvcCIsImludHJvIiwicGxheWVyIiwicGxheWVyV2FybiIsInNraWxsQ29udGFpbmVyIiwic2tpbGxUaXRsZSIsInNraWxsQ2FyZENvbnRhaW5lciIsImp1c3RpZnlDb250ZW50IiwiZmxleFdyYXAiLCJza2lsbHMiLCJza2lsbE5hbWVzIiwic2tpbGxDb2xvcnMiLCJjYXJkIiwiZmxleEdyb3ciLCJjYXJlZXJDb250YWluZXIiLCJjYXJlZXJUaXRsZSIsIm1hcmdpbkJvdHRvbSIsImNvbXBhbmllcyIsInRpdGxlcyIsInRpbWVMaW5lcyIsInByb2plY3RzIiwiY29tcGFueSIsInRpdGxlIiwidGltZUxpbmUiLCJmb290ZXIiLCJmb290U2hhZG93IiwiYm90dG9tIiwibGVmdCIsImNvZGVCYWNrZ3JvdW5kVGV4dCIsImluZGV4IiwiY29sdW1uV2lkdGgiLCJjb2x1bW5Db3VudCIsImNvZGVCYWNrZ3JvdW5kIiwidG9wIiwiY291bnRlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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STRJLGNBQWM1SSxZQUFZQSxXQUFXekMsUUFBekMsV0FBOEJ5QyxDQUFaQSxDQUFsQjtBQUNBLGlCQUFTO0FBQ0w0SSx5QkFESztBQUVMRCx5QkFBYUEsY0FBYztBQUZ0QixTQUFUO0FBbENSLEtBQXFCLENBQXJCOztBQXlDQWxFO0FBQ0FDO0FBQ0FBO0FBQ0g7QUFDRGdFLFEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiZnVuY3Rpb24gYW5hbHlzZXIoQ29udGFpbmVyKSB7XHJcbiAgICAvLyBFc3RhYmxpc2ggYWxsIHZhcmlhYmxlcyB0aGF0IHlvdXIgQW5hbHlzZXIgd2lsbCB1c2VcclxuICAgIGxldCBjYW52YXMsIGN0eCwgc291cmNlLCBjb250ZXh0LCBhbmFseXNlciwgZmJjX2FycmF5LCBiYXJzLCBiYXJfeCwgYmFyX3dpZHRoLCBiYXJfaGVpZ2h0LCBpc0luaXQ7XHJcbiAgICBjYW52YXMgPSBDb250YWluZXIuYWRkKCdjYW52YXMnKVxyXG4gICAgICAgIC5hdHRyKHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDBcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDBweCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5iaW5kKCdwbGF5JywgZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgaWYoZCl7XHJcbiAgICAgICAgICAgICAgICBpc0luaXQgPSBpc0luaXQ/dHJ1ZTppbml0TXAzUGxheWVyKCk7XHJcbiAgICAgICAgICAgICAgICBhdWRpby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGF1ZGlvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgbGV0IGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIDEwMCk7XHJcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgXCJyZ2JhKDI1NSwwLDgwLDAuMSlcIik7XHJcbiAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgXCJyZ2JhKDI1NSwwLDgwLDAuNSlcIik7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIGFuIGF1ZGlvIG9iamVjdCBhbmQgYWRqdXN0IHNvbWUgb2YgaXRzIHByb3BlcnRpZXNcclxuICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygpO1xyXG4gICAgYXVkaW8uc3JjID0gJ2dva3VyYWt1Lm1wMyc7XHJcbiAgICBhdWRpby5jb250cm9scyA9IHRydWU7XHJcbiAgICBhdWRpby5sb29wID0gdHJ1ZTtcclxuICAgIGF1ZGlvLmF1dG9wbGF5ID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdE1wM1BsYXllcigpIHtcclxuICAgICAgICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdWRpb19ib3gnKS5hcHBlbmRDaGlsZChhdWRpbyk7XHJcbiAgICAgICAgY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTsgLy8gQXVkaW9Db250ZXh0IG9iamVjdCBpbnN0YW5jZVxyXG4gICAgICAgIGFuYWx5c2VyID0gY29udGV4dC5jcmVhdGVBbmFseXNlcigpOyAvLyBBbmFseXNlck5vZGUgbWV0aG9kXHJcbiAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgLy8gUmUtcm91dGUgYXVkaW8gcGxheWJhY2sgaW50byB0aGUgcHJvY2Vzc2luZyBncmFwaCBvZiB0aGUgQXVkaW9Db250ZXh0XHJcbiAgICAgICAgc291cmNlID0gY29udGV4dC5jcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UoYXVkaW8pO1xyXG4gICAgICAgIHNvdXJjZS5jb25uZWN0KGFuYWx5c2VyKTtcclxuICAgICAgICBhbmFseXNlci5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgICAgIGZyYW1lTG9vcGVyKCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZnJhbWVMb29wZXIoKSB7XHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZUxvb3Blcik7XHJcbiAgICAgICAgZmJjX2FycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQpO1xyXG4gICAgICAgIGFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKGZiY19hcnJheSk7XHJcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpOyAvLyBDbGVhciB0aGUgY2FudmFzXHJcbiAgICAgICAgLy9iYXJzID0gMTAwMDtcclxuICAgICAgICBiYXJfd2lkdGggPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLyAoZmJjX2FycmF5Lmxlbmd0aCAqIDMpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmJjX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJhcl94ID0gaTtcclxuICAgICAgICAgICAgYmFyX2hlaWdodCA9IC0oZmJjX2FycmF5W2ldKmNhbnZhcy5oZWlnaHQvMjU1KTtcclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xyXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoYmFyX3gsIGNhbnZhcy5oZWlnaHQsIGJhcl93aWR0aCwgYmFyX2hlaWdodCk7XHJcbiAgICAgICAgICAgIGlmKGJhcl9oZWlnaHQ8LTgwKXtcclxuICAgICAgICAgICAgICAgIGxldCBncmFkaWVudEhpdCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudChiYXJfeC01LCAwLCBiYXJfeCs1LCAwKTtcclxuICAgICAgICAgICAgICAgIGdyYWRpZW50SGl0LmFkZENvbG9yU3RvcCgwLCBcInJnYmEoMjU1LDAsODAsMClcIik7XHJcbiAgICAgICAgICAgICAgICBncmFkaWVudEhpdC5hZGRDb2xvclN0b3AoMC4yNSwgXCJyZ2JhKDI1NSwwLDgwLDApXCIpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRIaXQuYWRkQ29sb3JTdG9wKDAuNSwgXCJyZ2JhKDI1NSwwLDgwLDAuOClcIik7XHJcbiAgICAgICAgICAgICAgICBncmFkaWVudEhpdC5hZGRDb2xvclN0b3AoMC43NSwgXCJyZ2JhKDI1NSwwLDgwLDApXCIpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRIaXQuYWRkQ29sb3JTdG9wKDEsIFwicmdiYSgyNTUsMCw4MCwwKVwiKTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudEhpdDtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdChiYXJfeC01LCAxLCAxMCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFuYWx5c2VyOyIsImltcG9ydCBkb20gZnJvbSAnLi9kb20vZG9tJztcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2UnO1xyXG5pbXBvcnQgcmFmIGZyb20gJy4vY29tbW9uL3JhZic7XHJcbmltcG9ydCBjb21tb24gZnJvbSAnLi9jb21tb24vY29tbW9uJztcclxuaW1wb3J0IHhociBmcm9tICcuL3hoci94aHInO1xyXG5cclxuY29uc3QgSVNfV09SS0VSID0gc2VsZi53aW5kb3cgPT09IHVuZGVmaW5lZDtcclxuY29uc3QgQ09OVEVYVCA9IElTX1dPUktFUiA/IHNlbGYgOiB3aW5kb3c7XHJcblxyXG52YXIgY2M7XHJcbndpbmRvdy5jYyA9IGNjID0ge1xyXG4gICAgdG9vbHM6IGNvbW1vbixcclxuICAgIGxvYWQ6IGZ1bmN0aW9uKGFkZE9ucyA9IFtdLCBvcHRpb25zID0ge30pe1xyXG5cclxuICAgIH0sXHJcbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcclxuICAgICAgICByZXR1cm4gZG9tLnNlbGVjdChzZWxlY3RvcilcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbiAodGFnTmFtZSwgaWQsIG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gZG9tLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgaWQsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudE5TOiBmdW5jdGlvbiAodGFnTmFtZSwgaWQsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMuTlMgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBkb20uY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBpZCwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMucmVzZXQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlLnNldFZhbHVlKGtleSwgdmFsdWUsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgc2F2ZUFycmF5OiBmdW5jdGlvbihrZXksIGFyciA9IFtdLCBpZGtleSl7XHJcbiAgICAgICAgaWYoaWRrZXkgIT09IHVuZGVmaW5lZCAmJiBpZGtleSAhPT0gJycgJiYga2V5ICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgY2MudXBkYXRlVmFsdWUoaXRlbVtpZGtleV0sIGl0ZW0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2Muc2V0VmFsdWUoa2V5LCBhcnIpO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZVZhbHVlOiBmdW5jdGlvbihrZXksIHZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlLnNldFZhbHVlKGtleSwgdmFsdWUsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgZ2V0VmFsdWU6ICBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2UuZ2V0VmFsdWUoa2V5KTtcclxuICAgIH0sXHJcbiAgICBzZXRUaW1lcjogZnVuY3Rpb24gKGZuLCBkZWxheSkge1xyXG4gICAgICAgIHJldHVybiByYWYucmVxdWVzdFRpbWVvdXQoZm4sIGRlbGF5KVxyXG4gICAgfSxcclxuICAgIGNhbmNlbFRpbWVyOiBmdW5jdGlvbiAoaGFuZGxlKSB7XHJcbiAgICAgICAgcmFmLmNsZWFyUmVxdWVzdFRpbWVvdXQoaGFuZGxlKTtcclxuICAgIH0sXHJcbiAgICByZXF1ZXN0OiBmdW5jdGlvbiAocGFyYW1zID0ge30pIHtcclxuICAgICAgICByZXR1cm4geGhyLmFqYXgocGFyYW1zKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5pZihJU19XT1JLRVIpe1xyXG4gICAgZGVsZXRlIGNjLnNlbGVjdDtcclxuICAgIGRlbGV0ZSBjYy5jcmVhdGVFbGVtZW50O1xyXG4gICAgZGVsZXRlIGNjLmNyZWF0ZUVsZW1lbnROUztcclxufWVsc2V7XHJcbiAgICBsZXQgbGFzdCA9IDBcclxuICAgIGxldCBmcmFtZVRpY2tlciA9IGZ1bmN0aW9uICh0aW1lc3RhbXApIHtcclxuICAgICAgICBjYy5zZXRWYWx1ZSgnZnJhbWUnLCB0aW1lc3RhbXAsIHtpbW1lZGlhdGVseTogdHJ1ZX0pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGltZXN0YW1wIC0gbGFzdCk7XHJcbiAgICAgICAgbGFzdCA9IHRpbWVzdGFtcDtcclxuICAgICAgICByYWYucmVxdWVzdFRpbWVvdXQoZnJhbWVUaWNrZXIsIDE2KVxyXG4gICAgfTtcclxuICAgIGZyYW1lVGlja2VyKDApO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2M7IiwiY29uc3QgSVNfV09SS0VSID0gc2VsZi53aW5kb3cgPT09IHVuZGVmaW5lZDtcclxuY29uc3QgQ09OVEVYVCA9IElTX1dPUktFUiA/IHNlbGYgOiB3aW5kb3c7XHJcbmNvbnN0IGNvbW1vbiA9IHt9O1xyXG5cclxuY29tbW9uLm9iamVjdGZvckVhY2ggPSBmdW5jdGlvbihvYmosZm4pe1xyXG4gICAgZm9yKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIGZuKG9ialtrZXldLCBrZXksIG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29tbW9uLm9iamVjdEFzc2lnbiA9IGZ1bmN0aW9uKHRhcmdldCwgc291cmNlKXtcclxuICAgIGZvcihsZXQga2V5IGluIHNvdXJjZSkge1xyXG4gICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldDtcclxufTtcclxuXHJcbmNvbW1vbi5jcmVhdGVJZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBmdW5jdGlvbiBzNCgpIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcclxuICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxyXG4gICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xyXG59O1xyXG5cclxuY29tbW9uLmlzT2JqZWN0ID0gZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgIHJldHVybiAoaXRlbSE9PXVuZGVmaW5lZCAmJiBpdGVtID09PSBPYmplY3QoaXRlbSkgJiYgIShpdGVtIGluc3RhbmNlb2YgQXJyYXkpKVxyXG59O1xyXG5cclxuY29tbW9uLmdldEJyb3dzZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCBpc0lFID0gZmFsc2U7XHJcbiAgICBsZXQgaXNDaHJvbWUgPSBmYWxzZTtcclxuICAgIGxldCBpc09wZXJhID0gZmFsc2U7XHJcbiAgICBpZiAoKCEhQ09OVEVYVC5vcHIgJiYgISFvcHIuYWRkb25zKSB8fCAhIUNPTlRFWFQub3BlcmEgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCcgT1BSLycpID49IDApIHtcclxuICAgICAgICBpc09wZXJhID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gJ29wZXJhJztcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgSW5zdGFsbFRyaWdnZXIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuICdmaXJlZm94JztcclxuICAgIH1cclxuICAgIGlmICgvY29uc3RydWN0b3IvaS50ZXN0KENPTlRFWFQuSFRNTEVsZW1lbnQpIHx8IChmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIHJldHVybiBwLnRvU3RyaW5nKCkgPT09IFwiW29iamVjdCBTYWZhcmlSZW1vdGVOb3RpZmljYXRpb25dXCI7XHJcbiAgICB9KSghQ09OVEVYVFsnc2FmYXJpJ10gfHwgc2FmYXJpLnB1c2hOb3RpZmljYXRpb24pKSB7XHJcbiAgICAgICAgcmV0dXJuICdzYWZhcmknO1xyXG4gICAgfVxyXG4gICAgaWYgKGZhbHNlIHx8ICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlKSB7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG91dHB1dCA9IGFyZ3VtZW50c1swXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBhcmd1bWVudHNbaV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0W2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKCEoJ3JlbW92ZScgaW4gRWxlbWVudC5wcm90b3R5cGUpKSB7XHJcbiAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlzSUUgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiAnaWUnO1xyXG4gICAgfVxyXG4gICAgaWYgKCFpc0lFICYmICEhQ09OVEVYVC5TdHlsZU1lZGlhKSB7XHJcbiAgICAgICAgcmV0dXJuICdlZGdlJztcclxuICAgIH1cclxuICAgIGlmICghIUNPTlRFWFQuY2hyb21lICYmICEhQ09OVEVYVC5jaHJvbWUud2Vic3RvcmUpIHtcclxuICAgICAgICBpc0Nocm9tZSA9IHRydWVcclxuICAgICAgICByZXR1cm4gJ2Nocm9tZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoKGlzQ2hyb21lIHx8IGlzT3BlcmEpICYmICEhQ09OVEVYVC5DU1MpIHtcclxuICAgICAgICByZXR1cm4gJ2JsaW5rJztcclxuICAgIH1cclxufTtcclxuXHJcbmNvbW1vbi5yZWFkVmFsdWUgPSBmdW5jdGlvbih2YWx1ZSwgb3B0aW9ucyA9IHt9KXtcclxuICAgIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKXtcclxuICAgICAgICByZXR1cm4gdmFsdWUob3B0aW9ucyk7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tb247IiwiY29uc3QgSVNfV09SS0VSID0gc2VsZi53aW5kb3cgPT09IHVuZGVmaW5lZDtcclxuY29uc3QgQ09OVEVYVCA9IElTX1dPUktFUiA/IHNlbGYgOiB3aW5kb3c7XHJcbnZhciByYWYgPSB7XHJcbiAgICByZXF1ZXN0VGltZW91dDogZnVuY3Rpb24gKGZuLCBkZWxheSkge1xyXG4gICAgICAgIGlmICghQ09OVEVYVC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpXHJcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZuLCBkZWxheSk7XHJcblxyXG4gICAgICAgIHZhciBzdGFydCA9IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIGhhbmRsZSA9IG5ldyBPYmplY3QoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbG9vcCh0aW1lc3RhbXApIHtcclxuICAgICAgICAgICAgKERhdGUubm93KCkgLSBzdGFydCkgPj0gZGVsYXkgPyBmbih0aW1lc3RhbXApIDogaGFuZGxlLnZhbHVlID0gQ09OVEVYVC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaGFuZGxlLnZhbHVlID0gQ09OVEVYVC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZTtcclxuICAgIH0sXHJcbiAgICBjbGVhclJlcXVlc3RUaW1lb3V0OiBmdW5jdGlvbiAoaGFuZGxlKSB7XHJcbiAgICAgICAgQ09OVEVYVC5jYW5jZWxBbmltYXRpb25GcmFtZSA/IENPTlRFWFQuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaGFuZGxlLnZhbHVlKTpjbGVhclRpbWVvdXQoaGFuZGxlKTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJhZjsiLCJpbXBvcnQgY29tbW9uIGZyb20gJy4uL2NvbW1vbi9jb21tb24nXHJcbnZhciBkb20gPSB7XHJcbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcclxuICAgICAgICBpZihzZWxlY3Rvcj09PXVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBfc2VsZWN0b3IgPSBzZWxlY3Rvci5jaGFyQXQoMCk7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBzZWxlY3Rvci5zdWJzdHJpbmcoMSk7XHJcbiAgICAgICAgbGV0IGRvbXMgPSBbXTtcclxuICAgICAgICBzd2l0Y2ggKF9zZWxlY3Rvcil7XHJcbiAgICAgICAgICAgIGNhc2UgJyMnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5hbWUpO1xyXG4gICAgICAgICAgICBjYXNlICcuJzpcclxuICAgICAgICAgICAgICAgIGRvbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKG5hbWUpIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBkb21zID0gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHNlbGVjdG9yKSB8fCBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkb21zO1xyXG4gICAgfSxcclxuICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0YWcsIGlkID0gJycsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xyXG5cclxuICAgICAgICBsZXQgZWxlbWVudElkID0gaWQgfHwgKHRhZyArICdfJyArIGNvbW1vbi5jcmVhdGVJZCgpKTtcclxuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnaWQnLCBlbGVtZW50SWQpO1xyXG5cclxuICAgICAgICBzZXR1cEVsZW1lbnRNZXRob2RzKGVsZW1lbnQsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgIH0sXHJcbn07XHJcblxyXG5mdW5jdGlvbiBzZXR1cEVsZW1lbnRNZXRob2RzKGVsZW1lbnQsIG9wdGlvbnMpIHtcclxuICAgIGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzID0gbmV3IE1hcCgpO1xyXG4gICAgZWxlbWVudC5fYm91bmQgPSBuZXcgTWFwKCk7XHJcblxyXG4gICAgZWxlbWVudC5hZGQgPSBmdW5jdGlvbiAodGFnLCBpZCwgb3B0aW9ucykge1xyXG4gICAgICAgIGxldCBjaGlsZCA9IGRvbS5jcmVhdGVFbGVtZW50KHRhZywgaWQsIG9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZEVsZW1lbnQoY2hpbGQpO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmFkZEVsZW1lbnQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICAgICAgICByZXR1cm4gY2hpbGRcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5hZGRDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5nZXRBdHRyID0gZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KTtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5hdHRyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zZXRFbGVtZW50KCdhdHRyJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuZ2V0RGF0YSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5kYXRhID0gZnVuY3Rpb24oYW55KXtcclxuICAgICAgICB0aGlzLl9kYXRhID0gYW55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmdldFByb3AgPSBmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50W2tleV07XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQucHJvcCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudCgncHJvcCcsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmNzcyA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xyXG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnQoJ2NzcycsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmJpbmQgPSBmdW5jdGlvbihrZXksIGZuKXtcclxuICAgICAgICBpZihrZXkpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLl9ib3VuZC5zZXQoa2V5LCBmbik7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnc3RvcmFnZV8nICsga2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgZWxlbWVudC51bmJpbmQgPSBmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9ib3VuZC5kZWxldGUoa2V5KTtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ3N0b3JhZ2VfJyArIGtleSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuX3JlYWN0ID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XHJcbiAgICAgICAgbGV0IGZuID0gdGhpcy5fYm91bmQuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYoZm4pe1xyXG4gICAgICAgICAgICBpZihmbi5jYWxsKHRoaXMsIHZhbHVlLCB0aGlzLl9kYXRhKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmQoa2V5KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50Lm9uICA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZm4sIHRhZyA9ICcnKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGV2ZW50VGFnID0gZXZlbnROYW1lICsgdGFnO1xyXG4gICAgICAgIGxldCBldmVudEhhbmRsZXIgPSBlbGVtZW50Ll9ldmVudExpc3RlbmVycy5nZXQoZXZlbnRUYWcpO1xyXG4gICAgICAgIGlmKGV2ZW50SGFuZGxlcil7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzLmRlbGV0ZShldmVudFRhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGZuKSB7XHJcbiAgICAgICAgICAgIGV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZihmbi5jYWxsKHNlbGYsIGUsIHNlbGYuX2RhdGEpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuc2V0KGV2ZW50VGFnLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuY29udGVudCA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICB0aGlzLmlubmVyVGV4dCA9IHN0cjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5yZW1vdmVTZWxmID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgaWYodGhpcy5yZW1vdmUpe1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQucmVtb3ZlQWxsQ2hpbGRyZW4gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5fc2V0RWxlbWVudCA9IGZ1bmN0aW9uKHR5cGUsIGtleSAsIHZhbHVlKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgY29tbW9uLm9iamVjdGZvckVhY2goa2V5ICxmdW5jdGlvbiAoaXRlbSwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmW3R5cGVdKGtleSwgaXRlbSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHYgPSBjb21tb24ucmVhZFZhbHVlKHZhbHVlKTtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3AnOlxyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dHInOlxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKGtleSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjc3MnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZVtrZXldID0gIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnQuaXNJblZpZXdwb3J0ID0gZnVuY3Rpb24gKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGxldCBvZmZzZXRYID0gb3B0aW9ucy5vZmZzZXRYIHx8IDA7XHJcbiAgICAgICAgbGV0IG9mZnNldFkgPSBvcHRpb25zLm9mZnNldFkgfHwgMDtcclxuICAgICAgICBsZXQge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgLy9JRSBub3Qgc3VwcG9ydCBib3R0b20gcmlnaHRcclxuICAgICAgICBsZXQgeDIgPSB4ICsgd2lkdGg7XHJcbiAgICAgICAgbGV0IHkyID0geSArIGhlaWdodDtcclxuICAgICAgICBsZXQgaW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGxldCBpbm5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICByZXR1cm4gISh4MiA8PSAoMCArIG9mZnNldFgpfHwgeCA+PSAoaW5uZXJXaWR0aCAtIG9mZnNldFgpIHx8IHkyIDw9ICgwICsgb2Zmc2V0WSkgfHwgeSA+PSAoaW5uZXJIZWlnaHQgLSBvZmZzZXRZKSlcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRvbTsiLCJpbXBvcnQgY29tbW9uIGZyb20gJy4uL2NvbW1vbi9jb21tb24nO1xyXG5cclxudmFyIHN0b3JhZ2UgPSB7XHJcbiAgICBkYXRhTWFwOiBuZXcgTWFwKCksXHJcbiAgICB0aW1lck1hcDogIG5ldyBNYXAoKSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBkYXRhTWFwID0gdGhpcy5kYXRhTWFwO1xyXG4gICAgICAgIGxldCB7cmVzZXR9ID0gb3B0aW9ucztcclxuICAgICAgICBsZXQgc2hvdWxkUmVhY3QgPSBmYWxzZTtcclxuICAgICAgICBsZXQgb2xkVmFsdWUgPSBkYXRhTWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmKGNvbW1vbi5pc09iamVjdCh2YWx1ZSkgJiYgY29tbW9uLmlzT2JqZWN0KG9sZFZhbHVlKSAmJiByZXNldCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjb21tb24ub2JqZWN0Zm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gKGl0ZW0sIGtleSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG91bGRSZWFjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHZhbHVlW2tleV1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBzaG91bGRSZWFjdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGRhdGFNYXAuc2V0KGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gZGF0YU1hcC5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgaWYoc2hvdWxkUmVhY3QpIHtcclxuICAgICAgICAgICB0aGlzLmJyb2FkY2FzdChrZXksIG5ld1ZhbHVlLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdWYWx1ZTtcclxuICAgIH0sXHJcbiAgICBicm9hZGNhc3Q6IGZ1bmN0aW9uKGtleSwgbmV3VmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB0aW1lciA9IHRoaXMudGltZXJNYXAuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIGlmICh0aW1lcikge1xyXG4gICAgICAgICAgICBjYy5jYW5jZWxUaW1lcih0aW1lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aW1lciA9IGNjLnNldFRpbWVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGRvbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzdG9yYWdlXycgKyBrZXkpIHx8IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkb20gPSBkb21zW2ldO1xyXG4gICAgICAgICAgICAgICAgZG9tLl9yZWFjdCAmJiBkb20uX3JlYWN0KGtleSwgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYudGltZXJNYXAuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgfSwgb3B0aW9ucy5pbW1lZGlhdGVseT8gMDogMTApO1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVyTWFwLnNldChrZXksIHRpbWVyKTtcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFNYXAuZ2V0KGtleSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdG9yYWdlOyIsImNvbnN0IHhociA9IHtcclxuICAgIGFqYXg6IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xyXG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBsZXQge3VybCwgbWV0aG9kLCBkYXRhLCBhc3luYywgeGhyLCBjb250ZW50VHlwZSwgZGF0YVR5cGUsIGRvbmUsIGZhaWx9ID0gcGFyYW1zIHx8IHt9O1xyXG4gICAgICAgICAgICBsZXQge2hlYWRlciwgb25Qcm9ncmVzcywgYmVmb3JlU2VuZH0gPSBwYXJhbXM7XHJcbiAgICAgICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub3BlbigobWV0aG9kIHx8ICdHRVQnKSwgdXJsLCBhc3luYyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFzeW5jKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiAoaGVhZGVyIHx8IHt9KSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKChoZWFkZXIgfHwge30pLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY2MuZ2V0VmFsdWUoJ0F1dGhvcml6YXRpb24nKSl7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBjYy5nZXRWYWx1ZSgnQXV0aG9yaXphdGlvbicpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkb25lICYmIGRvbmUocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbCAmJiBmYWlsKHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCksIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwgJiYgZmFpbChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3QudXBsb2FkLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHAgPSBNYXRoLmZsb29yKGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBvblByb2dyZXNzICYmIG9uUHJvZ3Jlc3MocCwgZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgX2RhdGE7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIF9kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2pzb24nOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlID09PSB1bmRlZmluZWQgPyBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiA6IGNvbnRlbnRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kICYmIGJlZm9yZVNlbmQocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0LnNlbmQoX2RhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5mdW5jdGlvbiBwYXJzZURhdGEoZGF0YSkge1xyXG4gICAgdHJ5e1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEgfHwgJycpXHJcbiAgICB9Y2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHhocjtcclxuIiwiaW1wb3J0IGNjIGZyb20gJy4vY2Nqcy9jYyc7XHJcbmltcG9ydCBhbmFseXNlciBmcm9tICcuL2FuYWx5c2VyJztcclxuY29uc3QgV0hJVEUgPSAncmdiYSgyNTUsMjU1LDI1NSwgMC43KSc7XHJcbmNvbnN0IEJMQUNLID0gJ3JnYmEoMCwwLDAsIDAuOSknO1xyXG5jb25zdCBSRUQgPSAnI2Q2MzAzMSc7XHJcblxyXG5jYy5zZXRWYWx1ZSgndmlld3BvcnQnLCB7d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodH0pO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY2MudXBkYXRlVmFsdWUoJ3ZpZXdwb3J0Jywge3dpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHR9KTtcclxufSk7XHJcbmZ1bmN0aW9uIGluZGV4KCkge1xyXG4gICAgbGV0IHJvb3QgPSBjYy5zZWxlY3QoJyNib2R5Jyk7XHJcbiAgICBsZXQgbWFpbkNvbnRhaW5lciA9IGNjLmNyZWF0ZUVsZW1lbnQoJ2RpdicsICd0ZXN0JylcclxuICAgICAgICAuYWRkQ2xhc3MoJ21haW4tY29udGFpbmVyJyk7XHJcblxyXG4gICAgcm9vdC5hcHBlbmRDaGlsZChtYWluQ29udGFpbmVyKTtcclxuICAgIGxldCBjb250YWluZXIgPSBtYWluQ29udGFpbmVyLmFkZCgnZGl2JylcclxuXHJcbiAgICBsZXQgaGVhZGVyID0gY29udGFpbmVyLmFkZCgnZGl2JywgJ2hlYWRlcicpXHJcbiAgICAgICAgLmFkZENsYXNzKCdoZWFkZXInKTtcclxuICAgIGxldCBoZWFkZXJMZWZ0ID0gaGVhZGVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgIG1pbldpZHRoOiAnMjU2cHgnXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgbG9nbyA9IGhlYWRlckxlZnQuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jb250ZW50KCdBJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2JhY2tncm91bmQtcmVkJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2ZvbnQtYmxhY2snKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzY0cHgnLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAnMCAxNnB4JyxcclxuICAgICAgICAgICAgbGluZUhlaWdodDogJzU0cHgnLFxyXG4gICAgICAgICAgICBtYXJnaW5SaWdodDogJzRweCcsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICBib3hTaGFkb3c6IFJFRCArICcgMCAwIDEwcHgnLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBuYW1lQ29udGFpbmVyID0gaGVhZGVyTGVmdC5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXHJcbiAgICAgICAgfSk7XHJcbiAgICBuYW1lQ29udGFpbmVyLmFkZCgnc3BhbicpXHJcbiAgICAgICAgLmNvbnRlbnQoJ05YSU4gWUFORycpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXHJcbiAgICAgICAgfSk7XHJcbiAgICBuYW1lQ29udGFpbmVyLmFkZCgnc3BhbicpXHJcbiAgICAgICAgLmNvbnRlbnQoJ0Zyb250LUVuZCBEZXZlbG9wZXInKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgbWVudSA9IGhlYWRlci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICB9KTtcclxuICAgIGxldCBtZW51TGlzdCA9IFsnZmEtbGlua2VkaW4nLCAnZmEtZ2l0aHViJ107XHJcbiAgICBsZXQgbGlua3MgPSBbJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9hbnhpbi15YW5nLTcwNzAyOTEyNS8nLCAnaHR0cHM6Ly9naXRodWIuY29tL0FueGluWWFuZyddO1xyXG4gICAgbGV0IGhvdmVyQ29sb3JzID0gWycjMDA3N0I1JywgJ3JnYmEoMjU1LDAsODAsIDAuOCknXTtcclxuICAgIG1lbnVMaXN0LmZvckVhY2goZnVuY3Rpb24gKHRhZywgaWR4KSB7XHJcbiAgICAgICAgbWVudS5hZGQoJ2knKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhYicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhtZW51TGlzdFtpZHhdKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzU0cHgnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0U2hhZG93OiAnIDAgMCA1cHgnLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJzAuM3MnLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcxNnB4J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lm9wZW4obGlua3NbaWR4XSwgJ19ibGFuaycpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbignbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogaG92ZXJDb2xvcnNbaWR4XSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sICdzdHlsZScpXHJcbiAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJycsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LCAnc3R5bGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBtYWluQ29udGVudENvbnRhaW5lciA9IGNjLmNyZWF0ZUVsZW1lbnQoJ2RpdicsICdtYWluX2NvbnRlbnQnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBoZWlnaHQ6ICdjYWxjKDEwMHZoIC0gMTA0cHgpJyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzAgMTIuNSUnLFxyXG4gICAgICAgICAgICBjb2xvcjogV0hJVEUsXHJcbiAgICAgICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgICAgICAgICAgekluZGV4OiA1LFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nXHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJYID0gd2luZG93LmlubmVyV2lkdGggLyAyO1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIGxldCBtb3VzZVggPSBlLmNsaWVudFg7XHJcbiAgICAgICAgICAgIGxldCBtb3VzZVkgPSBlLmNsaWVudFk7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgnICsgKC0obW91c2VYIC0gY2VudGVyWCkgLyAxMDApICsgJ3B4LCcgKyAoLShtb3VzZVkgLSBjZW50ZXJZKSAvIDEwMCkgKyAncHgpJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5iaW5kKCdmcmFtZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGRvbXMgPSBjYy5zZWxlY3QoJy5mYWRlJyk7XHJcbiAgICAgICAgICAgIGlmKGRvbXMubGVuZ3RoPT09MCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZCgnZnJhbWUnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9tcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRvbSA9IGRvbXNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgaXNJblZpZXdQb3J0ID0gZG9tLmlzSW5WaWV3cG9ydCh7b2Zmc2V0WTogMTUwfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3BhY2l0eSA9ICtkb20uc3R5bGUub3BhY2l0eTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0luVmlld1BvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb20uYWRkQ2xhc3MoJ3NsaWRlLWluLWJvdHRvbScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5yZW1vdmVDbGFzcygnZmFkZS1vdXQnKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoJ3NsaWRlLWluLWJvdHRvbScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5hZGRDbGFzcygnZmFkZS1vdXQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGxhbmRpbmdDb250YWluZXIgPSBtYWluQ29udGVudENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGhlaWdodDogJ2NhbGMoMTAwdmggLSAxMDRweCknXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgaGlnaExpZ2h0ID0gbGFuZGluZ0NvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNvbnRlbnQoXCJMZXQncyBtYWtlIGRhdGEgYWxpdmVcIilcclxuICAgICAgICAuYWRkQ2xhc3MoJ2ZhZGUnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBjb2xvcjogV0hJVEUsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgZm9udFNpemU6ICc0OHB4JyxcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnY2FsYyg1MHZoIC0gMTUycHgpJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGludHJvID0gbGFuZGluZ0NvbnRhaW5lci5hZGQoJ3AnKVxyXG4gICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgLmNvbnRlbnQoXCJJJ20gYSBmcm9udC1lbmQgZGV2ZWxvcGVyIGZyb20gQmF5IEFyZWEsIENhbGlmb3JuaWEsIGFuZCBjdXJyZW50bHkgbGl2aW5nIGluIFNhbiBKb3NlLiBJIGVuam95IGJ1aWxkaW5nIHJpY2ggXCIgK1xyXG4gICAgICAgICAgICBcImludGVyYWN0aXZlIHdlYnNpdGVzIGFuZCB3ZWIgYXBwcyBmcm9tIHNtYWxsIHRvIGxhcmdlLiBcIilcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcyMHB4JyxcclxuICAgICAgICB9KTtcclxuICAgIGxldCBwbGF5ZXIgPSBsYW5kaW5nQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzY0cHgnLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAuYWRkKCdpJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2ZhcicpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmYS1wbGF5LWNpcmNsZScpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdyZ2JhKDI1NSwwLDgwLCAwLjgpJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcGxheWVyV2Fybi5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJydcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAnJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcGxheWVyV2Fybi5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYoY2MuZ2V0VmFsdWUoJ3BsYXknKSl7XHJcbiAgICAgICAgICAgICAgICBjYy5zZXRWYWx1ZSgncGxheScsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2ZhLXBhdXNlLWNpcmNsZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzcygnZmEtcGxheS1jaXJjbGUnKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBjYy5zZXRWYWx1ZSgncGxheScsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzcygnZmEtcGF1c2UtY2lyY2xlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdmYS1wbGF5LWNpcmNsZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgcGxheWVyV2FybiA9IGxhbmRpbmdDb250YWluZXIuYWRkKCdwJylcclxuICAgICAgICAuY29udGVudCgnV2F0Y2ggeW91IHZvbHVtZSA6KScpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIHRleHRBbGlnbjonY2VudGVyJyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxyXG4gICAgICAgICAgICBjb2xvcjoncmdiYSgyNTUsMCw4MCwgMC44KSdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgc2tpbGxDb250YWluZXIgPSBtYWluQ29udGVudENvbnRhaW5lci5hZGQoJ2RpdicpO1xyXG4gICAgbGV0IHNraWxsVGl0bGUgPSBza2lsbENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNvbnRlbnQoXCJTa2lsbHNcIilcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnNDhweCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzI1NnB4J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBza2lsbENhcmRDb250YWluZXIgPSBza2lsbENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnMTI4cHgnLFxyXG4gICAgICAgICAgICBmbGV4V3JhcDogJ3dyYXAnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IHNraWxscyA9IFsnZmEtaHRtbDUnLCAnZmEtanMnLCAnZmEtY3NzMy1hbHQnLCAnZmEtcmVhY3QnLCAnZmEtbm9kZS1qcycsJ2ZhLXNhc3MnXTtcclxuICAgIGxldCBza2lsbE5hbWVzID0gWydIVE1MNScsICdKYXZhc2NyaXB0JywgJ0NTUzMnLCAnUmVhY3QnLCAnTm9kZUpTJywgJ1NBU1MnXTtcclxuICAgIGxldCBza2lsbENvbG9ycyA9IFsnI2U0NGQyNicsICcjZWVhZjRiJywgJyMwMDcwYmEnLCAnIzYxZGFmYicsICcjN2NiNzAwJywnI2M2OSddO1xyXG4gICAgc2tpbGxzLmZvckVhY2goZnVuY3Rpb24gKGljb24sIGlkeCkge1xyXG4gICAgICAgIGxldCBjYXJkID0gc2tpbGxDYXJkQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYWRlJylcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBtaW5XaWR0aDogJzMwMHB4JyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBmbGV4R3JvdzogMSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGxvZ28gPSBjYXJkLmFkZCgnaScpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFiJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKGljb24pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcyNTZweCcsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHNraWxsQ29sb3JzW2lkeF0sXHJcbiAgICAgICAgICAgICAgICB0ZXh0U2hhZG93OiBza2lsbENvbG9yc1tpZHhdICsgJyAwIDAgMTBweCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBjYXJkLmFkZCgncCcpXHJcbiAgICAgICAgICAgIC5jb250ZW50KHNraWxsTmFtZXNbaWR4XSlcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBza2lsbENvbG9yc1tpZHhdLFxyXG4gICAgICAgICAgICAgICAgdGV4dFNoYWRvdzogc2tpbGxDb2xvcnNbaWR4XSArICcgMCAwIDEwcHgnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgY2FyZWVyQ29udGFpbmVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdkaXYnKTtcclxuICAgIGxldCBjYXJlZXJUaXRsZSA9IHNraWxsQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY29udGVudChcIkNhcmVlclwiKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBjb2xvcjogV0hJVEUsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgZm9udFNpemU6ICc0OHB4JyxcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnMTI4cHgnLFxyXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc2NHB4JyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgY29tcGFuaWVzID0gWyduZXRFbGFzdGljIFN5c3RlbXMsIEluYy4nLCAnU2FuIEZyYW5jaXNjbyBTdGF0ZSBVbml2ZXJzaXR5JywgJ1NoYW5naGFpIFVuaXZlcnNpdHknXTtcclxuICAgIGxldCB0aXRsZXMgPSBbJ1NvZnR3YXJlIEVuZ2luZWVyJywgJ0JTIC0gQ29tcHV0ZXIgRW5naW5lZXJpbmcgU3R1ZGVudCcsICdBUyAtIENvbXB1dGVyIEFwcGxpY2F0aW9uIFRlY2hub2xvZ3kgU3R1ZGVudCddO1xyXG4gICAgbGV0IHRpbWVMaW5lcyA9IFsnMjAxNyAtIEN1cnJlbnQnLCAnMjAxMyAtIDIwMTcnLCAnMjAwOSAtIDIwMTMnXTtcclxuICAgIGxldCBwcm9qZWN0cyA9IHtcclxuICAgICAgICAnbmV0RWxhc3RpYyBTeXN0ZW1zLCBJbmMuJzogWyd2Qk5HIE1hbmFnZW1lbnQgU3lzdGVtIChVSSBMZWFkKScsICdTRC1XQU4gTWFuYWdlbWVudCBTeXN0ZW0gKFVJIFRlYW0gTWVtYmVyKScsXVxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wYW5pZXMuZm9yRWFjaChmdW5jdGlvbiAoY29tcGFueU5hbWUsIGlkeCkge1xyXG4gICAgICAgIGxldCBjYXJkID0gY2FyZWVyQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYWRlJylcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnNjRweCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGNvbXBhbnkgPSBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmNvbnRlbnQoY29tcGFueU5hbWUpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGZvbnRTaXplID0gJzIwcHgnO1xyXG4gICAgICAgIGxldCB0aXRsZSA9IGNhcmQuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAuY29udGVudCh0aXRsZXNbaWR4XSlcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemUsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdGltZUxpbmUgPSBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmNvbnRlbnQodGltZUxpbmVzW2lkeF0pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAocHJvamVjdHNbY29tcGFueU5hbWVdIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9qZWN0KSB7XHJcbiAgICAgICAgICAgIGNhcmQuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAgICAgLmNvbnRlbnQocHJvamVjdClcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBmb290ZXIgPSBtYWluQ29udGVudENvbnRhaW5lci5hZGQoJ3AnKVxyXG4gICAgICAgIC5jb250ZW50KCdQb3dlcmVkIGJ5IGNjSlMsIGEgc2VsZi1pbXBsZW1lbnRlZCBKYXZhc2NyaXB0IExpYnJhcnkuJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnMTI4cHgnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IGZvb3RTaGFkb3cgPSBjb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgYm90dG9tOiAwLFxyXG4gICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICB6SW5kZXg6IDEwLFxyXG4gICAgICAgICAgICAvL2JveFNoYWRvdzogJ3JnYmEoMjU1LCAwLCA4MCwgMC44KSAwcHggMHB4IDUwcHggMnB4J1xyXG4gICAgICAgIH0pO1xyXG4gICAgYW5hbHlzZXIoZm9vdFNoYWRvdyk7XHJcbiAgICBsZXQgY29kZUJhY2tncm91bmRUZXh0ID0gaW5kZXgudG9TdHJpbmcoKTtcclxuICAgIGxldCBjb2x1bW5XaWR0aCA9IE1hdGgubWluKDQwMCAsIHdpbmRvdy5pbm5lcldpZHRoIC0gMTI4KTtcclxuICAgIGxldCBjb2x1bW5Db3VudCA9IE1hdGgubWluKDIsIE1hdGguZmxvb3Iod2luZG93LmlubmVyV2lkdGgvKGNvbHVtbldpZHRoKSkpO1xyXG4gICAgbGV0IGNvZGVCYWNrZ3JvdW5kID0gY29udGFpbmVyLmFkZCgncHJlJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2NydFRleHQnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdsZWZ0JyxcclxuICAgICAgICAgICAgdG9wOiAnMTI4cHgnLFxyXG4gICAgICAgICAgICBsZWZ0OiAnNjRweCcsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxyXG4gICAgICAgICAgICBjb2xvcjogJ3JnYmEoMjU1LDI1NSwyNTUsIDAuMDYpJyxcclxuICAgICAgICAgICAgekluZGV4OiAwLFxyXG4gICAgICAgICAgICBjb2x1bW5Db3VudDogY29sdW1uQ291bnQsXHJcbiAgICAgICAgICAgIGNvbHVtbldpZHRoOiBjb2x1bW5XaWR0aCArICdweCcsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnY2FsYygxMDB2dyAtIDEyOHB4KScsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZGF0YSh7XHJcbiAgICAgICAgICAgIGNvdW50ZXI6IDAsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYmluZCgnZnJhbWUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCB7Y291bnRlciwgc3RyfSA9IHRoaXMuZ2V0RGF0YSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKCcgKyAoLW1haW5Db250ZW50Q29udGFpbmVyLnNjcm9sbFRvcC82KSArICdweCknXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb3VudGVyKz00O1xyXG4gICAgICAgICAgICBpZihjb3VudGVyID49IGNvZGVCYWNrZ3JvdW5kVGV4dC5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgLy9jb3VudGVyID0gY29kZUJhY2tncm91bmRUZXh0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclRleHQgPSBjb2RlQmFja2dyb3VuZFRleHQuc3Vic3RyaW5nKDAsIGNvdW50ZXIpICsgJ18nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSh7Y291bnRlcjogY291bnRlcn0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYmluZCgndmlld3BvcnQnLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICBsZXQge2hlaWdodCwgd2lkdGh9ID0gZDtcclxuICAgICAgICAgICAgbGV0IGNvbHVtbldpZHRoID0gTWF0aC5taW4oNDAwICwgd2lkdGggLSAxMjgpO1xyXG4gICAgICAgICAgICBsZXQgY29sdW1uQ291bnQgPSBNYXRoLm1pbigyLCBNYXRoLmZsb29yKHdpZHRoLyhjb2x1bW5XaWR0aCkpKTtcclxuICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uQ291bnQ6IGNvbHVtbkNvdW50LFxyXG4gICAgICAgICAgICAgICAgY29sdW1uV2lkdGg6IGNvbHVtbldpZHRoICsgJ3B4JyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgbWFpbkNvbnRhaW5lci5hZGRFbGVtZW50KGNvbnRhaW5lcik7XHJcbiAgICBjb250YWluZXIuYWRkRWxlbWVudChoZWFkZXIpO1xyXG4gICAgY29udGFpbmVyLmFkZEVsZW1lbnQobWFpbkNvbnRlbnRDb250YWluZXIpO1xyXG59XHJcbmluZGV4KCk7Il0sInNvdXJjZVJvb3QiOiIifQ==