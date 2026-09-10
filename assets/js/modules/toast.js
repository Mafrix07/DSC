/**
 * DATASECUR CONSULTING - MODULE NOTIFICATIONS TOAST
 * Système d'alertes visuelles discrètes et accessibles
 */
export const ToastNotification = {
    show(message, type = 'info') {
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        
        let iconHtml = '<i class="fas fa-circle-info"></i>';
        if (type === 'success') iconHtml = '<i class="fas fa-circle-check"></i>';
        if (type === 'warning') iconHtml = '<i class="fas fa-triangle-exclamation"></i>';

        toast.innerHTML = `${iconHtml}<span>${message}</span>`;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-fadeout');
            setTimeout(() => toast.remove(), 350);
        }, 4000);
    }
};

if (typeof window !== 'undefined') {
    window.ToastNotification = ToastNotification;
}
