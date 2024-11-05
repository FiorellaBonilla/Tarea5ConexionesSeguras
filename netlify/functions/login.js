const cookie = require('cookie');

exports.handler = async (event) => {
  const { username, password } = JSON.parse(event.body || '{}');

  // Credenciales de ejemplo
  const myUsername = 'user11';
  const myPassword = 'mypassword';

  if (username === myUsername && password === myPassword) {
    return {
      statusCode: 200,
      headers: {
        'Set-Cookie': cookie.serialize('userid', username, {
          path: '/',
          maxAge: 86400, // 1 día
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Solo en producción
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
