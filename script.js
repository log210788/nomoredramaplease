// ==========================================================================
// Soda Pop - Saja Boys (K-Pop Demon Hunters) Web Audio Synthesizer
// ==========================================================================

const noteFrequencies = {
    'F2': 87.31,
    'G2': 98.00,
    'A2': 110.00,
    'Bb2': 116.54,
    'C3': 130.81,
    'D3': 146.83,
    'E3': 164.81,
    'F3': 174.61,
    'G3': 196.00,
    'A3': 220.00,
    'Bb3': 233.08,
    'C4': 261.63,
    'D4': 293.66,
    'E4': 329.63,
    'F4': 349.23,
    'G4': 392.00,
    'A4': 440.00,
    'Bb4': 466.16,
    'C5': 523.25,
    'D5': 587.33,
    'E5': 659.25,
    'F5': 698.46
};

// Saja Boys - "Soda Pop" Chorus Melody Sequence
const sodaPopMelody = [
    // "You're all I can think of"
    { note: 'A4', duration: 0.22, bass: 'F2' },
    { note: 'A4', duration: 0.22 },
    { note: 'A4', duration: 0.22, bass: 'F2' },
    { note: 'C5', duration: 0.35 },
    { note: 'A4', duration: 0.35, bass: 'C3' },

    // "Every drop I drink up"
    { note: 'G4', duration: 0.22, bass: 'C3' },
    { note: 'G4', duration: 0.22 },
    { note: 'G4', duration: 0.22, bass: 'D3' },
    { note: 'A4', duration: 0.35 },
    { note: 'F4', duration: 0.35, bass: 'Bb2' },

    // "You're my soda pop"
    { note: 'F4', duration: 0.22, bass: 'Bb2' },
    { note: 'G4', duration: 0.22 },
    { note: 'A4', duration: 0.45, bass: 'C3' },
    { note: 'C5', duration: 0.45 },

    // "My little soda pop"
    { note: 'D5', duration: 0.35, bass: 'F2' },
    { note: 'C5', duration: 0.22 },
    { note: 'A4', duration: 0.22, bass: 'C3' },
    { note: 'G4', duration: 0.22 },
    { note: 'F4', duration: 0.65, bass: 'F2' },

    // "Cool me down, you're so hot"
    { note: 'A4', duration: 0.22, bass: 'F2' },
    { note: 'A4', duration: 0.22 },
    { note: 'A4', duration: 0.22, bass: 'F2' },
    { note: 'C5', duration: 0.35 },
    { note: 'A4', duration: 0.35, bass: 'C3' },

    // "Pour me up, I won't stop"
    { note: 'G4', duration: 0.22, bass: 'C3' },
    { note: 'G4', duration: 0.22 },
    { note: 'G4', duration: 0.22, bass: 'D3' },
    { note: 'A4', duration: 0.35 },
    { note: 'F4', duration: 0.35, bass: 'Bb2' },

    // "You're my soda pop"
    { note: 'F4', duration: 0.22, bass: 'Bb2' },
    { note: 'G4', duration: 0.22 },
    { note: 'A4', duration: 0.45, bass: 'C3' },
    { note: 'C5', duration: 0.45 },

    // "My little soda pop!"
    { note: 'D5', duration: 0.35, bass: 'F2' },
    { note: 'C5', duration: 0.22 },
    { note: 'A4', duration: 0.22, bass: 'C3' },
    { note: 'G4', duration: 0.35 },
    { note: 'F4', duration: 0.85, bass: 'F2' }
];

let audioCtx = null;
let isPlaying = false;

function initAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
    }
}

// Synthesize energetic K-Pop synth lead & sub-bass
function playKPopSynthNote(freq, bassFreq, startTime, duration) {
    if (!freq) return;

    // Lead Oscillator 1: Sawtooth (Bright K-Pop Lead)
    const leadOsc = audioCtx.createOscillator();
    leadOsc.type = 'sawtooth';
    leadOsc.frequency.value = freq;

    // Lead Oscillator 2: Square wave (Punchy layered synth)
    const synthOsc = audioCtx.createOscillator();
    synthOsc.type = 'square';
    synthOsc.frequency.value = freq;

    // Lowpass filter envelope for snappy synth sound
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, startTime);
    filter.frequency.exponentialRampToValueAtTime(400, startTime + duration);

    const leadGain = audioCtx.createGain();
    leadGain.gain.setValueAtTime(0, startTime);
    leadGain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
    leadGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration + 0.05);

    leadOsc.connect(filter);
    synthOsc.connect(filter);
    filter.connect(leadGain);
    leadGain.connect(audioCtx.destination);

    leadOsc.start(startTime);
    synthOsc.start(startTime);
    leadOsc.stop(startTime + duration + 0.05);
    synthOsc.stop(startTime + duration + 0.05);

    // Sub-bass line
    if (bassFreq) {
        const bassOsc = audioCtx.createOscillator();
        const bassGain = audioCtx.createGain();

        bassOsc.type = 'triangle';
        bassOsc.frequency.value = bassFreq;

        bassGain.gain.setValueAtTime(0, startTime);
        bassGain.gain.linearRampToValueAtTime(0.35, startTime + 0.02);
        bassGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration + 0.1);

        bassOsc.connect(bassGain);
        bassGain.connect(audioCtx.destination);

        bassOsc.start(startTime);
        bassOsc.stop(startTime + duration + 0.1);
    }
}

function playSodaPop() {
    initAudioContext();

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    if (isPlaying) return;
    isPlaying = true;

    const statusText = document.getElementById('status');
    if (statusText) statusText.classList.add('visible');

    let currentTime = audioCtx.currentTime + 0.1;

    sodaPopMelody.forEach((item) => {
        const freq = noteFrequencies[item.note];
        const bassFreq = item.bass ? noteFrequencies[item.bass] : null;
        playKPopSynthNote(freq, bassFreq, currentTime, item.duration);
        currentTime += item.duration + 0.04;
    });

    const totalDuration = (currentTime - audioCtx.currentTime) * 1000;
    setTimeout(() => {
        isPlaying = false;
        if (statusText) statusText.classList.remove('visible');
    }, totalDuration);
}

// Generate animated floating soda bubbles
function createBubbles() {
    const container = document.getElementById('bubbles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 25 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${Math.random() * 5 + 4}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(bubble);
    }
}

// Autoplay and click handler
document.addEventListener('DOMContentLoaded', () => {
    createBubbles();

    const musicBtn = document.getElementById('musicBtn');
    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            playSodaPop();
        });
    }

    const startAutoplay = () => {
        playSodaPop();
        document.removeEventListener('click', startAutoplay);
        document.removeEventListener('keydown', startAutoplay);
    };

    playSodaPop();

    document.addEventListener('click', startAutoplay, { once: true });
    document.addEventListener('keydown', startAutoplay, { once: true });
});
