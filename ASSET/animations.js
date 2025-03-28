document.addEventListener('DOMContentLoaded', function() {
    // Typewriter Animation
    const typewriterElement = document.querySelector('.typewriter-animation');
    if (typewriterElement) {
        const texts = JSON.parse(typewriterElement.dataset.text);
        let textIndex = 0;

        function typeText() {
            const currentText = texts[textIndex];
            typewriterElement.textContent = ''; // Clear current text
            typewriterElement.textContent = currentText;

            // Move to next text
            textIndex = (textIndex + 1) % texts.length;

            // Wait for the current animation to finish before starting the next one
            setTimeout(() => {
                typewriterElement.style.animation = 'none';
                typewriterElement.offsetHeight; // Trigger reflow
                typewriterElement.style.animation = null;
                requestAnimationFrame(typeText);
            }, 6500); // Adjust this time to match your animation duration
        }

        typeText();
    }

    // Floating Icons Animation
    document.querySelectorAll('.floating-icon').forEach(icon => {
        const randomRotation = Math.random() * 360;
        icon.style.setProperty('--init-rot', `${randomRotation}deg`);
    });

    // Breaking Text Effect
    document.querySelectorAll('.--break-text span').forEach(function(letter) {
        const randomRotation = (Math.random() - 0.5) * 20; // Random rotation between -10 and 10 degrees
        letter.style.setProperty('--rotation', `${randomRotation}deg`);
    });

    // Music Toggle
    const toggleButton = document.getElementById('toggleMusic');
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    if (toggleButton && backgroundMusic) {
        toggleButton.addEventListener('click', function() {
            document.body.classList.toggle('music-off');
            if (document.body.classList.contains('music-off')) {
                backgroundMusic.pause();
                this.textContent = 'Music Off';
            } else {
                backgroundMusic.play();
                this.textContent = 'Music On';
            }
        });
    }
});