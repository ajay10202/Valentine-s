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
    "Just click Yes! ❤️", "I'm fast! ⚡", "Love me! 🥺"
];

// --- 2. MOVE BUTTON LOGIC (Works on Touch & Mouse) ---
function moveNoButton(e) {
    // 1. Prevent Default Click Behavior
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

    // 3. Shrink "No" / Grow "Yes"
    // Limited shrinking to 0.75 so it doesn't disappear completely
    if (noScale > 0.75) {
        noScale -= 0.05;
        noBtn.style.transform = `scale(${noScale})`;
    }
    yesScale += 0.15;
    yesBtn.style.transform = `scale(${yesScale})`;

    // 4. Calculate Safe Screen Boundaries (The Fix)
    // We calculate the maximum X and Y coordinates the button can exist at
    // without overflowing the screen.
    const buttonWidth = noBtn.offsetWidth;
    const buttonHeight = noBtn.offsetHeight;
    
    // Window dimensions minus button size minus a 20px padding
    const maxLeft = window.innerWidth - buttonWidth - 20;
    const maxTop = window.innerHeight - buttonHeight - 20;

    // Ensure we don't get negative numbers
    const safeLeft = Math.max(10, maxLeft);
    const safeTop = Math.max(10, maxTop);

    // Generate random coordinates within the safe zone
    const randomLeft = Math.floor(Math.random() * safeLeft);
    const randomTop = Math.floor(Math.random() * safeTop);

    // Apply the new position
    noBtn.style.position = 'fixed'; // Sticks it to the screen
    noBtn.style.left = randomLeft + 'px';
    noBtn.style.top = randomTop + 'px';
    noBtn.style.zIndex = '9999'; // Ensures it stays on top
    
    // 5. Change Text & Image
    noBtn.innerText = taunts[Math.floor(Math.random() * taunts.length)];
    mainGif.src = cuteGifs[Math.floor(Math.random() * cuteGifs.length)];

    // 6. Drain Love Meter
    loveScore = Math.max(0, loveScore - 5);
    loveMeterBar.style.width = loveScore + "%";
}

// EVENTS:
// Mouseover for PC
noBtn.addEventListener('mouseover', moveNoButton);
// Touchstart for Mobile (fires immediately on tap)
noBtn.addEventListener('touchstart', moveNoButton);
// Click (Fallback for super fast clickers)
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

    // Rain Kisses - Optimized
    const kissInterval = setInterval(() => {
        const kiss = document.createElement('div');
        kiss.classList.add('kiss');
        kiss.innerText = '💋';
        kiss.style.left = Math.random() * 100 + "vw";
        kiss.style.top = '-50px';
        document.body.appendChild(kiss);
        
        // Remove element after animation
        setTimeout(() => kiss.remove(), 3000);
    }, 200);

    // Stop creating kisses after 10 seconds to save performance
    setTimeout(() => {
        clearInterval(kissInterval);
    }, 10000);
});


// --- 4. EXTRAS (PC ONLY FEATURES) ---
// Only enable 3D tilt and sparkles on PC to save battery on Mobile
if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    
    // 3D Tilt
    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        mainContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Sparkle Trail
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

// Start typing when page loads
window.onload = typeWriter;
