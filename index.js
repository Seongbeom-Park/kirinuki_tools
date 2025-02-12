import { addReverb } from './src/audio/reverb.js';

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('reverb').querySelector('#submit-button');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Submit button clicked');
        addReverb();
    });
});