/**
 * DATASECUR CONSULTING - MODULE NAVIGATION & SCROLLSPY
 * Sticky Header, Barre de progression, ScrollSpy 5 pôles, Menu Mobile & Back-to-Top
 */
export const NavigationManager = {
    header: null,
    progressBar: null,
    backToTopBtn: null,
    navLinks: null,
    sections: null,
    mobileMenuBtn: null,
    navMenu: null,

    sectionToNavMap: {
        'home': 'home',
        'stats': 'about',
        'authority': 'about',
        'about': 'about',
        'team': 'about',
        'services': 'services',
        'packages': 'services',
        'methodology': 'services',
        'testimonials': 'services',
        'faq': 'services',
        'simulator': 'simulator',
        'contact': 'contact'
    },

    init() {
        this.header = document.getElementById('header');
        this.progressBar = document.getElementById('progressBar');
        this.backToTopBtn = document.getElementById('backToTop');
        this.navLinks = document.querySelectorAll('#navMenu a.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navMenu = document.getElementById('navMenu');

        this.initScrollHandlers();
        this.initMobileMenu();
        this.initBackToTop();
    },

    initScrollHandlers() {
        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            if (this.progressBar && scrollHeight > 0) {
                const scrollPercentage = (scrollTop / scrollHeight) * 100;
                this.progressBar.style.width = scrollPercentage + '%';
            }

            if (this.header) {
                this.header.classList.toggle('scrolled', scrollTop > 40);
            }

            if (this.backToTopBtn) {
                this.backToTopBtn.classList.toggle('show', scrollTop > 400);
            }

            let currentSectionId = '';
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop - 180;
                const sectionHeight = section.offsetHeight;
                if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            const targetNavId = this.sectionToNavMap[currentSectionId] || currentSectionId;

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${targetNavId}`) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    },

    initMobileMenu() {
        if (!this.mobileMenuBtn || !this.navMenu) return;

        this.mobileMenuBtn.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            const isOpen = this.navMenu.classList.contains('active');
            this.mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            this.mobileMenuBtn.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        const allNavLinks = this.navMenu.querySelectorAll('a');
        allNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (this.navMenu.classList.contains('active') && !this.navMenu.contains(e.target) && !this.mobileMenuBtn.contains(e.target)) {
                this.navMenu.classList.remove('active');
                this.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.navMenu.classList.remove('active');
                this.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                this.mobileMenuBtn.focus();
            }
        });
    },

    initBackToTop() {
        if (!this.backToTopBtn) return;
        this.backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
};
