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

var _xhr = __webpack_require__(/*! ./xhr/xhr */ "./src/ccjs/xhr/xhr.js");

var _xhr2 = _interopRequireDefault(_xhr);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var IS_WORKER = self.window === undefined;
var CONTEXT = IS_WORKER ? self : window;

var cc;
window.cc = cc = {
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
        var self = this;
        this._bound.set(key, fn);
        this.classList.add('storage_' + key);
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
            fn.call(this, value);
        }
    };
    element.on = function (eventName, fn) {
        var tag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        var self = this;
        var eventTag = eventName + tag;
        var eventHandler = element._eventListeners.get(eventTag);
        if (eventHandler) {
            this.removeEventListener(eventName, eventHandler);
            element._eventListeners.delete(eventTag);
        }
        if (fn) {
            eventHandler = function eventHandler(e) {
                fn.call(self, e);
            };
            element._eventListeners.set(eventTag, eventHandler);
            this.addEventListener(eventName, eventHandler);
        }
        return self;
    };

    element.text = function (str) {
        this.innerText = str;
        return this;
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

        var _ref = params || {},
            url = _ref.url,
            method = _ref.method,
            data = _ref.data,
            ref = _ref.ref,
            async = _ref.async,
            xhr = _ref.xhr,
            contentType = _ref.contentType,
            noAuth = _ref.noAuth,
            dataType = _ref.dataType,
            processData = _ref.processData,
            cache = _ref.cache,
            noJSON = _ref.noJSON,
            ajax = _ref.ajax,
            done = _ref.done,
            fail = _ref.fail,
            heavy = _ref.heavy;

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

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                done(request);
            } else {
                fail(request);
            }
        };

        request.onerror = function () {
            fail(request);
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
        return request;
    }
};

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

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var WHITE = 'rgba(255,255,255, 0.7)';
var BLACK = 'rgba(0,0,0, 0.9)';
var BLACK_SOLID = 'rgb(25, 25, 25)';
var RED = '#d63031';

_cc2.default.setValue('viewport', { width: window.innerWidth, height: window.innerHeight });
window.addEventListener('resize', function () {
    _cc2.default.updateValue('viewport', { width: window.innerWidth, height: window.innerHeight });
});
function index() {
    var root = _cc2.default.select('#body');
    var mainContainer = _cc2.default.createElement('div', 'test').css({
        background: BLACK,
        height: '100vh',
        width: '100vw',
        boxShadow: BLACK + '0 0 10px 20px'
    }).data({
        animationCounter: 0
    }).bind('frame', function (d) {
        var counter = this.getData().animationCounter;
        this.css({
            opacity: counter / 60
        });
        this.data({ animationCounter: counter + 1 });
        if (counter >= 60) {
            this.unbind('frame');
        }
    });

    root.appendChild(mainContainer);
    var container = mainContainer.add('div');

    var header = container.add('div', 'header').css({
        display: 'flex',
        padding: '0 12.5%',
        paddingTop: '32px',
        paddingBottom: '16px',
        color: WHITE,
        fontWeight: 'bold',
        justifyContent: 'space-between',
        boxShadow: BLACK + ' 0 0 20px',
        position: 'relative',
        zIndex: 10,
        background: BLACK_SOLID
    });
    var headerLeft = header.add('div').css({
        display: 'inline-block',
        minWidth: '256px'
    });
    var logo = headerLeft.add('div').text('A').css({
        background: RED,
        fontSize: '64px',
        padding: '0 16px',
        lineHeight: '54px',
        marginRight: '4px',
        display: 'inline-block',
        boxShadow: RED + ' 0 0 10px',
        color: BLACK
    });

    var nameContainer = headerLeft.add('div').css({
        display: 'inline-block'
    });
    nameContainer.add('span').text('NXIN YANG').css({
        fontSize: '32px',
        display: 'block'
    });
    nameContainer.add('span').text('Front-End Developer').css({
        fontSize: '16px',
        display: 'block'
    });
    var menu = header.add('div').css({
        display: 'flex',
        fontSize: '16px'
    });
    var menuList = ['fa-linkedin'];
    var links = ['https://www.linkedin.com/in/anxin-yang-707029125/'];
    var hoverColors = ['#0077B5'];
    menuList.forEach(function (tag, idx) {
        menu.add('i').addClass('fab').addClass(menuList[idx]).css({
            cursor: 'pointer',
            lineHeight: '54px',
            textAlign: 'center',
            fontSize: '32px',
            textShadow: ' 0 0 5px',
            transition: '0.3s'
        }).on('click', function () {
            window.open(links[idx], '_blank');
        }).on('mouseenter', function () {
            this.css({
                color: '#0077B5'
            });
        }, 'style').on('mouseleave', function () {
            this.css({
                color: ''
            });
        }, 'style');
    });

    var mainContentContainer = _cc2.default.createElement('div').css({
        height: 'calc(100vh - 100px)',
        padding: '0 12.5%',
        paddingTop: '25vh',
        color: WHITE,
        overflowY: 'auto',
        position: 'relative',
        zIndex: 5
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
        for (var i = 0; i < doms.length; i++) {
            var dom = doms[i];
            var isInViewPort = dom.isInViewport({ offsetY: 120 });
            var opacity = +dom.style.opacity;
            if (opacity > 0 && !isInViewPort) {
                opacity = opacity - 0.05;
            }
            if (opacity < 1 && isInViewPort) {
                opacity = opacity + 0.03;
            }
            var translateY = 30 - opacity * 30;
            dom.css({
                opacity: opacity,
                transform: 'translateY(' + translateY + 'px)'
            });
        }
    });
    var highLight = mainContentContainer.add('div').text("Let's make data alive").addClass('fade').css({
        color: WHITE,
        fontWeight: 'bold',
        fontSize: '48px',
        textAlign: 'center'
    });
    var intro = mainContentContainer.add('p').addClass('fade').text("I'm a front-end developer from Bay Area, California, and currently living in San Jose. I enjoy building rich " + "interactive websites and web apps from small to large. ").css({
        fontSize: '20px'
    });

    var skillContainer = mainContentContainer.add('div');
    var skillTitle = skillContainer.add('div').text("Skills").css({
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

    var skills = ['fa-html5', 'fa-js', 'fa-css3-alt', 'fa-react'];
    var skillNames = ['HTML5', 'Javascript', 'CSS3', 'React'];
    var skillColors = ['#e44d26', '#eeaf4b', '#0070ba', '#61dafb'];
    skills.forEach(function (icon, idx) {
        var card = skillCardContainer.add('div').addClass('fade').addClass('fade').css({
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
        var name = card.add('p').text(skillNames[idx]).css({
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center'
        });
    });

    var careerContainer = mainContentContainer.add('div');
    var careerTitle = skillContainer.add('div').text("Career").css({
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
        var company = card.add('div').text(companyName).css({
            fontSize: '32px',
            fontWeight: 'bold'
        });

        var fontSize = '20px';
        var title = card.add('div').text(titles[idx]).css({
            fontSize: fontSize
        });

        var timeLine = card.add('div').text(timeLines[idx]).css({
            fontSize: fontSize
        });
        (projects[companyName] || []).forEach(function (project) {
            card.add('div').text(project).css({
                fontSize: fontSize
            });
        });
    });

    var footer = mainContentContainer.add('p').text('This website is build by ccJS, a self-implemented Javascript Library.').css({
        textAlign: 'center',
        marginTop: '128px'
    });

    var codeBackgroundText = index.toString();
    var columnWidth = Math.min(400, window.innerWidth - 128);
    var columnCount = Math.min(2, Math.floor(window.innerWidth / columnWidth));
    var codeBackground = container.add('pre').css({
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
        counter += 24;
        if (counter >= codeBackgroundText.length) {
            counter = codeBackgroundText.length - 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY29tbW9uL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy9jb21tb24vcmFmLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvc3RvcmFnZS9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL3hoci94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIklTX1dPUktFUiIsInNlbGYiLCJDT05URVhUIiwid2luZG93IiwiY2MiLCJsb2FkIiwiYWRkT25zIiwib3B0aW9ucyIsInNlbGVjdCIsImRvbSIsImNyZWF0ZUVsZW1lbnQiLCJjcmVhdGVFbGVtZW50TlMiLCJzZXRWYWx1ZSIsInN0b3JhZ2UiLCJzYXZlQXJyYXkiLCJhcnIiLCJpZGtleSIsImtleSIsIml0ZW0iLCJ1cGRhdGVWYWx1ZSIsImdldFZhbHVlIiwic2V0VGltZXIiLCJyYWYiLCJjYW5jZWxUaW1lciIsInJlcXVlc3QiLCJwYXJhbXMiLCJ4aHIiLCJsYXN0IiwiZnJhbWVUaWNrZXIiLCJpbW1lZGlhdGVseSIsImNvbW1vbiIsIm9iaiIsImZuIiwiTWF0aCIsInM0IiwiT2JqZWN0IiwiaXNJRSIsImlzQ2hyb21lIiwiaXNPcGVyYSIsIm9wciIsIm5hdmlnYXRvciIsInAiLCJzYWZhcmkiLCJkb2N1bWVudCIsIm91dHB1dCIsImFyZ3VtZW50cyIsImkiLCJFbGVtZW50IiwidmFsdWUiLCJyZXF1ZXN0VGltZW91dCIsInNldFRpbWVvdXQiLCJzdGFydCIsIkRhdGUiLCJoYW5kbGUiLCJjbGVhclJlcXVlc3RUaW1lb3V0IiwiY2xlYXJUaW1lb3V0Iiwic2VsZWN0b3IiLCJfc2VsZWN0b3IiLCJuYW1lIiwiZG9tcyIsImlkIiwiZWxlbWVudCIsImVsZW1lbnRJZCIsInRhZyIsInNldHVwRWxlbWVudE1ldGhvZHMiLCJjaGlsZCIsImV2ZW50VGFnIiwiZXZlbnROYW1lIiwiZXZlbnRIYW5kbGVyIiwidiIsIm9mZnNldFgiLCJvZmZzZXRZIiwieDIiLCJ4IiwieTIiLCJ5IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiZGF0YU1hcCIsInRpbWVyTWFwIiwic2hvdWxkUmVhY3QiLCJvbGRWYWx1ZSIsInJlc2V0IiwibmV3VmFsdWUiLCJicm9hZGNhc3QiLCJ0aW1lciIsImFqYXgiLCJtZXRob2QiLCJhc3luYyIsImhlYWRlciIsImRvbmUiLCJmYWlsIiwiZSIsIm9uUHJvZ3Jlc3MiLCJfZGF0YSIsImNvbnRlbnRUeXBlIiwiSlNPTiIsImJlZm9yZVNlbmQiLCJXSElURSIsIkJMQUNLIiwiQkxBQ0tfU09MSUQiLCJSRUQiLCJ3aWR0aCIsImhlaWdodCIsInJvb3QiLCJtYWluQ29udGFpbmVyIiwiYmFja2dyb3VuZCIsImJveFNoYWRvdyIsImFuaW1hdGlvbkNvdW50ZXIiLCJjb3VudGVyIiwib3BhY2l0eSIsImNvbnRhaW5lciIsImRpc3BsYXkiLCJwYWRkaW5nIiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJjb2xvciIsImZvbnRXZWlnaHQiLCJqdXN0aWZ5Q29udGVudCIsInBvc2l0aW9uIiwiekluZGV4IiwiaGVhZGVyTGVmdCIsIm1pbldpZHRoIiwibG9nbyIsImZvbnRTaXplIiwibGluZUhlaWdodCIsIm1hcmdpblJpZ2h0IiwibmFtZUNvbnRhaW5lciIsIm1lbnUiLCJtZW51TGlzdCIsImxpbmtzIiwiaG92ZXJDb2xvcnMiLCJjdXJzb3IiLCJ0ZXh0QWxpZ24iLCJ0ZXh0U2hhZG93IiwidHJhbnNpdGlvbiIsIm1haW5Db250ZW50Q29udGFpbmVyIiwib3ZlcmZsb3dZIiwiY2VudGVyWCIsImNlbnRlclkiLCJtb3VzZVgiLCJtb3VzZVkiLCJ0cmFuc2Zvcm0iLCJpc0luVmlld1BvcnQiLCJ0cmFuc2xhdGVZIiwiaGlnaExpZ2h0IiwiaW50cm8iLCJza2lsbENvbnRhaW5lciIsInNraWxsVGl0bGUiLCJtYXJnaW5Ub3AiLCJza2lsbENhcmRDb250YWluZXIiLCJmbGV4V3JhcCIsInNraWxscyIsInNraWxsTmFtZXMiLCJza2lsbENvbG9ycyIsImNhcmQiLCJmbGV4R3JvdyIsImNhcmVlckNvbnRhaW5lciIsImNhcmVlclRpdGxlIiwibWFyZ2luQm90dG9tIiwiY29tcGFuaWVzIiwidGl0bGVzIiwidGltZUxpbmVzIiwicHJvamVjdHMiLCJjb21wYW55IiwidGl0bGUiLCJ0aW1lTGluZSIsImZvb3RlciIsImNvZGVCYWNrZ3JvdW5kVGV4dCIsImluZGV4IiwiY29sdW1uV2lkdGgiLCJjb2x1bW5Db3VudCIsImNvZGVCYWNrZ3JvdW5kIiwidG9wIiwibGVmdCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7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QUVLO0FBQ0QsNkJBQWlCMkQsMkNBQWpCO0FBQ0g7QUFDRCxrQkFBVSxFQUFDM0QsU0FBWCxPQUFVLEVBQVY7QUExQmEsd0JBNEJDLGFBQWE7QUFBQTtBQUFBOztBQUUzQixZQUFJNkQsY0FBY3pJLGNBQWVxRSxRQUFqQyxHQUFrQnJFLENBQWxCO0FBQ0EsWUFBSTBJLGNBQWMxSSxZQUFZQSxXQUFXcUUsUUFBekMsV0FBOEJyRSxDQUFaQSxDQUFsQjtBQUNBLGlCQUFTO0FBQ0wwSSx5QkFESztBQUVMRCx5QkFBYUEsY0FBYztBQUZ0QixTQUFUO0FBaENSLEtBQXFCLENBQXJCOztBQXVDQWpFO0FBQ0FNO0FBQ0FBO0FBQ0g7QUFDRDBELFEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbS9kb20nO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZSc7XHJcbmltcG9ydCByYWYgZnJvbSAnLi9jb21tb24vcmFmJztcclxuaW1wb3J0IHhociBmcm9tICcuL3hoci94aHInO1xyXG5cclxuY29uc3QgSVNfV09SS0VSID0gc2VsZi53aW5kb3cgPT09IHVuZGVmaW5lZDtcclxuY29uc3QgQ09OVEVYVCA9IElTX1dPUktFUiA/IHNlbGYgOiB3aW5kb3c7XHJcblxyXG52YXIgY2M7XHJcbndpbmRvdy5jYyA9IGNjID0ge1xyXG4gICAgbG9hZDogZnVuY3Rpb24oYWRkT25zID0gW10sIG9wdGlvbnMgPSB7fSl7XHJcblxyXG4gICAgfSxcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIHJldHVybiBkb20uc2VsZWN0KHNlbGVjdG9yKVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBkb20uY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBpZCwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50TlM6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5OUyA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGRvbS5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIGlkLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5yZXNldCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBzYXZlQXJyYXk6IGZ1bmN0aW9uKGtleSwgYXJyID0gW10sIGlka2V5KXtcclxuICAgICAgICBpZihpZGtleSAhPT0gdW5kZWZpbmVkICYmIGlka2V5ICE9PSAnJyAmJiBrZXkgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBjYy51cGRhdGVWYWx1ZShpdGVtW2lka2V5XSwgaXRlbSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5zZXRWYWx1ZShrZXksIGFycik7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlVmFsdWU6IGZ1bmN0aW9uKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gc3RvcmFnZS5nZXRWYWx1ZShrZXkpO1xyXG4gICAgfSxcclxuICAgIHNldFRpbWVyOiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgcmV0dXJuIHJhZi5yZXF1ZXN0VGltZW91dChmbiwgZGVsYXkpXHJcbiAgICB9LFxyXG4gICAgY2FuY2VsVGltZXI6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICByYWYuY2xlYXJSZXF1ZXN0VGltZW91dChoYW5kbGUpO1xyXG4gICAgfSxcclxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xyXG4gICAgICAgIHJldHVybiB4aHIuYWpheChwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmlmKElTX1dPUktFUil7XHJcbiAgICBkZWxldGUgY2Muc2VsZWN0O1xyXG4gICAgZGVsZXRlIGNjLmNyZWF0ZUVsZW1lbnQ7XHJcbiAgICBkZWxldGUgY2MuY3JlYXRlRWxlbWVudE5TO1xyXG59ZWxzZXtcclxuICAgIGxldCBsYXN0ID0gMFxyXG4gICAgbGV0IGZyYW1lVGlja2VyID0gZnVuY3Rpb24gKHRpbWVzdGFtcCkge1xyXG4gICAgICAgIGNjLnNldFZhbHVlKCdmcmFtZScsIHRpbWVzdGFtcCwge2ltbWVkaWF0ZWx5OiB0cnVlfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aW1lc3RhbXAgLSBsYXN0KTtcclxuICAgICAgICBsYXN0ID0gdGltZXN0YW1wO1xyXG4gICAgICAgIHJhZi5yZXF1ZXN0VGltZW91dChmcmFtZVRpY2tlciwgMTYpXHJcbiAgICB9O1xyXG4gICAgZnJhbWVUaWNrZXIoMCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYzsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxuY29uc3QgY29tbW9uID0ge307XHJcblxyXG5jb21tb24ub2JqZWN0Zm9yRWFjaCA9IGZ1bmN0aW9uKG9iaixmbil7XHJcbiAgICBmb3IodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgZm4ob2JqW2tleV0sIGtleSwgb2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb21tb24uY3JlYXRlSWQgPSBmdW5jdGlvbigpe1xyXG4gICAgZnVuY3Rpb24gczQoKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXHJcbiAgICAgICAgICAgIC50b1N0cmluZygxNilcclxuICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcclxufTtcclxuXHJcbmNvbW1vbi5pc09iamVjdCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICByZXR1cm4gKGl0ZW0hPT11bmRlZmluZWQgJiYgaXRlbSA9PT0gT2JqZWN0KGl0ZW0pICYmICEoaXRlbSBpbnN0YW5jZW9mIEFycmF5KSlcclxufTtcclxuXHJcbmNvbW1vbi5nZXRCcm93c2VyID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgaXNJRSA9IGZhbHNlO1xyXG4gICAgbGV0IGlzQ2hyb21lID0gZmFsc2U7XHJcbiAgICBsZXQgaXNPcGVyYSA9IGZhbHNlO1xyXG4gICAgaWYgKCghIUNPTlRFWFQub3ByICYmICEhb3ByLmFkZG9ucykgfHwgISFDT05URVhULm9wZXJhIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIE9QUi8nKSA+PSAwKSB7XHJcbiAgICAgICAgaXNPcGVyYSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuICdvcGVyYSc7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIEluc3RhbGxUcmlnZ2VyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiAnZmlyZWZveCc7XHJcbiAgICB9XHJcbiAgICBpZiAoL2NvbnN0cnVjdG9yL2kudGVzdChDT05URVhULkhUTUxFbGVtZW50KSB8fCAoZnVuY3Rpb24gKHApIHtcclxuICAgICAgICByZXR1cm4gcC50b1N0cmluZygpID09PSBcIltvYmplY3QgU2FmYXJpUmVtb3RlTm90aWZpY2F0aW9uXVwiO1xyXG4gICAgfSkoIUNPTlRFWFRbJ3NhZmFyaSddIHx8IHNhZmFyaS5wdXNoTm90aWZpY2F0aW9uKSkge1xyXG4gICAgICAgIHJldHVybiAnc2FmYXJpJztcclxuICAgIH1cclxuICAgIGlmIChmYWxzZSB8fCAhIWRvY3VtZW50LmRvY3VtZW50TW9kZSkge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJndW1lbnRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFtrZXldID0gb2JqW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICghKCdyZW1vdmUnIGluIEVsZW1lbnQucHJvdG90eXBlKSkge1xyXG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpc0lFID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gJ2llJztcclxuICAgIH1cclxuICAgIGlmICghaXNJRSAmJiAhIUNPTlRFWFQuU3R5bGVNZWRpYSkge1xyXG4gICAgICAgIHJldHVybiAnZWRnZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoISFDT05URVhULmNocm9tZSAmJiAhIUNPTlRFWFQuY2hyb21lLndlYnN0b3JlKSB7XHJcbiAgICAgICAgaXNDaHJvbWUgPSB0cnVlXHJcbiAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xyXG4gICAgfVxyXG4gICAgaWYgKChpc0Nocm9tZSB8fCBpc09wZXJhKSAmJiAhIUNPTlRFWFQuQ1NTKSB7XHJcbiAgICAgICAgcmV0dXJuICdibGluayc7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb21tb24ucmVhZFZhbHVlID0gZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICBpZih0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIil7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlKG9wdGlvbnMpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbW9uOyIsImNvbnN0IElTX1dPUktFUiA9IHNlbGYud2luZG93ID09PSB1bmRlZmluZWQ7XHJcbmNvbnN0IENPTlRFWFQgPSBJU19XT1JLRVIgPyBzZWxmIDogd2luZG93O1xyXG52YXIgcmFmID0ge1xyXG4gICAgcmVxdWVzdFRpbWVvdXQ6IGZ1bmN0aW9uIChmbiwgZGVsYXkpIHtcclxuICAgICAgICBpZiAoIUNPTlRFWFQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxyXG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmbiwgZGVsYXkpO1xyXG5cclxuICAgICAgICB2YXIgc3RhcnQgPSBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICBoYW5kbGUgPSBuZXcgT2JqZWN0KCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvb3AodGltZXN0YW1wKSB7XHJcbiAgICAgICAgICAgIChEYXRlLm5vdygpIC0gc3RhcnQpID49IGRlbGF5ID8gZm4odGltZXN0YW1wKSA6IGhhbmRsZS52YWx1ZSA9IENPTlRFWFQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGhhbmRsZS52YWx1ZSA9IENPTlRFWFQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICAgIHJldHVybiBoYW5kbGU7XHJcbiAgICB9LFxyXG4gICAgY2xlYXJSZXF1ZXN0VGltZW91dDogZnVuY3Rpb24gKGhhbmRsZSkge1xyXG4gICAgICAgIENPTlRFWFQuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPyBDT05URVhULmNhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSk6Y2xlYXJUaW1lb3V0KGhhbmRsZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByYWY7IiwiaW1wb3J0IGNvbW1vbiBmcm9tICcuLi9jb21tb24vY29tbW9uJ1xyXG52YXIgZG9tID0ge1xyXG4gICAgc2VsZWN0OiBmdW5jdGlvbihzZWxlY3Rvcil7XHJcbiAgICAgICAgaWYoc2VsZWN0b3I9PT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgX3NlbGVjdG9yID0gc2VsZWN0b3IuY2hhckF0KDApO1xyXG4gICAgICAgIGxldCBuYW1lID0gc2VsZWN0b3Iuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIGxldCBkb21zID0gW107XHJcbiAgICAgICAgc3dpdGNoIChfc2VsZWN0b3Ipe1xyXG4gICAgICAgICAgICBjYXNlICcjJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYW1lKTtcclxuICAgICAgICAgICAgY2FzZSAnLic6XHJcbiAgICAgICAgICAgICAgICBkb21zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShuYW1lKSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgZG9tcyA9ICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShzZWxlY3RvcikgfHwgW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZG9tcztcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbiAodGFnLCBpZCA9ICcnLCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICAgICAgbGV0IGVsZW1lbnRJZCA9IGlkIHx8ICh0YWcgKyAnXycgKyBjb21tb24uY3JlYXRlSWQoKSk7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgZWxlbWVudElkKTtcclxuXHJcbiAgICAgICAgc2V0dXBFbGVtZW50TWV0aG9kcyhlbGVtZW50LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0dXBFbGVtZW50TWV0aG9kcyhlbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICBlbGVtZW50Ll9ldmVudExpc3RlbmVycyA9IG5ldyBNYXAoKTtcclxuICAgIGVsZW1lbnQuX2JvdW5kID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIGVsZW1lbnQuYWRkID0gZnVuY3Rpb24gKHRhZywgaWQsIG9wdGlvbnMpIHtcclxuICAgICAgICBsZXQgY2hpbGQgPSBkb20uY3JlYXRlRWxlbWVudCh0YWcsIGlkLCBvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRFbGVtZW50KGNoaWxkKTtcclxuICAgIH07XHJcbiAgICBlbGVtZW50LmFkZEVsZW1lbnQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICAgICAgICByZXR1cm4gY2hpbGRcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5hZGRDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBlbGVtZW50LnJlbW92ZUNsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZWxlbWVudC5nZXRBdHRyID0gZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KTtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5hdHRyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zZXRFbGVtZW50KCdhdHRyJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuZ2V0RGF0YSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9O1xyXG4gICAgZWxlbWVudC5kYXRhID0gZnVuY3Rpb24oYW55KXtcclxuICAgICAgICB0aGlzLl9kYXRhID0gYW55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmdldFByb3AgPSBmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50W2tleV07XHJcbiAgICB9O1xyXG4gICAgZWxlbWVudC5wcm9wID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zZXRFbGVtZW50KCdwcm9wJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuY3NzID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudCgnY3NzJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYmluZCA9IGZ1bmN0aW9uKGtleSwgZm4pe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9ib3VuZC5zZXQoa2V5LCBmbik7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdzdG9yYWdlXycgKyBrZXkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIGVsZW1lbnQudW5iaW5kID0gZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fYm91bmQuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdzdG9yYWdlXycgKyBrZXkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50Ll9yZWFjdCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xyXG4gICAgICAgIGxldCBmbiA9IHRoaXMuX2JvdW5kLmdldChrZXkpO1xyXG4gICAgICAgIGlmKGZuKXtcclxuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLCB2YWx1ZSlcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZWxlbWVudC5vbiAgPSBmdW5jdGlvbihldmVudE5hbWUsIGZuLCB0YWcgPSAnJyl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBldmVudFRhZyA9IGV2ZW50TmFtZSArIHRhZztcclxuICAgICAgICBsZXQgZXZlbnRIYW5kbGVyID0gZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuZ2V0KGV2ZW50VGFnKTtcclxuICAgICAgICBpZihldmVudEhhbmRsZXIpe1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICBlbGVtZW50Ll9ldmVudExpc3RlbmVycy5kZWxldGUoZXZlbnRUYWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmbikge1xyXG4gICAgICAgICAgICBldmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZm4uY2FsbChzZWxmLCBlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuc2V0KGV2ZW50VGFnLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC50ZXh0ID0gZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gc3RyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50Ll9zZXRFbGVtZW50ID0gZnVuY3Rpb24odHlwZSwga2V5ICwgdmFsdWUpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBjb21tb24ub2JqZWN0Zm9yRWFjaChrZXkgLGZ1bmN0aW9uIChpdGVtLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGZbdHlwZV0oa2V5LCBpdGVtKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdiA9IGNvbW1vbi5yZWFkVmFsdWUodmFsdWUpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncHJvcCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYXR0cic6XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoa2V5KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Nzcyc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlW2tleV0gPSAgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5pc0luVmlld3BvcnQgPSBmdW5jdGlvbiAob3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IG9mZnNldFggPSBvcHRpb25zLm9mZnNldFggfHwgMDtcclxuICAgICAgICBsZXQgb2Zmc2V0WSA9IG9wdGlvbnMub2Zmc2V0WSB8fCAwO1xyXG4gICAgICAgIGxldCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOyAvL0lFIG5vdCBzdXBwb3J0IGJvdHRvbSByaWdodFxyXG4gICAgICAgIGxldCB4MiA9IHggKyB3aWR0aDtcclxuICAgICAgICBsZXQgeTIgPSB5ICsgaGVpZ2h0O1xyXG4gICAgICAgIGxldCBpbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgbGV0IGlubmVySGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiAhKHgyIDw9ICgwICsgb2Zmc2V0WCl8fCB4ID49IChpbm5lcldpZHRoIC0gb2Zmc2V0WCkgfHwgeTIgPD0gKDAgKyBvZmZzZXRZKSB8fCB5ID49IChpbm5lckhlaWdodCAtIG9mZnNldFkpKVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZG9tOyIsImltcG9ydCBjb21tb24gZnJvbSAnLi4vY29tbW9uL2NvbW1vbic7XHJcblxyXG52YXIgc3RvcmFnZSA9IHtcclxuICAgIGRhdGFNYXA6IG5ldyBNYXAoKSxcclxuICAgIHRpbWVyTWFwOiAgbmV3IE1hcCgpLFxyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGRhdGFNYXAgPSB0aGlzLmRhdGFNYXA7XHJcbiAgICAgICAgbGV0IHtyZXNldH0gPSBvcHRpb25zO1xyXG4gICAgICAgIGxldCBzaG91bGRSZWFjdCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IGRhdGFNYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYoY29tbW9uLmlzT2JqZWN0KHZhbHVlKSAmJiBjb21tb24uaXNPYmplY3Qob2xkVmFsdWUpICYmIHJlc2V0ICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi5vYmplY3Rmb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiAoaXRlbSwga2V5LCBvYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFJlYWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9ialtrZXldID0gdmFsdWVba2V5XVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHNob3VsZFJlYWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgZGF0YU1hcC5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV3VmFsdWUgPSBkYXRhTWFwLmdldChrZXkpO1xyXG5cclxuICAgICAgICBpZihzaG91bGRSZWFjdCkge1xyXG4gICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KGtleSwgbmV3VmFsdWUsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgfSxcclxuICAgIGJyb2FkY2FzdDogZnVuY3Rpb24oa2V5LCBuZXdWYWx1ZSwgb3B0aW9ucyA9IHt9KXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHRpbWVyID0gdGhpcy50aW1lck1hcC5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgaWYgKHRpbWVyKSB7XHJcbiAgICAgICAgICAgIGNjLmNhbmNlbFRpbWVyKHRpbWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRpbWVyID0gY2Muc2V0VGltZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgZG9tcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N0b3JhZ2VfJyArIGtleSkgfHwgW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9tcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRvbSA9IGRvbXNbaV07XHJcbiAgICAgICAgICAgICAgICBkb20uX3JlYWN0ICYmIGRvbS5fcmVhY3Qoa2V5LCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi50aW1lck1hcC5kZWxldGUoa2V5KTtcclxuICAgICAgICB9LCBvcHRpb25zLmltbWVkaWF0ZWx5PyAwOiAxMCk7XHJcblxyXG4gICAgICAgIHRoaXMudGltZXJNYXAuc2V0KGtleSwgdGltZXIpO1xyXG4gICAgfSxcclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YU1hcC5nZXQoa2V5KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN0b3JhZ2U7IiwiY29uc3QgeGhyID0ge1xyXG4gICAgYWpheDogZnVuY3Rpb24gKHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHt1cmwsIG1ldGhvZCwgZGF0YSwgcmVmLCBhc3luYywgeGhyLCBjb250ZW50VHlwZSwgbm9BdXRoLCBkYXRhVHlwZSwgcHJvY2Vzc0RhdGEsIGNhY2hlLCBub0pTT04sIGFqYXgsIGRvbmUsIGZhaWwsIGhlYXZ5fSA9IHBhcmFtcyB8fCB7fTtcclxuICAgICAgICBsZXQge2hlYWRlciwgb25Qcm9ncmVzcywgYmVmb3JlU2VuZH0gPSBwYXJhbXM7XHJcbiAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXN0Lm9wZW4oKG1ldGhvZCB8fCAnR0VUJyksIHVybCwgYXN5bmMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhc3luYyk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiAoaGVhZGVyIHx8IHt9KSkge1xyXG4gICAgICAgICAgICBpZiAoKGhlYWRlciB8fCB7fSkuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgZG9uZShyZXF1ZXN0KTtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmFpbChyZXF1ZXN0KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBmYWlsKHJlcXVlc3QpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcmVxdWVzdC51cGxvYWQub25wcm9ncmVzcyA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGxldCBwID0gTWF0aC5mbG9vcihlLmxvYWRlZCAvIGUudG90YWwgKiAxMDApO1xyXG4gICAgICAgICAgICBvblByb2dyZXNzICYmIG9uUHJvZ3Jlc3MocCwgZSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbGV0IF9kYXRhO1xyXG4gICAgICAgIHN3aXRjaCAoZGF0YVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnZmlsZSc6XHJcbiAgICAgICAgICAgICAgICBfZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnanNvbic6XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlID09PSB1bmRlZmluZWQgPyBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiA6IGNvbnRlbnRUeXBlKTtcclxuICAgICAgICAgICAgICAgIF9kYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBiZWZvcmVTZW5kICYmIGJlZm9yZVNlbmQocmVxdWVzdCk7XHJcblxyXG4gICAgICAgIHJlcXVlc3Quc2VuZChfZGF0YSk7XHJcbiAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCB4aHI7XHJcbiIsImltcG9ydCBjYyBmcm9tICcuL2NjanMvY2MnO1xyXG5cclxuY29uc3QgV0hJVEUgPSAncmdiYSgyNTUsMjU1LDI1NSwgMC43KSc7XHJcbmNvbnN0IEJMQUNLID0gJ3JnYmEoMCwwLDAsIDAuOSknO1xyXG5jb25zdCBCTEFDS19TT0xJRCA9ICdyZ2IoMjUsIDI1LCAyNSknO1xyXG5jb25zdCBSRUQgPSAnI2Q2MzAzMSc7XHJcblxyXG5jYy5zZXRWYWx1ZSgndmlld3BvcnQnLCB7d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodH0pO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY2MudXBkYXRlVmFsdWUoJ3ZpZXdwb3J0Jywge3dpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHR9KTtcclxufSk7XHJcbmZ1bmN0aW9uIGluZGV4KCkge1xyXG4gICAgbGV0IHJvb3QgPSBjYy5zZWxlY3QoJyNib2R5Jyk7XHJcbiAgICBsZXQgbWFpbkNvbnRhaW5lciA9IGNjLmNyZWF0ZUVsZW1lbnQoJ2RpdicsICd0ZXN0JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogQkxBQ0ssXHJcbiAgICAgICAgICAgIGhlaWdodDogJzEwMHZoJyxcclxuICAgICAgICAgICAgd2lkdGg6ICcxMDB2dycsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogQkxBQ0sgKyAnMCAwIDEwcHggMjBweCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kYXRhKHtcclxuICAgICAgICAgICAgYW5pbWF0aW9uQ291bnRlcjogMCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5iaW5kKCdmcmFtZScsIGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudGVyID0gdGhpcy5nZXREYXRhKCkuYW5pbWF0aW9uQ291bnRlcjtcclxuICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogY291bnRlciAvIDYwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEoe2FuaW1hdGlvbkNvdW50ZXI6IGNvdW50ZXIgKyAxfSk7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyID49IDYwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZCgnZnJhbWUnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgcm9vdC5hcHBlbmRDaGlsZChtYWluQ29udGFpbmVyKTtcclxuICAgIGxldCBjb250YWluZXIgPSBtYWluQ29udGFpbmVyLmFkZCgnZGl2JylcclxuXHJcbiAgICBsZXQgaGVhZGVyID0gY29udGFpbmVyLmFkZCgnZGl2JywgJ2hlYWRlcicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzAgMTIuNSUnLFxyXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnMzJweCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmdCb3R0b206ICcxNnB4JyxcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogQkxBQ0sgKyAnIDAgMCAyMHB4JyxcclxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgIHpJbmRleDogMTAsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IEJMQUNLX1NPTElEXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgaGVhZGVyTGVmdCA9IGhlYWRlci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICBtaW5XaWR0aDogJzI1NnB4J1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGxvZ28gPSBoZWFkZXJMZWZ0LmFkZCgnZGl2JylcclxuICAgICAgICAudGV4dCgnQScpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IFJFRCxcclxuICAgICAgICAgICAgZm9udFNpemU6ICc2NHB4JyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzAgMTZweCcsXHJcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICc1NHB4JyxcclxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICc0cHgnLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiBSRUQgKyAnIDAgMCAxMHB4JyxcclxuICAgICAgICAgICAgY29sb3I6IEJMQUNLXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IG5hbWVDb250YWluZXIgPSBoZWFkZXJMZWZ0LmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcclxuICAgICAgICB9KTtcclxuICAgIG5hbWVDb250YWluZXIuYWRkKCdzcGFuJylcclxuICAgICAgICAudGV4dCgnTlhJTiBZQU5HJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICB9KTtcclxuICAgIG5hbWVDb250YWluZXIuYWRkKCdzcGFuJylcclxuICAgICAgICAudGV4dCgnRnJvbnQtRW5kIERldmVsb3BlcicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaydcclxuICAgICAgICB9KTtcclxuICAgIGxldCBtZW51ID0gaGVhZGVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IG1lbnVMaXN0ID0gWydmYS1saW5rZWRpbiddO1xyXG4gICAgbGV0IGxpbmtzID0gWydodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vYW54aW4teWFuZy03MDcwMjkxMjUvJ107XHJcbiAgICBsZXQgaG92ZXJDb2xvcnMgPSBbJyMwMDc3QjUnXTtcclxuICAgIG1lbnVMaXN0LmZvckVhY2goZnVuY3Rpb24gKHRhZywgaWR4KSB7XHJcbiAgICAgICAgbWVudS5hZGQoJ2knKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhYicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhtZW51TGlzdFtpZHhdKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzU0cHgnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0U2hhZG93OiAnIDAgMCA1cHgnLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJzAuM3MnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihsaW5rc1tpZHhdLCAnX2JsYW5rJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzAwNzdCNScsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LCAnc3R5bGUnKVxyXG4gICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcnLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSwgJ3N0eWxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgbWFpbkNvbnRlbnRDb250YWluZXIgPSBjYy5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBoZWlnaHQ6ICdjYWxjKDEwMHZoIC0gMTAwcHgpJyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzAgMTIuNSUnLFxyXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnMjV2aCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICB6SW5kZXg6IDUsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJYID0gd2luZG93LmlubmVyV2lkdGggLyAyO1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIGxldCBtb3VzZVggPSBlLmNsaWVudFg7XHJcbiAgICAgICAgICAgIGxldCBtb3VzZVkgPSBlLmNsaWVudFk7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgnICsgKC0obW91c2VYIC0gY2VudGVyWCkgLyAxMDApICsgJ3B4LCcgKyAoLShtb3VzZVkgLSBjZW50ZXJZKSAvIDEwMCkgKyAncHgpJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5iaW5kKCdmcmFtZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGRvbXMgPSBjYy5zZWxlY3QoJy5mYWRlJyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9tcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRvbSA9IGRvbXNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgaXNJblZpZXdQb3J0ID0gZG9tLmlzSW5WaWV3cG9ydCh7b2Zmc2V0WTogMTIwfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3BhY2l0eSA9ICtkb20uc3R5bGUub3BhY2l0eTtcclxuICAgICAgICAgICAgICAgIGlmIChvcGFjaXR5ID4gMCAmJiAhaXNJblZpZXdQb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSA9IG9wYWNpdHkgLSAwLjA1O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9wYWNpdHkgPCAxICYmIGlzSW5WaWV3UG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHkgPSBvcGFjaXR5ICsgMC4wMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCB0cmFuc2xhdGVZID0gMzAgLSBvcGFjaXR5ICogMzA7XHJcbiAgICAgICAgICAgICAgICBkb20uY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBvcGFjaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoJyArIHRyYW5zbGF0ZVkgKyAncHgpJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGhpZ2hMaWdodCA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAudGV4dChcIkxldCdzIG1ha2UgZGF0YSBhbGl2ZVwiKVxyXG4gICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzQ4cHgnLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGludHJvID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdwJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2ZhZGUnKVxyXG4gICAgICAgIC50ZXh0KFwiSSdtIGEgZnJvbnQtZW5kIGRldmVsb3BlciBmcm9tIEJheSBBcmVhLCBDYWxpZm9ybmlhLCBhbmQgY3VycmVudGx5IGxpdmluZyBpbiBTYW4gSm9zZS4gSSBlbmpveSBidWlsZGluZyByaWNoIFwiICtcclxuICAgICAgICAgICAgXCJpbnRlcmFjdGl2ZSB3ZWJzaXRlcyBhbmQgd2ViIGFwcHMgZnJvbSBzbWFsbCB0byBsYXJnZS4gXCIpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjBweCcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IHNraWxsQ29udGFpbmVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdkaXYnKTtcclxuICAgIGxldCBza2lsbFRpdGxlID0gc2tpbGxDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC50ZXh0KFwiU2tpbGxzXCIpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzQ4cHgnLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICcyNTZweCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgc2tpbGxDYXJkQ29udGFpbmVyID0gc2tpbGxDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzEyOHB4JyxcclxuICAgICAgICAgICAgZmxleFdyYXA6ICd3cmFwJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBza2lsbHMgPSBbJ2ZhLWh0bWw1JywgJ2ZhLWpzJywgJ2ZhLWNzczMtYWx0JywgJ2ZhLXJlYWN0J107XHJcbiAgICBsZXQgc2tpbGxOYW1lcyA9IFsnSFRNTDUnLCAnSmF2YXNjcmlwdCcsICdDU1MzJywgJ1JlYWN0J107XHJcbiAgICBsZXQgc2tpbGxDb2xvcnMgPSBbJyNlNDRkMjYnLCAnI2VlYWY0YicsICcjMDA3MGJhJywgJyM2MWRhZmInXTtcclxuICAgIHNraWxscy5mb3JFYWNoKGZ1bmN0aW9uIChpY29uLCBpZHgpIHtcclxuICAgICAgICBsZXQgY2FyZCA9IHNraWxsQ2FyZENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFkZScpLmFkZENsYXNzKCdmYWRlJylcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBtaW5XaWR0aDogJzMwMHB4JyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBmbGV4R3JvdzogMSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGxvZ28gPSBjYXJkLmFkZCgnaScpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFiJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKGljb24pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcyNTZweCcsXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6IHNraWxsQ29sb3JzW2lkeF0sXHJcbiAgICAgICAgICAgICAgICB0ZXh0U2hhZG93OiBza2lsbENvbG9yc1tpZHhdICsgJyAwIDAgMTBweCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG5hbWUgPSBjYXJkLmFkZCgncCcpXHJcbiAgICAgICAgICAgIC50ZXh0KHNraWxsTmFtZXNbaWR4XSlcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGNhcmVlckNvbnRhaW5lciA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgnZGl2Jyk7XHJcbiAgICBsZXQgY2FyZWVyVGl0bGUgPSBza2lsbENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLnRleHQoXCJDYXJlZXJcIilcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnNDhweCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzEyOHB4JyxcclxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnNjRweCcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IGNvbXBhbmllcyA9IFsnbmV0RWxhc3RpYyBTeXN0ZW1zLCBJbmMuJywgJ1NhbiBGcmFuY2lzY28gU3RhdGUgVW5pdmVyc2l0eScsICdTaGFuZ2hhaSBVbml2ZXJzaXR5J107XHJcbiAgICBsZXQgdGl0bGVzID0gWydTb2Z0d2FyZSBFbmdpbmVlcicsICdCUyAtIENvbXB1dGVyIEVuZ2luZWVyaW5nIFN0dWRlbnQnLCAnQVMgLSBDb21wdXRlciBBcHBsaWNhdGlvbiBUZWNobm9sb2d5IFN0dWRlbnQnXTtcclxuICAgIGxldCB0aW1lTGluZXMgPSBbJzIwMTcgLSBDdXJyZW50JywgJzIwMTMgLSAyMDE3JywgJzIwMDkgLSAyMDEzJ107XHJcbiAgICBsZXQgcHJvamVjdHMgPSB7XHJcbiAgICAgICAgJ25ldEVsYXN0aWMgU3lzdGVtcywgSW5jLic6IFsndkJORyBNYW5hZ2VtZW50IFN5c3RlbSAoVUkgTGVhZCknLCAnU0QtV0FOIE1hbmFnZW1lbnQgU3lzdGVtIChVSSBUZWFtIE1lbWJlciknLF1cclxuICAgIH07XHJcblxyXG4gICAgY29tcGFuaWVzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBhbnlOYW1lLCBpZHgpIHtcclxuICAgICAgICBsZXQgY2FyZCA9IGNhcmVlckNvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzY0cHgnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBjb21wYW55ID0gY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC50ZXh0KGNvbXBhbnlOYW1lKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCdcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBmb250U2l6ZSA9ICcyMHB4JztcclxuICAgICAgICBsZXQgdGl0bGUgPSBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLnRleHQodGl0bGVzW2lkeF0pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHRpbWVMaW5lID0gY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC50ZXh0KHRpbWVMaW5lc1tpZHhdKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgKHByb2plY3RzW2NvbXBhbnlOYW1lXSB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAocHJvamVjdCkge1xyXG4gICAgICAgICAgICBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgICAgIC50ZXh0KHByb2plY3QpXHJcbiAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgZm9vdGVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdwJylcclxuICAgICAgICAudGV4dCgnVGhpcyB3ZWJzaXRlIGlzIGJ1aWxkIGJ5IGNjSlMsIGEgc2VsZi1pbXBsZW1lbnRlZCBKYXZhc2NyaXB0IExpYnJhcnkuJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnMTI4cHgnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IGNvZGVCYWNrZ3JvdW5kVGV4dCA9IGluZGV4LnRvU3RyaW5nKCk7XHJcbiAgICBsZXQgY29sdW1uV2lkdGggPSBNYXRoLm1pbig0MDAgLCB3aW5kb3cuaW5uZXJXaWR0aCAtIDEyOCk7XHJcbiAgICBsZXQgY29sdW1uQ291bnQgPSBNYXRoLm1pbigyLCBNYXRoLmZsb29yKHdpbmRvdy5pbm5lcldpZHRoLyhjb2x1bW5XaWR0aCkpKTtcclxuICAgIGxldCBjb2RlQmFja2dyb3VuZCA9IGNvbnRhaW5lci5hZGQoJ3ByZScpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgICB0b3A6ICcxMjhweCcsXHJcbiAgICAgICAgICAgIGxlZnQ6ICc2NHB4JyxcclxuICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAncmdiYSgyNTUsMjU1LDI1NSwgMC4wNiknLFxyXG4gICAgICAgICAgICB6SW5kZXg6IDAsXHJcbiAgICAgICAgICAgIGNvbHVtbkNvdW50OiBjb2x1bW5Db3VudCxcclxuICAgICAgICAgICAgY29sdW1uV2lkdGg6IGNvbHVtbldpZHRoICsgJ3B4JyxcclxuICAgICAgICAgICAgd2lkdGg6ICdjYWxjKDEwMHZ3IC0gMTI4cHgpJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kYXRhKHtcclxuICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5iaW5kKCdmcmFtZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHtjb3VudGVyLCBzdHJ9ID0gdGhpcy5nZXREYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoJyArICgtbWFpbkNvbnRlbnRDb250YWluZXIuc2Nyb2xsVG9wLzYpICsgJ3B4KSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvdW50ZXIrPTI0O1xyXG4gICAgICAgICAgICBpZihjb3VudGVyID49IGNvZGVCYWNrZ3JvdW5kVGV4dC5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgY291bnRlciA9IGNvZGVCYWNrZ3JvdW5kVGV4dC5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gY29kZUJhY2tncm91bmRUZXh0LnN1YnN0cmluZygwLCBjb3VudGVyKSArICdfJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRhdGEoe2NvdW50ZXI6IGNvdW50ZXJ9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ3ZpZXdwb3J0JywgZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgbGV0IHtoZWlnaHQsIHdpZHRofSA9IGQ7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5XaWR0aCA9IE1hdGgubWluKDQwMCAsIHdpZHRoIC0gMTI4KTtcclxuICAgICAgICAgICAgbGV0IGNvbHVtbkNvdW50ID0gTWF0aC5taW4oMiwgTWF0aC5mbG9vcih3aWR0aC8oY29sdW1uV2lkdGgpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkNvdW50OiBjb2x1bW5Db3VudCxcclxuICAgICAgICAgICAgICAgIGNvbHVtbldpZHRoOiBjb2x1bW5XaWR0aCArICdweCcsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIG1haW5Db250YWluZXIuYWRkRWxlbWVudChjb250YWluZXIpO1xyXG4gICAgY29udGFpbmVyLmFkZEVsZW1lbnQoaGVhZGVyKTtcclxuICAgIGNvbnRhaW5lci5hZGRFbGVtZW50KG1haW5Db250ZW50Q29udGFpbmVyKTtcclxufVxyXG5pbmRleCgpOyJdLCJzb3VyY2VSb290IjoiIn0=