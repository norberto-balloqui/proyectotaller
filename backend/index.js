const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport-config');
require('dotenv').config();

const app = express();
 // Ajusta la ruta según la ubicación real de tus rutas

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:3001', // Reemplaza con el origen de tu frontend
  credentials: true,
  optionsSuccessStatus: 200,
}));

app.use(express.json());

// Configuración de sesiones y Passport

// Middleware de sesiones
app.use(session({
  secret: 'tu_secreto',  // Cadena secreta para firmar la cookie de sesión
  resave: true,          // Fuerza a la sesión a guardarse incluso si no se ha modificado
  saveUninitialized: true // Guarda sesiones sin modificaciones
}));
app.use(passport.initialize());

// Middleware de Passport para manejar sesiones
app.use(passport.session());

// Rutas de autenticación de usuario

// Resto de tus rutas
const usuarioroute = require('./routes/UsuarioRoute');
const rutacliente = require('./routes/ClienteRoutes');
const rutainstitucion = require('./routes/InstitucionRoutes');
const rutatalla = require('./routes/TallaRoutes');
const rutaproducto = require('./routes/ProductoRoutes');
const rutapedido = require('./routes/PedidoRoutes');
const rutacarrito = require('./routes/CarritoRoutes');
const rutacarritopro = require('./routes/CarritoProRoutes');
const rutaestado = require('./routes/EstadoRoutes');
const rutanotificacion = require('./routes/NotificacionRoutes');


app.use('/api', usuarioroute);
app.use('/api', rutacliente);
app.use('/api', rutainstitucion);
app.use('/api', rutatalla);
app.use('/api', rutaproducto);
app.use('/api', rutapedido);
app.use('/api', rutacarrito);
app.use('/api', rutacarritopro);
app.use('/api', rutaestado);
app.use('/api', rutanotificacion);

app.listen(process.env.PORT, () => console.log('Server Started'));

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DB, (err) => {
  if (err) {
    return console.log('Error al conectar con la base de datos ->', err);
  }
  return console.log('Conectado a la base de datos');
});
