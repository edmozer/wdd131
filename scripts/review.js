// Display the review count from localStorage
function displayReviewCount() {
    const countElement = document.getElementById('reviewCount');
    const count = parseInt(localStorage.getItem('reviewCount') || '0');
    countElement.textContent = count;
}

// Initialize the page
window.addEventListener('load', function() {
    displayReviewCount();
});