const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const loveMeterBar = document.getElementById('loveMeterBar');
const noSound = document.getElementById('noSound');
const yesSound = document.getElementById('yesSound');
const startOverlay = document.getElementById('startOverlay');
const petalsContainer = document.getElementById('petalsContainer');
const typewriterElement = document.getElementById('typewriterText');
const dateInput = document.getElementById('dateInput');
const whatsappBtn = document.getElementById('whatsappBtn');

// --- CONFIGURATION ---
// IMPORTANT: Enter your number here! (No +, no spaces)
const myPhoneNumber = "919999999999"; 

let isAudioUnlocked = false;
let yesClickCount = 0; 
let loveScore = 0; 
const yesTexts = ["Yes! 💖", "Really? 😍", "Sure? 🌹", "YESSS! 💍"];

// --- 1. START OVERLAY (Audio Unlock) ---
startOverlay.addEventListener('click', () => {
    // Play and immediately pause to unlock AudioContext
    noSound.play().catch(e => {});
    noSound.pause();
    yesSound.play().catch(e => {});
    yesSound.pause();
    
    startOverlay.style.opacity = '0';
    setTimeout(() => {
        startOverlay.style.display = 'none';
        isAudioUnlocked = true;
        typeWriter();
        // Start background rain
        setInterval(createPetalOrPhoto, 300);
    }, 500);
});

// --- 2. DYNAMIC CURSOR TRAIL (Mixed Emojis) ---
document.addEventListener('mousemove', (e) => {
    createCursorTrail(e.clientX, e.clientY);
});
document.addEventListener('touchmove', (e) => {
    createCursorTrail(e.touches[0].clientX, e.touches[0].clientY);
});

function createCursorTrail(x, y) {
    const item = document.createElement('div');
    item.classList.add('cursor-item');
    
    const emojis = ['❤️', '✨', '💖', '🌹', '🦋', '💋'];
    item.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
    
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    
    item.style.left = (x + offsetX) + 'px';
    item.style.top = (y + offsetY) + 'px';
    
    document.body.appendChild(item);
    setTimeout(() => item.remove(), 1500);
}

// --- 3. BACKGROUND RAIN (Swaying & Depth) ---
function createPetalOrPhoto() {
    const isPhoto = Math.random() < 0.2; // 20% chance of photo
    const element = document.createElement('div');
    
    if (isPhoto) {
        element.classList.add('floating-photo');
        const photos = [
            "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif",
            "https://media.giphy.com/media/l0HlO3BJ8LALPW4sE/giphy.gif"
        ]; 
        const img = document.createElement('img');
        img.src = photos[Math.floor(Math.random() * photos.length)];
        img.style.width = '100%';
        element.appendChild(img);
    } else {
        element.classList.add('petal');
        element.style.backgroundColor = ['#ff4d6d', '#ff0055', '#ff9a9e', '#ffd166'][Math.floor(Math.random()*4)];
    }

    // Random Size & Depth
    const size = Math.random() * 20 + 10; 
    element.style.width = isPhoto ? '50px' : `${size}px`;
    element.style.height = isPhoto ? 'auto' : `${size}px`;
    
    if (size < 15 && !isPhoto) {
        element.style.filter = "blur(2px)";
        element.style.opacity = "0.6";
        element.style.zIndex = "-5";
    } else {
        element.style.filter = "blur(0px)";
        element.style.opacity = "0.9";
        element.style.zIndex = "-1";
    }

    // Animation Style
    const duration = Math.random() * 5 + 5;
    const animations = ['fall-straight', 'fall-sway-left', 'fall-sway-right'];
    const randomAnim = animations[Math.floor(Math.random() * animations.length)];
    
    element.style.animation = `${randomAnim} ${duration}s linear forwards`;
    element.style.left = Math.random() * 100 + "vw";

    petalsContainer.appendChild(element);
    setTimeout(() => element.remove(), duration * 1000);
}

// --- 4. YES BUTTON GAME (4 Clicks) ---
yesBtn.addEventListener('click', (e) => {
    yesClickCount++;
    
    // Floating Text
    const floatText = document.createElement('div');
    floatText.classList.add('float-text');
    floatText.innerText = "+25% Love! 💘";
    const rect = yesBtn.getBoundingClientRect();
    floatText.style.left = rect.left + 'px';
    floatText.style.top = rect.top + 'px';
    document.body.appendChild(floatText);
    setTimeout(() => floatText.remove(), 1000);

    // Meter Update
    loveScore += 25;
    loveMeterBar.style.width = Math.min(loveScore, 100) + "%";

    if (yesClickCount < 4) {
        yesBtn.innerText = yesTexts[yesClickCount];
        createHeartBurst(e.clientX, e.clientY);
    } 
    else {
        // SUCCESS
        if(isAudioUnlocked) {
            noSound.pause();
            yesSound.volume = 0.8;
            yesSound.play();
        }
        document.body.classList.add('shake');
        setTimeout(() => {
            document.body.classList.remove('shake');
            questionSection.classList.add('hidden');
            successSection.classList.remove('hidden');
            startConfetti(); 
            startRomanticRain();
        }, 500);
    }
});

// --- 5. NO BUTTON LOGIC (Safe Center Zone) ---
function moveNoButton() {
    if (isAudioUnlocked) {
        noSound.currentTime = 0; noSound.volume = 0.3; noSound.play(); 
    }
    const currentScale = parseFloat(noBtn.style.transform.replace('scale(', '')) || 1;
    if (currentScale > 0.5) noBtn.style.transform = `scale(${currentScale - 0.1})`;
    
    // Move 100px around center
    const spread = 100; 
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const randomX = (Math.random() * spread * 2) - spread;
    const randomY = (Math.random() * spread * 2) - spread;

    noBtn.style.position = 'fixed';
    noBtn.style.left = (centerX + randomX) + 'px';
    noBtn.style.top = (centerY + randomY) + 'px';
}
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton);
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveNoButton(); });

// --- 6. WHATSAPP LOGIC ---
whatsappBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    const date = dateInput.value;
    if (date) {
        const url = `https://wa.me/${myPhoneNumber}?text=I%20said%20YES!%20%F0%9F%92%96%20See%20you%20on%20${date}!%20%F0%9F%93%85`;
        window.open(url, '_blank');
    } else {
        alert("Please pick a date first! 📅");
    }
});

// --- UTILS ---
function createHeartBurst(x, y) {
    for(let i=0; i<8; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-burst');
        heart.innerHTML = '💖';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.setProperty('--tx', (Math.random() * 100 - 50) + 'px');
        heart.style.setProperty('--ty', (Math.random() * 100 - 50) + 'px');
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
}
function startRomanticRain() {
    setInterval(() => {
        const item = document.createElement('div');
        item.innerHTML = Math.random() > 0.5 ? '❤️' : '🌹';
        item.style.position = 'fixed';
        item.style.fontSize = '2rem';
        item.style.left = Math.random() * 100 + "vw";
        item.style.top = '-50px';
        item.style.animation = 'fall 3s linear forwards';
        document.body.appendChild(item);
        setTimeout(() => item.remove(), 3000);
    }, 200);
}
const text = "Will you be my Valentine?";
let index = 0;
function typeWriter() {
    if (index < text.length) {
        typewriterElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}
function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const colors = ['#ff0055', '#ff9a9e', '#ffd166', '#06d6a0', '#118ab2'];
    for(let i=0; i<200; i++) {
        particles.push({
            x: canvas.width / 2, y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 20, vy: (Math.random() - 0.5) * 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 2
        });
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
            p.x += p.vx; p.y += p.vy; p.vy += 0.2; p.size *= 0.96; 
            ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
            if(p.size < 0.5) particles.splice(index, 1);
        });
        if(particles.length > 0) requestAnimationFrame(animate);
    }
    animate();
}
