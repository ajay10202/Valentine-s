const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const heartBg = document.getElementById('heartBg');

// --- 1. DYNAMIC BACKGROUND HEARTS ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    
    // Random position, color, and speed
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s"; // 3-5 seconds
    
    const colors = ['#ff9a9e', '#ffc3a0', '#ffafbd', '#ff4d6d'];
    heart.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    heartBg.appendChild(heart);

    // Cleanup after animation
    setTimeout(() => {
        heart.remove();
    }, 5000);
}

// Generate a new heart every 300ms
setInterval(createHeart, 300);


// --- 2. THE "NO" BUTTON EVASION ---
function moveNoButton() {
    // 1. Get viewport size (the screen)
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // 2. Get button size
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // 3. Calculate random position 
    // We subtract the button size to ensure it doesn't go off-screen
    const randomX = Math.random() * (windowWidth - btnWidth);
    const randomY = Math.random() * (windowHeight - btnHeight);

    // 4. Apply the new position
    noBtn.style.position = 'fixed'; // Allows it to move freely
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Trigger on Mouse Enter (Desktop)
noBtn.addEventListener('mouseenter', moveNoButton);

// Trigger on Touch (Mobile)
// "touchstart" happens before a click, ensuring it moves before they can tap it
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Stop the click
    moveNoButton();
});


// --- 3. THE "YES" BUTTON CELEBRATION ---
yesBtn.addEventListener('click', () => {
    // Hide question, show success
    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');

    // Trigger confetti
    startConfetti();
});

function startConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random properties
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -10 + 'px';
        confetti.style.backgroundColor = ['#ff0', '#f00', '#0f0', '#00f'][Math.floor(Math.random() * 4)];
        confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
        
        document.body.appendChild(confetti);

        // Cleanup
        setTimeout(() => confetti.remove(), 4000);
    }
}
