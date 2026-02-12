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

// PHONE NUMBER CONFIG
const myPhoneNumber = "919999999999"; 

let isAudioUnlocked = false;
let yesScale = 1; 
let noScale = 1;
let loveScore = 30;

// --- 1. START & AUDIO UNLOCK ---
startOverlay.addEventListener('click', () => {
    noSound.play().catch(e => {});
    noSound.pause();
    yesSound.play().catch(e => {});
    yesSound.pause();
    
    startOverlay.style.opacity = '0';
    setTimeout(() => {
        startOverlay.style.display = 'none';
        isAudioUnlocked = true;
        typeWriter();
        setInterval(createPetalOrPhoto, 300);
    }, 500);
});

// --- 2. CURSOR HEART TRAIL ---
// Replaced Magic Dust with Hearts
document.addEventListener('mousemove', createHeartTrail);
document.addEventListener('touchmove', (e) => {
    createHeartTrail(e.touches[0]);
});

function createHeartTrail(e) {
    const heart = document.createElement('div');
    heart.classList.add('cursor-heart');
    heart.innerHTML = '❤️';
    heart.style.left = e.pageX + 'px';
    heart.style.top = e.pageY + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

// --- 3. DYNAMIC TITLE ---
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = "Miss you already! 💔";
    } else {
        document.title = "Be My Valentine? 🌹";
    }
});

// --- 4. HEART BURST (On Click) ---
document.addEventListener('click', (e) => {
    for(let i=0; i<5; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-burst');
        heart.innerHTML = '❤️';
        heart.style.left = e.pageX + 'px';
        heart.style.top = e.pageY + 'px';
        heart.style.setProperty('--tx', (Math.random() * 100 - 50) + 'px');
        heart.style.setProperty('--ty', (Math.random() * 100 - 50) + 'px');
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
});

// --- 5. NO BUTTON LOGIC ---
function moveNoButton(e) {
    if(e) e.preventDefault(); 

    if (isAudioUnlocked) {
        noSound.currentTime = 0; 
        noSound.volume = 0.5;
        noSound.play(); 
    }

    const decoy = document.createElement('button');
    decoy.innerHTML = "No 💔";
    decoy.className = 'decoy-btn';
    const rect = noBtn.getBoundingClientRect();
    decoy.style.left = rect.left + 'px';
    decoy.style.top = rect.top + 'px';
    document.body.appendChild(decoy);
    
    setTimeout(() => {
        decoy.style.transform = "translateY(50px) rotate(20deg)";
        decoy.style.opacity = "0";
    }, 10);
    setTimeout(() => decoy.remove(), 1000);

    if (noScale > 0.6) { noScale -= 0.05; noBtn.style.transform = `scale(${noScale})`; }
    yesScale += 0.1; yesBtn.style.transform = `scale(${yesScale})`;

    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.max(10, Math.random() * maxX) + 'px';
    noBtn.style.top = Math.max(10, Math.random() * maxY) + 'px';

    const taunts = ["Really? 😢", "Think again! 🤔", "Poda! 😂", "Don't be mean!", "Catch me! 🏃"];
    noBtn.innerText = taunts[Math.floor(Math.random() * taunts.length)];
    loveScore = Math.max(0, loveScore - 5);
    loveMeterBar.style.width = loveScore + "%";
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

// --- 6. YES BUTTON & CONFETTI ---
yesBtn.addEventListener('click', () => {
    if(isAudioUnlocked) {
        noSound.pause();
        yesSound.volume = 0.8;
        yesSound.play();
    }

    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');
    loveScore = 100;
    loveMeterBar.style.width = "100%";
    
    startConfetti(); 

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
});

// --- 7. FLOATING PHOTOS & PETALS ---
function createPetalOrPhoto() {
    const isPhoto = Math.random() < 0.2; 
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
        element.style.backgroundColor = ['#ff4d6d', '#ff0055', '#ff9a9e'][Math.floor(Math.random()*3)];
    }

    element.style.left = Math.random() * 100 + "vw";
    element.style.animationDuration = Math.random() * 3 + 2 + "s";
    petalsContainer.appendChild(element);
    setTimeout(() => element.remove(), 5000);
}

// --- 8. DATE & WHATSAPP ---
dateInput.addEventListener('change', (e) => {
    const date = e.target.value;
    whatsappBtn.href = `https://wa.me/${myPhoneNumber}?text=I%20said%20YES!%20%F0%9F%92%96%20See%20you%20on%20${date}!%20%F0%9F%93%85`;
});

// --- 9. TYPEWRITER ---
const text = "Will you be my Valentine?";
let index = 0;
function typeWriter() {
    if (index < text.length) {
        typewriterElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// --- 10. CONFETTI ---
function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#ff0055', '#ff9a9e', '#ffd166', '#06d6a0', '#118ab2'];
    
    for(let i=0; i<200; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * 20,
            vy: (Math.random() - 0.5) * 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.2; 
            p.size *= 0.96; 
            
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            ctx.fill();

            if(p.size < 0.5) particles.splice(index, 1);
        });
        if(particles.length > 0) requestAnimationFrame(animate);
    }
    animate();
                          }
