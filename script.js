const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const noSound = document.getElementById('noSound');
const yesSound = document.getElementById('yesSound');
const bgHearts = document.getElementById('floatingHearts');

// --- 1. AUDIO AUTO-START LOGIC ---
// Browsers block audio until interaction. This unlocks it on the FIRST touch/click anywhere.
let audioUnlocked = false;

function unlockAudio() {
    if (!audioUnlocked) {
        // Try to play 'No' music silently to unlock the audio engine
        noSound.play().then(() => {
            noSound.pause();
            noSound.currentTime = 0;
            audioUnlocked = true;
        }).catch((e) => {
            console.log("Waiting for interaction...");
        });
    }
}

// Try immediately on load
window.onload = unlockAudio;
// Try on any touch or click anywhere on the page
document.body.addEventListener('touchstart', unlockAudio, {once:true});
document.body.addEventListener('click', unlockAudio, {once:true});
document.body.addEventListener('mousemove', unlockAudio, {once:true});


// --- 2. MOVE BUTTON LOGIC (FIXED FOR MOBILE & PC) ---
let yesScale = 1;

function moveNoButton(e) {
    // Prevent default touch actions (scrolling/zooming) on the button
    if(e) e.preventDefault();

    // PLAY AUDIO (If unlocked, play the chase music)
    if (audioUnlocked && noSound.paused) {
        noSound.volume = 0.5; // Set volume
        noSound.play();
    }

    // MAKE "YES" BIGGER
    yesScale += 0.1;
    yesBtn.style.transform = `scale(${yesScale})`;

    // CALCULATE SAFE ZONE (Visible Screen Only)
    // We get the exact width/height of the window
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // We subtract padding (30px) so it never touches the edge
    const maxLeft = winWidth - btnWidth - 30;
    const maxTop = winHeight - btnHeight - 30;

    // Generate random coordinates within safe zone
    const randomLeft = Math.max(10, Math.random() * maxLeft);
    const randomTop = Math.max(10, Math.random() * maxTop);

    // Apply strict Fixed positioning
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomLeft + 'px';
    noBtn.style.top = randomTop + 'px';
    
    // Add random rotation for fun
    const rotate = Math.random() * 30 - 15;
    noBtn.style.transform = `rotate(${rotate}deg)`;
}

// TRIGGER EVENTS
// Mouse: triggers when cursor touches it
noBtn.addEventListener('mouseover', moveNoButton);
// Touch: triggers immediately when finger touches it
noBtn.addEventListener('touchstart', moveNoButton);
// Click: Fallback
noBtn.addEventListener('click', moveNoButton);


// --- 3. YES BUTTON LOGIC ---
yesBtn.addEventListener('click', () => {
    // Stop Chase Music
    noSound.pause();
    noSound.currentTime = 0;
    
    // Play Love Music
    yesSound.volume = 0.8;
    yesSound.play();

    // Show Success Screen
    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');

    // Create Celebration Effects
    startConfetti();
});


// --- 4. BACKGROUND EFFECTS ---
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

function startConfetti() {
    for(let i=0; i<50; i++) {
        const confetti = document.createElement('div');
        confetti.innerText = '💋';
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-50px';
        confetti.style.fontSize = '2rem';
        confetti.style.animation = `fall ${Math.random()*3+2}s linear forwards`;
        document.body.appendChild(confetti);
        
        // Keyframes for falling are defined in CSS via JS insert or just use inline style for simplicity
        // We will just let them fall with simple CSS added dynamically
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: 'translateY(110vh) rotate(360deg)', opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 2000,
            easing: 'linear'
        });
        
        setTimeout(() => confetti.remove(), 4000);
    }
}
