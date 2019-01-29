import cc from './ccjs/cc';


let root = cc.select('#body');
let test = cc.createElement('div', 'test');
root.appendChild(test);
test.css({
    background: 'black',
    height: '100vh',
    width: '100vw',
})
    .data({
        animationCounter: 0,
    })
    .bind('frame', function (d) {
        let counter = this.getData().animationCounter;
        if(counter >= 255){
            this.unbind('frame')
        }
        this.css({
            background: 'rgba(' + counter + ',' + counter + ',' + counter + ',1)',
        });
        this.data({animationCounter:counter+10});
    });
