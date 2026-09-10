/**
 * DATASECUR CONSULTING - MODULE THÈME (DARK / LIGHT MODE)
 * Gestion du basculement de thème et persistance
 */
import { ToastNotification } from './toast.js';

export const ThemeManager = {
    themeToggleBtn: null,
    htmlElement: null,
    bodyElement: null,
    storageKey: 'datasecur_theme_pref',

    init() {
        this.themeToggleBtn = document.getElementById('themeToggleBtn');
        this.htmlElement = document.documentElement;
        this.bodyElement = document.body;

        const savedTheme = localStorage.getItem(this.storageKey);
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
        
        this.apply(initialTheme, false);

        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const current = this.htmlElement.getAttribute('data-theme') || 'light';
                const next = current === 'dark' ? 'light' : 'dark';
                this.apply(next, true);
            });
        }
    },

    apply(theme, showToast = false) {
        if (theme === 'dark') {
            this.htmlElement.setAttribute('data-theme', 'dark');
            this.htmlElement.classList.add('dark-theme');
            this.bodyElement.classList.add('dark-theme');
            localStorage.setItem(this.storageKey, 'dark');
        } else {
            this.htmlElement.setAttribute('data-theme', 'light');
            this.htmlElement.classList.remove('dark-theme');
            this.bodyElement.classList.remove('dark-theme');
            localStorage.setItem(this.storageKey, 'light');
        }

        if (showToast) {
            ToastNotification.show(`Mode ${theme === 'dark' ? 'Sombre' : 'Clair'} activé`, 'info');
        }
    }
};
