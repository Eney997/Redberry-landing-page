const openModals = document.querySelectorAll('[data-modal-target]');
const blur = document.getElementById('blur');

openModals.forEach(button => {
    button.addEventListener('click', () => {
        const modalTarget = button.getAttribute('data-modal-target');
        const popup = document.querySelector(modalTarget);
        openModal(popup);
    });
});

function openModal(modal) {
    if (modal == null) return;

    if (!modal.classList.contains('active')) {
        modal.classList.add('active');
        blur.classList.add('active');
    } else {
        modal.classList.remove('active');
        blur.classList.remove('active');
    }
}


blur.addEventListener('click', () => {
    const modals = document.querySelectorAll('.popInfo.active');
    modals.forEach(modal => {
        closeModal(modal);
    });
});

function closeModal(modal) {
    if (modal == null) return;

    modal.classList.remove('active');
    blur.classList.remove('active');
}