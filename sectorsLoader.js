

// Get the product ID from the URL
function getSectorsIdFromUrl() {
    // Extract the product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('sectors');
}

// Load product data and populate the template
async function loadSectorsData() {
    try {
        // Get product ID from URL
        const sectorsId = getSectorsIdFromUrl();

        if (!sectorsId) {
            console.error('No sector ID specified in URL');
            document.getElementById('sectors-hero-title').textContent = 'Page in Progress - Check back soon';
            return;
        }

        // Fetch the products data
        const response = await fetch('sectors.json');
        const data = await response.json();

        // Get the specific product data
        const sectorsData = data.sectors[sectorsId];

        if (!sectorsData) {
            console.error('Sector not found:', sectorsId);
            document.getElementById('sectors-hero-title').textContent = 'Page in Progress - Check back soon';
            return;
        }

        // Update page title
        document.title = `${sectorsData.title} | ABEnterprise`;

        // Update hero section
        document.getElementById('sectors-hero-title').textContent = sectorsData.title;
        document.getElementById('sectors-breadcrumb').textContent = `Home / ${sectorsData.title}`;

        // Update product details section
        document.getElementById('sectors-subtitle').textContent = sectorsData.subtitle;
        document.getElementById('sectors-heading').textContent = sectorsData.heading;

        // Add description paragraphs
        const descriptionContainer = document.getElementById('sectors-description');
        descriptionContainer.innerHTML = '';
        sectorsData.description.forEach(paragraph => {
            const p = document.createElement('p');
            p.textContent = paragraph;
            descriptionContainer.appendChild(p);
        });

        // Add features list
        const featuresList = document.getElementById('sectors-features');
        featuresList.innerHTML = '';
        sectorsData.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });

        // Add product image if available
        const imageContainer = document.getElementById('sectors-image-container');
        if (sectorsData.image) {
            imageContainer.innerHTML = `
                <div class="product-image">
                    <img src="${sectorsData.image}" alt="${sectorsData.title}" class="img-fluid shadow">
                </div>
            `;
        } else {
            imageContainer.innerHTML = '';
        }

        const spareImage = document.getElementById('spareImage');
        if (sectorsData.spareImage) {
            spareImage.innerHTML = `
                <div class="product-image h-100">
                    <img src="${sectorsData.spareImage}" alt="${sectorsData.title}" class="img-fluid  shadow-lg">
                </div>
            `;
        } else {
            spareImage.innerHTML = '';
        }

        // Populate spare parts list
        const sparesList = document.getElementById('spares-list');

        if (sectorsData.spares && sectorsData.spares.length > 0) {
            // If there are many spares, create columns
            if (sectorsData.spares.length > 20) {
                const columns = 3; // Adjust the number of columns if needed
                const itemsPerColumn = Math.ceil(sectorsData.spares.length / columns);
                let html = '<div class="row">';

                for (let i = 0; i < columns; i++) {
                    html += '<div class="">';
                    html += '<ul class="list-group">';
                    sectorsData.spares.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn).forEach(spare => {
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
                    sectorsData.spares.map(spare => `
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
        console.error('Error loading sectors data:', error);
    }
}

// Function to navigate to a product page
function navigateToSectors(sectorsId) {
    window.location.href = `sectors.html?sectors=${sectorsId}`;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', loadSectorsData);