/**
 * DATASECUR CONSULTING - MODULE FAQ INTERACTIVE
 * Accordéon fluide, filtrage par catégories & recherche textuelle instantanée
 */
export const FaqManager = {
    init() {
        const faqItems = document.querySelectorAll('.faq-item');
        const faqSearchInput = document.getElementById('faqSearchInput');
        const faqClearSearch = document.getElementById('faqSearchClear') || document.getElementById('faqClearSearch');
        const filterPills = document.querySelectorAll('.filter-pill');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) otherItem.classList.remove('active');
                    });
                    item.classList.toggle('active', !isActive);
                });
            }
        });

        const filterFaq = () => {
            const searchQuery = (faqSearchInput ? faqSearchInput.value : '').toLowerCase().trim();
            const activeCategory = document.querySelector('.filter-pill.active')?.getAttribute('data-category') || 
                                   document.querySelector('.filter-pill.active')?.getAttribute('data-filter') || 'all';

            if (faqClearSearch) {
                faqClearSearch.style.display = searchQuery.length > 0 ? 'block' : 'none';
            }

            faqItems.forEach(item => {
                const category = item.getAttribute('data-category') || item.getAttribute('data-filter') || '';
                const questionText = item.querySelector('h3')?.textContent.toLowerCase() || '';
                const answerText = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';

                const matchesCategory = (activeCategory === 'all' || category === activeCategory);
                const matchesSearch = (searchQuery === '' || questionText.includes(searchQuery) || answerText.includes(searchQuery));

                if (matchesCategory && matchesSearch) {
                    item.classList.remove('hide-by-filter');
                } else {
                    item.classList.add('hide-by-filter');
                    item.classList.remove('active');
                }
            });
        };

        if (faqSearchInput) {
            faqSearchInput.addEventListener('input', filterFaq);
        }

        if (faqClearSearch) {
            faqClearSearch.addEventListener('click', () => {
                faqSearchInput.value = '';
                filterFaq();
                faqSearchInput.focus();
            });
        }

        filterPills.forEach(pill => {
            pill.addEventListener('click', function() {
                filterPills.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                filterFaq();
            });
        });
    }
};
