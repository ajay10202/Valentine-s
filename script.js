const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const heartBg = document.getElementById('heartBg');
const bgMusic = document.getElementById('bgMusic');
const typewriterElement = document.getElementById('typewriterText');
const mainGif = document.getElementById('mainGif');

// --- 0. DATA ARRAYS ---
// Taunts for the button text
const taunts = [
    "No 💔", "Are you sure?", "Really?", "Think again!", 
    "Last chance!", "Have a heart!", "Don't do this!", "I'll cry!",
    "You're breaking my heart 💔", "Seriously? 🥺"
];

// Sad GIFs for when they try to click No
const sadGifs = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/26BRL7YrutHKs/giphy.gif", // Sad Pikachu
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmM5c2g5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/d2lcHJy5yqg/giphy.gif", // Crying Cat
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGZ5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/L95W4wv8nnb9K/giphy.gif", // Sad Stitch
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazZ5Y3h6bGd4M3Z5Y3h6bGd4M3Z5Y3h6bGd4/OPU6wzx8JrHna/giphy.gif"  // Crying face
];

// Words that float up when No moves
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


// --- 2. DYNAMIC "NO" BUTTON (THE CHAOS ENGINE) ---
let yesScale = 1; 

function moveNoButton(e) {
    if(e) e.preventDefault();

    // A. Move Button (Top Half Only)
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Limit to top 50% so it doesn't get too low
    const maxLeft = windowWidth - btnWidth - 30;
    const maxTop = (windowHeight / 2) - btnHeight - 20;
    
    const randomLeft = Math.max(20, Math.random() * maxLeft);
    const randomTop = Math.max(20, Math.random() * maxTop);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomLeft + 'px';
    noBtn.style.top = randomTop + 'px';

    // B. Change Text (Taunt)
    noBtn.innerText = taunts[Math.floor(Math.random() * taunts.length)];

    // C. Change Main GIF to something sad
    const randomGif = sadGifs[Math.floor(Math.random() * sadGifs.length)];
    mainGif.src = randomGif;

    // D. Grow Yes Button
    yesScale += 0.2; 
    yesBtn.style.transform = `scale(${yesScale})`;

    // E. Spawn Floating Pleading Text
    spawnFloatingText(randomLeft, randomTop);
}

// Function to create the floating text
function spawnFloatingText(x, y) {
    const textEl = document.createElement('div');
    textEl.classList.add('floating-text');
    textEl.innerText = pleadingTexts[Math.floor(Math.random() * pleadingTexts.length)];
    textEl.style.left = x + 'px';
    textEl.style.top = y + 'px';
    document.body.appendChild(textEl);
    
    // Remove after animation finishes
    setTimeout(() => textEl.remove(), 1500);
}

// Event Listeners
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);
noBtn.addEventListener('click', moveNoButton);


// --- 3. YES BUTTON (SUCCESS) ---
yesBtn.addEventListener('click', () => {
    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');

    // Play Music
    bgMusic.volume = 0.5; 
    bgMusic.play().catch(e => console.log("Audio play failed", e));

    // Restore Happy GIF if it was changed to sad
    // (Note: The success HTML already has a different happy gif, so this is handled by the HTML structure)
    
    createConfetti();
});


// --- 4. BROWSER TAB TITLE TRICK ---
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
