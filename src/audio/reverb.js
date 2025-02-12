const fs = require('fs');
const { AudioContext } = require('web-audio-api');

function addReverb(inputFilePath, outputFilePath, reverbDuration = 2.0) {
    const context = new AudioContext();
    const inputBuffer = fs.readFileSync(inputFilePath);
    
    context.decodeAudioData(inputBuffer, (audioBuffer) => {
        const source = context.createBufferSource();
        source.buffer = audioBuffer;

        const convolver = context.createConvolver();
        const reverbBuffer = context.createBuffer(2, context.sampleRate * reverbDuration, context.sampleRate);
        
        for (let channel = 0; channel < reverbBuffer.numberOfChannels; channel++) {
            const channelData = reverbBuffer.getChannelData(channel);
            for (let i = 0; i < channelData.length; i++) {
                channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / channelData.length, 2);
            }
        }

        convolver.buffer = reverbBuffer;
        source.connect(convolver);
        convolver.connect(context.destination);

        source.start(0);

        context.startRendering().then(renderedBuffer => {
            const outputBuffer = Buffer.from(renderedBuffer.getChannelData(0).buffer);
            fs.writeFileSync(outputFilePath, outputBuffer);
            console.log('Reverb effect added and file saved to', outputFilePath);
        }).catch(err => {
            console.error('Rendering failed: ' + err);
        });
    }, (err) => {
        console.error('Decoding failed: ' + err);
    });
}

module.exports = addReverb;