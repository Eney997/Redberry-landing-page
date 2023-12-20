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



    const popInfo = document.getElementById('popInfo');
    const blur1 = document.getElementById('blur');
    const emailInput = document.querySelector('.popinput');
    const errorContainer = document.querySelector('.errorsinPosta');
    const successPopup = document.querySelector('.succsessLogin');
    const inpopbut = document.querySelector('.inpopbut');

    const apiUrl = 'https://api.blog.redberryinternship.ge/api/login';

    inpopbut.addEventListener('click', function () {
        const email = emailInput.value;

        // reset eroroebi
        errorContainer.style.display = 'none';
        successPopup.style.display = 'none';

        // email checki
        if (!isValidEmail(email)) {
            errorContainer.style.display = 'flex';
            return;
        }

        // fetch req
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',        
            },
            body: JSON.stringify({email}),
        })
        .then(response => response.json())
        .then(data => handleApiResponse(data))
        .catch(error => console.error('Error:', error));
    });

    function isValidEmail(email) {
        // email validacia
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function handleApiResponse(data) {
        if (data.message === 'User logged in successfully') {
            // succes popup visible
            successPopup.style.display = 'grid';
            popInfo.style.display = 'none';
        } else {
            // gavhendlot erori
            errorContainer.style.display = 'flex';
            document.querySelector('.errorPosta').innerText = data.message;
        }
    }



    