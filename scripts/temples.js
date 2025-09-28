// Hamburger menu functionality
document.getElementById('hamburgerBtn').addEventListener('click', function() {
    const nav = document.querySelector('nav');
    const hamburger = document.getElementById('hamburgerBtn');
    
    if (nav.classList.contains('show')) {
        nav.classList.remove('show');
        hamburger.innerHTML = '☰';
    } else {
        nav.classList.add('show');
        hamburger.innerHTML = '✕';
    }
});

// Get current year for copyright
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Get last modified date
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;
