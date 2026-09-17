// ==========================================================================
// Soda Pop - Saja Boys (K-Pop Demon Hunters) & Tic-Tac-Toe Engine
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

    const leadOsc = audioCtx.createOscillator();
    leadOsc.type = 'sawtooth';
    leadOsc.frequency.value = freq;

    const synthOsc = audioCtx.createOscillator();
    synthOsc.type = 'square';
    synthOsc.frequency.value = freq;

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

// Synthesize sound effects for Tic-Tac-Toe
function playMoveSound(mark) {
    initAudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = mark === 'X' ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(mark === 'X' ? 587.33 : 440, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(mark === 'X' ? 880 : 330, audioCtx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
}

function playWinSound() {
    initAudioContext();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const startTime = audioCtx.currentTime + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
    });
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

// ==========================================================================
// Tic-Tac-Toe Game Controller
// ==========================================================================

let boardState = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let vsAi = false;
let scores = { X: 0, O: 0, ties: 0 };

const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (boardState[index] !== '' || !gameActive) return;

    makeMove(index, currentPlayer);

    if (gameActive && vsAi && currentPlayer === 'O') {
        setTimeout(makeAiMove, 350);
    }
}

function makeMove(index, player) {
    boardState[index] = player;
    playMoveSound(player);
    renderBoard();

    const winCombo = checkWin(player);
    if (winCombo) {
        handleWin(player, winCombo);
    } else if (boardState.every(cell => cell !== '')) {
        handleTie();
    } else {
        currentPlayer = player === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

function makeAiMove() {
    if (!gameActive) return;

    // 1. Can AI win?
    for (let combo of WINNING_COMBOS) {
        const [a, b, c] = combo;
        const vals = [boardState[a], boardState[b], boardState[c]];
        if (vals.filter(v => v === 'O').length === 2 && vals.includes('')) {
            const emptyIdx = combo[vals.indexOf('')];
            makeMove(emptyIdx, 'O');
            return;
        }
    }

    // 2. Block player X from winning
    for (let combo of WINNING_COMBOS) {
        const [a, b, c] = combo;
        const vals = [boardState[a], boardState[b], boardState[c]];
        if (vals.filter(v => v === 'X').length === 2 && vals.includes('')) {
            const emptyIdx = combo[vals.indexOf('')];
            makeMove(emptyIdx, 'O');
            return;
        }
    }

    // 3. Take Center if open
    if (boardState[4] === '') {
        makeMove(4, 'O');
        return;
    }

    // 4. Random available cell
    const emptyIndices = boardState
        .map((val, idx) => (val === '' ? idx : null))
        .filter(val => val !== null);

    if (emptyIndices.length > 0) {
        const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        makeMove(randomIdx, 'O');
    }
}

function checkWin(player) {
    return WINNING_COMBOS.find(combo => {
        return combo.every(index => boardState[index] === player);
    });
}

function handleWin(winner, combo) {
    gameActive = false;
    scores[winner]++;
    updateScores();
    playWinSound();

    const statusBox = document.getElementById('gameStatus');
    statusBox.innerHTML = `🎉 Player <span class="player-mark ${winner.toLowerCase()}-mark">${winner}</span> Wins! 🎉`;

    const cells = document.querySelectorAll('.cell');
    combo.forEach(idx => cells[idx].classList.add('winning'));
}

function handleTie() {
    gameActive = false;
    scores.ties++;
    updateScores();

    const statusBox = document.getElementById('gameStatus');
    statusBox.innerHTML = `🤝 It's a Tie! 🤝`;
}

function updateStatus() {
    const statusBox = document.getElementById('gameStatus');
    statusBox.innerHTML = `Player <span class="player-mark ${currentPlayer.toLowerCase()}-mark">${currentPlayer}</span>'s Turn`;
}

function updateScores() {
    document.getElementById('scoreX').textContent = scores.X;
    document.getElementById('scoreO').textContent = scores.O;
    document.getElementById('scoreTies').textContent = scores.ties;
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, idx) => {
        cell.textContent = boardState[idx];
        cell.className = 'cell';
        if (boardState[idx] === 'X') cell.classList.add('x');
        if (boardState[idx] === 'O') cell.classList.add('o');
    });
}

function resetGame() {
    boardState = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    updateStatus();
    renderBoard();
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {
    createBubbles();

    // Music button
    const musicBtn = document.getElementById('musicBtn');
    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            playSodaPop();
        });
    }

    // Autoplay attempt
    const startAutoplay = () => {
        playSodaPop();
        document.removeEventListener('click', startAutoplay);
        document.removeEventListener('keydown', startAutoplay);
    };
    playSodaPop();
    document.addEventListener('click', startAutoplay, { once: true });
    document.addEventListener('keydown', startAutoplay, { once: true });

    // Tic-Tac-Toe setup
    const board = document.getElementById('board');
    if (board) {
        board.addEventListener('click', (e) => {
            if (e.target.classList.contains('cell')) {
                handleCellClick(e);
            }
        });
    }

    const resetBtn = document.getElementById('resetGameBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetGame);
    }

    // Mode Selector
    const modePvp = document.getElementById('modePvp');
    const modeAi = document.getElementById('modeAi');

    if (modePvp && modeAi) {
        modePvp.addEventListener('click', () => {
            vsAi = false;
            modePvp.classList.add('active');
            modeAi.classList.remove('active');
            resetGame();
        });

        modeAi.addEventListener('click', () => {
            vsAi = true;
            modeAi.classList.add('active');
            modePvp.classList.remove('active');
            resetGame();
        });
    }
});
