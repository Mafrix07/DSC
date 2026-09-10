/**
 * DATASECUR CONSULTING - MODULE CONSENTEMENT COOKIES (APDP / RGPD)
 * Bannière de consentement, modale de personnalisation, lecture/écriture des cookies
 */
import { ToastNotification } from './toast.js';

export const CookieConsentManager = {
    banner: null,
    modal: null,
    acceptAllBtn: null,
    refuseBtn: null,
    settingsBtn: null,
    closeModalBtn: null,
    savePrefsBtn: null,
    acceptModalBtn: null,
    analyticsCheckbox: null,
    prefCheckbox: null,
    cookieName: 'datasecur_cookie_consent_status',

    init() {
        this.banner = document.getElementById('cookieConsent');
        this.modal = document.getElementById('cookieModal');
        this.acceptAllBtn = document.getElementById('acceptAllCookies');
        this.refuseBtn = document.getElementById('refuseNonEssential');
        this.settingsBtn = document.getElementById('cookieSettings');
        this.closeModalBtn = document.getElementById('closeCookieModal');
        this.savePrefsBtn = document.getElementById('saveCookiePreferences');
        this.acceptModalBtn = document.getElementById('acceptAllInModal');
        this.analyticsCheckbox = document.getElementById('analyticsCookies');
        this.prefCheckbox = document.getElementById('preferenceCookies');

        if (this.acceptAllBtn) {
            this.acceptAllBtn.addEventListener('click', () => this.saveConsent('all'));
        }
        if (this.refuseBtn) {
            this.refuseBtn.addEventListener('click', () => this.saveConsent('essential'));
        }
        if (this.settingsBtn) {
            this.settingsBtn.addEventListener('click', () => this.openModal());
        }
        if (this.closeModalBtn) {
            this.closeModalBtn.addEventListener('click', () => this.closeModal());
        }
        if (this.savePrefsBtn) {
            this.savePrefsBtn.addEventListener('click', () => {
                const analytics = this.analyticsCheckbox ? this.analyticsCheckbox.checked : false;
                const prefs = this.prefCheckbox ? this.prefCheckbox.checked : false;
                this.saveCustom(analytics, prefs);
            });
        }
        if (this.acceptModalBtn) {
            this.acceptModalBtn.addEventListener('click', () => this.saveConsent('all'));
        }

        setTimeout(() => {
            this.checkInitial();
        }, 700);
    },

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    },

    checkInitial() {
        const consent = this.getCookie(this.cookieName);
        if (!consent && this.banner) {
            this.banner.classList.add('active');
        }
    },

    openModal() {
        if (this.banner) this.banner.classList.remove('active');
        if (this.modal) this.modal.classList.add('active');
    },

    closeModal() {
        if (this.modal) this.modal.classList.remove('active');
        if (!this.getCookie(this.cookieName) && this.banner) {
            this.banner.classList.add('active');
        }
    },

    saveConsent(type) {
        this.setCookie(this.cookieName, type, 365);
        if (this.banner) this.banner.classList.remove('active');
        if (this.modal) this.modal.classList.remove('active');
        ToastNotification.show('Vos préférences de confidentialité ont été enregistrées.', 'success');
    },

    saveCustom(analytics, prefs) {
        this.setCookie(this.cookieName, JSON.stringify({ analytics, prefs }), 365);
        if (this.modal) this.modal.classList.remove('active');
        ToastNotification.show('Vos choix de confidentialité ont été sauvegardés.', 'success');
    }
};
