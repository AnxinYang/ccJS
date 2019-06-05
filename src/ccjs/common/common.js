const IS_WORKER = self.window === undefined;
const CONTEXT = IS_WORKER ? self : window;
const common = {};

common.objectforEach = function(obj,fn){
    for(var key in obj) {
        if (obj.hasOwnProperty(key)) {
            fn(obj[key], key, obj);
        }
    }
};

common.objectAssign = function(target = {}, source){
    for(let key in source) {
        if (source.hasOwnProperty(key)) {
            target[key] = source[key]
        }
    }
    return target;
};

common.createId = function(){
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

common.isObject = function (item) {
    return (item!==undefined && item === Object(item) && !(item instanceof Array))
};

common.getBrowser = function() {
    let isIE = false;
    let isChrome = false;
    let isOpera = false;
    if ((!!CONTEXT.opr && !!opr.addons) || !!CONTEXT.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
        isOpera = true;
        return 'opera';
    }
    if (typeof InstallTrigger !== 'undefined') {
        return 'firefox';
    }
    if (/constructor/i.test(CONTEXT.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
    })(!CONTEXT['safari'] || safari.pushNotification)) {
        return 'safari';
    }
    if (false || !!document.documentMode) {
        Object.assign = function () {
            var output = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                for (var key in arguments[i]) {
                    var obj = arguments[i];
                    if (obj.hasOwnProperty(key))
                        output[key] = obj[key];
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
        isChrome = true
        return 'chrome';
    }
    if ((isChrome || isOpera) && !!CONTEXT.CSS) {
        return 'blink';
    }
};

common.readValue = function(value, options = {}){
    if(typeof value === "function"){
        return value(options);
    }else{
        return value;
    }
};

common.getUrlVar = function (key, defaultValue) {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return (vars[key] === undefined? defaultValue: vars[key]);
};

export default common;