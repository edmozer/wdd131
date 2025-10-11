// Products data (expanded from form.js)
const products = [
    { 
        id: 1, 
        name: "Nike Brasil 2024 Home Jersey",
        price: 89.99,
        category: "jerseys",
    image: "../images/brazil_home.webp",
        description: "Official 2024 Brazilian national team home jersey featuring the iconic yellow and green colors.",
        features: ["Authentic Nike Dri-FIT technology", "100% recycled polyester", "Official CBF crest"]
    },
    { 
        id: 2, 
        name: "Adidas Predator Edge.1 Cleats",
        price: 199.99,
        category: "footwear",
    image: "../images/predator_edge.webp",
        description: "Professional grade football boots worn by top Brazilian players.",
        features: ["Enhanced ball control", "Lightweight design", "Superior traction"]
    },
    { 
        id: 3, 
        name: "Official CBF Match Ball",
        price: 129.99,
        category: "equipment",
    image: "../images/cbf_ball.webp",
        description: "The official match ball of the Brazilian Football Confederation.",
        features: ["FIFA Quality Pro certified", "Aerodynamic design", "Premium materials"]
    },
    { 
        id: 4, 
        name: "Flamengo 2024 Away Kit",
        price: 79.99,
        category: "jerseys",
    image: "../images/fortaleza_jersey.webp",
        description: "Official Flamengo away kit for the 2024 season.",
        features: ["Authentic team design", "Breathable fabric", "Club crest"]
    }
];

// Initialize favorite products from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const categoryFilter = document.getElementById('categoryFilter');
const searchInput = document.getElementById('searchInput');
const favoriteCount = document.getElementById('favoriteCount');
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

// Toggle mobile navigation
if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
        primaryNav.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', 
            navToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
        );
    });
}

// Filter products by category and search term
function filterProducts(category = 'all', searchTerm = '') {
    return products.filter(product => {
        const matchesCategory = category === 'all' || product.category === category;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
}

// Create product card HTML using template literals
function createProductCard(product) {
    const isFavorite = favorites.includes(product.id);
    return `
        <article class="card product-card">
            <picture>
                <source srcset="${product.image.replace('.webp', '_lg.webp')} 1200w, ${product.image.replace('.webp', '_md.webp')} 800w, ${product.image.replace('.webp', '_sm.webp')} 480w" type="image/webp">
                <img src="${product.image.replace('.webp', '_md.webp')}" alt="${product.name}" loading="lazy" width="600" height="400">
            </picture>
            <div class="card-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <ul class="features-list">
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <p class="price">$${product.price.toFixed(2)}</p>
                <div class="card-actions">
                    <button class="button" onclick="location.href='form.html?product=${encodeURIComponent(product.name)}'">
                        Write Review
                    </button>
                    <button class="button secondary favorite-btn ${isFavorite ? 'active' : ''}"
                            onclick="toggleFavorite(${product.id})"
                            aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                        ♥
                    </button>
                </div>
            </div>
        </article>
    `;
}

// Render product grid
function renderProducts(filteredProducts = products) {
    if (!productGrid) return;
    
    productGrid.innerHTML = filteredProducts.map(createProductCard).join('');
    updateFavoriteCount();
}

// Toggle favorite status
function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    if (index === -1) {
        favorites.push(productId);
    } else {
        favorites.splice(index, 1);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderProducts(filterProducts(
        categoryFilter?.value || 'all',
        searchInput?.value || ''
    ));
}

// Update favorite count in header
function updateFavoriteCount() {
    if (favoriteCount) {
        favoriteCount.textContent = favorites.length;
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize products grid
    renderProducts();
    
    // Set up category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            renderProducts(filterProducts(
                e.target.value,
                searchInput?.value || ''
            ));
        });
    }
    
    // Set up search filter
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderProducts(filterProducts(
                categoryFilter?.value || 'all',
                e.target.value
            ));
        });
    }
});