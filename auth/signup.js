document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
  
    const errorField = document.getElementById('signupError');
  
    if (password !== confirmPassword) {
      errorField.textContent = 'Passwords do not match.';
      return;
    }
  else if(name==''|| email==''|| password==''|| confirmPassword=='')
  {
    errorField.textContent = 'Please fill the all fields.';
    return;
  }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
      errorField.textContent = 'Email already exists.';
      return;
    }
  
    users.push({ name, email, password,isLogin:false,cardProducts:[]});
    localStorage.setItem('users', JSON.stringify(users));
  
    alert('Signup successful!');
    name.value='';
    email.value='';
    password.value='';
    confirmPassword.value='';
    errorField.textContent = '';
    window.location.href = "/auth/login.html";
  });
  