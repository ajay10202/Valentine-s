const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const heartBg = document.getElementById('heartBg');
const bgMusic = document.getElementById('bgMusic');

// --- 1. "NO" BUTTON LOGIC (RESTRICTED TO MIDDLE) ---
function moveNoButton(e) {
    if(e) e.preventDefault();

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Define the "Middle Box" size
    // The button will move within a 300px square in the center of the screen
    const range = 300; 

    // Calculate the starting X and Y to center the movement area
    const startX = (windowWidth - range) / 2;
    const startY = (windowHeight - range) / 2;

    // Generate random position WITHIN that central range
    const randomX = startX + Math.random() * (range - btnWidth);
    const randomY = startY + Math.random() * (range - btnHeight);

    // Apply new position
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
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
    bgMusic.volume = 0.5; 
    bgMusic.play().catch(error => {
        console.log("Music play failed:", error);
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
