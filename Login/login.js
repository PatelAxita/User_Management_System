function validateAndLogin() {

    let errorCount = 0;

    const emailElement = document.getElementById('email_address');
    const emailErrorElement = document.getElementById('email_address_error');

    const regex = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);

    if (!emailElement.value) {
        emailErrorElement.innerHTML = 'Email is required';
        errorCount = errorCount + 1;
    } else if (regex.test(emailElement.value) === false) {
        emailErrorElement.innerHTML = 'Enter valid email';
        errorCount = errorCount + 1;
    } else {
        emailErrorElement.innerHTML = '';
    }

    const passwordElement = document.getElementById('password');
    const passwordElementError = document.getElementById('password_error');

    if (!passwordElement.value) {
        passwordElementError.innerHTML = 'Password is required';
        errorCount = errorCount + 1;
    } else {
        passwordElementError.innerHTML = '';
    }

    if (errorCount === 0) {
        console.log('Validation success');

        const userCred = {
            email: emailElement.value,
            password: passwordElement.value
        }

        login(userCred);
    }
}

function login(cred) {
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    const global_login_error = document.getElementById('global_login_error');
    if (users.length <= 0) {
        global_login_error.classList.add('text-danger');
        global_login_error.classList.remove('text-success');
        global_login_error.innerHTML = 'No user exist';
    } else {
        const index = users.findIndex(user => user.email === cred.email && user.password === cred.password);
        if (index === -1) {
            global_login_error.classList.add('text-danger');
            global_login_error.classList.remove('text-success');
            global_login_error.innerHTML = 'No user exist';
        } else {
            localStorage.setItem('loggedInUser', cred.email);
        }
    }
}

function navigateToDashboard() {
    location.href = './../Dashboard/Dashboard.html';
}

function navigateToRegister() {
    location.href = './../Register/Register.html';
}