const cookie = require('cookie');

exports.handler = async (event) => {
  const { username, password } = JSON.parse(event.body || '{}');


  const myUsername = 'user1';
  const myPassword = 'mypassword';

  if (username === myUsername && password === myPassword) {
    return {
      statusCode: 200,
      headers: {
        'Set-Cookie': cookie.serialize('userid', username, {
          path: '/',
          maxAge: 86400, 
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', 
        }),
      },
      body: JSON.stringify({ message: "Inicio de sesión exitoso." }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Usuario o contraseña inválidos' }),
    };
  }
};
