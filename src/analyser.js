function analyser(Container) {
    // Establish all variables that your Analyser will use
    let canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
    canvas = Container.add('canvas')
        .css({
            width: '100%',
            height: '100px'
        });
    ctx = canvas.getContext('2d');
    let gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, "rgba(255,0,80,0.1)");
    gradient.addColorStop(1, "rgba(255,0,80,0.5)");

    // Create a new instance of an audio object and adjust some of its properties
    let audio = new Audio();
    audio.src = 'gokuraku.mp3';
    audio.controls = true;
    audio.loop = true;
    audio.autoplay = true;

// Initialize the MP3 player after the page loads all of its HTML into the window
    window.addEventListener("load", initMp3Player, false);

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
    }

    function frameLooper() {
        window.requestAnimationFrame(frameLooper);
        fbc_array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(fbc_array);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        //bars = 1000;
        bar_width = canvas.getBoundingClientRect().width / (fbc_array.length * 3);
        for (var i = 0; i < fbc_array.length; i++) {
            bar_x = i;
            bar_height = -(fbc_array[i] / 2);
            ctx.fillStyle = gradient;
            ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
            if(bar_height<-100){
                let gradientHit = ctx.createLinearGradient(bar_x-5, 0, bar_x+5, 0);
                gradientHit.addColorStop(0, "rgba(255,0,80,0)");
                gradientHit.addColorStop(0.25, "rgba(255,0,80,0)");
                gradientHit.addColorStop(0.5, "rgba(255,0,80,0.8)");
                gradientHit.addColorStop(0.75, "rgba(255,0,80,0)");
                gradientHit.addColorStop(1, "rgba(255,0,80,0)");
                ctx.fillStyle = gradientHit;
                ctx.fillRect(bar_x-5, 1, 10, 1);
            }
        }
    }
}

export default analyser;