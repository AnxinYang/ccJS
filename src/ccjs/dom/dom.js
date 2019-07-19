import common from '../common/common'
var dom = {
    select: function(selector){
        if(selector===undefined){
            return;
        }
        return document.querySelector(selector);
    },
    selectAll: function(selector){
        if(selector===undefined){
            return;
        }
        return document.querySelectorAll(selector);
    },
    create: function (tag, id = '', options = {}, ns) {
        let element = ns?dom.createElementNS(tag, id, options):dom.createElement(tag, id, options);
        element._eventListeners = new Map();
        element._bound = new Map();
        element._memory = {};
        element._isNS = false;
        element._options = {};
        return element;
    },
    createElement: function (tag, id = '', options = {}) {
        let element = document.createElement(tag);

        let elementId = id || (tag + '_' + common.createId());
        element.setAttribute('id', elementId);
        return element;
    },
    createElementNS: function (tag, id = '', options = {}) {
        let element = document.createElementNS("http://www.w3.org/2000/svg", tag);
        let elementId = id || (tag + '_' + common.createId());
        element._isNS = true;
        element.setAttributeNS(null,'id', elementId);

        return element;
    },
};



Element.prototype.add = function (tag, id, options) {
    let child = dom.create(tag, id, options);
    return this.addElement(child);
};

Element.prototype.addNS = function (tag, id, options) {
    let child = dom.create(tag, id, options);
    return this.addElement(child);
};

Element.prototype.addElement = function (child) {
    this.appendChild(child);
    return child
};

Element.prototype.addClass = function (className) {
    this.classList.add(className);
    return this;
};

Element.prototype.removeClass = function (className) {
    this.classList.remove(className);
    return this;
};

Element.prototype.getAttr = function(key){
    return this.getAttribute(key);
};

Element.prototype.attr = function (key, value) {
    this._setElement('attr', key, value);
    return this;
};

Element.prototype.getMemory = function(){
    return this._memory;
};

Element.prototype.memory = function(obj){
    this._memory = obj;
    return this;
};

Element.prototype.getProp = function(key){
    return this[key];
};

Element.prototype.prop = function (key, value) {
    this._setElement('prop', key, value);
    return this;
};

Element.prototype.css = function(key, value){
    this._setElement('css', key, value);
    return this;
};

Element.prototype.bind = function(key, fn){
    if(key) {
        this._bound.set(key, fn);
        this.classList.add('storage_' + key);
        this._react(key, cc.getValue(key))
    }
    return this;
};
Element.prototype.unbind = function(key){
    let self = this;
    this._bound.delete(key);
    this.classList.remove('storage_' + key);
    return this;
};

Element.prototype._react = function(key, value){
    let fn = this._bound.get(key);
    if(fn){
        if(fn.call(this, value, this._memory) === false){
            this.unbind(key)
        }
    }
};

Element.prototype.on  = function(eventName, fn, tag = ''){
    let self = this;
    let eventTag = eventName + tag;
    let eventHandler = this._eventListeners.get(eventTag);
    if(eventHandler){
        this.removeEventListener(eventName, eventHandler);
        this._eventListeners.delete(eventTag);
    }
    if(fn) {
        eventHandler = function (e) {
            if(fn.call(self, e, self._memory) === false){
                self.removeEventListener(eventName, eventHandler);
            }
        };
        this._eventListeners.set(eventTag, eventHandler);
        this.addEventListener(eventName, eventHandler, false);
    }
    return self;
};

Element.prototype.content = function (str) {
    this.innerText = str;
    return this;
};

Element.prototype.removeSelf = function(){
    this.removeAllChildren();
    if(this.remove){
        this.remove()
    }else{
        this.parentNode.removeChild(this);
    }
};

Element.prototype.removeAllChildren = function(){
    while (this.firstChild) {
        this.removeChild(this.firstChild);
    }
};

Element.prototype._setElement = function(type, key , value){
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
                this._isNS?this.setAttributeNS(null, key, value):this.setAttribute(key, value)
            }
            break;
        case 'css':
            this.style[key] =  value;
            break;
    }
    return this;
}

Element.prototype.isInViewport = function (options = {}) {
    let offsetX = options.offsetX || 0;
    let offsetY = options.offsetY || 0;
    let {x, y, width, height} = this.getBoundingClientRect(); //IE not support bottom right
    let x2 = x + width;
    let y2 = y + height;
    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;
    return !(x2 <= (offsetX)|| x >= (innerWidth - offsetX) || y2 <= (offsetY) || y >= (innerHeight - offsetY))
};


export default dom;