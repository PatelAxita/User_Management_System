function loadUserDetails() {
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    const loggedInUser = localStorage.getItem('loggedInUser');

    const filterLoggedInUser = users.filter(user => user.email == loggedInUser);
    if (filterLoggedInUser.length <= 0) {
        location.href = './../Login/Login.html';
    } else {
        const userDetails = filterLoggedInUser[0];
        console.log(userDetails);

        const firstElement = document.getElementById('user_first_name');
        const lastElement = document.getElementById('user_last_name');
        const emailElement = document.getElementById('user_email');
        const phoneElement = document.getElementById('user_phone');

        firstElement.value = userDetails.firstName;
        lastElement.value = userDetails.lastName;
        emailElement.value = userDetails.email;
        phoneElement.value = userDetails.mobile;
    }
}

function updateProfile() {
    const firstElement = document.getElementById('user_first_name');
    const firstElementError = document.getElementById('user_first_name_error');

    const lastElement = document.getElementById('user_last_name');
    const lastElementError = document.getElementById('user_last_name_error');

    const phoneElement = document.getElementById('user_phone');
    const phoneElementError = document.getElementById('user_phone_error');

    let errCount = 0;


    if (!firstElement.value) {
        firstElementError.innerHTML = 'First name is required';
        errCount = errCount + 1;
    } else {
        firstElementError.innerHTML = '';
    }

    if (!lastElement.value) {
        lastElementError.innerHTML = 'Last name is required';
        errCount = errCount + 1;
    } else {
        lastElementError.innerHTML = '';
    }

    const phoneregex = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);

    if (!phoneElement.value) {
        phoneElementError.innerHTML = 'Phone number is required';
        errCount = errCount + 1;
    } else if (phoneregex.test(phoneElement.value) === false) {
        phoneElementError.innerHTML = 'Enter valid phone number';
        errCount = errCount + 1;
    } else {
        phoneElementError.innerHTML = '';
    }

    if (errCount === 0) {
        const obj = {
            firstName: firstElement.value,
            lastName: lastElement.value,
            mobile: phoneElement.value
        };
        updateDetails(obj);
    }
}

function updateDetails(details) {
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    const loggedInUser = localStorage.getItem('loggedInUser');

    const index = users.findIndex(user => user.email === loggedInUser);
    if (index === -1) {
        alert('Something went wrong');
        location.href = './../Login/Login.html';
    } else {
        users[index] = {
            ...users[index],
            ...details
        };
        localStorage.setItem('users', JSON.stringify(users));
        alert('Updated successfully');
    }
}
