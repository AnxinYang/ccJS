import cc from './ccjs/cc';


let root = cc.select('#body');
let test = cc.createElement('div', 'test');
root.appendChild(test);
test.css({
    background: '',
    height: '100vh',
    width: '100vw',
    transition: '0.3s'
})
    .bind('test', function (d) {
        this.css({
            background: d,
        })
    });
setTimeout(function () {
    cc.setValue('test', 'red');
}, 100);