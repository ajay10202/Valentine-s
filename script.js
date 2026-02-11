const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const heartBg = document.getElementById('heartBg');
const bgMusic = document.getElementById('bgMusic');
const typewriterElement = document.getElementById('typewriterText');
const mainGif = document.getElementById('mainGif');
const mainContainer = document.getElementById('mainContainer');
const flashOverlay = document.getElementById('flashOverlay');

// --- DATA ---
const taunts = [
    "No 💔", "Are you sure?", "Really?", "Think again!", 
    "Last chance!", "Have a heart!", "Don't do this!", "I'll cry!",
    "You're breaking my heart 💔", "Seriously? 🥺"
];

const sadGifs = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/26BRL7YrutHKs/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmM5c2g5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/d2lcHJy5yqg/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGZ5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/L95W4wv8nnb9K/giphy.gif"
];

const pleadingTexts = [
    "Why? 🥺", "Please! 😭", "Don't!", "Ouch! 💔", 
    "Love me! ❤️", "Wait!", "Nooooo!"
];

// --- 1. TYPING EFFECT ---
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


// --- 2. DYNAMIC "NO" BUTTON LOGIC ---
let yesScale = 1; 
let movesCount = 0; // Track how many times they tried to click No

function moveNoButton(e) {
    if(e) e.preventDefault();
    movesCount++;

    // --- A. THE "I GIVE UP" MECHANIC ---
    // After 6 tries, the button gives up and becomes a YES button
    if (movesCount > 6) {
        noBtn.innerText = "Okay fine... Yes! 💖";
        noBtn.style.backgroundColor = "#ff4d6d";
        noBtn.style.color = "white";
        noBtn.style.transform = "scale(1.2)";
        noBtn.style.position = "relative"; // Return to normal flow
        noBtn.style.left = "auto";
        noBtn.style.top = "auto";
        
        // Remove evasion listeners
        noBtn.removeEventListener('mouseover', moveNoButton);
        noBtn.removeEventListener('touchstart', moveNoButton);
        noBtn.removeEventListener('click', moveNoButton);

        // Add success listener
        noBtn.addEventListener('click', () => {
             // Simulate Yes Click
             yesBtn.click();
        });
        
        mainGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazZ5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/OPU6wzx8JrHna/giphy.gif"; // Crying happy gif
        return; // Stop the rest of the function
    }

    // --- B. MOVEMENT (Top Half Only) ---
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    const maxLeft = windowWidth - btnWidth - 30;
    const maxTop = (windowHeight / 2) - btnHeight - 20;
    
    const randomLeft = Math.max(20, Math.random() * maxLeft);
    const randomTop = Math.max(20, Math.random() * maxTop);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomLeft + 'px';
    noBtn.style.top = randomTop + 'px';
    
    // Spin Effect: Add rotation based on even/odd move
    const rotateAngle = (movesCount % 2 === 0) ? 20 : -20;
    noBtn.style.transform = `rotate(${rotateAngle}deg)`;

    // --- C. DYNAMIC EFFECTS ---
    noBtn.innerText = taunts[Math.floor(Math.random() * taunts.length)];
    mainGif.src = sadGifs[Math.floor(Math.random() * sadGifs.length)];

    // Grow Yes Button
    yesScale += 0.2; 
    yesBtn.style.transform = `scale(${yesScale})`;

    spawnFloatingText(randomLeft, randomTop);
    triggerShake();
    triggerFlash();
}

function spawnFloatingText(x, y) {
    const textEl = document.createElement('div');
    textEl.classList.add('floating-text');
    textEl.innerText = pleadingTexts[Math.floor(Math.random() * pleadingTexts.length)];
    textEl.style.left = x + 'px';
    textEl.style.top = y + 'px';
    document.body.appendChild(textEl);
    setTimeout(() => textEl.remove(), 1500);
}

// Shake the whole card
function triggerShake() {
    mainContainer.classList.add('shake-effect');
    setTimeout(() => {
        mainContainer.classList.remove('shake-effect');
    }, 500);
}

// Flash the background red slightly
function triggerFlash() {
    flashOverlay.style.opacity = '1';
    setTimeout(() => {
        flashOverlay.style.opacity = '0';
    }, 200);
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);
noBtn.addEventListener('click', moveNoButton);


// --- 3. YES BUTTON (SUCCESS) ---
yesBtn.addEventListener('click', () => {
    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');

    bgMusic.volume = 0.5; 
    bgMusic.play().catch(e => console.log("Audio play failed", e));
    
    createConfetti();
});

// --- 4. BROWSER TAB TITLE ---
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        document.title = "Don't leave me! 💔";
    } else {
        document.title = "Be My Valentine? 🌹";
    }
});

// --- 5. CURSOR TRAIL ---
document.addEventListener('mousemove', function(e){
    createTrailHeart(e.pageX, e.pageY);
});

document.addEventListener('touchmove', function(e){
    createTrailHeart(e.touches[0].pageX, e.touches[0].pageY);
});

function createTrailHeart(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('trail-heart');
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.transform = 'rotate(45deg)';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// --- 6. BACKGROUND HEARTS ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    
    const colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffe5ec'];
    heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    heartBg.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '0';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = '#ff4d6d';
        confetti.style.zIndex = '1000';
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: `translate(0,0)`, opacity: 1 },
            { transform: `translate(${Math.random()*100 - 50}px, 100vh) rotate(720deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        animation.onfinish = () => confetti.remove();
    }
}
