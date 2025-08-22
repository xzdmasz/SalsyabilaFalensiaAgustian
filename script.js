document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    const introText = document.querySelector('.intro-text');
    const audio = document.querySelector('#birthday-audio');
    
    if (!card || !introText || !audio) {
        console.error('Missing required elements:', {
            card: !card,
            introText: !introText,
            audio: !audio
        });
        return;
    }

    // Start audio exactly when intro text animation begins
    audio.play().catch(error => {
        console.warn('Autoplay blocked by browser:', error.message);
        // Fallback: Show a temporary message and play on first interaction
        const fallbackMessage = document.createElement('div');
        fallbackMessage.textContent = 'Klik di mana saja untuk memutar musik!';
        fallbackMessage.style.position = 'absolute';
        fallbackMessage.style.top = '10px';
        fallbackMessage.style.left = '50%';
        fallbackMessage.style.transform = 'translateX(-50%)';
        fallbackMessage.style.background = 'rgba(0, 0, 0, 0.7)';
        fallbackMessage.style.color = '#fff';
        fallbackMessage.style.padding = '10px 20px';
        fallbackMessage.style.borderRadius = '5px';
        fallbackMessage.style.zIndex = '1000';
        document.body.appendChild(fallbackMessage);

        const playOnInteraction = () => {
            audio.play().catch(err => console.warn('Audio play failed:', err.message));
            fallbackMessage.remove(); // Remove message after play
        };
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true, passive: true });
    });

    // Show card and hide intro text after animation (4s)
    setTimeout(() => {
        card.classList.add('visible');
        introText.style.display = 'none';
    }, 4000); // Changed from 2000 to 4000 to match CSS animation duration

    let isToggling = false;

    function toggleCard() {
        if (isToggling) return;
        isToggling = true;
        card.classList.toggle('open');
        const isOpen = card.classList.contains('open');
        card.setAttribute('aria-expanded', isOpen);
        setTimeout(() => { isToggling = false; }, 700); // Match CSS transition duration (0.7s)
    }

    card.addEventListener('click', toggleCard);
    card.addEventListener('touchstart', toggleCard, { once: true });
    card.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleCard();
        }
    });
});
