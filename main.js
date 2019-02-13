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
        var eventHandler = element._eventListeners.get(eventTag);
        if (eventHandler) {
            this.removeEventListener(eventName, eventHandler);
            element._eventListeners.delete(eventTag);
        }
        if (fn) {
            eventHandler = function eventHandler(e) {
                fn.call(self, e, self._data);
            };
            element._eventListeners.set(eventTag, eventHandler);
            this.addEventListener(eventName, eventHandler, false);
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
    var logo = headerLeft.add('div').content('A').css({
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
    var highLight = mainContentContainer.add('div').content("Let's make data alive").addClass('fade').css({
        color: WHITE,
        fontWeight: 'bold',
        fontSize: '48px',
        textAlign: 'center'
    });
    var intro = mainContentContainer.add('p').addClass('fade').content("I'm a front-end developer from Bay Area, California, and currently living in San Jose. I enjoy building rich " + "interactive websites and web apps from small to large. ").css({
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

    var skills = ['fa-html5', 'fa-js', 'fa-css3-alt', 'fa-react', 'fa-node-js'];
    var skillNames = ['HTML5', 'Javascript', 'CSS3', 'React', 'NodeJS'];
    var skillColors = ['#e44d26', '#eeaf4b', '#0070ba', '#61dafb', '#7cb700'];
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

    var footer = mainContentContainer.add('p').content('This website is build by ccJS, a self-implemented Javascript Library.').css({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY29tbW9uL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy9jb21tb24vcmFmLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvc3RvcmFnZS9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL3hoci94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIklTX1dPUktFUiIsInNlbGYiLCJDT05URVhUIiwid2luZG93IiwiY2MiLCJ0b29scyIsImNvbW1vbiIsImxvYWQiLCJhZGRPbnMiLCJvcHRpb25zIiwic2VsZWN0IiwiZG9tIiwiY3JlYXRlRWxlbWVudCIsImNyZWF0ZUVsZW1lbnROUyIsInNldFZhbHVlIiwic3RvcmFnZSIsInNhdmVBcnJheSIsImFyciIsImlka2V5Iiwia2V5IiwiaXRlbSIsInVwZGF0ZVZhbHVlIiwiZ2V0VmFsdWUiLCJzZXRUaW1lciIsInJhZiIsImNhbmNlbFRpbWVyIiwicmVxdWVzdCIsInBhcmFtcyIsInhociIsImxhc3QiLCJmcmFtZVRpY2tlciIsImltbWVkaWF0ZWx5Iiwib2JqIiwiZm4iLCJzb3VyY2UiLCJ0YXJnZXQiLCJNYXRoIiwiczQiLCJPYmplY3QiLCJpc0lFIiwiaXNDaHJvbWUiLCJpc09wZXJhIiwib3ByIiwibmF2aWdhdG9yIiwicCIsInNhZmFyaSIsImRvY3VtZW50Iiwib3V0cHV0IiwiYXJndW1lbnRzIiwiaSIsIkVsZW1lbnQiLCJ2YWx1ZSIsInJlcXVlc3RUaW1lb3V0Iiwic2V0VGltZW91dCIsInN0YXJ0IiwiRGF0ZSIsImhhbmRsZSIsImNsZWFyUmVxdWVzdFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJzZWxlY3RvciIsIl9zZWxlY3RvciIsIm5hbWUiLCJkb21zIiwiaWQiLCJlbGVtZW50IiwiZWxlbWVudElkIiwidGFnIiwic2V0dXBFbGVtZW50TWV0aG9kcyIsImNoaWxkIiwiZXZlbnRUYWciLCJldmVudE5hbWUiLCJldmVudEhhbmRsZXIiLCJ2Iiwib2Zmc2V0WCIsIm9mZnNldFkiLCJ4MiIsIngiLCJ5MiIsInkiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJkYXRhTWFwIiwidGltZXJNYXAiLCJzaG91bGRSZWFjdCIsIm9sZFZhbHVlIiwicmVzZXQiLCJuZXdWYWx1ZSIsImJyb2FkY2FzdCIsInRpbWVyIiwiYWpheCIsInByb21pc2UiLCJtZXRob2QiLCJhc3luYyIsImhlYWRlciIsImRvbmUiLCJwYXJzZURhdGEiLCJyZXNvbHZlIiwiZmFpbCIsInJlamVjdCIsImUiLCJvblByb2dyZXNzIiwiX2RhdGEiLCJjb250ZW50VHlwZSIsIkpTT04iLCJiZWZvcmVTZW5kIiwiZGF0YSIsIldISVRFIiwiQkxBQ0siLCJCTEFDS19TT0xJRCIsIlJFRCIsIndpZHRoIiwiaGVpZ2h0Iiwicm9vdCIsIm1haW5Db250YWluZXIiLCJiYWNrZ3JvdW5kIiwiYm94U2hhZG93IiwiYW5pbWF0aW9uQ291bnRlciIsImNvdW50ZXIiLCJvcGFjaXR5IiwiY29udGFpbmVyIiwiZGlzcGxheSIsInBhZGRpbmciLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsImNvbG9yIiwiZm9udFdlaWdodCIsImp1c3RpZnlDb250ZW50IiwicG9zaXRpb24iLCJ6SW5kZXgiLCJoZWFkZXJMZWZ0IiwibWluV2lkdGgiLCJsb2dvIiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0IiwibWFyZ2luUmlnaHQiLCJuYW1lQ29udGFpbmVyIiwibWVudSIsIm1lbnVMaXN0IiwibGlua3MiLCJob3ZlckNvbG9ycyIsImN1cnNvciIsInRleHRBbGlnbiIsInRleHRTaGFkb3ciLCJ0cmFuc2l0aW9uIiwibWFpbkNvbnRlbnRDb250YWluZXIiLCJvdmVyZmxvd1kiLCJjZW50ZXJYIiwiY2VudGVyWSIsIm1vdXNlWCIsIm1vdXNlWSIsInRyYW5zZm9ybSIsImlzSW5WaWV3UG9ydCIsInRyYW5zbGF0ZVkiLCJoaWdoTGlnaHQiLCJpbnRybyIsInNraWxsQ29udGFpbmVyIiwic2tpbGxUaXRsZSIsIm1hcmdpblRvcCIsInNraWxsQ2FyZENvbnRhaW5lciIsImZsZXhXcmFwIiwic2tpbGxzIiwic2tpbGxOYW1lcyIsInNraWxsQ29sb3JzIiwiY2FyZCIsImZsZXhHcm93IiwiY2FyZWVyQ29udGFpbmVyIiwiY2FyZWVyVGl0bGUiLCJtYXJnaW5Cb3R0b20iLCJjb21wYW5pZXMiLCJ0aXRsZXMiLCJ0aW1lTGluZXMiLCJwcm9qZWN0cyIsImNvbXBhbnkiLCJ0aXRsZSIsInRpbWVMaW5lIiwiZm9vdGVyIiwiY29kZUJhY2tncm91bmRUZXh0IiwiaW5kZXgiLCJjb2x1bW5XaWR0aCIsImNvbHVtbkNvdW50IiwiY29kZUJhY2tncm91bmQiLCJ0b3AiLCJsZWZ0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStE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QUFDTixxQkFBRCxZQUFqQixJQUFzRDtBQUQ1RCxTQUFUO0FBR0EzQjtBQUNBLFlBQUdBLFdBQVcyRCxtQkFBZCxRQUF3QztBQUNwQzNELHNCQUFVMkQsNEJBQVYzRDtBQURKLGVBRUs7QUFDRCw2QkFBaUIyRCwyQ0FBakI7QUFDSDtBQUNELGtCQUFVLEVBQUMzRCxTQUFYLE9BQVUsRUFBVjtBQTFCYSx3QkE0QkMsYUFBYTtBQUFBO0FBQUE7O0FBRTNCLFlBQUk2RCxjQUFjOUksY0FBZTBFLFFBQWpDLEdBQWtCMUUsQ0FBbEI7QUFDQSxZQUFJK0ksY0FBYy9JLFlBQVlBLFdBQVcwRSxRQUF6QyxXQUE4QjFFLENBQVpBLENBQWxCO0FBQ0EsaUJBQVM7QUFDTCtJLHlCQURLO0FBRUxELHlCQUFhQSxjQUFjO0FBRnRCLFNBQVQ7QUFoQ1IsS0FBcUIsQ0FBckI7O0FBdUNBakU7QUFDQU07QUFDQUE7QUFDSDtBQUNEMEQsUSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgZG9tIGZyb20gJy4vZG9tL2RvbSc7XHJcbmltcG9ydCBzdG9yYWdlIGZyb20gJy4vc3RvcmFnZS9zdG9yYWdlJztcclxuaW1wb3J0IHJhZiBmcm9tICcuL2NvbW1vbi9yYWYnO1xyXG5pbXBvcnQgY29tbW9uIGZyb20gJy4vY29tbW9uL2NvbW1vbic7XHJcbmltcG9ydCB4aHIgZnJvbSAnLi94aHIveGhyJztcclxuXHJcbmNvbnN0IElTX1dPUktFUiA9IHNlbGYud2luZG93ID09PSB1bmRlZmluZWQ7XHJcbmNvbnN0IENPTlRFWFQgPSBJU19XT1JLRVIgPyBzZWxmIDogd2luZG93O1xyXG5cclxudmFyIGNjO1xyXG53aW5kb3cuY2MgPSBjYyA9IHtcclxuICAgIHRvb2xzOiBjb21tb24sXHJcbiAgICBsb2FkOiBmdW5jdGlvbihhZGRPbnMgPSBbXSwgb3B0aW9ucyA9IHt9KXtcclxuXHJcbiAgICB9LFxyXG4gICAgc2VsZWN0OiBmdW5jdGlvbihzZWxlY3Rvcil7XHJcbiAgICAgICAgcmV0dXJuIGRvbS5zZWxlY3Qoc2VsZWN0b3IpXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHRhZ05hbWUsIGlkLCBvcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIGRvbS5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIGlkLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZUVsZW1lbnROUzogZnVuY3Rpb24gKHRhZ05hbWUsIGlkLCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBvcHRpb25zLk5TID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZG9tLmNyZWF0ZUVsZW1lbnQodGFnTmFtZSwgaWQsIG9wdGlvbnMpXHJcbiAgICB9LFxyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBvcHRpb25zLnJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gc3RvcmFnZS5zZXRWYWx1ZShrZXksIHZhbHVlLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIHNhdmVBcnJheTogZnVuY3Rpb24oa2V5LCBhcnIgPSBbXSwgaWRrZXkpe1xyXG4gICAgICAgIGlmKGlka2V5ICE9PSB1bmRlZmluZWQgJiYgaWRrZXkgIT09ICcnICYmIGtleSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGNjLnVwZGF0ZVZhbHVlKGl0ZW1baWRrZXldLCBpdGVtKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNjLnNldFZhbHVlKGtleSwgYXJyKTtcclxuICAgIH0sXHJcbiAgICB1cGRhdGVWYWx1ZTogZnVuY3Rpb24oa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KXtcclxuICAgICAgICByZXR1cm4gc3RvcmFnZS5zZXRWYWx1ZShrZXksIHZhbHVlLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIGdldFZhbHVlOiAgZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiBzdG9yYWdlLmdldFZhbHVlKGtleSk7XHJcbiAgICB9LFxyXG4gICAgc2V0VGltZXI6IGZ1bmN0aW9uIChmbiwgZGVsYXkpIHtcclxuICAgICAgICByZXR1cm4gcmFmLnJlcXVlc3RUaW1lb3V0KGZuLCBkZWxheSlcclxuICAgIH0sXHJcbiAgICBjYW5jZWxUaW1lcjogZnVuY3Rpb24gKGhhbmRsZSkge1xyXG4gICAgICAgIHJhZi5jbGVhclJlcXVlc3RUaW1lb3V0KGhhbmRsZSk7XHJcbiAgICB9LFxyXG4gICAgcmVxdWVzdDogZnVuY3Rpb24gKHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgICAgcmV0dXJuIHhoci5hamF4KHBhcmFtcyk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuaWYoSVNfV09SS0VSKXtcclxuICAgIGRlbGV0ZSBjYy5zZWxlY3Q7XHJcbiAgICBkZWxldGUgY2MuY3JlYXRlRWxlbWVudDtcclxuICAgIGRlbGV0ZSBjYy5jcmVhdGVFbGVtZW50TlM7XHJcbn1lbHNle1xyXG4gICAgbGV0IGxhc3QgPSAwXHJcbiAgICBsZXQgZnJhbWVUaWNrZXIgPSBmdW5jdGlvbiAodGltZXN0YW1wKSB7XHJcbiAgICAgICAgY2Muc2V0VmFsdWUoJ2ZyYW1lJywgdGltZXN0YW1wLCB7aW1tZWRpYXRlbHk6IHRydWV9KTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRpbWVzdGFtcCAtIGxhc3QpO1xyXG4gICAgICAgIGxhc3QgPSB0aW1lc3RhbXA7XHJcbiAgICAgICAgcmFmLnJlcXVlc3RUaW1lb3V0KGZyYW1lVGlja2VyLCAxNilcclxuICAgIH07XHJcbiAgICBmcmFtZVRpY2tlcigwKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNjOyIsImNvbnN0IElTX1dPUktFUiA9IHNlbGYud2luZG93ID09PSB1bmRlZmluZWQ7XHJcbmNvbnN0IENPTlRFWFQgPSBJU19XT1JLRVIgPyBzZWxmIDogd2luZG93O1xyXG5jb25zdCBjb21tb24gPSB7fTtcclxuXHJcbmNvbW1vbi5vYmplY3Rmb3JFYWNoID0gZnVuY3Rpb24ob2JqLGZuKXtcclxuICAgIGZvcih2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICBmbihvYmpba2V5XSwga2V5LCBvYmopO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbmNvbW1vbi5vYmplY3RBc3NpZ24gPSBmdW5jdGlvbih0YXJnZXQsIHNvdXJjZSl7XHJcbiAgICBmb3IobGV0IGtleSBpbiBzb3VyY2UpIHtcclxuICAgICAgICBpZiAoc291cmNlLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0YXJnZXQ7XHJcbn07XHJcblxyXG5jb21tb24uY3JlYXRlSWQgPSBmdW5jdGlvbigpe1xyXG4gICAgZnVuY3Rpb24gczQoKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXHJcbiAgICAgICAgICAgIC50b1N0cmluZygxNilcclxuICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcclxufTtcclxuXHJcbmNvbW1vbi5pc09iamVjdCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICByZXR1cm4gKGl0ZW0hPT11bmRlZmluZWQgJiYgaXRlbSA9PT0gT2JqZWN0KGl0ZW0pICYmICEoaXRlbSBpbnN0YW5jZW9mIEFycmF5KSlcclxufTtcclxuXHJcbmNvbW1vbi5nZXRCcm93c2VyID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgaXNJRSA9IGZhbHNlO1xyXG4gICAgbGV0IGlzQ2hyb21lID0gZmFsc2U7XHJcbiAgICBsZXQgaXNPcGVyYSA9IGZhbHNlO1xyXG4gICAgaWYgKCghIUNPTlRFWFQub3ByICYmICEhb3ByLmFkZG9ucykgfHwgISFDT05URVhULm9wZXJhIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIE9QUi8nKSA+PSAwKSB7XHJcbiAgICAgICAgaXNPcGVyYSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuICdvcGVyYSc7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIEluc3RhbGxUcmlnZ2VyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiAnZmlyZWZveCc7XHJcbiAgICB9XHJcbiAgICBpZiAoL2NvbnN0cnVjdG9yL2kudGVzdChDT05URVhULkhUTUxFbGVtZW50KSB8fCAoZnVuY3Rpb24gKHApIHtcclxuICAgICAgICByZXR1cm4gcC50b1N0cmluZygpID09PSBcIltvYmplY3QgU2FmYXJpUmVtb3RlTm90aWZpY2F0aW9uXVwiO1xyXG4gICAgfSkoIUNPTlRFWFRbJ3NhZmFyaSddIHx8IHNhZmFyaS5wdXNoTm90aWZpY2F0aW9uKSkge1xyXG4gICAgICAgIHJldHVybiAnc2FmYXJpJztcclxuICAgIH1cclxuICAgIGlmIChmYWxzZSB8fCAhIWRvY3VtZW50LmRvY3VtZW50TW9kZSkge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJndW1lbnRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFtrZXldID0gb2JqW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICghKCdyZW1vdmUnIGluIEVsZW1lbnQucHJvdG90eXBlKSkge1xyXG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpc0lFID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gJ2llJztcclxuICAgIH1cclxuICAgIGlmICghaXNJRSAmJiAhIUNPTlRFWFQuU3R5bGVNZWRpYSkge1xyXG4gICAgICAgIHJldHVybiAnZWRnZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoISFDT05URVhULmNocm9tZSAmJiAhIUNPTlRFWFQuY2hyb21lLndlYnN0b3JlKSB7XHJcbiAgICAgICAgaXNDaHJvbWUgPSB0cnVlXHJcbiAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xyXG4gICAgfVxyXG4gICAgaWYgKChpc0Nocm9tZSB8fCBpc09wZXJhKSAmJiAhIUNPTlRFWFQuQ1NTKSB7XHJcbiAgICAgICAgcmV0dXJuICdibGluayc7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb21tb24ucmVhZFZhbHVlID0gZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICBpZih0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIil7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlKG9wdGlvbnMpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbW9uOyIsImNvbnN0IElTX1dPUktFUiA9IHNlbGYud2luZG93ID09PSB1bmRlZmluZWQ7XHJcbmNvbnN0IENPTlRFWFQgPSBJU19XT1JLRVIgPyBzZWxmIDogd2luZG93O1xyXG52YXIgcmFmID0ge1xyXG4gICAgcmVxdWVzdFRpbWVvdXQ6IGZ1bmN0aW9uIChmbiwgZGVsYXkpIHtcclxuICAgICAgICBpZiAoIUNPTlRFWFQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxyXG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmbiwgZGVsYXkpO1xyXG5cclxuICAgICAgICB2YXIgc3RhcnQgPSBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICBoYW5kbGUgPSBuZXcgT2JqZWN0KCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvb3AodGltZXN0YW1wKSB7XHJcbiAgICAgICAgICAgIChEYXRlLm5vdygpIC0gc3RhcnQpID49IGRlbGF5ID8gZm4odGltZXN0YW1wKSA6IGhhbmRsZS52YWx1ZSA9IENPTlRFWFQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGhhbmRsZS52YWx1ZSA9IENPTlRFWFQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICAgIHJldHVybiBoYW5kbGU7XHJcbiAgICB9LFxyXG4gICAgY2xlYXJSZXF1ZXN0VGltZW91dDogZnVuY3Rpb24gKGhhbmRsZSkge1xyXG4gICAgICAgIENPTlRFWFQuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPyBDT05URVhULmNhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSk6Y2xlYXJUaW1lb3V0KGhhbmRsZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByYWY7IiwiaW1wb3J0IGNvbW1vbiBmcm9tICcuLi9jb21tb24vY29tbW9uJ1xyXG52YXIgZG9tID0ge1xyXG4gICAgc2VsZWN0OiBmdW5jdGlvbihzZWxlY3Rvcil7XHJcbiAgICAgICAgaWYoc2VsZWN0b3I9PT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgX3NlbGVjdG9yID0gc2VsZWN0b3IuY2hhckF0KDApO1xyXG4gICAgICAgIGxldCBuYW1lID0gc2VsZWN0b3Iuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIGxldCBkb21zID0gW107XHJcbiAgICAgICAgc3dpdGNoIChfc2VsZWN0b3Ipe1xyXG4gICAgICAgICAgICBjYXNlICcjJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYW1lKTtcclxuICAgICAgICAgICAgY2FzZSAnLic6XHJcbiAgICAgICAgICAgICAgICBkb21zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShuYW1lKSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgZG9tcyA9ICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShzZWxlY3RvcikgfHwgW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZG9tcztcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbiAodGFnLCBpZCA9ICcnLCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICAgICAgbGV0IGVsZW1lbnRJZCA9IGlkIHx8ICh0YWcgKyAnXycgKyBjb21tb24uY3JlYXRlSWQoKSk7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgZWxlbWVudElkKTtcclxuXHJcbiAgICAgICAgc2V0dXBFbGVtZW50TWV0aG9kcyhlbGVtZW50LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0dXBFbGVtZW50TWV0aG9kcyhlbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICBlbGVtZW50Ll9ldmVudExpc3RlbmVycyA9IG5ldyBNYXAoKTtcclxuICAgIGVsZW1lbnQuX2JvdW5kID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIGVsZW1lbnQuYWRkID0gZnVuY3Rpb24gKHRhZywgaWQsIG9wdGlvbnMpIHtcclxuICAgICAgICBsZXQgY2hpbGQgPSBkb20uY3JlYXRlRWxlbWVudCh0YWcsIGlkLCBvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRFbGVtZW50KGNoaWxkKTtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5hZGRFbGVtZW50ID0gZnVuY3Rpb24gKGNoaWxkKSB7XHJcbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgcmV0dXJuIGNoaWxkXHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYWRkQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuZ2V0QXR0ciA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQuZ2V0QXR0cmlidXRlKGtleSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYXR0ciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudCgnYXR0cicsIGtleSwgdmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmdldERhdGEgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhXHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuZGF0YSA9IGZ1bmN0aW9uKGFueSl7XHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IGFueTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5nZXRQcm9wID0gZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudFtrZXldO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LnByb3AgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnQoJ3Byb3AnLCBrZXksIHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5jc3MgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcclxuICAgICAgICB0aGlzLl9zZXRFbGVtZW50KCdjc3MnLCBrZXksIHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5iaW5kID0gZnVuY3Rpb24oa2V5LCBmbil7XHJcbiAgICAgICAgaWYoa2V5KSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5fYm91bmQuc2V0KGtleSwgZm4pO1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ3N0b3JhZ2VfJyArIGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIGVsZW1lbnQudW5iaW5kID0gZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fYm91bmQuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdzdG9yYWdlXycgKyBrZXkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50Ll9yZWFjdCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xyXG4gICAgICAgIGxldCBmbiA9IHRoaXMuX2JvdW5kLmdldChrZXkpO1xyXG4gICAgICAgIGlmKGZuKXtcclxuICAgICAgICAgICAgaWYoZm4uY2FsbCh0aGlzLCB2YWx1ZSwgdGhpcy5fZGF0YSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kKGtleSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5vbiAgPSBmdW5jdGlvbihldmVudE5hbWUsIGZuLCB0YWcgPSAnJyl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBldmVudFRhZyA9IGV2ZW50TmFtZSArIHRhZztcclxuICAgICAgICBsZXQgZXZlbnRIYW5kbGVyID0gZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuZ2V0KGV2ZW50VGFnKTtcclxuICAgICAgICBpZihldmVudEhhbmRsZXIpe1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICBlbGVtZW50Ll9ldmVudExpc3RlbmVycy5kZWxldGUoZXZlbnRUYWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmbikge1xyXG4gICAgICAgICAgICBldmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZm4uY2FsbChzZWxmLCBlLCBzZWxmLl9kYXRhKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuc2V0KGV2ZW50VGFnLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuY29udGVudCA9IGZ1bmN0aW9uIChzdHIpIHtcclxuICAgICAgICB0aGlzLmlubmVyVGV4dCA9IHN0cjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5yZW1vdmVTZWxmID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgaWYodGhpcy5yZW1vdmUpe1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQucmVtb3ZlQWxsQ2hpbGRyZW4gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5fc2V0RWxlbWVudCA9IGZ1bmN0aW9uKHR5cGUsIGtleSAsIHZhbHVlKXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgY29tbW9uLm9iamVjdGZvckVhY2goa2V5ICxmdW5jdGlvbiAoaXRlbSwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmW3R5cGVdKGtleSwgaXRlbSlcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHYgPSBjb21tb24ucmVhZFZhbHVlKHZhbHVlKTtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3AnOlxyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dHInOlxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKGtleSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdjc3MnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zdHlsZVtrZXldID0gIHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnQuaXNJblZpZXdwb3J0ID0gZnVuY3Rpb24gKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGxldCBvZmZzZXRYID0gb3B0aW9ucy5vZmZzZXRYIHx8IDA7XHJcbiAgICAgICAgbGV0IG9mZnNldFkgPSBvcHRpb25zLm9mZnNldFkgfHwgMDtcclxuICAgICAgICBsZXQge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTsgLy9JRSBub3Qgc3VwcG9ydCBib3R0b20gcmlnaHRcclxuICAgICAgICBsZXQgeDIgPSB4ICsgd2lkdGg7XHJcbiAgICAgICAgbGV0IHkyID0geSArIGhlaWdodDtcclxuICAgICAgICBsZXQgaW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGxldCBpbm5lckhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICByZXR1cm4gISh4MiA8PSAoMCArIG9mZnNldFgpfHwgeCA+PSAoaW5uZXJXaWR0aCAtIG9mZnNldFgpIHx8IHkyIDw9ICgwICsgb2Zmc2V0WSkgfHwgeSA+PSAoaW5uZXJIZWlnaHQgLSBvZmZzZXRZKSlcclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRvbTsiLCJpbXBvcnQgY29tbW9uIGZyb20gJy4uL2NvbW1vbi9jb21tb24nO1xyXG5cclxudmFyIHN0b3JhZ2UgPSB7XHJcbiAgICBkYXRhTWFwOiBuZXcgTWFwKCksXHJcbiAgICB0aW1lck1hcDogIG5ldyBNYXAoKSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBkYXRhTWFwID0gdGhpcy5kYXRhTWFwO1xyXG4gICAgICAgIGxldCB7cmVzZXR9ID0gb3B0aW9ucztcclxuICAgICAgICBsZXQgc2hvdWxkUmVhY3QgPSBmYWxzZTtcclxuICAgICAgICBsZXQgb2xkVmFsdWUgPSBkYXRhTWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmKGNvbW1vbi5pc09iamVjdCh2YWx1ZSkgJiYgY29tbW9uLmlzT2JqZWN0KG9sZFZhbHVlKSAmJiByZXNldCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjb21tb24ub2JqZWN0Zm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gKGl0ZW0sIGtleSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG91bGRSZWFjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHZhbHVlW2tleV1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBzaG91bGRSZWFjdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGRhdGFNYXAuc2V0KGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gZGF0YU1hcC5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgaWYoc2hvdWxkUmVhY3QpIHtcclxuICAgICAgICAgICB0aGlzLmJyb2FkY2FzdChrZXksIG5ld1ZhbHVlLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdWYWx1ZTtcclxuICAgIH0sXHJcbiAgICBicm9hZGNhc3Q6IGZ1bmN0aW9uKGtleSwgbmV3VmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB0aW1lciA9IHRoaXMudGltZXJNYXAuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIGlmICh0aW1lcikge1xyXG4gICAgICAgICAgICBjYy5jYW5jZWxUaW1lcih0aW1lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aW1lciA9IGNjLnNldFRpbWVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGRvbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzdG9yYWdlXycgKyBrZXkpIHx8IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkb20gPSBkb21zW2ldO1xyXG4gICAgICAgICAgICAgICAgZG9tLl9yZWFjdCAmJiBkb20uX3JlYWN0KGtleSwgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYudGltZXJNYXAuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgfSwgb3B0aW9ucy5pbW1lZGlhdGVseT8gMDogMTApO1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVyTWFwLnNldChrZXksIHRpbWVyKTtcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFNYXAuZ2V0KGtleSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdG9yYWdlOyIsImNvbnN0IHhociA9IHtcclxuICAgIGFqYXg6IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xyXG4gICAgICAgIGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBsZXQge3VybCwgbWV0aG9kLCBkYXRhLCBhc3luYywgeGhyLCBjb250ZW50VHlwZSwgZGF0YVR5cGUsIGRvbmUsIGZhaWx9ID0gcGFyYW1zIHx8IHt9O1xyXG4gICAgICAgICAgICBsZXQge2hlYWRlciwgb25Qcm9ncmVzcywgYmVmb3JlU2VuZH0gPSBwYXJhbXM7XHJcbiAgICAgICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub3BlbigobWV0aG9kIHx8ICdHRVQnKSwgdXJsLCBhc3luYyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGFzeW5jKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiAoaGVhZGVyIHx8IHt9KSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKChoZWFkZXIgfHwge30pLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY2MuZ2V0VmFsdWUoJ0F1dGhvcml6YXRpb24nKSl7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBjYy5nZXRWYWx1ZSgnQXV0aG9yaXphdGlvbicpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkb25lICYmIGRvbmUocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmFpbCAmJiBmYWlsKHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCksIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwgJiYgZmFpbChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3QudXBsb2FkLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHAgPSBNYXRoLmZsb29yKGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBvblByb2dyZXNzICYmIG9uUHJvZ3Jlc3MocCwgZSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgX2RhdGE7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZpbGUnOlxyXG4gICAgICAgICAgICAgICAgICAgIF9kYXRhID0gZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2pzb24nOlxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsIGNvbnRlbnRUeXBlID09PSB1bmRlZmluZWQgPyBcImFwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLThcIiA6IGNvbnRlbnRUeXBlKTtcclxuICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBiZWZvcmVTZW5kICYmIGJlZm9yZVNlbmQocmVxdWVzdCk7XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0LnNlbmQoX2RhdGEpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH0sXHJcbn07XHJcblxyXG5mdW5jdGlvbiBwYXJzZURhdGEoZGF0YSkge1xyXG4gICAgdHJ5e1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEgfHwgJycpXHJcbiAgICB9Y2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHhocjtcclxuIiwiaW1wb3J0IGNjIGZyb20gJy4vY2Nqcy9jYyc7XHJcblxyXG5jb25zdCBXSElURSA9ICdyZ2JhKDI1NSwyNTUsMjU1LCAwLjcpJztcclxuY29uc3QgQkxBQ0sgPSAncmdiYSgwLDAsMCwgMC45KSc7XHJcbmNvbnN0IEJMQUNLX1NPTElEID0gJ3JnYigyNSwgMjUsIDI1KSc7XHJcbmNvbnN0IFJFRCA9ICcjZDYzMDMxJztcclxuXHJcbmNjLnNldFZhbHVlKCd2aWV3cG9ydCcsIHt3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0fSk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjYy51cGRhdGVWYWx1ZSgndmlld3BvcnQnLCB7d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodH0pO1xyXG59KTtcclxuZnVuY3Rpb24gaW5kZXgoKSB7XHJcbiAgICBsZXQgcm9vdCA9IGNjLnNlbGVjdCgnI2JvZHknKTtcclxuICAgIGxldCBtYWluQ29udGFpbmVyID0gY2MuY3JlYXRlRWxlbWVudCgnZGl2JywgJ3Rlc3QnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBCTEFDSyxcclxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwdmgnLFxyXG4gICAgICAgICAgICB3aWR0aDogJzEwMHZ3JyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiBCTEFDSyArICcwIDAgMTBweCAyMHB4J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmRhdGEoe1xyXG4gICAgICAgICAgICBhbmltYXRpb25Db3VudGVyOiAwLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ2ZyYW1lJywgZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSB0aGlzLmdldERhdGEoKS5hbmltYXRpb25Db3VudGVyO1xyXG4gICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiBjb3VudGVyIC8gNjBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSh7YW5pbWF0aW9uQ291bnRlcjogY291bnRlciArIDF9KTtcclxuICAgICAgICAgICAgaWYgKGNvdW50ZXIgPj0gNjApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudW5iaW5kKCdmcmFtZScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICByb290LmFwcGVuZENoaWxkKG1haW5Db250YWluZXIpO1xyXG4gICAgbGV0IGNvbnRhaW5lciA9IG1haW5Db250YWluZXIuYWRkKCdkaXYnKVxyXG5cclxuICAgIGxldCBoZWFkZXIgPSBjb250YWluZXIuYWRkKCdkaXYnLCAnaGVhZGVyJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAnMCAxMi41JScsXHJcbiAgICAgICAgICAgIHBhZGRpbmdUb3A6ICczMnB4JyxcclxuICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogJzE2cHgnLFxyXG4gICAgICAgICAgICBjb2xvcjogV0hJVEUsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiBCTEFDSyArICcgMCAwIDIwcHgnLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcclxuICAgICAgICAgICAgekluZGV4OiAxMCxcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogQkxBQ0tfU09MSURcclxuICAgICAgICB9KTtcclxuICAgIGxldCBoZWFkZXJMZWZ0ID0gaGVhZGVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgIG1pbldpZHRoOiAnMjU2cHgnXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgbG9nbyA9IGhlYWRlckxlZnQuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jb250ZW50KCdBJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogUkVELFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzY0cHgnLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAnMCAxNnB4JyxcclxuICAgICAgICAgICAgbGluZUhlaWdodDogJzU0cHgnLFxyXG4gICAgICAgICAgICBtYXJnaW5SaWdodDogJzRweCcsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICBib3hTaGFkb3c6IFJFRCArICcgMCAwIDEwcHgnLFxyXG4gICAgICAgICAgICBjb2xvcjogQkxBQ0tcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgbmFtZUNvbnRhaW5lciA9IGhlYWRlckxlZnQuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgbmFtZUNvbnRhaW5lci5hZGQoJ3NwYW4nKVxyXG4gICAgICAgIC5jb250ZW50KCdOWElOIFlBTkcnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxyXG4gICAgICAgIH0pO1xyXG4gICAgbmFtZUNvbnRhaW5lci5hZGQoJ3NwYW4nKVxyXG4gICAgICAgIC5jb250ZW50KCdGcm9udC1FbmQgRGV2ZWxvcGVyJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IG1lbnUgPSBoZWFkZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgbWVudUxpc3QgPSBbJ2ZhLWxpbmtlZGluJ107XHJcbiAgICBsZXQgbGlua3MgPSBbJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9hbnhpbi15YW5nLTcwNzAyOTEyNS8nXTtcclxuICAgIGxldCBob3ZlckNvbG9ycyA9IFsnIzAwNzdCNSddO1xyXG4gICAgbWVudUxpc3QuZm9yRWFjaChmdW5jdGlvbiAodGFnLCBpZHgpIHtcclxuICAgICAgICBtZW51LmFkZCgnaScpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFiJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKG1lbnVMaXN0W2lkeF0pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiAnNTRweCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICAgICAgIHRleHRTaGFkb3c6ICcgMCAwIDVweCcsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnMC4zcydcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKGxpbmtzW2lkeF0sICdfYmxhbmsnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMDA3N0I1JyxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0sICdzdHlsZScpXHJcbiAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJycsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LCAnc3R5bGUnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBtYWluQ29udGVudENvbnRhaW5lciA9IGNjLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGhlaWdodDogJ2NhbGMoMTAwdmggLSAxMDBweCknLFxyXG4gICAgICAgICAgICBwYWRkaW5nOiAnMCAxMi41JScsXHJcbiAgICAgICAgICAgIHBhZGRpbmdUb3A6ICcyNXZoJyxcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcclxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgIHpJbmRleDogNSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5vbignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgbGV0IGNlbnRlclggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDI7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJZID0gd2luZG93LmlubmVySGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgbGV0IG1vdXNlWCA9IGUuY2xpZW50WDtcclxuICAgICAgICAgICAgbGV0IG1vdXNlWSA9IGUuY2xpZW50WTtcclxuICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKCcgKyAoLShtb3VzZVggLSBjZW50ZXJYKSAvIDEwMCkgKyAncHgsJyArICgtKG1vdXNlWSAtIGNlbnRlclkpIC8gMTAwKSArICdweCknXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ2ZyYW1lJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgZG9tcyA9IGNjLnNlbGVjdCgnLmZhZGUnKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb21zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG9tID0gZG9tc1tpXTtcclxuICAgICAgICAgICAgICAgIGxldCBpc0luVmlld1BvcnQgPSBkb20uaXNJblZpZXdwb3J0KHtvZmZzZXRZOiAxMjB9KTtcclxuICAgICAgICAgICAgICAgIGxldCBvcGFjaXR5ID0gK2RvbS5zdHlsZS5vcGFjaXR5O1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wYWNpdHkgPiAwICYmICFpc0luVmlld1BvcnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5ID0gb3BhY2l0eSAtIDAuMDU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAob3BhY2l0eSA8IDEgJiYgaXNJblZpZXdQb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSA9IG9wYWNpdHkgKyAwLjAzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHRyYW5zbGF0ZVkgPSAzMCAtIG9wYWNpdHkgKiAzMDtcclxuICAgICAgICAgICAgICAgIGRvbS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IG9wYWNpdHksXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgnICsgdHJhbnNsYXRlWSArICdweCknXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgaGlnaExpZ2h0ID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jb250ZW50KFwiTGV0J3MgbWFrZSBkYXRhIGFsaXZlXCIpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmYWRlJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnNDhweCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgaW50cm8gPSBtYWluQ29udGVudENvbnRhaW5lci5hZGQoJ3AnKVxyXG4gICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgLmNvbnRlbnQoXCJJJ20gYSBmcm9udC1lbmQgZGV2ZWxvcGVyIGZyb20gQmF5IEFyZWEsIENhbGlmb3JuaWEsIGFuZCBjdXJyZW50bHkgbGl2aW5nIGluIFNhbiBKb3NlLiBJIGVuam95IGJ1aWxkaW5nIHJpY2ggXCIgK1xyXG4gICAgICAgICAgICBcImludGVyYWN0aXZlIHdlYnNpdGVzIGFuZCB3ZWIgYXBwcyBmcm9tIHNtYWxsIHRvIGxhcmdlLiBcIilcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcyMHB4JyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgc2tpbGxDb250YWluZXIgPSBtYWluQ29udGVudENvbnRhaW5lci5hZGQoJ2RpdicpO1xyXG4gICAgbGV0IHNraWxsVGl0bGUgPSBza2lsbENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNvbnRlbnQoXCJTa2lsbHNcIilcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnNDhweCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzI1NnB4J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBza2lsbENhcmRDb250YWluZXIgPSBza2lsbENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnMTI4cHgnLFxyXG4gICAgICAgICAgICBmbGV4V3JhcDogJ3dyYXAnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IHNraWxscyA9IFsnZmEtaHRtbDUnLCAnZmEtanMnLCAnZmEtY3NzMy1hbHQnLCAnZmEtcmVhY3QnLCAnZmEtbm9kZS1qcyddO1xyXG4gICAgbGV0IHNraWxsTmFtZXMgPSBbJ0hUTUw1JywgJ0phdmFzY3JpcHQnLCAnQ1NTMycsICdSZWFjdCcsICdOb2RlSlMnXTtcclxuICAgIGxldCBza2lsbENvbG9ycyA9IFsnI2U0NGQyNicsICcjZWVhZjRiJywgJyMwMDcwYmEnLCAnIzYxZGFmYicsICcjN2NiNzAwJ107XHJcbiAgICBza2lsbHMuZm9yRWFjaChmdW5jdGlvbiAoaWNvbiwgaWR4KSB7XHJcbiAgICAgICAgbGV0IGNhcmQgPSBza2lsbENhcmRDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhZGUnKS5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgbWluV2lkdGg6ICczMDBweCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgZmxleEdyb3c6IDEsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBsb2dvID0gY2FyZC5hZGQoJ2knKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhYicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhpY29uKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMjU2cHgnLFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBza2lsbENvbG9yc1tpZHhdLFxyXG4gICAgICAgICAgICAgICAgdGV4dFNoYWRvdzogc2tpbGxDb2xvcnNbaWR4XSArICcgMCAwIDEwcHgnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBuYW1lID0gY2FyZC5hZGQoJ3AnKVxyXG4gICAgICAgICAgICAuY29udGVudChza2lsbE5hbWVzW2lkeF0pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogc2tpbGxDb2xvcnNbaWR4XSxcclxuICAgICAgICAgICAgICAgIHRleHRTaGFkb3c6IHNraWxsQ29sb3JzW2lkeF0gKyAnIDAgMCAxMHB4J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGNhcmVlckNvbnRhaW5lciA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgnZGl2Jyk7XHJcbiAgICBsZXQgY2FyZWVyVGl0bGUgPSBza2lsbENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNvbnRlbnQoXCJDYXJlZXJcIilcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnNDhweCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzEyOHB4JyxcclxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnNjRweCcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IGNvbXBhbmllcyA9IFsnbmV0RWxhc3RpYyBTeXN0ZW1zLCBJbmMuJywgJ1NhbiBGcmFuY2lzY28gU3RhdGUgVW5pdmVyc2l0eScsICdTaGFuZ2hhaSBVbml2ZXJzaXR5J107XHJcbiAgICBsZXQgdGl0bGVzID0gWydTb2Z0d2FyZSBFbmdpbmVlcicsICdCUyAtIENvbXB1dGVyIEVuZ2luZWVyaW5nIFN0dWRlbnQnLCAnQVMgLSBDb21wdXRlciBBcHBsaWNhdGlvbiBUZWNobm9sb2d5IFN0dWRlbnQnXTtcclxuICAgIGxldCB0aW1lTGluZXMgPSBbJzIwMTcgLSBDdXJyZW50JywgJzIwMTMgLSAyMDE3JywgJzIwMDkgLSAyMDEzJ107XHJcbiAgICBsZXQgcHJvamVjdHMgPSB7XHJcbiAgICAgICAgJ25ldEVsYXN0aWMgU3lzdGVtcywgSW5jLic6IFsndkJORyBNYW5hZ2VtZW50IFN5c3RlbSAoVUkgTGVhZCknLCAnU0QtV0FOIE1hbmFnZW1lbnQgU3lzdGVtIChVSSBUZWFtIE1lbWJlciknLF1cclxuICAgIH07XHJcblxyXG4gICAgY29tcGFuaWVzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBhbnlOYW1lLCBpZHgpIHtcclxuICAgICAgICBsZXQgY2FyZCA9IGNhcmVlckNvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzY0cHgnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBjb21wYW55ID0gY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5jb250ZW50KGNvbXBhbnlOYW1lKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCdcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBmb250U2l6ZSA9ICcyMHB4JztcclxuICAgICAgICBsZXQgdGl0bGUgPSBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmNvbnRlbnQodGl0bGVzW2lkeF0pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHRpbWVMaW5lID0gY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5jb250ZW50KHRpbWVMaW5lc1tpZHhdKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgKHByb2plY3RzW2NvbXBhbnlOYW1lXSB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAocHJvamVjdCkge1xyXG4gICAgICAgICAgICBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgICAgIC5jb250ZW50KHByb2plY3QpXHJcbiAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgZm9vdGVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdwJylcclxuICAgICAgICAuY29udGVudCgnVGhpcyB3ZWJzaXRlIGlzIGJ1aWxkIGJ5IGNjSlMsIGEgc2VsZi1pbXBsZW1lbnRlZCBKYXZhc2NyaXB0IExpYnJhcnkuJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnMTI4cHgnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IGNvZGVCYWNrZ3JvdW5kVGV4dCA9IGluZGV4LnRvU3RyaW5nKCk7XHJcbiAgICBsZXQgY29sdW1uV2lkdGggPSBNYXRoLm1pbig0MDAgLCB3aW5kb3cuaW5uZXJXaWR0aCAtIDEyOCk7XHJcbiAgICBsZXQgY29sdW1uQ291bnQgPSBNYXRoLm1pbigyLCBNYXRoLmZsb29yKHdpbmRvdy5pbm5lcldpZHRoLyhjb2x1bW5XaWR0aCkpKTtcclxuICAgIGxldCBjb2RlQmFja2dyb3VuZCA9IGNvbnRhaW5lci5hZGQoJ3ByZScpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgICB0b3A6ICcxMjhweCcsXHJcbiAgICAgICAgICAgIGxlZnQ6ICc2NHB4JyxcclxuICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAncmdiYSgyNTUsMjU1LDI1NSwgMC4wNiknLFxyXG4gICAgICAgICAgICB6SW5kZXg6IDAsXHJcbiAgICAgICAgICAgIGNvbHVtbkNvdW50OiBjb2x1bW5Db3VudCxcclxuICAgICAgICAgICAgY29sdW1uV2lkdGg6IGNvbHVtbldpZHRoICsgJ3B4JyxcclxuICAgICAgICAgICAgd2lkdGg6ICdjYWxjKDEwMHZ3IC0gMTI4cHgpJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kYXRhKHtcclxuICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5iaW5kKCdmcmFtZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHtjb3VudGVyLCBzdHJ9ID0gdGhpcy5nZXREYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoJyArICgtbWFpbkNvbnRlbnRDb250YWluZXIuc2Nyb2xsVG9wLzYpICsgJ3B4KSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvdW50ZXIrPTI0O1xyXG4gICAgICAgICAgICBpZihjb3VudGVyID49IGNvZGVCYWNrZ3JvdW5kVGV4dC5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgY291bnRlciA9IGNvZGVCYWNrZ3JvdW5kVGV4dC5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gY29kZUJhY2tncm91bmRUZXh0LnN1YnN0cmluZygwLCBjb3VudGVyKSArICdfJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRhdGEoe2NvdW50ZXI6IGNvdW50ZXJ9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ3ZpZXdwb3J0JywgZnVuY3Rpb24gKGQpIHtcclxuICAgICAgICAgICAgbGV0IHtoZWlnaHQsIHdpZHRofSA9IGQ7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5XaWR0aCA9IE1hdGgubWluKDQwMCAsIHdpZHRoIC0gMTI4KTtcclxuICAgICAgICAgICAgbGV0IGNvbHVtbkNvdW50ID0gTWF0aC5taW4oMiwgTWF0aC5mbG9vcih3aWR0aC8oY29sdW1uV2lkdGgpKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbkNvdW50OiBjb2x1bW5Db3VudCxcclxuICAgICAgICAgICAgICAgIGNvbHVtbldpZHRoOiBjb2x1bW5XaWR0aCArICdweCcsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIG1haW5Db250YWluZXIuYWRkRWxlbWVudChjb250YWluZXIpO1xyXG4gICAgY29udGFpbmVyLmFkZEVsZW1lbnQoaGVhZGVyKTtcclxuICAgIGNvbnRhaW5lci5hZGRFbGVtZW50KG1haW5Db250ZW50Q29udGFpbmVyKTtcclxufVxyXG5pbmRleCgpOyJdLCJzb3VyY2VSb290IjoiIn0=