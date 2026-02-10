const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const heartBg = document.getElementById('heartBg');
const bgMusic = document.getElementById('bgMusic');

// --- 1. "NO" BUTTON MOVES UP ONLY ---
function moveNoButton(e) {
    if(e) e.preventDefault();

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Horizontal: Anywhere on screen (minus padding)
    const maxLeft = windowWidth - btnWidth - 20;
    const randomLeft = Math.max(10, Math.random() * maxLeft);

    // Vertical: ONLY UPPER HALF
    // We limit the movement to the top 50% of the screen so it's not "too low"
    const maxTop = (windowHeight / 2) - btnHeight; 
    const randomTop = Math.max(10, Math.random() * maxTop);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomLeft + 'px';
    noBtn.style.top = randomTop + 'px';
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);
noBtn.addEventListener('click', moveNoButton);


// --- 2. "YES" BUTTON & MUSIC ---
yesBtn.addEventListener('click', () => {
    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');

    // Play Music
    bgMusic.volume = 0.5; 
    bgMusic.play().catch(error => {
        console.log("Music play failed:", error);
    });

    createConfetti();
});


// --- 3. BACKGROUND EFFECTS ---
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
