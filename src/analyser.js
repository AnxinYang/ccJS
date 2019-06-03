function analyser(Container) {
    // Establish all variables that your Analyser will use
    let canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_x2,bar_width, bar_height, isInit;
    canvas = Container.add('canvas')
        .attr({
            height: 100,
            width: Container.getBoundingClientRect().width
        })
        .css({
            width: '100%',
            height: '100px',
            pointerEvents:   'none',
        })
        .bind('play', function (d) {
            if(d){
                isInit = isInit?true:initMp3Player();
                audio.play();
            }else {
                audio.pause();
            }
        })
        .bind('viewport', function () {
            this.attr({
                width: Container.getBoundingClientRect().width
            })
        });
    ctx = canvas.getContext('2d');
    let gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, "rgba(255,0,80,0.1)");
    gradient.addColorStop(1, "rgba(255,0,80,0.5)");

    // Create a new instance of an audio object and adjust some of its properties
    let audio = new Audio();
    audio.src = `./res/${cc.utils.getUrlVar('music', 'Bohemian Rhapsody')}.${cc.utils.getUrlVar('format', 'aac')}`;
    audio.controls = true;
    audio.loop = true;
    audio.autoplay = false;

    function initMp3Player() {
        //document.getElementById('audio_box').appendChild(audio);
        context = new AudioContext(); // AudioContext object instance
        analyser = context.createAnalyser(); // AnalyserNode method
        ctx = canvas.getContext('2d');
        // Re-route audio playback into the processing graph of the AudioContext
        source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
        frameLooper();
        return true;
    }

    function frameLooper() {
        window.requestAnimationFrame(frameLooper);
        fbc_array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbc_array);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        bar_width = 5;
        bars = canvas.width/bar_width;
        //bar_width = canvas.width / (bars);
        for (var i = 0; i < bars; i++) {
            bar_x = i * bar_width;
            //bar_x2 = (canvas.width) - i * bar_width;
            bar_height = -(fbc_array[i]*canvas.height/255) - 2;
            ctx.fillStyle = gradient;
            ctx.fillRect(bar_x, canvas.height, bar_width-1, bar_height<-70?bar_height: bar_height*0.9);
            //ctx.fillRect(bar_x2, canvas.height, bar_width, bar_height<-70?bar_height: bar_height*0.9);
            if(bar_height<-70){
                let gradientHit = ctx.createLinearGradient(bar_x-10, 0, bar_x+10, 0);
                gradientHit.addColorStop(0, "rgba(255,0,80,0)");
                gradientHit.addColorStop(0.25, "rgba(255,0,80,0)");
                gradientHit.addColorStop(0.5, "rgba(255,0,80,0.8)");
                gradientHit.addColorStop(0.75, "rgba(255,0,80,0)");
                gradientHit.addColorStop(1, "rgba(255,0,80,0)");
                ctx.fillStyle = gradientHit;
                ctx.fillRect(bar_x-10, 1, 20, 1);
               //  let gradientHit2 = ctx.createLinearGradient(bar_x2-5, 0, bar_x2+5, 0);
               //  gradientHit2.addColorStop(0, "rgba(255,0,80,0)");
               //  gradientHit2.addColorStop(0.25, "rgba(255,0,80,0)");
               //  gradientHit2.addColorStop(0.5, "rgba(255,0,80,0.8)");
               //  gradientHit2.addColorStop(0.75, "rgba(255,0,80,0)");
               //  gradientHit2.addColorStop(1, "rgba(255,0,80,0)");
               //  ctx.fillStyle = gradientHit2;
               // ctx.fillRect(bar_x2-5, 1, 10, 1);
            }
        }
    }
}

export default analyser;