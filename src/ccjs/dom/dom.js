import common from '../common/common'
var dom = {
    select: function(selector){
        if(selector===undefined){
            return;
        }

        let _selector = selector.charAt(0);
        let name = selector.substring(1);
        let doms = [];
        switch (_selector){
            case '#':
                return document.getElementById(name);
            default:
                doms =  document.querySelectorAll(selector) || [];
        }

        return doms;
    },
    createElement: function (tag, id = '', options = {}) {
        let element = document.createElement(tag);

        let elementId = id || (tag + '_' + common.createId());
        element.setAttribute('id', elementId);

        setupElementMethods(element, options);

        return element;
    },
};

function setupElementMethods(element, options) {
    element._eventListeners = new Map();
    element._bound = new Map();
    element._memory = {};

    element.add = function (tag, id, options) {
        let child = dom.createElement(tag, id, options);
        return this.addElement(child);
    };

    element.addElement = function (child) {
        this.appendChild(child);
        return child
    };

    element.addClass = function (className) {
        this.classList.add(className);
        return this;
    };

    element.removeClass = function (className) {
        this.classList.remove(className);
        return this;
    };

    element.getAttr = function(key){
        return element.getAttribute(key);
    };

    element.attr = function (key, value) {
        this._setElement('attr', key, value);
        return this;
    };

    element.getMemory = function(){
        return this._memory;
    };

    element.memory = function(obj){
        this._memory = obj;
        return this;
    };

    element.getProp = function(key){
        return element[key];
    };

    element.prop = function (key, value) {
        this._setElement('prop', key, value);
        return this;
    };

    element.css = function(key, value){
        this._setElement('css', key, value);
        return this;
    };

    element.bind = function(key, fn){
        if(key) {
            let self = this;
            this._bound.set(key, fn);
            this.classList.add('storage_' + key);
        }
        return this;
    };
    element.unbind = function(key){
        let self = this;
        this._bound.delete(key);
        this.classList.remove('storage_' + key);
        return this;
    };

    element._react = function(key, value){
        let fn = this._bound.get(key);
        if(fn){
            if(fn.call(this, value, this._data) === false){
                this.unbind(key)
            }
        }
    };

    element.on  = function(eventName, fn, tag = ''){
        let self = this;
        let eventTag = eventName + tag;
        let eventHandler = element._eventListeners.get(eventTag);
        if(eventHandler){
            this.removeEventListener(eventName, eventHandler);
            element._eventListeners.delete(eventTag);
        }
        if(fn) {
            eventHandler = function (e) {
                if(fn.call(self, e, self._data) === false){
                    self.removeEventListener(eventName, eventHandler);
                }
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

    element.removeSelf = function(){
        this.removeAllChildren();
        if(this.remove){
            this.remove()
        }else{
            this.parentNode.removeChild(this);
        }
    };

    element.removeAllChildren = function(){
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
    };

    element._setElement = function(type, key , value){
        let self = this;
        if (key === undefined) {
            return this;
        }
        if (typeof key === 'object') {
            common.objectforEach(key ,function (item, key) {
                self[type](key, item)
            });
            return this;
        }

        let v = common.readValue(value);

        switch (type) {
            case 'prop':
                this[key] =  value;
                break;
            case 'attr':
                if (value === false) {
                    this.removeAttribute(key)
                } else {
                    this.setAttribute(key, value)
                }
                break;
            case 'css':
                this.style[key] =  value;
                break;
        }
        return this;
    }

    element.isInViewport = function (options = {}) {
        let offsetX = options.offsetX || 0;
        let offsetY = options.offsetY || 0;
        let {x, y, width, height} = this.getBoundingClientRect(); //IE not support bottom right
        let x2 = x + width;
        let y2 = y + height;
        let innerWidth = window.innerWidth;
        let innerHeight = window.innerHeight;
        return !(x2 <= (0 + offsetX)|| x >= (innerWidth - offsetX) || y2 <= (0 + offsetY) || y >= (innerHeight - offsetY))
    };
}

export default dom;