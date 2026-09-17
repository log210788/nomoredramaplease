// ==========================================================================
// Cubes & Cuboids School Presentation - Interactive Math Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Floating Particles Background
    createParticles();

    // DOM Elements
    const selectCube = document.getElementById('selectCube');
    const selectCuboid = document.getElementById('selectCuboid');

    const groupWidth = document.getElementById('groupWidth');
    const groupHeight = document.getElementById('groupHeight');

    const inputLength = document.getElementById('inputLength');
    const inputWidth = document.getElementById('inputWidth');
    const inputHeight = document.getElementById('inputHeight');

    const valLength = document.getElementById('valLength');
    const valWidth = document.getElementById('valWidth');
    const valHeight = document.getElementById('valHeight');

    const resVolume = document.getElementById('resVolume');
    const resArea = document.getElementById('resArea');
    const resEdges = document.getElementById('resEdges');

    const formulaVol = document.getElementById('formulaVol');
    const formulaArea = document.getElementById('formulaArea');
    const formulaEdges = document.getElementById('formulaEdges');

    const cube3d = document.getElementById('cube3d');

    let currentShape = 'cube'; // 'cube' or 'cuboid'

    // Shape Selection Toggle
    selectCube.addEventListener('click', () => {
        currentShape = 'cube';
        selectCube.classList.add('active');
        selectCuboid.classList.remove('active');

        groupWidth.classList.add('hidden-cuboid');
        groupHeight.classList.add('hidden-cuboid');
        groupWidth.style.display = 'none';
        groupHeight.style.display = 'none';

        formulaVol.textContent = 'Formula: V = s³';
        formulaArea.textContent = 'Formula: SA = 6s²';
        formulaEdges.textContent = '12 equal edges (12 × s)';

        updateCalculator();
    });

    selectCuboid.addEventListener('click', () => {
        currentShape = 'cuboid';
        selectCuboid.classList.add('active');
        selectCube.classList.remove('active');

        groupWidth.style.display = 'flex';
        groupHeight.style.display = 'flex';

        formulaVol.textContent = 'Formula: V = l × w × h';
        formulaArea.textContent = 'Formula: SA = 2(lw + lh + wh)';
        formulaEdges.textContent = '4l + 4w + 4h';

        updateCalculator();
    });

    // Inputs listener
    [inputLength, inputWidth, inputHeight].forEach(input => {
        input.addEventListener('input', updateCalculator);
    });

    function updateCalculator() {
        const l = parseFloat(inputLength.value);
        const w = parseFloat(inputWidth.value);
        const h = parseFloat(inputHeight.value);

        valLength.textContent = l;
        valWidth.textContent = w;
        valHeight.textContent = h;

        let volume, area, edges;

        if (currentShape === 'cube') {
            volume = Math.pow(l, 3);
            area = 6 * Math.pow(l, 2);
            edges = 12 * l;

            // 3D Scale Visualizer
            const scale = Math.min(1.4, Math.max(0.6, l / 5));
            cube3d.style.width = `${100 * scale}px`;
            cube3d.style.height = `${100 * scale}px`;

            // Adjust faces translateZ
            const tz = 50 * scale;
            updateCubeFaces(tz, 100 * scale, 100 * scale);
        } else {
            volume = l * w * h;
            area = 2 * (l * w + l * h + w * h);
            edges = 4 * (l + w + h);

            // 3D Scale Visualizer for Cuboid
            const scaleX = l / 5;
            const scaleY = h / 5;
            const scaleZ = w / 5;

            cube3d.style.width = `${100 * scaleX}px`;
            cube3d.style.height = `${100 * scaleY}px`;

            updateCuboidFaces(100 * scaleX, 100 * scaleY, 100 * scaleZ);
        }

        resVolume.textContent = `${volume.toFixed(1)} cm³`;
        resArea.textContent = `${area.toFixed(1)} cm²`;
        resEdges.textContent = `${edges.toFixed(1)} cm`;
    }

    function updateCubeFaces(tz, w, h) {
        const faces = cube3d.querySelectorAll('.face');
        faces.forEach(face => {
            face.style.width = `${w}px`;
            face.style.height = `${h}px`;
        });
        cube3d.querySelector('.front').style.transform = `translateZ(${tz}px)`;
        cube3d.querySelector('.back').style.transform = `rotateY(180deg) translateZ(${tz}px)`;
        cube3d.querySelector('.right').style.transform = `rotateY(90deg) translateZ(${tz}px)`;
        cube3d.querySelector('.left').style.transform = `rotateY(-90deg) translateZ(${tz}px)`;
        cube3d.querySelector('.top').style.transform = `rotateX(90deg) translateZ(${tz}px)`;
        cube3d.querySelector('.bottom').style.transform = `rotateX(-90deg) translateZ(${tz}px)`;
    }

    function updateCuboidFaces(w, h, d) {
        const front = cube3d.querySelector('.front');
        const back = cube3d.querySelector('.back');
        const right = cube3d.querySelector('.right');
        const left = cube3d.querySelector('.left');
        const top = cube3d.querySelector('.top');
        const bottom = cube3d.querySelector('.bottom');

        const tz = d / 2;
        const tx = w / 2;
        const ty = h / 2;

        front.style.width = `${w}px`; front.style.height = `${h}px`;
        front.style.transform = `translateZ(${tz}px)`;

        back.style.width = `${w}px`; back.style.height = `${h}px`;
        back.style.transform = `rotateY(180deg) translateZ(${tz}px)`;

        right.style.width = `${d}px`; right.style.height = `${h}px`;
        right.style.transform = `rotateY(90deg) translateZ(${tx}px)`;

        left.style.width = `${d}px`; left.style.height = `${h}px`;
        left.style.transform = `rotateY(-90deg) translateZ(${tx}px)`;

        top.style.width = `${w}px`; top.style.height = `${d}px`;
        top.style.transform = `rotateX(90deg) translateZ(${ty}px)`;

        bottom.style.width = `${w}px`; bottom.style.height = `${d}px`;
        bottom.style.transform = `rotateX(-90deg) translateZ(${ty}px)`;
    }

    // Initial setup
    groupWidth.style.display = 'none';
    groupHeight.style.display = 'none';
    updateCalculator();

    // ==========================================================================
    // Interactive Quiz Engine with Heart Burst Animation
    // ==========================================================================

    const quizQuestions = [
        {
            question: "Question 1: How many vertices (corners) does a cube have?",
            options: ["6", "8", "12"],
            answer: "8"
        },
        {
            question: "Question 2: What is the formula for the volume of a Cube with side length 's'?",
            options: ["6 × s", "s²", "s³"],
            answer: "s³"
        },
        {
            question: "Question 3: If a cube has a side length of 3 cm, what is its Volume?",
            options: ["9 cm³", "27 cm³", "54 cm³"],
            answer: "27 cm³"
        }
    ];

    let currentQ = 0;
    const qText = document.getElementById('quizQuestion');
    const qOptions = document.getElementById('quizOptions');
    const qFeedback = document.getElementById('quizFeedback');

    function renderQuiz() {
        if (currentQ >= quizQuestions.length) {
            qText.textContent = "🎉 Quiz Complete! You are ready for your Cube Presentation! 🌟";
            qOptions.innerHTML = `<button id="retryQuiz" class="quiz-btn">🔄 Retry Quiz</button>`;
            qFeedback.textContent = "";

            // Celebrate quiz completion with double heart burst!
            spawnHeartExplosion();
            setTimeout(spawnHeartExplosion, 500);

            document.getElementById('retryQuiz').addEventListener('click', () => {
                currentQ = 0;
                renderQuiz();
            });
            return;
        }

        const q = quizQuestions[currentQ];
        qText.textContent = q.question;
        qFeedback.textContent = "";
        qOptions.innerHTML = "";

        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-btn';
            btn.textContent = opt;
            btn.addEventListener('click', () => {
                if (opt === q.answer) {
                    btn.classList.add('correct');
                    qFeedback.textContent = "💖 Correct! Amazing job! 💖";
                    qFeedback.style.color = "#10b981";

                    // Spawn Full Screen Heart Burst!
                    spawnHeartExplosion();

                    setTimeout(() => {
                        currentQ++;
                        renderQuiz();
                    }, 1800);
                } else {
                    btn.classList.add('wrong');
                    qFeedback.textContent = "❌ Not quite! Try again.";
                    qFeedback.style.color = "#ef4444";
                }
            });
            qOptions.appendChild(btn);
        });
    }

    renderQuiz();
});

// Full Screen Heart Emoji Explosion Function
function spawnHeartExplosion() {
    const heartOverlay = document.createElement('div');
    heartOverlay.className = 'heart-overlay';
    document.body.appendChild(heartOverlay);

    const heartEmojis = ['💖', '❤️', '💗', '💓', '💕', '💙', '💘', '✨', '🌸', '💖', '❤️'];
    const heartCount = 75;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'burst-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        const startX = Math.random() * 100; // 0vw to 100vw
        const startY = Math.random() * 40 + 60; // 60vh to 100vh
        const size = Math.random() * 32 + 24; // 24px to 56px
        const duration = Math.random() * 1.5 + 1.2; // 1.2s to 2.7s
        const delay = Math.random() * 0.4;
        const drift = (Math.random() - 0.5) * 260; // horizontal sway px

        heart.style.left = `${startX}vw`;
        heart.style.top = `${startY}vh`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.setProperty('--drift', `${drift}px`);

        heartOverlay.appendChild(heart);
    }

    setTimeout(() => {
        heartOverlay.remove();
    }, 3200);
}

// Floating Particle Generator
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 30 + 15;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 6 + 6}s`;
        particle.style.animationDelay = `${Math.random() * 4}s`;
        container.appendChild(particle);
    }
}
