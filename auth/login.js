document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
  
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
  
    if (user) {
      user.isLogin = true;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('isLoggedIn',true);
      alert('Login successful!');
      window.location.href = "/shop/shop.html";
      email.value='';
      password.value='';
      document.getElementById('loginError').textContent = '';

    } else {
      document.getElementById('loginError').textContent = 'Invalid email or password.';
    }
  });
  