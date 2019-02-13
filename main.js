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
            textAlign: 'center'
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY29tbW9uL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy9jb21tb24vcmFmLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvc3RvcmFnZS9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL3hoci94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIklTX1dPUktFUiIsInNlbGYiLCJDT05URVhUIiwid2luZG93IiwiY2MiLCJ0b29scyIsImNvbW1vbiIsImxvYWQiLCJhZGRPbnMiLCJvcHRpb25zIiwic2VsZWN0IiwiZG9tIiwiY3JlYXRlRWxlbWVudCIsImNyZWF0ZUVsZW1lbnROUyIsInNldFZhbHVlIiwic3RvcmFnZSIsInNhdmVBcnJheSIsImFyciIsImlka2V5Iiwia2V5IiwiaXRlbSIsInVwZGF0ZVZhbHVlIiwiZ2V0VmFsdWUiLCJzZXRUaW1lciIsInJhZiIsImNhbmNlbFRpbWVyIiwicmVxdWVzdCIsInBhcmFtcyIsInhociIsImxhc3QiLCJmcmFtZVRpY2tlciIsImltbWVkaWF0ZWx5Iiwib2JqIiwiZm4iLCJzb3VyY2UiLCJ0YXJnZXQiLCJNYXRoIiwiczQiLCJPYmplY3QiLCJpc0lFIiwiaXNDaHJvbWUiLCJpc09wZXJhIiwib3ByIiwibmF2aWdhdG9yIiwicCIsInNhZmFyaSIsImRvY3VtZW50Iiwib3V0cHV0IiwiYXJndW1lbnRzIiwiaSIsIkVsZW1lbnQiLCJ2YWx1ZSIsInJlcXVlc3RUaW1lb3V0Iiwic2V0VGltZW91dCIsInN0YXJ0IiwiRGF0ZSIsImhhbmRsZSIsImNsZWFyUmVxdWVzdFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJzZWxlY3RvciIsIl9zZWxlY3RvciIsIm5hbWUiLCJkb21zIiwiaWQiLCJlbGVtZW50IiwiZWxlbWVudElkIiwidGFnIiwic2V0dXBFbGVtZW50TWV0aG9kcyIsImNoaWxkIiwiZXZlbnRUYWciLCJldmVudE5hbWUiLCJldmVudEhhbmRsZXIiLCJ2Iiwib2Zmc2V0WCIsIm9mZnNldFkiLCJ4MiIsIngiLCJ5MiIsInkiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJkYXRhTWFwIiwidGltZXJNYXAiLCJzaG91bGRSZWFjdCIsIm9sZFZhbHVlIiwicmVzZXQiLCJuZXdWYWx1ZSIsImJyb2FkY2FzdCIsInRpbWVyIiwiYWpheCIsInByb21pc2UiLCJtZXRob2QiLCJhc3luYyIsImhlYWRlciIsImRvbmUiLCJwYXJzZURhdGEiLCJyZXNvbHZlIiwiZmFpbCIsInJlamVjdCIsImUiLCJvblByb2dyZXNzIiwiX2RhdGEiLCJjb250ZW50VHlwZSIsIkpTT04iLCJiZWZvcmVTZW5kIiwiZGF0YSIsIldISVRFIiwiQkxBQ0siLCJCTEFDS19TT0xJRCIsIlJFRCIsIndpZHRoIiwiaGVpZ2h0Iiwicm9vdCIsIm1haW5Db250YWluZXIiLCJiYWNrZ3JvdW5kIiwiYm94U2hhZG93IiwiYW5pbWF0aW9uQ291bnRlciIsImNvdW50ZXIiLCJvcGFjaXR5IiwiY29udGFpbmVyIiwiZGlzcGxheSIsInBhZGRpbmciLCJwYWRkaW5nVG9wIiwicGFkZGluZ0JvdHRvbSIsImNvbG9yIiwiZm9udFdlaWdodCIsImp1c3RpZnlDb250ZW50IiwicG9zaXRpb24iLCJ6SW5kZXgiLCJoZWFkZXJMZWZ0IiwibWluV2lkdGgiLCJsb2dvIiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0IiwibWFyZ2luUmlnaHQiLCJuYW1lQ29udGFpbmVyIiwibWVudSIsIm1lbnVMaXN0IiwibGlua3MiLCJob3ZlckNvbG9ycyIsImN1cnNvciIsInRleHRBbGlnbiIsInRleHRTaGFkb3ciLCJ0cmFuc2l0aW9uIiwibWFpbkNvbnRlbnRDb250YWluZXIiLCJvdmVyZmxvd1kiLCJjZW50ZXJYIiwiY2VudGVyWSIsIm1vdXNlWCIsIm1vdXNlWSIsInRyYW5zZm9ybSIsImlzSW5WaWV3UG9ydCIsInRyYW5zbGF0ZVkiLCJoaWdoTGlnaHQiLCJpbnRybyIsInNraWxsQ29udGFpbmVyIiwic2tpbGxUaXRsZSIsIm1hcmdpblRvcCIsInNraWxsQ2FyZENvbnRhaW5lciIsImZsZXhXcmFwIiwic2tpbGxzIiwic2tpbGxOYW1lcyIsInNraWxsQ29sb3JzIiwiY2FyZCIsImZsZXhHcm93IiwiY2FyZWVyQ29udGFpbmVyIiwiY2FyZWVyVGl0bGUiLCJtYXJnaW5Cb3R0b20iLCJjb21wYW5pZXMiLCJ0aXRsZXMiLCJ0aW1lTGluZXMiLCJwcm9qZWN0cyIsImNvbXBhbnkiLCJ0aXRsZSIsInRpbWVMaW5lIiwiZm9vdGVyIiwiY29kZUJhY2tncm91bmRUZXh0IiwiaW5kZXgiLCJjb2x1bW5XaWR0aCIsImNvbHVtbkNvdW50IiwiY29kZUJhY2tncm91bmQiLCJ0b3AiLCJsZWZ0Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUEsWUFBWUMsZ0JBQWxCO0FBQ0EsSUFBTUMsVUFBVUYsbUJBQWhCOztBQUVBO0FBQ0FHLFlBQVlDLEtBQUs7QUFDYkMsV0FBT0MsU0FETTtBQUViQyxVQUFNLGdCQUFtQztBQUFBLFlBQTFCQyxTQUEwQixvRUFBakIsRUFBaUI7QUFBQSxZQUFiQyxVQUFhLG9FQUFILEVBQUc7QUFGNUI7QUFLYkMsWUFBUSwwQkFBa0I7QUFDdEIsZUFBT0MscUJBQVAsUUFBT0EsQ0FBUDtBQU5TO0FBUWJDLG1CQUFlLDZDQUFnQztBQUMzQyxlQUFPRCx5Q0FBUCxPQUFPQSxDQUFQO0FBVFM7QUFXYkUscUJBQWlCLHNDQUFxQztBQUFBLFlBQWRKLFVBQWMsb0VBQUosRUFBSTs7QUFDbERBO0FBQ0EsZUFBT0UseUNBQVAsT0FBT0EsQ0FBUDtBQWJTO0FBZWJHLGNBQVUsOEJBQW9DO0FBQUEsWUFBZEwsVUFBYyxvRUFBSixFQUFJOztBQUMxQ0E7QUFDQSxlQUFPTSx1Q0FBUCxPQUFPQSxDQUFQO0FBakJTO0FBbUJiQyxlQUFXLHdCQUE4QjtBQUFBLFlBQWhCQyxNQUFnQixvRUFBVixFQUFVO0FBQUEsWUFBTkMsUUFBTTs7QUFDckMsWUFBR0EsdUJBQXVCQSxVQUF2QkEsTUFBdUNDLFFBQTFDLFdBQTREO0FBQ3hERix3QkFBWSxnQkFBZ0I7QUFDeEJiLCtCQUFlZ0IsS0FBZmhCLEtBQWVnQixDQUFmaEI7QUFESmE7QUFHSDtBQUNELGVBQU9iLGlCQUFQLEdBQU9BLENBQVA7QUF6QlM7QUEyQmJpQixpQkFBYSxpQ0FBa0M7QUFBQSxZQUFiWixVQUFhLG9FQUFILEVBQUc7O0FBQzNDLGVBQU9NLHVDQUFQLE9BQU9BLENBQVA7QUE1QlM7QUE4QmJPLGNBQVcsdUJBQWU7QUFDdEIsZUFBT1AsMkJBQVAsR0FBT0EsQ0FBUDtBQS9CUztBQWlDYlEsY0FBVSw2QkFBcUI7QUFDM0IsZUFBT0MsaUNBQVAsS0FBT0EsQ0FBUDtBQWxDUztBQW9DYkMsaUJBQWEsNkJBQWtCO0FBQzNCRDtBQXJDUztBQXVDYkUsYUFBUyxtQkFBdUI7QUFBQSxZQUFiQyxTQUFhLG9FQUFKLEVBQUk7O0FBQzVCLGVBQU9DLG1CQUFQLE1BQU9BLENBQVA7QUFDSDs7QUF6Q1ksQ0FBakJ6Qjs7QUE2Q0EsZUFBYTtBQUNULFdBQU9DLEdBQVA7QUFDQSxXQUFPQSxHQUFQO0FBQ0EsV0FBT0EsR0FBUDtBQUhKLE9BSUs7QUFDRCxRQUFJeUIsT0FBSjtBQUNBLFFBQUlDLGNBQWMsU0FBZEEsV0FBYyxZQUFxQjtBQUNuQzFCLHdDQUFnQyxFQUFDMkIsYUFBakMzQixJQUFnQyxFQUFoQ0E7QUFDQTtBQUNBeUI7QUFDQUw7QUFKSjtBQU1BTTtBQUNIOztrQkFHYzFCLEU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkVmLElBQU1KLFlBQVlDLGdCQUFsQjtBQUNBLElBQU1DLFVBQVVGLG1CQUFoQjtBQUNBLElBQU1NLFNBQU47O0FBRUFBLHVCQUF1QixtQkFBZ0I7QUFDbkMsU0FBSSxJQUFKLFlBQW9CO0FBQ2hCLFlBQUkwQixtQkFBSixHQUFJQSxDQUFKLEVBQTZCO0FBQ3pCQyxlQUFHRCxJQUFIQyxHQUFHRCxDQUFIQztBQUNIO0FBQ0o7QUFMTDNCOztBQVFBQSxzQkFBc0IsMEJBQXdCO0FBQzFDLFNBQUksSUFBSixlQUF1QjtBQUNuQixZQUFJNEIsc0JBQUosR0FBSUEsQ0FBSixFQUFnQztBQUM1QkMsMEJBQWNELE9BQWRDLEdBQWNELENBQWRDO0FBQ0g7QUFDSjtBQUNEO0FBTko3Qjs7QUFTQUEsa0JBQWtCLFlBQVU7QUFDeEIsa0JBQWM7QUFDVixlQUFPOEIsV0FBVyxDQUFDLElBQUlBLEtBQUwsTUFBS0EsRUFBTCxJQUFYQSxnQ0FBUCxDQUFPQSxDQUFQO0FBR0g7QUFDRCxXQUFPQyx5RUFBUDtBQU5KL0I7O0FBU0FBLGtCQUFrQixnQkFBZ0I7QUFDOUIsV0FBUWMsc0JBQW9CQSxTQUFTa0IsT0FBN0JsQixJQUE2QmtCLENBQTdCbEIsSUFBNkMsRUFBRUEsZ0JBQXZELEtBQXFELENBQXJEO0FBREpkOztBQUlBQSxvQkFBb0IsWUFBVztBQUMzQixRQUFJaUMsT0FBSjtBQUNBLFFBQUlDLFdBQUo7QUFDQSxRQUFJQyxVQUFKO0FBQ0EsUUFBSyxDQUFDLENBQUN2QyxRQUFGLE9BQWlCLENBQUMsQ0FBQ3dDLElBQXBCLE1BQUMsSUFBa0MsQ0FBQyxDQUFDeEMsUUFBckMsS0FBQyxJQUFxRHlDLHdDQUExRCxHQUFxRztBQUNqR0Y7QUFDQTtBQUNIO0FBQ0QsUUFBSSwwQkFBSixhQUEyQztBQUN2QztBQUNIO0FBQ0QsUUFBSSxvQkFBb0J2QyxRQUFwQixnQkFBNkMsYUFBYTtBQUMxRCxlQUFPMEMsaUJBQVA7QUFENEMsS0FBQyxDQUU5QyxDQUFDMUMsUUFBRCxRQUFDQSxDQUFELElBQXNCMkMsT0FGekIsZ0JBQWlELENBQWpELEVBRW1EO0FBQy9DO0FBQ0g7QUFDRCxRQUFJLE1BQUssSUFBSSxDQUFDLENBQUNDLFNBQWYsY0FBc0M7QUFDbENSLHdCQUFnQixZQUFZO0FBQ3hCLGdCQUFJUyxTQUFTQyxVQUFiLENBQWFBLENBQWI7QUFDQSxpQkFBSyxJQUFJQyxJQUFULEdBQWdCQSxJQUFJRCxVQUFwQixhQUEyQztBQUN2QyxxQkFBSyxJQUFMLE9BQWdCQSxVQUFoQixDQUFnQkEsQ0FBaEIsRUFBOEI7QUFDMUIsd0JBQUloQixNQUFNZ0IsVUFBVixDQUFVQSxDQUFWO0FBQ0Esd0JBQUloQixtQkFBSixHQUFJQSxDQUFKLEVBQ0llLGNBQWNmLElBQWRlLEdBQWNmLENBQWRlO0FBQ1A7QUFDSjtBQUNEO0FBVEpUO0FBV0EsWUFBSSxFQUFFLFlBQVlZLFFBQWxCLFNBQUksQ0FBSixFQUFzQztBQUNsQ0EsdUNBQTJCLFlBQVk7QUFDbkMsb0JBQUksS0FBSixZQUFxQjtBQUNqQjtBQUNIO0FBSExBO0FBS0g7QUFDRFg7QUFDQTtBQUNIO0FBQ0QsUUFBSSxTQUFTLENBQUMsQ0FBQ3JDLFFBQWYsWUFBbUM7QUFDL0I7QUFDSDtBQUNELFFBQUksQ0FBQyxDQUFDQSxRQUFGLFVBQW9CLENBQUMsQ0FBQ0EsZUFBMUIsVUFBbUQ7QUFDL0NzQztBQUNBO0FBQ0g7QUFDRCxRQUFJLENBQUNBLFlBQUQsWUFBeUIsQ0FBQyxDQUFDdEMsUUFBL0IsS0FBNEM7QUFDeEM7QUFDSDtBQS9DTEk7O0FBa0RBQSxtQkFBbUIsaUJBQTZCO0FBQUEsUUFBYkcsVUFBYSxvRUFBSCxFQUFHOztBQUM1QyxRQUFHLGlCQUFILFlBQStCO0FBQzNCLGVBQU8wQyxNQUFQLE9BQU9BLENBQVA7QUFESixXQUVLO0FBQ0Q7QUFDSDtBQUxMN0M7O2tCQVFlQSxNOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVGZixJQUFNTixZQUFZQyxnQkFBbEI7QUFDQSxJQUFNQyxVQUFVRixtQkFBaEI7QUFDQSxJQUFJd0IsTUFBTTtBQUNONEIsb0JBQWdCLG1DQUFxQjtBQUNqQyxZQUFJLENBQUNsRCxRQUFMLHVCQUNJLE9BQU9tRCxlQUFQLEtBQU9BLENBQVA7O0FBRUosWUFBSUMsUUFBUUMsS0FBWixHQUFZQSxFQUFaO0FBQUEsWUFDSUMsU0FBUyxJQURiLE1BQ2EsRUFEYjs7QUFHQSxpQ0FBeUI7QUFDcEJELHlCQUFELEtBQUNBLElBQUQsS0FBQ0EsR0FBK0J0QixHQUFoQyxTQUFnQ0EsQ0FBL0JzQixHQUErQ0MsZUFBZXRELDhCQUEvRCxJQUErREEsQ0FBOURxRDtBQUNKOztBQUVEQyx1QkFBZXRELDhCQUFmc0QsSUFBZXRELENBQWZzRDtBQUNBO0FBYkU7QUFlTkMseUJBQXFCLHFDQUFrQjtBQUNuQ3ZELHVDQUErQkEsNkJBQTZCc0QsT0FBNUR0RCxLQUErQkEsQ0FBL0JBLEdBQTBFd0QsYUFBMUV4RCxNQUEwRXdELENBQTFFeEQ7QUFDSDtBQWpCSyxDQUFWOztrQkFvQmVzQixHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCZjs7Ozs7Ozs7QUFDQSxJQUFJYixNQUFNO0FBQ05ELFlBQVEsMEJBQWtCO0FBQ3RCLFlBQUdpRCxhQUFILFdBQXdCO0FBQ3BCO0FBQ0g7O0FBRUQsWUFBSUMsWUFBWUQsZ0JBQWhCLENBQWdCQSxDQUFoQjtBQUNBLFlBQUlFLE9BQU9GLG1CQUFYLENBQVdBLENBQVg7QUFDQSxZQUFJRyxPQUFKO0FBQ0E7QUFDSTtBQUNJLHVCQUFPaEIsd0JBQVAsSUFBT0EsQ0FBUDtBQUNKO0FBQ0lnQix1QkFBT2hCLHlDQUFQZ0I7QUFDQTtBQUNKO0FBQ0lBLHVCQUFRaEIsMkNBQVJnQjtBQVBSOztBQVVBO0FBbkJFO0FBcUJObEQsbUJBQWUsNEJBQXNDO0FBQUEsWUFBdkJtRCxLQUF1QixvRUFBbEIsRUFBa0I7QUFBQSxZQUFkdEQsVUFBYyxvRUFBSixFQUFJOztBQUNqRCxZQUFJdUQsVUFBVWxCLHVCQUFkLEdBQWNBLENBQWQ7O0FBRUEsWUFBSW1CLFlBQVlGLE1BQU9HLFlBQVk1RCxpQkFBbkMsUUFBbUNBLEVBQW5DO0FBQ0EwRDs7QUFFQUc7O0FBRUE7QUFDSDtBQTlCSyxDQUFWOztBQWlDQSwrQ0FBK0M7QUFDM0NILDhCQUEwQixJQUExQkEsR0FBMEIsRUFBMUJBO0FBQ0FBLHFCQUFpQixJQUFqQkEsR0FBaUIsRUFBakJBOztBQUVBQSxrQkFBYyw0QkFBNEI7QUFDdEMsWUFBSUksUUFBUXpELDJCQUFaLE9BQVlBLENBQVo7QUFDQSxlQUFPLGdCQUFQLEtBQU8sQ0FBUDtBQUZKcUQ7O0FBS0FBLHlCQUFxQixpQkFBaUI7QUFDbEM7QUFDQTtBQUZKQTs7QUFLQUEsdUJBQW1CLHFCQUFxQjtBQUNwQztBQUNBO0FBRkpBOztBQUtBQSwwQkFBc0IscUJBQXFCO0FBQ3ZDO0FBQ0E7QUFGSkE7O0FBS0FBLHNCQUFrQixlQUFhO0FBQzNCLGVBQU9BLHFCQUFQLEdBQU9BLENBQVA7QUFESkE7O0FBSUFBLG1CQUFlLHNCQUFzQjtBQUNqQztBQUNBO0FBRkpBOztBQUtBQSxzQkFBa0IsWUFBVTtBQUN4QixlQUFPLEtBQVA7QUFESkE7O0FBSUFBLG1CQUFlLGVBQWE7QUFDeEI7QUFDQTtBQUZKQTs7QUFLQUEsc0JBQWtCLGVBQWE7QUFDM0IsZUFBT0EsUUFBUCxHQUFPQSxDQUFQO0FBREpBOztBQUlBQSxtQkFBZSxzQkFBc0I7QUFDakM7QUFDQTtBQUZKQTs7QUFLQUEsa0JBQWMsc0JBQW9CO0FBQzlCO0FBQ0E7QUFGSkE7O0FBS0FBLG1CQUFlLG1CQUFpQjtBQUM1QixpQkFBUTtBQUNKLGdCQUFJL0QsT0FBSjtBQUNBO0FBQ0EsK0JBQW1CLGFBQW5CO0FBQ0g7QUFDRDtBQU5KK0Q7QUFRQUEscUJBQWlCLGVBQWE7QUFDMUIsWUFBSS9ELE9BQUo7QUFDQTtBQUNBLDhCQUFzQixhQUF0QjtBQUNBO0FBSkorRDs7QUFPQUEscUJBQWlCLHNCQUFvQjtBQUNqQyxZQUFJL0IsS0FBSyxnQkFBVCxHQUFTLENBQVQ7QUFDQSxnQkFBTTtBQUNGLGdCQUFHQSxxQkFBcUIsS0FBckJBLFdBQUgsT0FBOEM7QUFDMUM7QUFDSDtBQUNKO0FBTkwrQjs7QUFTQUEsaUJBQWMseUJBQWlDO0FBQUEsWUFBVEUsTUFBUyxvRUFBSCxFQUFHOztBQUMzQyxZQUFJakUsT0FBSjtBQUNBLFlBQUlvRSxXQUFXQyxZQUFmO0FBQ0EsWUFBSUMsZUFBZVAsNEJBQW5CLFFBQW1CQSxDQUFuQjtBQUNBLDBCQUFnQjtBQUNaO0FBQ0FBO0FBQ0g7QUFDRCxnQkFBTztBQUNITywyQkFBZSx5QkFBYTtBQUN4QnRDLGlDQUFpQmhDLEtBQWpCZ0M7QUFESnNDO0FBR0FQO0FBQ0E7QUFDSDtBQUNEO0FBZkpBOztBQWtCQUEsc0JBQWtCLGVBQWU7QUFDN0I7QUFDQTtBQUZKQTs7QUFLQUEseUJBQXFCLFlBQVU7QUFDM0I7QUFDQSxZQUFHLEtBQUgsUUFBZTtBQUNYO0FBREosZUFFSztBQUNEO0FBQ0g7QUFOTEE7O0FBU0FBLGdDQUE0QixZQUFVO0FBQ2xDLGVBQU8sS0FBUCxZQUF3QjtBQUNwQiw2QkFBaUIsS0FBakI7QUFDSDtBQUhMQTs7QUFNQUEsMEJBQXNCLDRCQUEyQjtBQUM3QyxZQUFJL0QsT0FBSjtBQUNBLFlBQUlrQixRQUFKLFdBQXVCO0FBQ25CO0FBQ0g7QUFDRCxZQUFJLDhEQUFKLFVBQTZCO0FBQ3pCYixnREFBMEIscUJBQXFCO0FBQzNDTDtBQURKSztBQUdBO0FBQ0g7O0FBRUQsWUFBSWtFLElBQUlsRSwyQkFBUixLQUFRQSxDQUFSOztBQUVBO0FBQ0k7QUFDSTtBQUNBO0FBQ0o7QUFDSSxvQkFBSTZDLFVBQUosT0FBcUI7QUFDakI7QUFESix1QkFFTztBQUNIO0FBQ0g7QUFDRDtBQUNKO0FBQ0k7QUFDQTtBQWJSO0FBZUE7QUE3QkphOztBQWdDQUEsMkJBQXVCLFlBQXdCO0FBQUEsWUFBZHZELFVBQWMsb0VBQUosRUFBSTs7QUFDM0MsWUFBSWdFLFVBQVVoRSxtQkFBZDtBQUNBLFlBQUlpRSxVQUFVakUsbUJBQWQ7O0FBRjJDLG9DQUdmLEtBSGUscUJBR2YsRUFIZTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1EQUdlOzs7QUFDMUQsWUFBSWtFLEtBQUtDLElBQVQ7QUFDQSxZQUFJQyxLQUFLQyxJQUFUO0FBQ0EsWUFBSUMsYUFBYTVFLE9BQWpCO0FBQ0EsWUFBSTZFLGNBQWM3RSxPQUFsQjtBQUNBLGVBQU8sRUFBRXdFLE1BQU8sSUFBUEEsV0FBc0JDLEtBQU1HLGFBQTVCSixXQUFxREUsTUFBTyxJQUE1REYsV0FBNEVHLEtBQU1FLGNBQTNGLE9BQU8sQ0FBUDtBQVJKaEI7QUFVSDs7a0JBRWNyRCxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwTWY7Ozs7Ozs7O0FBRUEsSUFBSUksVUFBVTtBQUNWa0UsYUFBUyxJQURDLEdBQ0QsRUFEQztBQUVWQyxjQUFXLElBRkQsR0FFQyxFQUZEO0FBR1ZwRSxjQUFVLDhCQUFvQztBQUFBLFlBQWRMLFVBQWMsb0VBQUosRUFBSTs7QUFDMUMsWUFBSVIsT0FBSjtBQUNBLFlBQUlnRixVQUFVLEtBQWQ7QUFGMEM7O0FBSTFDLFlBQUlFLGNBQUo7QUFDQSxZQUFJQyxXQUFXSCxZQUFmLEdBQWVBLENBQWY7QUFDQSxZQUFHM0Usb0NBQTBCQSwwQkFBMUJBLFFBQTBCQSxDQUExQkEsSUFBdUQrRSxVQUExRCxNQUEwRTtBQUN0RS9FLGtEQUE0QiwwQkFBMEI7QUFDbEQsb0JBQUljLFNBQUosT0FBb0I7QUFDaEIrRDtBQUNIO0FBQ0RuRCwyQkFBV21CLE1BQVhuQixHQUFXbUIsQ0FBWG5CO0FBSkoxQjtBQURKLGVBUU07QUFDRjZFO0FBQ0FGO0FBQ0g7O0FBRUQsWUFBSUssV0FBV0wsWUFBZixHQUFlQSxDQUFmOztBQUVBLHlCQUFnQjtBQUNiO0FBQ0Y7O0FBRUQ7QUE1Qk07QUE4QlZNLGVBQVcsa0NBQXFDO0FBQUEsWUFBYjlFLFVBQWEsb0VBQUgsRUFBRzs7QUFDNUMsWUFBSVIsT0FBSjtBQUNBLFlBQUl1RixRQUFRLGtCQUFaLEdBQVksQ0FBWjs7QUFFQSxtQkFBVztBQUNQcEY7QUFDSDs7QUFFRG9GLGdCQUFRLFlBQVksWUFBWTtBQUM1QixnQkFBSTFCLE9BQU9oQixnQ0FBZ0MsYUFBaENBLFFBQVg7QUFDQSxpQkFBSyxJQUFJRyxJQUFULEdBQWdCQSxJQUFJYSxLQUFwQixhQUFzQztBQUNsQyxvQkFBSW5ELE1BQU1tRCxLQUFWLENBQVVBLENBQVY7QUFDQW5ELDhCQUFjQSxnQkFBZEEsUUFBY0EsQ0FBZEE7QUFDSDtBQUNEVjtBQU5JLFdBT0xRLDBCQVBIK0UsRUFBUSxDQUFSQTs7QUFTQTtBQS9DTTtBQWlEVmxFLGNBQVUsdUJBQWU7QUFDckIsZUFBTyxpQkFBUCxHQUFPLENBQVA7QUFDSDtBQW5EUyxDQUFkOztrQkFzRGVQLE87Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeERmLElBQU1hLE1BQU07QUFDUjZELFVBQU0sZ0JBQXVCO0FBQUEsWUFBYjlELFNBQWEsb0VBQUosRUFBSTs7QUFDekIsWUFBSStELFVBQVUsWUFBWSwyQkFBMkI7QUFBQSx1QkFDd0IvRCxVQUR4QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7O0FBR2pELGdCQUFJRCxVQUFVLElBQWQsY0FBYyxFQUFkO0FBQ0FBLHlCQUFjaUUsVUFBZGpFLFlBQXFDa0UsNkJBQXJDbEU7O0FBRUEsaUJBQUssSUFBTCxPQUFpQm1FLFVBQWpCLElBQWdDO0FBQzVCLG9CQUFJLENBQUNBLFVBQUQsbUJBQUosR0FBSSxDQUFKLEVBQXdDO0FBQ3BDbkUsa0RBQThCbUUsT0FBOUJuRSxHQUE4Qm1FLENBQTlCbkU7QUFDSDtBQUNKO0FBQ0QsZ0JBQUd0QixZQUFILGVBQUdBLENBQUgsRUFBZ0M7QUFDNUJzQiwwREFBMEN0QixZQUExQ3NCLGVBQTBDdEIsQ0FBMUNzQjtBQUNIO0FBQ0RBLDZCQUFpQixZQUFZO0FBQ3pCLG9CQUFJQSx5QkFBeUJBLGlCQUE3QixLQUFtRDtBQUMvQ29FLDRCQUFRQSxLQUFLQyxVQUFVckUsUUFBZm9FLFlBQUtDLENBQUxELEVBQVJBLE9BQVFBLENBQVJBO0FBQ0FFLDRCQUFRRCxVQUFVckUsUUFBbEJzRSxZQUFRRCxDQUFSQztBQUZKLHVCQUdPO0FBQ0hDLDRCQUFRQSxLQUFLRixVQUFVckUsUUFBZnVFLFlBQUtGLENBQUxFLEVBQVJBLE9BQVFBLENBQVJBO0FBQ0FDLDJCQUFPSCxVQUFVckUsUUFBakJ3RSxZQUFPSCxDQUFQRztBQUNIO0FBUEx4RTs7QUFVQUEsOEJBQWtCLFlBQVk7QUFDMUJ1RSx3QkFBUUEsS0FBS0YsVUFBVXJFLFFBQWZ1RSxZQUFLRixDQUFMRSxFQUFSQSxPQUFRQSxDQUFSQTtBQUNBQyx1QkFBT0gsVUFBVXJFLFFBQWpCd0UsWUFBT0gsQ0FBUEc7QUFGSnhFOztBQUtBQSx3Q0FBNEIsYUFBYTtBQUNyQyxvQkFBSWtCLElBQUlSLFdBQVcrRCxXQUFXQSxFQUFYQSxRQUFuQixHQUFRL0QsQ0FBUjtBQUNBZ0UsOEJBQWNBLGNBQWRBLENBQWNBLENBQWRBO0FBRkoxRTs7QUFLQSxnQkFBSTJFLGFBQUo7QUFDQTtBQUNJO0FBQ0lBO0FBQ0E7QUFDSjtBQUNBO0FBQ0kzRSw2REFBeUM0RSxnRUFBekM1RTtBQUNBMkUsNEJBQVFFLGVBQVJGLElBQVFFLENBQVJGO0FBUFI7O0FBVUFHLDBCQUFjQSxXQUFkQSxPQUFjQSxDQUFkQTs7QUFFQTlFO0FBL0NKLFNBQWMsQ0FBZDs7QUFrREE7QUFDSDtBQXJETyxDQUFaOztBQXdEQSx5QkFBeUI7QUFDckIsUUFBRztBQUNDLGVBQU82RSxXQUFXRSxRQUFsQixFQUFPRixDQUFQO0FBREosTUFFQyxVQUFVO0FBQ1A7QUFDSDtBQUNKOztrQkFFYzNFLEc7Ozs7Ozs7Ozs7Ozs7O0FDaEVmOzs7Ozs7OztBQUVBLElBQU04RSxRQUFOO0FBQ0EsSUFBTUMsUUFBTjtBQUNBLElBQU1DLGNBQU47QUFDQSxJQUFNQyxNQUFOOztBQUVBekcsa0NBQXdCLEVBQUMwRyxPQUFPM0csT0FBUixZQUEyQjRHLFFBQVE1RyxPQUEzREMsV0FBd0IsRUFBeEJBO0FBQ0FELGtDQUFrQyxZQUFZO0FBQzFDQyx5Q0FBMkIsRUFBQzBHLE9BQU8zRyxPQUFSLFlBQTJCNEcsUUFBUTVHLE9BQTlEQyxXQUEyQixFQUEzQkE7QUFESkQ7QUFHQSxpQkFBaUI7QUFDYixRQUFJNkcsT0FBTzVHLG9CQUFYLE9BQVdBLENBQVg7QUFDQSxRQUFJNkcsZ0JBQWdCLDhDQUNYO0FBQ0RDLG9CQURDO0FBRURILGdCQUZDO0FBR0RELGVBSEM7QUFJREssbUJBQVdSLFFBQVE7QUFKbEIsS0FEVyxPQU9WO0FBQ0ZTLDBCQUFrQjtBQURoQixLQVBVLGdCQVVELGFBQWE7QUFDeEIsWUFBSUMsVUFBVSxlQUFkO0FBQ0EsaUJBQVM7QUFDTEMscUJBQVNELFVBQVU7QUFEZCxTQUFUO0FBR0Esa0JBQVUsRUFBQ0Qsa0JBQWtCQyxVQUE3QixDQUFVLEVBQVY7QUFDQSxZQUFJQSxXQUFKLElBQW1CO0FBQ2Y7QUFDSDtBQWxCVCxLQUFvQixDQUFwQjs7QUFxQkFMO0FBQ0EsUUFBSU8sWUFBWU4sa0JBQWhCLEtBQWdCQSxDQUFoQjs7QUFFQSxRQUFJcEIsU0FBUyxtQ0FDSjtBQUNEMkIsaUJBREM7QUFFREMsaUJBRkM7QUFHREMsb0JBSEM7QUFJREMsdUJBSkM7QUFLREMsZUFMQztBQU1EQyxvQkFOQztBQU9EQyx3QkFQQztBQVFEWCxtQkFBV1IsUUFSVjtBQVNEb0Isa0JBVEM7QUFVREMsZ0JBVkM7QUFXRGQsb0JBQVlOO0FBWFgsS0FESSxDQUFiO0FBY0EsUUFBSXFCLGFBQWEsc0JBQ1I7QUFDRFQsaUJBREM7QUFFRFUsa0JBQVU7QUFGVCxLQURRLENBQWpCO0FBS0EsUUFBSUMsT0FBTyx1Q0FFRjtBQUNEakIsb0JBREM7QUFFRGtCLGtCQUZDO0FBR0RYLGlCQUhDO0FBSURZLG9CQUpDO0FBS0RDLHFCQUxDO0FBTURkLGlCQU5DO0FBT0RMLG1CQUFXTixNQVBWO0FBUURlLGVBQU9qQjtBQVJOLEtBRkUsQ0FBWDs7QUFhQSxRQUFJNEIsZ0JBQWdCLDBCQUNYO0FBQ0RmLGlCQUFTO0FBRFIsS0FEVyxDQUFwQjtBQUlBZSx1REFFUztBQUNESCxrQkFEQztBQUVEWixpQkFBUztBQUZSLEtBRlRlO0FBTUFBLGlFQUVTO0FBQ0RILGtCQURDO0FBRURaLGlCQUFTO0FBRlIsS0FGVGU7QUFNQSxRQUFJQyxPQUFPLHNCQUNGO0FBQ0RoQixpQkFEQztBQUVEWSxrQkFBVTtBQUZULEtBREUsQ0FBWDtBQUtBLFFBQUlLLFdBQVcsQ0FBZixhQUFlLENBQWY7QUFDQSxRQUFJQyxRQUFRLENBQVosbURBQVksQ0FBWjtBQUNBLFFBQUlDLGNBQWMsQ0FBbEIsU0FBa0IsQ0FBbEI7QUFDQUYscUJBQWlCLG9CQUFvQjtBQUNqQ0QsK0NBRWNDLFNBRmRELEdBRWNDLENBRmRELE1BR1M7QUFDREksb0JBREM7QUFFRFAsd0JBRkM7QUFHRFEsdUJBSEM7QUFJRFQsc0JBSkM7QUFLRFUsd0JBTEM7QUFNREMsd0JBQVk7QUFOWCxTQUhUUCxjQVdpQixZQUFZO0FBQ3JCckksd0JBQVl1SSxNQUFadkksR0FBWXVJLENBQVp2STtBQVpScUksNEJBY3NCLFlBQVk7QUFDMUIscUJBQVM7QUFDTFosdUJBQU87QUFERixhQUFUO0FBZlJZLHFDQW1Cc0IsWUFBWTtBQUMxQixxQkFBUztBQUNMWix1QkFBTztBQURGLGFBQVQ7QUFwQlJZO0FBREpDOztBQTJCQSxRQUFJTyx1QkFBdUIsc0NBQ2xCO0FBQ0RqQyxnQkFEQztBQUVEVSxpQkFGQztBQUdEQyxvQkFIQztBQUlERSxlQUpDO0FBS0RxQixtQkFMQztBQU1EbEIsa0JBTkM7QUFPREMsZ0JBQVE7QUFQUCxLQURrQixrQkFVTixhQUFhO0FBQzFCLFlBQUlrQixVQUFVL0ksb0JBQWQ7QUFDQSxZQUFJZ0osVUFBVWhKLHFCQUFkO0FBQ0EsWUFBSWlKLFNBQVNqRCxFQUFiO0FBQ0EsWUFBSWtELFNBQVNsRCxFQUFiO0FBQ0EsaUJBQVM7QUFDTG1ELHVCQUFXLGVBQWdCLEVBQUVGLFNBQUYsV0FBaEIsY0FBc0QsRUFBRUMsU0FBRixXQUF0RCxNQUFtRjtBQUR6RixTQUFUO0FBZm1CLHFCQW1CUixZQUFZO0FBQ3ZCLFlBQUl2RixPQUFPMUQsb0JBQVgsT0FBV0EsQ0FBWDtBQUNBLGFBQUssSUFBSTZDLElBQVQsR0FBZ0JBLElBQUlhLEtBQXBCLGFBQXNDO0FBQ2xDLGdCQUFJbkQsTUFBTW1ELEtBQVYsQ0FBVUEsQ0FBVjtBQUNBLGdCQUFJeUYsZUFBZTVJLGlCQUFpQixFQUFDK0QsU0FBckMsR0FBb0MsRUFBakIvRCxDQUFuQjtBQUNBLGdCQUFJMkcsVUFBVSxDQUFDM0csVUFBZjtBQUNBLGdCQUFJMkcsZUFBZSxDQUFuQixjQUFrQztBQUM5QkEsMEJBQVVBLFVBQVZBO0FBQ0g7QUFDRCxnQkFBSUEsZUFBSixjQUFpQztBQUM3QkEsMEJBQVVBLFVBQVZBO0FBQ0g7QUFDRCxnQkFBSWtDLGFBQWEsS0FBS2xDLFVBQXRCO0FBQ0EzRyxvQkFBUTtBQUNKMkcseUJBREk7QUFFSmdDLDJCQUFXLDZCQUE2QjtBQUZwQyxhQUFSM0k7QUFJSDtBQXBDVCxLQUEyQixDQUEzQjtBQXNDQSxRQUFJOEksWUFBWSxzRkFHUDtBQUNEN0IsZUFEQztBQUVEQyxvQkFGQztBQUdETyxrQkFIQztBQUlEUyxtQkFBVztBQUpWLEtBSE8sQ0FBaEI7QUFTQSxRQUFJYSxRQUFRLHVEQUVDLGtIQUZELCtEQUlIO0FBQ0R0QixrQkFBVTtBQURULEtBSkcsQ0FBWjs7QUFRQSxRQUFJdUIsaUJBQWlCWCx5QkFBckIsS0FBcUJBLENBQXJCO0FBQ0EsUUFBSVksYUFBYSxnREFFUjtBQUNEaEMsZUFEQztBQUVEQyxvQkFGQztBQUdETyxrQkFIQztBQUlEUyxtQkFKQztBQUtEZ0IsbUJBQVc7QUFMVixLQUZRLENBQWpCOztBQVVBLFFBQUlDLHFCQUFxQiw4QkFDaEI7QUFDRHRDLGlCQURDO0FBRURNLHdCQUZDO0FBR0QrQixtQkFIQztBQUlERSxrQkFBVTtBQUpULEtBRGdCLENBQXpCOztBQVFBLFFBQUlDLFNBQVMsaURBQWIsWUFBYSxDQUFiO0FBQ0EsUUFBSUMsYUFBYSx5Q0FBakIsUUFBaUIsQ0FBakI7QUFDQSxRQUFJQyxjQUFjLDZDQUFsQixTQUFrQixDQUFsQjtBQUNBRixtQkFBZSxxQkFBcUI7QUFDaEMsWUFBSUcsT0FBTyxvRUFFRjtBQUNEakMsc0JBREM7QUFFRFcsdUJBRkM7QUFHRHVCLHNCQUFVO0FBSFQsU0FGRSxDQUFYO0FBT0EsWUFBSWpDLE9BQU8saURBR0Y7QUFDREMsc0JBREM7QUFFRFoscUJBRkM7QUFHREksbUJBQU9zQyxZQUhOLEdBR01BLENBSE47QUFJRHBCLHdCQUFZb0IsbUJBQW1CO0FBSjlCLFNBSEUsQ0FBWDtBQVNBLFlBQUlyRyxPQUFPLHNCQUNFb0csV0FERixHQUNFQSxDQURGLE1BRUY7QUFDRDdCLHNCQURDO0FBRURQLHdCQUZDO0FBR0RnQix1QkFBVztBQUhWLFNBRkUsQ0FBWDtBQWpCSm1COztBQTBCQSxRQUFJSyxrQkFBa0JyQix5QkFBdEIsS0FBc0JBLENBQXRCO0FBQ0EsUUFBSXNCLGNBQWMsZ0RBRVQ7QUFDRDFDLGVBREM7QUFFREMsb0JBRkM7QUFHRE8sa0JBSEM7QUFJRFMsbUJBSkM7QUFLRGdCLG1CQUxDO0FBTURVLHNCQUFjO0FBTmIsS0FGUyxDQUFsQjs7QUFXQSxRQUFJQyxZQUFZLCtEQUFoQixxQkFBZ0IsQ0FBaEI7QUFDQSxRQUFJQyxTQUFTLDJEQUFiLDhDQUFhLENBQWI7QUFDQSxRQUFJQyxZQUFZLGtDQUFoQixhQUFnQixDQUFoQjtBQUNBLFFBQUlDLFdBQVc7QUFDWCxvQ0FBNEI7QUFEakIsS0FBZjs7QUFJQUgsc0JBQWtCLDRCQUE0QjtBQUMxQyxZQUFJTCxPQUFPLGdEQUVGO0FBQ0R0Qix1QkFEQztBQUVEMEIsMEJBQWM7QUFGYixTQUZFLENBQVg7QUFNQSxZQUFJSyxVQUFVLHlDQUVMO0FBQ0R4QyxzQkFEQztBQUVEUCx3QkFBWTtBQUZYLFNBRkssQ0FBZDs7QUFPQSxZQUFJTyxXQUFKO0FBQ0EsWUFBSXlDLFFBQVEsd0JBQ0NKLE9BREQsR0FDQ0EsQ0FERCxNQUVIO0FBQ0RyQyxzQkFBVUE7QUFEVCxTQUZHLENBQVo7O0FBTUEsWUFBSTBDLFdBQVcsd0JBQ0ZKLFVBREUsR0FDRkEsQ0FERSxNQUVOO0FBQ0R0QyxzQkFBVUE7QUFEVCxTQUZNLENBQWY7QUFLQSxTQUFDdUMseUJBQUQsWUFBc0MsbUJBQW1CO0FBQ3JEUixpREFFUztBQUNEL0IsMEJBQVVBO0FBRFQsYUFGVCtCO0FBREo7QUExQkpLOztBQW9DQSxRQUFJTyxTQUFTLG1IQUVKO0FBQ0RsQyxtQkFEQztBQUVEZ0IsbUJBQVc7QUFGVixLQUZJLENBQWI7O0FBT0EsUUFBSW1CLHFCQUFxQkMsTUFBekIsUUFBeUJBLEVBQXpCO0FBQ0EsUUFBSUMsY0FBYzlJLGNBQWVqQyxvQkFBakMsR0FBa0JpQyxDQUFsQjtBQUNBLFFBQUkrSSxjQUFjL0ksWUFBWUEsV0FBV2pDLG9CQUF6QyxXQUE4QmlDLENBQVpBLENBQWxCO0FBQ0EsUUFBSWdKLGlCQUFpQix5QkFDWjtBQUNEdkMsbUJBREM7QUFFRHdDLGFBRkM7QUFHREMsY0FIQztBQUlEdkQsa0JBSkM7QUFLREgsZUFMQztBQU1ESSxnQkFOQztBQU9EbUQscUJBUEM7QUFRREQscUJBQWFBLGNBUlo7QUFTRHBFLGVBQU87QUFUTixLQURZLE9BWVg7QUFDRk8saUJBQVM7QUFEUCxLQVpXLGdCQWVGLFlBQVk7QUFBQSx1QkFDRixLQURFLE9BQ0YsRUFERTtBQUFBO0FBQUE7O0FBRXZCLGlCQUFTO0FBQ0xpQyx1QkFBVyxnQkFBaUIsQ0FBQ04scUJBQUQsWUFBakIsSUFBc0Q7QUFENUQsU0FBVDtBQUdBM0I7QUFDQSxZQUFHQSxXQUFXMkQsbUJBQWQsUUFBd0M7QUFDcEMzRCxzQkFBVTJELDRCQUFWM0Q7QUFESixlQUVLO0FBQ0QsNkJBQWlCMkQsMkNBQWpCO0FBQ0g7QUFDRCxrQkFBVSxFQUFDM0QsU0FBWCxPQUFVLEVBQVY7QUExQmEsd0JBNEJDLGFBQWE7QUFBQTtBQUFBOztBQUUzQixZQUFJNkQsY0FBYzlJLGNBQWUwRSxRQUFqQyxHQUFrQjFFLENBQWxCO0FBQ0EsWUFBSStJLGNBQWMvSSxZQUFZQSxXQUFXMEUsUUFBekMsV0FBOEIxRSxDQUFaQSxDQUFsQjtBQUNBLGlCQUFTO0FBQ0wrSSx5QkFESztBQUVMRCx5QkFBYUEsY0FBYztBQUZ0QixTQUFUO0FBaENSLEtBQXFCLENBQXJCOztBQXVDQWpFO0FBQ0FNO0FBQ0FBO0FBQ0g7QUFDRDBELFEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbS9kb20nO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZSc7XHJcbmltcG9ydCByYWYgZnJvbSAnLi9jb21tb24vcmFmJztcclxuaW1wb3J0IGNvbW1vbiBmcm9tICcuL2NvbW1vbi9jb21tb24nO1xyXG5pbXBvcnQgeGhyIGZyb20gJy4veGhyL3hocic7XHJcblxyXG5jb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxuXHJcbnZhciBjYztcclxud2luZG93LmNjID0gY2MgPSB7XHJcbiAgICB0b29sczogY29tbW9uLFxyXG4gICAgbG9hZDogZnVuY3Rpb24oYWRkT25zID0gW10sIG9wdGlvbnMgPSB7fSl7XHJcblxyXG4gICAgfSxcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIHJldHVybiBkb20uc2VsZWN0KHNlbGVjdG9yKVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBkb20uY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBpZCwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50TlM6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5OUyA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGRvbS5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIGlkLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5yZXNldCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBzYXZlQXJyYXk6IGZ1bmN0aW9uKGtleSwgYXJyID0gW10sIGlka2V5KXtcclxuICAgICAgICBpZihpZGtleSAhPT0gdW5kZWZpbmVkICYmIGlka2V5ICE9PSAnJyAmJiBrZXkgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBjYy51cGRhdGVWYWx1ZShpdGVtW2lka2V5XSwgaXRlbSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5zZXRWYWx1ZShrZXksIGFycik7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlVmFsdWU6IGZ1bmN0aW9uKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gc3RvcmFnZS5nZXRWYWx1ZShrZXkpO1xyXG4gICAgfSxcclxuICAgIHNldFRpbWVyOiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgcmV0dXJuIHJhZi5yZXF1ZXN0VGltZW91dChmbiwgZGVsYXkpXHJcbiAgICB9LFxyXG4gICAgY2FuY2VsVGltZXI6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICByYWYuY2xlYXJSZXF1ZXN0VGltZW91dChoYW5kbGUpO1xyXG4gICAgfSxcclxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xyXG4gICAgICAgIHJldHVybiB4aHIuYWpheChwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmlmKElTX1dPUktFUil7XHJcbiAgICBkZWxldGUgY2Muc2VsZWN0O1xyXG4gICAgZGVsZXRlIGNjLmNyZWF0ZUVsZW1lbnQ7XHJcbiAgICBkZWxldGUgY2MuY3JlYXRlRWxlbWVudE5TO1xyXG59ZWxzZXtcclxuICAgIGxldCBsYXN0ID0gMFxyXG4gICAgbGV0IGZyYW1lVGlja2VyID0gZnVuY3Rpb24gKHRpbWVzdGFtcCkge1xyXG4gICAgICAgIGNjLnNldFZhbHVlKCdmcmFtZScsIHRpbWVzdGFtcCwge2ltbWVkaWF0ZWx5OiB0cnVlfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aW1lc3RhbXAgLSBsYXN0KTtcclxuICAgICAgICBsYXN0ID0gdGltZXN0YW1wO1xyXG4gICAgICAgIHJhZi5yZXF1ZXN0VGltZW91dChmcmFtZVRpY2tlciwgMTYpXHJcbiAgICB9O1xyXG4gICAgZnJhbWVUaWNrZXIoMCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYzsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxuY29uc3QgY29tbW9uID0ge307XHJcblxyXG5jb21tb24ub2JqZWN0Zm9yRWFjaCA9IGZ1bmN0aW9uKG9iaixmbil7XHJcbiAgICBmb3IodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgZm4ob2JqW2tleV0sIGtleSwgb2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb21tb24ub2JqZWN0QXNzaWduID0gZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2Upe1xyXG4gICAgZm9yKGxldCBrZXkgaW4gc291cmNlKSB7XHJcbiAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59O1xyXG5cclxuY29tbW9uLmNyZWF0ZUlkID0gZnVuY3Rpb24oKXtcclxuICAgIGZ1bmN0aW9uIHM0KCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxyXG4gICAgICAgICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcbn07XHJcblxyXG5jb21tb24uaXNPYmplY3QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIChpdGVtIT09dW5kZWZpbmVkICYmIGl0ZW0gPT09IE9iamVjdChpdGVtKSAmJiAhKGl0ZW0gaW5zdGFuY2VvZiBBcnJheSkpXHJcbn07XHJcblxyXG5jb21tb24uZ2V0QnJvd3NlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGlzSUUgPSBmYWxzZTtcclxuICAgIGxldCBpc0Nocm9tZSA9IGZhbHNlO1xyXG4gICAgbGV0IGlzT3BlcmEgPSBmYWxzZTtcclxuICAgIGlmICgoISFDT05URVhULm9wciAmJiAhIW9wci5hZGRvbnMpIHx8ICEhQ09OVEVYVC5vcGVyYSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBPUFIvJykgPj0gMCkge1xyXG4gICAgICAgIGlzT3BlcmEgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiAnb3BlcmEnO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBJbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xyXG4gICAgfVxyXG4gICAgaWYgKC9jb25zdHJ1Y3Rvci9pLnRlc3QoQ09OVEVYVC5IVE1MRWxlbWVudCkgfHwgKGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgcmV0dXJuIHAudG9TdHJpbmcoKSA9PT0gXCJbb2JqZWN0IFNhZmFyaVJlbW90ZU5vdGlmaWNhdGlvbl1cIjtcclxuICAgIH0pKCFDT05URVhUWydzYWZhcmknXSB8fCBzYWZhcmkucHVzaE5vdGlmaWNhdGlvbikpIHtcclxuICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XHJcbiAgICB9XHJcbiAgICBpZiAoZmFsc2UgfHwgISFkb2N1bWVudC5kb2N1bWVudE1vZGUpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50c1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoISgncmVtb3ZlJyBpbiBFbGVtZW50LnByb3RvdHlwZSkpIHtcclxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXNJRSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuICdpZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoIWlzSUUgJiYgISFDT05URVhULlN0eWxlTWVkaWEpIHtcclxuICAgICAgICByZXR1cm4gJ2VkZ2UnO1xyXG4gICAgfVxyXG4gICAgaWYgKCEhQ09OVEVYVC5jaHJvbWUgJiYgISFDT05URVhULmNocm9tZS53ZWJzdG9yZSkge1xyXG4gICAgICAgIGlzQ2hyb21lID0gdHJ1ZVxyXG4gICAgICAgIHJldHVybiAnY2hyb21lJztcclxuICAgIH1cclxuICAgIGlmICgoaXNDaHJvbWUgfHwgaXNPcGVyYSkgJiYgISFDT05URVhULkNTUykge1xyXG4gICAgICAgIHJldHVybiAnYmxpbmsnO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29tbW9uLnJlYWRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgaWYodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpe1xyXG4gICAgICAgIHJldHVybiB2YWx1ZShvcHRpb25zKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1vbjsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxudmFyIHJhZiA9IHtcclxuICAgIHJlcXVlc3RUaW1lb3V0OiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgaWYgKCFDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZSlcclxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZm4sIGRlbGF5KTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgaGFuZGxlID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb29wKHRpbWVzdGFtcCkge1xyXG4gICAgICAgICAgICAoRGF0ZS5ub3coKSAtIHN0YXJ0KSA+PSBkZWxheSA/IGZuKHRpbWVzdGFtcCkgOiBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICByZXR1cm4gaGFuZGxlO1xyXG4gICAgfSxcclxuICAgIGNsZWFyUmVxdWVzdFRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICBDT05URVhULmNhbmNlbEFuaW1hdGlvbkZyYW1lID8gQ09OVEVYVC5jYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpOmNsZWFyVGltZW91dChoYW5kbGUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmFmOyIsImltcG9ydCBjb21tb24gZnJvbSAnLi4vY29tbW9uL2NvbW1vbidcclxudmFyIGRvbSA9IHtcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIGlmKHNlbGVjdG9yPT09dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IF9zZWxlY3RvciA9IHNlbGVjdG9yLmNoYXJBdCgwKTtcclxuICAgICAgICBsZXQgbmFtZSA9IHNlbGVjdG9yLnN1YnN0cmluZygxKTtcclxuICAgICAgICBsZXQgZG9tcyA9IFtdO1xyXG4gICAgICAgIHN3aXRjaCAoX3NlbGVjdG9yKXtcclxuICAgICAgICAgICAgY2FzZSAnIyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZSk7XHJcbiAgICAgICAgICAgIGNhc2UgJy4nOlxyXG4gICAgICAgICAgICAgICAgZG9tcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobmFtZSkgfHwgW107XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGRvbXMgPSAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoc2VsZWN0b3IpIHx8IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRvbXM7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHRhZywgaWQgPSAnJywgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgICAgIGxldCBlbGVtZW50SWQgPSBpZCB8fCAodGFnICsgJ18nICsgY29tbW9uLmNyZWF0ZUlkKCkpO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIGVsZW1lbnRJZCk7XHJcblxyXG4gICAgICAgIHNldHVwRWxlbWVudE1ldGhvZHMoZWxlbWVudCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldHVwRWxlbWVudE1ldGhvZHMoZWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMgPSBuZXcgTWFwKCk7XHJcbiAgICBlbGVtZW50Ll9ib3VuZCA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBlbGVtZW50LmFkZCA9IGZ1bmN0aW9uICh0YWcsIGlkLCBvcHRpb25zKSB7XHJcbiAgICAgICAgbGV0IGNoaWxkID0gZG9tLmNyZWF0ZUVsZW1lbnQodGFnLCBpZCwgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRWxlbWVudChjaGlsZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYWRkRWxlbWVudCA9IGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgIHJldHVybiBjaGlsZFxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmFkZENsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LnJlbW92ZUNsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmdldEF0dHIgPSBmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShrZXkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmF0dHIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnQoJ2F0dHInLCBrZXksIHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5nZXREYXRhID0gZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmRhdGEgPSBmdW5jdGlvbihhbnkpe1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBhbnk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuZ2V0UHJvcCA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRba2V5XTtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5wcm9wID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zZXRFbGVtZW50KCdwcm9wJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuY3NzID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudCgnY3NzJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYmluZCA9IGZ1bmN0aW9uKGtleSwgZm4pe1xyXG4gICAgICAgIGlmKGtleSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvdW5kLnNldChrZXksIGZuKTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdzdG9yYWdlXycgKyBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBlbGVtZW50LnVuYmluZCA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnc3RvcmFnZV8nICsga2V5KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5fcmVhY3QgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcclxuICAgICAgICBsZXQgZm4gPSB0aGlzLl9ib3VuZC5nZXQoa2V5KTtcclxuICAgICAgICBpZihmbil7XHJcbiAgICAgICAgICAgIGlmKGZuLmNhbGwodGhpcywgdmFsdWUsIHRoaXMuX2RhdGEpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZChrZXkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQub24gID0gZnVuY3Rpb24oZXZlbnROYW1lLCBmbiwgdGFnID0gJycpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZXZlbnRUYWcgPSBldmVudE5hbWUgKyB0YWc7XHJcbiAgICAgICAgbGV0IGV2ZW50SGFuZGxlciA9IGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzLmdldChldmVudFRhZyk7XHJcbiAgICAgICAgaWYoZXZlbnRIYW5kbGVyKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuZGVsZXRlKGV2ZW50VGFnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZm4pIHtcclxuICAgICAgICAgICAgZXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGZuLmNhbGwoc2VsZiwgZSwgc2VsZi5fZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzLnNldChldmVudFRhZywgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmNvbnRlbnQgPSBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgdGhpcy5pbm5lclRleHQgPSBzdHI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQucmVtb3ZlU2VsZiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGlmKHRoaXMucmVtb3ZlKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LnJlbW92ZUFsbENoaWxkcmVuID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB3aGlsZSAodGhpcy5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuX3NldEVsZW1lbnQgPSBmdW5jdGlvbih0eXBlLCBrZXkgLCB2YWx1ZSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi5vYmplY3Rmb3JFYWNoKGtleSAsZnVuY3Rpb24gKGl0ZW0sIGtleSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZlt0eXBlXShrZXksIGl0ZW0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2ID0gY29tbW9uLnJlYWRWYWx1ZSh2YWx1ZSk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdwcm9wJzpcclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9ICB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhdHRyJzpcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShrZXkpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnY3NzJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVba2V5XSA9ICB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LmlzSW5WaWV3cG9ydCA9IGZ1bmN0aW9uIChvcHRpb25zID0ge30pIHtcclxuICAgICAgICBsZXQgb2Zmc2V0WCA9IG9wdGlvbnMub2Zmc2V0WCB8fCAwO1xyXG4gICAgICAgIGxldCBvZmZzZXRZID0gb3B0aW9ucy5vZmZzZXRZIHx8IDA7XHJcbiAgICAgICAgbGV0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7IC8vSUUgbm90IHN1cHBvcnQgYm90dG9tIHJpZ2h0XHJcbiAgICAgICAgbGV0IHgyID0geCArIHdpZHRoO1xyXG4gICAgICAgIGxldCB5MiA9IHkgKyBoZWlnaHQ7XHJcbiAgICAgICAgbGV0IGlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBsZXQgaW5uZXJIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuICEoeDIgPD0gKDAgKyBvZmZzZXRYKXx8IHggPj0gKGlubmVyV2lkdGggLSBvZmZzZXRYKSB8fCB5MiA8PSAoMCArIG9mZnNldFkpIHx8IHkgPj0gKGlubmVySGVpZ2h0IC0gb2Zmc2V0WSkpXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkb207IiwiaW1wb3J0IGNvbW1vbiBmcm9tICcuLi9jb21tb24vY29tbW9uJztcclxuXHJcbnZhciBzdG9yYWdlID0ge1xyXG4gICAgZGF0YU1hcDogbmV3IE1hcCgpLFxyXG4gICAgdGltZXJNYXA6ICBuZXcgTWFwKCksXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZGF0YU1hcCA9IHRoaXMuZGF0YU1hcDtcclxuICAgICAgICBsZXQge3Jlc2V0fSA9IG9wdGlvbnM7XHJcbiAgICAgICAgbGV0IHNob3VsZFJlYWN0ID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG9sZFZhbHVlID0gZGF0YU1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZihjb21tb24uaXNPYmplY3QodmFsdWUpICYmIGNvbW1vbi5pc09iamVjdChvbGRWYWx1ZSkgJiYgcmVzZXQgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgY29tbW9uLm9iamVjdGZvckVhY2godmFsdWUsIGZ1bmN0aW9uIChpdGVtLCBrZXksIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkUmVhY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZVtrZXldXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgc2hvdWxkUmVhY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBkYXRhTWFwLnNldChrZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IGRhdGFNYXAuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIGlmKHNob3VsZFJlYWN0KSB7XHJcbiAgICAgICAgICAgdGhpcy5icm9hZGNhc3Qoa2V5LCBuZXdWYWx1ZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICB9LFxyXG4gICAgYnJvYWRjYXN0OiBmdW5jdGlvbihrZXksIG5ld1ZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgdGltZXIgPSB0aGlzLnRpbWVyTWFwLmdldChrZXkpO1xyXG5cclxuICAgICAgICBpZiAodGltZXIpIHtcclxuICAgICAgICAgICAgY2MuY2FuY2VsVGltZXIodGltZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGltZXIgPSBjYy5zZXRUaW1lcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBkb21zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3RvcmFnZV8nICsga2V5KSB8fCBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb21zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG9tID0gZG9tc1tpXTtcclxuICAgICAgICAgICAgICAgIGRvbS5fcmVhY3QgJiYgZG9tLl9yZWFjdChrZXksIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnRpbWVyTWFwLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIH0sIG9wdGlvbnMuaW1tZWRpYXRlbHk/IDA6IDEwKTtcclxuXHJcbiAgICAgICAgdGhpcy50aW1lck1hcC5zZXQoa2V5LCB0aW1lcik7XHJcbiAgICB9LFxyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhTWFwLmdldChrZXkpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3RvcmFnZTsiLCJjb25zdCB4aHIgPSB7XHJcbiAgICBhamF4OiBmdW5jdGlvbiAocGFyYW1zID0ge30pIHtcclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgbGV0IHt1cmwsIG1ldGhvZCwgZGF0YSwgYXN5bmMsIHhociwgY29udGVudFR5cGUsIGRhdGFUeXBlLCBkb25lLCBmYWlsfSA9IHBhcmFtcyB8fCB7fTtcclxuICAgICAgICAgICAgbGV0IHtoZWFkZXIsIG9uUHJvZ3Jlc3MsIGJlZm9yZVNlbmR9ID0gcGFyYW1zO1xyXG4gICAgICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICByZXF1ZXN0Lm9wZW4oKG1ldGhvZCB8fCAnR0VUJyksIHVybCwgYXN5bmMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhc3luYyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gKGhlYWRlciB8fCB7fSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoaGVhZGVyIHx8IHt9KS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNjLmdldFZhbHVlKCdBdXRob3JpemF0aW9uJykpe1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgY2MuZ2V0VmFsdWUoJ0F1dGhvcml6YXRpb24nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9uZSAmJiBkb25lKHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCksIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhaWwgJiYgZmFpbChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmYWlsICYmIGZhaWwocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0LnVwbG9hZC5vbnByb2dyZXNzID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwID0gTWF0aC5mbG9vcihlLmxvYWRlZCAvIGUudG90YWwgKiAxMDApO1xyXG4gICAgICAgICAgICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKHAsIGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IF9kYXRhO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGFUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdmaWxlJzpcclxuICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdqc29uJzpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSA9PT0gdW5kZWZpbmVkID8gXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIgOiBjb250ZW50VHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmVmb3JlU2VuZCAmJiBiZWZvcmVTZW5kKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdC5zZW5kKF9kYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZnVuY3Rpb24gcGFyc2VEYXRhKGRhdGEpIHtcclxuICAgIHRyeXtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhIHx8ICcnKVxyXG4gICAgfWNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB4aHI7XHJcbiIsImltcG9ydCBjYyBmcm9tICcuL2NjanMvY2MnO1xyXG5cclxuY29uc3QgV0hJVEUgPSAncmdiYSgyNTUsMjU1LDI1NSwgMC43KSc7XHJcbmNvbnN0IEJMQUNLID0gJ3JnYmEoMCwwLDAsIDAuOSknO1xyXG5jb25zdCBCTEFDS19TT0xJRCA9ICdyZ2IoMjUsIDI1LCAyNSknO1xyXG5jb25zdCBSRUQgPSAnI2Q2MzAzMSc7XHJcblxyXG5jYy5zZXRWYWx1ZSgndmlld3BvcnQnLCB7d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodH0pO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY2MudXBkYXRlVmFsdWUoJ3ZpZXdwb3J0Jywge3dpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHR9KTtcclxufSk7XHJcbmZ1bmN0aW9uIGluZGV4KCkge1xyXG4gICAgbGV0IHJvb3QgPSBjYy5zZWxlY3QoJyNib2R5Jyk7XHJcbiAgICBsZXQgbWFpbkNvbnRhaW5lciA9IGNjLmNyZWF0ZUVsZW1lbnQoJ2RpdicsICd0ZXN0JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZDogQkxBQ0ssXHJcbiAgICAgICAgICAgIGhlaWdodDogJzEwMHZoJyxcclxuICAgICAgICAgICAgd2lkdGg6ICcxMDB2dycsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogQkxBQ0sgKyAnMCAwIDEwcHggMjBweCdcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kYXRhKHtcclxuICAgICAgICAgICAgYW5pbWF0aW9uQ291bnRlcjogMCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5iaW5kKCdmcmFtZScsIGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudGVyID0gdGhpcy5nZXREYXRhKCkuYW5pbWF0aW9uQ291bnRlcjtcclxuICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogY291bnRlciAvIDYwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEoe2FuaW1hdGlvbkNvdW50ZXI6IGNvdW50ZXIgKyAxfSk7XHJcbiAgICAgICAgICAgIGlmIChjb3VudGVyID49IDYwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZCgnZnJhbWUnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgcm9vdC5hcHBlbmRDaGlsZChtYWluQ29udGFpbmVyKTtcclxuICAgIGxldCBjb250YWluZXIgPSBtYWluQ29udGFpbmVyLmFkZCgnZGl2JylcclxuXHJcbiAgICBsZXQgaGVhZGVyID0gY29udGFpbmVyLmFkZCgnZGl2JywgJ2hlYWRlcicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzAgMTIuNSUnLFxyXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnMzJweCcsXHJcbiAgICAgICAgICAgIHBhZGRpbmdCb3R0b206ICcxNnB4JyxcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgICAgIGJveFNoYWRvdzogQkxBQ0sgKyAnIDAgMCAyMHB4JyxcclxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgIHpJbmRleDogMTAsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IEJMQUNLX1NPTElEXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgaGVhZGVyTGVmdCA9IGhlYWRlci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICBtaW5XaWR0aDogJzI1NnB4J1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGxvZ28gPSBoZWFkZXJMZWZ0LmFkZCgnZGl2JylcclxuICAgICAgICAuY29udGVudCgnQScpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IFJFRCxcclxuICAgICAgICAgICAgZm9udFNpemU6ICc2NHB4JyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzAgMTZweCcsXHJcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICc1NHB4JyxcclxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICc0cHgnLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiBSRUQgKyAnIDAgMCAxMHB4JyxcclxuICAgICAgICAgICAgY29sb3I6IEJMQUNLXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IG5hbWVDb250YWluZXIgPSBoZWFkZXJMZWZ0LmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcclxuICAgICAgICB9KTtcclxuICAgIG5hbWVDb250YWluZXIuYWRkKCdzcGFuJylcclxuICAgICAgICAuY29udGVudCgnTlhJTiBZQU5HJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICB9KTtcclxuICAgIG5hbWVDb250YWluZXIuYWRkKCdzcGFuJylcclxuICAgICAgICAuY29udGVudCgnRnJvbnQtRW5kIERldmVsb3BlcicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaydcclxuICAgICAgICB9KTtcclxuICAgIGxldCBtZW51ID0gaGVhZGVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IG1lbnVMaXN0ID0gWydmYS1saW5rZWRpbiddO1xyXG4gICAgbGV0IGxpbmtzID0gWydodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vYW54aW4teWFuZy03MDcwMjkxMjUvJ107XHJcbiAgICBsZXQgaG92ZXJDb2xvcnMgPSBbJyMwMDc3QjUnXTtcclxuICAgIG1lbnVMaXN0LmZvckVhY2goZnVuY3Rpb24gKHRhZywgaWR4KSB7XHJcbiAgICAgICAgbWVudS5hZGQoJ2knKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhYicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhtZW51TGlzdFtpZHhdKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxyXG4gICAgICAgICAgICAgICAgbGluZUhlaWdodDogJzU0cHgnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0U2hhZG93OiAnIDAgMCA1cHgnLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJzAuM3MnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihsaW5rc1tpZHhdLCAnX2JsYW5rJylcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzAwNzdCNScsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LCAnc3R5bGUnKVxyXG4gICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcnLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSwgJ3N0eWxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgbWFpbkNvbnRlbnRDb250YWluZXIgPSBjYy5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBoZWlnaHQ6ICdjYWxjKDEwMHZoIC0gMTAwcHgpJyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzAgMTIuNSUnLFxyXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnMjV2aCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxyXG4gICAgICAgICAgICB6SW5kZXg6IDUsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGxldCBjZW50ZXJYID0gd2luZG93LmlubmVyV2lkdGggLyAyO1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIGxldCBtb3VzZVggPSBlLmNsaWVudFg7XHJcbiAgICAgICAgICAgIGxldCBtb3VzZVkgPSBlLmNsaWVudFk7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgnICsgKC0obW91c2VYIC0gY2VudGVyWCkgLyAxMDApICsgJ3B4LCcgKyAoLShtb3VzZVkgLSBjZW50ZXJZKSAvIDEwMCkgKyAncHgpJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5iaW5kKCdmcmFtZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGRvbXMgPSBjYy5zZWxlY3QoJy5mYWRlJyk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9tcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRvbSA9IGRvbXNbaV07XHJcbiAgICAgICAgICAgICAgICBsZXQgaXNJblZpZXdQb3J0ID0gZG9tLmlzSW5WaWV3cG9ydCh7b2Zmc2V0WTogMTIwfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3BhY2l0eSA9ICtkb20uc3R5bGUub3BhY2l0eTtcclxuICAgICAgICAgICAgICAgIGlmIChvcGFjaXR5ID4gMCAmJiAhaXNJblZpZXdQb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSA9IG9wYWNpdHkgLSAwLjA1O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9wYWNpdHkgPCAxICYmIGlzSW5WaWV3UG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHkgPSBvcGFjaXR5ICsgMC4wMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxldCB0cmFuc2xhdGVZID0gMzAgLSBvcGFjaXR5ICogMzA7XHJcbiAgICAgICAgICAgICAgICBkb20uY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBvcGFjaXR5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoJyArIHRyYW5zbGF0ZVkgKyAncHgpJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGhpZ2hMaWdodCA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY29udGVudChcIkxldCdzIG1ha2UgZGF0YSBhbGl2ZVwiKVxyXG4gICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzQ4cHgnLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGludHJvID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdwJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2ZhZGUnKVxyXG4gICAgICAgIC5jb250ZW50KFwiSSdtIGEgZnJvbnQtZW5kIGRldmVsb3BlciBmcm9tIEJheSBBcmVhLCBDYWxpZm9ybmlhLCBhbmQgY3VycmVudGx5IGxpdmluZyBpbiBTYW4gSm9zZS4gSSBlbmpveSBidWlsZGluZyByaWNoIFwiICtcclxuICAgICAgICAgICAgXCJpbnRlcmFjdGl2ZSB3ZWJzaXRlcyBhbmQgd2ViIGFwcHMgZnJvbSBzbWFsbCB0byBsYXJnZS4gXCIpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjBweCcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IHNraWxsQ29udGFpbmVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdkaXYnKTtcclxuICAgIGxldCBza2lsbFRpdGxlID0gc2tpbGxDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jb250ZW50KFwiU2tpbGxzXCIpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzQ4cHgnLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICcyNTZweCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgc2tpbGxDYXJkQ29udGFpbmVyID0gc2tpbGxDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzEyOHB4JyxcclxuICAgICAgICAgICAgZmxleFdyYXA6ICd3cmFwJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBza2lsbHMgPSBbJ2ZhLWh0bWw1JywgJ2ZhLWpzJywgJ2ZhLWNzczMtYWx0JywgJ2ZhLXJlYWN0JywgJ2ZhLW5vZGUtanMnXTtcclxuICAgIGxldCBza2lsbE5hbWVzID0gWydIVE1MNScsICdKYXZhc2NyaXB0JywgJ0NTUzMnLCAnUmVhY3QnLCAnTm9kZUpTJ107XHJcbiAgICBsZXQgc2tpbGxDb2xvcnMgPSBbJyNlNDRkMjYnLCAnI2VlYWY0YicsICcjMDA3MGJhJywgJyM2MWRhZmInLCAnIzdjYjcwMCddO1xyXG4gICAgc2tpbGxzLmZvckVhY2goZnVuY3Rpb24gKGljb24sIGlkeCkge1xyXG4gICAgICAgIGxldCBjYXJkID0gc2tpbGxDYXJkQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYWRlJykuYWRkQ2xhc3MoJ2ZhZGUnKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIG1pbldpZHRoOiAnMzAwcHgnLFxyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIGZsZXhHcm93OiAxLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbG9nbyA9IGNhcmQuYWRkKCdpJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYWInKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoaWNvbilcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzI1NnB4JyxcclxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogc2tpbGxDb2xvcnNbaWR4XSxcclxuICAgICAgICAgICAgICAgIHRleHRTaGFkb3c6IHNraWxsQ29sb3JzW2lkeF0gKyAnIDAgMCAxMHB4J1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbmFtZSA9IGNhcmQuYWRkKCdwJylcclxuICAgICAgICAgICAgLmNvbnRlbnQoc2tpbGxOYW1lc1tpZHhdKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgY2FyZWVyQ29udGFpbmVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdkaXYnKTtcclxuICAgIGxldCBjYXJlZXJUaXRsZSA9IHNraWxsQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY29udGVudChcIkNhcmVlclwiKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBjb2xvcjogV0hJVEUsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgZm9udFNpemU6ICc0OHB4JyxcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgbWFyZ2luVG9wOiAnMTI4cHgnLFxyXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc2NHB4JyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgY29tcGFuaWVzID0gWyduZXRFbGFzdGljIFN5c3RlbXMsIEluYy4nLCAnU2FuIEZyYW5jaXNjbyBTdGF0ZSBVbml2ZXJzaXR5JywgJ1NoYW5naGFpIFVuaXZlcnNpdHknXTtcclxuICAgIGxldCB0aXRsZXMgPSBbJ1NvZnR3YXJlIEVuZ2luZWVyJywgJ0JTIC0gQ29tcHV0ZXIgRW5naW5lZXJpbmcgU3R1ZGVudCcsICdBUyAtIENvbXB1dGVyIEFwcGxpY2F0aW9uIFRlY2hub2xvZ3kgU3R1ZGVudCddO1xyXG4gICAgbGV0IHRpbWVMaW5lcyA9IFsnMjAxNyAtIEN1cnJlbnQnLCAnMjAxMyAtIDIwMTcnLCAnMjAwOSAtIDIwMTMnXTtcclxuICAgIGxldCBwcm9qZWN0cyA9IHtcclxuICAgICAgICAnbmV0RWxhc3RpYyBTeXN0ZW1zLCBJbmMuJzogWyd2Qk5HIE1hbmFnZW1lbnQgU3lzdGVtIChVSSBMZWFkKScsICdTRC1XQU4gTWFuYWdlbWVudCBTeXN0ZW0gKFVJIFRlYW0gTWVtYmVyKScsXVxyXG4gICAgfTtcclxuXHJcbiAgICBjb21wYW5pZXMuZm9yRWFjaChmdW5jdGlvbiAoY29tcGFueU5hbWUsIGlkeCkge1xyXG4gICAgICAgIGxldCBjYXJkID0gY2FyZWVyQ29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYWRlJylcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnNjRweCdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IGNvbXBhbnkgPSBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmNvbnRlbnQoY29tcGFueU5hbWUpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IGZvbnRTaXplID0gJzIwcHgnO1xyXG4gICAgICAgIGxldCB0aXRsZSA9IGNhcmQuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAuY29udGVudCh0aXRsZXNbaWR4XSlcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemUsXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBsZXQgdGltZUxpbmUgPSBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmNvbnRlbnQodGltZUxpbmVzW2lkeF0pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAocHJvamVjdHNbY29tcGFueU5hbWVdIHx8IFtdKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9qZWN0KSB7XHJcbiAgICAgICAgICAgIGNhcmQuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAgICAgLmNvbnRlbnQocHJvamVjdClcclxuICAgICAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBmb290ZXIgPSBtYWluQ29udGVudENvbnRhaW5lci5hZGQoJ3AnKVxyXG4gICAgICAgIC5jb250ZW50KCdUaGlzIHdlYnNpdGUgaXMgYnVpbGQgYnkgY2NKUywgYSBzZWxmLWltcGxlbWVudGVkIEphdmFzY3JpcHQgTGlicmFyeS4nKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICcxMjhweCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgY29kZUJhY2tncm91bmRUZXh0ID0gaW5kZXgudG9TdHJpbmcoKTtcclxuICAgIGxldCBjb2x1bW5XaWR0aCA9IE1hdGgubWluKDQwMCAsIHdpbmRvdy5pbm5lcldpZHRoIC0gMTI4KTtcclxuICAgIGxldCBjb2x1bW5Db3VudCA9IE1hdGgubWluKDIsIE1hdGguZmxvb3Iod2luZG93LmlubmVyV2lkdGgvKGNvbHVtbldpZHRoKSkpO1xyXG4gICAgbGV0IGNvZGVCYWNrZ3JvdW5kID0gY29udGFpbmVyLmFkZCgncHJlJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgdGV4dEFsaWduOiAnbGVmdCcsXHJcbiAgICAgICAgICAgIHRvcDogJzEyOHB4JyxcclxuICAgICAgICAgICAgbGVmdDogJzY0cHgnLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcclxuICAgICAgICAgICAgY29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LCAwLjA2KScsXHJcbiAgICAgICAgICAgIHpJbmRleDogMCxcclxuICAgICAgICAgICAgY29sdW1uQ291bnQ6IGNvbHVtbkNvdW50LFxyXG4gICAgICAgICAgICBjb2x1bW5XaWR0aDogY29sdW1uV2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICB3aWR0aDogJ2NhbGMoMTAwdncgLSAxMjhweCknLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmRhdGEoe1xyXG4gICAgICAgICAgICBjb3VudGVyOiAwLFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ2ZyYW1lJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQge2NvdW50ZXIsIHN0cn0gPSB0aGlzLmdldERhdGEoKTtcclxuICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgnICsgKC1tYWluQ29udGVudENvbnRhaW5lci5zY3JvbGxUb3AvNikgKyAncHgpJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY291bnRlcis9MjQ7XHJcbiAgICAgICAgICAgIGlmKGNvdW50ZXIgPj0gY29kZUJhY2tncm91bmRUZXh0Lmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyID0gY29kZUJhY2tncm91bmRUZXh0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbm5lclRleHQgPSBjb2RlQmFja2dyb3VuZFRleHQuc3Vic3RyaW5nKDAsIGNvdW50ZXIpICsgJ18nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSh7Y291bnRlcjogY291bnRlcn0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYmluZCgndmlld3BvcnQnLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgICAgICBsZXQge2hlaWdodCwgd2lkdGh9ID0gZDtcclxuICAgICAgICAgICAgbGV0IGNvbHVtbldpZHRoID0gTWF0aC5taW4oNDAwICwgd2lkdGggLSAxMjgpO1xyXG4gICAgICAgICAgICBsZXQgY29sdW1uQ291bnQgPSBNYXRoLm1pbigyLCBNYXRoLmZsb29yKHdpZHRoLyhjb2x1bW5XaWR0aCkpKTtcclxuICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgY29sdW1uQ291bnQ6IGNvbHVtbkNvdW50LFxyXG4gICAgICAgICAgICAgICAgY29sdW1uV2lkdGg6IGNvbHVtbldpZHRoICsgJ3B4JyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgbWFpbkNvbnRhaW5lci5hZGRFbGVtZW50KGNvbnRhaW5lcik7XHJcbiAgICBjb250YWluZXIuYWRkRWxlbWVudChoZWFkZXIpO1xyXG4gICAgY29udGFpbmVyLmFkZEVsZW1lbnQobWFpbkNvbnRlbnRDb250YWluZXIpO1xyXG59XHJcbmluZGV4KCk7Il0sInNvdXJjZVJvb3QiOiIifQ==