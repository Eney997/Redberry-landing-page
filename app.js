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
const disBlock = document.querySelector('.disBlock');
const Slb = document.querySelector('.SLB');
const Hbut = document.querySelector('.Hbut'); 
const ABBbutton = document.querySelector('.addBlog'); 

const apiUrl = 'https://api.blog.redberryinternship.ge/api/login';

// localStorage Clear aq chavakomentarot es imitoto sheyvanis mere davasuftaot
// localStorage.clear();

// Function to close the popup, remove the blur, and button visibility
function closePopup() {
    popInfo.style.display = 'none';
    blur1.style.display = 'none';

    // button visibility
    Hbut.style.display = 'none';
    ABBbutton.style.display = 'block';

    // login state in localStorage
    localStorage.setItem('isLoggedIn', 'true');
}

// Event listener for "SLB" button
Slb.addEventListener('click', closePopup);

// Check localStorage on page load
if (localStorage.getItem('isLoggedIn') === 'true') {
    // show login button and hide the addBlog button //hide and sick
    Hbut.style.display = 'none';
    ABBbutton.style.display = 'block';
}

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
        body: JSON.stringify({ email }),
    })
    .then(response => {
        if (response.status === 204) {
            // success popup visible
            successPopup.style.display = 'grid';
            disBlock.style.display = 'none';
            
            // butonis visibiliti
            Hbut.style.display = 'block';
            ABBbutton.style.display = 'none';
            
            // login in localStorage
            localStorage.setItem('isLoggedIn', 'true');
        } else {
            return response.json();
        }
    })
    .then(data => {
        if (data && data.message) {
            // sxva erorebis gahendvla
            errorContainer.style.display = 'flex';
            document.querySelector('.errorPosta').innerText = data.message;
        }
    })
    .catch(error => console.error('Error:', error));
});

function isValidEmail(email) {
    // email validacia
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



    const apiURL2 = 'https://api.blog.redberryinternship.ge/api/categories';
    const token2 = '06c849e6edaa8a40645ce20d6918e3815b03cffe83472ce974b896837bc18b1e';

    // fetch
    async function fetchData() {
        try {
            const response = await fetch(apiURL2, {
                headers: {
                    'Authorization': `Bearer ${token2}`
                }
            });
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // button update
    function updateButton(buttonId, category) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.textContent = category.title;
            button.style.color = category.text_color;
            button.style.backgroundColor = category.background_color;
        }
    }

    // kategoriebis update
    async function updateButtons() {
        const categories = await fetchData();
        categories.forEach((category, index) => {
            const buttonId = `m${index + 1}`;
            updateButton(buttonId, category);
        });
    }

    updateButtons();




