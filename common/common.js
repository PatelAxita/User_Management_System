function resetPageLoad() {
    const resetElement = document.getElementById('reset_password_page');
    resetElement.innerHTML = `<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Reset Password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form>
                <div class="row">
                    <div class="col-md-12">
                        <div class="mb-3">
                            <label for="profile_old_password" class="form-label">Old Password</label>
                            <input type="password" class="form-control" id="profile_old_password"
                                placeholder="Enter your old password">
                                <p id="profile_old_password_error" class="text-danger"></p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="mb-3">
                            <label for="profile_new_password" class="form-label">New Password</label>
                            <input type="password" class="form-control" id="profile_new_password"
                                placeholder="Enter your new password">
                                <p id="profile_new_password_error" class="text-danger"></p>

                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="mb-3">
                            <label for="profile_confirm_new_password" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="profile_confirm_new_password"
                                placeholder="Enter your confirm password">
                                <p id="profile_confirm_new_password_error" class="text-danger"></p>
                        </div>
                    </div>
                </div>

                <div class="text-end">
                    <div>
                        <button type="reset" class="btn btn-outline-danger" id="profile_cancel">Reset</button> 
                        <button type="button" class="btn btn-outline-primary" onclick="changePassword()">Change Password</button>
                    </div>
                </div>
            </form>
        </div>
    </div>`
}

function changePassword() {
    console.log("change password");
    const oldPasswordElement = document.getElementById('profile_old_password');
    const oldPasswordElementError = document.getElementById('profile_old_password_error');

    const newPasswordElement = document.getElementById('profile_new_password');
    const newPasswordElementError = document.getElementById('profile_new_password_error');

    const newConfirmPasswordElement = document.getElementById('profile_confirm_new_password');
    const newConfirmPasswordElementError = document.getElementById('profile_confirm_new_password_error');

    let errCount = 0;

    if (!oldPasswordElement.value) {
        oldPasswordElementError.innerHTML = 'Old password is required';
        errCount++;
    } else {
        oldPasswordElementError.innerHTML = '';
    }

    if (!newPasswordElement.value) {
        newPasswordElementError.innerHTML = 'New password is required';
        errCount++;
    } else if (newPasswordElement.value.length < 6 || newPasswordElement.value.length > 8) {
        newPasswordElementError.innerHTML = 'New password should be between 5 to 8 char';
        errCount++;
    } else {
        newPasswordElementError.innerHTML = '';
    }

    if (!newConfirmPasswordElement.value) {
        newConfirmPasswordElementError.innerHTML = 'Confirm password is required';
        errCount++;
    } else if (newConfirmPasswordElement.value !== newPasswordElement.value) {
        newConfirmPasswordElementError.innerHTML = 'Password and confirm password does not match';
        errCount++;
    } else {
        newConfirmPasswordElementError.innerHTML = '';
    }

    if (errCount === 0) {
        const obj = {
            oldPassword: oldPasswordElement.value,
            newPassword: newPasswordElement.value
        };

        updatePassword(obj);
    }
}

function updatePassword(cred) {
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        const index = users.findIndex(user => user.email === loggedInUser); //
        if (index === -1) { 
            navigateToLogout();
        } else {  
            if (users[index].password === cred.oldPassword) { 
                users[index].password = cred.newPassword; 
                localStorage.setItem('users', JSON.stringify(users));
                alert('Password reset success');
                const profile_cancel = document.getElementById('profile_cancel');
                profile_cancel.click(); 
            } else { 
                const oldPasswordElementError = document.getElementById('profile_old_password_error');
                oldPasswordElementError.innerHTML = 'Old password does not match';
            }
        }
    } else {
        navigateToLogout();
    }
}   

function logout() {
    const confirmation = confirm('Are you sure, you want to logout?'); 
    if(confirmation === true) {
        localStorage.removeItem('loggedInUser'); 
        navigateToLogout();
    }
}
function navBarComponent() {

    const str = location.href;
    const arr = str.split('/');
    const fileName = arr[arr.length - 1];
    console.log(fileName);
    const activeFileName = fileName.split('.')[0]; 
    const navElement = document.getElementById('nav_bar');
    navElement.innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">User Management</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
            aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
                <li class="nav-item">
                    <a class="nav-link ${activeFileName === 'dashboard' ? 'active' : ''}" aria-current="page" href="./../Dashboard/Dashboard.html">Dashboard</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link ${activeFileName === 'User_list' ? 'active' : ''}" href="./../UserList/User_list.html">Users List</a>
                </li> <!--above added the href links after adding cards on click based on js file  -->
                <li class="nav-item">
                    <a class="nav-link ${activeFileName === 'profile' ? 'active' : ''}" href="./../Profile/profile.html">Profile</a>
                </li>

            </ul>
            <form class="d-flex" role="search">
                <button class="btn btn-outline-primary" type="button" onclick="logout()">Logout</button>
            </form>
        </div>
    </div>
</nav>`
}

function navigateToUserList() {
    location.href = './../UserList/User_list.html';
}

function navigateToProfile() {
    location.href = './../Profile/profile.html';
}

function navigateToLogout() {
    location.href = './../Login/Login.html';
}