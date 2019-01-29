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
var RED = '#d63031';

var root = _cc2.default.select('#body');
var mainContainer = _cc2.default.createElement('div', 'test').css({
    background: BLACK,
    height: '100vh',
    width: '100vw',
    // padding: '0 12.5%',
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
var container = mainContainer.add('div').on('mousemove', function (e) {
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    this.css({
        transform: 'translate(' + -(mouseX - centerX) / 100 + 'px,' + -(mouseY - centerY) / 100 + 'px)'
    });
});

var header = container.add('div', 'header').css({
    display: 'flex',
    padding: '0 12.5%',
    paddingTop: '32px',
    paddingBottom: '16px',
    color: WHITE,
    fontWeight: 'bold',
    justifyContent: 'space-between',
    boxShadow: BLACK + ' 0 0 20px'
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
    overflowY: 'auto'
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
        //width: '33%',
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

mainContainer.addElement(container);
container.addElement(header);
container.addElement(mainContentContainer);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY29tbW9uL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy9jb21tb24vcmFmLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvc3RvcmFnZS9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL3hoci94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIklTX1dPUktFUiIsInNlbGYiLCJDT05URVhUIiwid2luZG93IiwiY2MiLCJsb2FkIiwiYWRkT25zIiwib3B0aW9ucyIsInNlbGVjdCIsImRvbSIsImNyZWF0ZUVsZW1lbnQiLCJjcmVhdGVFbGVtZW50TlMiLCJzZXRWYWx1ZSIsInN0b3JhZ2UiLCJzYXZlQXJyYXkiLCJhcnIiLCJpZGtleSIsImtleSIsIml0ZW0iLCJ1cGRhdGVWYWx1ZSIsImdldFZhbHVlIiwic2V0VGltZXIiLCJyYWYiLCJjYW5jZWxUaW1lciIsInJlcXVlc3QiLCJwYXJhbXMiLCJ4aHIiLCJsYXN0IiwiZnJhbWVUaWNrZXIiLCJpbW1lZGlhdGVseSIsImNvbW1vbiIsIm9iaiIsImZuIiwiTWF0aCIsInM0IiwiT2JqZWN0IiwiaXNJRSIsImlzQ2hyb21lIiwiaXNPcGVyYSIsIm9wciIsIm5hdmlnYXRvciIsInAiLCJzYWZhcmkiLCJkb2N1bWVudCIsIm91dHB1dCIsImFyZ3VtZW50cyIsImkiLCJFbGVtZW50IiwidmFsdWUiLCJyZXF1ZXN0VGltZW91dCIsInNldFRpbWVvdXQiLCJzdGFydCIsIkRhdGUiLCJoYW5kbGUiLCJjbGVhclJlcXVlc3RUaW1lb3V0IiwiY2xlYXJUaW1lb3V0Iiwic2VsZWN0b3IiLCJfc2VsZWN0b3IiLCJuYW1lIiwiZG9tcyIsImlkIiwiZWxlbWVudCIsImVsZW1lbnRJZCIsInRhZyIsInNldHVwRWxlbWVudE1ldGhvZHMiLCJjaGlsZCIsImV2ZW50VGFnIiwiZXZlbnROYW1lIiwiZXZlbnRIYW5kbGVyIiwidiIsIm9mZnNldFgiLCJvZmZzZXRZIiwieDIiLCJ4IiwieTIiLCJ5IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiZGF0YU1hcCIsInRpbWVyTWFwIiwic2hvdWxkUmVhY3QiLCJvbGRWYWx1ZSIsInJlc2V0IiwibmV3VmFsdWUiLCJicm9hZGNhc3QiLCJ0aW1lciIsImFqYXgiLCJtZXRob2QiLCJhc3luYyIsImhlYWRlciIsImRvbmUiLCJmYWlsIiwiZSIsIm9uUHJvZ3Jlc3MiLCJfZGF0YSIsImNvbnRlbnRUeXBlIiwiSlNPTiIsImJlZm9yZVNlbmQiLCJXSElURSIsIkJMQUNLIiwiUkVEIiwicm9vdCIsIm1haW5Db250YWluZXIiLCJiYWNrZ3JvdW5kIiwiaGVpZ2h0Iiwid2lkdGgiLCJib3hTaGFkb3ciLCJhbmltYXRpb25Db3VudGVyIiwiY291bnRlciIsIm9wYWNpdHkiLCJjb250YWluZXIiLCJjZW50ZXJYIiwiY2VudGVyWSIsIm1vdXNlWCIsIm1vdXNlWSIsInRyYW5zZm9ybSIsImRpc3BsYXkiLCJwYWRkaW5nIiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJjb2xvciIsImZvbnRXZWlnaHQiLCJqdXN0aWZ5Q29udGVudCIsImhlYWRlckxlZnQiLCJtaW5XaWR0aCIsImxvZ28iLCJmb250U2l6ZSIsImxpbmVIZWlnaHQiLCJtYXJnaW5SaWdodCIsIm5hbWVDb250YWluZXIiLCJtZW51IiwibWVudUxpc3QiLCJsaW5rcyIsImhvdmVyQ29sb3JzIiwiY3Vyc29yIiwidGV4dEFsaWduIiwidGV4dFNoYWRvdyIsInRyYW5zaXRpb24iLCJtYWluQ29udGVudENvbnRhaW5lciIsIm92ZXJmbG93WSIsImlzSW5WaWV3UG9ydCIsInRyYW5zbGF0ZVkiLCJoaWdoTGlnaHQiLCJpbnRybyIsInNraWxsQ29udGFpbmVyIiwic2tpbGxUaXRsZSIsIm1hcmdpblRvcCIsInNraWxsQ2FyZENvbnRhaW5lciIsImZsZXhXcmFwIiwic2tpbGxzIiwic2tpbGxOYW1lcyIsInNraWxsQ29sb3JzIiwiY2FyZCIsImZsZXhHcm93IiwiY2FyZWVyQ29udGFpbmVyIiwiY2FyZWVyVGl0bGUiLCJtYXJnaW5Cb3R0b20iLCJjb21wYW5pZXMiLCJ0aXRsZXMiLCJ0aW1lTGluZXMiLCJwcm9qZWN0cyIsImNvbXBhbnkiLCJ0aXRsZSIsInRpbWVMaW5lIiwiZm9vdGVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLFlBQVlDLGdCQUFsQjtBQUNBLElBQU1DLFVBQVVGLG1CQUFoQjs7QUFFQTtBQUNBRyxZQUFZQyxLQUFLO0FBQ2JDLFVBQU0sZ0JBQW1DO0FBQUEsWUFBMUJDLFNBQTBCLG9FQUFqQixF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aW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCBkb20gZnJvbSAnLi9kb20vZG9tJztcclxuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi9zdG9yYWdlL3N0b3JhZ2UnO1xyXG5pbXBvcnQgcmFmIGZyb20gJy4vY29tbW9uL3JhZic7XHJcbmltcG9ydCB4aHIgZnJvbSAnLi94aHIveGhyJztcclxuXHJcbmNvbnN0IElTX1dPUktFUiA9IHNlbGYud2luZG93ID09PSB1bmRlZmluZWQ7XHJcbmNvbnN0IENPTlRFWFQgPSBJU19XT1JLRVIgPyBzZWxmIDogd2luZG93O1xyXG5cclxudmFyIGNjO1xyXG53aW5kb3cuY2MgPSBjYyA9IHtcclxuICAgIGxvYWQ6IGZ1bmN0aW9uKGFkZE9ucyA9IFtdLCBvcHRpb25zID0ge30pe1xyXG5cclxuICAgIH0sXHJcbiAgICBzZWxlY3Q6IGZ1bmN0aW9uKHNlbGVjdG9yKXtcclxuICAgICAgICByZXR1cm4gZG9tLnNlbGVjdChzZWxlY3RvcilcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbiAodGFnTmFtZSwgaWQsIG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gZG9tLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgaWQsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudE5TOiBmdW5jdGlvbiAodGFnTmFtZSwgaWQsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMuTlMgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBkb20uY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBpZCwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIG9wdGlvbnMucmVzZXQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlLnNldFZhbHVlKGtleSwgdmFsdWUsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgc2F2ZUFycmF5OiBmdW5jdGlvbihrZXksIGFyciA9IFtdLCBpZGtleSl7XHJcbiAgICAgICAgaWYoaWRrZXkgIT09IHVuZGVmaW5lZCAmJiBpZGtleSAhPT0gJycgJiYga2V5ICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgY2MudXBkYXRlVmFsdWUoaXRlbVtpZGtleV0sIGl0ZW0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2Muc2V0VmFsdWUoa2V5LCBhcnIpO1xyXG4gICAgfSxcclxuICAgIHVwZGF0ZVZhbHVlOiBmdW5jdGlvbihrZXksIHZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlLnNldFZhbHVlKGtleSwgdmFsdWUsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgZ2V0VmFsdWU6ICBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2UuZ2V0VmFsdWUoa2V5KTtcclxuICAgIH0sXHJcbiAgICBzZXRUaW1lcjogZnVuY3Rpb24gKGZuLCBkZWxheSkge1xyXG4gICAgICAgIHJldHVybiByYWYucmVxdWVzdFRpbWVvdXQoZm4sIGRlbGF5KVxyXG4gICAgfSxcclxuICAgIGNhbmNlbFRpbWVyOiBmdW5jdGlvbiAoaGFuZGxlKSB7XHJcbiAgICAgICAgcmFmLmNsZWFyUmVxdWVzdFRpbWVvdXQoaGFuZGxlKTtcclxuICAgIH0sXHJcbiAgICByZXF1ZXN0OiBmdW5jdGlvbiAocGFyYW1zID0ge30pIHtcclxuICAgICAgICByZXR1cm4geGhyLmFqYXgocGFyYW1zKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5pZihJU19XT1JLRVIpe1xyXG4gICAgZGVsZXRlIGNjLnNlbGVjdDtcclxuICAgIGRlbGV0ZSBjYy5jcmVhdGVFbGVtZW50O1xyXG4gICAgZGVsZXRlIGNjLmNyZWF0ZUVsZW1lbnROUztcclxufWVsc2V7XHJcbiAgICBsZXQgbGFzdCA9IDBcclxuICAgIGxldCBmcmFtZVRpY2tlciA9IGZ1bmN0aW9uICh0aW1lc3RhbXApIHtcclxuICAgICAgICBjYy5zZXRWYWx1ZSgnZnJhbWUnLCB0aW1lc3RhbXAsIHtpbW1lZGlhdGVseTogdHJ1ZX0pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2codGltZXN0YW1wIC0gbGFzdCk7XHJcbiAgICAgICAgbGFzdCA9IHRpbWVzdGFtcDtcclxuICAgICAgICByYWYucmVxdWVzdFRpbWVvdXQoZnJhbWVUaWNrZXIsIDE2KVxyXG4gICAgfTtcclxuICAgIGZyYW1lVGlja2VyKDApO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2M7IiwiY29uc3QgSVNfV09SS0VSID0gc2VsZi53aW5kb3cgPT09IHVuZGVmaW5lZDtcclxuY29uc3QgQ09OVEVYVCA9IElTX1dPUktFUiA/IHNlbGYgOiB3aW5kb3c7XHJcbmNvbnN0IGNvbW1vbiA9IHt9O1xyXG5cclxuY29tbW9uLm9iamVjdGZvckVhY2ggPSBmdW5jdGlvbihvYmosZm4pe1xyXG4gICAgZm9yKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIGZuKG9ialtrZXldLCBrZXksIG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuY29tbW9uLmNyZWF0ZUlkID0gZnVuY3Rpb24oKXtcclxuICAgIGZ1bmN0aW9uIHM0KCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxyXG4gICAgICAgICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcbn07XHJcblxyXG5jb21tb24uaXNPYmplY3QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIChpdGVtIT09dW5kZWZpbmVkICYmIGl0ZW0gPT09IE9iamVjdChpdGVtKSAmJiAhKGl0ZW0gaW5zdGFuY2VvZiBBcnJheSkpXHJcbn07XHJcblxyXG5jb21tb24uZ2V0QnJvd3NlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGlzSUUgPSBmYWxzZTtcclxuICAgIGxldCBpc0Nocm9tZSA9IGZhbHNlO1xyXG4gICAgbGV0IGlzT3BlcmEgPSBmYWxzZTtcclxuICAgIGlmICgoISFDT05URVhULm9wciAmJiAhIW9wci5hZGRvbnMpIHx8ICEhQ09OVEVYVC5vcGVyYSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBPUFIvJykgPj0gMCkge1xyXG4gICAgICAgIGlzT3BlcmEgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiAnb3BlcmEnO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBJbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xyXG4gICAgfVxyXG4gICAgaWYgKC9jb25zdHJ1Y3Rvci9pLnRlc3QoQ09OVEVYVC5IVE1MRWxlbWVudCkgfHwgKGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgcmV0dXJuIHAudG9TdHJpbmcoKSA9PT0gXCJbb2JqZWN0IFNhZmFyaVJlbW90ZU5vdGlmaWNhdGlvbl1cIjtcclxuICAgIH0pKCFDT05URVhUWydzYWZhcmknXSB8fCBzYWZhcmkucHVzaE5vdGlmaWNhdGlvbikpIHtcclxuICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XHJcbiAgICB9XHJcbiAgICBpZiAoZmFsc2UgfHwgISFkb2N1bWVudC5kb2N1bWVudE1vZGUpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50c1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoISgncmVtb3ZlJyBpbiBFbGVtZW50LnByb3RvdHlwZSkpIHtcclxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXNJRSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuICdpZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoIWlzSUUgJiYgISFDT05URVhULlN0eWxlTWVkaWEpIHtcclxuICAgICAgICByZXR1cm4gJ2VkZ2UnO1xyXG4gICAgfVxyXG4gICAgaWYgKCEhQ09OVEVYVC5jaHJvbWUgJiYgISFDT05URVhULmNocm9tZS53ZWJzdG9yZSkge1xyXG4gICAgICAgIGlzQ2hyb21lID0gdHJ1ZVxyXG4gICAgICAgIHJldHVybiAnY2hyb21lJztcclxuICAgIH1cclxuICAgIGlmICgoaXNDaHJvbWUgfHwgaXNPcGVyYSkgJiYgISFDT05URVhULkNTUykge1xyXG4gICAgICAgIHJldHVybiAnYmxpbmsnO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29tbW9uLnJlYWRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgaWYodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpe1xyXG4gICAgICAgIHJldHVybiB2YWx1ZShvcHRpb25zKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1vbjsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxudmFyIHJhZiA9IHtcclxuICAgIHJlcXVlc3RUaW1lb3V0OiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgaWYgKCFDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZSlcclxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZm4sIGRlbGF5KTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgaGFuZGxlID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb29wKHRpbWVzdGFtcCkge1xyXG4gICAgICAgICAgICAoRGF0ZS5ub3coKSAtIHN0YXJ0KSA+PSBkZWxheSA/IGZuKHRpbWVzdGFtcCkgOiBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICByZXR1cm4gaGFuZGxlO1xyXG4gICAgfSxcclxuICAgIGNsZWFyUmVxdWVzdFRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICBDT05URVhULmNhbmNlbEFuaW1hdGlvbkZyYW1lID8gQ09OVEVYVC5jYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpOmNsZWFyVGltZW91dChoYW5kbGUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmFmOyIsImltcG9ydCBjb21tb24gZnJvbSAnLi4vY29tbW9uL2NvbW1vbidcclxudmFyIGRvbSA9IHtcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIGlmKHNlbGVjdG9yPT09dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IF9zZWxlY3RvciA9IHNlbGVjdG9yLmNoYXJBdCgwKTtcclxuICAgICAgICBsZXQgbmFtZSA9IHNlbGVjdG9yLnN1YnN0cmluZygxKTtcclxuICAgICAgICBsZXQgZG9tcyA9IFtdO1xyXG4gICAgICAgIHN3aXRjaCAoX3NlbGVjdG9yKXtcclxuICAgICAgICAgICAgY2FzZSAnIyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZSk7XHJcbiAgICAgICAgICAgIGNhc2UgJy4nOlxyXG4gICAgICAgICAgICAgICAgZG9tcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobmFtZSkgfHwgW107XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGRvbXMgPSAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoc2VsZWN0b3IpIHx8IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRvbXM7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHRhZywgaWQgPSAnJywgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgICAgIGxldCBlbGVtZW50SWQgPSBpZCB8fCAodGFnICsgJ18nICsgY29tbW9uLmNyZWF0ZUlkKCkpO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIGVsZW1lbnRJZCk7XHJcblxyXG4gICAgICAgIHNldHVwRWxlbWVudE1ldGhvZHMoZWxlbWVudCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldHVwRWxlbWVudE1ldGhvZHMoZWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMgPSBuZXcgTWFwKCk7XHJcbiAgICBlbGVtZW50Ll9ib3VuZCA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBlbGVtZW50LmFkZCA9IGZ1bmN0aW9uICh0YWcsIGlkLCBvcHRpb25zKSB7XHJcbiAgICAgICAgbGV0IGNoaWxkID0gZG9tLmNyZWF0ZUVsZW1lbnQodGFnLCBpZCwgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRWxlbWVudChjaGlsZCk7XHJcbiAgICB9O1xyXG4gICAgZWxlbWVudC5hZGRFbGVtZW50ID0gZnVuY3Rpb24gKGNoaWxkKSB7XHJcbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkXHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYWRkQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG4gICAgZWxlbWVudC5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGVsZW1lbnQuZ2V0QXR0ciA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKGtleSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYXR0ciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudCgnYXR0cicsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmdldERhdGEgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfTtcclxuICAgIGVsZW1lbnQuZGF0YSA9IGZ1bmN0aW9uKGFueSl7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGFueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5nZXRQcm9wID0gZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudFtrZXldO1xyXG4gICAgfTtcclxuICAgIGVsZW1lbnQucHJvcCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudCgncHJvcCcsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmNzcyA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xyXG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnQoJ2NzcycsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmJpbmQgPSBmdW5jdGlvbihrZXksIGZuKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fYm91bmQuc2V0KGtleSwgZm4pO1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnc3RvcmFnZV8nICsga2V5KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBlbGVtZW50LnVuYmluZCA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnc3RvcmFnZV8nICsga2V5KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5fcmVhY3QgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcclxuICAgICAgICBsZXQgZm4gPSB0aGlzLl9ib3VuZC5nZXQoa2V5KTtcclxuICAgICAgICBpZihmbil7XHJcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcywgdmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGVsZW1lbnQub24gID0gZnVuY3Rpb24oZXZlbnROYW1lLCBmbiwgdGFnID0gJycpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZXZlbnRUYWcgPSBldmVudE5hbWUgKyB0YWc7XHJcbiAgICAgICAgbGV0IGV2ZW50SGFuZGxlciA9IGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzLmdldChldmVudFRhZyk7XHJcbiAgICAgICAgaWYoZXZlbnRIYW5kbGVyKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuZGVsZXRlKGV2ZW50VGFnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZm4pIHtcclxuICAgICAgICAgICAgZXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGZuLmNhbGwoc2VsZiwgZSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzLnNldChldmVudFRhZywgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQudGV4dCA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICB0aGlzLmlubmVyVGV4dCA9IHN0cjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5fc2V0RWxlbWVudCA9IGZ1bmN0aW9uKHR5cGUsIGtleSAsIHZhbHVlKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgY29tbW9uLm9iamVjdGZvckVhY2goa2V5ICxmdW5jdGlvbiAoaXRlbSwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmW3R5cGVdKGtleSwgaXRlbSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHYgPSBjb21tb24ucmVhZFZhbHVlKHZhbHVlKTtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3AnOlxyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dHInOlxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKGtleSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjc3MnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZVtrZXldID0gIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnQuaXNJblZpZXdwb3J0ID0gZnVuY3Rpb24gKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGxldCBvZmZzZXRYID0gb3B0aW9ucy5vZmZzZXRYIHx8IDA7XHJcbiAgICAgICAgbGV0IG9mZnNldFkgPSBvcHRpb25zLm9mZnNldFkgfHwgMDtcclxuICAgICAgICBsZXQge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgLy9JRSBub3Qgc3VwcG9ydCBib3R0b20gcmlnaHRcclxuICAgICAgICBsZXQgeDIgPSB4ICsgd2lkdGg7XHJcbiAgICAgICAgbGV0IHkyID0geSArIGhlaWdodDtcclxuICAgICAgICBsZXQgaW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGxldCBpbm5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICByZXR1cm4gISh4MiA8PSAoMCArIG9mZnNldFgpfHwgeCA+PSAoaW5uZXJXaWR0aCAtIG9mZnNldFgpIHx8IHkyIDw9ICgwICsgb2Zmc2V0WSkgfHwgeSA+PSAoaW5uZXJIZWlnaHQgLSBvZmZzZXRZKSlcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRvbTsiLCJpbXBvcnQgY29tbW9uIGZyb20gJy4uL2NvbW1vbi9jb21tb24nO1xyXG5cclxudmFyIHN0b3JhZ2UgPSB7XHJcbiAgICBkYXRhTWFwOiBuZXcgTWFwKCksXHJcbiAgICB0aW1lck1hcDogIG5ldyBNYXAoKSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBkYXRhTWFwID0gdGhpcy5kYXRhTWFwO1xyXG4gICAgICAgIGxldCB7cmVzZXR9ID0gb3B0aW9ucztcclxuICAgICAgICBsZXQgc2hvdWxkUmVhY3QgPSBmYWxzZTtcclxuICAgICAgICBsZXQgb2xkVmFsdWUgPSBkYXRhTWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmKGNvbW1vbi5pc09iamVjdCh2YWx1ZSkgJiYgY29tbW9uLmlzT2JqZWN0KG9sZFZhbHVlKSAmJiByZXNldCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjb21tb24ub2JqZWN0Zm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gKGl0ZW0sIGtleSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG91bGRSZWFjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHZhbHVlW2tleV1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBzaG91bGRSZWFjdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGRhdGFNYXAuc2V0KGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gZGF0YU1hcC5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgaWYoc2hvdWxkUmVhY3QpIHtcclxuICAgICAgICAgICB0aGlzLmJyb2FkY2FzdChrZXksIG5ld1ZhbHVlLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdWYWx1ZTtcclxuICAgIH0sXHJcbiAgICBicm9hZGNhc3Q6IGZ1bmN0aW9uKGtleSwgbmV3VmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB0aW1lciA9IHRoaXMudGltZXJNYXAuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIGlmICh0aW1lcikge1xyXG4gICAgICAgICAgICBjYy5jYW5jZWxUaW1lcih0aW1lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aW1lciA9IGNjLnNldFRpbWVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGRvbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzdG9yYWdlXycgKyBrZXkpIHx8IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkb20gPSBkb21zW2ldO1xyXG4gICAgICAgICAgICAgICAgZG9tLl9yZWFjdCAmJiBkb20uX3JlYWN0KGtleSwgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYudGltZXJNYXAuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgfSwgb3B0aW9ucy5pbW1lZGlhdGVseT8gMDogMTApO1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVyTWFwLnNldChrZXksIHRpbWVyKTtcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFNYXAuZ2V0KGtleSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdG9yYWdlOyIsImNvbnN0IHhociA9IHtcclxuICAgIGFqYXg6IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xyXG4gICAgICAgIGxldCB7dXJsLCBtZXRob2QsIGRhdGEsIHJlZiwgYXN5bmMsIHhociwgY29udGVudFR5cGUsIG5vQXV0aCwgZGF0YVR5cGUsIHByb2Nlc3NEYXRhLCBjYWNoZSwgbm9KU09OLCBhamF4LCBkb25lLCBmYWlsLCBoZWF2eX0gPSBwYXJhbXMgfHwge307XHJcbiAgICAgICAgbGV0IHtoZWFkZXIsIG9uUHJvZ3Jlc3MsIGJlZm9yZVNlbmR9ID0gcGFyYW1zO1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKChtZXRob2QgfHwgJ0dFVCcpLCB1cmwsIGFzeW5jID09PSB1bmRlZmluZWQgPyB0cnVlIDogYXN5bmMpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gKGhlYWRlciB8fCB7fSkpIHtcclxuICAgICAgICAgICAgaWYgKChoZWFkZXIgfHwge30pLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcltrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcclxuICAgICAgICAgICAgICAgIGRvbmUocmVxdWVzdCk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGZhaWwocmVxdWVzdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZmFpbChyZXF1ZXN0KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlcXVlc3QudXBsb2FkLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBsZXQgcCA9IE1hdGguZmxvb3IoZS5sb2FkZWQgLyBlLnRvdGFsICogMTAwKTtcclxuICAgICAgICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKHAsIGUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBfZGF0YTtcclxuICAgICAgICBzd2l0Y2ggKGRhdGFUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2ZpbGUnOlxyXG4gICAgICAgICAgICAgICAgX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2pzb24nOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSA9PT0gdW5kZWZpbmVkID8gXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIgOiBjb250ZW50VHlwZSk7XHJcbiAgICAgICAgICAgICAgICBfZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYmVmb3JlU2VuZCAmJiBiZWZvcmVTZW5kKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICByZXF1ZXN0LnNlbmQoX2RhdGEpO1xyXG4gICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeGhyO1xyXG4iLCJpbXBvcnQgY2MgZnJvbSAnLi9jY2pzL2NjJztcclxuXHJcbmNvbnN0IFdISVRFID0gJ3JnYmEoMjU1LDI1NSwyNTUsIDAuNyknO1xyXG5jb25zdCBCTEFDSyA9ICdyZ2JhKDAsMCwwLCAwLjkpJztcclxuY29uc3QgUkVEID0gJyNkNjMwMzEnO1xyXG5cclxubGV0IHJvb3QgPSBjYy5zZWxlY3QoJyNib2R5Jyk7XHJcbmxldCBtYWluQ29udGFpbmVyID0gY2MuY3JlYXRlRWxlbWVudCgnZGl2JywgJ3Rlc3QnKVxyXG4gICAgLmNzcyh7XHJcbiAgICAgICAgYmFja2dyb3VuZDogQkxBQ0ssXHJcbiAgICAgICAgaGVpZ2h0OiAnMTAwdmgnLFxyXG4gICAgICAgIHdpZHRoOiAnMTAwdncnLFxyXG4gICAgICAgIC8vIHBhZGRpbmc6ICcwIDEyLjUlJyxcclxuICAgICAgICBib3hTaGFkb3c6IEJMQUNLICsnMCAwIDEwcHggMjBweCdcclxuICAgIH0pXHJcbiAgICAuZGF0YSh7XHJcbiAgICAgICAgYW5pbWF0aW9uQ291bnRlcjogMCxcclxuICAgIH0pXHJcbiAgICAuYmluZCgnZnJhbWUnLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gdGhpcy5nZXREYXRhKCkuYW5pbWF0aW9uQ291bnRlcjtcclxuICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IGNvdW50ZXIvNjBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmRhdGEoe2FuaW1hdGlvbkNvdW50ZXI6Y291bnRlcisxfSk7XHJcbiAgICAgICAgaWYoY291bnRlciA+PSA2MCl7XHJcbiAgICAgICAgICAgIHRoaXMudW5iaW5kKCdmcmFtZScpXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5yb290LmFwcGVuZENoaWxkKG1haW5Db250YWluZXIpO1xyXG5sZXQgY29udGFpbmVyID0gbWFpbkNvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IGNlbnRlclggPSB3aW5kb3cuaW5uZXJXaWR0aC8yO1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gd2luZG93LmlubmVySGVpZ2h0LzI7XHJcbiAgICAgICAgbGV0IG1vdXNlWCA9IGUuY2xpZW50WDtcclxuICAgICAgICBsZXQgbW91c2VZID0gZS5jbGllbnRZO1xyXG4gICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKCcrKC0obW91c2VYLWNlbnRlclgpLzEwMCkrJ3B4LCcrKC0obW91c2VZLWNlbnRlclkpLzEwMCkrJ3B4KSdcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG5sZXQgaGVhZGVyID0gY29udGFpbmVyLmFkZCgnZGl2JywgJ2hlYWRlcicpXHJcbiAgICAuY3NzKHtcclxuICAgICAgICBkaXNwbGF5OidmbGV4JyxcclxuICAgICAgICBwYWRkaW5nOiAnMCAxMi41JScsXHJcbiAgICAgICAgcGFkZGluZ1RvcDogJzMycHgnLFxyXG4gICAgICAgIHBhZGRpbmdCb3R0b206ICcxNnB4JyxcclxuICAgICAgICBjb2xvcjogV0hJVEUsXHJcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgYm94U2hhZG93OiBCTEFDSyArJyAwIDAgMjBweCdcclxuICAgIH0pO1xyXG5sZXQgaGVhZGVyTGVmdCA9IGhlYWRlci5hZGQoJ2RpdicpXHJcbiAgICAuY3NzKHtcclxuICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICBtaW5XaWR0aDonMjU2cHgnXHJcbiAgICB9KTtcclxubGV0IGxvZ28gPSBoZWFkZXJMZWZ0LmFkZCgnZGl2JylcclxuICAgIC50ZXh0KCdBJylcclxuICAgIC5jc3Moe1xyXG4gICAgICAgIGJhY2tncm91bmQ6IFJFRCxcclxuICAgICAgICBmb250U2l6ZTogJzY0cHgnLFxyXG4gICAgICAgIHBhZGRpbmc6ICcwIDE2cHgnLFxyXG4gICAgICAgIGxpbmVIZWlnaHQ6ICc1NHB4JyxcclxuICAgICAgICBtYXJnaW5SaWdodDogJzRweCcsXHJcbiAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgYm94U2hhZG93OiBSRUQgKyAnIDAgMCAxMHB4JyxcclxuICAgICAgICBjb2xvcjogQkxBQ0tcclxuICAgIH0pO1xyXG5cclxubGV0IG5hbWVDb250YWluZXIgPSBoZWFkZXJMZWZ0LmFkZCgnZGl2JylcclxuICAgIC5jc3Moe1xyXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXHJcbiAgICB9KTtcclxubmFtZUNvbnRhaW5lci5hZGQoJ3NwYW4nKVxyXG4gICAgLnRleHQoJ05YSU4gWUFORycpXHJcbiAgICAuY3NzKHtcclxuICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgIGRpc3BsYXk6ICdibG9jaycsXHJcbiAgICB9KTtcclxubmFtZUNvbnRhaW5lci5hZGQoJ3NwYW4nKVxyXG4gICAgLnRleHQoJ0Zyb250LUVuZCBEZXZlbG9wZXInKVxyXG4gICAgLmNzcyh7XHJcbiAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICBkaXNwbGF5OiAnYmxvY2snXHJcbiAgICB9KTtcclxubGV0IG1lbnUgPSBoZWFkZXIuYWRkKCdkaXYnKVxyXG4gICAgLmNzcyh7XHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICB9KTtcclxubGV0IG1lbnVMaXN0ID0gWydmYS1saW5rZWRpbiddO1xyXG5sZXQgbGlua3MgPSBbJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9hbnhpbi15YW5nLTcwNzAyOTEyNS8nXTtcclxubGV0IGhvdmVyQ29sb3JzID0gWycjMDA3N0I1J107XHJcbm1lbnVMaXN0LmZvckVhY2goZnVuY3Rpb24gKHRhZywgaWR4KSB7XHJcbiAgIG1lbnUuYWRkKCdpJylcclxuICAgICAgIC5hZGRDbGFzcygnZmFiJylcclxuICAgICAgIC5hZGRDbGFzcyhtZW51TGlzdFtpZHhdKVxyXG4gICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgbGluZUhlaWdodDogJzU0cHgnLFxyXG4gICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICB0ZXh0U2hhZG93OiAnIDAgMCA1cHgnLFxyXG4gICAgICAgICAgIHRyYW5zaXRpb246ICcwLjNzJ1xyXG4gICAgICAgfSlcclxuICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgd2luZG93Lm9wZW4obGlua3NbaWR4XSwgJ19ibGFuaycpXHJcbiAgICAgICB9KVxyXG4gICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgY29sb3I6ICcjMDA3N0I1JyxcclxuICAgICAgICAgICB9KVxyXG4gICAgICAgfSwgJ3N0eWxlJylcclxuICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgIGNvbG9yOiAnJyxcclxuICAgICAgICAgICB9KVxyXG4gICAgICAgfSwgJ3N0eWxlJyk7XHJcbn0pO1xyXG5cclxubGV0IG1haW5Db250ZW50Q29udGFpbmVyID0gY2MuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIC5jc3Moe1xyXG4gICAgICAgIGhlaWdodDogJ2NhbGMoMTAwdmggLSAxMDBweCknLFxyXG4gICAgICAgIHBhZGRpbmc6ICcwIDEyLjUlJyxcclxuICAgICAgICBwYWRkaW5nVG9wOiAnMjV2aCcsXHJcbiAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxyXG4gICAgfSlcclxuICAgIC5iaW5kKCdmcmFtZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZG9tcyA9IGNjLnNlbGVjdCgnLmZhZGUnKTtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZG9tcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGxldCBkb20gPSBkb21zW2ldO1xyXG4gICAgICAgICAgICBsZXQgaXNJblZpZXdQb3J0ID0gZG9tLmlzSW5WaWV3cG9ydCh7b2Zmc2V0WTogMTIwfSk7XHJcbiAgICAgICAgICAgIGxldCBvcGFjaXR5ID0gK2RvbS5zdHlsZS5vcGFjaXR5O1xyXG4gICAgICAgICAgICBpZihvcGFjaXR5ID4gMCAmJiAhaXNJblZpZXdQb3J0KXtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHkgPSBvcGFjaXR5IC0gMC4wNTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihvcGFjaXR5IDwgMSAmJiBpc0luVmlld1BvcnQpe1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eSA9IG9wYWNpdHkgKyAwLjAzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCB0cmFuc2xhdGVZID0gMzAgLSBvcGFjaXR5KjMwO1xyXG4gICAgICAgICAgICBkb20uY3NzKHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHksXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKCcrIHRyYW5zbGF0ZVkgKydweCknXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbmxldCBoaWdoTGlnaHQgPSBtYWluQ29udGVudENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAudGV4dChcIkxldCdzIG1ha2UgZGF0YSBhbGl2ZVwiKVxyXG4gICAgLmFkZENsYXNzKCdmYWRlJylcclxuICAgIC5jc3Moe1xyXG4gICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgZm9udFNpemU6ICc0OHB4JyxcclxuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgfSk7XHJcbmxldCBpbnRybyA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgncCcpXHJcbiAgICAuYWRkQ2xhc3MoJ2ZhZGUnKVxyXG4gICAgLnRleHQoXCJJJ20gYSBmcm9udC1lbmQgZGV2ZWxvcGVyIGZyb20gQmF5IEFyZWEsIENhbGlmb3JuaWEsIGFuZCBjdXJyZW50bHkgbGl2aW5nIGluIFNhbiBKb3NlLiBJIGVuam95IGJ1aWxkaW5nIHJpY2ggXCIgK1xyXG4gICAgICAgIFwiaW50ZXJhY3RpdmUgd2Vic2l0ZXMgYW5kIHdlYiBhcHBzIGZyb20gc21hbGwgdG8gbGFyZ2UuIFwiKVxyXG4gICAgLmNzcyh7XHJcbiAgICAgICAgZm9udFNpemU6ICcyMHB4JyxcclxuICAgIH0pO1xyXG5cclxubGV0IHNraWxsQ29udGFpbmVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdkaXYnKTtcclxubGV0IHNraWxsVGl0bGUgPSBza2lsbENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAudGV4dChcIlNraWxsc1wiKVxyXG4gICAgLmNzcyh7XHJcbiAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICBmb250U2l6ZTogJzQ4cHgnLFxyXG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgbWFyZ2luVG9wOiAnMjU2cHgnXHJcbiAgICB9KTtcclxuXHJcbmxldCBza2lsbENhcmRDb250YWluZXIgPSBza2lsbENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAuY3NzKHtcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICBtYXJnaW5Ub3A6ICcxMjhweCcsXHJcbiAgICAgICAgZmxleFdyYXA6ICd3cmFwJ1xyXG4gICAgfSk7XHJcblxyXG5sZXQgc2tpbGxzID0gWydmYS1odG1sNScsJ2ZhLWpzJywgJ2ZhLWNzczMtYWx0JywgJ2ZhLXJlYWN0J107XHJcbmxldCBza2lsbE5hbWVzID0gWydIVE1MNScsJ0phdmFzY3JpcHQnLCAnQ1NTMycsICdSZWFjdCddO1xyXG5sZXQgc2tpbGxDb2xvcnMgPSBbJyNlNDRkMjYnLCcjZWVhZjRiJywgJyMwMDcwYmEnLCAnIzYxZGFmYiddO1xyXG5za2lsbHMuZm9yRWFjaChmdW5jdGlvbiAoaWNvbiwgaWR4KSB7XHJcbiAgICBsZXQgY2FyZCA9IHNraWxsQ2FyZENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmYWRlJykuYWRkQ2xhc3MoJ2ZhZGUnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAvL3dpZHRoOiAnMzMlJyxcclxuICAgICAgICAgICAgbWluV2lkdGg6ICczMDBweCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIGZsZXhHcm93OiAxLFxyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGxvZ28gPSBjYXJkLmFkZCgnaScpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmYWInKVxyXG4gICAgICAgIC5hZGRDbGFzcyhpY29uKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzI1NnB4JyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICAgICAgY29sb3I6IHNraWxsQ29sb3JzW2lkeF0sXHJcbiAgICAgICAgICAgIHRleHRTaGFkb3c6IHNraWxsQ29sb3JzW2lkeF0gKyAnIDAgMCAxMHB4J1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IG5hbWUgPSBjYXJkLmFkZCgncCcpXHJcbiAgICAgICAgLnRleHQoc2tpbGxOYW1lc1tpZHhdKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcidcclxuICAgICAgICB9KVxyXG59KTtcclxuXHJcbmxldCBjYXJlZXJDb250YWluZXIgPSBtYWluQ29udGVudENvbnRhaW5lci5hZGQoJ2RpdicpO1xyXG5sZXQgY2FyZWVyVGl0bGUgPSBza2lsbENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAudGV4dChcIkNhcmVlclwiKVxyXG4gICAgLmNzcyh7XHJcbiAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICBmb250U2l6ZTogJzQ4cHgnLFxyXG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgbWFyZ2luVG9wOiAnMTI4cHgnLFxyXG4gICAgICAgIG1hcmdpbkJvdHRvbTogJzY0cHgnLFxyXG4gICAgfSk7XHJcblxyXG5sZXQgY29tcGFuaWVzID0gWyduZXRFbGFzdGljIFN5c3RlbXMsIEluYy4nLCAnU2FuIEZyYW5jaXNjbyBTdGF0ZSBVbml2ZXJzaXR5JywgJ1NoYW5naGFpIFVuaXZlcnNpdHknXTtcclxubGV0IHRpdGxlcyA9IFsnU29mdHdhcmUgRW5naW5lZXInLCAnQlMgLSBDb21wdXRlciBFbmdpbmVlcmluZyBTdHVkZW50JywgJ0FTIC0gQ29tcHV0ZXIgQXBwbGljYXRpb24gVGVjaG5vbG9neSBTdHVkZW50J107XHJcbmxldCB0aW1lTGluZXMgPSAgWycyMDE3IC0gQ3VycmVudCcsICcyMDEzIC0gMjAxNycsICcyMDA5IC0gMjAxMyddO1xyXG5sZXQgcHJvamVjdHMgPSB7XHJcbiAgICAnbmV0RWxhc3RpYyBTeXN0ZW1zLCBJbmMuJzogWyd2Qk5HIE1hbmFnZW1lbnQgU3lzdGVtIChVSSBMZWFkKScsJ1NELVdBTiBNYW5hZ2VtZW50IFN5c3RlbSAoVUkgVGVhbSBNZW1iZXIpJyxdXHJcbn07XHJcblxyXG5jb21wYW5pZXMuZm9yRWFjaChmdW5jdGlvbiAoY29tcGFueU5hbWUsIGlkeCkge1xyXG4gICAgbGV0IGNhcmQgPSBjYXJlZXJDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzY0cHgnXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgY29tcGFueSA9IGNhcmQuYWRkKCdkaXYnKVxyXG4gICAgICAgIC50ZXh0KGNvbXBhbnlOYW1lKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgZm9udFNpemUgPSAnMjBweCc7XHJcbiAgICBsZXQgdGl0bGUgPSBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAudGV4dCh0aXRsZXNbaWR4XSlcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCB0aW1lTGluZSA9IGNhcmQuYWRkKCdkaXYnKVxyXG4gICAgICAgIC50ZXh0KHRpbWVMaW5lc1tpZHhdKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAocHJvamVjdHNbY29tcGFueU5hbWVdIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9qZWN0KSB7XHJcbiAgICAgICAgY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC50ZXh0KHByb2plY3QpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxufSk7XHJcblxyXG5sZXQgZm9vdGVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdwJylcclxuICAgIC50ZXh0KCdUaGlzIHdlYnNpdGUgaXMgYnVpbGQgYnkgY2NKUywgYSBzZWxmLWltcGxlbWVudGVkIEphdmFzY3JpcHQgTGlicmFyeS4nKVxyXG4gICAgLmNzcyh7XHJcbiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICBtYXJnaW5Ub3A6ICcxMjhweCdcclxuICAgIH0pO1xyXG5cclxubWFpbkNvbnRhaW5lci5hZGRFbGVtZW50KGNvbnRhaW5lcik7XHJcbmNvbnRhaW5lci5hZGRFbGVtZW50KGhlYWRlcik7XHJcbmNvbnRhaW5lci5hZGRFbGVtZW50KG1haW5Db250ZW50Q29udGFpbmVyKTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=