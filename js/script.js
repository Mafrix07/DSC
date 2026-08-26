/**
 * DATASECUR CONSULTING - LOGIQUE MÉTIER & INTERACTIVITÉ (Version 2.4)
 * Cabinet d'Expertise en Protection des Données (APDP, RGPD) & Cybersécurité
 * Lomé, Togo • Zone CEDEAO / UEMOA
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. GESTION DU THÈME D'AFFICHAGE (DARK / LIGHT MODE FIABLE)
    // ==========================================================================
    const ThemeManager = {
        themeToggleBtn: document.getElementById('themeToggleBtn'),
        htmlElement: document.documentElement,
        bodyElement: document.body,
        storageKey: 'datasecur_theme_pref',

        init() {
            const savedTheme = localStorage.getItem(this.storageKey);
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
            
            this.apply(initialTheme);

            if (this.themeToggleBtn) {
                this.themeToggleBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const current = this.htmlElement.getAttribute('data-theme') || 'light';
                    const next = current === 'dark' ? 'light' : 'dark';
                    this.apply(next);
                    ToastNotification.show(`Mode ${next === 'dark' ? 'Sombre' : 'Clair'} activé`, 'info');
                });
            }
        },

        apply(theme) {
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
        }
    };

    ThemeManager.init();

    // ==========================================================================
    // 2. PAGE TRANSITION & LOADER
    // ==========================================================================
    const pageTransition = document.getElementById('pageTransition');
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (pageTransition) pageTransition.classList.add('hidden');
        }, 300);
        
        setTimeout(() => {
            CookieConsentManager.checkInitial();
        }, 700);
    });

    // ==========================================================================
    // 3. BARRE DE PROGRESSION & SCROLLSPY AVEC 5 PÔLES MAÎTRES
    // ==========================================================================
    const header = document.getElementById('header');
    const progressBar = document.getElementById('progressBar');
    const backToTopBtn = document.getElementById('backToTop');
    const navLinks = document.querySelectorAll('#navMenu a.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Mappage des sous-sections vers les 5 pôles de navigation principaux
    const sectionToNavMap = {
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
    };

    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        if (progressBar && scrollHeight > 0) {
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercentage + '%';
        }

        if (header) {
            header.classList.toggle('scrolled', scrollTop > 40);
        }

        if (backToTopBtn) {
            backToTopBtn.classList.toggle('show', scrollTop > 400);
        }

        // ScrollSpy fluide
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        const targetNavId = sectionToNavMap[currentSectionId] || currentSectionId;

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${targetNavId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================================
    // 4. MENU MOBILE & ACCESSIBILITÉ CLAVIER
    // ==========================================================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                mobileMenuBtn.focus();
            }
        });
    }

    // ==========================================================================
    // 5. ANIMATIONS AU SCROLL & COMPTEURS STATISTIQUES
    // ==========================================================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsCounted = false;

    function checkAnimation() {
        const triggerBottom = window.innerHeight * 0.9;
        animatedElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('animated');
            }
        });

        const statsSection = document.getElementById('stats');
        if (statsSection && !statsCounted) {
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
        }
    }

    window.addEventListener('scroll', checkAnimation);
    checkAnimation();

    // ==========================================================================
    // 6. SIMULATEUR DE CONFORMITÉ & TRANSMISSION AVEC BADGE VISUEL
    // ==========================================================================
    const MaturityQuiz = {
        currentStep: 1,
        totalPoints: 0,
        maxPoints: 14,
        answers: [],
        quizContent: document.getElementById('quizContent'),
        quizResult: document.getElementById('quizResult'),
        quizProgressBar: document.getElementById('quizProgressBar'),
        quizStepIndicator: document.getElementById('quizStepIndicator'),
        resultScoreValue: document.getElementById('resultScoreValue'),
        resultTitle: document.getElementById('resultTitle') || document.getElementById('resultVerdictTitle'),
        resultDescription: document.getElementById('resultDescription') || document.getElementById('resultVerdictDesc'),
        resultScoreCircle: document.getElementById('resultScoreCircle'),
        resultList: document.getElementById('resultList') || document.getElementById('resultRecList'),
        restartBtn: document.getElementById('restartQuiz') || document.getElementById('restartQuizBtn'),
        transferBtn: document.getElementById('applyQuizToContact') || document.getElementById('transferResultBtn'),

        init() {
            this.quizContent = document.getElementById('quizContent');
            this.quizResult = document.getElementById('quizResult');
            this.quizProgressBar = document.getElementById('quizProgressBar');
            this.quizStepIndicator = document.getElementById('quizStepIndicator');
            this.resultScoreValue = document.getElementById('resultScoreValue');
            this.resultTitle = document.getElementById('resultTitle') || document.getElementById('resultVerdictTitle');
            this.resultDescription = document.getElementById('resultDescription') || document.getElementById('resultVerdictDesc');
            this.resultScoreCircle = document.getElementById('resultScoreCircle');
            this.resultList = document.getElementById('resultList') || document.getElementById('resultRecList');
            this.restartBtn = document.getElementById('restartQuiz') || document.getElementById('restartQuizBtn');
            this.transferBtn = document.getElementById('applyQuizToContact') || document.getElementById('transferResultBtn');

            document.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const btn = e.currentTarget;
                    const points = parseInt(btn.getAttribute('data-points'), 10) || 0;
                    this.recordAnswer(points);
                });
            });

            if (this.restartBtn) {
                this.restartBtn.addEventListener('click', () => this.reset());
            }

            if (this.transferBtn) {
                this.transferBtn.addEventListener('click', () => this.transferToContact());
            }
        },

        recordAnswer(points) {
            this.totalPoints += points;
            this.answers.push(points);

            if (this.currentStep < 4) {
                this.goToStep(this.currentStep + 1);
            } else {
                this.renderResult();
            }
        },

        goToStep(stepNumber) {
            document.querySelectorAll('.quiz-step').forEach(step => {
                step.classList.remove('active');
            });
            const targetStep = document.querySelector(`.quiz-step[data-step="${stepNumber}"]`);
            if (targetStep) targetStep.classList.add('active');

            this.currentStep = stepNumber;
            if (this.quizStepIndicator) {
                this.quizStepIndicator.textContent = `QUESTION ${this.currentStep} SUR 4`;
            }
            if (this.quizProgressBar) {
                const percentage = (this.currentStep / 4) * 100;
                this.quizProgressBar.style.width = percentage + '%';
            }
        },

        renderResult() {
            if (this.quizContent) this.quizContent.style.display = 'none';
            if (this.quizStepIndicator) this.quizStepIndicator.textContent = 'DIAGNOSTIC TERMINÉ';
            if (this.quizProgressBar) this.quizProgressBar.style.width = '100%';

            const scorePercent = Math.min(Math.round((this.totalPoints / this.maxPoints) * 100), 100);
            if (this.resultScoreValue) this.resultScoreValue.textContent = scorePercent + '%';

            let verdictTitle = '';
            let verdictDesc = '';
            let colorBorder = '';
            let recommendations = [];

            if (scorePercent < 40) {
                verdictTitle = 'Risque Réglementaire & Sécurité Élevé';
                verdictDesc = 'Votre organisation ne dispose pas encore des fondamentaux requis par la Loi togolaise n° 2019-014 et le RGPD. Une structuration progressive de votre démarche vous permettra d\'anticiper les contrôles et de sécuriser vos activités.';
                colorBorder = 'var(--color-crimson-crisis)';
                recommendations = [
                    'Établir l\'inventaire de vos traitements de données (ressources humaines, fichiers clients, paiements).',
                    'Désigner un DPO externe qualifié pour accompagner la mise en conformité juridique et contractuelle.',
                    'Renforcer la politique des mots de passe et activer la double authentification (2FA) sur les outils clés.',
                    'Formaliser les mentions d\'information obligatoires sur vos formulaires et contrats.'
                ];
            } else if (scorePercent < 75) {
                verdictTitle = 'Niveau Intermédiaire : Des ajustements recommandés';
                verdictDesc = 'Votre entreprise applique déjà de bonnes pratiques, mais certains volets clés méritent d\'être complétés (registre à finaliser, clauses sous-traitants ou sensibilisation des équipes).';
                colorBorder = 'var(--color-amber-alert)';
                recommendations = [
                    'Finaliser et tenir à jour le Registre des Traitements conformément à la Loi APDP n° 2019-014.',
                    'Organiser une session de sensibilisation pratique aux réflexes de sécurité et anti-phishing.',
                    'Formaliser la procédure interne de notification des violations de données dans les 72 heures.',
                    'Vérifier les clauses de protection des données dans les contrats avec vos prestataires informatiques.'
                ];
            } else {
                verdictTitle = 'Bonne Maturité : Posture solide à pérenniser';
                verdictDesc = 'Votre organisation fait preuve d\'une gouvernance exemplaire. L\'enjeu est de maintenir ce niveau de conformité dans la durée et lors du lancement de nouveaux projets numériques.';
                colorBorder = 'var(--color-emerald-safe)';
                recommendations = [
                    'Programmer une revue périodique de votre Registre des Traitements.',
                    'Effectuer des audits réguliers de vos sauvegardes et de la sécurité des accès.',
                    'Envisager la préparation à la norme internationale ISO 27001 pour valoriser votre niveau de sécurité.',
                    'Maintenir une veille active sur les recommandations de l\'APDP Togo et les cadres régionaux.'
                ];
            }

            if (this.resultTitle) this.resultTitle.textContent = verdictTitle;
            if (this.resultDescription) this.resultDescription.textContent = verdictDesc;
            if (this.resultScoreCircle) this.resultScoreCircle.style.borderColor = colorBorder;

            if (this.resultList) {
                this.resultList.innerHTML = recommendations.map(rec => `<li><i class="fas fa-check-circle icon-success"></i> ${rec}</li>`).join('');
            }

            if (this.quizResult) this.quizResult.style.display = 'block';
        },

        reset() {
            this.currentStep = 1;
            this.totalPoints = 0;
            this.answers = [];
            if (this.quizResult) this.quizResult.style.display = 'none';
            if (this.quizContent) this.quizContent.style.display = 'block';
            this.goToStep(1);
            if (this.quizProgressBar) this.quizProgressBar.style.width = '25%';
            if (this.quizStepIndicator) this.quizStepIndicator.textContent = 'QUESTION 1 SUR 4';
        },

        transferToContact() {
            const scorePercent = Math.min(Math.round((this.totalPoints / this.maxPoints) * 100), 100);
            const serviceSelect = document.getElementById('service');
            const messageTextarea = document.getElementById('message');
            const contactSection = document.getElementById('contact');
            
            // Encart badge de diagnostic joint
            const summaryBadge = document.getElementById('diagnosticSummaryBadge');
            const attachedScoreVal = document.getElementById('attachedScoreVal');
            const attachedVerdictTitle = document.getElementById('attachedVerdictTitle');
            const attachedVerdictDesc = document.getElementById('attachedVerdictDesc');
            const removeBadgeBtn = document.getElementById('removeAttachedDiagnostic');

            let verdictTitle = '';
            if (scorePercent < 40) {
                verdictTitle = 'Risque Réglementaire & Sécurité Élevé';
            } else if (scorePercent < 75) {
                verdictTitle = 'Niveau Intermédiaire : Des ajustements recommandés';
            } else {
                verdictTitle = 'Bonne Maturité : Posture solide';
            }

            if (summaryBadge && attachedScoreVal && attachedVerdictTitle) {
                attachedScoreVal.textContent = scorePercent + '%';
                attachedVerdictTitle.textContent = `Diagnostic Joint : ${verdictTitle}`;
                if (attachedVerdictDesc) {
                    attachedVerdictDesc.textContent = `Score d'auto-évaluation ${scorePercent}% attaché à votre demande.`;
                }
                summaryBadge.style.display = 'flex';

                if (removeBadgeBtn) {
                    removeBadgeBtn.onclick = (e) => {
                        e.preventDefault();
                        summaryBadge.style.display = 'none';
                        if (messageTextarea && messageTextarea.value.includes('auto-évaluation')) {
                            messageTextarea.value = '';
                        }
                        ToastNotification.show('Diagnostic détaché du formulaire', 'info');
                    };
                }
            }

            if (serviceSelect) serviceSelect.value = 'audit';
            if (messageTextarea) {
                messageTextarea.value = `Bonjour Datasecur Consulting,\n\nJ'ai complété l'auto-évaluation en ligne et obtenu un score estimé de ${scorePercent}% (${verdictTitle}).\n\nJe souhaite échanger avec un consultant du cabinet pour étudier notre situation et envisager les étapes adaptées à notre structure.`;
            }

            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => {
                    const nameInput = document.getElementById('name');
                    if (nameInput) nameInput.focus();
                }, 600);
            }
            
            ToastNotification.show('Diagnostic rattaché au formulaire de contact !', 'success');
        }
    };

    MaturityQuiz.init();

    // ==========================================================================
    // 7. SÉLECTION DES FORMULES DE PACKAGES
    // ==========================================================================
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
                messageTextarea.value = `Bonjour Datasecur Consulting,\n\nJe suis intéressé(e) par votre formule « ${packageName} ».\n\nMerci de bien vouloir me recontacter pour planifier un premier échange de cadrage et nous transmettre les modalités de déploiement.`;
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

    // ==========================================================================
    // 8. MODALE DES FICHES DE PRESTATION
    // ==========================================================================
    const serviceDetailsData = {
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
    };

    // Aliases pour robustesse bidirectionnelle
    serviceDetailsData['securite'] = serviceDetailsData['security'];
    serviceDetailsData['formation'] = serviceDetailsData['training'];
    serviceDetailsData['iso27001'] = serviceDetailsData['certification'];
    serviceDetailsData['crise'] = serviceDetailsData['incident'];

    const serviceModal = document.getElementById('serviceModal');
    const modalServiceTitle = document.getElementById('modalServiceTitle');
    const modalServiceIcon = document.getElementById('modalServiceIcon');
    const modalServiceBody = document.getElementById('modalServiceBody');
    const closeServiceModal = document.getElementById('closeServiceModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalServiceCta = document.getElementById('modalServiceCta');

    function openServiceModal(serviceKey) {
        const data = serviceDetailsData[serviceKey];
        if (!data || !serviceModal) return;

        if (modalServiceTitle) modalServiceTitle.textContent = data.title;
        if (modalServiceIcon) modalServiceIcon.innerHTML = `<i class="fas ${data.icon}"></i>`;
        if (modalServiceBody) modalServiceBody.innerHTML = data.html;

        if (modalServiceCta) {
            modalServiceCta.onclick = (e) => {
                e.preventDefault();
                closeModal();
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
    }

    function closeModal() {
        if (!serviceModal) return;
        serviceModal.classList.remove('active');
        serviceModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.open-service-modal').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceKey = this.getAttribute('data-service');
            openServiceModal(serviceKey);
        });
    });

    if (closeServiceModal) closeServiceModal.addEventListener('click', closeModal);
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (serviceModal) {
        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && serviceModal && serviceModal.classList.contains('active')) {
            closeModal();
        }
    });

    // ==========================================================================
    // 9. FAQ ACCORDÉON, FILTRES & RECHERCHE INSTANTANÉE
    // ==========================================================================
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

    function filterFaq() {
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
    }

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

    // ==========================================================================
    // 10. FORMULAIRE DE CONTACT : VALIDATION & ENVOI
    // ==========================================================================
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

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

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

    // ==========================================================================
    // 11. TOAST NOTIFICATIONS SYSTÈME
    // ==========================================================================
    window.ToastNotification = {
        show(message, type = 'info') {
            const existingToast = document.querySelector('.toast-notification');
            if (existingToast) existingToast.remove();

            const toast = document.createElement('div');
            toast.className = `toast-notification toast-${type}`;
            
            let iconHtml = '<i class="fas fa-circle-info"></i>';
            if (type === 'success') iconHtml = '<i class="fas fa-circle-check"></i>';
            if (type === 'warning') iconHtml = '<i class="fas fa-triangle-exclamation"></i>';

            toast.innerHTML = `${iconHtml}<span>${message}</span>`;

            toast.style.cssText = `
                position: fixed;
                top: 85px;
                right: 22px;
                background-color: ${type === 'success' ? '#059669' : type === 'warning' ? '#D97706' : '#070D1E'};
                color: #FFFFFF;
                padding: 13px 20px;
                border-radius: 10px;
                border: 1px solid rgba(255, 255, 255, 0.15);
                box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                gap: 12px;
                font-family: var(--font-body);
                font-size: 0.9rem;
                font-weight: 600;
                z-index: 10000;
                max-width: 380px;
                animation: toastIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            `;

            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.animation = 'toastOut 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => toast.remove(), 300);
            }, 4200);
        }
    };

    const toastAnimationStyles = document.createElement('style');
    toastAnimationStyles.textContent = `
        @keyframes toastIn { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes toastOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(120%); opacity: 0; } }
    `;
    document.head.appendChild(toastAnimationStyles);

    // ==========================================================================
    // 12. GESTION DU CONSENTEMENT COOKIES
    // ==========================================================================
    const CookieConsentManager = {
        banner: document.getElementById('cookieConsent'),
        modal: document.getElementById('cookieModal'),
        acceptAllBtn: document.getElementById('acceptAllCookies'),
        refuseBtn: document.getElementById('refuseNonEssential'),
        settingsBtn: document.getElementById('cookieSettings'),
        closeModalBtn: document.getElementById('closeCookieModal'),
        savePrefsBtn: document.getElementById('saveCookiePreferences'),
        acceptModalBtn: document.getElementById('acceptAllInModal'),
        analyticsCheckbox: document.getElementById('analyticsCookies'),
        prefCheckbox: document.getElementById('preferenceCookies'),
        cookieName: 'datasecur_cookie_consent_status',

        init() {
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

    CookieConsentManager.init();

    // ==========================================================================
    // 13. NAVIGATION VERS LES PAGES LÉGALES
    // ==========================================================================
    const mainPage = document.getElementById('mainPage');
    const legalPages = document.querySelectorAll('.legal-page');

    function hideAllLegalPages() {
        legalPages.forEach(p => p.classList.remove('active'));
    }

    function showLegalPage(pageId) {
        if (!pageTransition) return;
        pageTransition.classList.remove('hidden');
        setTimeout(() => {
            if (mainPage) mainPage.style.display = 'none';
            hideAllLegalPages();
            const targetPage = document.getElementById(pageId);
            if (targetPage) targetPage.classList.add('active');
            pageTransition.classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 280);
    }

    function returnToMainPage() {
        if (!pageTransition) return;
        pageTransition.classList.remove('hidden');
        setTimeout(() => {
            hideAllLegalPages();
            if (mainPage) mainPage.style.display = 'block';
            pageTransition.classList.add('hidden');
            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 280);
    }

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
            showLegalPage('mentionsLegalesPage');
        });
    }

    if (showPrivacyBtn) {
        showPrivacyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLegalPage('privacyPolicyPage');
        });
    }

    if (showCookieFooterBtn) {
        showCookieFooterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLegalPage('cookiePolicyPage');
        });
    }

    if (showCookieBannerLink) {
        showCookieBannerLink.addEventListener('click', (e) => {
            e.preventDefault();
            showLegalPage('cookiePolicyPage');
        });
    }

    if (showCreditsBtn) {
        showCreditsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLegalPage('creditsPage');
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
            returnToMainPage();
        });
    });
});