const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const heartBg = document.getElementById('heartBg');
const bgMusic = document.getElementById('bgMusic');

// --- 1. "NO" BUTTON LOGIC (Unchanged) ---
function moveNoButton(e) {
    if(e) e.preventDefault();

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
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


// --- 2. "YES" BUTTON & MUSIC LOGIC ---
yesBtn.addEventListener('click', () => {
    // 1. Swap the content
    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');

    // 2. Play the music
    // Since this is triggered by a user click, browsers allow it immediately.
    bgMusic.volume = 0.5; // Set volume to 50%
    bgMusic.play().catch(error => {
        console.log("Music play failed (browser might require more interaction):", error);
    });

    // 3. Start the celebration effects
    createConfetti();
});


// --- 3. BACKGROUND ANIMATIONS (Unchanged) ---
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
