const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const noSound = document.getElementById('noSound');
const yesSound = document.getElementById('yesSound');
const bgHearts = document.getElementById('floatingHearts');

// --- 1. AUDIO UNLOCK ---
let audioUnlocked = false;
function unlockAudio() {
    if (!audioUnlocked) {
        noSound.play().then(() => {
            noSound.pause();
            noSound.currentTime = 0;
            audioUnlocked = true;
        }).catch(() => {});
    }
}
window.onload = unlockAudio;
document.body.addEventListener('touchstart', unlockAudio, {once:true});
document.body.addEventListener('click', unlockAudio, {once:true});
document.body.addEventListener('mousemove', unlockAudio, {once:true});


// --- 2. CENTERED MOVEMENT LOGIC ---
let yesScale = 1;

function moveNoButton(e) {
    if(e) e.preventDefault();

    if (audioUnlocked && noSound.paused) {
        noSound.volume = 0.5; 
        noSound.play();
    }

    // Grow Yes Button
    yesScale += 0.1;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Movement Range (Center Box)
    const moveRange = 150; // How far from center it can go
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const btnW = noBtn.offsetWidth;
    const btnH = noBtn.offsetHeight;

    // Calculate random position around the center
    const randomX = (centerX - (btnW / 2)) + ((Math.random() - 0.5) * moveRange * 2);
    const randomY = (centerY - (btnH / 2)) + ((Math.random() - 0.5) * moveRange * 2);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Slight rotation
    const rotate = Math.random() * 20 - 10;
    noBtn.style.transform = `rotate(${rotate}deg)`;
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);
noBtn.addEventListener('click', moveNoButton);


// --- 3. YES LOGIC ---
yesBtn.addEventListener('click', () => {
    noSound.pause();
    noSound.currentTime = 0;
    yesSound.volume = 0.8;
    yesSound.play();

    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');

    createConfetti();
});


// --- 4. ANIMATIONS ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('bg-heart');
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 3 + "s";
    bgHearts.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 500);

function createConfetti() {
    for(let i=0; i<50; i++) {
        const confetti = document.createElement('div');
        confetti.innerText = '💋';
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-50px';
        confetti.style.fontSize = '2rem';
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: 'translateY(110vh) rotate(360deg)', opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 2000,
            easing: 'linear'
        });
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
    }
}
