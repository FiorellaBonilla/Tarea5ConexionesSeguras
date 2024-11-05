const cookie = require('cookie');

exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Set-Cookie': cookie.serialize('userid', '', {
        path: '/',
        maxAge: -1, // Eliminar la cookie
      }),
    },
    body: JSON.stringify({ message: "Sesión cerrada exitosamente" }),
  };
};
