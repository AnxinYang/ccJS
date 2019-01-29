const xhr = {
    ajax: function (params = {}) {
        let {url, method, data, ref, async, xhr, contentType, noAuth, dataType, processData, cache, noJSON, ajax, done, fail, heavy} = params || {};
        let {header, onProgress, beforeSend} = params;
        let request = new XMLHttpRequest();
        request.open((method || 'GET'), url, async === undefined ? true : async);

        for (var key in (header || {})) {
            if ((header || {}).hasOwnProperty(key)) {
                request.setRequestHeader(key, header[key]);
            }
        }

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                done(request);
            }else {
                fail(request)
            }
        };

        request.onerror = function () {
            fail(request)
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
        return request;
    }
}


export default xhr;
