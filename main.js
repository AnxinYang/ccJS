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
});
var highLight = mainContentContainer.add('div').text("Let's make data alive").css({
    color: WHITE,
    fontWeight: 'bold',
    fontSize: '48px',
    textAlign: 'center'
});
var intro = mainContentContainer.add('p').text("I'm a front-end developer from Bay Area, California, and currently living in San Jose. I enjoy building rich interactive websites and web apps from small to large. ").css({
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
    var card = skillCardContainer.add('div').css({
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
    var card = careerContainer.add('div').css({
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
    textAlign: 'center'
});

mainContainer.addElement(container);
container.addElement(header);
container.addElement(mainContentContainer);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY29tbW9uL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy9jb21tb24vcmFmLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvc3RvcmFnZS9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL3hoci94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIklTX1dPUktFUiIsInNlbGYiLCJDT05URVhUIiwid2luZG93IiwiY2MiLCJsb2FkIiwiYWRkT25zIiwib3B0aW9ucyIsInNlbGVjdCIsImRvbSIsImNyZWF0ZUVsZW1lbnQiLCJjcmVhdGVFbGVtZW50TlMiLCJzZXRWYWx1ZSIsInN0b3JhZ2UiLCJzYXZlQXJyYXkiLCJhcnIiLCJpZGtleSIsImtleSIsIml0ZW0iLCJ1cGRhdGVWYWx1ZSIsImdldFZhbHVlIiwic2V0VGltZXIiLCJyYWYiLCJjYW5jZWxUaW1lciIsInJlcXVlc3QiLCJwYXJhbXMiLCJ4aHIiLCJsYXN0IiwiZnJhbWVUaWNrZXIiLCJpbW1lZGlhdGVseSIsImNvbW1vbiIsIm9iaiIsImZuIiwiTWF0aCIsInM0IiwiT2JqZWN0IiwiaXNJRSIsImlzQ2hyb21lIiwiaXNPcGVyYSIsIm9wciIsIm5hdmlnYXRvciIsInAiLCJzYWZhcmkiLCJkb2N1bWVudCIsIm91dHB1dCIsImFyZ3VtZW50cyIsImkiLCJFbGVtZW50IiwidmFsdWUiLCJyZXF1ZXN0VGltZW91dCIsInNldFRpbWVvdXQiLCJzdGFydCIsIkRhdGUiLCJoYW5kbGUiLCJjbGVhclJlcXVlc3RUaW1lb3V0IiwiY2xlYXJUaW1lb3V0Iiwic2VsZWN0b3IiLCJfc2VsZWN0b3IiLCJuYW1lIiwiZG9tcyIsImlkIiwiZWxlbWVudCIsImVsZW1lbnRJZCIsInRhZyIsInNldHVwRWxlbWVudE1ldGhvZHMiLCJjaGlsZCIsImV2ZW50VGFnIiwiZXZlbnROYW1lIiwiZXZlbnRIYW5kbGVyIiwidiIsImRhdGFNYXAiLCJ0aW1lck1hcCIsInNob3VsZFJlYWN0Iiwib2xkVmFsdWUiLCJyZXNldCIsIm5ld1ZhbHVlIiwiYnJvYWRjYXN0IiwidGltZXIiLCJhamF4IiwibWV0aG9kIiwiYXN5bmMiLCJoZWFkZXIiLCJkb25lIiwiZmFpbCIsImUiLCJvblByb2dyZXNzIiwiX2RhdGEiLCJjb250ZW50VHlwZSIsIkpTT04iLCJiZWZvcmVTZW5kIiwiV0hJVEUiLCJCTEFDSyIsIlJFRCIsInJvb3QiLCJtYWluQ29udGFpbmVyIiwiYmFja2dyb3VuZCIsImhlaWdodCIsIndpZHRoIiwiYm94U2hhZG93IiwiYW5pbWF0aW9uQ291bnRlciIsImNvdW50ZXIiLCJvcGFjaXR5IiwiY29udGFpbmVyIiwiY2VudGVyWCIsImNlbnRlclkiLCJtb3VzZVgiLCJtb3VzZVkiLCJ0cmFuc2Zvcm0iLCJkaXNwbGF5IiwicGFkZGluZyIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwiY29sb3IiLCJmb250V2VpZ2h0IiwianVzdGlmeUNvbnRlbnQiLCJoZWFkZXJMZWZ0IiwibWluV2lkdGgiLCJsb2dvIiwiZm9udFNpemUiLCJsaW5lSGVpZ2h0IiwibWFyZ2luUmlnaHQiLCJuYW1lQ29udGFpbmVyIiwibWVudSIsIm1lbnVMaXN0IiwibGlua3MiLCJob3ZlckNvbG9ycyIsImN1cnNvciIsInRleHRBbGlnbiIsInRleHRTaGFkb3ciLCJ0cmFuc2l0aW9uIiwibWFpbkNvbnRlbnRDb250YWluZXIiLCJvdmVyZmxvd1kiLCJoaWdoTGlnaHQiLCJpbnRybyIsInNraWxsQ29udGFpbmVyIiwic2tpbGxUaXRsZSIsIm1hcmdpblRvcCIsInNraWxsQ2FyZENvbnRhaW5lciIsImZsZXhXcmFwIiwic2tpbGxzIiwic2tpbGxOYW1lcyIsInNraWxsQ29sb3JzIiwiY2FyZCIsImZsZXhHcm93IiwiY2FyZWVyQ29udGFpbmVyIiwiY2FyZWVyVGl0bGUiLCJtYXJnaW5Cb3R0b20iLCJjb21wYW5pZXMiLCJ0aXRsZXMiLCJ0aW1lTGluZXMiLCJwcm9qZWN0cyIsImNvbXBhbnkiLCJ0aXRsZSIsInRpbWVMaW5lIiwiZm9vdGVyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLFlBQVlDLGdCQUFsQjtBQUNBLElBQU1DLFVBQVVGLG1CQUFoQjs7QUFFQTtBQUNBRyxZQUFZQyxLQUFLO0FBQ2JDLFVBQU0sZ0JBQW1DO0FBQUEsWUFBMUJDLFNBQTBCLG9FQUFqQixFQUFpQjtBQUFBLFlBQWJDLFVBQWEsb0VBQUgsRUFBRztBQUQ1QjtBQUliQyxZQUFRLDBCQUFrQjtBQUN0QixlQUFPQyxxQkFBUCxRQUFPQSxDQUFQO0FBTFM7QUFP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bi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbS9kb20nO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZSc7XHJcbmltcG9ydCByYWYgZnJvbSAnLi9jb21tb24vcmFmJztcclxuaW1wb3J0IHhociBmcm9tICcuL3hoci94aHInO1xyXG5cclxuY29uc3QgSVNfV09SS0VSID0gc2VsZi53aW5kb3cgPT09IHVuZGVmaW5lZDtcclxuY29uc3QgQ09OVEVYVCA9IElTX1dPUktFUiA/IHNlbGYgOiB3aW5kb3c7XHJcblxyXG52YXIgY2M7XHJcbndpbmRvdy5jYyA9IGNjID0ge1xyXG4gICAgbG9hZDogZnVuY3Rpb24oYWRkT25zID0gW10sIG9wdGlvbnMgPSB7fSl7XHJcblxyXG4gICAgfSxcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIHJldHVybiBkb20uc2VsZWN0KHNlbGVjdG9yKVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBkb20uY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBpZCwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50TlM6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5OUyA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGRvbS5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIGlkLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5yZXNldCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBzYXZlQXJyYXk6IGZ1bmN0aW9uKGtleSwgYXJyID0gW10sIGlka2V5KXtcclxuICAgICAgICBpZihpZGtleSAhPT0gdW5kZWZpbmVkICYmIGlka2V5ICE9PSAnJyAmJiBrZXkgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBjYy51cGRhdGVWYWx1ZShpdGVtW2lka2V5XSwgaXRlbSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5zZXRWYWx1ZShrZXksIGFycik7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlVmFsdWU6IGZ1bmN0aW9uKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gc3RvcmFnZS5nZXRWYWx1ZShrZXkpO1xyXG4gICAgfSxcclxuICAgIHNldFRpbWVyOiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgcmV0dXJuIHJhZi5yZXF1ZXN0VGltZW91dChmbiwgZGVsYXkpXHJcbiAgICB9LFxyXG4gICAgY2FuY2VsVGltZXI6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICByYWYuY2xlYXJSZXF1ZXN0VGltZW91dChoYW5kbGUpO1xyXG4gICAgfSxcclxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xyXG4gICAgICAgIHJldHVybiB4aHIuYWpheChwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmlmKElTX1dPUktFUil7XHJcbiAgICBkZWxldGUgY2Muc2VsZWN0O1xyXG4gICAgZGVsZXRlIGNjLmNyZWF0ZUVsZW1lbnQ7XHJcbiAgICBkZWxldGUgY2MuY3JlYXRlRWxlbWVudE5TO1xyXG59ZWxzZXtcclxuICAgIGxldCBsYXN0ID0gMFxyXG4gICAgbGV0IGZyYW1lVGlja2VyID0gZnVuY3Rpb24gKHRpbWVzdGFtcCkge1xyXG4gICAgICAgIGNjLnNldFZhbHVlKCdmcmFtZScsIHRpbWVzdGFtcCwge2ltbWVkaWF0ZWx5OiB0cnVlfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aW1lc3RhbXAgLSBsYXN0KTtcclxuICAgICAgICBsYXN0ID0gdGltZXN0YW1wO1xyXG4gICAgICAgIHJhZi5yZXF1ZXN0VGltZW91dChmcmFtZVRpY2tlciwgMTYpXHJcbiAgICB9O1xyXG4gICAgZnJhbWVUaWNrZXIoMCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYzsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxuY29uc3QgY29tbW9uID0ge307XHJcblxyXG5jb21tb24ub2JqZWN0Zm9yRWFjaCA9IGZ1bmN0aW9uKG9iaixmbil7XHJcbiAgICBmb3IodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgZm4ob2JqW2tleV0sIGtleSwgb2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb21tb24uY3JlYXRlSWQgPSBmdW5jdGlvbigpe1xyXG4gICAgZnVuY3Rpb24gczQoKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXHJcbiAgICAgICAgICAgIC50b1N0cmluZygxNilcclxuICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcclxufTtcclxuXHJcbmNvbW1vbi5pc09iamVjdCA9IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICByZXR1cm4gKGl0ZW0hPT11bmRlZmluZWQgJiYgaXRlbSA9PT0gT2JqZWN0KGl0ZW0pICYmICEoaXRlbSBpbnN0YW5jZW9mIEFycmF5KSlcclxufTtcclxuXHJcbmNvbW1vbi5nZXRCcm93c2VyID0gZnVuY3Rpb24oKSB7XHJcbiAgICBsZXQgaXNJRSA9IGZhbHNlO1xyXG4gICAgbGV0IGlzQ2hyb21lID0gZmFsc2U7XHJcbiAgICBsZXQgaXNPcGVyYSA9IGZhbHNlO1xyXG4gICAgaWYgKCghIUNPTlRFWFQub3ByICYmICEhb3ByLmFkZG9ucykgfHwgISFDT05URVhULm9wZXJhIHx8IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignIE9QUi8nKSA+PSAwKSB7XHJcbiAgICAgICAgaXNPcGVyYSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuICdvcGVyYSc7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIEluc3RhbGxUcmlnZ2VyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiAnZmlyZWZveCc7XHJcbiAgICB9XHJcbiAgICBpZiAoL2NvbnN0cnVjdG9yL2kudGVzdChDT05URVhULkhUTUxFbGVtZW50KSB8fCAoZnVuY3Rpb24gKHApIHtcclxuICAgICAgICByZXR1cm4gcC50b1N0cmluZygpID09PSBcIltvYmplY3QgU2FmYXJpUmVtb3RlTm90aWZpY2F0aW9uXVwiO1xyXG4gICAgfSkoIUNPTlRFWFRbJ3NhZmFyaSddIHx8IHNhZmFyaS5wdXNoTm90aWZpY2F0aW9uKSkge1xyXG4gICAgICAgIHJldHVybiAnc2FmYXJpJztcclxuICAgIH1cclxuICAgIGlmIChmYWxzZSB8fCAhIWRvY3VtZW50LmRvY3VtZW50TW9kZSkge1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBvdXRwdXQgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXJndW1lbnRzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFtrZXldID0gb2JqW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICghKCdyZW1vdmUnIGluIEVsZW1lbnQucHJvdG90eXBlKSkge1xyXG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpc0lFID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gJ2llJztcclxuICAgIH1cclxuICAgIGlmICghaXNJRSAmJiAhIUNPTlRFWFQuU3R5bGVNZWRpYSkge1xyXG4gICAgICAgIHJldHVybiAnZWRnZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoISFDT05URVhULmNocm9tZSAmJiAhIUNPTlRFWFQuY2hyb21lLndlYnN0b3JlKSB7XHJcbiAgICAgICAgaXNDaHJvbWUgPSB0cnVlXHJcbiAgICAgICAgcmV0dXJuICdjaHJvbWUnO1xyXG4gICAgfVxyXG4gICAgaWYgKChpc0Nocm9tZSB8fCBpc09wZXJhKSAmJiAhIUNPTlRFWFQuQ1NTKSB7XHJcbiAgICAgICAgcmV0dXJuICdibGluayc7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb21tb24ucmVhZFZhbHVlID0gZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICBpZih0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIil7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlKG9wdGlvbnMpO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbW9uOyIsImNvbnN0IElTX1dPUktFUiA9IHNlbGYud2luZG93ID09PSB1bmRlZmluZWQ7XHJcbmNvbnN0IENPTlRFWFQgPSBJU19XT1JLRVIgPyBzZWxmIDogd2luZG93O1xyXG52YXIgcmFmID0ge1xyXG4gICAgcmVxdWVzdFRpbWVvdXQ6IGZ1bmN0aW9uIChmbiwgZGVsYXkpIHtcclxuICAgICAgICBpZiAoIUNPTlRFWFQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxyXG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmbiwgZGVsYXkpO1xyXG5cclxuICAgICAgICB2YXIgc3RhcnQgPSBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICBoYW5kbGUgPSBuZXcgT2JqZWN0KCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvb3AodGltZXN0YW1wKSB7XHJcbiAgICAgICAgICAgIChEYXRlLm5vdygpIC0gc3RhcnQpID49IGRlbGF5ID8gZm4odGltZXN0YW1wKSA6IGhhbmRsZS52YWx1ZSA9IENPTlRFWFQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGhhbmRsZS52YWx1ZSA9IENPTlRFWFQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xyXG4gICAgICAgIHJldHVybiBoYW5kbGU7XHJcbiAgICB9LFxyXG4gICAgY2xlYXJSZXF1ZXN0VGltZW91dDogZnVuY3Rpb24gKGhhbmRsZSkge1xyXG4gICAgICAgIENPTlRFWFQuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPyBDT05URVhULmNhbmNlbEFuaW1hdGlvbkZyYW1lKGhhbmRsZS52YWx1ZSk6Y2xlYXJUaW1lb3V0KGhhbmRsZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByYWY7IiwiaW1wb3J0IGNvbW1vbiBmcm9tICcuLi9jb21tb24vY29tbW9uJ1xyXG52YXIgZG9tID0ge1xyXG4gICAgc2VsZWN0OiBmdW5jdGlvbihzZWxlY3Rvcil7XHJcbiAgICAgICAgaWYoc2VsZWN0b3I9PT11bmRlZmluZWQpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgX3NlbGVjdG9yID0gc2VsZWN0b3IuY2hhckF0KDApO1xyXG4gICAgICAgIGxldCBuYW1lID0gc2VsZWN0b3Iuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIGxldCBkb21zID0gW107XHJcbiAgICAgICAgc3dpdGNoIChfc2VsZWN0b3Ipe1xyXG4gICAgICAgICAgICBjYXNlICcjJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYW1lKTtcclxuICAgICAgICAgICAgY2FzZSAnLic6XHJcbiAgICAgICAgICAgICAgICBkb21zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShuYW1lKSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgZG9tcyA9ICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShzZWxlY3RvcikgfHwgW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZG9tcztcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbiAodGFnLCBpZCA9ICcnLCBvcHRpb25zID0ge30pIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuXHJcbiAgICAgICAgbGV0IGVsZW1lbnRJZCA9IGlkIHx8ICh0YWcgKyAnXycgKyBjb21tb24uY3JlYXRlSWQoKSk7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgZWxlbWVudElkKTtcclxuXHJcbiAgICAgICAgc2V0dXBFbGVtZW50TWV0aG9kcyhlbGVtZW50LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0dXBFbGVtZW50TWV0aG9kcyhlbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICBlbGVtZW50Ll9ldmVudExpc3RlbmVycyA9IG5ldyBNYXAoKTtcclxuICAgIGVsZW1lbnQuX2JvdW5kID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIGVsZW1lbnQuYWRkID0gZnVuY3Rpb24gKHRhZywgaWQsIG9wdGlvbnMpIHtcclxuICAgICAgICBsZXQgY2hpbGQgPSBkb20uY3JlYXRlRWxlbWVudCh0YWcsIGlkLCBvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRFbGVtZW50KGNoaWxkKTtcclxuICAgIH07XHJcbiAgICBlbGVtZW50LmFkZEVsZW1lbnQgPSBmdW5jdGlvbiAoY2hpbGQpIHtcclxuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICAgICAgICByZXR1cm4gY2hpbGRcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5hZGRDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBlbGVtZW50LnJlbW92ZUNsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgZWxlbWVudC5nZXRBdHRyID0gZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KTtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5hdHRyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zZXRFbGVtZW50KCdhdHRyJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuZ2V0RGF0YSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGE7XHJcbiAgICB9O1xyXG4gICAgZWxlbWVudC5kYXRhID0gZnVuY3Rpb24oYW55KXtcclxuICAgICAgICB0aGlzLl9kYXRhID0gYW55O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmdldFByb3AgPSBmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50W2tleV07XHJcbiAgICB9O1xyXG4gICAgZWxlbWVudC5wcm9wID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zZXRFbGVtZW50KCdwcm9wJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuY3NzID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudCgnY3NzJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYmluZCA9IGZ1bmN0aW9uKGtleSwgZm4pe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLl9ib3VuZC5zZXQoa2V5LCBmbik7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdzdG9yYWdlXycgKyBrZXkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuICAgIGVsZW1lbnQudW5iaW5kID0gZnVuY3Rpb24oa2V5KXtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fYm91bmQuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdzdG9yYWdlXycgKyBrZXkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50Ll9yZWFjdCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xyXG4gICAgICAgIGxldCBmbiA9IHRoaXMuX2JvdW5kLmdldChrZXkpO1xyXG4gICAgICAgIGlmKGZuKXtcclxuICAgICAgICAgICAgZm4uY2FsbCh0aGlzLCB2YWx1ZSlcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZWxlbWVudC5vbiAgPSBmdW5jdGlvbihldmVudE5hbWUsIGZuLCB0YWcgPSAnJyl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBldmVudFRhZyA9IGV2ZW50TmFtZSArIHRhZztcclxuICAgICAgICBsZXQgZXZlbnRIYW5kbGVyID0gZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuZ2V0KGV2ZW50VGFnKTtcclxuICAgICAgICBpZihldmVudEhhbmRsZXIpe1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICBlbGVtZW50Ll9ldmVudExpc3RlbmVycy5kZWxldGUoZXZlbnRUYWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihmbikge1xyXG4gICAgICAgICAgICBldmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZm4uY2FsbChzZWxmLCBlKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuc2V0KGV2ZW50VGFnLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBldmVudEhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC50ZXh0ID0gZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIHRoaXMuaW5uZXJUZXh0ID0gc3RyO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50Ll9zZXRFbGVtZW50ID0gZnVuY3Rpb24odHlwZSwga2V5ICwgdmFsdWUpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICBjb21tb24ub2JqZWN0Zm9yRWFjaChrZXkgLGZ1bmN0aW9uIChpdGVtLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGZbdHlwZV0oa2V5LCBpdGVtKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdiA9IGNvbW1vbi5yZWFkVmFsdWUodmFsdWUpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncHJvcCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSAgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYXR0cic6XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoa2V5KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2Nzcyc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlW2tleV0gPSAgdmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRvbTsiLCJpbXBvcnQgY29tbW9uIGZyb20gJy4uL2NvbW1vbi9jb21tb24nO1xyXG5cclxudmFyIHN0b3JhZ2UgPSB7XHJcbiAgICBkYXRhTWFwOiBuZXcgTWFwKCksXHJcbiAgICB0aW1lck1hcDogIG5ldyBNYXAoKSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBkYXRhTWFwID0gdGhpcy5kYXRhTWFwO1xyXG4gICAgICAgIGxldCB7cmVzZXR9ID0gb3B0aW9ucztcclxuICAgICAgICBsZXQgc2hvdWxkUmVhY3QgPSBmYWxzZTtcclxuICAgICAgICBsZXQgb2xkVmFsdWUgPSBkYXRhTWFwLmdldChrZXkpO1xyXG4gICAgICAgIGlmKGNvbW1vbi5pc09iamVjdCh2YWx1ZSkgJiYgY29tbW9uLmlzT2JqZWN0KG9sZFZhbHVlKSAmJiByZXNldCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBjb21tb24ub2JqZWN0Zm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gKGl0ZW0sIGtleSwgb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG91bGRSZWFjdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvYmpba2V5XSA9IHZhbHVlW2tleV1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICBzaG91bGRSZWFjdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGRhdGFNYXAuc2V0KGtleSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG5ld1ZhbHVlID0gZGF0YU1hcC5nZXQoa2V5KTtcclxuXHJcbiAgICAgICAgaWYoc2hvdWxkUmVhY3QpIHtcclxuICAgICAgICAgICB0aGlzLmJyb2FkY2FzdChrZXksIG5ld1ZhbHVlLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdWYWx1ZTtcclxuICAgIH0sXHJcbiAgICBicm9hZGNhc3Q6IGZ1bmN0aW9uKGtleSwgbmV3VmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCB0aW1lciA9IHRoaXMudGltZXJNYXAuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIGlmICh0aW1lcikge1xyXG4gICAgICAgICAgICBjYy5jYW5jZWxUaW1lcih0aW1lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aW1lciA9IGNjLnNldFRpbWVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGRvbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzdG9yYWdlXycgKyBrZXkpIHx8IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRvbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBkb20gPSBkb21zW2ldO1xyXG4gICAgICAgICAgICAgICAgZG9tLl9yZWFjdCAmJiBkb20uX3JlYWN0KGtleSwgbmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYudGltZXJNYXAuZGVsZXRlKGtleSk7XHJcbiAgICAgICAgfSwgb3B0aW9ucy5pbW1lZGlhdGVseT8gMDogMTApO1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVyTWFwLnNldChrZXksIHRpbWVyKTtcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFNYXAuZ2V0KGtleSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzdG9yYWdlOyIsImNvbnN0IHhociA9IHtcclxuICAgIGFqYXg6IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xyXG4gICAgICAgIGxldCB7dXJsLCBtZXRob2QsIGRhdGEsIHJlZiwgYXN5bmMsIHhociwgY29udGVudFR5cGUsIG5vQXV0aCwgZGF0YVR5cGUsIHByb2Nlc3NEYXRhLCBjYWNoZSwgbm9KU09OLCBhamF4LCBkb25lLCBmYWlsLCBoZWF2eX0gPSBwYXJhbXMgfHwge307XHJcbiAgICAgICAgbGV0IHtoZWFkZXIsIG9uUHJvZ3Jlc3MsIGJlZm9yZVNlbmR9ID0gcGFyYW1zO1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgcmVxdWVzdC5vcGVuKChtZXRob2QgfHwgJ0dFVCcpLCB1cmwsIGFzeW5jID09PSB1bmRlZmluZWQgPyB0cnVlIDogYXN5bmMpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gKGhlYWRlciB8fCB7fSkpIHtcclxuICAgICAgICAgICAgaWYgKChoZWFkZXIgfHwge30pLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcltrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA+PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgPCA0MDApIHtcclxuICAgICAgICAgICAgICAgIGRvbmUocmVxdWVzdCk7XHJcbiAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgIGZhaWwocmVxdWVzdClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZmFpbChyZXF1ZXN0KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlcXVlc3QudXBsb2FkLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBsZXQgcCA9IE1hdGguZmxvb3IoZS5sb2FkZWQgLyBlLnRvdGFsICogMTAwKTtcclxuICAgICAgICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKHAsIGUpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBfZGF0YTtcclxuICAgICAgICBzd2l0Y2ggKGRhdGFUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2ZpbGUnOlxyXG4gICAgICAgICAgICAgICAgX2RhdGEgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2pzb24nOlxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSA9PT0gdW5kZWZpbmVkID8gXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIgOiBjb250ZW50VHlwZSk7XHJcbiAgICAgICAgICAgICAgICBfZGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYmVmb3JlU2VuZCAmJiBiZWZvcmVTZW5kKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICByZXF1ZXN0LnNlbmQoX2RhdGEpO1xyXG4gICAgICAgIHJldHVybiByZXF1ZXN0O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgeGhyO1xyXG4iLCJpbXBvcnQgY2MgZnJvbSAnLi9jY2pzL2NjJztcclxuXHJcbmNvbnN0IFdISVRFID0gJ3JnYmEoMjU1LDI1NSwyNTUsIDAuNyknO1xyXG5jb25zdCBCTEFDSyA9ICdyZ2JhKDAsMCwwLCAwLjkpJztcclxuY29uc3QgUkVEID0gJyNkNjMwMzEnO1xyXG5cclxubGV0IHJvb3QgPSBjYy5zZWxlY3QoJyNib2R5Jyk7XHJcbmxldCBtYWluQ29udGFpbmVyID0gY2MuY3JlYXRlRWxlbWVudCgnZGl2JywgJ3Rlc3QnKVxyXG4gICAgLmNzcyh7XHJcbiAgICAgICAgYmFja2dyb3VuZDogQkxBQ0ssXHJcbiAgICAgICAgaGVpZ2h0OiAnMTAwdmgnLFxyXG4gICAgICAgIHdpZHRoOiAnMTAwdncnLFxyXG4gICAgICAgIC8vIHBhZGRpbmc6ICcwIDEyLjUlJyxcclxuICAgICAgICBib3hTaGFkb3c6IEJMQUNLICsnMCAwIDEwcHggMjBweCdcclxuICAgIH0pXHJcbiAgICAuZGF0YSh7XHJcbiAgICAgICAgYW5pbWF0aW9uQ291bnRlcjogMCxcclxuICAgIH0pXHJcbiAgICAuYmluZCgnZnJhbWUnLCBmdW5jdGlvbiAoZCkge1xyXG4gICAgICAgIGxldCBjb3VudGVyID0gdGhpcy5nZXREYXRhKCkuYW5pbWF0aW9uQ291bnRlcjtcclxuICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IGNvdW50ZXIvNjBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmRhdGEoe2FuaW1hdGlvbkNvdW50ZXI6Y291bnRlcisxfSk7XHJcbiAgICAgICAgaWYoY291bnRlciA+PSA2MCl7XHJcbiAgICAgICAgICAgIHRoaXMudW5iaW5kKCdmcmFtZScpXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5yb290LmFwcGVuZENoaWxkKG1haW5Db250YWluZXIpO1xyXG5sZXQgY29udGFpbmVyID0gbWFpbkNvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IGNlbnRlclggPSB3aW5kb3cuaW5uZXJXaWR0aC8yO1xyXG4gICAgICAgIGxldCBjZW50ZXJZID0gd2luZG93LmlubmVySGVpZ2h0LzI7XHJcbiAgICAgICAgbGV0IG1vdXNlWCA9IGUuY2xpZW50WDtcclxuICAgICAgICBsZXQgbW91c2VZID0gZS5jbGllbnRZO1xyXG4gICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKCcrKC0obW91c2VYLWNlbnRlclgpLzEwMCkrJ3B4LCcrKC0obW91c2VZLWNlbnRlclkpLzEwMCkrJ3B4KSdcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG5sZXQgaGVhZGVyID0gY29udGFpbmVyLmFkZCgnZGl2JywgJ2hlYWRlcicpXHJcbiAgICAuY3NzKHtcclxuICAgICAgICBkaXNwbGF5OidmbGV4JyxcclxuICAgICAgICBwYWRkaW5nOiAnMCAxMi41JScsXHJcbiAgICAgICAgcGFkZGluZ1RvcDogJzMycHgnLFxyXG4gICAgICAgIHBhZGRpbmdCb3R0b206ICcxNnB4JyxcclxuICAgICAgICBjb2xvcjogV0hJVEUsXHJcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgYm94U2hhZG93OiBCTEFDSyArJyAwIDAgMjBweCdcclxuICAgIH0pO1xyXG5sZXQgaGVhZGVyTGVmdCA9IGhlYWRlci5hZGQoJ2RpdicpXHJcbiAgICAuY3NzKHtcclxuICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICBtaW5XaWR0aDonMjU2cHgnXHJcbiAgICB9KTtcclxubGV0IGxvZ28gPSBoZWFkZXJMZWZ0LmFkZCgnZGl2JylcclxuICAgIC50ZXh0KCdBJylcclxuICAgIC5jc3Moe1xyXG4gICAgICAgIGJhY2tncm91bmQ6IFJFRCxcclxuICAgICAgICBmb250U2l6ZTogJzY0cHgnLFxyXG4gICAgICAgIHBhZGRpbmc6ICcwIDE2cHgnLFxyXG4gICAgICAgIGxpbmVIZWlnaHQ6ICc1NHB4JyxcclxuICAgICAgICBtYXJnaW5SaWdodDogJzRweCcsXHJcbiAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgYm94U2hhZG93OiBSRUQgKyAnIDAgMCAxMHB4JyxcclxuICAgICAgICBjb2xvcjogQkxBQ0tcclxuICAgIH0pO1xyXG5cclxubGV0IG5hbWVDb250YWluZXIgPSBoZWFkZXJMZWZ0LmFkZCgnZGl2JylcclxuICAgIC5jc3Moe1xyXG4gICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXHJcbiAgICB9KTtcclxubmFtZUNvbnRhaW5lci5hZGQoJ3NwYW4nKVxyXG4gICAgLnRleHQoJ05YSU4gWUFORycpXHJcbiAgICAuY3NzKHtcclxuICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgIGRpc3BsYXk6ICdibG9jaycsXHJcbiAgICB9KTtcclxubmFtZUNvbnRhaW5lci5hZGQoJ3NwYW4nKVxyXG4gICAgLnRleHQoJ0Zyb250LUVuZCBEZXZlbG9wZXInKVxyXG4gICAgLmNzcyh7XHJcbiAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcclxuICAgICAgICBkaXNwbGF5OiAnYmxvY2snXHJcbiAgICB9KTtcclxubGV0IG1lbnUgPSBoZWFkZXIuYWRkKCdkaXYnKVxyXG4gICAgLmNzcyh7XHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgIGZvbnRTaXplOiAnMTZweCcsXHJcbiAgICB9KTtcclxubGV0IG1lbnVMaXN0ID0gWydmYS1saW5rZWRpbiddO1xyXG5sZXQgbGlua3MgPSBbJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS9pbi9hbnhpbi15YW5nLTcwNzAyOTEyNS8nXTtcclxubGV0IGhvdmVyQ29sb3JzID0gWycjMDA3N0I1J107XHJcbm1lbnVMaXN0LmZvckVhY2goZnVuY3Rpb24gKHRhZywgaWR4KSB7XHJcbiAgIG1lbnUuYWRkKCdpJylcclxuICAgICAgIC5hZGRDbGFzcygnZmFiJylcclxuICAgICAgIC5hZGRDbGFzcyhtZW51TGlzdFtpZHhdKVxyXG4gICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXHJcbiAgICAgICAgICAgbGluZUhlaWdodDogJzU0cHgnLFxyXG4gICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICB0ZXh0U2hhZG93OiAnIDAgMCA1cHgnLFxyXG4gICAgICAgICAgIHRyYW5zaXRpb246ICcwLjNzJ1xyXG4gICAgICAgfSlcclxuICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgd2luZG93Lm9wZW4obGlua3NbaWR4XSwgJ19ibGFuaycpXHJcbiAgICAgICB9KVxyXG4gICAgICAgLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgY29sb3I6ICcjMDA3N0I1JyxcclxuICAgICAgICAgICB9KVxyXG4gICAgICAgfSwgJ3N0eWxlJylcclxuICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgIGNvbG9yOiAnJyxcclxuICAgICAgICAgICB9KVxyXG4gICAgICAgfSwgJ3N0eWxlJyk7XHJcbn0pO1xyXG5cclxubGV0IG1haW5Db250ZW50Q29udGFpbmVyID0gY2MuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIC5jc3Moe1xyXG4gICAgICAgIGhlaWdodDogJ2NhbGMoMTAwdmggLSAxMDBweCknLFxyXG4gICAgICAgIHBhZGRpbmc6ICcwIDEyLjUlJyxcclxuICAgICAgICBwYWRkaW5nVG9wOiAnMjV2aCcsXHJcbiAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxyXG4gICAgfSk7XHJcbmxldCBoaWdoTGlnaHQgPSBtYWluQ29udGVudENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAudGV4dChcIkxldCdzIG1ha2UgZGF0YSBhbGl2ZVwiKVxyXG4gICAgLmNzcyh7XHJcbiAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICBmb250U2l6ZTogJzQ4cHgnLFxyXG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICB9KTtcclxubGV0IGludHJvID0gbWFpbkNvbnRlbnRDb250YWluZXIuYWRkKCdwJylcclxuICAgIC50ZXh0KFwiSSdtIGEgZnJvbnQtZW5kIGRldmVsb3BlciBmcm9tIEJheSBBcmVhLCBDYWxpZm9ybmlhLCBhbmQgY3VycmVudGx5IGxpdmluZyBpbiBTYW4gSm9zZS4gSSBlbmpveSBidWlsZGluZyByaWNoIGludGVyYWN0aXZlIHdlYnNpdGVzIGFuZCB3ZWIgYXBwcyBmcm9tIHNtYWxsIHRvIGxhcmdlLiBcIilcclxuICAgIC5jc3Moe1xyXG4gICAgICAgIGZvbnRTaXplOiAnMjBweCcsXHJcbiAgICB9KTtcclxuXHJcbmxldCBza2lsbENvbnRhaW5lciA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgnZGl2Jyk7XHJcbmxldCBza2lsbFRpdGxlID0gc2tpbGxDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgLnRleHQoXCJTa2lsbHNcIilcclxuICAgIC5jc3Moe1xyXG4gICAgICAgIGNvbG9yOiBXSElURSxcclxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgZm9udFNpemU6ICc0OHB4JyxcclxuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgIG1hcmdpblRvcDogJzI1NnB4J1xyXG4gICAgfSk7XHJcblxyXG5sZXQgc2tpbGxDYXJkQ29udGFpbmVyID0gc2tpbGxDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgLmNzcyh7XHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgbWFyZ2luVG9wOiAnMTI4cHgnLFxyXG4gICAgICAgIGZsZXhXcmFwOiAnd3JhcCdcclxuICAgIH0pO1xyXG5cclxubGV0IHNraWxscyA9IFsnZmEtaHRtbDUnLCdmYS1qcycsICdmYS1jc3MzLWFsdCcsICdmYS1yZWFjdCddO1xyXG5sZXQgc2tpbGxOYW1lcyA9IFsnSFRNTDUnLCdKYXZhc2NyaXB0JywgJ0NTUzMnLCAnUmVhY3QnXTtcclxubGV0IHNraWxsQ29sb3JzID0gWycjZTQ0ZDI2JywnI2VlYWY0YicsICcjMDA3MGJhJywgJyM2MWRhZmInXTtcclxuc2tpbGxzLmZvckVhY2goZnVuY3Rpb24gKGljb24sIGlkeCkge1xyXG4gICAgbGV0IGNhcmQgPSBza2lsbENhcmRDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICAvL3dpZHRoOiAnMzMlJyxcclxuICAgICAgICAgICAgbWluV2lkdGg6ICczMDBweCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgIGZsZXhHcm93OiAxLFxyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGxvZ28gPSBjYXJkLmFkZCgnaScpXHJcbiAgICAgICAgLmFkZENsYXNzKCdmYWInKVxyXG4gICAgICAgIC5hZGRDbGFzcyhpY29uKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzI1NnB4JyxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcclxuICAgICAgICAgICAgY29sb3I6IHNraWxsQ29sb3JzW2lkeF0sXHJcbiAgICAgICAgICAgIHRleHRTaGFkb3c6IHNraWxsQ29sb3JzW2lkeF0gKyAnIDAgMCAxMHB4J1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IG5hbWUgPSBjYXJkLmFkZCgncCcpXHJcbiAgICAgICAgLnRleHQoc2tpbGxOYW1lc1tpZHhdKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzMycHgnLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXHJcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcidcclxuICAgICAgICB9KVxyXG59KTtcclxuXHJcbmxldCBjYXJlZXJDb250YWluZXIgPSBtYWluQ29udGVudENvbnRhaW5lci5hZGQoJ2RpdicpO1xyXG5sZXQgY2FyZWVyVGl0bGUgPSBza2lsbENvbnRhaW5lci5hZGQoJ2RpdicpXHJcbiAgICAudGV4dChcIkNhcmVlclwiKVxyXG4gICAgLmNzcyh7XHJcbiAgICAgICAgY29sb3I6IFdISVRFLFxyXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcclxuICAgICAgICBmb250U2l6ZTogJzQ4cHgnLFxyXG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgbWFyZ2luVG9wOiAnMTI4cHgnLFxyXG4gICAgICAgIG1hcmdpbkJvdHRvbTogJzY0cHgnLFxyXG4gICAgfSk7XHJcblxyXG5sZXQgY29tcGFuaWVzID0gWyduZXRFbGFzdGljIFN5c3RlbXMsIEluYy4nLCAnU2FuIEZyYW5jaXNjbyBTdGF0ZSBVbml2ZXJzaXR5JywgJ1NoYW5naGFpIFVuaXZlcnNpdHknXTtcclxubGV0IHRpdGxlcyA9IFsnU29mdHdhcmUgRW5naW5lZXInLCAnQlMgLSBDb21wdXRlciBFbmdpbmVlcmluZyBTdHVkZW50JywgJ0FTIC0gQ29tcHV0ZXIgQXBwbGljYXRpb24gVGVjaG5vbG9neSBTdHVkZW50J107XHJcbmxldCB0aW1lTGluZXMgPSAgWycyMDE3IC0gQ3VycmVudCcsICcyMDEzIC0gMjAxNycsICcyMDA5IC0gMjAxMyddO1xyXG5sZXQgcHJvamVjdHMgPSB7XHJcbiAgICAnbmV0RWxhc3RpYyBTeXN0ZW1zLCBJbmMuJzogWyd2Qk5HIE1hbmFnZW1lbnQgU3lzdGVtIChVSSBMZWFkKScsJ1NELVdBTiBNYW5hZ2VtZW50IFN5c3RlbSAoVUkgVGVhbSBNZW1iZXIpJyxdXHJcbn07XHJcblxyXG5jb21wYW5pZXMuZm9yRWFjaChmdW5jdGlvbiAoY29tcGFueU5hbWUsIGlkeCkge1xyXG4gICAgbGV0IGNhcmQgPSBjYXJlZXJDb250YWluZXIuYWRkKCdkaXYnKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxyXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc2NHB4J1xyXG4gICAgICAgIH0pO1xyXG4gICAgbGV0IGNvbXBhbnkgPSBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAudGV4dChjb21wYW55TmFtZSlcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICczMnB4JyxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgbGV0IGZvbnRTaXplID0gJzIwcHgnO1xyXG4gICAgbGV0IHRpdGxlID0gY2FyZC5hZGQoJ2RpdicpXHJcbiAgICAgICAgLnRleHQodGl0bGVzW2lkeF0pXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICBsZXQgdGltZUxpbmUgPSBjYXJkLmFkZCgnZGl2JylcclxuICAgICAgICAudGV4dCh0aW1lTGluZXNbaWR4XSlcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgZm9udFNpemU6IGZvbnRTaXplLFxyXG4gICAgICAgIH0pO1xyXG4gICAgKHByb2plY3RzW2NvbXBhbnlOYW1lXSB8fCBbXSkuZm9yRWFjaChmdW5jdGlvbiAocHJvamVjdCkge1xyXG4gICAgICAgIGNhcmQuYWRkKCdkaXYnKVxyXG4gICAgICAgICAgICAudGV4dChwcm9qZWN0KVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBmb250U2l6ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbn0pO1xyXG5cclxubGV0IGZvb3RlciA9IG1haW5Db250ZW50Q29udGFpbmVyLmFkZCgncCcpXHJcbiAgICAudGV4dCgnVGhpcyB3ZWJzaXRlIGlzIGJ1aWxkIGJ5IGNjSlMsIGEgc2VsZi1pbXBsZW1lbnRlZCBKYXZhc2NyaXB0IExpYnJhcnkuJylcclxuICAgIC5jc3Moe1xyXG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcidcclxuICAgIH0pO1xyXG5cclxubWFpbkNvbnRhaW5lci5hZGRFbGVtZW50KGNvbnRhaW5lcik7XHJcbmNvbnRhaW5lci5hZGRFbGVtZW50KGhlYWRlcik7XHJcbmNvbnRhaW5lci5hZGRFbGVtZW50KG1haW5Db250ZW50Q29udGFpbmVyKTtcclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=