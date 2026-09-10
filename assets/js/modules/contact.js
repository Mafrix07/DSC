/**
 * DATASECUR CONSULTING - MODULE FORMULAIRE DE CONTACT
 * Validation stricte côté client, transmission sécurisée simulée & feedback toast
 */
import { ToastNotification } from './toast.js';

export const ContactFormManager = {
    init() {
        const contactForm = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const consentCheckbox = document.getElementById('contactConsent') || document.getElementById('consent');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const consentError = document.getElementById('consentError');
        const submitBtn = document.getElementById('submitContactBtn') || document.getElementById('submitBtn');

        const validateEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                let isValid = true;

                if (nameError) nameError.textContent = '';
                if (emailError) emailError.textContent = '';
                if (messageError) messageError.textContent = '';
                if (consentError) consentError.textContent = '';

                if (nameInput && nameInput.value.trim().length < 2) {
                    if (nameError) nameError.textContent = 'Veuillez renseigner votre nom complet.';
                    nameInput.focus();
                    isValid = false;
                }

                if (emailInput && (!emailInput.value.trim() || !validateEmail(emailInput.value.trim()))) {
                    if (emailError) emailError.textContent = 'Veuillez saisir une adresse email professionnelle valide.';
                    if (isValid) emailInput.focus();
                    isValid = false;
                }

                if (messageInput && messageInput.value.trim().length < 10) {
                    if (messageError) messageError.textContent = 'Veuillez préciser votre message ou contexte (au moins 10 caractères).';
                    if (isValid) messageInput.focus();
                    isValid = false;
                }

                if (consentCheckbox && !consentCheckbox.checked) {
                    if (consentError) consentError.textContent = 'Votre accord est requis pour traiter votre demande.';
                    isValid = false;
                }

                if (!isValid) return;

                if (submitBtn) {
                    const originalContent = submitBtn.innerHTML;
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<span><i class="fas fa-circle-notch fa-spin"></i> Transmission sécurisée en cours...</span>';

                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalContent;
                        contactForm.reset();

                        const summaryBadge = document.getElementById('diagnosticSummaryBadge');
                        if (summaryBadge) summaryBadge.style.display = 'none';

                        ToastNotification.show('Votre demande a bien été transmise à notre cabinet. Un consultant de notre équipe examinera vos éléments dans les plus brefs délais.', 'success');
                    }, 1200);
                }
            });
        }
    }
};
