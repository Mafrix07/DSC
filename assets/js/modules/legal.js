/**
 * DATASECUR CONSULTING - MODULE PAGES LÉGALES (ROUTEUR CLIENT)
 * Affichage plein écran sans rechargement (Mentions, Confidentialité, Cookies, Crédits)
 */
import { CookieConsentManager } from './cookies.js';

export const LegalPagesRouter = {
    mainPage: null,
    legalPages: null,
    pageTransition: null,

    init() {
        this.mainPage = document.getElementById('mainPage');
        this.legalPages = document.querySelectorAll('.legal-page');
        this.pageTransition = document.getElementById('pageTransition');

        const showMentionsBtn = document.getElementById('showMentionsLegales');
        const showPrivacyBtn = document.getElementById('showPrivacyPolicy');
        const showCookieFooterBtn = document.getElementById('showCookiePolicyFooter');
        const showCookieBannerLink = document.getElementById('showCookiePolicy');
        const showCreditsBtn = document.getElementById('showCredits');
        const openCookieSettingsFromPageBtn = document.getElementById('openCookieSettingsFromPage');
        const backToLegalHomeBtns = document.querySelectorAll('.back-to-legal-home');

        if (showMentionsBtn) {
            showMentionsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLegalPage('mentionsLegalesPage');
            });
        }

        if (showPrivacyBtn) {
            showPrivacyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLegalPage('privacyPolicyPage');
            });
        }

        if (showCookieFooterBtn) {
            showCookieFooterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLegalPage('cookiePolicyPage');
            });
        }

        if (showCookieBannerLink) {
            showCookieBannerLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLegalPage('cookiePolicyPage');
            });
        }

        if (showCreditsBtn) {
            showCreditsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLegalPage('creditsPage');
            });
        }

        if (openCookieSettingsFromPageBtn) {
            openCookieSettingsFromPageBtn.addEventListener('click', (e) => {
                e.preventDefault();
                CookieConsentManager.openModal();
            });
        }

        backToLegalHomeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.returnToMainPage();
            });
        });
    },

    hideAllLegalPages() {
        this.legalPages.forEach(p => p.classList.remove('active'));
    },

    showLegalPage(pageId) {
        if (!this.pageTransition) {
            if (this.mainPage) this.mainPage.style.display = 'none';
            this.hideAllLegalPages();
            const targetPage = document.getElementById(pageId);
            if (targetPage) targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'instant' });
            return;
        }

        this.pageTransition.classList.remove('hidden');
        setTimeout(() => {
            if (this.mainPage) this.mainPage.style.display = 'none';
            this.hideAllLegalPages();
            const targetPage = document.getElementById(pageId);
            if (targetPage) targetPage.classList.add('active');
            this.pageTransition.classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 280);
    },

    returnToMainPage() {
        if (!this.pageTransition) {
            this.hideAllLegalPages();
            if (this.mainPage) this.mainPage.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'instant' });
            return;
        }

        this.pageTransition.classList.remove('hidden');
        setTimeout(() => {
            this.hideAllLegalPages();
            if (this.mainPage) this.mainPage.style.display = 'block';
            this.pageTransition.classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 280);
    }
};
