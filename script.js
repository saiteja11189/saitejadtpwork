document.addEventListener('DOMContentLoaded', () => {
    const servicesGrid = document.getElementById('servicesGrid');
    const searchInput = document.getElementById('serviceSearch');
    const tabs = document.querySelectorAll('.tab');
    const resultsSummary = document.getElementById('resultsSummary');
    let activeCategory = 'all';

    // Add global SEO keywords so that searches for office location or owners return all core services
    const globalKeywords = "nallapadu s.r.o sro revenue guntur kancharla nagaraju ramadevi sai teja dtp";
    services.forEach(service => {
        service.keywords = (service.keywords ? service.keywords + " " : "") + globalKeywords;
    });

    updateResults();

    // Search Functionality
    searchInput.addEventListener('input', (e) => {
        updateResults();
    });

    // Category Filtering
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            activeCategory = tab.dataset.category;
            updateResults();
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === '/' && document.activeElement !== searchInput) {
            event.preventDefault();
            searchInput.focus();
        }
    });

    document.getElementById('currentYear').textContent = new Date().getFullYear();

    function updateResults() {
        const searchTerms = searchInput.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
        const filteredServices = services.filter(service => {
            const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
            const searchableText = `${service.name} ${service.description} ${service.keywords || ''} ${service.category}`.toLowerCase();
            return matchesCategory && searchTerms.every(term => searchableText.includes(term));
        });

        const categoryLabel = activeCategory === 'all' ? 'all categories' : activeCategory;
        resultsSummary.textContent = `${filteredServices.length} ${filteredServices.length === 1 ? 'service' : 'services'} in ${categoryLabel}`;
        renderServices(filteredServices);
    }

    // Render Function
    function renderServices(serviceList) {
        servicesGrid.innerHTML = '';

        if (serviceList.length === 0) {
            servicesGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <p>No services found matching your search.</p>
                </div>
            `;
            return;
        }

        serviceList.forEach((service, index) => {
            const card = document.createElement('a');
            card.href = service.url;
            card.className = 'service-card';
            card.target = '_blank'; // Open in new tab
            card.rel = 'noopener noreferrer';

            card.innerHTML = `
                <div class="service-icon">
                    <i class="fa-solid ${service.icon}"></i>
                </div>
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <i class="fa-solid fa-arrow-right card-arrow"></i>
            `;

            card.style.animation = `fadeInUp 0.45s ease ${Math.min(index, 8) * 45}ms forwards`;

            servicesGrid.appendChild(card);
        });
    }

    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
