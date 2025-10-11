// Display review count on review page
window.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('reviewCount');
    if (!el) return;
    const count = parseInt(localStorage.getItem('reviewCount') || '0');
    el.textContent = count;
});
