const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const mainContainer = document.getElementById('mainContainer');
const loveMeterBar = document.getElementById('loveMeterBar');
const mainGif = document.getElementById('mainGif');
const noSound = document.getElementById('noSound');
const yesSound = document.getElementById('yesSound');
const typewriterElement = document.getElementById('typewriterText');

let isNoMusicPlaying = false;
let yesScale = 1; 
let noScale = 1;
let loveScore = 30;

// --- 1. DYNAMIC CONTENT ---
const cuteGifs = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzhjOTZlNjUzZmYxZDRiNzM5MGNmODk4MzRjZWMzYWM2M2U5YzYwZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/JTj1b7i2V218n1gU9N/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazZ5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/OPU6wzx8JrHna/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/26BRL7YrutHKs/giphy.gif"
];

const taunts = [
    "Too slow! 🐢", "Try again! 😜", "Not happening! 🛑", 
    "Just click Yes! ❤️", "I'm fast! ⚡", "Love me! 🥺", "Missed me! 👻"
];

// --- 2. MOVE BUTTON LOGIC (The "Teleport" Engine) ---
function moveNoButton(e) {
    // 1. STOP the click from actually working
    if(e) {
        e.preventDefault(); 
        e.stopPropagation();
    }

    // 2. Play Funny Music (Only starts once)
    if (!isNoMusicPlaying) {
        noSound.volume = 0.5;
        noSound.currentTime = 0;
        noSound.play().catch(e => console.log("Audio requires interaction"));
        isNoMusicPlaying = true;
    }

    // 3. Make "Yes" Button HUGE and "No" Button Tiny
    // We cap the "No" shrinkage at 0.8 so it doesn't become invisible
    if (noScale > 0.8) {
        noScale -= 0.05;
        noBtn.style.transform = `scale(${noScale})`;
    }
    yesScale += 0.2; // Grow Yes button faster
    yesBtn.style.transform = `scale(${yesScale})`;

    // 4. CALCULATE SAFE POSITION (The Fix for Disappearing)
    
    // Get the actual width/height of the browser window
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    
    // Get the button size
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate the maximum X and Y allowed (Window size - Button size - 20px padding)
    // We use Math.max(0, ...) to ensure we don't get negative numbers on small phones
    const maxX = Math.max(0, winWidth - btnWidth - 20);
    const maxY = Math.max(0, winHeight - btnHeight - 20);

    // Generate random coordinates within these safe limits
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Apply the new position
    noBtn.style.position = 'fixed'; // detach from layout
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '10000'; // Always on top
    
    // 5. Change Text & Image
    noBtn.innerText = taunts[Math.floor(Math.random() * taunts.length)];
    mainGif.src = cuteGifs[Math.floor(Math.random() * cuteGifs.length)];

    // 6. Drain Love Meter slightly
    loveScore = Math.max(0, loveScore - 5);
    loveMeterBar.style.width = loveScore + "%";
}

// --- EVENTS ---
// 1. Mouseover: For PC users hovering
noBtn.addEventListener('mouseover', moveNoButton);

// 2. Touchstart: For Mobile users tapping
noBtn.addEventListener('touchstart', moveNoButton);

// 3. Click: THE BACKUP PLAN
// If they are super fast and actually click it, or if hover fails, 
// this ensures it STILL moves instead of submitting "No".
noBtn.addEventListener('click', moveNoButton);


// --- 3. YES BUTTON LOGIC ---
yesBtn.addEventListener('click', () => {
    // Switch Audio
    noSound.pause();
    noSound.currentTime = 0;
    yesSound.volume = 0.6;
    yesSound.play().catch(e => console.log("Audio requires interaction"));

    // Show Success
    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');

    // Fill Love Meter
    loveScore = 100;
    loveMeterBar.style.width = "100%";

    // Rain Kisses Animation
    const kissInterval = setInterval(() => {
        const kiss = document.createElement('div');
        kiss.classList.add('kiss');
        kiss.innerText = '💋';
        kiss.style.left = Math.random() * 100 + "vw";
        kiss.style.top = '-50px';
        document.body.appendChild(kiss);
        
        setTimeout(() => kiss.remove(), 3000);
    }, 300);

    // Stop animation after 10 seconds to save battery
    setTimeout(() => {
        clearInterval(kissInterval);
    }, 10000);
});


// --- 4. EXTRAS (PC ONLY) ---
if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    // 3D Tilt
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        mainContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Sparkles
    document.addEventListener('mousemove', (e) => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = e.pageX + 'px';
        sparkle.style.top = e.pageY + 'px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    });
}

// Typing Effect
const text = "Will you be my Valentine?";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typewriterElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

window.onload = typeWriter;
