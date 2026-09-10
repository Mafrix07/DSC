/**
 * DATASECUR CONSULTING - MODULE SERVICES & MODALES DE PRESTATION
 * Fiches détaillées interactives & gestion des formules / packages
 */
import { ToastNotification } from './toast.js';

export const ServiceModalManager = {
    serviceDetailsData: {
        'audit': {
            title: 'Audit & Cartographie des Données Personnelles',
            icon: 'fa-magnifying-glass-chart',
            html: `
                <h4>Cadre Légal & Objectif</h4>
                <p>Obligation fondamentale imposée par l'article 23 de la Loi togolaise n° 2019-014 et le RGPD : tout organisme public ou privé doit être en mesure d'inventorier avec précision l'ensemble des données qu'il collecte, traite et stocke.</p>
                
                <h4>Notre Périmètre d'Intervention</h4>
                <ul>
                    <li><strong>Recensement complet des traitements :</strong> Fichiers RH, bases prospects/clients, vidéosurveillance, données financières, outils SaaS et transferts transfrontaliers.</li>
                    <li><strong>Analyse de licéité :</strong> Vérification de la base légale de chaque traitement (consentement explicite, obligation légale, contrat, intérêt légitime).</li>
                    <li><strong>Contrôle de la politique de rétention :</strong> Définition des durées de conservation conformes et protocoles de purge sécurisée.</li>
                </ul>

                <h4>Livrables Officiels Remis</h4>
                <div class="modal-deliverable-highlight">
                    <p><strong>1. Registre des Traitements :</strong> Document formalisé, certifié et prêt pour transmission à l'APDP Togo en cas de contrôle.</p>
                    <p><strong>2. Matrice d'Écarts & Plan d'Action :</strong> Tableau synthétique classant les failles identifiées par ordre de priorité juridique et technique.</p>
                </div>
            `
        },
        'dpo': {
            title: 'DPO Externalisé & Délégué à la Protection des Données',
            icon: 'fa-user-tie',
            html: `
                <h4>La Solution de Gouvernance Clé en Main</h4>
                <p>Désigner un Délégué à la Protection des Données (DPO) qualifié est obligatoire pour les structures manipulant des données sensibles ou procédant à un suivi régulier des personnes. L'externalisation garantit une expertise de haut niveau sans les coûts fixes d'un recrutement interne.</p>

                <h4>Missions Assurées par Datasecur</h4>
                <ul>
                    <li><strong>Interlocuteur officiel auprès de l'APDP Togo :</strong> Déclaration officielle de désignation, réponses aux courriers et gestion des demandes de l'autorité.</li>
                    <li><strong>Point de contact pour les personnes concernées :</strong> Traitement rigoureux et dans les délais légaux des demandes de droit d'accès, de rectification ou d'opposition.</li>
                    <li><strong>Veille juridique et technique continue :</strong> Analyse d'impact (AIPD/PIA) lors du lancement de nouveaux produits, applications mobiles ou logiciels internes.</li>
                </ul>

                <h4>Livrables & Modalités</h4>
                <div class="modal-deliverable-highlight">
                    <p><strong>Rapports d'Activité DPO Semestriels :</strong> Bilan formel présenté à la Direction Générale et au Conseil d'Administration attestant de la conformité active.</p>
                </div>
            `
        },
        'security': {
            title: 'Sécurisation des SI & Charte Informatique',
            icon: 'fa-shield-halved',
            html: `
                <h4>L'Épaule Technique de la Conformité</h4>
                <p>La conformité juridique s'appuie sur un système d'information robuste. La loi exige la mise en œuvre de mesures techniques et organisationnelles appropriées pour empêcher toute fuite ou altération des données.</p>

                <h4>Actions Réalisées</h4>
                <ul>
                    <li><strong>Revue d'architecture de sécurité :</strong> Cloisonnement réseau, gestion des droits d'accès administrateurs et chiffrement des sauvegardes.</li>
                    <li><strong>Rédaction de la Charte Informatique d'Entreprise :</strong> Document juridique annexé au règlement intérieur encadrant les usages des messageries, du télétravail et des supports amovibles.</li>
                    <li><strong>Clauses sous-traitants IT :</strong> Rédaction et négociation des accords de traitement de données (DPA) avec vos hébergeurs, développeurs et prestataires cloud.</li>
                </ul>
            `
        },
        'training': {
            title: 'Formation & Sensibilisation Anti-Phishing',
            icon: 'fa-graduation-cap',
            html: `
                <h4>Le Facteur Humain : Premier Maillon de Défense</h4>
                <p>La majorité des incidents de sécurité débutent par une vigilance humaine prise en défaut : clic sur un email suspect (phishing), mot de passe partagé ou perte d'un support non chiffré.</p>

                <h4>Programme Pédagogique Concret</h4>
                <ul>
                    <li><strong>Sessions interactives sur site ou visio :</strong> Cas pratiques d'ingénierie sociale, ransomwares et pièges numériques courants en entreprise.</li>
                    <li><strong>Campagnes de simulation de phishing :</strong> Exercices bienveillants de test pour mesurer le niveau de vigilance et acquérir les bons réflexes.</li>
                    <li><strong>Fiches mémos & Guide du collaborateur :</strong> Livret des bonnes pratiques remis à chaque salarié.</li>
                </ul>
            `
        },
        'certification': {
            title: 'Préparation à la Certification ISO 27001',
            icon: 'fa-award',
            html: `
                <h4>Excellence & Reconnaissance Internationale</h4>
                <p>Pour les banques, microfinances, assurances, fintechs et opérateurs télécoms, la norme ISO/IEC 27001 est la référence mondiale en matière de Système de Management de la Sécurité de l'Information (SMSI).</p>

                <h4>Accompagnement par nos Auditeurs Certifiés</h4>
                <ul>
                    <li><strong>Diagnostic initial d'alignement :</strong> Analyse des 93 mesures de sécurité de l'Annexe A de l'ISO 27001:2022.</li>
                    <li><strong>Construction de la PSSI :</strong> Rédaction de la Politique de Sécurité des Systèmes d'Information et procédures associées.</li>
                    <li><strong>Audit à blanc :</strong> Simulation complète des conditions d'audit de certification pour garantir le succès le jour de l'évaluation finale.</li>
                </ul>
            `
        },
        'incident': {
            title: 'Gestion de Crise Cyber & Notification sous 72h',
            icon: 'fa-triangle-exclamation',
            html: `
                <h4>Assistance Réactive d'Urgence</h4>
                <p>En cas d'incident de sécurité avéré (fuite, attaque ransomware, compromission de base de données), la réglementation impose de notifier l'autorité de contrôle (APDP) dans un délai maximal de <strong>72 heures</strong>.</p>

                <h4>Cellule d'Urgence Datasecur</h4>
                <ul>
                    <li><strong>Qualification de l'incident :</strong> Évaluation de la gravité et des risques pour les droits et libertés des personnes concernées.</li>
                    <li><strong>Rédaction de la notification légale APDP :</strong> Documentation obligatoire des faits, des conséquences et des mesures correctives prises.</li>
                    <li><strong>Communication de crise :</strong> Modèles de notification aux personnes impactées et stratégie de préservation de la réputation de l'organisation.</li>
                </ul>
            `
        }
    },

    init() {
        this.serviceDetailsData['securite'] = this.serviceDetailsData['security'];
        this.serviceDetailsData['formation'] = this.serviceDetailsData['training'];
        this.serviceDetailsData['iso27001'] = this.serviceDetailsData['certification'];
        this.serviceDetailsData['crise'] = this.serviceDetailsData['incident'];

        const serviceModal = document.getElementById('serviceModal');
        const closeServiceModal = document.getElementById('closeServiceModal');
        const modalCloseBtn = document.getElementById('modalCloseBtn');

        document.querySelectorAll('.open-service-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const serviceKey = btn.getAttribute('data-service');
                this.openServiceModal(serviceKey);
            });
        });

        if (closeServiceModal) closeServiceModal.addEventListener('click', () => this.closeModal());
        if (modalCloseBtn) modalCloseBtn.addEventListener('click', () => this.closeModal());
        if (serviceModal) {
            serviceModal.addEventListener('click', (e) => {
                if (e.target === serviceModal) this.closeModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && serviceModal && serviceModal.classList.contains('active')) {
                this.closeModal();
            }
        });

        this.initPackageSelection();
    },

    openServiceModal(serviceKey) {
        const data = this.serviceDetailsData[serviceKey];
        const serviceModal = document.getElementById('serviceModal');
        if (!data || !serviceModal) return;

        const modalServiceTitle = document.getElementById('modalServiceTitle');
        const modalServiceIcon = document.getElementById('modalServiceIcon');
        const modalServiceBody = document.getElementById('modalServiceBody');
        const modalServiceCta = document.getElementById('modalServiceCta');

        if (modalServiceTitle) modalServiceTitle.textContent = data.title;
        if (modalServiceIcon) modalServiceIcon.innerHTML = `<i class="fas ${data.icon}"></i>`;
        if (modalServiceBody) modalServiceBody.innerHTML = data.html;

        if (modalServiceCta) {
            modalServiceCta.onclick = (e) => {
                e.preventDefault();
                this.closeModal();
                const serviceSelect = document.getElementById('service');
                if (serviceSelect) {
                    const normalizedKey = (serviceKey === 'securite') ? 'security' :
                                         (serviceKey === 'formation') ? 'training' :
                                         (serviceKey === 'iso27001') ? 'certification' :
                                         (serviceKey === 'crise') ? 'incident' : serviceKey;
                    if (serviceSelect.querySelector(`option[value="${normalizedKey}"]`)) {
                        serviceSelect.value = normalizedKey;
                    }
                }
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                        const nameInput = document.getElementById('name');
                        if (nameInput) nameInput.focus();
                    }, 500);
                }
            };
        }

        serviceModal.classList.add('active');
        serviceModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    },

    closeModal() {
        const serviceModal = document.getElementById('serviceModal');
        if (!serviceModal) return;
        serviceModal.classList.remove('active');
        serviceModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    },

    initPackageSelection() {
        document.querySelectorAll('.select-package-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const packageName = this.getAttribute('data-package') || '';
                const serviceSelect = document.getElementById('service');
                const messageTextarea = document.getElementById('message');
                const contactSection = document.getElementById('contact');

                if (serviceSelect) {
                    if (packageName.includes('Diagnostic')) serviceSelect.value = 'pack-express';
                    else if (packageName.includes('DPO')) serviceSelect.value = 'pack-dpo';
                    else if (packageName.includes('Sécurité')) serviceSelect.value = 'pack-360';
                }

                if (messageTextarea) {
                    messageTextarea.value = `Bonjour Datasecur Consulting,

Je suis intéressé(e) par votre formule « ${packageName} ».

Merci de bien vouloir me recontacter pour planifier un premier échange de cadrage et nous transmettre les modalités de déploiement.`;
                }

                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                        const nameInput = document.getElementById('name');
                        if (nameInput) nameInput.focus();
                    }, 600);
                }

                ToastNotification.show(`Formule sélectionnée : ${packageName}`, 'info');
            });
        });
    }
};
