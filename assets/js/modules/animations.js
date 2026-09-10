/**
 * DATASECUR CONSULTING - MODULE ANIMATIONS & COMPTEURS STATISTIQUES
 * IntersectionObserver au défilement & animation fluide des compteurs
 */
export const AnimationManager = {
    init() {
        this.initPageLoader();
        this.initScrollAnimations();
        this.initStatsCounters();
    },

    initPageLoader() {
        const pageTransition = document.getElementById('pageTransition');
        if (pageTransition) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    pageTransition.classList.add('hidden');
                }, 300);
            });
        }
    },

    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if (!animatedElements.length) return;

        const checkAnimation = () => {
            const triggerBottom = window.innerHeight * 0.9;
            animatedElements.forEach(el => {
                const elTop = el.getBoundingClientRect().top;
                if (elTop < triggerBottom) {
                    el.classList.add('animated');
                }
            });
        };

        window.addEventListener('scroll', checkAnimation, { passive: true });
        checkAnimation();
    },

    initStatsCounters() {
        const statsSection = document.getElementById('stats');
        const statNumbers = document.querySelectorAll('.stat-number');
        if (!statsSection || !statNumbers.length) return;

        let statsCounted = false;

        const checkStats = () => {
            if (statsCounted) return;
            const rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                statsCounted = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
                    const duration = 1500;
                    const startTime = performance.now();

                    function updateCount(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(easeOut * target);
                        stat.textContent = current;

                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.textContent = target;
                        }
                    }
                    requestAnimationFrame(updateCount);
                });
            }
        };

        window.addEventListener('scroll', checkStats, { passive: true });
        checkStats();
    }
};
