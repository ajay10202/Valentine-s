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

let isAudioUnlocked = false;
let yesScale = 1; 
let noScale = 1;
let loveScore = 30;

// --- 1. START OVERLAY (Audio Unlock & Init) ---
startOverlay.addEventListener('click', () => {
    // Unlock Audio Context (Play then immediately pause)
    noSound.play().catch(e => console.log("Audio waiting interaction"));
    noSound.pause();
    yesSound.play().catch(e => console.log("Audio waiting interaction"));
    yesSound.pause();
    
    // Fade out overlay
    startOverlay.style.opacity = '0';
    setTimeout(() => {
        startOverlay.style.display = 'none';
        isAudioUnlocked = true;
        
        // Start Animations
        typeWriter();
        setInterval(createPetal, 300);
    }, 500);
});

// --- 2. NO BUTTON RUNAWAY & CHAOS LOGIC ---
function moveNoButton(e) {
    if(e) e.preventDefault(); // Stop default touch actions

    // Play "No" sound if unlocked
    if (isAudioUnlocked) {
        noSound.currentTime = 0;
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

    // --- CHAOS MODE: Create Decoy Button ---
    const decoy = document.createElement('button');
    decoy.innerHTML = "No 💔";
    decoy.className = 'decoy-btn';
    // Set decoy to where the real button CURRENTLY is
    const rect = noBtn.getBoundingClientRect();
    decoy.style.left = rect.left + 'px';
    decoy.style.top = rect.top + 'px';
    document.body.appendChild(decoy);

    // Decoy falls and fades
    setTimeout(() => {
        decoy.style.transform = "translateY(50px) rotate(20deg)";
        decoy.style.opacity = "0";
    }, 10);
    setTimeout(() => decoy.remove(), 1000);

    // --- MOVE REAL BUTTON ---
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Keep button 20px from edges
    const maxLeft = winWidth - btnWidth - 20;
    const maxTop = winHeight - btnHeight - 20;
    
    const randomLeft = Math.max(10, Math.random() * maxLeft);
    const randomTop = Math.max(10, Math.random() * maxTop);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomLeft + 'px';
    noBtn.style.top = randomTop + 'px';

    // Change Text
    const taunts = ["Too slow! 😜", "Try again! 🐢", "Love me! 🥺", "Missed! 💨", "Sullu po! 😂"];
    noBtn.innerText = taunts[Math.floor(Math.random() * taunts.length)];

    // Drain Love Meter
    loveScore = Math.max(0, loveScore - 5);
    loveMeterBar.style.width = loveScore + "%";
}

// Add Listeners
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);
noBtn.addEventListener('click', moveNoButton);

// --- 3. YES BUTTON LOGIC ---
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

// --- 4. MAGIC DUST (Cursor Trail) ---
document.addEventListener('mousemove', createSparkle);
document.addEventListener('touchmove', (e) => {
    createSparkle(e.touches[0]);
});

function createSparkle(e) {
    const particle = document.createElement('div');
    particle.classList.add('magic-particle');
    
    const size = Math.random() * 10 + 5; 
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    particle.style.left = `${e.pageX}px`;
    particle.style.top = `${e.pageY}px`;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// --- 5. BACKGROUND PETALS ---
function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = Math.random() * 3 + 2 + "s";
    petal.style.backgroundColor = ['#ff4d6d', '#ff0055', '#ff9a9e'][Math.floor(Math.random()*3)];
    petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 5000);
}

// --- 6. TYPEWRITER EFFECT ---
const text = "Will you be my Valentine?";
let index = 0;
function typeWriter() {
    if (index < text.length) {
        typewriterElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

// --- 7. WHATSAPP CONFIGURATION ---
// IMPORTANT: Replace this with YOUR phone number!
// Format: CountryCode + Number (No + or - or spaces)
// Example for India: 919876543210
const myPhoneNumber = "919999999999"; 

const waBtn = document.getElementById('whatsappBtn');
if(waBtn) {
    waBtn.href = `https://wa.me/${myPhoneNumber}?text=I%20said%20YES!%20%F0%9F%92%96%20Happy%20Valentine's%20Day!`;
}
