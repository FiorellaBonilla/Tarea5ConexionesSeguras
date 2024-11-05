const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const app = express();
const PORT = 4000;

// Credenciales de ejemplo
const myusername = 'user1';
const mypassword = 'mypassword';

// Variable para guardar la sesión
let session;

// Duración de la cookie (1 día)
const oneDay = 1000 * 60 * 60 * 24;

// Middleware de sesión
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// Middleware para analizar datos entrantes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(__dirname));

// Middleware de cookie-parser
app.use(cookieParser());

// Ruta principal
app.get('/', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.send(`Bienvenido Usuario <a href='/logout'>click para cerrar sesión</a>`);
    } else {
        res.sendFile('views/login.html', { root: __dirname });
    }
});

// Ruta para manejar el inicio de sesión
app.post('/user', (req, res) => {
    if (req.body.username === myusername && req.body.password === mypassword) {
        session = req.session;
        session.userid = req.body.username;
        res.send(`Hola, bienvenido <a href='/logout'>click para cerrar sesión</a>`);
    } else {
        res.send('Usuario o contraseña inválidos');
    }
});

// Ruta para cerrar sesión
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor en funcionamiento en el puerto ${PORT}`));
