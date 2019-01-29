import common from '../common/common';

var storage = {
    dataMap: new Map(),
    timerMap:  new Map(),
    setValue: function (key, value, options = {}) {
        let self = this;
        let dataMap = this.dataMap;
        let {reset} = options;
        let shouldReact = false;
        let oldValue = dataMap.get(key);
        if(common.isObject(value) && common.isObject(oldValue) && reset !== true) {
            common.objectforEach(value, function (item, key, obj) {
                if (item !== value) {
                    shouldReact = true;
                }
                obj[key] = value[key]
            })

        }else {
            shouldReact = true;
            dataMap.set(key, value);
        }

        let newValue = dataMap.get(key);

        if(shouldReact) {
           this.broadcast(key, newValue, options);
        }

        return newValue;
    },
    broadcast: function(key, newValue, options = {}){
        let self = this;
        let timer = this.timerMap.get(key);

        if (timer) {
            cc.cancelTimer(timer);
        }

        timer = cc.setTimer(function () {
            let doms = document.getElementsByClassName('storage_' + key) || [];
            for (let i = 0; i < doms.length; i++) {
                let dom = doms[i];
                dom._react && dom._react(key, newValue);
            }
            self.timerMap.delete(key);
        }, options.immediately? 0: 10);

        this.timerMap.set(key, timer);
    },
    getValue: function (key) {
        return this.dataMap.get(key);
    }
};

export default storage;