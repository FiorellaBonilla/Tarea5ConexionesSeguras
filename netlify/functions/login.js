// functions/login.js
const cookie = require('cookie');

const myusername = 'user1';
const mypassword = 'mypassword';

exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);
        const { username, password } = body;

        // Verificar las credenciales
        if (username === myusername && password === mypassword) {
            const sessionId = Date.now(); // Generar un ID de sesión
            return {
                statusCode: 200,
                headers: {
                    'Set-Cookie': cookie.serialize('sessionId', sessionId, {
                        path: '/',
                        httpOnly: true,
                        maxAge: 86400 // 24 horas
                    }),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: 'Login successful' }),
            };
        } else {
            return {
                statusCode: 403,
                body: JSON.stringify({ message: 'Invalid username or password' }),
            };
        }
    } else {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' }),
        };
    }
};
