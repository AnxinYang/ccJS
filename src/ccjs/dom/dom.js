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

        return new ccElement(element);
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

function ccElement (element){
    this.element = element;
    this._eventListeners = new Map();
    this._bound = new Map();
    this._memory = {};
    this._isNS = false;
    this._options = {};
}


ccElement.prototype.add = function (tag, id, options) {
    let child = dom.create(tag, id, options);
    return this.addElement(child);
};

ccElement.prototype.addNS = function (tag, id, options) {
    let child = dom.create(tag, id, options);
    return this.addElement(child);
};

ccElement.prototype.addElement = function (child) {
    this.element.appendChild(child.element);
    return child
};

ccElement.prototype.addClass = function (className) {
    this.element.classList.add(className);
    return this;
};

ccElement.prototype.removeClass = function (className) {
    this.element.classList.remove(className);
    return this;
};

ccElement.prototype.getAttr = function(key){
    return this.element.getAttribute(key);
};

ccElement.prototype.attr = function (key, value) {
    this._setElement('attr', key, value);
    return this;
};

ccElement.prototype.getMemory = function(){
    return this._memory;
};

ccElement.prototype.memory = function(obj){
    this._memory = obj;
    return this;
};

ccElement.prototype.getProp = function(key){
    return this.element[key];
};

ccElement.prototype.prop = function (key, value) {
    this._setElement('prop', key, value);
    return this;
};

ccElement.prototype.css = function(key, value){
    this._setElement('css', key, value);
    return this;
};

ccElement.prototype.bind = function(key, fn){
    if(key) {
        this._bound.set(key, fn);
        this.element.classList.add('storage_' + key);
        this.element._react = this._react.bind(this);
        this._react(key, cc.getValue(key))
    }
    return this;
};
ccElement.prototype.unbind = function(key){
    let self = this;
    this._bound.delete(key);
    this.element.classList.remove('storage_' + key);
    return this;
};

ccElement.prototype._react = function(key, value){
    let fn = this._bound.get(key);
    if(fn){
        if(fn.call(this, value, this._memory) === false){
            this.unbind(key)
        }
    }
};

ccElement.prototype.on  = function(eventName, fn, tag = ''){
    let self = this;
    let eventTag = eventName + tag;
    let eventHandler = this._eventListeners.get(eventTag);
    if(eventHandler){
        this.element.removeEventListener(eventName, eventHandler);
        this._eventListeners.delete(eventTag);
    }
    if(fn) {
        eventHandler = function (e) {
            if(fn.call(self, e, self._memory) === false){
                self.element.removeEventListener(eventName, eventHandler);
            }
        };
        this._eventListeners.set(eventTag, eventHandler);
        this.element.addEventListener(eventName, eventHandler, false);
    }
    return self;
};

ccElement.prototype.content = function (str) {
    this.element.innerText = str;
    return this;
};

ccElement.prototype.removeSelf = function(){
    this.removeAllChildren();
    if(this.element.remove){
        this.element.remove()
    }else{
        this.element.parentNode.removeChild(this);
    }
};

ccElement.prototype.removeAllChildren = function(){
    while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
    }
};

ccElement.prototype._setElement = function(type, key , value){
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
            this.element[key] =  value;
            break;
        case 'attr':
            if (value === false) {
                this.element.removeAttribute(key)
            } else {
                this._isNS?this.element.setAttributeNS(null, key, value):this.element.setAttribute(key, value)
            }
            break;
        case 'css':
            this.element.style[key] =  value;
            break;
    }
    return this;
}

ccElement.prototype.isInViewport = function (options = {}) {
    let offsetX = options.offsetX || 0;
    let offsetY = options.offsetY || 0;
    let {x, y, width, height} = this.element.getBoundingClientRect(); //IE not support bottom right
    let x2 = x + width;
    let y2 = y + height;
    let innerWidth = window.innerWidth;
    let innerHeight = window.innerHeight;
    return !(x2 <= (offsetX)|| x >= (innerWidth - offsetX) || y2 <= (offsetY) || y >= (innerHeight - offsetY))
};


export default dom;