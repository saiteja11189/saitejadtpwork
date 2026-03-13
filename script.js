document.addEventListener('DOMContentLoaded', () => {
    const servicesGrid = document.getElementById('servicesGrid');
    const searchInput = document.getElementById('serviceSearch');
    const tabs = document.querySelectorAll('.tab');

    // Add global SEO keywords so that searches for office location or owners return all core services
    const globalKeywords = "nallapadu s.r.o sro revenue guntur kancharla nagaraju ramadevi sai teja dtp";
    services.forEach(service => {
        service.keywords = (service.keywords ? service.keywords + " " : "") + globalKeywords;
    });

    // Initial Render
    renderServices(services);

    // Search Functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        // Split search terms to allow matching parts (e.g. searching "nallapadu sro")
        const searchTerms = searchTerm.split(' ').filter(term => term.length > 0);

        if (searchTerms.length === 0) {
            renderServices(services);
            return;
        }

        const filteredServices = services.filter(service => {
            const searchableText = `${service.name} ${service.description} ${service.keywords || ''} ${service.category}`.toLowerCase();
            // Check if all search terms are present in the searchable text
            return searchTerms.every(term => searchableText.includes(term));
        });
        
        renderServices(filteredServices);
    });

    // Category Filtering
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            const category = tab.dataset.category;
            if (category === 'all') {
                renderServices(services);
            } else {
                const filteredServices = services.filter(service => service.category === category);
                renderServices(filteredServices);
            }
        });
    });

    // Render Function
    function renderServices(serviceList) {
        servicesGrid.innerHTML = '';

        if (serviceList.length === 0) {
            servicesGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">
                    <i class="fa-solid fa-ghost" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>No services found matching your search.</p>
                </div>
            `;
            return;
        }

        serviceList.forEach(service => {
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

            // Add animation delay for staggered entrance
            card.style.animation = 'fadeInUp 0.5s ease forwards';

            servicesGrid.appendChild(card);
        });
    }

    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Add keyframes for animation dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(styleSheet);
