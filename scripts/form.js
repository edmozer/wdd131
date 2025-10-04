// Product data
const products = [
    { id: 1, name: "Nike Brasil 2024 Home Jersey", price: 89.99 },
    { id: 2, name: "Adidas Predator Edge.1 Cleats", price: 199.99 },
    { id: 3, name: "Official CBF Match Ball", price: 129.99 },
    { id: 4, name: "Flamengo 2024 Away Kit", price: 79.99 },
    { id: 5, name: "São Paulo FC Home Jersey", price: 79.99 },
    { id: 6, name: "Palmeiras Training Set", price: 89.99 },
    { id: 7, name: "Santos FC Pelé Retro Jersey", price: 99.99 },
    { id: 8, name: "Corinthians Home Kit 2024", price: 79.99 }
];

// Populate product select
function populateProducts() {
    const productSelect = document.getElementById('product');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} - $${product.price}`;
        productSelect.appendChild(option);
    });
}

// Handle form submission
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    // Form will submit naturally since we're using GET method
    // Just update the review count in localStorage
    const currentCount = parseInt(localStorage.getItem('reviewCount') || '0');
    localStorage.setItem('reviewCount', currentCount + 1);
});

// Initialize the page
window.addEventListener('load', function() {
    populateProducts();
});