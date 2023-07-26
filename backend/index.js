const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const rutacliente = require('./routes/ClienteRoutes')
const rutainstitucion = require('./routes/InstitucionRoutes')
const rutatalla = require('./routes/TallaRoutes')
const rutaproducto = require('./routes/ProductoRoutes')
const rutapedido = require('./routes/PedidoRoutes')
const rutacarrito = require('./routes/CarritoRoutes')
const rutacarritopro = require('./routes/CarritoProRoutes')
const rutaestado = require('./routes/EstadoRoutes')
const rutanotificacion = require('./routes/NotificacionRoutes')



app.use(cors());
app.use(express.json());
app.options('*', cors());
app.use('/api', rutacliente);
app.use('/api', rutainstitucion);
app.use('/api', rutatalla);
app.use('/api', rutaproducto);
app.use('/api', rutapedido);
app.use('/api', rutacarrito);
app.use('/api', rutacarritopro);
app.use('/api', rutaestado);
app.use('/api', rutanotificacion);



app.listen(process.env.PORT, () => console.log('Server Stared'));

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.DB,(err) =>
    {
        if (err){
            return console.log('Error al conectar con la base de datos ->', err);
        }
        return console.log('Conectado a la base de datos')
    }
);
