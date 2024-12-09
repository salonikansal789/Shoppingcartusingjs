const user =  JSON.parse(localStorage.getItem('users'));
const loginUser=user.find(user=>user.isLogin==true);
window.onload = function() {
  console.log(loginUser)
  if (user) {
    document.getElementById('profile-name').value = loginUser.name;
    document.getElementById('profile-email').value = loginUser.email;

  } else {
    alert('No user data found. Please log in.');
  }
};
function updateProfile() {
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    const users = JSON.parse(localStorage.getItem('users'));
    const loginUserIndex = users.findIndex(user => user.isLogin === true);
    if (!name || !email) {
      alert('Please fill in all fields.');
      return;
    } 
    if (loginUserIndex !== -1) {
      users[loginUserIndex].name = name;
      users[loginUserIndex].email = email;
      localStorage.setItem('users', JSON.stringify(users));    
      alert('Update profile succesfully');

    }
  }

  function updatePassword() {
   const  oldPassword=document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!newPassword || !confirmPassword) {
      alert('Please fill in all password fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users'));
    const loginUserIndex = users.findIndex(user => user.isLogin === true);
    const storedPassword = users[loginUserIndex].password
    if (oldPassword === storedPassword) {
      users[loginUserIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      alert('Password updated successfully!');
    } else {
      alert('Old password is incorrect.');
    }
  }

  function logOut(){
    localStorage.setItem("isLoggedIn",false);
    const users = JSON.parse(localStorage.getItem('users'));
    const loginUserIndex = users.findIndex(user => user.isLogin === true);
    users[loginUserIndex].isLogin = false;
    localStorage.setItem('users', JSON.stringify(users));
    alert('Logout successful!');
    console.log(users)
    window.location.href = "/auth/login.html";
  }