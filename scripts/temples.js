// Update current year in footer
function updateCopyright() {
    document.getElementById('currentyear').textContent = new Date().getFullYear();
}

// Update last modified date
function updateLastModified() {
    document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;
}

// Initialize page elements
document.addEventListener('DOMContentLoaded', () => {
    updateCopyright();
    updateLastModified();
});
