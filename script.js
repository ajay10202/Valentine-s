const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const heartBg = document.getElementById('heartBg');
const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');

// --- AUDIO LOGIC ---
let isPlaying = false;

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        musicControl.textContent = '🔇';
    } else {
        bgMusic.play().then(() => {
            musicControl.textContent = '🎵';
        }).catch(error => {
            console.log("Auto-play blocked, waiting for interaction");
        });
    }
    isPlaying = !isPlaying;
}

// Browser policy: Audio only plays after user interaction
// We add a listener to the BODY to start music on the first click/touch anywhere
document.body.addEventListener('click', () => {
    if (!isPlaying) {
        bgMusic.play();
        isPlaying = true;
        musicControl.textContent = '🎵';
    }
}, { once: true }); // "once: true" means this listener removes itself after running once

musicControl.addEventListener('click', (e) => {
    e.stopPropagation(); // Stop the body click listener from interfering
    toggleMusic();
});


// --- NO BUTTON LOGIC ---
function moveNoButton(e) {
    if(e) e.preventDefault();

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Safe Zone Padding
    const padding = 30; 
    const maxLeft = windowWidth - btnWidth - padding;
    const maxTop = windowHeight - btnHeight - padding;

    const randomLeft = Math.max(padding, Math.random() * maxLeft);
    const randomTop = Math.max(padding, Math.random() * maxTop);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomLeft + 'px';
    noBtn.style.top = randomTop + 'px';
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);
noBtn.addEventListener('click', moveNoButton);


// --- YES BUTTON LOGIC ---
yesBtn.addEventListener('click', () => {
    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');
    createConfetti();
});


// --- BACKGROUND & CONFETTI ---
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
        confetti.style.transition = 'all 3s linear';
        confetti.style.zIndex = '1000';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.top = '100vh';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.opacity = '0';
        }, 10);

        setTimeout(() => confetti.remove(), 3000);
    }
}
