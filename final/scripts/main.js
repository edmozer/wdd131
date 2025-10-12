const products = [
    { 
        id: 1, 
        name: "Nike Brasil 2024 Home Jersey",
        price: 89.99,
        category: "jerseys",
        image: "images/products/brazil_home",
        sizes: {
            sm: { width: 320, height: 363 },
            md: { width: 640, height: 726 },
            lg: { width: 1200, height: 1361 }
        },
        description: "Official 2024 Brazilian national team home jersey featuring the iconic yellow and green colors.",
        features: ["Authentic Nike Dri-FIT technology", "100% recycled polyester", "Official CBF crest"]
    },
    { 
        id: 2, 
        name: "Adidas Predator Edge.1 Cleats",
        price: 199.99,
        category: "footwear",
        image: "images/products/predator_edge",
        sizes: {
            sm: { width: 320, height: 220 },
            md: { width: 640, height: 440 },
            lg: { width: 1200, height: 825 }
        },
        description: "Professional grade football boots worn by top Brazilian players.",
        features: ["Enhanced ball control", "Lightweight design", "Superior traction"]
    },
    { 
        id: 3, 
        name: "Official CBF Match Ball",
        price: 129.99,
        category: "equipment",
        image: "images/products/cbf_ball",
        sizes: {
            sm: { width: 320, height: 316 },
            md: { width: 640, height: 632 },
            lg: { width: 1200, height: 1184 }
        },
        description: "The official match ball of the Brazilian Football Confederation.",
        features: ["FIFA Quality Pro certified", "Aerodynamic design", "Premium materials"]
    },
    { 
        id: 4, 
        name: "Fortaleza EC 2025 Home Jersey",
        price: 79.99,
        category: "jerseys",
        image: "images/products/fortaleza_jersey",
        sizes: {
            sm: { width: 320, height: 305 },
            md: { width: 640, height: 610 },
            lg: { width: 1200, height: 1143 }
        },
        description: "Official Fortaleza Esporte Clube home jersey for the 2025 season.",
        features: ["Official club design", "Breathable fabric", "Club crest"]
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
    const isFirstProduct = product.id === 1;
    const { sm, md, lg } = product.sizes;
    return `
        <article class="card product-card">
            <picture>
                <source 
                    srcset="${product.image}_lg.webp ${lg.width}w, 
                            ${product.image}_md.webp ${md.width}w, 
                            ${product.image}_sm.webp ${sm.width}w"
                    sizes="(min-width: 1200px) 33vw, (min-width: 800px) 50vw, 100vw"
                    type="image/webp">
                <img src="${product.image}_md.webp" 
                    alt="${product.name}" 
                    width="${md.width}" 
                    height="${md.height}"
                    ${isFirstProduct ? 'fetchpriority="high"' : 'loading="lazy"'}
                    decoding="${isFirstProduct ? 'sync' : 'async'}"
                >
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
