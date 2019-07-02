import cc from './ccjs/cc';
let root = cc.select('#body');
cc.setValue('test', 'green');
let mainContainer = root.add('div', 'test')
    .addClass('main-container')
    .bind('test', function (d) {
        this.css({
            height: '100vh',
            width: '100vw',
            background: d
        })
    });

