// login.js
document.getElementById('loginForm').onsubmit = function(e) {
  e.preventDefault(); 

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/user', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
  })
  .then(response => {
      if (response.ok) {
          return response.text(); 
      }
      throw new Error('Usuario o contraseña inválidos');
  })
  .then(data => {

      console.log(data);
      window.location.href = '/'; 
  })
  .catch(error => {
      console.error('Error:', error);
      alert(error.message); 
  });
};
