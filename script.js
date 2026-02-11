const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const mainContainer = document.getElementById('mainContainer');
const loveMeterBar = document.getElementById('loveMeterBar');
const mainGif = document.getElementById('mainGif');

// --- AUDIO ELEMENTS ---
const noSound = document.getElementById('noSound');
const yesSound = document.getElementById('yesSound');

let isNoMusicPlaying = false;

// --- DYNAMIC VARIABLES ---
let yesScale = 1; 
let noScale = 1;
let loveScore = 20; // Starts at 20%
const cuteGifs = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzhjOTZlNjUzZmYxZDRiNzM5MGNmODk4MzRjZWMzYWM2M2U5YzYwZCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PXM/JTj1b7i2V218n1gU9N/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazZ5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/OPU6wzx8JrHna/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/26BRL7YrutHKs/giphy.gif"
];
const taunts = ["Too slow! 😜", "Try again! 🐢", "Love me! 🥺", "Can't catch me! 🏃", "Sullu po! 😂"];

// --- 1. 3D TILT EFFECT ---
document.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    mainContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// --- 2. MOVE "NO" BUTTON (Unlimited) ---
function moveNoButton(e) {
    if(e) e.preventDefault();

    // START NO MUSIC (If not already playing)
    if (!isNoMusicPlaying) {
        noSound.volume = 0.5;
        noSound.play().catch(e => console.log("Interaction needed for audio"));
        isNoMusicPlaying = true;
    }

    // Shrink No
    if (noScale > 0.5) {
        noScale -= 0.05;
        noBtn.style.transform = `scale(${noScale})`;
    }

    // Grow Yes
    yesScale += 0.2;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Move Logic
    const w = window.innerWidth;
    const h = window.innerHeight;
    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;
    
    // Random Position
    const randomLeft = Math.max(20, Math.random() * (w - btnW - 20));
    const randomTop = Math.max(20, Math.random() * (h * 0.8 - btnH));

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomLeft + 'px';
    noBtn.style.top = randomTop + 'px';
    
    // Taunt Text
    noBtn.innerText = taunts[Math.floor(Math.random() * taunts.length)];
    
    // Change GIF randomly
    mainGif.src = cuteGifs[Math.floor(Math.random() * cuteGifs.length)];

    // Penalty Love Meter
    loveScore = Math.max(0, loveScore - 5);
    updateLoveMeter();
}

// Event Listeners for No
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

// --- 3. YES BUTTON (Success) ---
yesBtn.addEventListener('click', () => {
    // Stop No Music
    noSound.pause();
    noSound.currentTime = 0;

    // Play Yes Music
    yesSound.volume = 0.6;
    yesSound.play();

    // Show Success
    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');

    // Max Love Meter
    loveScore = 100;
    updateLoveMeter();

    // Rain Kisses
    setInterval(createKiss, 200);
});

// --- 4. LOVE METER ---
function updateLoveMeter() {
    loveMeterBar.style.width = loveScore + "%";
}
// Increase on Yes Hover
yesBtn.addEventListener('mouseover', () => {
    loveScore = Math.min(100, loveScore + 10);
    updateLoveMeter();
});

// --- 5. EFFECTS ---
function createKiss() {
    const kiss = document.createElement('div');
    kiss.classList.add('kiss');
    kiss.innerText = '💋';
    kiss.style.left = Math.random() * 100 + "vw";
    kiss.style.top = '-50px';
    document.body.appendChild(kiss);
    setTimeout(() => kiss.remove(), 3000);
}

// Background interaction
document.body.addEventListener('click', (e) => {
    if(e.target === document.body || e.target.classList.contains('heart-bg')) {
        createSparkle(e.pageX, e.pageY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
}

// Typing Effect
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
window.onload = typeWriter;
