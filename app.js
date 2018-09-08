// init speechSynth API
const speech = speechSynthesis;

// grab DOM elements
const body = document.querySelector('body');
const form = document.querySelector('form');
const textInput = document.querySelector('#textInput');
const voiceSelector = document.querySelector('#voice');
const speed = document.querySelector('#speed');
const speedValue = document.querySelector('#speed-value');
const tone = document.querySelector('#tone');
const toneValue = document.querySelector('#tone-value');

// init the voices array
let VOICES = [];

function fetchVoices() {
    VOICES = speech.getVoices();
    console.log(VOICES);
    // loop through each voice and create an option element for it
    VOICES.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + ' ' + '('+ voice.lang + ')';
        // set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelector.append(option);
    })
};

// for the sake of Firefox!
fetchVoices();

if (speech.onvoiceschanged !== undefined) {
    speech.onvoiceschanged = fetchVoices;
}

function speak() {
    // check if already speaking
    if (speech.speaking) {
        console.error('Already speaking');
       }
    if (textInput.value !== '') {
        // 'play' the GIF
        body.style.background = '#141414 url(images/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        // get the input text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        // Speak end
        speakText.onend = setBackgroundGif;
        // Speak error
        speakText.onerror = () => console.log('Something went wrong');
        // act on selected voice
        const selectedVoice = voiceSelector.selectedOptions[0].getAttribute('data-name');
        // iterate through voice options
        VOICES.forEach(voice => {
            if (voice.name == selectedVoice) {
                speakText.voice = voice;
            }
        });
        // set speed and tone
        speakText.rate = speed.value;
        speakText.pitch = tone.value;
        // Now: speak!
        speech.speak(speakText);
    }

}

function setBackgroundGif() {
    console.log('Done.');
    body.style.background = '#141414';
}

// 'submit' the form
form.addEventListener('submit', e => {
    e.preventDefault();
    speak();
});

// reflect speed and tone value changes
speed.addEventListener('change', e => speedValue.textContent = speed.value);
tone.addEventListener('change', e => toneValue.textContent = tone.value);

// switch to another voice and speak again
voiceSelector.addEventListener('change', e => speak());







