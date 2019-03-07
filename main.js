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

var WHITE = 'rgb(222,222,222)';
var BLACK = 'rgba(0,0,0, 0.9)';
var BLACK_SOLID = 'rgb(25, 25, 25)';
var RED = '#d63031';
var viewContent = {
    Home: function Home() {
        return _cc2.default.createElement('h1').content("Let's Sell").css({
            textAlign: 'center'
        });
    },
    About: function About() {
        return _cc2.default.createElement('p').content('Our company markets your company directly to a broad range of targeted buyers, always maintaining total confidentiality and controlling all access to your information.');
    },
    'Products/Services': function ProductsServices() {
        var list = _cc2.default.createElement('ul');
        list.add('li').content('Help you sell your company at best value.');
        list.add('li').content('Evaluate the value of your company');
        list.add('li').content('Help your company go public');
        return list;
    },
    News: function News() {
        return _cc2.default.createElement('p').content('No news');
    },
    Contacts: function Contacts() {
        var p = _cc2.default.createElement('p');
        _cc2.default.request({
            url: 'contacts.php',
            done: function done(data, res) {
                p.content(res.responseText);
            }
        });
        return p;
    }
};

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
    });
    var header = mainContainer.add('div', 'header').css({
        height: '88px',
        width: '100vw'
    });
    var headerTag = ['Home', 'About', 'Products/Services', 'News', 'Contacts'];
    headerTag.forEach(function (tag) {
        header.add('div', 'header-' + tag).content(tag).css({
            display: 'inline-block',
            padding: '16px',
            textAlign: 'center',
            color: WHITE,
            cursor: 'pointer',
            transition: '0.2s'
        }).on('mouseenter', function () {
            this.css({
                textShadow: '0 0 10px WHITE'
            });
        }).on('mouseleave', function () {
            this.css({
                textShadow: ''
            });
        }).on('click', function () {
            _cc2.default.setValue('currentView', tag);
        }).bind('currentView', function (currentView) {
            this.css({
                boxShadow: currentView === tag ? 'inset 0 -10px 0px -8px ' + WHITE : ''
            });
        });
    });

    var viewContainer = mainContainer.add('div', 'viewContainer').css({
        padding: '0 64px',
        color: WHITE
    }).bind('currentView', function (currentView) {
        var self = this;
        self.removeAllChildren();
        self.addElement(viewContent[currentView]());
    });

    root.appendChild(mainContainer);
    _cc2.default.setValue('currentView', 'Home');
}
index();

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvY29tbW9uL2NvbW1vbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY2Nqcy9jb21tb24vcmFmLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL2RvbS9kb20uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NjanMvc3RvcmFnZS9zdG9yYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9jY2pzL3hoci94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIklTX1dPUktFUiIsInNlbGYiLCJDT05URVhUIiwid2luZG93IiwiY2MiLCJ0b29scyIsImNvbW1vbiIsImxvYWQiLCJhZGRPbnMiLCJvcHRpb25zIiwic2VsZWN0IiwiZG9tIiwiY3JlYXRlRWxlbWVudCIsImNyZWF0ZUVsZW1lbnROUyIsInNldFZhbHVlIiwic3RvcmFnZSIsInNhdmVBcnJheSIsImFyciIsImlka2V5Iiwia2V5IiwiaXRlbSIsInVwZGF0ZVZhbHVlIiwiZ2V0VmFsdWUiLCJzZXRUaW1lciIsInJhZiIsImNhbmNlbFRpbWVyIiwicmVxdWVzdCIsInBhcmFtcyIsInhociIsImxhc3QiLCJmcmFtZVRpY2tlciIsImltbWVkaWF0ZWx5Iiwib2JqIiwiZm4iLCJzb3VyY2UiLCJ0YXJnZXQiLCJNYXRoIiwiczQiLCJPYmplY3QiLCJpc0lFIiwiaXNDaHJvbWUiLCJpc09wZXJhIiwib3ByIiwibmF2aWdhdG9yIiwicCIsInNhZmFyaSIsImRvY3VtZW50Iiwib3V0cHV0IiwiYXJndW1lbnRzIiwiaSIsIkVsZW1lbnQiLCJ2YWx1ZSIsInJlcXVlc3RUaW1lb3V0Iiwic2V0VGltZW91dCIsInN0YXJ0IiwiRGF0ZSIsImhhbmRsZSIsImNsZWFyUmVxdWVzdFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJzZWxlY3RvciIsIl9zZWxlY3RvciIsIm5hbWUiLCJkb21zIiwiaWQiLCJlbGVtZW50IiwiZWxlbWVudElkIiwidGFnIiwic2V0dXBFbGVtZW50TWV0aG9kcyIsImNoaWxkIiwiZXZlbnRUYWciLCJldmVudE5hbWUiLCJldmVudEhhbmRsZXIiLCJ2Iiwib2Zmc2V0WCIsIm9mZnNldFkiLCJ4MiIsIngiLCJ5MiIsInkiLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJkYXRhTWFwIiwidGltZXJNYXAiLCJzaG91bGRSZWFjdCIsIm9sZFZhbHVlIiwicmVzZXQiLCJuZXdWYWx1ZSIsImJyb2FkY2FzdCIsInRpbWVyIiwiYWpheCIsInByb21pc2UiLCJtZXRob2QiLCJhc3luYyIsImhlYWRlciIsImRvbmUiLCJwYXJzZURhdGEiLCJyZXNvbHZlIiwiZmFpbCIsInJlamVjdCIsImUiLCJvblByb2dyZXNzIiwiX2RhdGEiLCJjb250ZW50VHlwZSIsIkpTT04iLCJiZWZvcmVTZW5kIiwiZGF0YSIsIldISVRFIiwiQkxBQ0siLCJCTEFDS19TT0xJRCIsIlJFRCIsInZpZXdDb250ZW50IiwiSG9tZSIsInRleHRBbGlnbiIsIkFib3V0IiwibGlzdCIsIk5ld3MiLCJDb250YWN0cyIsInVybCIsInJlcyIsIndpZHRoIiwiaGVpZ2h0Iiwicm9vdCIsIm1haW5Db250YWluZXIiLCJiYWNrZ3JvdW5kIiwiYm94U2hhZG93IiwiaGVhZGVyVGFnIiwiZGlzcGxheSIsInBhZGRpbmciLCJjb2xvciIsImN1cnNvciIsInRyYW5zaXRpb24iLCJ0ZXh0U2hhZG93IiwiY3VycmVudFZpZXciLCJ2aWV3Q29udGFpbmVyIiwiaW5kZXgiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7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QUFDQXJIO0FBQ0g7QUFDRGtJLFEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IGRvbSBmcm9tICcuL2RvbS9kb20nO1xyXG5pbXBvcnQgc3RvcmFnZSBmcm9tICcuL3N0b3JhZ2Uvc3RvcmFnZSc7XHJcbmltcG9ydCByYWYgZnJvbSAnLi9jb21tb24vcmFmJztcclxuaW1wb3J0IGNvbW1vbiBmcm9tICcuL2NvbW1vbi9jb21tb24nO1xyXG5pbXBvcnQgeGhyIGZyb20gJy4veGhyL3hocic7XHJcblxyXG5jb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxuXHJcbnZhciBjYztcclxud2luZG93LmNjID0gY2MgPSB7XHJcbiAgICB0b29sczogY29tbW9uLFxyXG4gICAgbG9hZDogZnVuY3Rpb24oYWRkT25zID0gW10sIG9wdGlvbnMgPSB7fSl7XHJcblxyXG4gICAgfSxcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIHJldHVybiBkb20uc2VsZWN0KHNlbGVjdG9yKVxyXG4gICAgfSxcclxuICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBkb20uY3JlYXRlRWxlbWVudCh0YWdOYW1lLCBpZCwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBjcmVhdGVFbGVtZW50TlM6IGZ1bmN0aW9uICh0YWdOYW1lLCBpZCwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5OUyA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIGRvbS5jcmVhdGVFbGVtZW50KHRhZ05hbWUsIGlkLCBvcHRpb25zKVxyXG4gICAgfSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgb3B0aW9ucy5yZXNldCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBzYXZlQXJyYXk6IGZ1bmN0aW9uKGtleSwgYXJyID0gW10sIGlka2V5KXtcclxuICAgICAgICBpZihpZGtleSAhPT0gdW5kZWZpbmVkICYmIGlka2V5ICE9PSAnJyAmJiBrZXkgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBjYy51cGRhdGVWYWx1ZShpdGVtW2lka2V5XSwgaXRlbSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5zZXRWYWx1ZShrZXksIGFycik7XHJcbiAgICB9LFxyXG4gICAgdXBkYXRlVmFsdWU6IGZ1bmN0aW9uKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSl7XHJcbiAgICAgICAgcmV0dXJuIHN0b3JhZ2Uuc2V0VmFsdWUoa2V5LCB2YWx1ZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogIGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gc3RvcmFnZS5nZXRWYWx1ZShrZXkpO1xyXG4gICAgfSxcclxuICAgIHNldFRpbWVyOiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgcmV0dXJuIHJhZi5yZXF1ZXN0VGltZW91dChmbiwgZGVsYXkpXHJcbiAgICB9LFxyXG4gICAgY2FuY2VsVGltZXI6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICByYWYuY2xlYXJSZXF1ZXN0VGltZW91dChoYW5kbGUpO1xyXG4gICAgfSxcclxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIChwYXJhbXMgPSB7fSkge1xyXG4gICAgICAgIHJldHVybiB4aHIuYWpheChwYXJhbXMpO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmlmKElTX1dPUktFUil7XHJcbiAgICBkZWxldGUgY2Muc2VsZWN0O1xyXG4gICAgZGVsZXRlIGNjLmNyZWF0ZUVsZW1lbnQ7XHJcbiAgICBkZWxldGUgY2MuY3JlYXRlRWxlbWVudE5TO1xyXG59ZWxzZXtcclxuICAgIGxldCBsYXN0ID0gMFxyXG4gICAgbGV0IGZyYW1lVGlja2VyID0gZnVuY3Rpb24gKHRpbWVzdGFtcCkge1xyXG4gICAgICAgIGNjLnNldFZhbHVlKCdmcmFtZScsIHRpbWVzdGFtcCwge2ltbWVkaWF0ZWx5OiB0cnVlfSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0aW1lc3RhbXAgLSBsYXN0KTtcclxuICAgICAgICBsYXN0ID0gdGltZXN0YW1wO1xyXG4gICAgICAgIHJhZi5yZXF1ZXN0VGltZW91dChmcmFtZVRpY2tlciwgMTYpXHJcbiAgICB9O1xyXG4gICAgZnJhbWVUaWNrZXIoMCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjYzsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxuY29uc3QgY29tbW9uID0ge307XHJcblxyXG5jb21tb24ub2JqZWN0Zm9yRWFjaCA9IGZ1bmN0aW9uKG9iaixmbil7XHJcbiAgICBmb3IodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgZm4ob2JqW2tleV0sIGtleSwgb2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb21tb24ub2JqZWN0QXNzaWduID0gZnVuY3Rpb24odGFyZ2V0LCBzb3VyY2Upe1xyXG4gICAgZm9yKGxldCBrZXkgaW4gc291cmNlKSB7XHJcbiAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG59O1xyXG5cclxuY29tbW9uLmNyZWF0ZUlkID0gZnVuY3Rpb24oKXtcclxuICAgIGZ1bmN0aW9uIHM0KCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxyXG4gICAgICAgICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcbn07XHJcblxyXG5jb21tb24uaXNPYmplY3QgPSBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgcmV0dXJuIChpdGVtIT09dW5kZWZpbmVkICYmIGl0ZW0gPT09IE9iamVjdChpdGVtKSAmJiAhKGl0ZW0gaW5zdGFuY2VvZiBBcnJheSkpXHJcbn07XHJcblxyXG5jb21tb24uZ2V0QnJvd3NlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgbGV0IGlzSUUgPSBmYWxzZTtcclxuICAgIGxldCBpc0Nocm9tZSA9IGZhbHNlO1xyXG4gICAgbGV0IGlzT3BlcmEgPSBmYWxzZTtcclxuICAgIGlmICgoISFDT05URVhULm9wciAmJiAhIW9wci5hZGRvbnMpIHx8ICEhQ09OVEVYVC5vcGVyYSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJyBPUFIvJykgPj0gMCkge1xyXG4gICAgICAgIGlzT3BlcmEgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiAnb3BlcmEnO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBJbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm4gJ2ZpcmVmb3gnO1xyXG4gICAgfVxyXG4gICAgaWYgKC9jb25zdHJ1Y3Rvci9pLnRlc3QoQ09OVEVYVC5IVE1MRWxlbWVudCkgfHwgKGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgcmV0dXJuIHAudG9TdHJpbmcoKSA9PT0gXCJbb2JqZWN0IFNhZmFyaVJlbW90ZU5vdGlmaWNhdGlvbl1cIjtcclxuICAgIH0pKCFDT05URVhUWydzYWZhcmknXSB8fCBzYWZhcmkucHVzaE5vdGlmaWNhdGlvbikpIHtcclxuICAgICAgICByZXR1cm4gJ3NhZmFyaSc7XHJcbiAgICB9XHJcbiAgICBpZiAoZmFsc2UgfHwgISFkb2N1bWVudC5kb2N1bWVudE1vZGUpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgb3V0cHV0ID0gYXJndW1lbnRzWzBdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50c1tpXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoISgncmVtb3ZlJyBpbiBFbGVtZW50LnByb3RvdHlwZSkpIHtcclxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaXNJRSA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuICdpZSc7XHJcbiAgICB9XHJcbiAgICBpZiAoIWlzSUUgJiYgISFDT05URVhULlN0eWxlTWVkaWEpIHtcclxuICAgICAgICByZXR1cm4gJ2VkZ2UnO1xyXG4gICAgfVxyXG4gICAgaWYgKCEhQ09OVEVYVC5jaHJvbWUgJiYgISFDT05URVhULmNocm9tZS53ZWJzdG9yZSkge1xyXG4gICAgICAgIGlzQ2hyb21lID0gdHJ1ZVxyXG4gICAgICAgIHJldHVybiAnY2hyb21lJztcclxuICAgIH1cclxuICAgIGlmICgoaXNDaHJvbWUgfHwgaXNPcGVyYSkgJiYgISFDT05URVhULkNTUykge1xyXG4gICAgICAgIHJldHVybiAnYmxpbmsnO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29tbW9uLnJlYWRWYWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgaWYodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpe1xyXG4gICAgICAgIHJldHVybiB2YWx1ZShvcHRpb25zKTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1vbjsiLCJjb25zdCBJU19XT1JLRVIgPSBzZWxmLndpbmRvdyA9PT0gdW5kZWZpbmVkO1xyXG5jb25zdCBDT05URVhUID0gSVNfV09SS0VSID8gc2VsZiA6IHdpbmRvdztcclxudmFyIHJhZiA9IHtcclxuICAgIHJlcXVlc3RUaW1lb3V0OiBmdW5jdGlvbiAoZm4sIGRlbGF5KSB7XHJcbiAgICAgICAgaWYgKCFDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZSlcclxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZm4sIGRlbGF5KTtcclxuXHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgaGFuZGxlID0gbmV3IE9iamVjdCgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBsb29wKHRpbWVzdGFtcCkge1xyXG4gICAgICAgICAgICAoRGF0ZS5ub3coKSAtIHN0YXJ0KSA+PSBkZWxheSA/IGZuKHRpbWVzdGFtcCkgOiBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBoYW5kbGUudmFsdWUgPSBDT05URVhULnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgICAgICByZXR1cm4gaGFuZGxlO1xyXG4gICAgfSxcclxuICAgIGNsZWFyUmVxdWVzdFRpbWVvdXQ6IGZ1bmN0aW9uIChoYW5kbGUpIHtcclxuICAgICAgICBDT05URVhULmNhbmNlbEFuaW1hdGlvbkZyYW1lID8gQ09OVEVYVC5jYW5jZWxBbmltYXRpb25GcmFtZShoYW5kbGUudmFsdWUpOmNsZWFyVGltZW91dChoYW5kbGUpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmFmOyIsImltcG9ydCBjb21tb24gZnJvbSAnLi4vY29tbW9uL2NvbW1vbidcclxudmFyIGRvbSA9IHtcclxuICAgIHNlbGVjdDogZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG4gICAgICAgIGlmKHNlbGVjdG9yPT09dW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IF9zZWxlY3RvciA9IHNlbGVjdG9yLmNoYXJBdCgwKTtcclxuICAgICAgICBsZXQgbmFtZSA9IHNlbGVjdG9yLnN1YnN0cmluZygxKTtcclxuICAgICAgICBsZXQgZG9tcyA9IFtdO1xyXG4gICAgICAgIHN3aXRjaCAoX3NlbGVjdG9yKXtcclxuICAgICAgICAgICAgY2FzZSAnIyc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmFtZSk7XHJcbiAgICAgICAgICAgIGNhc2UgJy4nOlxyXG4gICAgICAgICAgICAgICAgZG9tcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobmFtZSkgfHwgW107XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGRvbXMgPSAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoc2VsZWN0b3IpIHx8IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRvbXM7XHJcbiAgICB9LFxyXG4gICAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHRhZywgaWQgPSAnJywgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG4gICAgICAgIGxldCBlbGVtZW50SWQgPSBpZCB8fCAodGFnICsgJ18nICsgY29tbW9uLmNyZWF0ZUlkKCkpO1xyXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIGVsZW1lbnRJZCk7XHJcblxyXG4gICAgICAgIHNldHVwRWxlbWVudE1ldGhvZHMoZWxlbWVudCwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfSxcclxufTtcclxuXHJcbmZ1bmN0aW9uIHNldHVwRWxlbWVudE1ldGhvZHMoZWxlbWVudCwgb3B0aW9ucykge1xyXG4gICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMgPSBuZXcgTWFwKCk7XHJcbiAgICBlbGVtZW50Ll9ib3VuZCA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBlbGVtZW50LmFkZCA9IGZ1bmN0aW9uICh0YWcsIGlkLCBvcHRpb25zKSB7XHJcbiAgICAgICAgbGV0IGNoaWxkID0gZG9tLmNyZWF0ZUVsZW1lbnQodGFnLCBpZCwgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkRWxlbWVudChjaGlsZCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYWRkRWxlbWVudCA9IGZ1bmN0aW9uIChjaGlsZCkge1xyXG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgIHJldHVybiBjaGlsZFxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmFkZENsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LnJlbW92ZUNsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmdldEF0dHIgPSBmdW5jdGlvbihrZXkpe1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZShrZXkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmF0dHIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3NldEVsZW1lbnQoJ2F0dHInLCBrZXksIHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5nZXREYXRhID0gZnVuY3Rpb24oKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmRhdGEgPSBmdW5jdGlvbihhbnkpe1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSBhbnk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuZ2V0UHJvcCA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRba2V5XTtcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5wcm9wID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9zZXRFbGVtZW50KCdwcm9wJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuY3NzID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XHJcbiAgICAgICAgdGhpcy5fc2V0RWxlbWVudCgnY3NzJywga2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuYmluZCA9IGZ1bmN0aW9uKGtleSwgZm4pe1xyXG4gICAgICAgIGlmKGtleSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuX2JvdW5kLnNldChrZXksIGZuKTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdzdG9yYWdlXycgKyBrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgICBlbGVtZW50LnVuYmluZCA9IGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuX2JvdW5kLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnc3RvcmFnZV8nICsga2V5KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcblxyXG4gICAgZWxlbWVudC5fcmVhY3QgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcclxuICAgICAgICBsZXQgZm4gPSB0aGlzLl9ib3VuZC5nZXQoa2V5KTtcclxuICAgICAgICBpZihmbil7XHJcbiAgICAgICAgICAgIGlmKGZuLmNhbGwodGhpcywgdmFsdWUsIHRoaXMuX2RhdGEpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVuYmluZChrZXkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQub24gID0gZnVuY3Rpb24oZXZlbnROYW1lLCBmbiwgdGFnID0gJycpe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZXZlbnRUYWcgPSBldmVudE5hbWUgKyB0YWc7XHJcbiAgICAgICAgbGV0IGV2ZW50SGFuZGxlciA9IGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzLmdldChldmVudFRhZyk7XHJcbiAgICAgICAgaWYoZXZlbnRIYW5kbGVyKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgZWxlbWVudC5fZXZlbnRMaXN0ZW5lcnMuZGVsZXRlKGV2ZW50VGFnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZm4pIHtcclxuICAgICAgICAgICAgZXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGZuLmNhbGwoc2VsZiwgZSwgc2VsZi5fZGF0YSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGVsZW1lbnQuX2V2ZW50TGlzdGVuZXJzLnNldChldmVudFRhZywgZXZlbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZXZlbnRIYW5kbGVyLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LmNvbnRlbnQgPSBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgdGhpcy5pbm5lclRleHQgPSBzdHI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQucmVtb3ZlU2VsZiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgIGlmKHRoaXMucmVtb3ZlKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKVxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBlbGVtZW50LnJlbW92ZUFsbENoaWxkcmVuID0gZnVuY3Rpb24oKXtcclxuICAgICAgICB3aGlsZSAodGhpcy5maXJzdENoaWxkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy5maXJzdENoaWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGVsZW1lbnQuX3NldEVsZW1lbnQgPSBmdW5jdGlvbih0eXBlLCBrZXkgLCB2YWx1ZSl7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIGNvbW1vbi5vYmplY3Rmb3JFYWNoKGtleSAsZnVuY3Rpb24gKGl0ZW0sIGtleSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZlt0eXBlXShrZXksIGl0ZW0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2ID0gY29tbW9uLnJlYWRWYWx1ZSh2YWx1ZSk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdwcm9wJzpcclxuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9ICB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhdHRyJzpcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShrZXkpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnY3NzJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVba2V5XSA9ICB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LmlzSW5WaWV3cG9ydCA9IGZ1bmN0aW9uIChvcHRpb25zID0ge30pIHtcclxuICAgICAgICBsZXQgb2Zmc2V0WCA9IG9wdGlvbnMub2Zmc2V0WCB8fCAwO1xyXG4gICAgICAgIGxldCBvZmZzZXRZID0gb3B0aW9ucy5vZmZzZXRZIHx8IDA7XHJcbiAgICAgICAgbGV0IHt4LCB5LCB3aWR0aCwgaGVpZ2h0fSA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7IC8vSUUgbm90IHN1cHBvcnQgYm90dG9tIHJpZ2h0XHJcbiAgICAgICAgbGV0IHgyID0geCArIHdpZHRoO1xyXG4gICAgICAgIGxldCB5MiA9IHkgKyBoZWlnaHQ7XHJcbiAgICAgICAgbGV0IGlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgICBsZXQgaW5uZXJIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgcmV0dXJuICEoeDIgPD0gKDAgKyBvZmZzZXRYKXx8IHggPj0gKGlubmVyV2lkdGggLSBvZmZzZXRYKSB8fCB5MiA8PSAoMCArIG9mZnNldFkpIHx8IHkgPj0gKGlubmVySGVpZ2h0IC0gb2Zmc2V0WSkpXHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkb207IiwiaW1wb3J0IGNvbW1vbiBmcm9tICcuLi9jb21tb24vY29tbW9uJztcclxuXHJcbnZhciBzdG9yYWdlID0ge1xyXG4gICAgZGF0YU1hcDogbmV3IE1hcCgpLFxyXG4gICAgdGltZXJNYXA6ICBuZXcgTWFwKCksXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKGtleSwgdmFsdWUsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgZGF0YU1hcCA9IHRoaXMuZGF0YU1hcDtcclxuICAgICAgICBsZXQge3Jlc2V0fSA9IG9wdGlvbnM7XHJcbiAgICAgICAgbGV0IHNob3VsZFJlYWN0ID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IG9sZFZhbHVlID0gZGF0YU1hcC5nZXQoa2V5KTtcclxuICAgICAgICBpZihjb21tb24uaXNPYmplY3QodmFsdWUpICYmIGNvbW1vbi5pc09iamVjdChvbGRWYWx1ZSkgJiYgcmVzZXQgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgY29tbW9uLm9iamVjdGZvckVhY2godmFsdWUsIGZ1bmN0aW9uIChpdGVtLCBrZXksIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hvdWxkUmVhY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZVtrZXldXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgc2hvdWxkUmVhY3QgPSB0cnVlO1xyXG4gICAgICAgICAgICBkYXRhTWFwLnNldChrZXksIHZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuZXdWYWx1ZSA9IGRhdGFNYXAuZ2V0KGtleSk7XHJcblxyXG4gICAgICAgIGlmKHNob3VsZFJlYWN0KSB7XHJcbiAgICAgICAgICAgdGhpcy5icm9hZGNhc3Qoa2V5LCBuZXdWYWx1ZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICB9LFxyXG4gICAgYnJvYWRjYXN0OiBmdW5jdGlvbihrZXksIG5ld1ZhbHVlLCBvcHRpb25zID0ge30pe1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICBsZXQgdGltZXIgPSB0aGlzLnRpbWVyTWFwLmdldChrZXkpO1xyXG5cclxuICAgICAgICBpZiAodGltZXIpIHtcclxuICAgICAgICAgICAgY2MuY2FuY2VsVGltZXIodGltZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGltZXIgPSBjYy5zZXRUaW1lcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBkb21zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3RvcmFnZV8nICsga2V5KSB8fCBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb21zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZG9tID0gZG9tc1tpXTtcclxuICAgICAgICAgICAgICAgIGRvbS5fcmVhY3QgJiYgZG9tLl9yZWFjdChrZXksIG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZWxmLnRpbWVyTWFwLmRlbGV0ZShrZXkpO1xyXG4gICAgICAgIH0sIG9wdGlvbnMuaW1tZWRpYXRlbHk/IDA6IDEwKTtcclxuXHJcbiAgICAgICAgdGhpcy50aW1lck1hcC5zZXQoa2V5LCB0aW1lcik7XHJcbiAgICB9LFxyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhTWFwLmdldChrZXkpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3RvcmFnZTsiLCJjb25zdCB4aHIgPSB7XHJcbiAgICBhamF4OiBmdW5jdGlvbiAocGFyYW1zID0ge30pIHtcclxuICAgICAgICBsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgbGV0IHt1cmwsIG1ldGhvZCwgZGF0YSwgYXN5bmMsIHhociwgY29udGVudFR5cGUsIGRhdGFUeXBlLCBkb25lLCBmYWlsfSA9IHBhcmFtcyB8fCB7fTtcclxuICAgICAgICAgICAgbGV0IHtoZWFkZXIsIG9uUHJvZ3Jlc3MsIGJlZm9yZVNlbmR9ID0gcGFyYW1zO1xyXG4gICAgICAgICAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgICAgICByZXF1ZXN0Lm9wZW4oKG1ldGhvZCB8fCAnR0VUJyksIHVybCwgYXN5bmMgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBhc3luYyk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gKGhlYWRlciB8fCB7fSkpIHtcclxuICAgICAgICAgICAgICAgIGlmICgoaGVhZGVyIHx8IHt9KS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNjLmdldFZhbHVlKCdBdXRob3JpemF0aW9uJykpe1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgY2MuZ2V0VmFsdWUoJ0F1dGhvcml6YXRpb24nKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPj0gMjAwICYmIHJlcXVlc3Quc3RhdHVzIDwgNDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9uZSAmJiBkb25lKHBhcnNlRGF0YShyZXF1ZXN0LnJlc3BvbnNlVGV4dCksIHJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhaWwgJiYgZmFpbChwYXJzZURhdGEocmVxdWVzdC5yZXNwb25zZVRleHQpLCByZXF1ZXN0KTtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBmYWlsICYmIGZhaWwocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSwgcmVxdWVzdCk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QocGFyc2VEYXRhKHJlcXVlc3QucmVzcG9uc2VUZXh0KSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0LnVwbG9hZC5vbnByb2dyZXNzID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwID0gTWF0aC5mbG9vcihlLmxvYWRlZCAvIGUudG90YWwgKiAxMDApO1xyXG4gICAgICAgICAgICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKHAsIGUpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IF9kYXRhO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGRhdGFUeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdmaWxlJzpcclxuICAgICAgICAgICAgICAgICAgICBfZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdqc29uJzpcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSA9PT0gdW5kZWZpbmVkID8gXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIgOiBjb250ZW50VHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgX2RhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmVmb3JlU2VuZCAmJiBiZWZvcmVTZW5kKHJlcXVlc3QpO1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdC5zZW5kKF9kYXRhKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZnVuY3Rpb24gcGFyc2VEYXRhKGRhdGEpIHtcclxuICAgIHRyeXtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShkYXRhIHx8ICcnKVxyXG4gICAgfWNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB4aHI7XHJcbiIsImltcG9ydCBjYyBmcm9tICcuL2NjanMvY2MnO1xyXG5cclxuY29uc3QgV0hJVEUgPSAncmdiKDIyMiwyMjIsMjIyKSc7XHJcbmNvbnN0IEJMQUNLID0gJ3JnYmEoMCwwLDAsIDAuOSknO1xyXG5jb25zdCBCTEFDS19TT0xJRCA9ICdyZ2IoMjUsIDI1LCAyNSknO1xyXG5jb25zdCBSRUQgPSAnI2Q2MzAzMSc7XHJcbmNvbnN0IHZpZXdDb250ZW50ID0ge1xyXG4gICAgSG9tZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBjYy5jcmVhdGVFbGVtZW50KCdoMScpXHJcbiAgICAgICAgICAgIC5jb250ZW50KFwiTGV0J3MgU2VsbFwiKVxyXG4gICAgICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcidcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBBYm91dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBjYy5jcmVhdGVFbGVtZW50KCdwJykuY29udGVudCgnT3VyIGNvbXBhbnkgbWFya2V0cyB5b3VyIGNvbXBhbnkgZGlyZWN0bHkgdG8gYSBicm9hZCByYW5nZSBvZiB0YXJnZXRlZCBidXllcnMsIGFsd2F5cyBtYWludGFpbmluZyB0b3RhbCBjb25maWRlbnRpYWxpdHkgYW5kIGNvbnRyb2xsaW5nIGFsbCBhY2Nlc3MgdG8geW91ciBpbmZvcm1hdGlvbi4nKVxyXG4gICAgfSxcclxuICAgICdQcm9kdWN0cy9TZXJ2aWNlcyc6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgbGlzdCA9IGNjLmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICAgICAgbGlzdC5hZGQoJ2xpJylcclxuICAgICAgICAgICAgLmNvbnRlbnQoJ0hlbHAgeW91IHNlbGwgeW91ciBjb21wYW55IGF0IGJlc3QgdmFsdWUuJyk7XHJcbiAgICAgICAgbGlzdC5hZGQoJ2xpJylcclxuICAgICAgICAgICAgLmNvbnRlbnQoJ0V2YWx1YXRlIHRoZSB2YWx1ZSBvZiB5b3VyIGNvbXBhbnknKTtcclxuICAgICAgICBsaXN0LmFkZCgnbGknKVxyXG4gICAgICAgICAgICAuY29udGVudCgnSGVscCB5b3VyIGNvbXBhbnkgZ28gcHVibGljJyk7XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9LFxyXG4gICAgTmV3czogZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgcmV0dXJuIGNjLmNyZWF0ZUVsZW1lbnQoJ3AnKS5jb250ZW50KCdObyBuZXdzJylcclxuICAgIH0sXHJcbiAgICBDb250YWN0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGxldCBwID0gY2MuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIGNjLnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6ICdjb250YWN0cy5waHAnLFxyXG4gICAgICAgICAgICBkb25lOiBmdW5jdGlvbiAoZGF0YSwgcmVzKSB7XHJcbiAgICAgICAgICAgICAgICBwLmNvbnRlbnQocmVzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5cclxuY2Muc2V0VmFsdWUoJ3ZpZXdwb3J0Jywge3dpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCwgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHR9KTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNjLnVwZGF0ZVZhbHVlKCd2aWV3cG9ydCcsIHt3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0fSk7XHJcbn0pO1xyXG5mdW5jdGlvbiBpbmRleCgpIHtcclxuICAgIGxldCByb290ID0gY2Muc2VsZWN0KCcjYm9keScpO1xyXG4gICAgbGV0IG1haW5Db250YWluZXIgPSBjYy5jcmVhdGVFbGVtZW50KCdkaXYnLCAndGVzdCcpXHJcbiAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IEJMQUNLLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDB2aCcsXHJcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwdncnLFxyXG4gICAgICAgICAgICBib3hTaGFkb3c6IEJMQUNLICsgJzAgMCAxMHB4IDIwcHgnXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgaGVhZGVyID0gbWFpbkNvbnRhaW5lci5hZGQoJ2RpdicsICdoZWFkZXInKVxyXG4gICAgICAgIC5jc3Moe1xyXG4gICAgICAgICAgICBoZWlnaHQ6ICc4OHB4JyxcclxuICAgICAgICAgICAgd2lkdGg6ICcxMDB2dycsXHJcbiAgICAgICAgfSk7XHJcbiAgICBsZXQgaGVhZGVyVGFnID0gWydIb21lJywgJ0Fib3V0JywgJ1Byb2R1Y3RzL1NlcnZpY2VzJywgJ05ld3MnLCAnQ29udGFjdHMnXTtcclxuICAgIGhlYWRlclRhZy5mb3JFYWNoKGZ1bmN0aW9uICh0YWcpIHtcclxuICAgICAgICBoZWFkZXIuYWRkKCdkaXYnLCBgaGVhZGVyLSR7dGFnfWApXHJcbiAgICAgICAgICAgIC5jb250ZW50KHRhZylcclxuICAgICAgICAgICAgLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgICAgIHBhZGRpbmc6ICcxNnB4JyxcclxuICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogV0hJVEUsXHJcbiAgICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICcwLjJzJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dFNoYWRvdzogJzAgMCAxMHB4IFdISVRFJyxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0U2hhZG93OiAnJyxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5zZXRWYWx1ZSgnY3VycmVudFZpZXcnLCB0YWcpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5iaW5kKCdjdXJyZW50VmlldycsIGZ1bmN0aW9uIChjdXJyZW50Vmlldykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogY3VycmVudFZpZXcgPT09IHRhZyA/IGBpbnNldCAwIC0xMHB4IDBweCAtOHB4ICR7V0hJVEV9YCA6ICcnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCB2aWV3Q29udGFpbmVyID0gbWFpbkNvbnRhaW5lci5hZGQoJ2RpdicsICd2aWV3Q29udGFpbmVyJylcclxuICAgICAgICAuY3NzKHtcclxuICAgICAgICAgICAgcGFkZGluZzogJzAgNjRweCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiBXSElURVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmJpbmQoJ2N1cnJlbnRWaWV3JywgZnVuY3Rpb24gKGN1cnJlbnRWaWV3KSB7XHJcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgc2VsZi5yZW1vdmVBbGxDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICBzZWxmLmFkZEVsZW1lbnQodmlld0NvbnRlbnRbY3VycmVudFZpZXddKCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIHJvb3QuYXBwZW5kQ2hpbGQobWFpbkNvbnRhaW5lcik7XHJcbiAgICBjYy5zZXRWYWx1ZSgnY3VycmVudFZpZXcnLCAnSG9tZScpXHJcbn1cclxuaW5kZXgoKTsiXSwic291cmNlUm9vdCI6IiJ9