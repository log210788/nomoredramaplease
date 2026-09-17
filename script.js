// ==========================================================================
// Synthesized "Happy Birthday" Audio Player (Web Audio API)
// ==========================================================================

const noteFrequencies = {
    'C4': 261.63,
    'D4': 293.66,
    'E4': 329.63,
    'F4': 349.23,
    'G4': 392.00,
    'A4': 440.00,
    'Bb4': 466.16,
    'C5': 523.25,
    'D5': 587.33
};

const happyBirthdayNotes = [
    // Phrase 1: Happy Birthday to you
    { note: 'C4', duration: 0.35 },
    { note: 'C4', duration: 0.20 },
    { note: 'D4', duration: 0.55 },
    { note: 'C4', duration: 0.55 },
    { note: 'F4', duration: 0.55 },
    { note: 'E4', duration: 1.10 },

    // Phrase 2: Happy Birthday to you
    { note: 'C4', duration: 0.35 },
    { note: 'C4', duration: 0.20 },
    { note: 'D4', duration: 0.55 },
    { note: 'C4', duration: 0.55 },
    { note: 'G4', duration: 0.55 },
    { note: 'F4', duration: 1.10 },

    // Phrase 3: Happy Birthday dear Teacher Lewis
    { note: 'C4', duration: 0.35 },
    { note: 'C4', duration: 0.20 },
    { note: 'C5', duration: 0.55 },
    { note: 'A4', duration: 0.55 },
    { note: 'F4', duration: 0.55 },
    { note: 'E4', duration: 0.55 },
    { note: 'D4', duration: 1.10 },

    // Phrase 4: Happy Birthday to you
    { note: 'Bb4', duration: 0.35 },
    { note: 'Bb4', duration: 0.20 },
    { note: 'A4', duration: 0.55 },
    { note: 'F4', duration: 0.55 },
    { note: 'G4', duration: 0.55 },
    { note: 'F4', duration: 1.40 }
];

let audioCtx = null;
let isPlaying = false;

function initAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
    }
}

function playSynthesizedNote(freq, startTime, duration) {
    if (!freq) return;

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Soft warm synth voice (Triangle + Sine octave blend)
    osc1.type = 'triangle';
    osc1.frequency.value = freq;

    osc2.type = 'sine';
    osc2.frequency.value = freq * 0.5; // Sub-octave warmth

    const attack = 0.04;
    const release = 0.12;

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.3, startTime + attack);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration + release);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + release);
    osc2.stop(startTime + duration + release);
}

function playHappyBirthday() {
    initAudioContext();

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    if (isPlaying) return;
    isPlaying = true;

    let currentTime = audioCtx.currentTime + 0.1;

    happyBirthdayNotes.forEach((item) => {
        const freq = noteFrequencies[item.note];
        playSynthesizedNote(freq, currentTime, item.duration);
        currentTime += item.duration + 0.05; // slight pause between notes
    });

    const totalDuration = (currentTime - audioCtx.currentTime) * 1000;
    setTimeout(() => {
        isPlaying = false;
    }, totalDuration);
}

// Attempt immediate playback on load & handle browser autoplay policies
document.addEventListener('DOMContentLoaded', () => {
    const musicBtn = document.getElementById('musicBtn');

    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            playHappyBirthday();
        });
    }

    // Try autoplay on page open
    const startAutoplay = () => {
        playHappyBirthday();
        // Remove interaction listeners once audio starts
        document.removeEventListener('click', startAutoplay);
        document.removeEventListener('keydown', startAutoplay);
    };

    // Attempt direct play
    playHappyBirthday();

    // Fallback: If browser blocks un-muted autoplay, trigger on first user click or touch anywhere on the page
    document.addEventListener('click', startAutoplay, { once: true });
    document.addEventListener('keydown', startAutoplay, { once: true });
});
