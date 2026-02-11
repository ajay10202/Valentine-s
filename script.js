const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const heartBg = document.getElementById('heartBg');
const bgMusic = document.getElementById('bgMusic');
const typewriterElement = document.getElementById('typewriterText');

// --- 1. TYPING EFFECT FOR HEADER ---
const text = "Will you be my Valentine?";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        typewriterElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // Speed of typing
    }
}
// Start typing when page loads
window.onload = typeWriter;


// --- 2. DYNAMIC "NO" BUTTON (TAUNT + MOVE) ---
const taunts = [
    "No 💔", "Too slow! 😜", "Missed me! 💨", "Try again! 😂", 
    "Nice try! 😏", "Oop! 🙊", "Catch me! 🏃", "So close! 🤏",
    "Nope! 🚫", "Seriously? 🤨"
];

let yesScale = 1; // Current size of Yes button

function moveNoButton(e) {
    if(e) e.preventDefault();

    // A. Move the button (Top Half Only)
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const maxLeft = windowWidth - btnWidth - 20;
    const maxTop = (windowHeight / 2) - btnHeight; // Upper 50% limit
    
    const randomLeft = Math.max(10, Math.random() * maxLeft);
    const randomTop = Math.max(10, Math.random() * maxTop);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomLeft + 'px';
    noBtn.style.top = randomTop + 'px';

    // B. Change Text (Taunt)
    const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
    noBtn.innerText = randomTaunt;

    // C. Grow the Yes Button
    yesScale += 0.15; // Increase size by 15% each time
    yesBtn.style.transform = `scale(${yesScale})`;
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);
noBtn.addEventListener('click', moveNoButton);


// --- 3. YES BUTTON & SUCCESS ---
yesBtn.addEventListener('click', () => {
    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');

    bgMusic.volume = 0.5; 
    bgMusic.play().catch(error => console.log("Music play failed:", error));

    createConfetti();
});


// --- 4. CURSOR TRAIL EFFECT ---
document.addEventListener('mousemove', function(e){
    createTrailHeart(e.pageX, e.pageY);
});

document.addEventListener('touchmove', function(e){
    createTrailHeart(e.touches[0].pageX, e.touches[0].pageY);
});

function createTrailHeart(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('trail-heart');
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.transform = 'rotate(45deg)'; // Heart shape needs rotation
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
}


// --- 5. BACKGROUND EFFECTS ---
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
