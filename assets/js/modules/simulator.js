/**
 * DATASECUR CONSULTING - MODULE SIMULATEUR DE CONFORMITÉ APDP / RGPD
 * Questionnaire interactif en 4 étapes, calcul de maturité & raccordement au formulaire
 */
import { ToastNotification } from './toast.js';

export const MaturityQuiz = {
    currentStep: 1,
    totalPoints: 0,
    maxPoints: 14,
    answers: [],
    quizContent: null,
    quizResult: null,
    quizProgressBar: null,
    quizStepIndicator: null,
    resultScoreValue: null,
    resultTitle: null,
    resultDescription: null,
    resultScoreCircle: null,
    resultList: null,
    restartBtn: null,
    transferBtn: null,

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
            verdictDesc = 'Votre organisation ne dispose pas encore des fondamentaux requis par la Loi togolaise n° 2019-014 et le RGPD. Une structuration progressive de votre démarche vous permettra d'anticiper les contrôles et de sécuriser vos activités.';
            colorBorder = 'var(--color-crimson-crisis)';
            recommendations = [
                'Établir l'inventaire de vos traitements de données (ressources humaines, fichiers clients, paiements).',
                'Désigner un DPO externe qualifié pour accompagner la mise en conformité juridique et contractuelle.',
                'Renforcer la politique des mots de passe et activer la double authentification (2FA) sur les outils clés.',
                'Formaliser les mentions d'information obligatoires sur vos formulaires et contrats.'
            ];
        } else if (scorePercent < 75) {
            verdictTitle = 'Niveau Intermédiaire : Des ajustements recommandés';
            verdictDesc = 'Votre entreprise applique déjà de bonnes pratiques, mais certains volets clés méritent d'être complétés (registre à finaliser, clauses sous-traitants ou sensibilisation des équipes).';
            colorBorder = 'var(--color-amber-alert)';
            recommendations = [
                'Finaliser et tenir à jour le Registre des Traitements conformément à la Loi APDP n° 2019-014.',
                'Organiser une session de sensibilisation pratique aux réflexes de sécurité et anti-phishing.',
                'Formaliser la procédure interne de notification des violations de données dans les 72 heures.',
                'Vérifier les clauses de protection des données dans les contrats avec vos prestataires informatiques.'
            ];
        } else {
            verdictTitle = 'Bonne Maturité : Posture solide à pérenniser';
            verdictDesc = 'Votre organisation fait preuve d'une gouvernance exemplaire. L'enjeu est de maintenir ce niveau de conformité dans la durée et lors du lancement de nouveaux projets numériques.';
            colorBorder = 'var(--color-emerald-safe)';
            recommendations = [
                'Programmer une revue périodique de votre Registre des Traitements.',
                'Effectuer des audits réguliers de vos sauvegardes et de la sécurité des accès.',
                'Envisager la préparation à la norme internationale ISO 27001 pour valoriser votre niveau de sécurité.',
                'Maintenir une veille active sur les recommandations de l'APDP Togo et les cadres régionaux.'
            ];
        }

        if (this.resultTitle) this.resultTitle.textContent = verdictTitle;
        if (this.resultDescription) this.resultDescription.textContent = verdictDesc;
        if (this.resultScoreCircle) this.resultScoreCircle.style.borderColor = colorBorder;

        if (this.resultList) {
            this.resultList.innerHTML = recommendations.map(rec => `<li><i class="fas fa-circle-check icon-success"></i> ${rec}</li>`).join('');
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
        
        const summaryBadge = document.getElementById('diagnosticSummaryBadge');
        const attachedScoreVal = document.getElementById('attachedScoreVal');
        const attachedVerdictTitle = document.getElementById('attachedVerdictTitle');
        const attachedVerdictDesc = document.getElementById('attachedVerdictDesc');
        const removeBadgeBtn = document.getElementById('removeAttachedDiagnostic') || document.getElementById('btnRemoveDiagnosticBadge');

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
            messageTextarea.value = `Bonjour Datasecur Consulting,

J'ai complété l'auto-évaluation en ligne et obtenu un score estimé de ${scorePercent}% (${verdictTitle}).

Je souhaite échanger avec un consultant du cabinet pour étudier notre situation et envisager les étapes adaptées à notre structure.`;
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
