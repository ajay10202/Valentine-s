const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const heartBg = document.getElementById('heartBg');

// --- 1. MOVE BUTTON LOGIC ---
function moveNoButton(e) {
    // Prevent the default click/touch behavior
    if(e) e.preventDefault();

    // 1. Get dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // 2. Define a "Safe Zone" 
    // We subtract padding to keep it away from the very edge
    const padding = 20; 
    const maxLeft = windowWidth - btnWidth - padding;
    const maxTop = windowHeight - btnHeight - padding;

    // 3. Calculate new random position
    // Math.max(padding, ...) ensures it doesn't go too far top/left
    const randomLeft = Math.max(padding, Math.random() * maxLeft);
    const randomTop = Math.max(padding, Math.random() * maxTop);

    // 4. Apply new position
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomLeft + 'px';
    noBtn.style.top = randomTop + 'px';
}

// EVENTS FOR "NO" BUTTON
// Desktop Hover
noBtn.addEventListener('mouseover', moveNoButton);
// Mobile Touch (The most important one for phones)
noBtn.addEventListener('touchstart', moveNoButton);
// Click (Fallback)
noBtn.addEventListener('click', moveNoButton);


// --- 2. YES BUTTON LOGIC ---
yesBtn.addEventListener('click', () => {
    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');
    createConfetti();
});


// --- 3. BACKGROUND EFFECTS ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    
    // Random color
    const colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffe5ec'];
    heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    heartBg.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}
setInterval(createHeart, 300);

// Simple Confetti
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
        
        // Trigger animation in next frame
        setTimeout(() => {
            confetti.style.top = '100vh';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.opacity = '0';
        }, 10);

        setTimeout(() => confetti.remove(), 3000);
    }
}
