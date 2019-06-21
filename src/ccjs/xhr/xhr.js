const xhr = {
    ajax: function (params = {}) {
        return new Promise(function (resolve, reject) {
            let {url, method, data, async, xhr, contentType, dataType, done, fail} = params || {};
            let {header, onProgress, beforeSend} = params;
            let request = new XMLHttpRequest();
            request.open((method || 'GET'), url, async === undefined ? true : async);

            for (var key in (header || {})) {
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
                let p = Math.floor(e.loaded / e.total * 100);
                onProgress && onProgress(p, e);
            };

            let _data;
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
    },
};

function parseData(data) {
    try{
        return JSON.parse(data || '')
    }catch (e) {
        return undefined
    }
}

export default xhr;
