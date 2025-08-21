document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.card');
    card.addEventListener('click', function() {
        this.classList.toggle('open');
    });
    card.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.classList.toggle('open');
        }
    });
});
