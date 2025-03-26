// Page Elements
const contactTimePage = document.getElementById('contactTimePage');
const personalDetailsPage = document.getElementById('personalDetailsPage');
const confirmationPage = document.getElementById('confirmationPage');

// Time Selection Elements
const timeSelect = document.getElementById('timeSelect');
const timeSelectContinueBtn = document.getElementById('timeSelectContinueBtn');

// Personal Details Elements
const personalDetailsContinueBtn = document.getElementById('personalDetailsContinueBtn');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const phoneNumber = document.getElementById('phoneNumber');
const privacyConsent = document.getElementById('privacyConsent');


const confirmationDetails = document.getElementById('confirmationDetails');

// Validation functions for input fields
function validateFirstName() {
    const nameRegex = /^[A-Za-z\s'-]+$/;
    return nameRegex.test(firstName.value.trim()) && firstName.value.trim().length >= 2;
}

function validateLastName() {
    const nameRegex = /^[A-Za-z\s'-]+$/;
    return nameRegex.test(lastName.value.trim()) && lastName.value.trim().length >= 2;
}

function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.value.trim());
}

function validatePhoneNumber() {
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return phoneRegex.test(phoneNumber.value.trim());
}


function addValidationListeners() {
    firstName.addEventListener('input', function() {
        if (!validateFirstName()) {
            firstName.setCustomValidity('Please enter a valid first name (at least 2 characters, letters only)');
            firstName.classList.add('invalid');
        } else {
            firstName.setCustomValidity('');
            firstName.classList.remove('invalid');
        }
    });

    lastName.addEventListener('input', function() {
        if (!validateLastName()) {
            lastName.setCustomValidity('Please enter a valid last name (at least 2 characters, letters only)');
            lastName.classList.add('invalid');
        } else {
            lastName.setCustomValidity('');
            lastName.classList.remove('invalid');
        }
    });

    email.addEventListener('input', function() {
        if (!validateEmail()) {
            email.setCustomValidity('Please enter a valid email address');
            email.classList.add('invalid');
        } else {
            email.setCustomValidity('');
            email.classList.remove('invalid');
        }
    });

    phoneNumber.addEventListener('input', function() {
        if (!validatePhoneNumber()) {
            phoneNumber.setCustomValidity('Please enter a valid phone number');
            phoneNumber.classList.add('invalid');
        } else {
            phoneNumber.setCustomValidity('');
            phoneNumber.classList.remove('invalid');
        }
    });

    privacyConsent.addEventListener('change', function() {
        personalDetailsContinueBtn.disabled = !(
            validateFirstName() && 
            validateLastName() && 
            validateEmail() && 
            validatePhoneNumber() && 
            privacyConsent.checked
        );
    });
}

// Similar listeners for other fields...
timeSelect.addEventListener('change', function() {
    timeSelectContinueBtn.disabled = !this.value;
});

timeSelectContinueBtn.addEventListener('click', function() {
    if (!timeSelectContinueBtn.disabled) {
        const selectedTime = timeSelect.options[timeSelect.selectedIndex].text;

        contactTimePage.classList.remove('active-page');
       
        personalDetailsPage.classList.add('active-page');
        
        localStorage.setItem('selectedTime', selectedTime);

        addValidationListeners();

        personalDetailsContinueBtn.disabled = true;
    }
});

// Personal Details Page Logic
personalDetailsContinueBtn.addEventListener('click', function() {
    const isValid = validateFirstName() && 
                    validateLastName() && 
                    validateEmail() && 
                    validatePhoneNumber() && 
                    privacyConsent.checked;

    if (isValid) {
        const userData = {
            selectedTime: localStorage.getItem('selectedTime'),
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim(),
            phoneNumber: phoneNumber.value.trim()
        };

        personalDetailsPage.classList.remove('active-page');

        confirmationPage.classList.add('active-page');
    // Confirmation card 
        confirmationDetails.innerHTML = `
        <div class="confirmation-card">
            <h2><i class="fa-solid fa-user-check"></i> Submission Details</h2>
            
            <div class="info-group">
                <i class="fa-solid fa-clock"></i>
                <p><strong>Selected Time:</strong> <span>${userData.selectedTime}</span></p>
            </div>
            
            <div class="info-group">
                <i class="fa-solid fa-user"></i>
                <p><strong>Full Name:</strong> <span>${userData.firstName} ${userData.lastName}</span></p>
            </div>
            
            <div class="info-group">
                <i class="fa-solid fa-envelope"></i>
                <p><strong>Email:</strong> <span>${userData.email}</span></p>
            </div>
            
            <div class="info-group">
                <i class="fa-solid fa-phone"></i>
                <p><strong>Phone:</strong> <span>${userData.phoneNumber}</span></p>
            </div>
    
            <div class="thank-you-msg">
                <i class="fa-solid fa-circle-check"></i>
                <p>Thank you for submitting your details.</p>
            </div>
    
            <button onclick="window.location.href='pages.html'" class="return-home">
                <i class="fa-solid fa-arrow-left"></i> Go Back to Home
            </button>
        </div>
    `;    
    } else {
        alert('Please fill out all fields correctly and agree to the privacy policy.');
    }
});