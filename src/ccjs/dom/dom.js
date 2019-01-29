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
            case '.':
                doms = document.getElementsByClassName(name) || [];
                break;
            default:
                doms =  document.getElementsByTagName(selector) || [];
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

    element.attr = function (key, value) {
        this._setElement('attr', key, value);
        return this;
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
        let self = this;
        this._bound.set(key, fn);
        this.classList.add('storage_' + key);
        return this;
    };
    element._react = function(key, value){
        let fn = this._bound.get(key);
        if(fn){
            fn.call(this, value)
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
                fn.call(self, e);
            };
            element._eventListeners.set(eventTag, eventHandler);
            this.addEventListener(eventName, eventHandler);
        }
        return self;
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
}

export default dom;