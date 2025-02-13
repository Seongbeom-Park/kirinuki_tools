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

                const delayInput = this.shadowRoot.querySelector('#delay');
                const feedbackInput = this.shadowRoot.querySelector('#feedback');
                const filterInput = this.shadowRoot.querySelector('#filter');

                delayInput.addEventListener('input', () => {
                    delay.delayTime.value = parseFloat(delayInput.value);
                    this.shadowRoot.querySelector('#delay-value').textContent = delayInput.value;
                });

                feedbackInput.addEventListener('input', () => {
                    feedback.gain.value = parseFloat(feedbackInput.value);
                    this.shadowRoot.querySelector('#feedback-value').textContent = feedbackInput.value;
                });

                filterInput.addEventListener('input', () => {
                    filter.frequency.value = parseFloat(filterInput.value);
                    this.shadowRoot.querySelector('#filter-value').textContent = filterInput.value;
                });

                // Set initial values
                delay.delayTime.value = parseFloat(delayInput.value) || 0.1;
                feedback.gain.value = parseFloat(feedbackInput.value) || 0.4;
                filter.frequency.value = parseFloat(filterInput.value) || 1000;

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
            <table>
                <tr>
                <td><label for="delay">Delay:</label></td>
                <td><input type="range" id="delay" min="0" max="1" step="0.01" value="0.1"></td>
                <td><span id="delay-value">0.1</span></td>
                </tr>
                <tr>
                <td><label for="feedback">Feedback:</label></td>
                <td><input type="range" id="feedback" min="0" max="1" step="0.01" value="0.4"></td>
                <td><span id="feedback-value">0.4</span></td>
                </tr>
                <tr>
                <td><label for="filter">Filter Frequency:</label></td>
                <td><input type="range" id="filter" min="20" max="20000" step="1" value="1000"></td>
                <td><span id="filter-value">1000</span></td>
                </tr>
            </table>
            </div>
        `;
    }
}


customElements.define('audio-reverb', AudioReverb);