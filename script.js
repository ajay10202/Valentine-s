const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionSection = document.getElementById('questionSection');
const successSection = document.getElementById('successSection');
const bgMusic = document.getElementById('bgMusic');

// Yes Button Click - Show Success
yesBtn.addEventListener('click', () => {
    questionSection.classList.add('hidden');
    successSection.classList.remove('hidden');
    
    // Play music automatically (browsers might block this without interaction first)
    bgMusic.play().catch(error => {
        console.log("Audio play failed (browser restriction):", error);
    });
});

// No Button - Move away on Hover (Desktop) or Touch (Mobile)
const moveButton = () => {
    // Get the viewport dimensions
    const maxWidth = window.innerWidth - noBtn.offsetWidth;
    const maxHeight = window.innerHeight - noBtn.offsetHeight;

    // Generate random positions
    const randomX = Math.random() * maxWidth;
    
    // RESTRICTION: Limit Y movement to the top 60% of the screen
    // This ensures the button doesn't go "too low"
    const randomY = Math.random() * (maxHeight * 0.6); 

    // Apply new position
    // Using 'fixed' ensures it moves relative to the screen, not the container
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
};

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton); // For mobile phones
noBtn.addEventListener('click', moveButton); // Fallback
