function validateAndRegister() {

    const firstNameElement = document.getElementById('register_first_name');
    const firstNameElementError = document.getElementById('register_first_name_error');

    let errCount = 0;

    if (!firstNameElement.value) {
        console.log('This field is required');
        firstNameElementError.innerHTML = 'First name is required';
        errCount = errCount + 1;
    } else {
        firstNameElementError.innerHTML = '';
    }

    const lastNameElement = document.getElementById('register_last_name');
    const lastNameElementError = document.getElementById('register_last_name_error');

    if (!lastNameElement.value) {
        lastNameElementError.innerHTML = 'Last name is required';
        errCount = errCount + 1;
    } else {
        lastNameElementError.innerHTML = '';
    }

    const emailElement = document.getElementById('register_email');
    const emailElementError = document.getElementById('email_address_error');

    const regex = new RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);

    if (!emailElement.value) {
        emailElementError.innerHTML = 'Email is required';
        errCount = errCount + 1;
    } else if (regex.test(emailElement.value) === false) {
        emailElementError.innerHTML = 'Enter valid email';
        errCount = errCount + 1;

    } else {
        emailElementError.innerHTML = '';
    }


    const phoneElement = document.getElementById('register_phone');
    const phoneElementError = document.getElementById('register_phone_number_error');

    const phoneregex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);

    if (!phoneElement.value) {
        phoneElementError.innerHTML = 'Phone is required';
        errCount = errCount + 1;
    } else if (phoneregex.test(phoneElement.value) === false) {
        phoneElementError.innerHTML = 'Enter valid phone number';
        errCount = errCount + 1;
    } else {
        phoneElementError.innerHTML = '';
    }

    const passwordElement = document.getElementById('register_password');
    const passwordElementError = document.getElementById('register_password_error');

    if (!passwordElement.value) {
        passwordElementError.innerHTML = 'Password is required';
        errCount = errCount + 1;
    } else if (passwordElement.value.length < 5 || passwordElement.value.length > 8) {
        passwordElementError.innerHTML = 'Password should be between 5 to 8 characters';
        errCount = errCount + 1;
    } else {
        passwordElementError.innerHTML = '';
    }

    const confirmPasswordElement = document.getElementById('register_confirm_password');
    const confirmPasswordElementError = document.getElementById('register_confirm_password_error');

    if (!confirmPasswordElement.value) {
        confirmPasswordElementError.innerHTML = 'Confirm password is required';
        errCount = errCount + 1;
    } else if (passwordElement.value !== confirmPasswordElement.value) {
        confirmPasswordElementError.innerHTML = 'Confirm password should be same as password';
        errCount = errCount + 1;
    } else {
        confirmPasswordElementError.innerHTML = '';
    }

    const agreeElement = document.getElementById('agree');
    const agreeElementError = document.getElementById('agree_error');

    if (!agreeElement.checked) {
        agreeElementError.innerHTML = 'You have to agree to the terms and conditions';
        errCount = errCount + 1;
    } else {
        agreeElementError.innerHTML = '';
    }

    if (errCount === 0) {
        const userObj = {
            firstName: firstNameElement.value,
            lastName: lastNameElement.value,
            email: emailElement.value,
            password: passwordElement.value,
            phone: phoneElement.value
        }
        console.log(userObj);

        saveForm(userObj);
    }
}

function saveForm(userObj) {
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    const global_error_element = document.getElementById('global_error');
    const clear_btn = document.getElementById('clear_btn');

    if (users.length === 0) {
        users.push(userObj);
        localStorage.setItem('users', JSON.stringify(users));
        global_error_element.classList.add('text-success');
        global_error_element.classList.remove('text-danger');
        global_error_element.innerHTML = 'User registered successfully';
        setTimeout(() => {
            navigateToLogin();
        }, 3000);
        clear_btn.click();
    } else {
        const index = users.findIndex((user) => user.email === userObj.email);
        if (index === -1) {
            users.push(userObj);
            localStorage.setItem('users', JSON.stringify(users));
            global_error_element.classList.add('text-success');
            global_error_element.classList.remove('text-danger');
            global_error_element.innerHTML = 'User registered successfully';
            setTimeout(() => {
                navigateToLogin();
            }, 3000);
            clear_btn.click();
        } else {
            global_error_element.classList.remove('text-success');
            global_error_element.classList.add('text-danger');
            global_error_element.innerHTML = 'User already exist';

        }
    }
}

function navigateToLogin() {
    location.href = './../Login/Login.html';

}