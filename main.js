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

    var footShadow = container.add('div').content('').css({
        position: 'fixed',
        bottom: '0',
        left: 0,
        width: '100%',
        zIndex: 12,
        boxShadow: 'rgba(255, 0, 80, 0.8) 0px 0px 50px 2px'
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY29tbW9uL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy9jb21tb24vcmFmLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvc3RvcmFnZS9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL3hoci94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIklTX1dPUktFUiIsInNlbGYiLCJDT05URVhUIiwid2luZG93IiwiY2MiLCJ0b29scyIsImNvbW1vbiIsImxvYWQiLCJhZGRPbnMiLCJvcHRpb25zIiwic2VsZWN0IiwiZG9tIiwiY3JlYXRlRWxlbWVudCIsImNyZWF0ZUVsZW1lbnROUyIsInNldFZhbHVlIiwic3RvcmFnZSIsInNhdmVBcnJheSIsImFyciIsImlka2V5Iiwia2V5IiwiaXRlbSIsInVwZGF0ZVZhbHVlIiwiZ2V0VmFsdWUiLCJzZXRUaW1lciIsInJhZiIsImNhbmNlbFRpbWVyIiwicmVxdWVzdCIsInBhcmFtcyIsInhociIsImxhc3QiLCJmcmFtZVRpY2tlciIsImltbWVkaWF0ZWx5Iiwib2JqIiwiZm4iLCJzb3VyY2UiLCJ0YXJnZXQiLCJNYXRoIiwiczQiLCJPYmplY3QiLCJpc0lFIiwiaXNDaHJvbWUiLCJpc09wZXJhIiwib3ByIiwibmF2aWdhdG9yIiwicCIsInNhZmFyaSIsImRvY3VtZW50Iiwib3V0cHV0IiwiYXJndW1lbnRzIiwiaSIsIkVsZW1lbnQiLCJ2YWx1ZSIsInJlcXVlc3RUaW1lb3V0Iiwic2V0VGltZW91dCIsInN0YXJ0IiwiRGF0ZSIsImhhbmRsZSIsImNsZWFyUmVxdWVzdFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJzZWxlY3RvciIsIl9zZWxlY3RvciIsIm5hbWUiLCJkb21zIiwiaWQiLCJlbGVtZW50IiwiZWxlbWVudElkIiwidGFnIiwic2V0dXBFbGVtZW50TWV0aG9kcyIsImNoaWxkIiwiZXZlbnRUYWciLCJldmVudE5hbWUiLCJldmVudEhhbmRsZXIiLCJ2Iiwib2Zmc2V0WCIsIm9mZnNldFkiLCJ4MiIsIngiLCJ5MiIsInkiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJkYXRhTWFwIiwidGltZXJNYXAiLCJzaG91bGRSZWFjdCIsIm9sZFZhbHVlIiwicmVzZXQiLCJuZXdWYWx1ZSIsImJyb2FkY2FzdCIsInRpbWVyIiwiYWpheCIsInByb21pc2UiLCJtZXRob2QiLCJhc3luYyIsImhlYWRlciIsImRvbmUiLCJwYXJzZURhdGEiLCJyZXNvbHZlIiwiZmFpbCIsInJlamVjdCIsImUiLCJvblByb2dyZXNzIiwiX2RhdGEiLCJjb250ZW50VHlwZSIsIkpTT04iLCJiZWZvcmVTZW5kIiwiZGF0YSIsIldISVRFIiwiQkxBQ0siLCJSRUQiLCJ3aWR0aCIsImhlaWdodCIsInJvb3QiLCJtYWluQ29udGFpbmVyIiwiY29udGFpbmVyIiwiaGVhZGVyTGVmdCIsImRpc3BsYXkiLCJtaW5XaWR0aCIsImxvZ28iLCJmb250U2l6ZSIsInBhZGRpbmciLCJsaW5lSGVpZ2h0IiwibWFyZ2luUmlnaHQiLCJib3hTaGFkb3ciLCJuYW1lQ29udGFpbmVyIiwibWVudSIsIm1lbnVMaXN0IiwibGlua3MiLCJob3ZlckNvbG9ycyIsImN1cnNvciIsInRleHRBbGlnbiIsInRleHRTaGFkb3ciLCJ0cmFuc2l0aW9uIiwiY29sb3IiLCJtYWluQ29udGVudENvbnRhaW5lciIsIm92ZXJmbG93WSIsInBvc2l0aW9uIiwiekluZGV4IiwiZmxleERpcmVjdGlvbiIsImNlbnRlclgiLCJjZW50ZXJZIiwibW91c2VYIiwibW91c2VZIiwidHJhbnNmb3JtIiwiaXNJblZpZXdQb3J0Iiwib3BhY2l0eSIsImxhbmRpbmdDb250YWluZXIiLCJoaWdoTGlnaHQiLCJmb250V2VpZ2h0IiwibWFyZ2luVG9wIiwiaW50cm8iLCJza2lsbENvbnRhaW5lciIsInNraWxsVGl0bGUiLCJza2lsbENhcmRDb250YWluZXIiLCJqdXN0aWZ5Q29udGVudCIsImZsZXhXcmFwIiwic2tpbGxzIiwic2tpbGxOYW1lcyIsInNraWxsQ29sb3JzIiwiY2FyZCIsImZsZXhHcm93IiwiY2FyZWVyQ29udGFpbmVyIiwiY2FyZWVyVGl0bGUiLCJtYXJnaW5Cb3R0b20iLCJjb21wYW5pZXMiLCJ0aXRsZXMiLCJ0aW1lTGluZXMiLCJwcm9qZWN0cyIsImNvbXBhbnkiLCJ0aXRsZSIsInRpbWVMaW5lIiwiZm9vdGVyIiwiZm9vdFNoYWRvdyIsImJvdHRvbSIsImxlZnQiLCJjb2RlQmFja2dyb3VuZFRleHQiLCJpbmRleCIsImNvbHVtbldpZHRoIiwiY29sdW1uQ291bnQiLCJjb2RlQmFja2dyb3VuZCIsInRvcCIsImNvdW50ZXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7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YUEsY0FBYztBQUZ0QixTQUFUO0FBbENSLEtBQXFCLENBQXJCOztBQXlDQWhFO0FBQ0FDO0FBQ0FBO0FBQ0g7QUFDRDhELFEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbS9kb20nO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZSc7XHJcbmltcG9ydCByYWYgZnJvbSAnLi9jb21tb24vcmFmJztcclxuaW1wb3J0IGNvbW1vbiBmcm9tICcuL2NvbW1vbi9jb21tb24nO1xyXG5pbXBvcnQgeGhyIGZyb20gJy4veGhyL3hocic7XHJcblxyXG5jb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxuXHJcbnZhciBjYztcclxud2luZG93LmNjID0gY2MgPSB7XHJcbiAgICB0b29sczogY29tbW9uLFxyXG4gICAgbG9hZDogZnVuY3Rpb24oYWRkT25zID0gW10sIG9wdGlvbnMgPSB7fSl7XHJcblxyXG4gICAgfSxcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIHJldHVybiBkb20uc2VsZWN0KHNlbGVjdG9yKVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBkb20uY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBpZCwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50TlM6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5OUyA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGRvbS5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIGlkLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5yZXNldCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBzYXZlQXJyYXk6IGZ1bmN0aW9uKGtleSwgYXJyID0gW10sIGlka2V5KXtcclxuICAgICAgICBpZihpZGtleSAhPT0gdW5kZWZpbmVkICYmIGlka2V5ICE9PSAnJyAmJiBrZXkgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBjYy51cGRhdGVWYWx1ZShpdGVtW2lka2V5XSwgaXRlbSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5zZXRWYWx1ZShrZXksIGFycik7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlVmFsdWU6IGZ1bmN0aW9uKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gc3RvcmFnZS5nZXRWYWx1ZShrZXkpO1xyXG4gICAgfSxcclxuICAgIHNldFRpbWVyOiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgcmV0dXJuIHJhZi5yZXF1ZXN0VGltZW91dChmbiwgZGVsYXkpXHJcbiAgICB9LFxyXG4gICAgY2FuY2VsVGltZXI6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICByYWYuY2xlYXJSZXF1ZXN0VGltZW91dChoYW5kbGUpO1xyXG4gICAgfSxcclxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xyXG4gICAgICAgIHJldHVybiB4aHIuYWpheChwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmlmKElTX1dPUktFUil7XHJcbiAgICBkZWxldGUgY2Muc2VsZWN0O1xyXG4gICAgZGVsZXRlIGNjLmNyZWF0ZUVsZW1lbnQ7XHJcbiAgICBkZWxldGUgY2MuY3JlYXRlRWxlbWVudE5TO1xyXG59ZWxzZXtcclxuICAgIGxldCBsYXN0ID0gMFxyXG4gICAgbGV0IGZyYW1lVGlja2VyID0gZnVuY3Rpb24gKHRpbWVzdGFtcCkge1xyXG4gICAgICAgIGNjLnNldFZhbHVlKCdmcmFtZScsIHRpbWVzdGFtcCwge2ltbWVkaWF0ZWx5OiB0cnVlfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aW1lc3RhbXAgLSBsYXN0KTtcclxuICAgICAgICBsYXN0ID0gdGltZXN0YW1wO1xyXG4gICAgICAgIHJhZi5yZXF1ZXN0VGltZW91dChmcmFtZVRpY2tlciwgMTYpXHJcbiAgICB9O1xyXG4gICAgZnJhbWVUaWNrZXIoMCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYzsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxuY29uc3QgY29tbW9uID0ge307XHJcblxyXG5jb21tb24ub2JqZWN0Zm9yRWFjaCA9IGZ1bmN0aW9uKG9iaixmbil7XHJcbiAgICBmb3IodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgZm4ob2JqW2tleV0sIGtleSwgb2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb21tb24ub2JqZWN0QXNzaWduID0gZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2Upe1xyXG4gICAgZm9yKGxldCBrZXkgaW4gc291cmNlKSB7XHJcbiAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59O1xyXG5cclxuY29tbW9uLmNyZWF0ZUlkID0gZnVuY3Rpb24oKXtcclxuICAgIGZ1bmN0aW9uIHM0KCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxyXG4gICAgICAgICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcbn07XHJcblxyXG5jb21tb24uaXNPYmplY3QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIChpdGVtIT09dW5kZWZpbmVkICYmIGl0ZW0gPT09IE9iamVjdChpdGVtKSAmJiAhKGl0ZW0gaW5zdGFuY2VvZiBBcnJheSkpXHJcbn07XHJcblxyXG5jb21tb24uZ2V0QnJvd3NlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGlzSUUgPSBmYWxzZTtcclxuICAgIGxldCBpc0Nocm9tZSA9IGZhbHNlO1xyXG4gICAgbGV0IGlzT3BlcmEgPSBmYWxzZTtcclxuICAgIGlmICgoISFDT05URVhULm9wciAmJiAhIW9wci5hZGRvbnMpIHx8ICEhQ09OVEVYVC5vcGVyYSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBPUFIvJykgPj0gMCkge1xyXG4gICAgICAgIGlzT3BlcmEgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiAnb3BlcmEnO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBJbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xyXG4gICAgfVxyXG4gICAgaWYgKC9jb25zdHJ1Y3Rvci9pLnRlc3QoQ09OVEVYVC5IVE1MRWxlbWVudCkgfHwgKGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgcmV0dXJuIHAudG9TdHJpbmcoKSA9PT0gXCJbb2JqZWN0IFNhZmFyaVJlbW90ZU5vdGlmaWNhdGlvbl1cIjtcclxuICAgIH0pKCFDT05URVhUWydzYWZhcmknXSB8fCBzYWZhcmkucHVzaE5vdGlmaWNhdGlvbikpIHtcclxuICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XHJcbiAgICB9XHJcbiAgICBpZiAoZmFsc2UgfHwgISFkb2N1bWVudC5kb2N1bWVudE1vZGUpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50c1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoISgncmVtb3ZlJyBpbiBFbGVtZW50LnByb3RvdHlwZSkpIHtcclxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXNJRSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuICdpZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoIWlzSUUgJiYgISFDT05URVhULlN0eWxlTWVkaWEpIHtcclxuICAgICAgICByZXR1cm4gJ2VkZ2UnO1xyXG4gICAgfVxyXG4gICAgaWYgKCEhQ09OVEVYVC5jaHJvbWUgJiYgISFDT05URVhULmNocm9tZS53ZWJzdG9yZSkge1xyXG4gICAgICAgIGlzQ2hyb21lID0gdHJ1ZVxyXG4gICAgICAgIHJldHVybiAnY2hyb21lJztcclxuICAgIH1cclxuICAgIGlmICgoaXNDaHJvbWUgfHwgaXNPcGVyYSkgJiYgISFDT05URVhULkNTUykge1xyXG4gICAgICAgIHJldHVybiAnYmxpbmsnO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29tbW9uLnJlYWRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgaWYodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpe1xyXG4gICAgICAgIHJldHVybiB2YWx1ZShvcHRpb25zKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1vbjsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxudmFyIHJhZiA9IHtcclxuICAgIHJlcXVlc3RUaW1lb3V0OiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgaWYgKCFDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZSlcclxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZm4sIGRlbGF5KTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgaGFuZGxlID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb29wKHRpbWVzdGFtcCkge1xyXG4gICAgICAgICAgICAoRGF0ZS5ub3coKSAtIHN0YXJ0KSA+PSBkZWxheSA/IGZuKHRpbWVzdGFtcCkgOiBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICByZXR1cm4gaGFuZGxlO1xyXG4gICAgfSxcclxuICAgIGNsZWFyUmVxdWVzdFRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICBDT05URVhULmNhbmNlbEFuaW1hdGlvbkZyYW1lID8gQ09OVEVYVC5jYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpOmNsZWFyVGltZW91dChoYW5kbGUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmFmOyIsImltcG9ydCBjb21tb24gZnJvbSAnLi4vY29tbW9uL2NvbW1vbidcclxudmFyIGRvbSA9IHtcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIGlmKHNlbGVjdG9yPT09dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IF9zZWxlY3RvciA9IHNlbGVjdG9yLmNoYXJBdCgwKTtcclxuICAgICAgICBsZXQgbmFtZSA9IHNlbGVjdG9yLnN1YnN0cmluZygxKTtcclxuICAgICAgICBsZXQgZG9tcyA9IFtdO1xyXG4gICAgICAgIHN3aXRjaCAoX3NlbGVjdG9yKXtcclxuICAgICAgICAgICAgY2FzZSAnIyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZSk7XHJcbiAgICAgICAgICAgIGNhc2UgJy4nOlxyXG4gICAgICAgICAgICAgICAgZG9tcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobmFtZSkgfHwgW107XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGRvbXMgPSAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoc2VsZWN0b3IpIHx8IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRvbXM7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHRhZywgaWQgPSAnJywgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgICAgIGxldCBlbGVtZW50SWQgPSBpZCB8fCAodGFnICsgJ18nICsgY29tbW9uLmNyZWF0ZUlkKCkpO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIGVsZW1lbnRJZCk7XHJcblxyXG4gICAgICAgIHNldHVwRWxlbWVudE1ldGhvZHMoZWxlbWVudCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldHVwRWxlbWVudE1ldGhvZHMoZWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMgPSBuZXcgTWFwKCk7XHJcbiAgICBlbGVtZW50Ll9ib3VuZCA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBlbGVtZW50LmFkZCA9IGZ1bmN0aW9uICh0YWcsIGlkLCBvcHRpb25zKSB7XHJcbiAgICAgICAgbGV0IGNoaWxkID0gZG9tLmNyZWF0ZUVsZW1lbnQodGFnLCBpZCwgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRWxlbWVudChjaGlsZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYWRkRWxlbWVudCA9IGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgIHJldHVybiBjaGlsZFxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmFkZENsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LnJlbW92ZUNsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmdldEF0dHIgPSBmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShrZXkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmF0dHIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnQoJ2F0dHInLCBrZXksIHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5nZXREYXRhID0gZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmRhdGEgPSBmdW5jdGlvbihhbnkpe1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBhbnk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuZ2V0UHJvcCA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRba2V5XTtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5wcm9wID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zZXRFbGVtZW50KCdwcm9wJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuY3NzID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudCgnY3NzJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYmluZCA9IGZ1bmN0aW9uKGtleSwgZm4pe1xyXG4gICAgICAgIGlmKGtleSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvdW5kLnNldChrZXksIGZuKTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdzdG9yYWdlXycgKyBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBlbGVtZW50LnVuYmluZCA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnc3RvcmFnZV8nICsga2V5KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5fcmVhY3QgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcclxuICAgICAgICBsZXQgZm4gPSB0aGlzLl9ib3VuZC5nZXQoa2V5KTtcclxuICAgICAgICBpZihmbil7XHJcbiAgICAgICAgICAgIGlmKGZuLmNhbGwodGhpcywgdmFsdWUsIHRoaXMuX2RhdGEpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZChrZXkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQub24gID0gZnVuY3Rpb24oZXZlbnROYW1lLCBmbiwgdGFnID0gJycpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZXZlbnRUYWcgPSBldmVudE5hbWUgKyB0YWc7XHJcbiAgICAgICAgbGV0IGV2ZW50SGFuZGxlciA9IGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzLmdldChldmVudFRhZyk7XHJcbiAgICAgICAgaWYoZXZlbnRIYW5kbGVyKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuZGVsZXRlKGV2ZW50VGFnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZm4pIHtcclxuICAgICAgICAgICAgZXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmKGZuLmNhbGwoc2VsZiwgZSwgc2VsZi5fZGF0YSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBlbGVtZW50Ll9ldmVudExpc3RlbmVycy5zZXQoZXZlbnRUYWcsIGV2ZW50SGFuZGxlcik7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50SGFuZGxlciwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5jb250ZW50ID0gZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gc3RyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LnJlbW92ZVNlbGYgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBpZih0aGlzLnJlbW92ZSl7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKClcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5yZW1vdmVBbGxDaGlsZHJlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuZmlyc3RDaGlsZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50Ll9zZXRFbGVtZW50ID0gZnVuY3Rpb24odHlwZSwga2V5ICwgdmFsdWUpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBjb21tb24ub2JqZWN0Zm9yRWFjaChrZXkgLGZ1bmN0aW9uIChpdGVtLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGZbdHlwZV0oa2V5LCBpdGVtKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdiA9IGNvbW1vbi5yZWFkVmFsdWUodmFsdWUpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncHJvcCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYXR0cic6XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoa2V5KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Nzcyc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlW2tleV0gPSAgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5pc0luVmlld3BvcnQgPSBmdW5jdGlvbiAob3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IG9mZnNldFggPSBvcHRpb25zLm9mZnNldFggfHwgMDtcclxuICAgICAgICBsZXQgb2Zmc2V0WSA9IG9wdGlvbnMub2Zmc2V0WSB8fCAwO1xyXG4gICAgICAgIGxldCB7eCwgeSwgd2lkdGgsIGhlaWdodH0gPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOyAvL0lFIG5vdCBzdXBwb3J0IGJvdHRvbSByaWdodFxyXG4gICAgICAgIGxldCB4MiA9IHggKyB3aWR0aDtcclxuICAgICAgICBsZXQgeTIgPSB5ICsgaGVpZ2h0O1xyXG4gICAgICAgIGxldCBpbm5lcldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgbGV0IGlubmVySGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgIHJldHVybiAhKHgyIDw9ICgwICsgb2Zmc2V0WCl8fCB4ID49IChpbm5lcldpZHRoIC0gb2Zmc2V0WCkgfHwgeTIgPD0gKDAgKyBvZmZzZXRZKSB8fCB5ID49IChpbm5lckhlaWdodCAtIG9mZnNldFkpKVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZG9tOyIsImltcG9ydCBjb21tb24gZnJvbSAnLi4vY29tbW9uL2NvbW1vbic7XHJcblxyXG52YXIgc3RvcmFnZSA9IHtcclxuICAgIGRhdGFNYXA6IG5ldyBNYXAoKSxcclxuICAgIHRpbWVyTWFwOiAgbmV3IE1hcCgpLFxyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGRhdGFNYXAgPSB0aGlzLmRhdGFNYXA7XHJcbiAgICAgICAgbGV0IHtyZXNldH0gPSBvcHRpb25zO1xyXG4gICAgICAgIGxldCBzaG91bGRSZWFjdCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBvbGRWYWx1ZSA9IGRhdGFNYXAuZ2V0KGtleSk7XHJcbiAgICAgICAgaWYoY29tbW9uLmlzT2JqZWN0KHZhbHVlKSAmJiBjb21tb24uaXNPYmplY3Qob2xkVmFsdWUpICYmIHJlc2V0ICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi5vYmplY3Rmb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiAoaXRlbSwga2V5LCBvYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtICE9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3VsZFJlYWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9ialtrZXldID0gdmFsdWVba2V5XVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHNob3VsZFJlYWN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgZGF0YU1hcC5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmV3VmFsdWUgPSBkYXRhTWFwLmdldChrZXkpO1xyXG5cclxuICAgICAgICBpZihzaG91bGRSZWFjdCkge1xyXG4gICAgICAgICAgIHRoaXMuYnJvYWRjYXN0KGtleSwgbmV3VmFsdWUsIG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgfSxcclxuICAgIGJyb2FkY2FzdDogZnVuY3Rpb24oa2V5LCBuZXdWYWx1ZSwgb3B0aW9ucyA9IHt9KXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IHRpbWVyID0gdGhpcy50aW1lck1hcC5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgaWYgKHRpbWVyKSB7XHJcbiAgICAgICAgICAgIGNjLmNhbmNlbFRpbWVyKHRpbWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRpbWVyID0gY2Muc2V0VGltZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgZG9tcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3N0b3JhZ2VfJyArIGtleSkgfHwgW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZG9tcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRvbSA9IGRvbXNbaV07XHJcbiAgICAgICAgICAgICAgICBkb20uX3JlYWN0ICYmIGRvbS5fcmVhY3Qoa2V5LCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VsZi50aW1lck1hcC5kZWxldGUoa2V5KTtcclxuICAgICAgICB9LCBvcHRpb25zLmltbWVkaWF0ZWx5PyAwOiAxMCk7XHJcblxyXG4gICAgICAgIHRoaXMudGltZXJNYXAuc2V0KGtleSwgdGltZXIpO1xyXG4gICAgfSxcclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YU1hcC5nZXQoa2V5KTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN0b3JhZ2U7IiwiY29uc3QgeGhyID0ge1xyXG4gICAgYWpheDogZnVuY3Rpb24gKHBhcmFtcyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIGxldCB7dXJsLCBtZXRob2QsIGRhdGEsIGFzeW5jLCB4aHIsIGNvbnRlbnRUeXBlLCBkYXRhVHlwZSwgZG9uZSwgZmFpbH0gPSBwYXJhbXMgfHwge307XHJcbiAgICAgICAgICAgIGxldCB7aGVhZGVyLCBvblByb2dyZXNzLCBiZWZvcmVTZW5kfSA9IHBhcmFtcztcclxuICAgICAgICAgICAgbGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgcmVxdWVzdC5vcGVuKChtZXRob2QgfHwgJ0dFVCcpLCB1cmwsIGFzeW5jID09PSB1bmRlZmluZWQgPyB0cnVlIDogYXN5bmMpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIChoZWFkZXIgfHwge30pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKGhlYWRlciB8fCB7fSkuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcltrZXldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjYy5nZXRWYWx1ZSgnQXV0aG9yaXphdGlvbicpKXtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIGNjLmdldFZhbHVlKCdBdXRob3JpemF0aW9uJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID49IDIwMCAmJiByZXF1ZXN0LnN0YXR1cyA8IDQwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbmUgJiYgZG9uZShwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCksIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmYWlsICYmIGZhaWwocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZmFpbCAmJiBmYWlsKHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCksIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdC51cGxvYWQub25wcm9ncmVzcyA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcCA9IE1hdGguZmxvb3IoZS5sb2FkZWQgLyBlLnRvdGFsICogMTAwKTtcclxuICAgICAgICAgICAgICAgIG9uUHJvZ3Jlc3MgJiYgb25Qcm9ncmVzcyhwLCBlKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGxldCBfZGF0YTtcclxuICAgICAgICAgICAgc3dpdGNoIChkYXRhVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZmlsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnanNvbic6XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgY29udGVudFR5cGUgPT09IHVuZGVmaW5lZCA/IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiIDogY29udGVudFR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIF9kYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJlZm9yZVNlbmQgJiYgYmVmb3JlU2VuZChyZXF1ZXN0KTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3Quc2VuZChfZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIHBhcnNlRGF0YShkYXRhKSB7XHJcbiAgICB0cnl7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSB8fCAnJylcclxuICAgIH1jYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeGhyO1xyXG4iLCJpbXBvcnQgY2MgZnJvbSAnLi9jY2pzL2NjJztcclxuXHJcbmNvbnN0IFdISVRFID0gJ3JnYmEoMjU1LDI1NSwyNTUsIDAuNyknO1xyXG5jb25zdCBCTEFDSyA9ICdyZ2JhKDAsMCwwLCAwLjkpJztcclxuY29uc3QgUkVEID0gJyNkNjMwMzEnO1xyXG5cclxuY2Muc2V0VmFsdWUoJ3ZpZXdwb3J0Jywge3dpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHR9KTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnVwZGF0ZVZhbHVlKCd2aWV3cG9ydCcsIHt3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0fSk7XHJcbn0pO1xyXG5mdW5jdGlvbiBpbmRleCgpIHtcclxuICAgIGxldCByb290ID0gY2Muc2VsZWN0KCcjYm9keScpO1xyXG4gICAgbGV0IG1haW5Db250YWluZXIgPSBjYy5jcmVhdGVFbGVtZW50KCdkaXYnLCAndGVzdCcpXHJcbiAgICAgICAgLmFkZENsYXNzKCdtYWluLWNvbnRhaW5lcicpO1xyXG5cclxuICAgIHJvb3QuYXBwZW5kQ2hpbGQobWFpbkNvbnRhaW5lcik7XHJcbiAgICBsZXQgY29udGFpbmVyID0gbWFpbkNvbnRhaW5lci5hZGQoJ2RpdicpXHJcblxyXG4gICAgbGV0IGhlYWRlciA9IGNvbnRhaW5lci5hZGQoJ2RpdicsICdoZWFkZXInKVxyXG4gICAgICAgIC5hZGRDbGFzcygnaGVhZGVyJyk7XHJcbiAgICBsZXQgaGVhZGVyTGVmdCA9IGhlYWRlci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICBtaW5XaWR0aDogJzI1NnB4J1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGxvZ28gPSBoZWFkZXJMZWZ0LmFkZCgnZGl2JylcclxuICAgICAgICAuY29udGVudCgnQScpXHJcbiAgICAgICAgLmFkZENsYXNzKCdiYWNrZ3JvdW5kLXJlZCcpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmb250LWJsYWNrJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICc2NHB4JyxcclxuICAgICAgICAgICAgcGFkZGluZzogJzAgMTZweCcsXHJcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICc1NHB4JyxcclxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICc0cHgnLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgYm94U2hhZG93OiBSRUQgKyAnIDAgMCAxMHB4JyxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgbmFtZUNvbnRhaW5lciA9IGhlYWRlckxlZnQuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgbmFtZUNvbnRhaW5lci5hZGQoJ3NwYW4nKVxyXG4gICAgICAgIC5jb250ZW50KCdOWElOIFlBTkcnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxyXG4gICAgICAgIH0pO1xyXG4gICAgbmFtZUNvbnRhaW5lci5hZGQoJ3NwYW4nKVxyXG4gICAgICAgIC5jb250ZW50KCdGcm9udC1FbmQgRGV2ZWxvcGVyJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IG1lbnUgPSBoZWFkZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgbWVudUxpc3QgPSBbJ2ZhLWxpbmtlZGluJywgJ2ZhLWdpdGh1YiddO1xyXG4gICAgbGV0IGxpbmtzID0gWydodHRwczovL3d3dy5saW5rZWRpbi5jb20vaW4vYW54aW4teWFuZy03MDcwMjkxMjUvJywgJ2h0dHBzOi8vZ2l0aHViLmNvbS9BbnhpbllhbmcnXTtcclxuICAgIGxldCBob3ZlckNvbG9ycyA9IFsnIzAwNzdCNScsICdyZ2JhKDI1NSwwLDgwLCAwLjgpJ107XHJcbiAgICBtZW51TGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh0YWcsIGlkeCkge1xyXG4gICAgICAgIG1lbnUuYWRkKCdpJylcclxuICAgICAgICAgICAgLmFkZENsYXNzKCdmYWInKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MobWVudUxpc3RbaWR4XSlcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICc1NHB4JyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgICAgICAgICAgdGV4dFNoYWRvdzogJyAwIDAgNXB4JyxcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICcwLjNzJyxcclxuICAgICAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnMTZweCdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKGxpbmtzW2lkeF0sICdfYmxhbmsnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IGhvdmVyQ29sb3JzW2lkeF0sXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LCAnc3R5bGUnKVxyXG4gICAgICAgICAgICAub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcnLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSwgJ3N0eWxlJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgbWFpbkNvbnRlbnRDb250YWluZXIgPSBjYy5jcmVhdGVFbGVtZW50KCdkaXYnLCAnbWFpbl9jb250ZW50JylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgaGVpZ2h0OiAnY2FsYygxMDB2aCAtIDEwNHB4KScsXHJcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwIDEyLjUlJyxcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcclxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXHJcbiAgICAgICAgICAgIHpJbmRleDogNSxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm9uKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBsZXQgY2VudGVyWCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMjtcclxuICAgICAgICAgICAgbGV0IGNlbnRlclkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICBsZXQgbW91c2VYID0gZS5jbGllbnRYO1xyXG4gICAgICAgICAgICBsZXQgbW91c2VZID0gZS5jbGllbnRZO1xyXG4gICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoJyArICgtKG1vdXNlWCAtIGNlbnRlclgpIC8gMTAwKSArICdweCwnICsgKC0obW91c2VZIC0gY2VudGVyWSkgLyAxMDApICsgJ3B4KSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuYmluZCgnZnJhbWUnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBkb21zID0gY2Muc2VsZWN0KCcuZmFkZScpO1xyXG4gICAgICAgICAgICBpZihkb21zLmxlbmd0aD09PTApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51bmJpbmQoJ2ZyYW1lJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkb20gPSBkb21zW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IGlzSW5WaWV3UG9ydCA9IGRvbS5pc0luVmlld3BvcnQoe29mZnNldFk6IDE1MH0pO1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wYWNpdHkgPSArZG9tLnN0eWxlLm9wYWNpdHk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNJblZpZXdQb3J0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLmFkZENsYXNzKCdzbGlkZS1pbi1ib3R0b20nKTtcclxuICAgICAgICAgICAgICAgICAgICBkb20ucmVtb3ZlQ2xhc3MoJ2ZhZGUtb3V0Jyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLnJlbW92ZUNsYXNzKCdzbGlkZS1pbi1ib3R0b20nKTtcclxuICAgICAgICAgICAgICAgICAgICBkb20uYWRkQ2xhc3MoJ2ZhZGUtb3V0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIGxldCBsYW5kaW5nQ29udGFpbmVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBoZWlnaHQ6ICdjYWxjKDEwMHZoIC0gMTA0cHgpJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGhpZ2hMaWdodCA9IGxhbmRpbmdDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jb250ZW50KFwiTGV0J3MgbWFrZSBkYXRhIGFsaXZlXCIpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmYWRlJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnNDhweCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJ2NhbGMoNTB2aCAtIDE1MnB4KSdcclxuICAgICAgICB9KTtcclxuICAgIGxldCBpbnRybyA9IGxhbmRpbmdDb250YWluZXIuYWRkKCdwJylcclxuICAgICAgICAuYWRkQ2xhc3MoJ2ZhZGUnKVxyXG4gICAgICAgIC5jb250ZW50KFwiSSdtIGEgZnJvbnQtZW5kIGRldmVsb3BlciBmcm9tIEJheSBBcmVhLCBDYWxpZm9ybmlhLCBhbmQgY3VycmVudGx5IGxpdmluZyBpbiBTYW4gSm9zZS4gSSBlbmpveSBidWlsZGluZyByaWNoIFwiICtcclxuICAgICAgICAgICAgXCJpbnRlcmFjdGl2ZSB3ZWJzaXRlcyBhbmQgd2ViIGFwcHMgZnJvbSBzbWFsbCB0byBsYXJnZS4gXCIpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMjBweCcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IHNraWxsQ29udGFpbmVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdkaXYnKTtcclxuICAgIGxldCBza2lsbFRpdGxlID0gc2tpbGxDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jb250ZW50KFwiU2tpbGxzXCIpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogJzQ4cHgnLFxyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBtYXJnaW5Ub3A6ICcyNTZweCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgc2tpbGxDYXJkQ29udGFpbmVyID0gc2tpbGxDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzEyOHB4JyxcclxuICAgICAgICAgICAgZmxleFdyYXA6ICd3cmFwJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBza2lsbHMgPSBbJ2ZhLWh0bWw1JywgJ2ZhLWpzJywgJ2ZhLWNzczMtYWx0JywgJ2ZhLXJlYWN0JywgJ2ZhLW5vZGUtanMnLCdmYS1zYXNzJ107XHJcbiAgICBsZXQgc2tpbGxOYW1lcyA9IFsnSFRNTDUnLCAnSmF2YXNjcmlwdCcsICdDU1MzJywgJ1JlYWN0JywgJ05vZGVKUycsICdTQVNTJ107XHJcbiAgICBsZXQgc2tpbGxDb2xvcnMgPSBbJyNlNDRkMjYnLCAnI2VlYWY0YicsICcjMDA3MGJhJywgJyM2MWRhZmInLCAnIzdjYjcwMCcsJyNjNjknXTtcclxuICAgIHNraWxscy5mb3JFYWNoKGZ1bmN0aW9uIChpY29uLCBpZHgpIHtcclxuICAgICAgICBsZXQgY2FyZCA9IHNraWxsQ2FyZENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgbWluV2lkdGg6ICczMDBweCcsXHJcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICAgICAgZmxleEdyb3c6IDEsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBsb2dvID0gY2FyZC5hZGQoJ2knKVxyXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ2ZhYicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcyhpY29uKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMjU2cHgnLFxyXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBza2lsbENvbG9yc1tpZHhdLFxyXG4gICAgICAgICAgICAgICAgdGV4dFNoYWRvdzogc2tpbGxDb2xvcnNbaWR4XSArICcgMCAwIDEwcHgnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBuYW1lID0gY2FyZC5hZGQoJ3AnKVxyXG4gICAgICAgICAgICAuY29udGVudChza2lsbE5hbWVzW2lkeF0pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogc2tpbGxDb2xvcnNbaWR4XSxcclxuICAgICAgICAgICAgICAgIHRleHRTaGFkb3c6IHNraWxsQ29sb3JzW2lkeF0gKyAnIDAgMCAxMHB4J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IGNhcmVlckNvbnRhaW5lciA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgnZGl2Jyk7XHJcbiAgICBsZXQgY2FyZWVyVGl0bGUgPSBza2lsbENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgLmNvbnRlbnQoXCJDYXJlZXJcIilcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnNDhweCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzEyOHB4JyxcclxuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnNjRweCcsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IGNvbXBhbmllcyA9IFsnbmV0RWxhc3RpYyBTeXN0ZW1zLCBJbmMuJywgJ1NhbiBGcmFuY2lzY28gU3RhdGUgVW5pdmVyc2l0eScsICdTaGFuZ2hhaSBVbml2ZXJzaXR5J107XHJcbiAgICBsZXQgdGl0bGVzID0gWydTb2Z0d2FyZSBFbmdpbmVlcicsICdCUyAtIENvbXB1dGVyIEVuZ2luZWVyaW5nIFN0dWRlbnQnLCAnQVMgLSBDb21wdXRlciBBcHBsaWNhdGlvbiBUZWNobm9sb2d5IFN0dWRlbnQnXTtcclxuICAgIGxldCB0aW1lTGluZXMgPSBbJzIwMTcgLSBDdXJyZW50JywgJzIwMTMgLSAyMDE3JywgJzIwMDkgLSAyMDEzJ107XHJcbiAgICBsZXQgcHJvamVjdHMgPSB7XHJcbiAgICAgICAgJ25ldEVsYXN0aWMgU3lzdGVtcywgSW5jLic6IFsndkJORyBNYW5hZ2VtZW50IFN5c3RlbSAoVUkgTGVhZCknLCAnU0QtV0FOIE1hbmFnZW1lbnQgU3lzdGVtIChVSSBUZWFtIE1lbWJlciknLF1cclxuICAgIH07XHJcblxyXG4gICAgY29tcGFuaWVzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBhbnlOYW1lLCBpZHgpIHtcclxuICAgICAgICBsZXQgY2FyZCA9IGNhcmVlckNvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5hZGRDbGFzcygnZmFkZScpXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcclxuICAgICAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzY0cHgnXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBjb21wYW55ID0gY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5jb250ZW50KGNvbXBhbnlOYW1lKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMzJweCcsXHJcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCdcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBmb250U2l6ZSA9ICcyMHB4JztcclxuICAgICAgICBsZXQgdGl0bGUgPSBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgLmNvbnRlbnQodGl0bGVzW2lkeF0pXHJcbiAgICAgICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbGV0IHRpbWVMaW5lID0gY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgICAgIC5jb250ZW50KHRpbWVMaW5lc1tpZHhdKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgKHByb2plY3RzW2NvbXBhbnlOYW1lXSB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAocHJvamVjdCkge1xyXG4gICAgICAgICAgICBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAgICAgICAgIC5jb250ZW50KHByb2plY3QpXHJcbiAgICAgICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogZm9udFNpemUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgZm9vdGVyID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdwJylcclxuICAgICAgICAuY29udGVudCgnUG93ZXJlZCBieSBjY0pTLCBhIHNlbGYtaW1wbGVtZW50ZWQgSmF2YXNjcmlwdCBMaWJyYXJ5LicpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzEyOHB4J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIGxldCBmb290U2hhZG93ID0gY29udGFpbmVyLmFkZCgnZGl2JylcclxuICAgICAgICAuY29udGVudCgnJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgIGJvdHRvbTogJzAnLFxyXG4gICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICB6SW5kZXg6IDEyLFxyXG4gICAgICAgICAgICBib3hTaGFkb3c6ICdyZ2JhKDI1NSwgMCwgODAsIDAuOCkgMHB4IDBweCA1MHB4IDJweCdcclxuICAgICAgICB9KTtcclxuICAgIGxldCBjb2RlQmFja2dyb3VuZFRleHQgPSBpbmRleC50b1N0cmluZygpO1xyXG4gICAgbGV0IGNvbHVtbldpZHRoID0gTWF0aC5taW4oNDAwICwgd2luZG93LmlubmVyV2lkdGggLSAxMjgpO1xyXG4gICAgbGV0IGNvbHVtbkNvdW50ID0gTWF0aC5taW4oMiwgTWF0aC5mbG9vcih3aW5kb3cuaW5uZXJXaWR0aC8oY29sdW1uV2lkdGgpKSk7XHJcbiAgICBsZXQgY29kZUJhY2tncm91bmQgPSBjb250YWluZXIuYWRkKCdwcmUnKVxyXG4gICAgICAgIC5hZGRDbGFzcygnY3J0VGV4dCcpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2xlZnQnLFxyXG4gICAgICAgICAgICB0b3A6ICcxMjhweCcsXHJcbiAgICAgICAgICAgIGxlZnQ6ICc2NHB4JyxcclxuICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAncmdiYSgyNTUsMjU1LDI1NSwgMC4wNiknLFxyXG4gICAgICAgICAgICB6SW5kZXg6IDAsXHJcbiAgICAgICAgICAgIGNvbHVtbkNvdW50OiBjb2x1bW5Db3VudCxcclxuICAgICAgICAgICAgY29sdW1uV2lkdGg6IGNvbHVtbldpZHRoICsgJ3B4JyxcclxuICAgICAgICAgICAgd2lkdGg6ICdjYWxjKDEwMHZ3IC0gMTI4cHgpJyxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5kYXRhKHtcclxuICAgICAgICAgICAgY291bnRlcjogMCxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5iaW5kKCdmcmFtZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IHtjb3VudGVyLCBzdHJ9ID0gdGhpcy5nZXREYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoJyArICgtbWFpbkNvbnRlbnRDb250YWluZXIuc2Nyb2xsVG9wLzYpICsgJ3B4KSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvdW50ZXIrPTQ7XHJcbiAgICAgICAgICAgIGlmKGNvdW50ZXIgPj0gY29kZUJhY2tncm91bmRUZXh0Lmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAvL2NvdW50ZXIgPSBjb2RlQmFja2dyb3VuZFRleHQubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlubmVyVGV4dCA9IGNvZGVCYWNrZ3JvdW5kVGV4dC5zdWJzdHJpbmcoMCwgY291bnRlcikgKyAnXyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5kYXRhKHtjb3VudGVyOiBjb3VudGVyfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5iaW5kKCd2aWV3cG9ydCcsIGZ1bmN0aW9uIChkKSB7XHJcbiAgICAgICAgICAgIGxldCB7aGVpZ2h0LCB3aWR0aH0gPSBkO1xyXG4gICAgICAgICAgICBsZXQgY29sdW1uV2lkdGggPSBNYXRoLm1pbig0MDAgLCB3aWR0aCAtIDEyOCk7XHJcbiAgICAgICAgICAgIGxldCBjb2x1bW5Db3VudCA9IE1hdGgubWluKDIsIE1hdGguZmxvb3Iod2lkdGgvKGNvbHVtbldpZHRoKSkpO1xyXG4gICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5Db3VudDogY29sdW1uQ291bnQsXHJcbiAgICAgICAgICAgICAgICBjb2x1bW5XaWR0aDogY29sdW1uV2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICBtYWluQ29udGFpbmVyLmFkZEVsZW1lbnQoY29udGFpbmVyKTtcclxuICAgIGNvbnRhaW5lci5hZGRFbGVtZW50KGhlYWRlcik7XHJcbiAgICBjb250YWluZXIuYWRkRWxlbWVudChtYWluQ29udGVudENvbnRhaW5lcik7XHJcbn1cclxuaW5kZXgoKTsiXSwic291cmNlUm9vdCI6IiJ9