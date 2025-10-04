// Product data
const products = [
    { id: 1, name: "Laptop Pro X", price: 1299.99 },
    { id: 2, name: "Wireless Earbuds", price: 149.99 },
    { id: 3, name: "Smart Watch Elite", price: 299.99 },
    { id: 4, name: "Gaming Console Plus", price: 499.99 },
    { id: 5, name: "4K Monitor Ultra", price: 699.99 }
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