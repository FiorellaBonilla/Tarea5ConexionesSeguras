// login.js
document.getElementById('loginForm').onsubmit = function(e) {
  e.preventDefault(); 

  const myusername = document.getElementById('myusername').value;
  const mypassword = document.getElementById('mypassword').value;

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
