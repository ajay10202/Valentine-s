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
const emojiRainContainer = document.getElementById('emojiRainContainer');

// --- DATA: MORE EMOTIONAL ---
const taunts = [
    "No 💔", "Pondati please! 🥺", "Why? 😭", "Don't do this!", 
    "I love you!", "Just click Yes!", "Look at me...", "Too slow!",
    "Missed me!", "You can't escape!", "Sullu po!", "Love me! ❤️"
];

// Sad GIFs that get progressively sadder could be used here
const sadGifs = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/26BRL7YrutHKs/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmM5c2g5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/d2lcHJy5yqg/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGZ5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/L95W4wv8nnb9K/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazZ5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/OPU6wzx8JrHna/giphy.gif"
];

const pleadingTexts = [
    "Why? 🥺", "Please! 😭", "Pondati! ❤️", "Don't!", 
    "Love you!", "Wait!", "Nooooo!", "Yes pls!"
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


// --- 2. THE INFINITE NO BUTTON ---
let yesScale = 1; 
let noClicks = 0;

function moveNoButton(e) {
    if(e) e.preventDefault();
    noClicks++;

    // 1. Move Button (Top Half Limit)
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
    
    // 2. Button Spin
    const rotateAngle = (Math.random() * 360) - 180;
    noBtn.style.transform = `rotate(${rotateAngle}deg)`;

    // 3. Dynamic Changes
    noBtn.innerText = taunts[Math.floor(Math.random() * taunts.length)];
    mainGif.src = sadGifs[Math.floor(Math.random() * sadGifs.length)];

    // 4. GROW YES BUTTON (Exponentially)
    // It grows faster the more they click No
    yesScale += 0.3 + (noClicks * 0.05); 
    yesBtn.style.transform = `scale(${yesScale})`;

    // 5. INTENSITY EFFECTS
    spawnFloatingText(randomLeft, randomTop);
    triggerShake();
    triggerMoodChange(); // Darken background
    triggerEmojiRain();  // Drop sad emojis
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

// Shake the card
function triggerShake() {
    mainContainer.classList.add('shake-effect');
    setTimeout(() => {
        mainContainer.classList.remove('shake-effect');
    }, 500);
}

// Darken background progressively
function triggerMoodChange() {
    // Start pink, go towards dark grey/red as they click more
    if (noClicks < 5) {
        document.body.style.background = `linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)`;
    } else if (noClicks < 10) {
        document.body.style.background = `linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)`;
    } else if (noClicks < 15) {
        document.body.style.background = `linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)`; // Stormy
    } else {
        document.body.style.background = `linear-gradient(135deg, #330867 0%, #30cfd0 100%)`; // Very dark/intense
    }
}

// Drop sad emojis
function triggerEmojiRain() {
    const emojis = ['💔', '😭', '🥺', '🌧️', '⚡'];
    const emoji = document.createElement('div');
    emoji.classList.add('falling-emoji');
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 100 + 'vw';
    emoji.style.animationDuration = Math.random() * 1 + 1 + 's'; // Fast rain
    emojiRainContainer.appendChild(emoji);

    setTimeout(() => emoji.remove(), 2000);
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);
noBtn.addEventListener('click', moveNoButton);


// --- 3. YES BUTTON (SUCCESS) ---
yesBtn.addEventListener('click', () => {
    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');

    // Reset background to happy love theme
    document.body.style.background = `linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)`;

    bgMusic.volume = 0.5; 
    bgMusic.play().catch(e => console.log("Audio play failed", e));
    
    // Massive confetti explosion
    for(let i=0; i<5; i++) {
        setTimeout(createConfettiLoop, i*300);
    }
});

function createConfettiLoop() {
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
}

// --- 4. EXTRAS ---
document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        document.title = "Pondati please come back! 💔";
    } else {
        document.title = "Be My Valentine? 🌹";
    }
});

// Cursor Trail
document.addEventListener('mousemove', function(e){
    createTrailHeart(e.pageX, e.pageY);
});
document.addEventListener('touchmove', function(e){
    createTrailHeart(e.touches[0].pageX, e.touches[0].pageY);
});

function createTrailHeart(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('trail-heart'); // Use CSS class defined previously
    heart.style.position = 'fixed';
    heart.style.height = '10px';
    heart.style.width = '10px';
    heart.style.backgroundColor = '#ff4d6d';
    heart.style.borderRadius = '50%';
    heart.style.pointerEvents = 'none';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// Background Hearts
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
