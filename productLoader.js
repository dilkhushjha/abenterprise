

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
            document.getElementById('product-hero-title').textContent = 'Page in Progress - Check back soon';
            return;
        }

        // Fetch the products data
        const response = await fetch('products.json');
        const data = await response.json();

        // Get the specific product data
        const productData = data.products[productId];

        if (!productData) {
            console.error('Product not found:', productId);
            document.getElementById('product-hero-title').textContent = 'Page in Progress - Check back soon';
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

        const heroSection = document.getElementById('hero-section');
        if (productData.bg) {
            heroSection.innerHTML = `
                    <img src="${productData.bg}" alt="${productData.title}" class="bg-image">


                    <div class="container position-relative z-1 text-center pt-5">
                        <div class="row justify-content-center m-auto">
                            <div class="col-md-8">
                                <h1 class="display-4 fw-bold mb-1 text-white" id="product-hero-title">${productData.title}</h1>
                                <p class="text-white mt-2"><span id="product-breadcrumb">Home / ${productData.title}</span></p>
                               
                            </div>
                        </div>
                    </div>
            `;
        } else if (productData.video) {
            heroSection.innerHTML = `
                   <video autoplay muted loop playsinline class="bg-video">
                        <source src=${productData.video} type="video/mp4">
                        Your browser does not support the video tag.
                    </video>

       

                    <div class="container position-relative z-1 text-center pt-5">
                        <div class="row justify-content-center m-auto">
                            <div class="col-md-8">
                                  <h1 class="display-4 fw-bold mb-1 text-white" id="product-hero-title">${productData.title}</h1>
                                <p class="text-white mt-2"><span id="product-breadcrumb">Home / ${productData.title}</span></p>
                               
                            </div>
                        </div>
                    </div>
            `;
        }

        else {
            heroSection.innerHTML = `
                   <video autoplay muted loop playsinline class="bg-video">
                        <source src="https://webberindia.com/wp-content/uploads/2024/02/vid_mob_2024.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>

                    <div class="overlay"></div>

                    <div class="container position-relative z-1 text-center pt-5">
                        <div class="row justify-content-center m-auto">
                            <div class="col-md-8">
                                <h1 class="display-4 fw-bold mb-1 text-white" id="product-hero-title">${productData.title}</h1>
                                <p class="text-white mt-2"><span id="product-breadcrumb">Home / ${productData.title}</span></p>
                            </div>
                        </div>
                    </div>
            `;
        }

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

        // const spareImage = document.getElementById('spareImage');
        // if (productData.spareImage) {
        //     spareImage.innerHTML = `
        //         // <div class="product-image" style="height: 100%;">
        //         //     <img src="${productData.spareImage}" alt="${productData.title}" style="height: 200%; object-fit: cover;" class="shadow-lg">
        //         // </div>
        //     `;
        // } else {
        //     spareImage.innerHTML = '';
        // }

        // Populate spare parts list
        const sparesList = document.getElementById('spares-list');

        if (productData.spares && productData.spares.length > 0) {
            const isCategorized = typeof productData.spares[0] === 'object' && productData.spares[0].category;

            if (isCategorized) {
                // Grouped by category
                const html = productData.spares.map(group => `
                    <div class="row align-items-center justify-content-between align-items-start section-padding ">
                        <div class="col-md-4">
                            <img src="${group.image}" alt="${group.category}" class="img-fluid shadow" style=" height:max-content;">
                        </div>
                        <div class="col-md-6 ">
                            <h3 class=" fw-bold mb-3">${group.category}</h3>
                            <hr class="hr" />
                            <ul class="list-group">
                                ${group.items.map(item => `
                                    <li class="d-flex align-items-center py-2">
                                        <span class="text-white d-flex fw-bold bg-primary-red rounded-circle px-2 py-1  me-3 spare-item">
                                            <i class="fas fa-arrow-right text-white"></i>
                                        </span>
                                        <span class="fw-medium fs-6 text-secondary" title="${item}">${item}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                `).join('');

                sparesList.innerHTML = `<div class="spare-parts-wrapper">${html}</div>`;

            } else {
                // Flat list (original logic)
                if (productData.spares.length > 20) {
                    const columns = 3;
                    const itemsPerColumn = Math.ceil(productData.spares.length / columns);
                    let html = '<div class="row">';
                    for (let i = 0; i < columns; i++) {
                        html += '<div class="">';
                        html += '<ul class="list-group">';
                        productData.spares.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn).forEach(spare => {
                            html += `
                                <li class="d-flex align-items-center mb-2">
                                    <span class="text-white d-flex fw-bold bg-primary-red rounded-circle px-2 py-1 me-3 spare-item">
                                        <i class="fas fa-chevron-right text-white fs-6"></i>
                                    </span>
                                    <span class="fw-medium fs-6" style="overflow: hidden;" title="${spare}">${spare}</span>
                                </li>
                            `;
                        });
                        html += '</ul></div>';
                    }
                    html += '</div>';
                    sparesList.innerHTML = html;
                } else {
                    // Fewer than 20 items
                    sparesList.innerHTML = '<div class="row g-3">' +
                        productData.spares.map(spare => `
                            <div class="col-md-5 mb-2">
                                <div class="d-flex align-items-center" style="white-space: nowrap; overflow: hidden;">
                                    <span class="text-white d-flex fw-bold bg-primary-red rounded-circle px-2 py-1 me-3 spare-item">
                                        <i class="fas fa-chevron-right text-white fs-6"></i>
                                    </span>
                                    <span class="fw-medium fs-6" style="overflow: hidden;" title="${spare}">${spare}</span>
                                </div>
                            </div>
                        `).join('') +
                        '</div>';
                }
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