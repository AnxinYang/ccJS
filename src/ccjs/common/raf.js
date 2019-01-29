const IS_WORKER = self.window === undefined;
const CONTEXT = IS_WORKER ? self : window;
var raf = {
    requestTimeout: function (fn, delay) {
        if (!CONTEXT.requestAnimationFrame)
            return setTimeout(fn, delay);

        var start = Date.now(),
            handle = new Object();

        function loop(timestamp) {
            (Date.now() - start) >= delay ? fn(timestamp) : handle.value = CONTEXT.requestAnimationFrame(loop);
        };

        handle.value = CONTEXT.requestAnimationFrame(loop);
        return handle;
    },
    clearRequestTimeout: function (handle) {
        CONTEXT.cancelAnimationFrame ? CONTEXT.cancelAnimationFrame(handle.value):clearTimeout(handle);
    }
};

export default raf;