// Increment review count on form submission (uses GET form)
const finalForm = document.getElementById('reviewForm');
if (finalForm) {
    finalForm.addEventListener('submit', () => {
        const count = parseInt(localStorage.getItem('reviewCount') || '0');
        localStorage.setItem('reviewCount', count + 1);
    });
}
