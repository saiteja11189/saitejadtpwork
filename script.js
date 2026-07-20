document.addEventListener('DOMContentLoaded', () => {
    const servicesGrid = document.getElementById('servicesGrid');
    const searchInput = document.getElementById('serviceSearch');
    const serviceCount = document.getElementById('serviceCount');
    const tabs = [...document.querySelectorAll('.tab')];
    const quickLinks = document.querySelectorAll('[data-search]');
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.getElementById('primaryNav');
    let activeCategory = 'all';

    const globalKeywords = 'nallapadu sro revenue guntur kancharla nagaraju ramadevi sai teja dtp';

    function getFilteredServices() {
        const searchTerms = searchInput.value.toLowerCase().trim().split(/\s+/).filter(Boolean);

        return services.filter((service) => {
            const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
            const searchableText = `${service.name} ${service.description} ${service.keywords || ''} ${service.category} ${globalKeywords}`.toLowerCase();
            const matchesSearch = searchTerms.every((term) => searchableText.includes(term));
            return matchesCategory && matchesSearch;
        });
    }

    function renderServices() {
        const serviceList = getFilteredServices();
        servicesGrid.replaceChildren();
        serviceCount.textContent = `${serviceList.length} service${serviceList.length === 1 ? '' : 's'} shown`;

        if (!serviceList.length) {
            servicesGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <strong>No matching services found</strong>
                    <p>Try a shorter search or choose another category.</p>
                </div>
            `;
            return;
        }

        serviceList.forEach((service, index) => {
            const card = document.createElement('a');
            card.href = service.url;
            card.className = 'service-card';
            card.target = '_blank';
            card.rel = 'noopener noreferrer';
            card.style.animationDelay = `${Math.min(index * 35, 280)}ms`;
            card.setAttribute('aria-label', `${service.name} (opens in a new tab)`);
            card.innerHTML = `
                <div class="service-icon"><i class="fa-solid ${service.icon}" aria-hidden="true"></i></div>
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <i class="fa-solid fa-arrow-right card-arrow" aria-hidden="true"></i>
            `;
            servicesGrid.appendChild(card);
        });
    }

    searchInput.addEventListener('input', renderServices);

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            activeCategory = tab.dataset.category;
            tabs.forEach((item) => {
                const isActive = item === tab;
                item.classList.toggle('active', isActive);
                item.setAttribute('aria-pressed', String(isActive));
            });
            renderServices();
        });
    });

    quickLinks.forEach((link) => {
        link.addEventListener('click', () => {
            searchInput.value = link.dataset.search;
            activeCategory = 'all';
            tabs.forEach((tab) => {
                const isAll = tab.dataset.category === 'all';
                tab.classList.toggle('active', isAll);
                tab.setAttribute('aria-pressed', String(isAll));
            });
            renderServices();
        });
    });

    menuToggle.addEventListener('click', () => {
        const isOpen = navigation.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        menuToggle.innerHTML = `<i class="fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}"></i>`;
    });

    navigation.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navigation.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation');
            menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });

    document.getElementById('currentYear').textContent = new Date().getFullYear();
    renderServices();
});
