import dom from './dom/dom';
import storage from './storage/storage';
import raf from './common/raf';
import common from './common/common';
import xhr from './xhr/xhr';

const IS_WORKER = self.window === undefined;
const CONTEXT = IS_WORKER ? self : window;

var cc;
window.cc = cc = {
    utils: common,
    load: function(addOns = [], options = {}){

    },
    select: function(selector){
        return dom.select(selector)
    },
    createElement: function (tagName, id, options) {
        return dom.createElement(tagName, id, options)
    },
    createElementNS: function (tagName, id, options = {}) {
        options.NS = true;
        return dom.createElement(tagName, id, options)
    },
    setValue: function (key, value, options = {}) {
        options.reset = true;
        return storage.setValue(key, value, options)
    },
    saveArray: function(key, arr = [], idkey){
        if(idkey !== undefined && idkey !== '' && key !== undefined){
            arr.forEach(function (item) {
                cc.updateValue(item[idkey], item);
            })
        }
        return cc.setValue(key, arr);
    },
    updateValue: function(key, value, options = {}){
        return storage.setValue(key, value, options)
    },
    getValue:  function (key) {
        return storage.getValue(key);
    },
    setTimer: function (fn, delay) {
        return raf.requestTimeout(fn, delay)
    },
    cancelTimer: function (handle) {
        raf.clearRequestTimeout(handle);
    },
    request: function (params = {}) {
        return xhr.ajax(params);
    }

};

if(IS_WORKER){
    delete cc.select;
    delete cc.createElement;
    delete cc.createElementNS;
}else{
    let last = 0
    let frameTicker = function (timestamp) {
        cc.setValue('frame', timestamp, {immediately: true});
        //console.log(timestamp - last);
        last = timestamp;
        raf.requestTimeout(frameTicker, 16)
    };
    frameTicker(0);
}


export default cc;