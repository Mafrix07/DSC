/**
 * DATASECUR CONSULTING - SCRIPT MAÎTRE (MAIN ORCHESTRATOR)
 * Cabinet d'Expertise en Protection des Données (APDP, RGPD) & Cybersécurité
 * Lomé, Togo • Zone CEDEAO / UEMOA
 */

import { ThemeManager } from './modules/theme.js';
import { NavigationManager } from './modules/navigation.js';
import { AnimationManager } from './modules/animations.js';
import { MaturityQuiz } from './modules/simulator.js';
import { ServiceModalManager } from './modules/services.js';
import { FaqManager } from './modules/faq.js';
import { ContactFormManager } from './modules/contact.js';
import { CookieConsentManager } from './modules/cookies.js';
import { LegalPagesRouter } from './modules/legal.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialisation du Thème (Dark / Light)
    ThemeManager.init();

    // 2. Navigation, Sticky Header, ScrollSpy & Mobile Menu
    NavigationManager.init();

    // 3. Animations au défilement & Compteurs de statistiques
    AnimationManager.init();

    // 4. Simulateur de Conformité APDP & RGPD
    MaturityQuiz.init();

    // 5. Modales des fiches de prestations & sélection de packages
    ServiceModalManager.init();

    // 6. FAQ Interactive (Recherche, Filtres & Accordéons)
    FaqManager.init();

    // 7. Formulaire de contact sécurisé & Toast notifications
    ContactFormManager.init();

    // 8. Gestionnaire de consentement aux cookies
    CookieConsentManager.init();

    // 9. Routeur des sous-pages légales
    LegalPagesRouter.init();
});
