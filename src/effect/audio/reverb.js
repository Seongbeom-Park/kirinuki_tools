import { LitElement, html, css } from 'lit';
export class SimpleAudioPlayer extends LitElement {
    static styles = css`
        /* Add your styles here */
    `;

    firstUpdated() {
        this.setupAudio();
    }

    setupAudio() {
        const audioElement = this.shadowRoot.querySelector('audio');
        const fileInput = this.shadowRoot.querySelector('input[type="file"]');

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const blobUrl = URL.createObjectURL(file);
                audioElement.src = blobUrl;
                audioElement.play();
            }
        });
    }

    render() {
        return html`
            <div>
                <div>Simple Audio Player</div>
                <input type="file">
                <audio controls>
                    Your browser does not support the audio element.
                </audio>
            </div>
        `;
    }
}

customElements.define('simple-audio-player', SimpleAudioPlayer);

export class AudioReverb extends LitElement {
    static styles = css`
        /* Add your styles here */
    `;

    firstUpdated() {
        this.setupAudio();
    }

    setupAudio() {
        const audioElement = this.shadowRoot.querySelector('audio');
        const fileInput = this.shadowRoot.querySelector('input[type="file"]');

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const blobUrl = URL.createObjectURL(file);
                audioElement.src = blobUrl;
                audioElement.addEventListener('play', () => {
                    audioElement.play();
                });

                // Apply echo effect
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const source = audioContext.createMediaElementSource(audioElement);
                const delay = audioContext.createDelay();
                const feedback = audioContext.createGain();
                const filter = audioContext.createBiquadFilter();

                delay.delayTime.value = 0.25; // 250ms delay
                feedback.gain.value = 0.5; // 50% feedback
                filter.frequency.value = 1000; // Low-pass filter at 1000Hz

                source.connect(delay);
                delay.connect(feedback);
                feedback.connect(filter);
                filter.connect(audioContext.destination);
                feedback.connect(delay); // Create feedback loop

                source.connect(audioContext.destination); // Directly connect source to destination
                console.log(audioContext.destination);
            }
        });
    }

    render() {
        return html`
            <div>
            <div>Reverb effect</div>
            <input type="file">
            <audio controls>
                Your browser does not support the audio element.
            </audio>
            </div>
        `;
    }
}


customElements.define('audio-reverb', AudioReverb);