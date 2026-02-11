const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const loveMeterBar = document.getElementById('loveMeterBar');
const mainGif = document.getElementById('mainGif');
const noSound = document.getElementById('noSound');
const yesSound = document.getElementById('yesSound');
const startOverlay = document.getElementById('startOverlay');
const petalsContainer = document.getElementById('petalsContainer');

let isAudioUnlocked = false;
let yesScale = 1; 
let noScale = 1;
let loveScore = 30;

// --- 0. START & AUDIO UNLOCK ---
startOverlay.addEventListener('click', () => {
    // Attempt to play and immediately pause to "unlock" audio context
    noSound.play().then(() => noSound.pause());
    yesSound.play().then(() => yesSound.pause());
    
    // Hide overlay
    startOverlay.style.opacity = '0';
    setTimeout(() => {
        startOverlay.style.display = 'none';
        isAudioUnlocked = true;
    }, 500);

    // Start background petals
    setInterval(createPetal, 300);
});

// --- 1. MOVE BUTTON LOGIC (FIXED BOUNDARIES) ---
function moveNoButton(e) {
    if(e) e.preventDefault(); // Stop click/touch behavior

    // Play "No" music if unlocked
    if (isAudioUnlocked && noSound.paused) {
        noSound.volume = 0.5;
        noSound.play();
    }

    // Shrink "No" / Grow "Yes"
    if (noScale > 0.6) {
        noScale -= 0.05;
        noBtn.style.transform = `scale(${noScale})`;
    }
    yesScale += 0.1;
    yesBtn.style.transform = `scale(${yesScale})`;

    // --- CRITICAL BOUNDARY FIX ---
    // Get visible screen size
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    
    // Button dimensions
    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;

    // Calculate Safe Area (Padding of 20px)
    const maxX = screenW - btnW - 20;
    const maxY = screenH - btnH - 20;
    
    // Generate random position
    const randomX = Math.max(10, Math.random() * maxX);
    const randomY = Math.max(10, Math.random() * maxY);

    // Apply strict Fixed positioning
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';

    // Change Taunts
    const taunts = ["Too slow! 😜", "Try again! 🐢", "Love me! 🥺", "Missed! 💨", "Sullu po! 😂"];
    noBtn.innerText = taunts[Math.floor(Math.random() * taunts.length)];

    // Drain Love Meter
    loveScore = Math.max(0, loveScore - 5);
    loveMeterBar.style.width = loveScore + "%";
}

// EVENTS (Both Mouse & Touch)
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);
// Fallback click (in case they manage to tap it)
noBtn.addEventListener('click', moveNoButton);


// --- 2. YES BUTTON LOGIC ---
yesBtn.addEventListener('click', () => {
    if(isAudioUnlocked) {
        noSound.pause();
        noSound.currentTime = 0;
        yesSound.volume = 0.8;
        yesSound.play();
    }

    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');

    loveScore = 100;
    loveMeterBar.style.width = "100%";

    // Rain Kisses
    setInterval(() => {
        const kiss = document.createElement('div');
        kiss.innerHTML = '💋';
        kiss.style.position = 'fixed';
        kiss.style.fontSize = '2rem';
        kiss.style.left = Math.random() * 100 + "vw";
        kiss.style.top = '-50px';
        kiss.style.animation = 'fall 3s linear forwards';
        document.body.appendChild(kiss);
        setTimeout(() => kiss.remove(), 3000);
    }, 200);
});


// --- 3. BACKGROUND PETALS ---
function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = Math.random() * 3 + 2 + "s";
    petal.style.backgroundColor = ['#ff4d6d', '#ff0055', '#ff9a9e'][Math.floor(Math.random()*3)];
    petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 5000);
}


// --- 4. TYPING EFFECT ---
const text = "Will you be my Valentine?";
let index = 0;
const typewriterElement = document.getElementById('typewriterText');
function typeWriter() {
    if (index < text.length) {
        typewriterElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}
// Start typing after overlay is clicked or window load
window.onload = typeWriter;
