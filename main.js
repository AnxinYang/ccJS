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
    gradient.addColorStop(1, "rgba(255,0,80,1)");

    // Create a new instance of an audio object and adjust some of its properties
    var audio = new Audio();
    audio.src = './res/Bohemian Rhapsody.aac';
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
            ctx.fillRect(bar_x, canvas.height, bar_width, bar_height < -70 ? bar_height : bar_height * 0.9);
            if (bar_height < -70) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuYWx5c2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2NjLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2NvbW1vbi9jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY29tbW9uL3JhZi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy9kb20vZG9tLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL3N0b3JhZ2Uvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy94aHIveGhyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJjYW52YXMiLCJjdHgiLCJzb3VyY2UiLCJjb250ZXh0IiwiYW5hbHlzZXIiLCJmYmNfYXJyYXkiLCJiYXJzIiwiYmFyX3giLCJiYXJfd2lkdGgiLCJiYXJfaGVpZ2h0IiwiaXNJbml0IiwiaGVpZ2h0Iiwid2lkdGgiLCJwb2ludGVyRXZlbnRzIiwiYXVkaW8iLCJncmFkaWVudCIsImZyYW1lTG9vcGVyIiwid2luZG93IiwiaSIsImdyYWRpZW50SGl0IiwiSVNfV09SS0VSIiwic2VsZiIsIkNPTlRFWFQiLCJjYyIsInRvb2xzIiwiY29tbW9uIiwibG9hZCIsImFkZE9ucyIsIm9wdGlvbnMiLCJzZWxlY3QiLCJkb20iLCJjcmVhdGVFbGVtZW50IiwiY3JlYXRlRWxlbWVudE5TIiwic2V0VmFsdWUiLCJzdG9yYWdlIiwic2F2ZUFycmF5IiwiYXJyIiwiaWRrZXkiLCJrZXkiLCJpdGVtIiwidXBkYXRlVmFsdWUiLCJnZXRWYWx1ZSIsInNldFRpbWVyIiwicmFmIiwiY2FuY2VsVGltZXIiLCJyZXF1ZXN0IiwicGFyYW1zIiwieGhyIiwibGFzdCIsImZyYW1lVGlja2VyIiwiaW1tZWRpYXRlbHkiLCJvYmoiLCJmbiIsInRhcmdldCIsIk1hdGgiLCJzNCIsIk9iamVjdCIsImlzSUUiLCJpc0Nocm9tZSIsImlzT3BlcmEiLCJvcHIiLCJuYXZpZ2F0b3IiLCJwIiwic2FmYXJpIiwiZG9jdW1lbnQiLCJvdXRwdXQiLCJhcmd1bWVudHMiLCJFbGVtZW50IiwidmFsdWUiLCJyZXF1ZXN0VGltZW91dCIsInNldFRpbWVvdXQiLCJzdGFydCIsIkRhdGUiLCJoYW5kbGUiLCJjbGVhclJlcXVlc3RUaW1lb3V0IiwiY2xlYXJUaW1lb3V0Iiwic2VsZWN0b3IiLCJfc2VsZWN0b3IiLCJuYW1lIiwiZG9tcyIsImlkIiwiZWxlbWVudCIsImVsZW1lbnRJZCIsInRhZyIsInNldHVwRWxlbWVudE1ldGhvZHMiLCJjaGlsZCIsImV2ZW50VGFnIiwiZXZlbnROYW1lIiwiZXZlbnRIYW5kbGVyIiwidiIsIm9mZnNldFgiLCJvZmZzZXRZIiwieDIiLCJ4IiwieTIiLCJ5IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiZGF0YU1hcCIsInRpbWVyTWFwIiwic2hvdWxkUmVhY3QiLCJvbGRWYWx1ZSIsInJlc2V0IiwibmV3VmFsdWUiLCJicm9hZGNhc3QiLCJ0aW1lciIsImFqYXgiLCJwcm9taXNlIiwibWV0aG9kIiwiYXN5bmMiLCJoZWFkZXIiLCJkb25lIiwicGFyc2VEYXRhIiwicmVzb2x2ZSIsImZhaWwiLCJyZWplY3QiLCJlIiwib25Qcm9ncmVzcyIsIl9kYXRhIiwiY29udGVudFR5cGUiLCJKU09OIiwiYmVmb3JlU2VuZCIsImRhdGEiLCJXSElURSIsIkJMQUNLIiwiUkVEIiwicm9vdCIsIm1haW5Db250YWluZXIiLCJjb250YWluZXIiLCJoZWFkZXJMZWZ0IiwiZGlzcGxheSIsIm1pbldpZHRoIiwibG9nbyIsImZvbnRTaXplIiwicGFkZGluZyIsImxpbmVIZWlnaHQiLCJtYXJnaW5SaWdodCIsImJveFNoYWRvdyIsIm5hbWVDb250YWluZXIiLCJtZW51IiwibWVudUxpc3QiLCJsaW5rcyIsImhvdmVyQ29sb3JzIiwiY3Vyc29yIiwidGV4dEFsaWduIiwidGV4dFNoYWRvdyIsInRyYW5zaXRpb24iLCJjb2xvciIsIm1haW5Db250ZW50Q29udGFpbmVyIiwib3ZlcmZsb3dZIiwicG9zaXRpb24iLCJ6SW5kZXgiLCJmbGV4RGlyZWN0aW9uIiwiY2VudGVyWCIsImNlbnRlclkiLCJtb3VzZVgiLCJtb3VzZVkiLCJ0cmFuc2Zvcm0iLCJpc0luVmlld1BvcnQiLCJvcGFjaXR5IiwibGFuZGluZ0NvbnRhaW5lciIsImhpZ2hMaWdodCIsImZvbnRXZWlnaHQiLCJtYXJnaW5Ub3AiLCJpbnRybyIsInBsYXllciIsInBsYXllcldhcm4iLCJza2lsbENvbnRhaW5lciIsInNraWxsVGl0bGUiLCJza2lsbENhcmRDb250YWluZXIiLCJqdXN0aWZ5Q29udGVudCIsImZsZXhXcmFwIiwic2tpbGxzIiwic2tpbGxOYW1lcyIsInNraWxsQ29sb3JzIiwiY2FyZCIsImZsZXhHcm93IiwiY2FyZWVyQ29udGFpbmVyIiwiY2FyZWVyVGl0bGUiLCJtYXJnaW5Cb3R0b20iLCJjb21wYW5pZXMiLCJ0aXRsZXMiLCJ0aW1lTGluZXMiLCJwcm9qZWN0cyIsImNvbXBhbnkiLCJ0aXRsZSIsInRpbWVMaW5lIiwiZm9vdGVyIiwiZm9vdFNoYWRvdyIsImJvdHRvbSIsImxlZnQiLCJjb2RlQmFja2dyb3VuZFRleHQiLCJpbmRleCIsImNvbHVtbldpZHRoIiwiY29sdW1uQ291bnQiLCJjb2RlQmFja2dyb3VuZCIsInRvcCIsImNvdW50ZXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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T0FBVSxFQUFWO0FBN0JhLHdCQStCQyxhQUFhO0FBQUE7QUFBQTs7QUFFM0IsWUFBSUosY0FBYzNJLGNBQWUxQyxRQUFqQyxHQUFrQjBDLENBQWxCO0FBQ0EsWUFBSTRJLGNBQWM1SSxZQUFZQSxXQUFXMUMsUUFBekMsV0FBOEIwQyxDQUFaQSxDQUFsQjtBQUNBLGlCQUFTO0FBQ0w0SSx5QkFESztBQUVMRCx5QkFBYUEsY0FBYztBQUZ0QixTQUFUO0FBbkNSLEtBQXFCLENBQXJCOztBQTBDQWxFO0FBQ0FDO0FBQ0FBO0FBQ0g7QUFDRGdFLFEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiZnVuY3Rpb24gYW5hbHlzZXIoQ29udGFpbmVyKSB7XHJcbiAgICAvLyBFc3RhYmxpc2ggYWxsIHZhcmlhYmxlcyB0aGF0IHlvdXIgQW5hbHlzZXIgd2lsbCB1c2VcclxuICAgIGxldCBjYW52YXMsIGN0eCwgc291cmNlLCBjb250ZXh0LCBhbmFseXNlciwgZmJjX2FycmF5LCBiYXJzLCBiYXJfeCwgYmFyX3dpZHRoLCBiYXJfaGVpZ2h0LCBpc0luaXQ7XHJcbiAgICBjYW52YXMgPSBDb250YWluZXIuYWRkKCdjYW52YXMnKVxyXG4gICAgICAgIC5hdHRyKHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAxMDBcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDBweCcsXHJcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICAgJ25vbmUnLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ3BsYXknLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICBpZihkKXtcclxuICAgICAgICAgICAgICAgIGlzSW5pdCA9IGlzSW5pdD90cnVlOmluaXRNcDNQbGF5ZXIoKTtcclxuICAgICAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXVkaW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICBsZXQgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgMTAwKTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcInJnYmEoMjU1LDAsODAsMC4xKVwiKTtcclxuICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBcInJnYmEoMjU1LDAsODAsMSlcIik7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIGFuIGF1ZGlvIG9iamVjdCBhbmQgYWRqdXN0IHNvbWUgb2YgaXRzIHByb3BlcnRpZXNcclxuICAgIGxldCBhdWRpbyA9IG5ldyBBdWRpbygpO1xyXG4gICAgYXVkaW8uc3JjID0gJy4vcmVzL0JvaGVtaWFuIFJoYXBzb2R5LmFhYyc7XHJcbiAgICBhdWRpby5jb250cm9scyA9IHRydWU7XHJcbiAgICBhdWRpby5sb29wID0gdHJ1ZTtcclxuICAgIGF1ZGlvLmF1dG9wbGF5ID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdE1wM1BsYXllcigpIHtcclxuICAgICAgICAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdWRpb19ib3gnKS5hcHBlbmRDaGlsZChhdWRpbyk7XHJcbiAgICAgICAgY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTsgLy8gQXVkaW9Db250ZXh0IG9iamVjdCBpbnN0YW5jZVxyXG4gICAgICAgIGFuYWx5c2VyID0gY29udGV4dC5jcmVhdGVBbmFseXNlcigpOyAvLyBBbmFseXNlck5vZGUgbWV0aG9kXHJcbiAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgLy8gUmUtcm91dGUgYXVkaW8gcGxheWJhY2sgaW50byB0aGUgcHJvY2Vzc2luZyBncmFwaCBvZiB0aGUgQXVkaW9Db250ZXh0XHJcbiAgICAgICAgc291cmNlID0gY29udGV4dC5jcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UoYXVkaW8pO1xyXG4gICAgICAgIHNvdXJjZS5jb25uZWN0KGFuYWx5c2VyKTtcclxuICAgICAgICBhbmFseXNlci5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgICAgIGZyYW1lTG9vcGVyKCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZnJhbWVMb29wZXIoKSB7XHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmcmFtZUxvb3Blcik7XHJcbiAgICAgICAgZmJjX2FycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQpO1xyXG4gICAgICAgIGFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKGZiY19hcnJheSk7XHJcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpOyAvLyBDbGVhciB0aGUgY2FudmFzXHJcbiAgICAgICAgLy9iYXJzID0gMTAwMDtcclxuICAgICAgICBiYXJfd2lkdGggPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLyAoZmJjX2FycmF5Lmxlbmd0aCAqIDMpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmJjX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGJhcl94ID0gaTtcclxuICAgICAgICAgICAgYmFyX2hlaWdodCA9IC0oZmJjX2FycmF5W2ldKmNhbnZhcy5oZWlnaHQvMjU1KTtcclxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xyXG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoYmFyX3gsIGNhbnZhcy5oZWlnaHQsIGJhcl93aWR0aCwgYmFyX2hlaWdodDwtNzA/YmFyX2hlaWdodDogYmFyX2hlaWdodCowLjkpO1xyXG4gICAgICAgICAgICBpZihiYXJfaGVpZ2h0PC03MCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgZ3JhZGllbnRIaXQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoYmFyX3gtNSwgMCwgYmFyX3grNSwgMCk7XHJcbiAgICAgICAgICAgICAgICBncmFkaWVudEhpdC5hZGRDb2xvclN0b3AoMCwgXCJyZ2JhKDI1NSwwLDgwLDApXCIpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRIaXQuYWRkQ29sb3JTdG9wKDAuMjUsIFwicmdiYSgyNTUsMCw4MCwwKVwiKTtcclxuICAgICAgICAgICAgICAgIGdyYWRpZW50SGl0LmFkZENvbG9yU3RvcCgwLjUsIFwicmdiYSgyNTUsMCw4MCwwLjgpXCIpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGllbnRIaXQuYWRkQ29sb3JTdG9wKDAuNzUsIFwicmdiYSgyNTUsMCw4MCwwKVwiKTtcclxuICAgICAgICAgICAgICAgIGdyYWRpZW50SGl0LmFkZENvbG9yU3RvcCgxLCBcInJnYmEoMjU1LDAsODAsMClcIik7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnRIaXQ7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoYmFyX3gtNSwgMSwgMTAsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhbmFseXNlcjsiLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tL2RvbSc7XHJcbmltcG9ydCBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlJztcclxuaW1wb3J0IHJhZiBmcm9tICcuL2NvbW1vbi9yYWYnO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gJy4vY29tbW9uL2NvbW1vbic7XHJcbmltcG9ydCB4aHIgZnJvbSAnLi94aHIveGhyJztcclxuXHJcbmNvbnN0IElTX1dPUktFUiA9IHNlbGYud2luZG93ID09PSB1bmRlZmluZWQ7XHJcbmNvbnN0IENPTlRFWFQgPSBJU19XT1JLRVIgPyBzZWxmIDogd2luZG93O1xyXG5cclxudmFyIGNjO1xyXG53aW5kb3cuY2MgPSBjYyA9IHtcclxuICAgIHRvb2xzOiBjb21tb24sXHJcbiAgICBsb2FkOiBmdW5jdGlvbihhZGRPbnMgPSBbXSwgb3B0aW9ucyA9IHt9KXtcclxuXHJcbiAgICB9LFxyXG4gICAgc2VsZWN0OiBmdW5jdGlvbihzZWxlY3Rvcil7XHJcbiAgICAgICAgcmV0dXJuIGRvbS5zZWxlY3Qoc2VsZWN0b3IpXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHRhZ05hbWUsIGlkLCBvcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvbS5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIGlkLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZUVsZW1lbnROUzogZnVuY3Rpb24gKHRhZ05hbWUsIGlkLCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBvcHRpb25zLk5TID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZG9tLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgaWQsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBvcHRpb25zLnJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gc3RvcmFnZS5zZXRWYWx1ZShrZXksIHZhbHVlLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIHNhdmVBcnJheTogZnVuY3Rpb24oa2V5LCBhcnIgPSBbXSwgaWRrZXkpe1xyXG4gICAgICAgIGlmKGlka2V5ICE9PSB1bmRlZmluZWQgJiYgaWRrZXkgIT09ICcnICYmIGtleSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGNjLnVwZGF0ZVZhbHVlKGl0ZW1baWRrZXldLCBpdGVtKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNjLnNldFZhbHVlKGtleSwgYXJyKTtcclxuICAgIH0sXHJcbiAgICB1cGRhdGVWYWx1ZTogZnVuY3Rpb24oa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KXtcclxuICAgICAgICByZXR1cm4gc3RvcmFnZS5zZXRWYWx1ZShrZXksIHZhbHVlLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIGdldFZhbHVlOiAgZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlLmdldFZhbHVlKGtleSk7XHJcbiAgICB9LFxyXG4gICAgc2V0VGltZXI6IGZ1bmN0aW9uIChmbiwgZGVsYXkpIHtcclxuICAgICAgICByZXR1cm4gcmFmLnJlcXVlc3RUaW1lb3V0KGZuLCBkZWxheSlcclxuICAgIH0sXHJcbiAgICBjYW5jZWxUaW1lcjogZnVuY3Rpb24gKGhhbmRsZSkge1xyXG4gICAgICAgIHJhZi5jbGVhclJlcXVlc3RUaW1lb3V0KGhhbmRsZSk7XHJcbiAgICB9LFxyXG4gICAgcmVxdWVzdDogZnVuY3Rpb24gKHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgICAgcmV0dXJuIHhoci5hamF4KHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuaWYoSVNfV09SS0VSKXtcclxuICAgIGRlbGV0ZSBjYy5zZWxlY3Q7XHJcbiAgICBkZWxldGUgY2MuY3JlYXRlRWxlbWVudDtcclxuICAgIGRlbGV0ZSBjYy5jcmVhdGVFbGVtZW50TlM7XHJcbn1lbHNle1xyXG4gICAgbGV0IGxhc3QgPSAwXHJcbiAgICBsZXQgZnJhbWVUaWNrZXIgPSBmdW5jdGlvbiAodGltZXN0YW1wKSB7XHJcbiAgICAgICAgY2Muc2V0VmFsdWUoJ2ZyYW1lJywgdGltZXN0YW1wLCB7aW1tZWRpYXRlbHk6IHRydWV9KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRpbWVzdGFtcCAtIGxhc3QpO1xyXG4gICAgICAgIGxhc3QgPSB0aW1lc3RhbXA7XHJcbiAgICAgICAgcmFmLnJlcXVlc3RUaW1lb3V0KGZyYW1lVGlja2VyLCAxNilcclxuICAgIH07XHJcbiAgICBmcmFtZVRpY2tlcigwKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNjOyIsImNvbnN0IElTX1dPUktFUiA9IHNlbGYud2luZG93ID09PSB1bmRlZmluZWQ7XHJcbmNvbnN0IENPTlRFWFQgPSBJU19XT1JLRVIgPyBzZWxmIDogd2luZG93O1xyXG5jb25zdCBjb21tb24gPSB7fTtcclxuXHJcbmNvbW1vbi5vYmplY3Rmb3JFYWNoID0gZnVuY3Rpb24ob2JqLGZuKXtcclxuICAgIGZvcih2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICBmbihvYmpba2V5XSwga2V5LCBvYmopO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmNvbW1vbi5vYmplY3RBc3NpZ24gPSBmdW5jdGlvbih0YXJnZXQsIHNvdXJjZSl7XHJcbiAgICBmb3IobGV0IGtleSBpbiBzb3VyY2UpIHtcclxuICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn07XHJcblxyXG5jb21tb24uY3JlYXRlSWQgPSBmdW5jdGlvbigpe1xyXG4gICAgZnVuY3Rpb24gczQoKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXHJcbiAgICAgICAgICAgIC50b1N0cmluZygxNilcclxuICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcclxufTtcclxuXHJcbmNvbW1vbi5pc09iamVjdCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICByZXR1cm4gKGl0ZW0hPT11bmRlZmluZWQgJiYgaXRlbSA9PT0gT2JqZWN0KGl0ZW0pICYmICEoaXRlbSBpbnN0YW5jZW9mIEFycmF5KSlcclxufTtcclxuXHJcbmNvbW1vbi5nZXRCcm93c2VyID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgaXNJRSA9IGZhbHNlO1xyXG4gICAgbGV0IGlzQ2hyb21lID0gZmFsc2U7XHJcbiAgICBsZXQgaXNPcGVyYSA9IGZhbHNlO1xyXG4gICAgaWYgKCghIUNPTlRFWFQub3ByICYmICEhb3ByLmFkZG9ucykgfHwgISFDT05URVhULm9wZXJhIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIE9QUi8nKSA+PSAwKSB7XHJcbiAgICAgICAgaXNPcGVyYSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuICdvcGVyYSc7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIEluc3RhbGxUcmlnZ2VyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiAnZmlyZWZveCc7XHJcbiAgICB9XHJcbiAgICBpZiAoL2NvbnN0cnVjdG9yL2kudGVzdChDT05URVhULkhUTUxFbGVtZW50KSB8fCAoZnVuY3Rpb24gKHApIHtcclxuICAgICAgICByZXR1cm4gcC50b1N0cmluZygpID09PSBcIltvYmplY3QgU2FmYXJpUmVtb3RlTm90aWZpY2F0aW9uXVwiO1xyXG4gICAgfSkoIUNPTlRFWFRbJ3NhZmFyaSddIHx8IHNhZmFyaS5wdXNoTm90aWZpY2F0aW9uKSkge1xyXG4gICAgICAgIHJldHVybiAnc2FmYXJpJztcclxuICAgIH1cclxuICAgIGlmIChmYWxzZSB8fCAhIWRvY3VtZW50LmRvY3VtZW50TW9kZSkge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJndW1lbnRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFtrZXldID0gb2JqW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICghKCdyZW1vdmUnIGluIEVsZW1lbnQucHJvdG90eXBlKSkge1xyXG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpc0lFID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gJ2llJztcclxuICAgIH1cclxuICAgIGlmICghaXNJRSAmJiAhIUNPTlRFWFQuU3R5bGVNZWRpYSkge1xyXG4gICAgICAgIHJldHVybiAnZWRnZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoISFDT05URVhULmNocm9tZSAmJiAhIUNPTlRFWFQuY2hyb21lLndlYnN0b3JlKSB7XHJcbiAgICAgICAgaXNDaHJvbWUgPSB0cnVlXHJcbiAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xyXG4gICAgfVxyXG4gICAgaWYgKChpc0Nocm9tZSB8fCBpc09wZXJhKSAmJiAhIUNPTlRFWFQuQ1NTKSB7XHJcbiAgICAgICAgcmV0dXJuICdibGluayc7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb21tb24ucmVhZFZhbHVlID0gZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICBpZih0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIil7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlKG9wdGlvbnMpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbW9uOyIsImNvbnN0IElTX1dPUktFUiA9IHNlbGYud2luZG93ID09PSB1bmRlZmluZWQ7XHJcbmNvbnN0IENPTlRFWFQgPSBJU19XT1JLRVIgPyBzZWxmIDogd2luZG93O1xyXG52YXIgcmFmID0ge1xyXG4gICAgcmVxdWVzdFRpbWVvdXQ6IGZ1bmN0aW9uIChmbiwgZGVsYXkpIHtcclxuICAgICAgICBpZiAoIUNPTlRFWFQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxyXG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmbiwgZGVsYXkpO1xyXG5cclxuICAgICAgICB2YXIgc3RhcnQgPSBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICBoYW5kbGUgPSBuZXcgT2JqZWN0KCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvb3AodGltZXN0YW1wKSB7XHJcbiAgICAgICAgICAgIChEYXRlLm5vdygpIC0gc3RhcnQpID49IGRlbGF5ID8gZm4odGltZXN0YW1wKSA6IGhhbmRsZS52YWx1ZSA9IENPTlRFWFQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGhhbmRsZS52YWx1ZSA9IENPTlRFWFQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICAgIHJldHVybiBoYW5kbGU7XHJcbiAgICB9LFxyXG4gICAgY2xlYXJSZXF1ZXN0VGltZW91dDogZnVuY3Rpb24gKGhhbmRsZSkge1xyXG4gICAgICAgIENPTlRFWFQuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPyBDT05URVhULmNhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSk6Y2xlYXJUaW1lb3V0KGhhbmRsZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByYWY7IiwiaW1wb3J0IGNvbW1vbiBmcm9tICcuLi9jb21tb24vY29tbW9uJ1xyXG52YXIgZG9tID0ge1xyXG4gICAgc2VsZWN0OiBmdW5jdGlvbihzZWxlY3Rvcil7XHJcbiAgICAgICAgaWYoc2VsZWN0b3I9PT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgX3NlbGVjdG9yID0gc2VsZWN0b3IuY2hhckF0KDApO1xyXG4gICAgICAgIGxldCBuYW1lID0gc2VsZWN0b3Iuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIGxldCBkb21zID0gW107XHJcbiAgICAgICAgc3dpdGNoIChfc2VsZWN0b3Ipe1xyXG4gICAgICAgICAgICBjYXNlICcjJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYW1lKTtcclxuICAgICAgICAgICAgY2FzZSAnLic6XHJcbiAgICAgICAgICAgICAgICBkb21zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShuYW1lKSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgZG9tcyA9ICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShzZWxlY3RvcikgfHwgW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZG9tcztcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbiAodGFnLCBpZCA9ICcnLCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICAgICAgbGV0IGVsZW1lbnRJZCA9IGlkIHx8ICh0YWcgKyAnXycgKyBjb21tb24uY3JlYXRlSWQoKSk7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgZWxlbWVudElkKTtcclxuXHJcbiAgICAgICAgc2V0dXBFbGVtZW50TWV0aG9kcyhlbGVtZW50LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0dXBFbGVtZW50TWV0aG9kcyhlbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICBlbGVtZW50Ll9ldmVudExpc3RlbmVycyA9IG5ldyBNYXAoKTtcclxuICAgIGVsZW1lbnQuX2JvdW5kID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIGVsZW1lbnQuYWRkID0gZnVuY3Rpb24gKHRhZywgaWQsIG9wdGlvbnMpIHtcclxuICAgICAgICBsZXQgY2hpbGQgPSBkb20uY3JlYXRlRWxlbWVudCh0YWcsIGlkLCBvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRFbGVtZW50KGNoaWxkKTtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5hZGRFbGVtZW50ID0gZnVuY3Rpb24gKGNoaWxkKSB7XHJcbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkXHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYWRkQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuZ2V0QXR0ciA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKGtleSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYXR0ciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudCgnYXR0cicsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmdldERhdGEgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhXHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuZGF0YSA9IGZ1bmN0aW9uKGFueSl7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGFueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5nZXRQcm9wID0gZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudFtrZXldO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LnByb3AgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnQoJ3Byb3AnLCBrZXksIHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5jc3MgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcclxuICAgICAgICB0aGlzLl9zZXRFbGVtZW50KCdjc3MnLCBrZXksIHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5iaW5kID0gZnVuY3Rpb24oa2V5LCBmbil7XHJcbiAgICAgICAgaWYoa2V5KSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5fYm91bmQuc2V0KGtleSwgZm4pO1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ3N0b3JhZ2VfJyArIGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIGVsZW1lbnQudW5iaW5kID0gZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fYm91bmQuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdzdG9yYWdlXycgKyBrZXkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50Ll9yZWFjdCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xyXG4gICAgICAgIGxldCBmbiA9IHRoaXMuX2JvdW5kLmdldChrZXkpO1xyXG4gICAgICAgIGlmKGZuKXtcclxuICAgICAgICAgICAgaWYoZm4uY2FsbCh0aGlzLCB2YWx1ZSwgdGhpcy5fZGF0YSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kKGtleSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5vbiAgPSBmdW5jdGlvbihldmVudE5hbWUsIGZuLCB0YWcgPSAnJyl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBldmVudFRhZyA9IGV2ZW50TmFtZSArIHRhZztcclxuICAgICAgICBsZXQgZXZlbnRIYW5kbGVyID0gZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuZ2V0KGV2ZW50VGFnKTtcclxuICAgICAgICBpZihldmVudEhhbmRsZXIpe1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICBlbGVtZW50Ll9ldmVudExpc3RlbmVycy5kZWxldGUoZXZlbnRUYWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmbikge1xyXG4gICAgICAgICAgICBldmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYoZm4uY2FsbChzZWxmLCBlLCBzZWxmLl9kYXRhKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzLnNldChldmVudFRhZywgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmNvbnRlbnQgPSBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgdGhpcy5pbm5lclRleHQgPSBzdHI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQucmVtb3ZlU2VsZiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGlmKHRoaXMucmVtb3ZlKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LnJlbW92ZUFsbENoaWxkcmVuID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB3aGlsZSAodGhpcy5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuX3NldEVsZW1lbnQgPSBmdW5jdGlvbih0eXBlLCBrZXkgLCB2YWx1ZSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi5vYmplY3Rmb3JFYWNoKGtleSAsZnVuY3Rpb24gKGl0ZW0sIGtleSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZlt0eXBlXShrZXksIGl0ZW0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2ID0gY29tbW9uLnJlYWRWYWx1ZSh2YWx1ZSk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdwcm9wJzpcclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9ICB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhdHRyJzpcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShrZXkpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnY3NzJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVba2V5XSA9ICB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LmlzSW5WaWV3cG9ydCA9IGZ1bmN0aW9uIChvcHRpb25zID0ge30pIHtcclxuICAgICAgICBsZXQgb2Zmc2V0WCA9IG9wdGlvbnMub2Zmc2V0WCB8fCAwO1xyXG4gICAgICAgIGxldCBvZmZzZXRZID0gb3B0aW9ucy5vZmZzZXRZIHx8IDA7XHJcbiAgICAgICAgbGV0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7IC8vSUUgbm90IHN1cHBvcnQgYm90dG9tIHJpZ2h0XHJcbiAgICAgICAgbGV0IHgyID0geCArIHdpZHRoO1xyXG4gICAgICAgIGxldCB5MiA9IHkgKyBoZWlnaHQ7XHJcbiAgICAgICAgbGV0IGlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBsZXQgaW5uZXJIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuICEoeDIgPD0gKDAgKyBvZmZzZXRYKXx8IHggPj0gKGlubmVyV2lkdGggLSBvZmZzZXRYKSB8fCB5MiA8PSAoMCArIG9mZnNldFkpIHx8IHkgPj0gKGlubmVySGVpZ2h0IC0gb2Zmc2V0WSkpXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkb207IiwiaW1wb3J0IGNvbW1vbiBmcm9tICcuLi9jb21tb24vY29tbW9uJztcclxuXHJcbnZhciBzdG9yYWdlID0ge1xyXG4gICAgZGF0YU1hcDogbmV3IE1hcCgpLFxyXG4gICAgdGltZXJNYXA6ICBuZXcgTWFwKCksXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZGF0YU1hcCA9IHRoaXMuZGF0YU1hcDtcclxuICAgICAgICBsZXQge3Jlc2V0fSA9IG9wdGlvbnM7XHJcbiAgICAgICAgbGV0IHNob3VsZFJlYWN0ID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG9sZFZhbHVlID0gZGF0YU1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZihjb21tb24uaXNPYmplY3QodmFsdWUpICYmIGNvbW1vbi5pc09iamVjdChvbGRWYWx1ZSkgJiYgcmVzZXQgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgY29tbW9uLm9iamVjdGZvckVhY2godmFsdWUsIGZ1bmN0aW9uIChpdGVtLCBrZXksIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkUmVhY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZVtrZXldXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgc2hvdWxkUmVhY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBkYXRhTWFwLnNldChrZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IGRhdGFNYXAuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIGlmKHNob3VsZFJlYWN0KSB7XHJcbiAgICAgICAgICAgdGhpcy5icm9hZGNhc3Qoa2V5LCBuZXdWYWx1ZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICB9LFxyXG4gICAgYnJvYWRjYXN0OiBmdW5jdGlvbihrZXksIG5ld1ZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgdGltZXIgPSB0aGlzLnRpbWVyTWFwLmdldChrZXkpO1xyXG5cclxuICAgICAgICBpZiAodGltZXIpIHtcclxuICAgICAgICAgICAgY2MuY2FuY2VsVGltZXIodGltZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGltZXIgPSBjYy5zZXRUaW1lcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBkb21zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3RvcmFnZV8nICsga2V5KSB8fCBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb21zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG9tID0gZG9tc1tpXTtcclxuICAgICAgICAgICAgICAgIGRvbS5fcmVhY3QgJiYgZG9tLl9yZWFjdChrZXksIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnRpbWVyTWFwLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIH0sIG9wdGlvbnMuaW1tZWRpYXRlbHk/IDA6IDEwKTtcclxuXHJcbiAgICAgICAgdGhpcy50aW1lck1hcC5zZXQoa2V5LCB0aW1lcik7XHJcbiAgICB9LFxyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhTWFwLmdldChrZXkpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3RvcmFnZTsiLCJjb25zdCB4aHIgPSB7XHJcbiAgICBhamF4OiBmdW5jdGlvbiAocGFyYW1zID0ge30pIHtcclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgbGV0IHt1cmwsIG1ldGhvZCwgZGF0YSwgYXN5bmMsIHhociwgY29udGVudFR5cGUsIGRhdGFUeXBlLCBkb25lLCBmYWlsfSA9IHBhcmFtcyB8fCB7fTtcclxuICAgICAgICAgICAgbGV0IHtoZWFkZXIsIG9uUHJvZ3Jlc3MsIGJlZm9yZVNlbmR9ID0gcGFyYW1zO1xyXG4gICAgICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICByZXF1ZXN0Lm9wZW4oKG1ldGhvZCB8fCAnR0VUJyksIHVybCwgYXN5bmMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhc3luYyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gKGhlYWRlciB8fCB7fSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoaGVhZGVyIHx8IHt9KS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNjLmdldFZhbHVlKCdBdXRob3JpemF0aW9uJykpe1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgY2MuZ2V0VmFsdWUoJ0F1dGhvcml6YXRpb24nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9uZSAmJiBkb25lKHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCksIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhaWwgJiYgZmFpbChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmYWlsICYmIGZhaWwocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0LnVwbG9hZC5vbnByb2dyZXNzID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwID0gTWF0aC5mbG9vcihlLmxvYWRlZCAvIGUudG90YWwgKiAxMDApO1xyXG4gICAgICAgICAgICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKHAsIGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IF9kYXRhO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGFUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdmaWxlJzpcclxuICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdqc29uJzpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSA9PT0gdW5kZWZpbmVkID8gXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIgOiBjb250ZW50VHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmVmb3JlU2VuZCAmJiBiZWZvcmVTZW5kKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdC5zZW5kKF9kYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZnVuY3Rpb24gcGFyc2VEYXRhKGRhdGEpIHtcclxuICAgIHRyeXtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhIHx8ICcnKVxyXG4gICAgfWNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB4aHI7XHJcbiIsImltcG9ydCBjYyBmcm9tICcuL2NjanMvY2MnO1xyXG5pbXBvcnQgYW5hbHlzZXIgZnJvbSAnLi9hbmFseXNlcic7XHJcbmNvbnN0IFdISVRFID0gJ3JnYmEoMjU1LDI1NSwyNTUsIDAuNyknO1xyXG5jb25zdCBCTEFDSyA9ICdyZ2JhKDAsMCwwLCAwLjkpJztcclxuY29uc3QgUkVEID0gJyNkNjMwMzEnO1xyXG5cclxuY2Muc2V0VmFsdWUoJ3ZpZXdwb3J0Jywge3dpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHR9KTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnVwZGF0ZVZhbHVlKCd2aWV3cG9ydCcsIHt3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0fSk7XHJcbn0pO1xyXG5mdW5jdGlvbiBpbmRleCgpIHtcclxuICAgIGxldCByb290ID0gY2Muc2VsZWN0KCcjYm9keScpO1xyXG4gICAgbGV0IG1haW5Db250YWluZXIgPSBjYy5jcmVhdGVFbGVtZW50KCdkaXYnLCAndGVzdCcpXHJcbiAgICAgICAgLmFkZENsYXNzKCdtYWluLWNvbnRhaW5lcicpO1xyXG5cclxuICAgIHJvb3QuYXBwZW5kQ2hpbGQobWFpbkNvbnRhaW5lcik7XHJcbiAgICBsZXQgY29udGFpbmVyID0gbWFpbkNvbnRhaW5lci5hZGQoJ2RpdicpXHJcblxyXG4gICAgbGV0IGhlYWRlciA9IGNvbnRhaW5lci5hZGQoJ2RpdicsICdoZWFkZXInKVxyXG4gICAgICAgIC5hZGRDbGFzcygnaGVhZGVyJyk7XHJcbiAgICBsZXQgaGVhZGVyTGVmdCA9IGhlYWRlci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICBtaW5XaWR0aDogJzI1NnB4J1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGxvZ28gPSBoZWFkZXJMZWZ0LmFkZCgnZGl2JylcclxuICAgICAgICAuY29udGVudCgnQScpXHJcbiAgICAgICAgLmFkZENsYXNzKCdiYWNrZ3JvdW5kLXJlZCcpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmb250LWJsYWNrJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICc2NHB4JyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzAgMTZweCcsXHJcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICc1NHB4JyxcclxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICc0cHgnLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiBSRUQgKyAnIDAgMCAxMHB4JyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgbmFtZUNvbnRhaW5lciA9IGhlYWRlckxlZnQuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgbmFtZUNvbnRhaW5lci5hZGQoJ3NwYW4nKVxyXG4gICAgICAgIC5jb250ZW50KCdOWElOIFlBTkcnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxyXG4gICAgICAgIH0pO1xyXG4gICAgbmFtZUNvbnRhaW5lci5hZGQoJ3NwYW4nKVxyXG4gICAgICAgIC5jb250ZW50KCdGcm9udC1FbmQgRGV2ZWxvcGVyJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IG1lbnUgPSBoZWFkZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgbWVudUxpc3QgPSBbJ2ZhLWxpbmtlZGluJywgJ2ZhLWdpdGh1YiddO1xyXG4gICAgbGV0IGxpbmtzID0gWydodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vYW54aW4teWFuZy03MDcwMjkxMjUvJywgJ2h0dHBzOi8vZ2l0aHViLmNvbS9BbnhpbllhbmcnXTtcclxuICAgIGxldCBob3ZlckNvbG9ycyA9IFsnIzAwNzdCNScsICdyZ2JhKDI1NSwwLDgwLCAwLjgpJ107XHJcbiAgICBtZW51TGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh0YWcsIGlkeCkge1xyXG4gICAgICAgIG1lbnUuYWRkKCdpJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYWInKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MobWVudUxpc3RbaWR4XSlcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICc1NHB4JyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgICAgICAgICAgdGV4dFNoYWRvdzogJyAwIDAgNXB4JyxcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICcwLjNzJyxcclxuICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnMTZweCdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKGxpbmtzW2lkeF0sICdfYmxhbmsnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IGhvdmVyQ29sb3JzW2lkeF0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LCAnc3R5bGUnKVxyXG4gICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcnLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSwgJ3N0eWxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgbWFpbkNvbnRlbnRDb250YWluZXIgPSBjYy5jcmVhdGVFbGVtZW50KCdkaXYnLCAnbWFpbl9jb250ZW50JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAnY2FsYygxMDB2aCAtIDEwNHB4KScsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwIDEyLjUlJyxcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcclxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgIHpJbmRleDogNSxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMjtcclxuICAgICAgICAgICAgbGV0IGNlbnRlclkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBsZXQgbW91c2VYID0gZS5jbGllbnRYO1xyXG4gICAgICAgICAgICBsZXQgbW91c2VZID0gZS5jbGllbnRZO1xyXG4gICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoJyArICgtKG1vdXNlWCAtIGNlbnRlclgpIC8gMTAwKSArICdweCwnICsgKC0obW91c2VZIC0gY2VudGVyWSkgLyAxMDApICsgJ3B4KSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYmluZCgnZnJhbWUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBkb21zID0gY2Muc2VsZWN0KCcuZmFkZScpO1xyXG4gICAgICAgICAgICBpZihkb21zLmxlbmd0aD09PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmQoJ2ZyYW1lJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkb20gPSBkb21zW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzSW5WaWV3UG9ydCA9IGRvbS5pc0luVmlld3BvcnQoe29mZnNldFk6IDE1MH0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wYWNpdHkgPSArZG9tLnN0eWxlLm9wYWNpdHk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNJblZpZXdQb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLmFkZENsYXNzKCdzbGlkZS1pbi1ib3R0b20nKTtcclxuICAgICAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoJ2ZhZGUtb3V0Jyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLnJlbW92ZUNsYXNzKCdzbGlkZS1pbi1ib3R0b20nKTtcclxuICAgICAgICAgICAgICAgICAgICBkb20uYWRkQ2xhc3MoJ2ZhZGUtb3V0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIGxldCBsYW5kaW5nQ29udGFpbmVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBoZWlnaHQ6ICdjYWxjKDEwMHZoIC0gMTA0cHgpJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGhpZ2hMaWdodCA9IGxhbmRpbmdDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jb250ZW50KFwiTGV0J3MgbWFrZSBkYXRhIGFsaXZlXCIpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmYWRlJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnNDhweCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJ2NhbGMoNTB2aCAtIDE1MnB4KSdcclxuICAgICAgICB9KTtcclxuICAgIGxldCBpbnRybyA9IGxhbmRpbmdDb250YWluZXIuYWRkKCdwJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2ZhZGUnKVxyXG4gICAgICAgIC5jb250ZW50KFwiSSdtIGEgZnJvbnQtZW5kIGRldmVsb3BlciBmcm9tIEJheSBBcmVhLCBDYWxpZm9ybmlhLCBhbmQgY3VycmVudGx5IGxpdmluZyBpbiBTYW4gSm9zZS4gSSBlbmpveSBidWlsZGluZyByaWNoIFwiICtcclxuICAgICAgICAgICAgXCJpbnRlcmFjdGl2ZSB3ZWJzaXRlcyBhbmQgd2ViIGFwcHMgZnJvbSBzbWFsbCB0byBsYXJnZS4gXCIpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjBweCcsXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgcGxheWVyID0gbGFuZGluZ0NvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICc2NHB4JyxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLmFkZCgnaScpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmYXInKVxyXG4gICAgICAgIC5hZGRDbGFzcygnZmEtcGxheS1jaXJjbGUnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIGNvbG9yOiAncmdiYSgyNTUsMCw4MCwgMC44KSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHBsYXllcldhcm4uY3NzKHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICcnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJydcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHBsYXllcldhcm4uY3NzKHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmKGNjLmdldFZhbHVlKCdwbGF5Jykpe1xyXG4gICAgICAgICAgICAgICAgY2Muc2V0VmFsdWUoJ3BsYXknLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCdmYS1wYXVzZS1jaXJjbGUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2ZhLXBsYXktY2lyY2xlJyk7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgY2Muc2V0VmFsdWUoJ3BsYXknLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3MoJ2ZhLXBhdXNlLWNpcmNsZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygnZmEtcGxheS1jaXJjbGUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IHBsYXllcldhcm4gPSBsYW5kaW5nQ29udGFpbmVyLmFkZCgncCcpXHJcbiAgICAgICAgLmNvbnRlbnQoJ1dhdGNoIHlvdSB2b2x1bWUgOiknKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICB0ZXh0QWxpZ246J2NlbnRlcicsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJyxcclxuICAgICAgICAgICAgY29sb3I6J3JnYmEoMjU1LDAsODAsIDAuOCknXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IHNraWxsQ29udGFpbmVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdkaXYnKTtcclxuICAgIGxldCBza2lsbFRpdGxlID0gc2tpbGxDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jb250ZW50KFwiU2tpbGxzXCIpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzQ4cHgnLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICcyNTZweCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgc2tpbGxDYXJkQ29udGFpbmVyID0gc2tpbGxDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzEyOHB4JyxcclxuICAgICAgICAgICAgZmxleFdyYXA6ICd3cmFwJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBza2lsbHMgPSBbJ2ZhLWh0bWw1JywgJ2ZhLWpzJywgJ2ZhLWNzczMtYWx0JywgJ2ZhLXJlYWN0JywgJ2ZhLW5vZGUtanMnLCdmYS1zYXNzJ107XHJcbiAgICBsZXQgc2tpbGxOYW1lcyA9IFsnSFRNTDUnLCAnSmF2YXNjcmlwdCcsICdDU1MzJywgJ1JlYWN0JywgJ05vZGVKUycsICdTQVNTJ107XHJcbiAgICBsZXQgc2tpbGxDb2xvcnMgPSBbJyNlNDRkMjYnLCAnI2VlYWY0YicsICcjMDA3MGJhJywgJyM2MWRhZmInLCAnIzdjYjcwMCcsJyNjNjknXTtcclxuICAgIHNraWxscy5mb3JFYWNoKGZ1bmN0aW9uIChpY29uLCBpZHgpIHtcclxuICAgICAgICBsZXQgY2FyZCA9IHNraWxsQ2FyZENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgbWluV2lkdGg6ICczMDBweCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgZmxleEdyb3c6IDEsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBsb2dvID0gY2FyZC5hZGQoJ2knKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhYicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhpY29uKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMjU2cHgnLFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBza2lsbENvbG9yc1tpZHhdLFxyXG4gICAgICAgICAgICAgICAgdGV4dFNoYWRvdzogc2tpbGxDb2xvcnNbaWR4XSArICcgMCAwIDEwcHgnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBuYW1lID0gY2FyZC5hZGQoJ3AnKVxyXG4gICAgICAgICAgICAuY29udGVudChza2lsbE5hbWVzW2lkeF0pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogc2tpbGxDb2xvcnNbaWR4XSxcclxuICAgICAgICAgICAgICAgIHRleHRTaGFkb3c6IHNraWxsQ29sb3JzW2lkeF0gKyAnIDAgMCAxMHB4J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGNhcmVlckNvbnRhaW5lciA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgnZGl2Jyk7XHJcbiAgICBsZXQgY2FyZWVyVGl0bGUgPSBza2lsbENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNvbnRlbnQoXCJDYXJlZXJcIilcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnNDhweCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzEyOHB4JyxcclxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnNjRweCcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IGNvbXBhbmllcyA9IFsnbmV0RWxhc3RpYyBTeXN0ZW1zLCBJbmMuJywgJ1NhbiBGcmFuY2lzY28gU3RhdGUgVW5pdmVyc2l0eScsICdTaGFuZ2hhaSBVbml2ZXJzaXR5J107XHJcbiAgICBsZXQgdGl0bGVzID0gWydTb2Z0d2FyZSBFbmdpbmVlcicsICdCUyAtIENvbXB1dGVyIEVuZ2luZWVyaW5nIFN0dWRlbnQnLCAnQVMgLSBDb21wdXRlciBBcHBsaWNhdGlvbiBUZWNobm9sb2d5IFN0dWRlbnQnXTtcclxuICAgIGxldCB0aW1lTGluZXMgPSBbJzIwMTcgLSBDdXJyZW50JywgJzIwMTMgLSAyMDE3JywgJzIwMDkgLSAyMDEzJ107XHJcbiAgICBsZXQgcHJvamVjdHMgPSB7XHJcbiAgICAgICAgJ25ldEVsYXN0aWMgU3lzdGVtcywgSW5jLic6IFsndkJORyBNYW5hZ2VtZW50IFN5c3RlbSAoVUkgTGVhZCknLCAnU0QtV0FOIE1hbmFnZW1lbnQgU3lzdGVtIChVSSBUZWFtIE1lbWJlciknLF1cclxuICAgIH07XHJcblxyXG4gICAgY29tcGFuaWVzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBhbnlOYW1lLCBpZHgpIHtcclxuICAgICAgICBsZXQgY2FyZCA9IGNhcmVlckNvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzY0cHgnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBjb21wYW55ID0gY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5jb250ZW50KGNvbXBhbnlOYW1lKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCdcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBmb250U2l6ZSA9ICcyMHB4JztcclxuICAgICAgICBsZXQgdGl0bGUgPSBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmNvbnRlbnQodGl0bGVzW2lkeF0pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHRpbWVMaW5lID0gY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5jb250ZW50KHRpbWVMaW5lc1tpZHhdKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgKHByb2plY3RzW2NvbXBhbnlOYW1lXSB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAocHJvamVjdCkge1xyXG4gICAgICAgICAgICBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgICAgIC5jb250ZW50KHByb2plY3QpXHJcbiAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgZm9vdGVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdwJylcclxuICAgICAgICAuY29udGVudCgnUG93ZXJlZCBieSBjY0pTLCBhIHNlbGYtaW1wbGVtZW50ZWQgSmF2YXNjcmlwdCBMaWJyYXJ5LicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzEyOHB4J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBmb290U2hhZG93ID0gY29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgIGJvdHRvbTogMCxcclxuICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgekluZGV4OiAxMCxcclxuICAgICAgICAgICAgcG9pbnRlckV2ZW50czogICAnbm9uZSdcclxuICAgICAgICAgICAgLy9ib3hTaGFkb3c6ICdyZ2JhKDI1NSwgMCwgODAsIDAuOCkgMHB4IDBweCA1MHB4IDJweCdcclxuICAgICAgICB9KTtcclxuICAgIGFuYWx5c2VyKGZvb3RTaGFkb3cpO1xyXG4gICAgbGV0IGNvZGVCYWNrZ3JvdW5kVGV4dCA9IGluZGV4LnRvU3RyaW5nKCk7XHJcbiAgICBsZXQgY29sdW1uV2lkdGggPSBNYXRoLm1pbig0MDAgLCB3aW5kb3cuaW5uZXJXaWR0aCAtIDEyOCk7XHJcbiAgICBsZXQgY29sdW1uQ291bnQgPSBNYXRoLm1pbigyLCBNYXRoLmZsb29yKHdpbmRvdy5pbm5lcldpZHRoLyhjb2x1bW5XaWR0aCkpKTtcclxuICAgIGxldCBjb2RlQmFja2dyb3VuZCA9IGNvbnRhaW5lci5hZGQoJ3ByZScpXHJcbiAgICAgICAgLmFkZENsYXNzKCdjcnRUZXh0JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnbGVmdCcsXHJcbiAgICAgICAgICAgIHRvcDogJzEyOHB4JyxcclxuICAgICAgICAgICAgbGVmdDogJzY0cHgnLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgY29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LCAwLjA2KScsXHJcbiAgICAgICAgICAgIHpJbmRleDogMCxcclxuICAgICAgICAgICAgY29sdW1uQ291bnQ6IGNvbHVtbkNvdW50LFxyXG4gICAgICAgICAgICBjb2x1bW5XaWR0aDogY29sdW1uV2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICB3aWR0aDogJ2NhbGMoMTAwdncgLSAxMjhweCknLFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjNcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kYXRhKHtcclxuICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5iaW5kKCdmcmFtZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHtjb3VudGVyLCBzdHJ9ID0gdGhpcy5nZXREYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoJyArICgtbWFpbkNvbnRlbnRDb250YWluZXIuc2Nyb2xsVG9wLzYpICsgJ3B4KSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvdW50ZXIrPTQ7XHJcbiAgICAgICAgICAgIGlmKGNvdW50ZXIgPj0gY29kZUJhY2tncm91bmRUZXh0Lmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAvL2NvdW50ZXIgPSBjb2RlQmFja2dyb3VuZFRleHQubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyVGV4dCA9IGNvZGVCYWNrZ3JvdW5kVGV4dC5zdWJzdHJpbmcoMCwgY291bnRlcikgKyAnXyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5kYXRhKHtjb3VudGVyOiBjb3VudGVyfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5iaW5kKCd2aWV3cG9ydCcsIGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIGxldCB7aGVpZ2h0LCB3aWR0aH0gPSBkO1xyXG4gICAgICAgICAgICBsZXQgY29sdW1uV2lkdGggPSBNYXRoLm1pbig0MDAgLCB3aWR0aCAtIDEyOCk7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5Db3VudCA9IE1hdGgubWluKDIsIE1hdGguZmxvb3Iod2lkdGgvKGNvbHVtbldpZHRoKSkpO1xyXG4gICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Db3VudDogY29sdW1uQ291bnQsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5XaWR0aDogY29sdW1uV2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICBtYWluQ29udGFpbmVyLmFkZEVsZW1lbnQoY29udGFpbmVyKTtcclxuICAgIGNvbnRhaW5lci5hZGRFbGVtZW50KGhlYWRlcik7XHJcbiAgICBjb250YWluZXIuYWRkRWxlbWVudChtYWluQ29udGVudENvbnRhaW5lcik7XHJcbn1cclxuaW5kZXgoKTsiXSwic291cmNlUm9vdCI6IiJ9