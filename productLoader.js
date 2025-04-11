

// Get the product ID from the URL
function getProductIdFromUrl() {
    // Extract the product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('product');
}

// Load product data and populate the template
async function loadProductData() {
    try {
        // Get product ID from URL
        const productId = getProductIdFromUrl();

        if (!productId) {
            console.error('No product ID specified in URL');
            document.getElementById('product-hero-title').textContent = 'Product Not Found';
            return;
        }

        // Fetch the products data
        const response = await fetch('products.json');
        const data = await response.json();

        // Get the specific product data
        const productData = data.products[productId];

        if (!productData) {
            console.error('Product not found:', productId);
            document.getElementById('product-hero-title').textContent = 'Product Not Found';
            return;
        }

        // Update page title
        document.title = `${productData.title} | ABEnterprise`;

        // Update hero section
        document.getElementById('product-hero-title').textContent = productData.title;
        document.getElementById('product-breadcrumb').textContent = `Home / ${productData.title}`;

        // Update product details section
        document.getElementById('product-subtitle').textContent = productData.subtitle;
        document.getElementById('product-heading').textContent = productData.heading;

        // Add description paragraphs
        const descriptionContainer = document.getElementById('product-description');
        descriptionContainer.innerHTML = '';
        productData.description.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            descriptionContainer.appendChild(p);
        });

        // Add features list
        const featuresList = document.getElementById('product-features');
        featuresList.innerHTML = '';
        productData.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });

        // Add product image if available
        const imageContainer = document.getElementById('product-image-container');
        if (productData.image) {
            imageContainer.innerHTML = `
                <div class="product-image">
                    <img src="${productData.image}" alt="${productData.title}" class="img-fluid shadow">
                </div>
            `;
        } else {
            imageContainer.innerHTML = '';
        }

        const spareImage = document.getElementById('spareImage');
        if (productData.spareImage) {
            spareImage.innerHTML = `
                <div class="product-image h-100">
                    <img src="${productData.spareImage}" alt="${productData.title}" class="img-fluid  shadow-lg">
                </div>
            `;
        } else {
            spareImage.innerHTML = '';
        }

        // Populate spare parts list
        const sparesList = document.getElementById('spares-list');

        if (productData.spares && productData.spares.length > 0) {
            // If there are many spares, create columns
            if (productData.spares.length > 20) {
                const columns = 3; // Adjust the number of columns if needed
                const itemsPerColumn = Math.ceil(productData.spares.length / columns);
                let html = '<div class="row">';

                for (let i = 0; i < columns; i++) {
                    html += '<div class="">';
                    html += '<ul class="list-group">';
                    productData.spares.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn).forEach(spare => {
                        html += `
                            <li class=" d-flex align-items-center mb-2">
                                          <span class="text-white d-flex fw-bold bg-primary-red rounded-circle px-2 py-1  me-3 spare-item ">
                                <i class="fas fa-chevron-right text-white fs-6"></i>
                            </span>
                                        <span class="fw-medium fs-6" style="overflow: hidden; " title="${spare}">${spare}</span>
                            </li>
                        `;
                    });
                    html += '</ul></div>';
                }

                html += '</div>';
                sparesList.innerHTML = html;
            } else {
                // For fewer spares, display them in a single list
                // With tooltip for long text
                sparesList.innerHTML = '<div class="row g-3">' +
                    productData.spares.map(spare => `
                     <div class="col-md-  mb-2">
                        <div class="d-flex  align-items-center" style="white-space: nowrap; overflow: hidden;">
                            <span class="text-white d-flex fw-bold bg-primary-red rounded-circle px-2 py-1  me-3 spare-item ">
                                <i class="fas fa-chevron-right text-white fs-6"></i>
                            </span>
                            <span class="fw-medium fs-6" style="overflow: hidden; " title="${spare}">${spare}</span>
                        </div>
                    </div>
                `).join('') +
                    '</div>';


            }
            // Show the spares section
            document.getElementById('spare-parts-section').style.display = 'block';
        } else {
            // Hide the spares section if no spares are available
            document.getElementById('spare-parts-section').style.display = 'none';
        }
    } catch (error) {
        console.error('Error loading product data:', error);
    }
}

// Function to navigate to a product page
function navigateToProduct(productId) {
    window.location.href = `product.html?product=${productId}`;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', loadProductData);