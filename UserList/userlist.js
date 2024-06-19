function loadUsers() {

    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

    if (users.length > 0) {
        createTable(users);
    } else {
        location.href = './../Login/Login.html';
    }
}

function createTable(users) {


    const arr = [
        {
            label: 'First Name',
            key: 'firstName'
        },
        {
            label: 'Last Name',
            key: 'lastName'
        },
        {
            label: 'Email Address',
            key: 'email'
        },
        {
            label: 'Phone Number',
            key: 'phone'
        },
        {
            label: 'Actions',
            key: 'actions'
        }
    ];

    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        location.href = './../Login/Login.html';
        return;
    }

    const tableElement = document.createElement('table');
    tableElement.id = 'table_id';
    tableElement.classList.add('table');
    tableElement.classList.add('table-striped');

    const theadElement = document.createElement('thead');

    const tableHeadingRow = document.createElement('tr');

    for (let i = 0; i < arr.length; i++) {
        const thElement = document.createElement('th');
        thElement.innerHTML = arr[i].label;
        tableHeadingRow.appendChild(thElement);
    }
    theadElement.appendChild(tableHeadingRow);

    const tableBody = document.createElement('tbody');
    for (let i = 0; i < users.length; i++) {
        /
        const userRow = document.createElement('tr');

        for (let j = 0; j < arr.length; j++) {
            const tdElement = document.createElement('td');
            const key = arr[j].key;
            if (key === 'actions') {

                if (loggedInUser === users[i].email) {
                    const editButton = document.createElement('button');
                    editButton.classList.add('btn');
                    editButton.classList.add('btn-link');

                    editButton.setAttribute('data-bs-toggle', 'modal');
                    editButton.setAttribute('data-bs-target', '#editView');
                    editButton.innerHTML = 'Edit';
                    editButton.addEventListener('click', function () {
                        editHandler(users[i]);
                    });
                    tdElement.appendChild(editButton);
                }

                const viewButton = document.createElement('button');
                viewButton.classList.add('btn');
                viewButton.classList.add('btn-link');

                viewButton.setAttribute('data-bs-toggle', 'modal');
                viewButton.setAttribute('data-bs-target', '#editView');
                viewButton.innerHTML = 'View';
                viewButton.addEventListener('click', function () {
                    viewHandler(users[i]);
                })

                tdElement.appendChild(viewButton);

            } else {
                tdElement.innerHTML = users[i][key];
            }
            userRow.appendChild(tdElement);
        }
        tableBody.appendChild(userRow);
    }

    tableElement.appendChild(theadElement);

    tableElement.appendChild(tableBody);

    const tableContainer = document.getElementById('table-container');
    tableContainer.appendChild(tableElement);

}

function editHandler(currentUserDetails) {
    console.log(currentUserDetails);
    const user_first_name = document.getElementById('user_first_name');
    const user_last_name = document.getElementById('user_last_name');
    const user_email = document.getElementById('user_email');
    const user_phone = document.getElementById('user_phone');

    user_first_name.readOnly = false;
    user_first_name.classList.remove('disable');

    user_last_name.readOnly = false;
    user_last_name.classList.remove('disable');

    user_phone.readOnly = false;
    user_phone.classList.remove('disable');

    const heading = document.getElementById('heading');

    user_first_name.value = currentUserDetails.firstName;
    user_last_name.value = currentUserDetails.lastName;
    user_email.value = currentUserDetails.email;
    user_phone.value = currentUserDetails.phone;

    heading.innerHTML = "Edit User details";

    const save_changes = document.getElementById('save_changes');
    save_changes.style.display = 'block';

}

function updateUsers() {
    const user_first_name = document.getElementById('user_first_name');
    const firstNameElementError = document.getElementById('firstNameElementError');

    const user_last_name = document.getElementById('user_last_name');
    const lastNameElementError = document.getElementById('lastNameElementError');

    const user_email = document.getElementById('user_email');

    const user_phone = document.getElementById('user_phone');
    const mobileElementError = document.getElementById('mobileElementError');


    let errCount = 0;

    if (!user_first_name.value) {
        firstNameElementError.innerHTML = 'First name is required';
        errCount = errCount + 1;
    } else {
        firstNameElementError.innerHTML = '';
    }

    if (!user_last_name.value) {
        lastNameElementError.innerHTML = 'Last name is required';
        errCount = errCount + 1;
    } else {
        lastNameElementError.innerHTML = '';
    }

    const phoneregex = new RegExp(/^[0-9]{10}$/);

    if (!user_phone.value) {
        mobileElementError.innerHTML = 'Phone is required';
        errCount = errCount + 1;
    } else if (phoneregex.test(user_phone.value) === false) {
        mobileElementError.innerHTML = 'Enter valid phone number';
        errCount = errCount + 1;
    } else {
        mobileElementError.innerHTML = '';
    }

    if (errCount === 0) {

        const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
        const loggedInUser = localStorage.getItem('loggedInUser');

        if (!loggedInUser || loggedInUser !== user_email.value || users.length <= 0) {
            location.href = './../Login/Login.html';
            return;
        }


        const index = users.findIndex(obj => obj.email === user_email.value);
        if (index === -1) {
            location.href = './../Login/Login.html';
            return;
        } else {
            users[index] = {
                ...users[index],
                firstName: user_first_name.value,
                lastName: user_last_name.value,
                phone: user_phone.value
            }
        }

        localStorage.setItem('users', JSON.stringify(users));


        const close_icon = document.getElementById('close_icon');
        close_icon.click();
        alert('User updated successfully');

        const table = document.getElementById('table_id');
        table.remove();

        loadUsers();
    }
}

function viewHandler(currentUserDetails) {
    const user_first_name = document.getElementById('user_first_name');
    const user_last_name = document.getElementById('user_last_name');
    const user_phone = document.getElementById('user_phone');

    user_first_name.readOnly = true;
    user_first_name.classList.add('disable');

    user_last_name.readOnly = true;
    user_last_name.classList.add('disable');

    user_phone.readOnly = true;
    user_phone.classList.add('disable');

    const heading = document.getElementById('heading');

    user_first_name.value = currentUserDetails.firstName;
    user_last_name.value = currentUserDetails.lastName;
    user_email.value = currentUserDetails.email;
    user_phone.value = currentUserDetails.phone;

    heading.innerHTML = "View User details";

    const save_changes = document.getElementById('save_changes');
    save_changes.style.display = 'none';

}

async function getRemoteComments() {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');

    const data = await response.json();

    const cardContainer = document.getElementById('card-container');

    for (let i = 0; i < 5; i++) {

        const comment = data[i];

        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('p-3');
        card.classList.add('mt-2');

        const nameDiv = document.createElement('div');

        const nameKey = document.createElement('p');
        nameKey.classList.add('fs-3');
        nameKey.innerHTML = "Name:";

        const nameValue = document.createElement('p');
        nameValue.innerHTML = comment.name;

        nameDiv.appendChild(nameKey);
        nameDiv.appendChild(nameValue);

        const emailDiv = document.createElement('div');

        const emailKey = document.createElement('p');
        emailKey.classList.add('fs-3');
        emailKey.innerHTML = "Email:";

        const emailValue = document.createElement('p');
        emailValue.innerHTML = comment.email;

        emailDiv.appendChild(emailKey);
        emailDiv.appendChild(emailValue);

        const bodyDiv = document.createElement('div');

        const bodyKey = document.createElement('p');
        bodyKey.classList.add('fs-3');
        bodyKey.innerHTML = "Body:";

        const bodyValue = document.createElement('p');
        bodyValue.innerHTML = comment.body;

        bodyDiv.appendChild(bodyKey);
        bodyDiv.appendChild(bodyValue);

        card.appendChild(nameDiv);
        card.appendChild(emailDiv);
        card.appendChild(bodyDiv);

        cardContainer.appendChild(card);

    }
}
